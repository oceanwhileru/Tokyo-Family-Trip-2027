import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cleanEntry, validId } from './ledger-entry.mjs';

const loginCookie = '__Host-trip-login';
const proofPattern = /^[A-Za-z0-9_-]{43}$/;
const random = () => randomBytes(32).toString('base64url');
const digest = value => createHash('sha256').update(value).digest('base64url');
const names = new Set(['Judy', 'Jennifer', 'Vito', 'Amy']);
const duration = {login: 10 * 60_000, handoff: 2 * 60_000, session: 8 * 3600_000};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function body(req, limit) {
  if (req.headers['content-type']?.split(';')[0] !== 'application/json') {
    throw new HttpError(415, 'json_required');
  }
  req.setEncoding('utf8');
  let input = '';
  for await (const chunk of req) {
    input += chunk;
    if (Buffer.byteLength(input) > limit) throw new HttpError(413, 'too_large');
  }
  try { return JSON.parse(input); }
  catch { throw new HttpError(400, 'invalid_json'); }
}

export function createApi({ oauth, store, site, backend, secret, allowedMembers, now = Date.now }) {
  const web = new URL(site);
  const redirectUri = new URL('/auth/callback', backend).href;
  const memberFor = email => Object.hasOwn(allowedMembers, email) && allowedMembers[email];
  const sign = payload => createHmac('sha256', secret).update(payload).digest();
  function encode(data) {
    const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
    return payload + '.' + sign(payload).toString('base64url');
  }
  function decode(token, kind) {
    if (typeof token !== 'string' || token.length > 2500) return null;
    const [payload, signature, extra] = token.split('.');
    if (!payload || !proofPattern.test(signature ?? '') || extra !== undefined) return null;
    if (!timingSafeEqual(sign(payload), Buffer.from(signature, 'base64url'))) return null;
    try {
      const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
      return parsed.kind === kind && parsed.exp > now() ? parsed : null;
    } catch { return null; }
  }
  function goBack(res, fields) {
    const url = new URL(web.href);
    url.hash = 'tools/ledger?' + new URLSearchParams(fields);
    res.writeHead(303, { Location: url.href }).end();
  }
  function json(res, status, value) {
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify(value));
  }
  function cookie(res, value, age) {
    res.setHeader('Set-Cookie', loginCookie + '=' + value + '; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=' + age);
  }
  async function start(url, res) {
    const challenge = url.searchParams.get('challenge');
    if (!proofPattern.test(challenge ?? '')) throw new HttpError(400, 'invalid_challenge');
    const state = random();
    const nonce = random();
    const verifier = random();
    cookie(res, encode({kind: 'login', state, nonce, verifier, challenge, exp: now() + duration.login}), duration.login / 1000);
    const location = oauth.authorize({state, nonce, verifier, redirectUri});
    res.writeHead(302, { Location: location }).end();
  }
  async function callback(req, url, res) {
    const cookieValue = req.headers.cookie?.split(';').map(pair => pair.trim())
      .find(pair => pair.startsWith(loginCookie + '='))?.slice(loginCookie.length + 1);
    const previous = decode(cookieValue, 'login');
    cookie(res, '', 0);
    const code = url.searchParams.get('code');
    if (!previous || previous.state !== url.searchParams.get('state') || !code) {
      return goBack(res, {error: 'login'});
    }
    const identity = await oauth.authenticate({code, verifier: previous.verifier, redirectUri});
    const email = identity.email?.toLowerCase();
    const member = identity.email_verified && memberFor(email);
    if (!names.has(member) || !/^\d{6,40}$/.test(identity.sub ?? '') || identity.nonce !== previous.nonce) {
      return goBack(res, {error: 'account'});
    }
    const handoff = random();
    await store.issueLogin(digest(handoff), {
      challenge: previous.challenge, sub: identity.sub, member, exp: now() + duration.handoff
    });
    return goBack(res, {handoff});
  }
  return async function api(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    try {
      const method = req.method;
      const url = new URL(req.url, backend);
      const path = url.pathname;
      if (method === 'GET' && path === '/health') return json(res, 200, {ok: true});
      if (method === 'GET' && path === '/auth/start') return await start(url, res);
      if (method === 'GET' && path === '/auth/callback') {
        try { return await callback(req, url, res); }
        catch { return goBack(res, {error: 'login'}); }
      }
      if (req.headers.origin !== web.origin) throw new HttpError(403, 'origin');
      res.setHeader('Access-Control-Allow-Origin', web.origin);
      res.setHeader('Vary', 'Origin');
      if (method === 'OPTIONS') {
        res.writeHead(204, {'Access-Control-Allow-Methods': 'GET, POST, DELETE', 'Access-Control-Allow-Headers': 'Authorization, Content-Type'}).end();
        return;
      }
      if (method === 'POST' && path === '/auth/exchange') {
        const {handoff, proof} = await body(req, 2048) ?? {};
        if (!proofPattern.test(handoff ?? '') || !proofPattern.test(proof ?? '')) throw new HttpError(400, 'invalid_exchange');
        const user = await store.redeemLogin(digest(handoff), digest(proof), now());
        if (!user) throw new HttpError(401, 'expired_login');
        const token = encode({kind: 'session', sub: user.sub, member: user.member, exp: now() + duration.session});
        return json(res, 200, {token, member: user.member});
      }
      const user = decode(req.headers.authorization?.match(/^Bearer (\S+)$/)?.[1], 'session');
      if (!user || !names.has(user.member)) throw new HttpError(401, 'expired_session');
      if (method === 'GET' && path === '/entries') {
        return json(res, 200, {member: user.member, rows: await store.list(user.sub)});
      }
      if (method === 'POST' && path === '/entries') {
        const {rows} = await body(req, 120_000) ?? {};
        if (!Array.isArray(rows) || rows.length > 100) throw new HttpError(400, 'invalid_entries');
        const entries = rows.map(row => cleanEntry(row, now()));
        if (entries.includes(null) || new Set(entries.map(row => row.id)).size !== entries.length) throw new HttpError(400, 'invalid_entries');
        return json(res, 200, await store.add(user.sub, entries));
      }
      if (method === 'DELETE' && path.startsWith('/entries/')) {
        const id = path.slice('/entries/'.length);
        if (!validId(id)) throw new HttpError(400, 'invalid_entry');
        await store.remove(user.sub, id);
        return json(res, 200, {ok: true});
      }
      return json(res, 404, {error: 'not_found'});
    } catch (error) {
      return json(res, error.status || 503, {error: error.status ? error.message : 'unavailable'});
    }
  };
}
