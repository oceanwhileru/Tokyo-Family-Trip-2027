'use strict';
window.TRANSPORT = (() => {
  const {src,venue}=window.TRIP;
  const cladPlan=id=>'https://go-odakyu-resorts.reservation.jp/ja/hotels/gotemba-hotelclad/plans/'+id+'?room_id=10016850&checkin_date=20270126&checkout_date=20270127&adults=2&rooms=2&dateUndecidedFlg=0';
  Object.assign(src,{
    toyotaOneWay:'https://rent.toyota.co.jp/eng/service/oneway/simulation.aspx',
    toyotaBookingFAQ:'https://www.rent.toyota.co.jp/global_eng/faq/',
    toyotaUenoExact:'https://rent.toyota.co.jp/shop/detail.aspx?eCode=002&rCode=63601',
    jpTwDriving:'https://www.koryu.or.jp/consul/drivers/detail3/',
    peachLookup:'https://www.flypeach.com/book/schedules/tw/',
    peachGroup:'https://www.anahd.co.jp/group/en/pr/202608/20260818.html',
    cladBook:'https://go-odakyu-resorts.reservation.jp/ja/hotels/gotemba-hotelclad/searchInput',
    cladDinnerPlan:cladPlan('10187478'),
    cladBreakfastPlan:cladPlan('10187477'),
    cityBath:'https://www.city.gotemba.lg.jp/kurashi/b-2/b-2-6/294.html',
    skyFare:'https://www.keisei.co.jp/keisei/tetudou/skyliner/us/faq/index.php',
    mainFare:'https://www.keisei.co.jp/keisei/tetudou/skyliner/us/traffic/main_fares.php',
    toyotaRate:'https://rent.toyota.co.jp/global_eng/service/charge.html',
    toyotaOptions:'https://rent.toyota.co.jp/global_eng/service/option.html',
    toyotaCancel:'https://rent.toyota.co.jp/global_eng/faq/reserve.html',
    nipponGotemba:'https://store.nipponrentacar.co.jp/en/b/nrs/info/470256/',
    outletName:'https://www.premiumoutlets.co.jp/en/gotemba/brands/shop_name.html',
    taxDetail:'https://www.nta.go.jp/publication/pamph/shohi/menzei/202506/pdf/0025006-106.pdf',
    iriyaMap:'https://www.tokyometro.jp/station/iriya/yardmap/index_print.html',
    romance:'https://www.odakyu.jp/english/romancecar/'
  });
  const zones=[
    venue('gucci',2,'Gucci','グッチ','Gucci','Gotemba Premium Outlets',src.outletName,'精品','依品牌與園區',{zone:'WEST ZONE'}),
    venue('prada',2,'Prada','プラダ','Prada','Gotemba Premium Outlets',src.outletName,'精品','依品牌與園區',{zone:'WEST ZONE'}),
    venue('nike',2,'Nike','ナイキ','Nike','Gotemba Premium Outlets',src.outletName,'運動休閒','依品牌與園區',{zone:'請查官方圖'}),
    venue('adidas',2,'adidas','アディダス','adidas','Gotemba Premium Outlets',src.outletName,'運動休閒','依品牌與園區',{zone:'請查官方圖'}),
    venue('beams',2,'BEAMS','ビームス','BEAMS','Gotemba Premium Outlets',src.outletName,'服飾','依品牌與園區',{zone:'請查官方圖'}),
    venue('coach',2,'Coach','コーチ','Coach','Gotemba Premium Outlets',src.outletName,'鞋包','依品牌與園區',{zone:'請查官方圖'}),
    venue('shiseidooutlet',2,'資生堂','資生堂','Shiseido','Gotemba Premium Outlets',src.outletName,'美妝','依品牌與園區',{zone:'請查官方圖',status:'Pending'}),
    venue('foodhall',2,'ITADAKI TERRACE 食堂','いただきテラス','Itadaki Terrace','Gotemba Premium Outlets HILL SIDE',src.outletBrands,'咖啡甜點','依店與園區',{zone:'HILL SIDE'})
  ];
  const fields=[
    ['base','基本租車費','¥'],['winter','雪胎','¥'],['awd','4WD 車型差額','¥'],
    ['cdw','免責補償','¥'],['noc','NOC 補償','¥'],['insurance','其他保險','¥'],
    ['etc','ETC 卡及設備','¥'],['toll','高速過路費','¥'],['parking','停車','¥'],
    ['oneway','異地還車','¥'],['local','門市接駁與市區交通（四人）','¥'],
    ['bus','巴士與鐵路（四人）','¥'],['other','其他稅金或必要費用','¥'],
    ['km','全程駕駛距離','km'],['kmpl','油耗','km/L'],['fuel','每公升油價','¥/L']
  ];
  const plans=[
    {id:'a',name:'A｜東京取還',time:'6–8 小時',mid:7,drive:'4–5.5 小時',transfer:'0–1 次',comfort:'行李便利，東京市區與遠距離駕駛',route:'入谷 → 東京側門市 → 御殿場 → 富士吉田／河口湖 → 東京門市',basis:'規劃 1/26 08:30–1/27 18:30，約 34 小時。兩天機動性高，需預留東京回程塞車、加油與門市關門。',numbers:[34100,3300,2200,2200,2200,0,550,6600,0,0,1200,0,0,300,11,175]},
    {id:'b',name:'B｜御殿場取還',time:'6.5–9 小時',mid:7.75,drive:'2.5–3.5 小時',transfer:'2–4 次',comfort:'少開東京市區，需搬運戰利品上巴士',route:'新宿 → 御殿場站 → Outlet／CLAD → 富士山往返 → 御殿場站 → 新宿',basis:'規劃 1/26 約 11:00–1/27 16:30，約 29.5 小時。御殿場站門市回圈較好確認；兩個半天中只有後段消耗較多里程。',numbers:[34100,3300,2200,2200,2200,0,550,1200,0,0,2400,16000,0,115,11,175]},
    {id:'b24',name:'B 變體｜1/27 才租',time:'6.5–9 小時',mid:7.75,drive:'2.5–3 小時',transfer:'3–5 次',comfort:'首日直達 Outlet，隔日需安排接駁至門市',route:'新宿 → Outlet／CLAD；次日御殿場站取還 → 北口本宮／大石公園 → 御殿場站 → 新宿',basis:'首選自駕草案。1/26 可直接保住購物時間；1/27 估 10:45–16:30，費用保守按 24 小時級距。若門市至飯店接駁及回東京巴士時段無法銜接，改比較 C。',numbers:[22000,1650,1100,1100,1100,0,550,1200,0,0,2400,16000,0,105,11,175]},
    {id:'c',name:'C｜御殿場取・河口湖還',time:'5.5–7.5 小時',mid:6.5,drive:'1.5–2.5 小時',transfer:'3–5 次',comfort:'減少山區折返，需搬運購物袋及過夜行李',route:'新宿 → 御殿場取車 → CLAD → 北口本宮／大石公園 → 河口湖還車 → 新宿',basis:'次選。規劃 1/26 11:00–1/27 15:30，約 28.5 小時。只有業者確認跨靜岡／山梨、指定車型與雪胎可異地還車才成立；河口湖門市至車站接送須確認。',numbers:[34100,3300,2200,2200,2200,0,550,1000,0,8800,2400,16800,0,75,11,175]},
    {id:'d',name:'D｜御殿場取・東京還',time:'6–8.5 小時',mid:7.25,drive:'3.5–4.5 小時',transfer:'1–3 次',comfort:'返東京可直接載行李，需開進都市',route:'新宿 → 御殿場取車 → CLAD → 富士山 → 東京／上野還車',basis:'規劃 1/26 11:00–1/27 18:30，約 31.5 小時。戰利品多時方便，異地費、首都高及東京晚尖峰需確認。',numbers:[34100,3300,2200,2200,2200,0,550,4200,0,11000,2000,8000,0,210,11,175]},
    {id:'public',name:'基準｜全程大眾運輸',time:'7–9.5 小時',mid:8.25,drive:'0 小時',transfer:'3–6 次',comfort:'免開車，巴士空位、行李規格和轉乘最重要',route:'新宿 → Outlet／CLAD → 河口湖巴士（營運時） → 新宿；或直接從御殿場返東京',basis:'以有河口湖停留、附區域巴士的版本估算，若縮短為御殿場往返，時間與金額均低於此基準。道路停駛時查鐵路。',numbers:[0,0,0,0,0,0,0,0,0,0,2400,26600,0,0,0,0]}
  ];
  const cars=[
    {name:'中型 SUV',models:'RAV4、Corolla Cross、X-Trail 或同級',price:'試算基礎 ¥15,000–25,000／24h',choice:'四位成人加四個小過夜袋可先評估。大購物袋多時要確認後廂與後窗視野。',note:'車較短、停車較易；估算油耗 12–16 km/L。查 2WD／4WD、雪胎、倒車影像和防撞配備。'},
    {name:'七至八人座 MPV',models:'Noah、Voxy、Serena 或同級',price:'試算基礎 ¥18,000–30,000／24h',choice:'首選級距。保留兩排乘坐，第三排收折放四位成人的過夜袋和 Outlet 戰利品。',note:'滑門上下車較方便；估算油耗 10–14 km/L。雪胎必須確認，同級替代車的第三排、車高與安全配備也要查。'},
    {name:'高舒適度 MPV',models:'Alphard、Vellfire 或同級',price:'試算基礎 ¥30,000–50,000／24h',choice:'座椅長途較舒適。先評估大車停車與駕駛壓力。',note:'估算油耗 8–12 km/L，車長、車高及迴轉空間較吃緊。查雪胎、4WD 與還車限制。'}
  ];
  const shops=[
    {name:'Toyota 御殿場站前店',ja:'トヨタレンタカー 御殿場駅前店',area:'御殿場',anchor:'御殿場站',url:src.toyotaGotemba,detail:'新橋1850-6，御殿場站約 60 m。一般 09:00–19:00，列縣內及跨縣異地還車可詢。指定日、雪胎和車級待查。'},
    {name:'Toyota 富士河口湖店',ja:'トヨタレンタカー 富士河口湖店',area:'河口湖',anchor:'河口湖站',url:src.toyotaKawa,detail:'船津4657，河口湖站步行約 7 分，旁有 ENEOS。常態 08:00–20:00，官網列可洽跨縣異地還車，需核對車型與日期。'},
    {name:'Toyota 上野站前店',ja:'トヨタレンタカー 上野駅前店',area:'東京',anchor:'入谷站／上野站',url:src.toyotaUenoExact,detail:'東上野3-19-10，常態 08:00–20:00。由上野站步行短程，飯店可搭日比谷線一站再走或搭計程車，車級與雪胎待查。'},
    {name:'Nippon Rent-A-Car 御殿場站',ja:'ニッポンレンタカー 御殿場駅前',area:'御殿場',anchor:'御殿場站',url:src.nipponGotemba,detail:'官方門市；比對同站／跨區還車、營業時間及冬胎。'},
    {name:'Nippon Rent-A-Car 富士山・河口湖',ja:'ニッポンレンタカー 河口湖',area:'河口湖',anchor:'河口湖站',url:src.nipponKawa,detail:'使用河口湖官方區域查詢，確認接受異地還車的指定門市。'},
    {name:'Times Car Rental',ja:'タイムズカーレンタル',area:'各地查詢',anchor:'上野／東京／富士山',url:src.times,detail:'官方全國入口，區域指定門市及雪胎待核實。'},
    {name:'Nissan Rent a Car',ja:'日産レンタカー',area:'各地查詢',anchor:'上野／東京／富士山',url:src.nissan,detail:'可比對 Serena／X-Trail 級距，門市、異地還車與雪胎待核實。'},
    {name:'ORIX Rent a Car',ja:'オリックスレンタカー',area:'各地查詢',anchor:'上野／東京／富士山',url:src.orix,detail:'官方入口；按日期、車級、取還店及冬季設備比較。'}
  ];
  const airport={
    in:[
      {name:'Skyliner 經京成上野',cost:[10320,12320],min:'80–115 分',changes:'1 次／步行約 8–15 分',comfort:'全車指定席，抵上野後接計程車搬運較少。',schedule:'領行李後買票，抵達飯店目標 17:55，保留三小時。',detail:'¥2,580 × 4，另計市區末段交通；加至 ¥12,320 是規劃值。',url:src.skyFare},
      {name:'京成本線特急或 Access Express',cost:[5200,7200],min:'105–145 分',changes:'1–2 次／步行約 12–25 分',comfort:'可走京成上野或按運行方向規劃，無指定席時大件行李較辛苦。',schedule:'核對直達與轉乘；若遇候車延誤，飯店與用餐順延。',detail:'京成票、Metro 或短程交通合計估算。',url:src.mainFare},
      {name:'成田機場排班計程車',cost:[29000,31000],min:'75–120+ 分',changes:'0 次／步行少',comfort:'行李多時可問大型車，行李、過路費及延誤等候需確認。',schedule:'領行李後赴官方乘車點或與合法業者約接客。',detail:'成田官方台東區定額 ¥29,000–31,000，依道路，過路費與特殊加價須問司機。去程私人包車另詢價。',url:src.nrtTaxi},
      {name:'去程私人接送',cost:null,min:'75–120+ 分',changes:'0 次／步行少',comfort:'適合行李多，須按箱數確認車型、牌照與保險。',schedule:'預約時提供航班，詢問誤點等待及 T1 集合點。',detail:'1/24 私人接送尚無報價。約車前詢價並核對全包、超時與取消。',url:src.nrtTaxi}
    ],
    out:[
      {name:'A｜私人包車',cost:[16000,16000],min:'75–115+ 分',changes:'0 次／步行約 3–8 分',comfort:'四人直達，購物袋便利，容量依車型；留意塞車。',schedule:'建議 10:55–11:15 發車，正常估 12:10–13:10 到 T1。',detail:'使用者報價。業者、營業資格、保險、行李、等待、超時、過路費、取消及 T1 送達待確認。',url:src.nrtTaxi},
      {name:'B｜京成 Skyliner',cost:[10320,12320],min:'80–115 分',changes:'1 次／步行約 8–15 分',comfort:'時間較好控制，有指定席，京成上野須搬運行李。',schedule:'建議 11:05–11:25 離店，正常估 12:25–13:20 到 T1。',detail:'¥2,580 × 4，另計市區末段交通。確認站內電梯、班次與票種取消規則。',url:src.skyFare},
      {name:'C｜京成本線特急或 Access Express',cost:[5200,7200],min:'105–145 分',changes:'1–2 次／步行約 12–25 分',comfort:'一般列車可較省，但大件行李、站立與轉乘負擔較高。',schedule:'建議 10:50–11:15 離店，正常估 12:35–13:40 到 T1。',detail:'京成票及末段交通的規劃估算；先確認方向與所乘列車。',url:src.mainFare}
    ]
  };
  const parking=[
    ['Vessel Inn 住客停車場','ベッセルイン上野入谷駅前 駐車場','台東区入谷1-25-6','一般車長 ≤6 m ¥2,000／晚，大型 ≤7 m ¥3,000／晚；供應與預約問飯店。館旁。',src.hotelAccess],
    ['Outlet 園區及外圍停車','御殿場プレミアム・アウトレット 駐車場','御殿場市深沢1312','一般免費，依 P 區看當日引導；外圍停車可接駁，確認車高和開放時段。',src.outletMap],
    ['HOTEL CLAD 專用停車','HOTEL CLAD 専用駐車場','御殿場市深沢2839-1','官網列免費 320 位，退房日 14:00 前可停。由專用入口前往大廳。車高／車型限制需詢飯店。',src.cladAccess],
    ['河口湖站周邊停車','河口湖駅 駐車場','富士河口湖町船津','站前與民營停車各有計費和上限；進場前查費率與車高。',src.kawaguchi],
    ['大石公園停車','大石公園 駐車場','富士河口湖町大石2585','自然生活館旁。一般可步行數分鐘到湖邊；車高、費用與冬季管理到場複核。',src.oishi],
    ['忍野八海周邊停車','忍野八海 駐車場','忍野村忍草','各民營場費用及開放不同，冬季步行路面先確認。',src.oshino],
    ['北口本宮訪客停車','北口本宮冨士浅間神社 駐車場','富士吉田市上吉田5558','依神社現場標示，停車至參道約數分鐘，雪天注意石面與坡度。',src.shrine],
    ['新倉山淺間公園停車','新倉山浅間公園 駐車場','富士吉田市浅間2-4-1','查看市方分流及臨時管制，步行至觀景台有約 398 階。',src.arakura]
  ];
  const roadChecks=[
    ['文件與駕駛','台灣駕照正本、認可日文譯本、護照；以知悉冬季路感的駕駛為前提，其他駕駛須依門市登記。'],
    ['車輛與保險','四輪雪胎確認、4WD 選擇、免責／NOC、ETC 卡、出車傷痕及租車公司救援電話。遇雪鏈管制先查規則、公司限制和道路公告。'],
    ['天氣與管制','前晚與當日查 JMA、JARTIC、NEXCO，路面留意橋面、背陰及下坡的黑冰。'],
    ['備案及日照','約 17:00 前後天色轉暗，按地點查日落。降雪、結冰、封路或駕駛條件不足，改 Plan B。'],
    ['加油與事故','行經御殿場或河口湖市區提早確認加油站營業及油種，休息站適度停留。事故先確保人身安全，急救 119、警察 110，再通知門市。']
  ];
  return {zones,fields,plans,cars,shops,airport,parking,roadChecks};
})();
