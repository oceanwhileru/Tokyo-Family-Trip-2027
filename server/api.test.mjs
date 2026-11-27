import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import { test } from 'node:test';
import { once } from 'node:events';
import { createApi } from './api.mjs';

const origin = 'https://family.example';
const day = '2026-11-27';
const row = {id:'entry-1', category:'shopping', date:day, method:'cash', detail:'化妝品', currency:'JPY',
  amountCents:1000000, twdCents:198800, rate:'0.1988', quoteDate:day, note:'旅費', source:'manual'};
const proof = () => randomBytes(32).toString('base64url');
const digest = value => createHash('sha256').update(value).digest('base64url');

test('login handoff, concurrent device identity, locked amounts, import and deletion over HTTP', async t => {
  const handoffs = new Map(), ledgers = new Map(), issued = new Map();
  let users = 0;
  let time = Date.parse(day+'T05:00:00Z');
  const store = {
    issueLogin: async (key, value) => handoffs.set(key, value),
    redeemLogin: async (key, challenge, now) => {
      const record = handoffs.get(key);
      if (!record || record.challenge !== challenge || record.exp <= now) return null;
      handoffs.delete(key);
      return record;
    },
    list: async sub => [...(ledgers.get(sub)?.values() ?? [])].filter(Boolean),
    add: async (sub, entries) => {
      const account = ledgers.get(sub) ?? new Map();
      ledgers.set(sub, account);
      const added = entries.filter(entry => !account.has(entry.id));
      for (const entry of added) account.set(entry.id, entry);
      return {added:added.length};
    },
    remove: async (sub, id) => { if (ledgers.get(sub)?.has(id)) ledgers.get(sub).set(id, null); }
  };
  const oauth = {
    authorize(opt) {
      const id=String(++users);
      issued.set(id, opt);
      return 'https://login.example/?'+new URLSearchParams({id,state:opt.state});
    },
    authenticate({ code, verifier, redirectUri }) {
      const [id, account] = code.split('/');
      const { nonce, verifier:expected, redirectUri:expectedRedirect } = issued.get(id);
      assert.equal(verifier, expected);
      assert.equal(redirectUri, expectedRedirect);
      const sub={judy:'2000001', amy:'2000002', stranger:'2000003'}[account];
      return {sub,nonce,email:account+'@example.test',email_verified:true};
    }
  };
  const pushes=[];
  const expenseSheet={check:async()=>{},add:async (sub,entry)=>{pushes.push([sub,entry]);return {added:true};}};
  const api = createApi({oauth,store,expenseSheet,site:origin+'/Tokyo/',backend:'https://backend.example',
    secret:'test-only-session-signing-secret-not-for-use',
    allowedMembers:{'judy@example.test':'Judy','amy@example.test':'Amy'},now:()=>time});
  const server = createServer(api).listen(0,'127.0.0.1');
  await once(server,'listening');
  t.after(()=>server.close());
  const base='http://127.0.0.1:'+server.address().port;
  const request = (url, options={}) => fetch(base+url,{redirect:'manual',...options});
  const call = (path, {token, value, method='GET', caller=origin}={}) => request(path,{
    method, headers:{Origin:caller,...(token?{Authorization:'Bearer '+token}:{}),...(value?{'Content-Type':'application/json'}:{})},
    ...(value?{body:JSON.stringify(value)}:{})
  });

  async function begin(account, incorrectState=false, view='ledger') {
    const verifier=proof();
    const start=await request('/auth/start?challenge='+digest(verifier)+'&view='+view);
    assert.equal(start.status, 302);
    assert.match(start.headers.get('set-cookie'),/; Secure; HttpOnly; SameSite=Lax/);
    const cookie=start.headers.get('set-cookie').split(';')[0];
    const fields=new URL(start.headers.get('location')).searchParams;
    const params=new URLSearchParams({code:fields.get('id')+'/'+account,state:incorrectState?'wrong':fields.get('state')});
    const back=await request('/auth/callback?'+params,{headers:{Cookie:cookie}});
    assert.equal(back.status,303);
    assert.ok(back.headers.get('location').startsWith(origin+'/Tokyo/#tools/'+view+'?'));
    const result=new URLSearchParams(new URL(back.headers.get('location')).hash.split('?')[1]);
    return {result,verifier};
  }
  async function signIn(account) {
    const {result,verifier}=await begin(account);
    const exchange={handoff:result.get('handoff'),proof:verifier};
    assert.equal((await call('/auth/exchange',{method:'POST',value:{...exchange,proof:proof()}})).status,401);
    const success=await call('/auth/exchange',{method:'POST',value:exchange});
    assert.equal(success.status, 200);
    assert.equal((await call('/auth/exchange',{method:'POST',value:exchange})).status,401);
    return success.json();
  }

  assert.equal((await call('/entries')).status,401);
  assert.equal((await call('/entries',{caller:'https://elsewhere.example'})).status,403);
  assert.equal((await begin('judy',true)).result.get('error'),'login');
  assert.equal((await begin('stranger')).result.get('error'),'account');
  assert.ok((await begin('judy',false,'expenses')).result.get('handoff'));
  const first=await signIn('judy');
  const second=await signIn('judy');
  const amy=await signIn('amy');
  assert.equal(first.member,'Judy');
  const expense={id:'test-expense',name:'餐費',amount:5000,currency:'TWD',payer:'Judy',people:['Judy','Amy'],date:''};
  const send=(token,member,record)=>call('/shared-expenses',{method:'POST',token,value:{member,expense:record}});
  assert.equal((await send(undefined,'Judy',expense)).status,401);
  assert.equal((await send(amy.token,'Judy',expense)).status,403);
  assert.equal((await send(first.token,'Judy',{...expense,people:[]})).status,400);
  assert.equal((await send(first.token,'Judy',expense)).status,200);
  assert.deepEqual(pushes,[['2000001',expense]]);
  const save = (token, record) => call('/entries',{method:'POST',token,value:{rows:[record]}});
  assert.equal((await save(first.token,{...row,twdCents:1})).status,400);
  assert.deepEqual(await (await save(first.token,row)).json(),{added:1});
  assert.deepEqual(await (await save(first.token,row)).json(),{added:0});
  assert.deepEqual(await (await call('/entries',{token:second.token})).json(),{member:'Judy',rows:[row]});
  assert.deepEqual(await (await call('/entries',{token:amy.token})).json(),{member:'Amy',rows:[]});
  assert.equal((await call('/entries/'+row.id,{method:'DELETE',token:amy.token})).status,200);
  assert.equal((await call('/entries',{token:second.token})).headers.get('cache-control'),'no-store');
  assert.deepEqual(await (await call('/entries',{token:second.token})).json(),{member:'Judy',rows:[row]});
  await call('/entries/'+row.id,{method:'DELETE',token:first.token});
  assert.deepEqual(await (await save(first.token,row)).json(),{added:0});
  assert.deepEqual(await (await call('/entries',{token:second.token})).json(),{member:'Judy',rows:[]});
  time+=9*3600_000;
  assert.equal((await call('/entries',{token:first.token})).status,401);
});
