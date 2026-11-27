import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { test } from 'node:test';
import { Firestore } from '@google-cloud/firestore';
import { firestoreStore } from './ledger-store.mjs';

test('Firestore adapter keeps transactions and same-account reads consistent', {
  skip: !process.env.FIRESTORE_EMULATOR_HOST
}, async t => {
  const db = new Firestore({projectId:'demo-tokyo-ledger'});
  t.after(()=>db.terminate());
  const store = firestoreStore(db);
  const first = randomUUID();
  const second = randomUUID();
  const key = randomUUID();
  const challenge = randomUUID();
  const entry = {id:'test-entry', currency:'JPY', amountCents:1000000, twdCents:198800, rate:'0.1988'};
  await store.issueLogin(key, {challenge, sub:first, member:'Judy', exp:200});
  assert.equal(await store.redeemLogin(key, 'different', 100), null);
  const exchanged = await Promise.all([store.redeemLogin(key, challenge, 100),store.redeemLogin(key, challenge, 100)]);
  assert.equal(exchanged.filter(Boolean).length,1);
  assert.deepEqual(exchanged.find(Boolean), {sub:first, member:'Judy'});
  const repeated = await Promise.all([store.add(first,[entry]),store.add(first,[entry])]);
  assert.equal(repeated.reduce((sum,result)=>sum+result.added,0), 1);
  assert.deepEqual(await store.list(first),[entry]);
  assert.deepEqual(await store.list(second),[]);
  await store.remove(second,entry.id);
  assert.deepEqual(await store.list(first),[entry]);
  await store.remove(first,entry.id);
  assert.deepEqual(await store.add(first,[entry]),{added:0});
  assert.deepEqual(await store.list(first),[]);
});
