'use strict';
window.TRIP_LEDGER_CLOUD = (() => {
  const href = window.TRIP_LEDGER_ENDPOINT;
  if (!href || location.protocol === 'file:') return null;
  const base = new URL(href);
  if (base.protocol !== 'https:' && base.hostname !== '127.0.0.1') return null;
  const session = 'tokyo-2027.cloud-ledger.session';
  const proofKey = 'tokyo-2027.cloud-ledger.proof';
  let token = '';
  try { token = sessionStorage.getItem(session) || ''; } catch {}

  async function request(path, method = 'GET', value, auth = token) {
    const headers = {};
    if (auth) headers.Authorization = 'Bearer ' + auth;
    if (value) headers['Content-Type'] = 'application/json';
    const response = await fetch(new URL(path, base), {
      method, headers, body:value ? JSON.stringify(value) : undefined,
      credentials:'omit', cache:'no-store', signal:AbortSignal.timeout(15000)
    });
    if (!response.ok) {
      const error = new Error('Cloud ledger request failed');
      error.status = response.status;
      throw error;
    }
    return response.json();
  }

  function logout() {
    token = '';
    try { sessionStorage.removeItem(session); } catch {}
  }

  async function login() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const base64 = value => btoa(String.fromCharCode(...value)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
    const proof = base64(bytes);
    const challenge = base64(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(proof))));
    sessionStorage.setItem(proofKey, proof);
    const url = new URL('/auth/start', base);
    url.searchParams.set('challenge', challenge);
    location.assign(url.href);
  }

  async function acceptReturn() {
    const [path, params] = location.hash.slice(1).split('?');
    if (path !== 'tools/ledger' || !params) return null;
    const fields = new URLSearchParams(params);
    if (!fields.has('handoff') && !fields.has('error')) return null;
    history.replaceState(history.state, '', '#tools/ledger');
    const proof = sessionStorage.getItem(proofKey);
    sessionStorage.removeItem(proofKey);
    if (fields.get('error') === 'account') return '請使用已加入旅行帳本的 Google 帳號。';
    if (!proof || !fields.has('handoff')) return '登入未完成，請再試一次。';
    const result = await request('/auth/exchange', 'POST', {handoff:fields.get('handoff'), proof}, '');
    sessionStorage.setItem(session, result.token);
    token = result.token;
    return null;
  }

  return {
    get signedIn() { return Boolean(token); },
    login, logout, acceptReturn,
    read: () => request('/entries'),
    add: rows => request('/entries','POST',{rows}),
    remove: id => request('/entries/'+encodeURIComponent(id),'DELETE')
  };
})();
