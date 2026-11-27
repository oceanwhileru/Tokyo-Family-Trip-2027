'use strict';
window.TRIP_LEDGER = (() => {
  const endpoint = 'https://raw.githubusercontent.com/haotool/app/data/public/rates/v3/';
  const headers = ['種類','付款時間','支付方式','支出明細','幣種','原幣金額','換算台幣','備注'];
  const categories = ['餐費','shopping','交通費','娛樂','伴手禮','住宿','機票','其他'];
  const currencies = ['TWD','JPY','USD'];
  const methods = ['cash','Suica卡'];
  const amountFormat = new Intl.NumberFormat('zh-TW',{maximumFractionDigits:2});
  const dateInTaipei = (time=Date.now()) => new Date(time+8*3600000).toISOString().slice(0,10);
  const formatAmount = cents => amountFormat.format(cents/100);

  function parseAmount(value) {
    const entered = value.trim();
    if(!/^(?:\d{1,8}|\d{1,3}(?:,\d{3}){1,2})(?:\.\d{1,2})?$/.test(entered))return null;
    const cents = Math.round(Number(entered.replaceAll(',',''))*100);
    return cents>0&&cents<10000000000?cents:null;
  }

  function parseRate(value) {
    const entered = String(value??'').trim();
    return /^\d{1,3}(?:\.\d{1,8})?$/.test(entered)&&Number(entered)>0?entered:null;
  }

  function convert(cents,rate) {
    const [whole,fraction=''] = rate.split('.');
    const scale = 10n**BigInt(fraction.length);
    return Number((BigInt(cents)*BigInt(whole+fraction)*2n+scale)/(scale*2n));
  }

  async function get(path,hash) {
    const url = endpoint+path;
    const response = await fetch(url,{signal:AbortSignal.timeout(4500),cache:hash?'force-cache':'no-cache',credentials:'omit',referrerPolicy:'no-referrer'});
    if(!response.ok)throw Error('Rate source unavailable');
    const content = await response.arrayBuffer();
    if(hash){
      const bytes = await crypto.subtle.digest('SHA-256',content);
      const digest = Array.from(new Uint8Array(bytes),byte=>byte.toString(16).padStart(2,'0')).join('');
      if(digest!==hash)throw Error('Rate checksum mismatch');
    }
    return JSON.parse(new TextDecoder().decode(content));
  }

  function verified(ref,folder) {
    if(!/^[a-f0-9]{64}$/.test(ref?.sha256??'')||ref.path!==folder+'/'+ref.sha256+'.json')throw Error('Invalid rates reference');
    return get(ref.path,ref.sha256);
  }

  let manifestCache;
  async function manifest() {
    if(manifestCache&&Date.now()<manifestCache.expires)return manifestCache.value;
    const value = get('current.json').then(pointer=>verified(pointer.manifest,'releases'));
    manifestCache = {value,expires:Date.now()+5*60000};
    try{return await value;}
    catch(error){if(manifestCache.value===value)manifestCache=null;throw error;}
  }

  async function bankRate(currency,date) {
    const data = await manifest();
    const provider = data.providers.find(item=>item.providerId==='bot');
    const today = dateInTaipei();
    const historical = data.history.find(item=>item.providerId==='bot'&&item.date===date);
    const ref = date===today?provider?.snapshot:historical?.snapshot;
    if(!ref)return null;
    const snapshot = await verified(ref,'objects');
    if(snapshot.providerId!=='bot')throw Error('Invalid rate source');
    const quote = snapshot.quotes.find(item=>item.fromCurrency===currency&&item.toCurrency==='TWD'&&item.status==='available'&&item.sourceQuote?.originalSellField==='spot.sell')?.sourceQuote;
    const rate = parseRate(quote?.providerSellPrice);
    const published = Date.parse(quote?.sourcePublishedAt);
    if(!rate||!Number.isFinite(published))return null;
    const quoteDate = dateInTaipei(published);
    const weekend = [0,6].includes(new Date(date+'T00:00:00Z').getUTCDay());
    const lag = (Date.parse(date)-Date.parse(quoteDate))/86400000;
    if(lag!==0&&(!weekend||lag<0||lag>3))return null;
    return {rate,quoteDate,publishedAt:quote.sourcePublishedAt,source:'bot'};
  }

  return {headers,categories,currencies,methods,dateInTaipei,formatAmount,parseAmount,parseRate,convert,bankRate};
})();
