'use strict';
(() => {
  const D = window.TRIP;
  const T = window.TRANSPORT;
  const S = D.src;
  const $ = (q, root = document) => root.querySelector(q);
  const root = $('#content');
  const localFile = location.protocol === 'file:';
  const pages = [
    ['home','首頁'],['itinerary','每日行程','行程'],['dining','美食'],['shopping','購物'],
    ['transport','交通'],['tools','旅行工具','工具'],['sources','資料與離線','資料']
  ];
  const photoNames = {fuji:'河口湖畔的富士山',ueno:'上野站正門',ginza:'銀座四丁目街景',gotemba:'御殿場 Premium Outlets',narita:'成田機場第一航廈'};
  const sharedExpenseSheet = 'https://docs.google.com/spreadsheets/d/16OU0Qs6VKAxtWk8WAOqO6zI-ulmPC3-Z/edit?gid=1455147624#gid=1455147624';
  const FX_DEFAULT = {rate:0.20688,date:'2026-11-25',mode:'reference'};
  const fx = {value:FX_DEFAULT,message:''};
  const weather = {message:'',value:[],running:false,attempted:false};
  const filter = {dining:{},shopping:{},transport:{}};
  const defaultModel = () => {
    const profiles = Object.fromEntries(D.members.map(name => [name,{done:{},tasks:{},favorites:{},shopping:[],expenses:[]}]));
    return {profile:'Judy',profiles,fx:null};
  };
  const storageKey='tokyo-family-trip-2027.v1';
  let memory = defaultModel();
  let canStore = true;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object') {
      for (const name of D.members) Object.assign(memory.profiles[name],saved.profiles?.[name]);
      if (D.members.includes(saved.profile)) memory.profile=saved.profile;
      if (saved.fx && Number.isFinite(saved.fx.rate) && saved.fx.rate>0) {
        memory.fx=saved.fx;
        fx.value={...saved.fx,mode:saved.fx.mode==='manual'?'manual':'cached'};
      }
    }
  } catch { canStore=false; }
  let toastTimer;
  let model = Object.fromEntries(T.fields.map(([key],i)=>[key,T.plans[2].numbers[i]]));
  let modelPlan = 'b24';

  const me=()=>memory.profiles[memory.profile];
  const save=()=>{
    if (!canStore) return;
    try { localStorage.setItem(storageKey,JSON.stringify(memory)); }
    catch { canStore=false; notify('瀏覽器目前無法保存資料，這次開啟期間仍可使用。'); }
  };
  const esc=text=>String(text??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>new Intl.NumberFormat('zh-TW',{maximumFractionDigits:0}).format(n);
  const jpy=n=>'¥'+fmt(n);
  const twd=n=>'NT$'+fmt(n);
  const map=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
  const routeLink=(origin,destination,mode='transit',via='')=>'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(origin)+'&destination='+encodeURIComponent(destination)+'&travelmode='+mode+(via?'&waypoints='+encodeURIComponent(via):'');
  const photo=(id,decorative=false)=>'<img src="'+esc(window.TRIP_ASSETS?.[id]||'assets/'+id+'.jpg')+'" alt="'+esc(decorative?'':photoNames[id])+'">';
  const ext=(url,name)=>url?'<a rel="noopener noreferrer" target="_blank" href="'+esc(url)+'">'+esc(name)+'</a>':'';
  const links=items=>'<div class="links">'+items.map(([url,name])=>ext(url,name)).join('')+'</div>';
  const internal=(to,name,primary=false)=>'<a class="btn '+(primary?'primary':'')+'" href="#'+to+'">'+esc(name)+'</a>';
  const button=(action,label,extra='')=>'<button type="button" class="btn '+extra+'" data-action="'+action+'">'+esc(label)+'</button>';
  const chips=(...list)=>'<div class="chips">'+list.filter(Boolean).join('')+'</div>';
  const chip=(value,type='')=>'<span class="chip '+type+'">'+esc(value)+'</span>';
  const badge=value=>chip(value+' · '+({Confirmed:'已確認',Estimated:'估算',Pending:'待確認',Live:'即時取得'}[value]||value),value.toLowerCase());
  const options=(values,selected)=>values.map(v=>'<option '+(v===selected?'selected':'')+'>'+esc(v)+'</option>').join('');
  const section=(title,content,action='')=>'<section class="section"><div class="section-head"><h2>'+esc(title)+'</h2>'+action+'</div>'+content+'</section>';
  const heading=(title,desc='')=>'<header class="page-title"><h1>'+esc(title)+'</h1>'+(desc?'<p class="muted">'+esc(desc)+'</p>':'')+'</header>';
  const card=(title,detail,more='')=>'<article class="card"><h3>'+esc(title)+'</h3><p>'+esc(detail)+'</p>'+more+'</article>';
  const ticks=(group,key,label)=>'<label class="inline-check"><input type="checkbox" data-check="'+group+':'+esc(key)+'" '+(me()[group][key]?'checked':'')+'>'+esc(label)+'</label>';
  const dateFormatter=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'});
  const nowDate=(now=new Date())=>{
    const date=Object.fromEntries(dateFormatter.formatToParts(now).map(({type,value})=>[type,value]));
    return date.year+'-'+date.month+'-'+date.day;
  };
  const when=(day,e)=>Date.parse(day.date+'T'+e.time+':00'+(e.zone==='TST'?'+08:00':'+09:00'));
  const currentRoute=()=>{
    const [p,t]=location.hash.slice(1).split('/');
    return {page:pages.some(([id])=>id===p)?p:'home',tab:t};
  };
  function notify(msg) {
    const n=$('#notice');
    n.textContent=msg;
    n.hidden=false;
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>{n.hidden=true;},5000);
  }
  function tabs(page,items,active) {
    return '<nav class="tabrow" aria-label="頁籤">'+items.map(([id,label])=>
      '<a href="#'+page+'/'+id+'" '+(String(id)===String(active)?'aria-current="page"':'')+'>'+esc(label)+'</a>').join('')+'</nav>';
  }
  function taskList() {
    const done=D.tasks.filter(t=>me().tasks[t.id]).length;
    return '<p class="muted small">'+esc(memory.profile)+' 已勾選 '+done+' / '+D.tasks.length+' · 儲存在目前瀏覽器</p><div class="task-list">'+D.tasks.map(t=>
      '<div class="task"><input id="task-'+t.id+'" type="checkbox" data-check="tasks:'+t.id+'" '+(me().tasks[t.id]?'checked':'')+
      '><div><label for="task-'+t.id+'">'+esc(t.title)+'</label><div class="record-meta">'+esc(t.owner+' · '+t.due)+'</div><p class="small">'+esc(t.note)+'</p>'+
      ext(t.url,t.id==='taiwan'?'桃園機場（信用卡資訊查發卡行）':'官方資訊')+'</div></div>').join('')+'</div>';
  }
  function dashboard() {
    const now=new Date();
    const today=nowDate(now);
    const remain=Math.round((Date.parse(D.days[0].date)-Date.parse(today))/86400000);
    const tripDay=D.days.find(d=>d.date===today);
    const over=today>D.days[4].date;
    const upcoming=D.days.flatMap(d=>d.events.filter(e=>e.kind==='main').map(e=>({d,e,ts:when(d,e)}))).filter(x=>x.ts>now).sort((a,b)=>a.ts-b.ts)[0];
    const next=upcoming?upcoming.d.label+' '+upcoming.e.time+' '+upcoming.e.zone+' · '+upcoming.e.title:'五天行程已結束';
    const reminders=[['12/1 10:00 台灣時間','Judy 預約台灣信用卡來回接送，兩趟各一位成人，資格與費用待確認。','#transport/taiwan'],
      ['HOTEL CLAD 尚未訂房','1/26 兩間富士景房，優先雙床房與一泊二食。','#transport/stay'],
      ['御殿場租車尚未預訂','1/26–1/27 行程區段，先確認雪胎與駕駛條件。','#transport/rental'],
      ['日本私人包車待決定','1/28 四人 ¥16,000 為使用者報價。11:40 JST 前開始赴機場。','#transport/airport']];
    return '<section class="hero">'+photo('fuji',true)+'<div><p class="hero-meta">2027.01.24 – 01.28 ｜ 五天四夜</p><h1><span>Tokyo Family</span><span>Trip <b class="year">2027</b></span></h1>'+
      '<p class="hero-zh">東京家族旅行</p><div class="hero-foot"><span>東京・御殿場・富士山</span><span>4 位成人</span></div></div>'+
      '<div class="countdown"><strong>'+esc(remain>0?remain:over?'完成':'DAY '+tripDay.id)+'</strong><span>'+esc(remain>0?'距出發 · 天':over?'旅程已結束':'旅途中 · JST')+'</span></div></section>'+
      section('五天行程','<div class="daystrip">'+D.days.map(d=>'<a href="#itinerary/'+d.id+'" class="day-short">'+photo(d.photo,true)+'<span class="day-num">DAY '+d.id+' · '+esc(d.label)+'</span><b>'+esc(d.area)+'</b></a>').join('')+'</div>',
        '<div class="member-row" aria-label="四位家人">'+D.members.map(n=>'<button class="member" data-action="profile" data-value="'+n+'" aria-pressed="'+(n===memory.profile)+'"><i aria-hidden="true">'+n[0]+'</i>'+n+'</button>').join('')+'</div>')+
      '<div class="dash-lower">'+section(tripDay?'今天在日本':over?'旅行回顧':'出發前','<article class="panel"><h3>'+esc(tripDay?tripDay.title:over?'回顧收藏與費用':'下一個活動')+'</h3><p>'+esc(tripDay?tripDay.summary:next)+'</p>'+
        (tripDay?'<p class="small muted">'+esc(next)+'</p>':'')+'<div class="tools-row">'+internal(tripDay?'itinerary/'+tripDay.id:'itinerary/1','查看行程',true)+internal('tools','旅行工具')+'</div></article>')+
      section('三地天氣','<div id="weather-view">'+weatherView()+'</div>',button('weather','更新'))+'</div>'+
      section(over?'出發前安排紀錄':'住宿與交通提醒','<div class="grid four dash-alerts">'+reminders.map(([title,detail,url])=>
        '<article class="alert"><h3>'+esc(title)+'</h3><p class="small">'+esc(detail)+'</p><div class="tools-row">'+internal(url.slice(1),'查看詳情')+'</div></article>').join('')+'</div>')+
      section('旅行準備待辦','<article class="panel" id="tasks">'+taskList()+'</article>');
  }
  const weatherCities=[
    ['東京',35.7208,139.7861,'2027-01-24','2027-01-25','2027-01-28'],
    ['御殿場',35.3087,138.9537,'2027-01-26'],
    ['河口湖',35.5107,138.7564,'2027-01-27']
  ];
  function weatherName(code) {
    if (code===0) return '晴';
    if (code===1||code===2) return '晴時多雲';
    if (code===3) return '陰';
    if (code===45||code===48) return '霧';
    if ([71,73,75,77,85,86].includes(code)) return '雪';
    if ([95,96,99].includes(code)) return '雷雨';
    return code==null?'—':'降雨或降水';
  }
  function weatherView() {
    return '<div class="grid weather">'+weatherCities.map(([name],i)=>{
      const v=weather.value[i];
      if (!v) return '<article class="card weather-card"><h3>'+name+'</h3><p class="small muted">'+(weather.running?'讀取中…':'等待更新')+'</p></article>';
      const forecast=v.daily.time.map((d,n)=>[d,n]).filter(([d])=>weatherCities[i].slice(3).includes(d));
      return '<article class="card weather-card"><h3>'+name+'</h3><p class="value">'+esc(v.current.temperature_2m)+'°C</p><p class="small">'+weatherName(v.current.weather_code)+' · '+esc(v.current.time.slice(11))+' JST</p>'+
        (forecast.length?forecast.map(([d,n])=>'<p class="small">'+d.slice(5).replace('-','/')+' '+v.daily.temperature_2m_min[n]+'–'+v.daily.temperature_2m_max[n]+'°C · '+weatherName(v.daily.weather_code[n])+'</p>').join(''):'<p class="small muted">旅行日預報尚未進入範圍</p>')+
        badge('Live')+'</article>';
    }).join('')+'</div><p class="record-meta">'+esc(weather.message||(localFile?'離線可查行程，連網後可手動更新天氣。':'Open-Meteo 模型預報 · 日本時間'))+'</p>'+links([[S.meteo,'Open-Meteo'],[S.jma,'日本氣象廳']]);
  }
  async function getJson(url) {
    const c=new AbortController();
    const timer=setTimeout(()=>c.abort(),10000);
    try {
      const response=await fetch(url,{signal:c.signal});
      if(!response.ok) throw new Error('HTTP '+response.status);
      return await response.json();
    } finally {clearTimeout(timer);}
  }
  async function updateWeather() {
    if(weather.running) return;
    weather.attempted=true;
    weather.running=true;
    weather.message='讀取 Open-Meteo…';
    const draw=()=>{const el=$('#weather-view');if(el) el.innerHTML=weatherView();};
    draw();
    const results=await Promise.allSettled(weatherCities.map(([,lat,lon])=>getJson('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=16')));
    weather.value=results.map(x=>x.status==='fulfilled'&&x.value?.current&&x.value?.daily?.time?x.value:null);
    const count=weather.value.filter(Boolean).length;
    weather.message=count===3?'Open-Meteo 模型預報 · 日本時間 · 最多 16 日':count?'部分地點暫時無法取得。可查日本氣象廳。':'目前無法取得天氣。連網重試或查日本氣象廳。';
    weather.running=false;
    draw();
  }
  function eventTile(e,day,i,plan) {
    const key=day.id+'-'+plan+'-'+i;
    return '<article class="panel timeline-item '+(e.kind==='option'?'option':'')+'"><div><div class="time">'+e.time+'</div><div class="small muted">'+(e.zone==='TST'?'台灣時間':'JST')+'</div></div><div>'+
      '<h3>'+esc(e.title)+'</h3><p>'+esc(e.detail)+'</p>'+chips(chip(e.kind==='option'?'自由選項':'主要安排',e.kind==='option'?'easy':''),e.mins?chip(e.mins):'',e.cost?chip(e.cost,'estimated'):'')+
      '<div class="tools-row">'+ticks('done',key,'已完成')+(e.query?'<span class="links">'+ext(map(e.query),'Google Maps')+'</span>':'')+'</div></div></article>';
  }
  function agenda(tab) {
    const [dayId,planKey]=String(tab||'1').split('-');
    const day=D.days.find(d=>String(d.id)===dayId)||D.days[0];
    const plan=day.id===4&&planKey==='b'?'b':'a';
    const ev=plan==='b'?day.b:day.events;
    const primary=ev.map((e,i)=>e.kind==='main'?eventTile(e,day,i,plan):'').join('');
    const optional=ev.map((e,i)=>e.kind==='option'?eventTile(e,day,i,plan):'').join('');
    let extra='';
    if(day.id===1) extra=internal('transport/airport','到飯店的交通')+' '+internal('transport/taiwan','台灣信用卡送機')+' '+internal('transport/stay','入谷飯店');
    if(day.id===2) extra=internal('shopping','銀座店鋪')+' '+internal('dining','找午餐與晚餐')+links([[routeLink(D.places.hotel.en,'Ginza Station','transit'),'入谷至銀座'],[routeLink('HANDS Ginza','Shiseido Parlour','walking','MUJI Ginza|Matsuya Ginza|Ginza Mitsukoshi|GINZA SIX'),'銀座北至南步行路線'],[map('歌舞伎座 東銀座'),'附近文化景點：歌舞伎座']]);
    if(day.id===3||day.id===4) extra=internal('transport/rental','取還車與費用試算')+' '+internal('transport/roads','停車與道路')+' '+internal('transport/fuji','大眾運輸備案')+links([[day.id===3?S.outletMap:routeLink('HOTEL CLAD','Oishi Park','driving','Kitaguchi Hongu Fuji Sengen Jinja'),'路線與動線'],[map('ENEOS 御殿場駅'),'御殿場加油站'],[map('ENEOS 河口湖駅'),'河口湖加油站']]);
    if(day.id===5) extra=internal('transport/airport','包車與大眾運輸比較')+' '+internal('transport/taiwan','台灣信用卡接機')+links([[S.nrtShop,'成田 T1 餐飲與伴手禮']]);
    return tabs('itinerary',D.days.map(d=>[d.id,'DAY '+d.id+'｜'+d.label]),day.id)+
      '<section class="photo-cover">'+photo(day.photo,true)+'<p class="eyebrow">DAY '+day.id+' · '+day.label+'</p><h1>'+esc(day.title)+'</h1><p>'+esc(day.summary)+'</p></section>'+
      section('集合與休息','<div class="grid two">'+card('集合',plan==='b'?'10:00 HOTEL CLAD 大廳集合並確認交通。':day.meet)+card('步行與休息',day.walk+'。'+day.rest)+'</div>')+
      (day.id===4?tabs('itinerary',[['4','Plan A 晴天自駕'],['4-b','Plan B 雨雪與停駛應對']],plan==='a'?'4':'4-b'):'')+
      section('行程時間軸','<div class="timeline">'+primary+'</div>')+
      (optional?section('自由選項','<div class="timeline">'+optional+'</div>'):'')+
      section('備案與導航','<article class="panel"><p>'+esc(day.backup)+'</p><div class="tools-row">'+extra+'</div></article>');
  }
  const priceLabels=['查看店家菜單','低・小食／飲品','中・一般正餐','高・套餐／高價位'];
  function records(type,items) {
    const f=filter[type];
    return items.filter(v=>{
      const tokens=String(f.q||'').normalize('NFKC').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
      const text=[v.cn,v.ja,v.en,v.category,v.zone,v.address,v.tags,v.note].join(' ').normalize('NFKC').toLocaleLowerCase();
      return tokens.every(t=>text.includes(t))&&(!f.region||v.region===f.region)&&
        (!f.category||v.category===f.category||String(v.tags||'').includes(f.category))&&
        (!f.price||String(v.price)===f.price)&&(!f.reserve||v.reserve===f.reserve)&&
        (!f.four||v.four)&&(!f.parking||v.parking)&&(!f.fav||me().favorites[type+'-'+v.id]);
    });
  }
  function recordTile(v,type) {
    const key=type+'-'+v.id;
    const favored=!!me().favorites[key];
    const meta=type==='dining'?chips(chip(v.category),chip(priceLabels[v.price]||priceLabels[0]),v.reserve?chip('訂位：'+v.reserve):'',v.four?chip('四人候選'):'',v.parking?chip('有停車'):''):
      chips(chip(v.category),v.zone?chip(v.zone):'');
    return '<article class="card"><div class="card-head"><div><p class="eyebrow">'+esc(v.region)+'</p><h3>'+esc(v.cn)+'</h3></div>'+
      '<button type="button" class="icon-btn" data-action="fav" data-value="'+esc(key)+'" aria-label="'+esc('收藏 '+v.cn)+'" aria-pressed="'+favored+'">'+(favored?'♥':'♡')+'</button></div>'+
      '<p class="small muted">'+esc(v.ja+(v.en&&v.en!==v.ja?' · '+v.en:''))+'</p>'+meta+
      '<p class="small">'+esc(v.note||v.address)+'</p>'+
      '<details class="record-meta"><summary>營業與查核資料</summary><p>'+esc(v.address)+' · '+esc(v.hours)+'</p><p>'+esc(v.closed)+'</p><p>'+esc(v.validity)+' · '+v.checked+'</p>'+badge(v.status)+'</details>'+
      links([[v.official,type==='dining'?'官方資訊／訂位':'官方資訊'],[map(v.ja+' '+v.address),'Google Maps']])+'</article>';
  }
  function recordResults(type) {
    const rows=records(type,type==='dining'?D.dining:[...D.shopping,...T.zones]);
    return '<p class="small muted show-count" aria-live="polite">'+rows.length+' 筆結果</p>'+(rows.length?'<div class="grid">'+rows.map(v=>recordTile(v,type)).join('')+'</div>':'<p class="panel">沒有符合的結果。可清除部分篩選。</p>');
  }
  function filterSelect(key,label,values,f) {
    return '<label>'+esc(label)+'<select name="'+key+'"><option value="">全部</option>'+options(values,f[key])+'</select></label>';
  }
  function filterCheckbox(key,label,f) {
    return '<label class="filter-check"><input name="'+key+'" type="checkbox" '+(f[key]?'checked':'')+'>'+esc(label)+'</label>';
  }
  function listing(type) {
    const f=filter[type];
    const dining=type==='dining';
    const categories=dining?[...new Set(D.dining.map(v=>v.category).concat(['和牛','燒肉','海鮮','下午茶']))]:[...new Set([...D.shopping,...T.zones].map(v=>v.category))];
    const priceSelect='<label>價格帶<select name="price"><option value="">全部</option>'+priceLabels.slice(1).map((name,i)=>'<option value="'+(i+1)+'" '+(f.price===String(i+1)?'selected':'')+'>'+name+'</option>').join('')+'</select></label>';
    const nearby='<article class="panel"><h3>附近餐廳</h3><p>用 Google Maps 搜尋。可手動選地區，也可同意瀏覽器定位後將座標交給 Google Maps。</p>'+
      '<div class="tools-row"><label><span class="sr-only">地區</span><select id="near-region">'+options(D.regions,'上野／入谷')+'</select></label>'+button('near-manual','在地圖搜尋')+button('locate','使用我的位置')+'</div><p id="geo-message" class="record-meta" aria-live="polite"></p></article>';
    const buying='<div class="grid two">'+card('御殿場品牌與動線','冬季一般 10:00–19:00，當日與個店另查。從 WEST、EAST 或 HILL SIDE 挑想逛的店，到 ITADAKI TERRACE 集合。'+
      '園區提供接駁及停車資訊。',links([[S.outletMap,'官方園區圖'],[S.outletPDF,'下載園區圖'],[S.outletName,'官方品牌目錄'],[S.outletAccess,'接駁與停車']]))+
      card('日本退稅新制','2026/11/1 起採先付含稅價。符合資格者同一店同日合計未稅滿 ¥5,000，出境在購買後 90 天內出示護照並完成海關查驗，再由業者退款。退稅品若要托運，先完成海關確認再交運，並保存店家指定的退款方式。',links([[S.tax,'國稅廳旅客說明'],[S.taxDetail,'退稅制度細節'],[S.nrtShop,'機場伴手禮']]))+'</div>';
    return heading(dining?'美食探索':'購物探索',dining?'用中文、日文或英文搜尋精選餐廳。':'逛銀座、御殿場與周邊商店，收藏想去的店。')+
      (dining?nearby:buying+'<div class="tools-row">'+internal('tools/shopping','我的購物清單',true)+'</div>')+
      section(dining?'精選餐廳':'品牌與店鋪','<div class="panel"><form id="record-filters" class="filters" data-type="'+type+'">'+
        '<label class="wide">關鍵字<input name="q" type="search" placeholder="'+(dining?'例：和牛、ほうとう、ramen':'例：MUJI、精品、ハリー・ポッター')+'" value="'+esc(f.q||'')+'"></label>'+
        filterSelect('region','地區',D.regions,f)+filterSelect('category',dining?'料理':'類型',categories,f)+
        (dining?priceSelect+filterSelect('reserve','預約', ['建議','詢問','免預約'],f)+filterCheckbox('four','適合四人',f)+filterCheckbox('parking','有停車場',f):'')+
        filterCheckbox('fav','只看收藏',f)+button('reset-filter','清除篩選')+'</form></div><div id="results">'+recordResults(type)+'</div>');
  }
  const routes=[
    ['飯店 ↔ 銀座','日比谷線入谷 H19 至銀座 H09。出站往二丁目先逛北段，晚餐後可從銀座或東銀座回去。',S.ginza,routeLink(D.places.hotel.en,'Ginza Station')],
    ['新宿 ↔ 御殿場','直接搭高速巴士至 Outlet 或御殿場站，先核對同班次停靠點。留意座位預約與行李條件。站至 Outlet 有免費接駁。',S.outletAccess,routeLink('Busta Shinjuku','Gotemba Premium Outlets')],
    ['鐵路前往御殿場','可查小田急富士山號到御殿場，班次有限；或經國府津轉 JR 御殿場線，預留跨公司候車與車票確認。',S.romance,routeLink('Shinjuku Station','Gotemba Station')],
    ['Outlet ↔ HOTEL CLAD','從 HILL SIDE 依官方指標上樓到飯店、溫泉方向。大件行李確認可用電梯與飯店接駁上車點。',S.cladAccess,routeLink('Gotemba Premium Outlets Hill Side','HOTEL CLAD','walking')],
    ['御殿場 ↔ 河口湖','先核對 Outlet 至河口湖直達巴士的運行日、是否要預約、行李規定。遇停駛改御殿場直接返東京。',S.fujiBus,routeLink('Gotemba Premium Outlets','Kawaguchiko Station')],
    ['河口湖 ↔ 東京','查直達新宿・東京高速巴士或 JR 富士回遊。配合還車安排空位，搭車前留轉乘時間。',S.fujiReturn,routeLink('Kawaguchiko Station','Busta Shinjuku')]
  ];
  const transportTabs=[['flights','航班'],['taiwan','台灣接送'],['airport','成田往返'],['fuji','市區・富士山'],['rental','租車自駕'],['roads','停車及道路'],['stay','兩間飯店']];
  function flights() {
    return '<div class="grid two">'+card('去程｜MM626','1/24（日）10:40 台灣時間 桃園 T1 → 14:55 JST 成田 T1。抵達後至少保留三小時，到飯店目標 17:55。',chips(chip('使用者提供'),badge('Pending'))+links([[S.peachTPE,'桃園 T1 官方指引'],[map('Taoyuan International Airport Terminal 1'),'桃園 T1 地圖']]))+
      card('回程｜MM623','1/28（四）16:40 JST 成田 T1 北翼 4F → 20:00 台灣時間 桃園 T1。最晚 11:40 JST 開始赴機場。',chips(chip('使用者提供'),badge('Pending'))+links([[S.peachNRT,'成田 T1 官方指引'],[map('Narita Terminal 1 North Wing'),'成田 T1 北翼地圖']]))+'</div>'+
      section('航班時刻與行李查核','<article class="panel"><p>航空公司機場指南已核對兩地均為 T1。去回時刻保留訂單原資料，官方航線可用日期下拉查詢，出票與變更以訂單為準。公開冬季班表的非官方交叉資料另列 12–2 月回程 16:35，尚待 Peach 指定日期班表或訂單核實。如確認提前 5 分鐘，五小時緩衝的出發上限也前移至 11:35。</p>'+
      '<p>Peach 國際線一般報到窗口為起飛前 120 至 50 分鐘，登機口一般為起飛前 30 分鐘。隨身行李含個人物品合計兩件、總重 7 kg，登機箱三邊合計 115 cm 以內且須符合單邊限制。托運件數看票種與加購，單件標準 20 kg，超重按官網。</p>'+links([[S.peachLookup,'指定日期班表'],[S.peachStatus,'Peach 航班狀態'],[S.peachCheck,'報到規定'],[S.carry,'隨身行李'],[S.bags,'托運行李']])+'</article>');
  }
  function taiwanPickup() {
    return '<article class="alert"><h3>12/1（二）10:00 台灣時間 · Judy</h3><p>去程與回程皆規劃使用信用卡贈送的機場接送，均尚未預訂，預計 NT$0，依持卡資格與加價條件。</p></article>'+
      section('兩趟接送','<div class="grid two">'+card('1/24 去程・一位成人','內湖 → 桃園 T1。規劃約 07:00 接客、08:00 至櫃位集合，實際依業者與路況。')+
      card('1/28 回程・一位成人','桃園 T1 → 內湖。20:00 班機抵達後留入境、領行李時間。與業者確認等待政策、接機約定與航班延遲時的處理。')+'</div>')+
      section('預約前確認','<article class="panel"><p>詢問發卡行：免費來回資格、剩餘次數、預約期限、行李箱件數與尺寸、加大車型、服務地區及加價、取消與延誤。確認去程時間、回程等候和集合點。</p>'+links([[S.tpe,'桃園機場交通與航廈']])+'</article>');
  }
  function range(values,count=1) {
    if(!values)return '需詢價';
    const output=fn=>values[0]===values[1]?fn(values[0]/count):values.map(v=>fn(v/count)).join('–');
    return output(jpy)+' · '+output(v=>twd(v*fx.value.rate));
  }
  function airport() {
    const airportMap='Narita Airport Terminal 1 North Wing';
    const depart=D.places.hotel.en;
    const group=(title,items,returning)=>section(title,'<div class="grid">'+items.map((v,i)=>
      '<article class="card"><h3>'+esc(v.name)+'</h3><p><b>四人 </b>'+esc(range(v.cost))+'</p><p><b>每人 </b>'+esc(range(v.cost,4))+'</p>'+
      '<p class="small">'+esc(v.min+' · '+v.changes)+'</p><p>'+esc(v.comfort)+'</p><p>'+esc(v.schedule)+'</p><p class="small muted">'+esc(v.detail)+'</p>'+
      links([[v.url,'官方資訊'],[routeLink(returning?depart:airportMap,returning?airportMap:depart,(!returning&&i>=2)||(returning&&i===0)?'driving':'transit'),'路線導航']])+'</article>').join('')+'</div>');
    return '<article class="alert"><h3>1/28 返程至少保留五小時</h3><p>11:40 JST 為最晚上路時間。若訂單確認 16:35，改以 11:35 為上限；必要時再提早。規劃時間含候車與站內移動。</p></article>'+
      group('1/28｜飯店至成田',T.airport.out,true)+group('1/24｜成田至飯店',T.airport.in,false)+
      '<p class="record-meta">'+esc(fxBrief())+'。交通成本為目前票價及估算，1/28 私人包車來自使用者，無去程報價。</p>'+links([[S.nrtShop,'T1 餐飲、免稅與伴手禮'],[S.skyliner,'Skyliner 時刻'],[S.accessFare,'Access Express 票價']]);
  }
  function fujiTransport() {
    return '<div class="grid two">'+routes.map(([title,detail,source,directions])=>card(title,detail,links([[source,'官網'],[directions,'Google Maps']]))).join('')+'</div>'+
      links([[S.busBook,'高速巴士預約'],[S.odakyu,'小田急高速巴士'],[S.jr,'JR 東日本'],[S.fujiTrain,'富士回遊'],[S.circleBus,'河口湖周遊巴士']]);
  }
  function stay() {
    const h=D.places.hotel;
    const c=D.places.clad;
    return '<div class="grid two">'+
      '<article class="card"><p class="eyebrow">1/24–1/28 · 東京</p><h3>'+esc(h.cn)+'</h3><p>'+esc(h.ja+' · '+h.en)+'</p>'+chips(chip(h.booking),badge(h.status))+
      '<p>'+esc(h.address+' · '+h.tel)+'</p><p>'+esc(h.details)+'</p><p>一般入住 14:00、退房 11:00，訂單優先。飯店指引由日比谷線入谷站 3／4 號出口步行約一分鐘。推大件行李請看電梯符號與乘車方向：下谷方面有地面電梯路線，依東京 Metro 平面圖選出口。也可從京成上野搭計程車。</p>'+
      '<p>館旁停車一般車 ¥2,000／晚，先詢問預約。附近可查便利店、超市、藥妝與早餐。</p>'+
      links([[h.official,'飯店官網'],[S.hotelAccess,'飯店交通與停車'],[S.iriya,'東京 Metro 無障礙'],[S.iriyaMap,'入谷車站平面圖'],[map(h.en+' '+h.address),'飯店導航']])+'</article>'+
      '<article class="card"><p class="eyebrow">1/26–1/27 · 御殿場</p><h3>'+esc(c.cn)+'</h3><p>'+esc(c.ja+' · '+c.address+' · '+c.tel)+'</p>'+chips(chip(c.booking,'pending'),chip('官網查詢快照 · '+D.checked,'live'))+
      '<p>'+esc(c.details)+'</p><p><b>富士景雙床</b> 23㎡，兩張約 115 cm 床。<b>富士景雙人床</b> 23㎡，一張 180 cm 床。一般房型為淋浴間。可見富士山的情況依雲層、天候與房位。</p>'+
      '<p>2026/11/25 官網查詢 1/26–1/27、兩房各兩成人，富士景雙床顯示剩 3 間。一泊二食兩房 ¥70,200（平均 ¥35,100／房），含早餐兩房 ¥50,200（平均 ¥25,100／房），價差 ¥20,000。費用含消費稅，入湯稅另計，一般每位 ¥150、四人約 ¥600。富士景雙人房在該條件下顯示無空房。庫存與價格會變動。 </p><p>這兩個方案的取消費由入住前 7 日起依階段收取：7 日前起 20%、3 日前起 30%、前一日 50%、當日或未到 100%。以 1/26 入住倒推，通常需在 1/18 前完成免費取消，確切時間依訂單。入住前或退房後行李寄存尚待飯店答覆。</p>'+
      '<p>花衣早餐 07:00–09:30（09:00 最後入店），一泊二食晚餐為以靜岡料理為特色的自助餐，17:30–21:30（20:30 最晚入場），該方案最晚入住 20:00。早餐為和洋自助餐。住客泡湯一般入住後至 23:00、翌日 06:00–09:00，依最新規則。</p>'+
      '<p>Outlet HILL SIDE 沿飯店／木之花之湯標示前往。專用停車一般免費，退房日 14:00 前可停，車高與特殊車種先問。</p>'+
      links([[S.cladBook,'官方訂房'],[S.cladDinnerPlan,'指定日一泊二食'],[S.cladBreakfastPlan,'指定日含早餐'],[S.cityBath,'御殿場市入湯稅'],[S.cladRooms,'房型'],[S.cladFood,'餐飲'],[S.cladBath,'木之花之湯'],[S.cladFAQ,'飯店常見問題'],[S.cladAccess,'停車及動線'],[map('HOTEL CLAD'),'飯店導航']])+'</article></div>';
  }
  const modelSum=input=>{
    const gas=input.km>0&&input.kmpl>0?Math.round(input.km/input.kmpl*input.fuel):0;
    const total=T.fields.slice(0,13).reduce((sum,[key])=>sum+input[key],gas);
    return {gas,total};
  };
  const planInput=p=>Object.fromEntries(T.fields.map(([key],i)=>[key,p.numbers[i]]));
  function rental() {
    const baseline=T.plans.at(-1);
    const plans=T.plans.map(p=>{
      const {total}=modelSum(planInput(p));
      const diff=baseline.mid-p.mid;
      const compare=diff===0?'基準':(diff>0?'中位估快 ':'中位估慢 ')+Math.abs(diff)+' 小時';
      return '<article class="card"><h3>'+esc(p.name)+'</h3>'+chips(badge('Estimated'),p.id==='b24'?chip('優先查詢','easy'):p.id==='c'?chip('次選'):'')+
        '<p class="route">'+esc(p.route)+'</p><p>'+esc(p.basis)+'</p><p class="small">'+esc('總交通 '+p.time+' · 駕駛 '+p.drive+' · 轉乘 '+p.transfer+' · '+compare)+'</p><p class="small">'+esc(p.comfort)+'</p>'+
        '<p><strong>'+jpy(total)+' · '+twd(total*fx.value.rate)+'</strong>／四人</p><p class="small">'+jpy(total/4)+' · '+twd(total*fx.value.rate/4)+'／人</p>'+
        '<div class="tools-row"><button type="button" class="btn" data-action="use-plan" data-value="'+p.id+'">帶入試算</button></div></article>';
    }).join('');
    return '<article class="alert"><h3>先看雪胎與駕駛條件，再決定取還車方式</h3><p>首選先查 Toyota 御殿場站 1/27 當天取還的七至八人座 MPV，可保留首日 Outlet 時間並減少租期。次選御殿場取、富士河口湖還，縮短折返但先確認跨縣、雪胎和車級。若冬季條件不符，採大眾運輸。兩日價格與庫存均尚未核實。</p></article>'+
      section('兩日交通比較','<div class="grid">'+plans+'</div><p class="record-meta">2026-11-25 規劃估算。金額採各方案距離、車輛與配套交通的假設。時間為兩日移動合計，含部分候車／取還流程，排除遊覽，各項可用下方模型覆核。'+esc(fxBrief())+'。</p>'+
        links([[S.toyotaRate,'Toyota 計價參考'],[S.toyotaOptions,'租車設備選項'],[S.toyotaOneWay,'異地還車'],[S.toll,'高速公路過路費'],[S.outletAccess,'巴士營運與接駁'],[S.fujiReturn,'富士急巴士']]))+
      section('四人租車成本試算','<article class="panel" id="rental-calculator">'+rentCalculator()+'</article>')+
      section('車型比較','<div class="grid">'+T.cars.map(c=>card(c.name,c.models,'<p>'+esc(c.choice)+'</p><p>'+esc(c.note)+'</p><p class="small muted">'+esc(c.price)+'</p>')).join('')+
        '</div><p class="record-meta">租車訂單多按級距，同級替代車、動力及輔助功能須以訂單與門市答覆為準。估算油耗受車款、道路與天氣影響。</p>')+
      section('租車公司與門市','<article class="panel"><label>搜尋公司、地區或門市 <input id="shop-search" type="search" value="'+esc(filter.transport.q||'')+'" placeholder="Toyota、御殿場、河口湖"></label></article><div id="shop-results">'+shopsView()+'</div>')+
      section('預約與取消','<article class="panel"><p>Toyota 官方說明一般最早可於取車前三個月預約，這段日期已落在一般預約窗口內。儘早向首選與備選門市詢價，並同時查 1/27 日租。核對預設有無稅金、冬季設備、有無雪胎指定選項、付款方式及確認信。先記下取消截止與費率。Toyota 一般規則可能自取車前第 6 日起收取消費，適用條款依訂單。</p>'+
      links([[S.toyotaCancel,'Toyota 預約與取消'],[S.toyotaBookingFAQ,'Toyota 預約窗口'],[S.nippon,'Nippon 官方預約'],[S.toyotaGotemba,'Toyota 御殿場門市']])+'</article>');
  }
  function rentCalculator() {
    return '<p class="muted">同一項費用已含在基本租金時，額外欄位請填 0。各欄為四人的費用。油費＝公里數 ÷ 每公升行駛公里 × 每公升油價。</p>'+
      '<div class="tools-row"><label>載入方案 <select id="rental-plan">'+T.plans.map(p=>'<option value="'+p.id+'" '+(modelPlan===p.id?'selected':'')+'>'+esc(p.name)+'</option>').join('')+'</select></label></div>'+
      '<div class="form-grid section">'+T.fields.map(([key,label,unit])=>'<label>'+esc(label)+' <span class="muted">'+unit+'</span><input type="number" min="0" max="99999999" step="any" inputmode="decimal" data-rental="'+key+'" value="'+model[key]+'"></label>').join('')+'</div>'+
      '<div id="rental-result" class="result" aria-live="polite">'+rentResult()+'</div>';
  }
  function rentResult() {
    if (model.km>0&&model.kmpl<=0) return '<p>請輸入大於零的每公升行駛公里數。</p>';
    const {gas,total}=modelSum(model);
    return '<p><strong>'+jpy(total)+' · '+twd(total*fx.value.rate)+'</strong>／四人</p><p>'+jpy(total/4)+' · '+twd(total*fx.value.rate/4)+'／人 · 含油費 '+jpy(gas)+'</p><p class="small">'+esc(fxBrief())+'</p>';
  }
  function shopsView() {
    const q=String(filter.transport.q||'').trim().toLowerCase();
    const rows=T.shops.filter(s=>(s.name+' '+s.ja+' '+s.area+' '+s.anchor+' '+s.detail).toLowerCase().includes(q));
    return '<p class="show-count small muted" aria-live="polite">'+rows.length+' 個結果 · 指定日期供應與裝備待核實</p>'+
      (rows.length?'<div class="grid">'+rows.map(s=>card(s.name,s.detail,'<p class="small muted">'+esc(s.ja+' · '+s.anchor)+'</p>'+
        links([[s.url,'官方門市／預約'],[map(s.ja),'Google Maps']]))).join('')+'</div>':'<p class="panel">沒有找到門市。可試著輸入地區或公司名稱。</p>');
  }
  function roads() {
    return '<article class="alert"><h3>路況不宜時採 Plan B</h3><p>雪胎是本次自駕必要條件。4WD 有助起步牽引，煞車及冰面仍要按路況留距。駕駛方向靠左，遇雪鏈管制須符合路段要求。App 連結官方路況，由駕駛與家人依當日公告決策。</p>'+
      links([[S.jartic,'JARTIC 路況'],[S.drive,'NEXCO 道路交通'],[S.nexco,'NEXCO 中日本'],[S.chain,'國土交通省雪鏈規定'],[S.jma,'日本氣象廳'],[S.sunset,'查日落']])+'</article>'+
      section('台灣駕照赴日文件','<article class="panel legal"><p>攜帶有效台灣駕照正本、認可的日文譯本與護照，並能證明入境日。日本一般自入境日起一年內、且原證有效期內，以較早者為限，重複入境與居留另有規則。租車門市的年齡、年資、付款卡與增列駕駛依業者。Vito 需先本人確認資格與冬季駕駛能力。</p>'+
      links([[S.npa,'日本警察廳'],[S.jpTwDriving,'日本台灣交流協會・台灣駕照'],[S.jaf,'JAF 認可文件'],[S.thb,'台灣公路局日文譯本']])+'</article>')+
      section('出車查核','<div class="grid two">'+T.roadChecks.map(([title,detail])=>card(title,detail)).join('')+'</div>')+
      section('停車場與加油','<div class="grid two">'+T.parking.map(([title,native,address,detail,url])=>card(title,detail,'<p class="small muted">'+esc(address)+'</p>'+
        links([[url,'官方資訊'],[map(native+' '+address),'Google Maps']]))).join('')+'</div>'+
        links([[map('ENEOS 御殿場駅'),'御殿場站附近加油'],[map('ENEOS 河口湖駅'),'河口湖站附近加油'],[map('EXPASA 足柄 SA'),'足柄服務區']]));
  }
  function transport(tab) {
    const routes={flights,taiwan:taiwanPickup,airport,fuji:fujiTransport,rental,roads,stay};
    const type=Object.hasOwn(routes,tab)?tab:'flights';
    return heading('交通導航','航班、機場接送、東京市區及富士山交通。')+tabs('transport',transportTabs,type)+routes[type]();
  }
  function fxBrief() {
    const tag={live:'最新公布',cached:'上次取得',manual:'手動估算',reference:'離線參考'}[fx.value.mode];
    return '¥1 ≈ NT$'+fx.value.rate.toFixed(5)+' · '+tag+' '+fx.value.date;
  }
  function currency() {
    return '<article class="panel"><h2>日幣・台幣換算</h2><p class="muted">Frankfurter 提供日度參考匯率。結帳使用銀行或發卡行匯率。</p>'+
      '<div class="tools-row"><p id="fx-brief">'+esc(fxBrief())+'</p>'+button('update-fx','取得最新匯率', 'primary')+'</div><p id="fx-message" class="record-meta" role="status">'+esc(fx.message)+'</p>'+
      '<form class="form-grid section" id="manual-rate"><label>手動匯率（JPY 1 → TWD）<input name="rate" type="number" min="0.00001" max="100" step="any" value="'+fx.value.rate+'" required></label><button type="submit" class="btn">套用手動匯率</button>'+button('reset-fx','恢復離線參考')+'</form>'+
      '<div class="form-grid section"><label>方向<select id="fx-direction"><option value="jpy">JPY → TWD</option><option value="twd">TWD → JPY</option></select></label><label>金額<input id="fx-amount" type="number" min="0" max="999999999" value="10000" inputmode="decimal"></label></div>'+
      '<p id="fx-result" class="result" aria-live="polite"></p>'+links([[S.fx,'Frankfurter'],[S.bank,'臺灣銀行牌告匯率']])+'</article>';
  }
  function fxDraw(){
    const result=$('#fx-result');
    if(!result)return;
    const amount=Number($('#fx-amount').value)||0;
    const toTwd=$('#fx-direction').value==='jpy';
    result.textContent=(toTwd?jpy(amount):twd(amount))+' ≈ '+(toTwd?twd(amount*fx.value.rate):jpy(amount/fx.value.rate));
    $('#fx-brief').textContent=fxBrief();
    $('#fx-message').textContent=fx.message;
    $('input[name=rate]').value=fx.value.rate;
  }
  async function updateFx(){
    const btn=$('[data-action=update-fx]');
    if(btn)btn.disabled=true;
    fx.message='讀取 Frankfurter…';
    fxDraw();
    try {
      const rate=await getJson('https://api.frankfurter.dev/v2/rate/JPY/TWD');
      if(!Number.isFinite(rate.rate)||rate.rate<=0||!/^\d{4}-\d{2}-\d{2}$/.test(rate.date))throw Error('Rate schema');
      fx.value={rate:rate.rate,date:rate.date,mode:'live'};
      memory.fx=fx.value;
      save();
      fx.message='已更新日度參考匯率。';
    }catch{fx.message='目前無法取得新匯率，保留畫面顯示的匯率。';}
    if(btn)btn.disabled=false;
    fxDraw();
  }
  const id=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);
  function shoppingTool() {
    const rows=me().shopping;
    const total=rows.reduce((sum,row)=>sum+(row.price||0),0);
    const bought=rows.filter(row=>row.bought).reduce((sum,row)=>sum+(row.price||0),0);
    const budget=rows.reduce((sum,row)=>sum+(row.budget||0),0);
    return '<article class="panel"><h2>'+esc(memory.profile)+' 的購物清單</h2><p class="muted">清單儲存在這台裝置。可匯出 CSV。</p>'+
      '<form id="shopping-form" class="form-grid section"><input type="hidden" name="id"><label>商品<input name="name" required maxlength="100" placeholder="例：焙茶餅乾"></label><label>品牌<input name="brand" maxlength="80"></label><label>預算 JPY<input name="budget" type="number" min="0" max="99999999" step="1" inputmode="numeric"></label><label>標價／實付 JPY<input name="price" type="number" min="0" max="99999999" step="1" inputmode="numeric"></label><label class="wide">備註<input name="note" maxlength="300"></label><button type="submit" class="btn primary">存入清單</button>'+button('cancel-edit','清除表單')+'</form>'+
      '<p class="result">預算 '+jpy(budget)+' · 清單 '+jpy(total)+'（約 '+twd(total*fx.value.rate)+'） · 已購 '+jpy(bought)+'</p><div class="tools-row">'+button('export-shopping','匯出購物清單')+'</div>'+
      '<div class="shopping-list">'+(rows.length?rows.map(v=>'<div class="list-row"><label class="inline-check"><input type="checkbox" data-shopping="'+esc(v.id)+'" '+(v.bought?'checked':'')+'><strong>'+esc(v.name)+'</strong><span class="small muted">已購</span></label>'+
        '<p class="small break-anywhere">'+esc([v.brand,v.note].filter(Boolean).join(' · '))+'</p><p class="small">'+esc((v.budget!=null?'預算 '+jpy(v.budget):'')+(v.price!=null?' · '+jpy(v.price)+' ≈ '+twd(v.price*fx.value.rate):''))+
        '</p><div class="tools-row"><button type="button" class="btn" data-action="edit-shop" data-value="'+esc(v.id)+'">編輯</button><button type="button" class="btn danger" data-action="remove-shop" data-value="'+esc(v.id)+'">移除</button></div></div>').join(''):'<p class="muted">清單目前是空的。</p>')+'</div></article>';
  }
  function settle(rows,code) {
    const balances=Object.fromEntries(D.members.map(n=>[n,0]));
    for(const row of rows.filter(r=>r.currency===code)){
      const share=Math.floor(row.amount/row.people.length);
      balances[row.payer]+=row.amount;
      row.people.forEach((n,i)=>{balances[n]-=share+(i<row.amount%row.people.length?1:0);});
    }
    const debt=D.members.filter(n=>balances[n]<0).map(n=>({n,value:-balances[n]}));
    const credit=D.members.filter(n=>balances[n]>0).map(n=>({n,value:balances[n]}));
    const payments=[];
    for(const from of debt)for(const to of credit){
      const value=Math.min(from.value,to.value);
      if(value>0)payments.push([from.n,to.n,value]);
      from.value-=value;
      to.value-=value;
    }
    return payments;
  }
  function expenses() {
    const rows=me().expenses;
    const yen=rows.filter(r=>r.currency==='JPY').reduce((sum,row)=>sum+row.amount,0);
    const nt=rows.filter(r=>r.currency==='TWD').reduce((sum,row)=>sum+row.amount,0);
    const payments=['JPY','TWD'].flatMap(code=>settle(rows,code).map(([from,to,value])=>'<li>'+esc(from+' → '+to+' '+(code==='JPY'?jpy(value):twd(value)))+'</li>'));
    return '<article class="panel"><h2>全家共用分帳</h2><p>到 Google 試算表一起登記代墊、分攤和還款。請用已獲分享權限的 Google 帳號開啟。</p>'+
      links([[sharedExpenseSheet,'開啟共用 Google 試算表']])+'</article>'+
      '<div class="grid two section"><article class="panel"><h2>'+esc(memory.profile)+' 的個人試算</h2><p class="muted">試算紀錄保存在這台裝置的瀏覽器。各幣別獨立結算。</p>'+
      '<form class="form-grid section" id="expense-form"><label>項目<input name="name" maxlength="100" required placeholder="例：成田包車"></label><label>金額<input name="amount" type="number" min="1" max="99999999" step="1" required inputmode="numeric"></label><label>幣別<select name="currency"><option>JPY</option><option>TWD</option></select></label><label>代墊人<select name="payer">'+options(D.members,memory.profile)+'</select></label>'+
      '<fieldset class="wide"><legend>分攤成員</legend><div class="member-row">'+D.members.map(n=>'<label class="inline-check"><input type="checkbox" name="people" value="'+n+'" checked>'+n+'</label>').join('')+'</div></fieldset>'+
      '<button type="submit" class="btn primary">加入支出</button></form></article><article class="panel"><h2>結算</h2><p class="result">'+jpy(yen)+' ＋ '+twd(nt)+'<br>總計約 '+twd(yen*fx.value.rate+nt)+'</p>'+
      '<p class="small muted">餘數依畫面成員順序各加 1 元，轉帳逐幣別結算。'+esc(fxBrief())+'。</p>'+(payments.length?'<ul>'+payments.join('')+'</ul>':'<p>目前無需互轉。</p>')+'</article></div>'+
      section('支出紀錄','<article class="panel">'+(rows.length?rows.map(r=>'<div class="list-row"><h3 class="break-anywhere">'+esc(r.name)+'</h3><p>'+
        esc((r.currency==='JPY'?jpy(r.amount):twd(r.amount))+' · 代墊 '+r.payer+' · '+r.people.join('、'))+'</p><div class="tools-row"><button type="button" class="btn danger" data-action="remove-expense" data-value="'+esc(r.id)+'">移除</button></div></div>').join(''):'<p>尚無支出。</p>')+'</article>');
  }
  const toolTabs=[['currency','匯率換算'],['shopping','購物清單'],['expenses','費用分攤']];
  function toolsView(tab) {
    const views={currency,shopping:shoppingTool,expenses};
    const active=Object.hasOwn(views,tab)?tab:'currency';
    return heading('旅行工具','目前使用者：'+memory.profile)+tabs('tools',toolTabs,active)+views[active]();
  }
  const credits=[
    ['富士山與河口湖','LMP 2001','CC BY-SA 4.0','Mount_Fuji_view_from_Lake_Kawaguchi_2024-12-01.jpg','https://creativecommons.org/licenses/by-sa/4.0/'],
    ['上野站','UE-PON2600','CC BY-SA 3.0','Ueno_station_Front_entrance.jpg','https://creativecommons.org/licenses/by-sa/3.0/'],
    ['銀座四丁目','Kentagon','CC BY-SA 4.0','GinzaWako_Tokyo2012.JPG','https://creativecommons.org/licenses/by-sa/4.0/'],
    ['御殿場 Outlet','Jungle','CC BY-SA 3.0','Gotemba_premium_outlets1.jpg','https://creativecommons.org/licenses/by-sa/3.0/'],
    ['成田 T1','Terence Ong','CC BY 2.5','Narita_International_Airport,_Terminal_1.JPG','https://creativecommons.org/licenses/by/2.5/']
  ];
  const sourceGroups=[
    ['航空與機場',[[S.peachLookup,'Peach 指定日期時刻表'],[S.peachWinter,'Peach 冬季銷售公告'],[S.peachTPE,'桃園航廈'],[S.peachNRT,'成田航廈'],[S.peachCheck,'報到'],[S.carry,'機艙行李'],[S.bags,'托運'],[S.nrtShop,'成田商店']]],
    ['住宿、景點與購物',[[S.hotel,'Vessel Inn'],[S.cladBook,'HOTEL CLAD 預約'],[S.cladRooms,'CLAD 房型'],[S.outlet,'御殿場 Outlet'],[S.outletPDF,'Outlet 園區圖'],[S.oishi,'大石公園'],[S.shrine,'北口本宮'],[S.oshino,'忍野村'],[S.arakura,'新倉山淺間公園'],[S.tax,'日本退稅新制'],[S.jnto,'JNTO'],[S.visit,'Visit Japan Web']]],
    ['鐵路、巴士與駕駛',[[S.skyFare,'京成票價'],[S.iriya,'入谷無障礙'],[S.jr,'JR 東日本'],[S.odakyu,'小田急巴士'],[S.fujiBus,'御殿場與河口湖巴士'],[S.toyota,'Toyota'],[S.nippon,'Nippon'],[S.jaf,'JAF'],[S.thb,'台灣公路局'],[S.npa,'日本警察廳'],[S.jartic,'JARTIC'],[S.drive,'NEXCO']]],
    ['即時查詢提供者',[[S.meteo,'Open-Meteo'],[S.jma,'日本氣象廳'],[S.fx,'Frankfurter'],[S.bank,'臺灣銀行']]]
  ];
  function sources(){
    const offline=window.TRIP_ASSETS?
      '<p>你正在使用單檔離線版，相片及行程已內嵌。天氣、匯率更新、查詢官網與地圖需要網路。</p>':
      '<p>下載單檔後可以直接用瀏覽器開啟。離線可用行程、相片、店鋪搜尋、清單與試算。</p><div class="tools-row"><a class="btn primary" href="Tokyo-Family-Trip-2027-offline.html" download>下載單檔離線版</a></div>';
    return heading('資料與離線版','研究基準 '+D.checked)+
      '<article class="panel"><h2>查核狀態</h2>'+chips(badge('Confirmed'),badge('Estimated'),badge('Pending'),badge('Live'))+
      '<p>官方通用資訊已核對，以旅行日業者公告為準。旅行意向與訂房狀態獨立記錄。使用者資料包括預訂住宿、航班時刻、成員分工、私人包車報價、接送規劃及行程緩衝。規劃費用與時間可隨後續報價調整。</p></article>'+
      section('待複核資訊','<article class="panel"><ul><li>Peach 指定日航班時刻與票種、成田包車和台灣信用卡接送。</li><li>HOTEL CLAD 請重查下單時庫存、最終價格、免費取消時點及行李寄存。</li><li>租車車級、雪胎、跨縣、保險和取還店。班次、車票、餐廳與停車等依指定日公告。</li></ul></article>')+
      section('官方資料','<div class="grid two">'+sourceGroups.map(([title,items])=>'<article class="card"><h3>'+esc(title)+'</h3>'+links(items)+'</article>').join('')+'</div>')+
      section('離線及個人資料','<article class="panel">'+offline+'<p>個人勾選、收藏、購物和費用存在目前瀏覽器，四位家人可分別選名字。清單不會跨裝置同步，同一瀏覽器的姓名切換可查看各自本機資料。清除瀏覽器資料可能一併清除紀錄。</p></article>')+
      section('照片來源','<article class="panel"><p>照片取自 Wikimedia Commons，縮放與壓縮顯示。</p><ul>'+credits.map(([title,author,license,file,link])=>'<li>'+esc(title+' · '+author)+' · '+ext('https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file),'原始檔')+' · '+ext(link,license)+'</li>').join('')+'</ul></article>');
  }
  function updateNav(active) {
    $('#primary').innerHTML=pages.map(([name,label,short=label])=>'<a href="#'+name+'" aria-label="'+esc(label)+'" '+(name===active?'aria-current="page"':'')+'><span class="nav-long">'+label+'</span><span class="nav-short" aria-hidden="true">'+short+'</span></a>').join('');
    $('#profile').innerHTML=options(D.members,memory.profile);
    const chosen=$('#primary [aria-current]');
    const nav=$('#primary');
    if(chosen&&nav.scrollWidth>nav.clientWidth)nav.scrollLeft=chosen.offsetLeft-nav.offsetLeft-9;
  }
  function render(move=false) {
    const {page,tab}=currentRoute();
    updateNav(page);
    const views={home:dashboard,itinerary:()=>agenda(tab),dining:()=>listing('dining'),shopping:()=>listing('shopping'),
      transport:()=>transport(tab),tools:()=>toolsView(tab),sources};
    root.innerHTML=views[page]();
    if(move){window.scrollTo(0,0);root.focus({preventScroll:true});}
    if(!canStore)root.insertAdjacentHTML('afterbegin','<p class="panel small">這個瀏覽器目前無法保存資料。你仍可在本次開啟期間使用與匯出。</p>');
    if(page==='home'&&!weather.attempted&&!localFile)updateWeather();
    fxDraw();
  }
  function changeProfile(name){
    if(!D.members.includes(name))return;
    memory.profile=name;save();render();notify('已切換至 '+name);
  }
  function usePlan(key,scroll){
    const found=T.plans.find(p=>p.id===key);
    if(!found)return;
    modelPlan=key;
    model=planInput(found);
    const calc=$('#rental-calculator');
    if(calc){
      calc.innerHTML=rentCalculator();
      if(scroll){calc.scrollIntoView({block:'start'});$('#rental-plan',calc).focus({preventScroll:true});}
    }
  }
  function updateFilter(e) {
    const form=e.target.closest('#record-filters');
    if(!form||!e.target.name)return;
    filter[form.dataset.type][e.target.name]=e.target.type==='checkbox'?e.target.checked:e.target.value;
    $('#results').innerHTML=recordResults(form.dataset.type);
  }
  function openMap(url) { window.open(url,'_blank','noopener,noreferrer'); }
  function locate(){
    const say=msg=>{const el=$('#geo-message');if(el)el.textContent=msg;};
    if(!navigator.geolocation){say('瀏覽器不提供定位。請選擇地區搜尋。');return;}
    say('請在瀏覽器提示中決定是否分享位置。');
    navigator.geolocation.getCurrentPosition(({coords})=>{
      const url=map('restaurants near '+coords.latitude.toFixed(4)+','+coords.longitude.toFixed(4));
      const msg=$('#geo-message');
      if(msg)msg.innerHTML='位置已取得。'+ext(url,'在 Google Maps 搜尋附近餐廳');
    },()=>say('無法使用定位。你可以手動選地區搜尋。'),{timeout:10000,maximumAge:30000});
  }
  function exportShopping(){
    const rows=me().shopping;
    const quote=cell=>{
      let value=String(cell??'');
      if(/^[\s]*[=+\-@]|^[\t\r\n]/.test(value))value="'"+value;
      return '"'+value.replace(/"/g,'""')+'"';
    };
    const table=[['商品','品牌','預算 JPY','價格 JPY','約 TWD','已購入','備註','匯率 JPY→TWD','匯率日期'],
      ...rows.map(r=>[r.name,r.brand,r.budget,r.price,r.price==null?'':Math.round(r.price*fx.value.rate),r.bought?'是':'否',r.note,fx.value.rate,fx.value.date])];
    const url=URL.createObjectURL(new Blob(['\ufeff'+table.map(r=>r.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='Tokyo-購物清單-'+memory.profile+'.csv';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function share(){
    if(localFile){notify('離線檔可直接傳送。開啟上線版本後即可分享網址。');return;}
    const url=new URL(location.pathname,location.origin).href;
    try{
      if(navigator.share){await navigator.share({title:document.title,url});return;}
      if(navigator.clipboard){await navigator.clipboard.writeText(url);notify('網址已複製，可貼入 LINE。');return;}
    }catch(err){if(err.name==='AbortError')return;}
    prompt('複製網址並貼入 LINE',url);
  }
  function removeRow(key,value){
    me()[key]=me()[key].filter(item=>item.id!==value);
    save();render();notify('已移除。');
  }
  function editShopping(value){
    const v=me().shopping.find(x=>x.id===value);
    const form=$('#shopping-form');
    if(v&&form){
      for(const name of ['id','name','brand','budget','price','note'])form.elements.namedItem(name).value=v[name]??'';
      form.elements.namedItem('name').focus();
    }
  }
  const actions={
    profile:btn=>changeProfile(btn.dataset.value),
    weather:updateWeather,
    'near-manual':()=>openMap(map($('#near-region').value+' 日本 レストラン restaurant')),
    locate,
    fav:btn=>{
      const key=btn.dataset.value;
      const next=!me().favorites[key];
      me().favorites[key]=next;
      save();
      const type=key.split('-')[0];
      if(filter[type].fav){$('#results').innerHTML=recordResults(type);return;}
      btn.setAttribute('aria-pressed',String(next));btn.textContent=next?'♥':'♡';
    },
    'reset-filter':()=>{filter[currentRoute().page]={};render();$('#record-filters input[name=q]').focus();},
    'use-plan':btn=>usePlan(btn.dataset.value,true),
    'update-fx':updateFx,
    'reset-fx':()=>{memory.fx=null;fx.value=FX_DEFAULT;fx.message='已恢復離線參考匯率。';save();fxDraw();},
    'cancel-edit':()=>$('#shopping-form').reset(),
    'export-shopping':exportShopping,
    'edit-shop':btn=>editShopping(btn.dataset.value),
    'remove-shop':btn=>removeRow('shopping',btn.dataset.value),
    'remove-expense':btn=>removeRow('expenses',btn.dataset.value)
  };
  root.addEventListener('click',event=>{
    const btn=event.target.closest('button[data-action]');
    if(btn&&Object.hasOwn(actions,btn.dataset.action))actions[btn.dataset.action](btn);
  });
  root.addEventListener('input',event=>{
    const el=event.target;
    if(el.matches('#record-filters input[type=search]'))updateFilter(event);
    if(el.id==='shop-search'){filter.transport.q=el.value;$('#shop-results').innerHTML=shopsView();}
    if(el.dataset.rental){
      const amount=Number(el.value);
      model[el.dataset.rental]=Number.isFinite(amount)&&amount>=0&&amount<=99999999?amount:0;
      $('#rental-result').innerHTML=rentResult();
    }
    if(el.id==='fx-amount')fxDraw();
  });
  root.addEventListener('change',event=>{
    const el=event.target;
    if(el.matches('#record-filters select,#record-filters input[type=checkbox]'))updateFilter(event);
    if(el.dataset.check){
      const [group,key]=el.dataset.check.split(':');
      me()[group][key]=el.checked;
      save();
      if(group==='tasks'){
        $('#tasks').innerHTML=taskList();
        document.getElementById(el.id)?.focus({preventScroll:true});
      }
    }
    if(el.dataset.shopping){
      const row=me().shopping.find(v=>v.id===el.dataset.shopping);
      if(row){row.bought=el.checked;save();render();}
    }
    if(el.id==='rental-plan')usePlan(el.value,false);
    if(el.id==='fx-direction')fxDraw();
  });
  root.addEventListener('submit',event=>{
    event.preventDefault();
    const form=event.target;
    const formId=form.getAttribute('id');
    const data=new FormData(form);
    const clean=name=>String(data.get(name)||'').trim();
    const numeric=name=>data.get(name)===''?null:Number(data.get(name));
    if(formId==='manual-rate'){
      const rate=numeric('rate');
      if(!Number.isFinite(rate)||rate<=0)return;
      fx.value={rate,date:nowDate(),mode:'manual'};
      memory.fx=fx.value;fx.message='已套用手動匯率。';save();fxDraw();
    }
    if(formId==='shopping-form'){
      const name=clean('name');
      if(!name){notify('請輸入商品名稱。');return;}
      const old=me().shopping.find(v=>v.id===clean('id'));
      const row={id:old?.id||id(),name,brand:clean('brand'),budget:numeric('budget'),price:numeric('price'),note:clean('note'),bought:old?.bought||false};
      if(old)Object.assign(old,row);else me().shopping.push(row);
      save();render();notify('購物清單已儲存。');
    }
    if(formId==='expense-form'){
      const name=clean('name');
      const amount=numeric('amount');
      const people=D.members.filter(n=>data.getAll('people').includes(n));
      if(!name||!Number.isInteger(amount)||amount<1||!people.length){notify('請輸入項目、整數金額及至少一位分攤成員。');return;}
      me().expenses.push({id:id(),name,amount,people,payer:clean('payer'),currency:clean('currency')});
      save();render();notify('已加入支出。');
    }
  });
  $('#profile').addEventListener('change',e=>changeProfile(e.target.value));
  $('#share').addEventListener('click',share);
  $('.skip').addEventListener('click',e=>{e.preventDefault();root.focus();});
  window.addEventListener('hashchange',()=>render(true));
  render();
})();
