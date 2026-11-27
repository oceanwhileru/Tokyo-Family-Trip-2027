const categories = new Set(['餐費','shopping','交通費','娛樂','伴手禮','住宿','機票','其他']);
const foreign = new Set(['JPY','USD']);
export const validId = value => typeof value === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(value);

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(value);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
}

export function cleanEntry(value, now) {
  if (!value || typeof value !== 'object') return null;
  const {id, category, date, method, detail, currency, amountCents, twdCents, note, rate, quoteDate, source, publishedAt} = value;
  const today = new Date(now + 8 * 3600000).toISOString().slice(0, 10);
  if (!validId(id) || !categories.has(category) || !validDate(date) || date > today ||
      ![method, detail].every(text => typeof text === 'string' && text.trim() && text.length <= 50) ||
      typeof note !== 'string' || note.length > 150 ||
      !Number.isSafeInteger(amountCents) || amountCents < 1 || amountCents >= 10000000000 ||
      !Number.isSafeInteger(twdCents) || twdCents < 0 ||
      typeof rate !== 'string' || !/^\d{1,3}(?:\.\d{1,8})?$/.test(rate) || Number(rate) <= 0 ||
      !validDate(quoteDate) || quoteDate > date) return null;
  const [whole, fraction = ''] = rate.split('.');
  const scale = 10n ** BigInt(fraction.length);
  const computed = Number((BigInt(amountCents) * BigInt(whole + fraction) * 2n + scale) / (scale * 2n));
  if (computed !== twdCents) return null;
  const entry = {id, category, date, method, detail, currency, amountCents, twdCents, note, rate, quoteDate, source};
  if (currency === 'TWD') return source === 'twd' && rate === '1' && quoteDate === date ? entry : null;
  if (!foreign.has(currency)) return null;
  if (source === 'manual') return quoteDate === date ? entry : null;
  if (source !== 'bot' || typeof publishedAt !== 'string' || !Number.isFinite(Date.parse(publishedAt))) return null;
  const taipeiQuote = new Date(Date.parse(publishedAt) + 8 * 3600000).toISOString().slice(0,10);
  return quoteDate === taipeiQuote ? {...entry, publishedAt} : null;
}
