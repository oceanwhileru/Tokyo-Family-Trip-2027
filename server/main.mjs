import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { Firestore } from '@google-cloud/firestore';
import { OAuth2Client } from 'google-auth-library';
import { createApi } from './api.mjs';
import { firestoreStore } from './ledger-store.mjs';

const env = name => {
  const value = process.env[name];
  if (!value) throw new Error('Missing setting ' + name);
  return value;
};
const site = env('TRIP_SITE_URL');
const backend = env('TRIP_BACKEND_URL');
const clientId = env('GOOGLE_OAUTH_CLIENT_ID');
const secret = env('TRIP_SESSION_SECRET');
const allowedMembers = JSON.parse(env('TRIP_MEMBERS_JSON'));
if (secret.length < 43 || !allowedMembers || typeof allowedMembers !== 'object' || Array.isArray(allowedMembers) ||
    !Object.keys(allowedMembers).length || !Object.values(allowedMembers).every(name=>['Judy','Jennifer','Vito','Amy'].includes(name)) ||
    new Set(Object.values(allowedMembers)).size !== Object.keys(allowedMembers).length || new URL(site).protocol !== 'https:' ||
    new URL(backend).protocol !== 'https:') throw new Error('Invalid server settings');

const google = new OAuth2Client(clientId, env('GOOGLE_OAUTH_CLIENT_SECRET'));
const oauth = {
  authorize({ state, nonce, verifier, redirectUri }) {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    const challenge = createHash('sha256').update(verifier).digest('base64url');
    url.search = new URLSearchParams({
      client_id: clientId, redirect_uri: redirectUri, response_type: 'code',
      scope: 'openid email', prompt: 'select_account', state, nonce,
      code_challenge: challenge, code_challenge_method: 'S256'
    });
    return url.href;
  },
  async authenticate({ code, verifier, redirectUri }) {
    const { tokens } = await google.getToken({code, codeVerifier: verifier, redirect_uri: redirectUri});
    const ticket = await google.verifyIdToken({idToken: tokens.id_token, audience: clientId});
    return ticket.getPayload();
  }
};

const store = firestoreStore(new Firestore({projectId: env('GOOGLE_CLOUD_PROJECT')}));
const handler = createApi({oauth, store, site, backend, secret, allowedMembers});
createServer(handler).listen(Number(process.env.PORT || 8080), '0.0.0.0');
