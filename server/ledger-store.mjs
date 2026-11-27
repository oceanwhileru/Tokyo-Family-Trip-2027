const stored = snapshot => snapshot.exists ? snapshot.data() : null;

export function firestoreStore(db) {
  const entries = sub => db.collection('tripLedgers').doc(sub).collection('entries');
  const handoff = key => db.collection('tripLoginHandoffs').doc(key);

  return {
    async issueLogin(key, value) {
      await handoff(key).create(value);
    },
    redeemLogin(key, challenge, now) {
      return db.runTransaction(async transaction => {
        const ref = handoff(key);
        const value = stored(await transaction.get(ref));
        if (!value || value.challenge !== challenge) return null;
        transaction.delete(ref);
        return value.exp > now ? {sub: value.sub, member: value.member} : null;
      });
    },
    async list(sub) {
      const snapshot = await entries(sub).where('deleted', '==', false).get();
      return snapshot.docs.map(doc => doc.data().entry);
    },
    add(sub, rows) {
      if (!rows.length) return { added: 0 };
      const refs = rows.map(row => entries(sub).doc(row.id));
      return db.runTransaction(async transaction => {
        const snapshots = await transaction.getAll(...refs);
        let added = 0;
        rows.forEach((entry, i) => {
          if (snapshots[i].exists) return;
          transaction.create(refs[i], { entry, deleted: false });
          added++;
        });
        return { added };
      });
    },
    async remove(sub, id) {
      const ref = entries(sub).doc(id);
      // Keep a marker so retrying an old browser import cannot restore a deleted entry.
      await db.runTransaction(async transaction => {
        if ((await transaction.get(ref)).exists) transaction.set(ref, { deleted: true });
      });
    }
  };
}
