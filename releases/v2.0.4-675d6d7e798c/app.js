/* data.js */
'use strict';
window.TRIP = (() => {
  const checked = '2026-11-25';
  const members = ['Judy','Jennifer','Vito','Amy'];
  const src = {
    peach:'https://www.flypeach.com/tw/lm/st/routemap',
    peachWinter:'https://www.flypeach.com/tw/lm/st/w_schedule',
    peachStatus:'https://www.flypeach.com/tw/lm/flightstatus',
    peachTPE:'https://www.flypeach.com/en/lm/ai/airports/airportguide_international/tpe',
    peachNRT:'https://www.flypeach.com/en/lm/ai/airports/airportguide_international/nrt',
    peachCheck:'https://www.flypeach.com/en/lm/ai/airports/how_to_checkin',
    carry:'https://www.flypeach.com/en/lm/ai/airports/baggage/carry_on_bag',
    bags:'https://www.flypeach.com/en/lm/ai/airports/baggage/checked_in_bag',
    nrt:'https://www.narita-airport.jp/en/',
    nrtShop:'https://www.narita-airport.jp/en/shop/',
    nrtTaxi:'https://www.narita-airport.jp/en/access/taxi/',
    hotel:'https://en.www.vessel-hotel.jp/inn/ueno/',
    hotelAccess:'https://en.www.vessel-hotel.jp/inn/ueno/access/',
    hotelService:'https://en.www.vessel-hotel.jp/inn/ueno/service/',
    hotelBreakfast:'https://en.www.vessel-hotel.jp/inn/ueno/breakfast/',
    iriya:'https://www.tokyometro.jp/station/iriya/accessibility/index.html',
    ginza:'https://www.tokyometro.jp/lang_en/station/ginza/index.html',
    keisei:'https://www.keisei.co.jp/keisei/tetudou/skyliner/us/',
    skyliner:'https://www.keisei.co.jp/keisei/tetudou/skyliner/us/traffic/skyliner.php',
    accessFare:'https://www.keisei.co.jp/keisei/tetudou/skyliner/us/traffic/express_fares.php',
    jr:'https://www.jreast.co.jp/en/multi/',
    clad:'https://www.gotemba-hotelclad.jp/en/',
    cladFAQ:'https://www.gotemba-hotelclad.jp/faq/',
    cladRooms:'https://www.gotemba-hotelclad.jp/rooms/',
    cladFood:'https://www.gotemba-hotelclad.jp/restaurant/',
    cladAccess:'https://www.gotemba-hotelclad.jp/access/',
    cladBath:'https://www.gotemba-hotelclad.jp/spa/',
    outlet:'https://www.premiumoutlets.co.jp/en/gotemba/',
    outletAccess:'https://www.premiumoutlets.co.jp/en/gotemba/access/',
    outletMap:'https://www.premiumoutlets.co.jp/en/gotemba/access/map.html',
    outletPDF:'https://www.premiumoutlets.co.jp/gotemba/brands/pdf/gotemba.pdf',
    outletBrands:'https://www.premiumoutlets.co.jp/en/gotemba/brands/',
    outletService:'https://www.premiumoutlets.co.jp/en/gotemba/service/',
    odakyu:'https://odakyu-highway.jp/',
    busBook:'https://www.highwaybus.com/gp/inbound/index?lang=EN',
    fujiBus:'https://bus.fujikyu.co.jp/highway/gotemba/',
    fujiReturn:'https://bus.fujikyu.co.jp/en/highway/',
    fujiTrain:'https://www.jreast.co.jp/en/multi/traininformation/fuji_excursion/',
    circleBus:'https://bus.fujikyu.co.jp/rosen/shuyu',
    toyota:'https://rent.toyota.co.jp/eng/',
    toyotaGotemba:'https://rent.toyota.co.jp/eng/reservation/index01.aspx?eShop=016&rShop=64601',
    toyotaKawa:'https://rent.toyota.co.jp/eng/reservation/index01.aspx?keyword=Kawaguchiko+Station&shopMode=0',
    toyotaUeno:'https://rent.toyota.co.jp/eng/reservation/index01.aspx?keyword=Ueno&shopMode=0',
    toyotaOneWay:'https://rent.toyota.co.jp/eng/service/oneway.html',
    nippon:'https://www.nipponrentacar.co.jp/en/nrglobal/',
    nipponKawa:'https://www.nipponrentacar.co.jp/shop/area/yamanashi/kawaguchiko.html',
    times:'https://www.timescar-rental.com/en/',
    nissan:'https://nissan-rentacar.com/en/',
    orix:'https://car.orix.co.jp/eng/',
    npa:'https://www.npa.go.jp/policies/application/license_renewal/have_DL_issed_another_country.html',
    jaf:'https://english.jaf.or.jp/driving-in-japan/drive-in-japan/switch-to-japanese-license',
    thb:'https://www.thb.gov.tw/cp.aspx?n=251',
    jartic:'https://www.jartic.or.jp/',
    nexco:'https://www.c-nexco.co.jp/en/',
    drive:'https://www.drivetraffic.jp/',
    toll:'https://dc.c-nexco.co.jp/dc/DriveCompass.html',
    chain:'https://www.mlit.go.jp/road/bosai/fuyumichi/tirechains.html',
    jma:'https://www.jma.go.jp/bosai/',
    meteo:'https://open-meteo.com/en/docs',
    fx:'https://frankfurter.dev/',
    bank:'https://rate.bot.com.tw/xrt?Lang=zh-TW',
    tax:'https://www.nta.go.jp/publication/pamph/shohi/menzei/201805/pdf/caution_en.pdf',
    sunset:'https://eco.mtk.nao.ac.jp/koyomi/dni/',
    oishi:'https://fujisan-pref.jp/en/article/88/',
    kawaguchi:'https://fujisan.ne.jp/',
    oshino:'https://www.vill.oshino.lg.jp/',
    shrine:'https://sengenjinja.jp/',
    arakura:'https://fujiyoshida.net/spot/12',
    jnto:'https://www.japan.travel/tw/',
    visit:'https://services.digital.go.jp/visit-japan-web/'
  };
  const hotelName='Vessel Inn Ueno Iriya Ekimae';
  const places={
    hotel:{cn:'Vessel Inn 上野入谷站前酒店',ja:'ベッセルイン上野入谷駅前',en:hotelName,address:'東京都台東区入谷1-25-6',tel:'+81 3-5603-7411',official:src.hotel,status:'Confirmed',booking:'已預訂',details:'1/24 入住、1/28 退房。S-DBL 兩間、四位成人、不含早餐。保留四晚並存放大件行李是待確認的規劃。'},
    clad:{cn:'HOTEL CLAD 克拉德酒店',ja:'ホテル クラッド',en:'HOTEL CLAD',address:'静岡県御殿場市深沢2839-1',tel:'+81 550-81-0321',official:src.clad,status:'Confirmed',booking:'已選定但未預訂',details:'1/26–1/27，兩間、每間兩成人。首選富士景雙床一泊二食，其次富士景雙人床或含早餐。入住 15:00，退房 10:00。'},
    outlet:{cn:'御殿場 Premium Outlets',ja:'御殿場プレミアム・アウトレット',en:'Gotemba Premium Outlets',address:'静岡県御殿場市深沢1312',official:src.outlet,status:'Confirmed',booking:'不適用',details:'冬季通常 10:00–19:00，個店與特別營業日另查。WEST、EAST、HILL SIDE 三區。'},
    oishi:{cn:'大石公園・河口湖北岸',ja:'大石公園・河口湖自然生活館',en:'Oishi Park / Kawaguchiko Natural Living Center',address:'山梨県南都留郡富士河口湖町大石2585',official:src.oishi,status:'Confirmed',booking:'不適用',details:'湖邊步道，可視路況縮短。自然生活館可休息，紅線巴士有站。'},
    shrine:{cn:'北口本宮冨士浅間神社',ja:'北口本宮冨士浅間神社',en:'Kitaguchi Hongu Fuji Sengen Jinja',address:'山梨県富士吉田市上吉田5558',official:src.shrine,status:'Confirmed',booking:'不適用',details:'林蔭參道有石階與結冰可能。以主殿區短程參拜為主。'},
    oshino:{cn:'忍野八海',ja:'忍野八海',en:'Oshino Hakkai',address:'山梨県南都留郡忍野村忍草',official:src.oshino,status:'Confirmed',booking:'不適用',details:'池畔與窄路需留意結冰，周邊民營停車場各自收費。備選。'},
    arakura:{cn:'新倉山淺間公園',ja:'新倉山浅間公園',en:'Arakurayama Sengen Park',address:'山梨県富士吉田市浅間2-4-1',official:src.arakura,status:'Confirmed',booking:'不適用',details:'觀景台需走約 398 階，冰雪天不排入主要路線。'}
  };
  const event = (time,title,detail,query='',kind='main',cost='',mins='',zone='JST') =>
    ({time,title,detail,query,kind,cost,mins,zone});
  const days = [
    {id:1,firstEventIndex:1,date:'2027-01-24',label:'1/24（日）',area:'上野・入谷',title:'抵達東京・上野入谷',summary:'搭早班機抵達成田，晚上留在飯店附近。',photo:'ueno',walk:'約 15–30 分鐘・低',meet:'08:00 桃園 T1 Peach 櫃位附近集合（台灣時間，規劃）',rest:'飯店大廳、入谷站旁餐廳',backup:'班機或入境延誤時順延入住、晚餐與採買。可在鐵路營運異常時查機場計程車或合法接送。',events:[
      event('08:00','桃園第一航廈集合','10:40 起飛。Peach 國際線一般報到窗按起飛倒推約 08:40–09:50，出發前核對訂單。','Taoyuan Airport Terminal 1','main','','','TST'),
      event('10:40','MM626 桃園起飛','搭乘 Peach Aviation。飛行時間約 3 小時 15 分。','Taoyuan Airport Terminal 1','main','','','TST'),
      event('14:55','成田抵達・保留至少三小時','14:55–17:55 僅安排入境、領行李及赴飯店。若延誤，晚間活動隨之順延。','Narita Airport Terminal 1','main','','至少 180 分'),
      event('17:55','上野入谷飯店入住','預計抵達時間。大型行李可用電梯動線或自京成上野搭短程計程車。',hotelName),
      event('18:30','入谷晚餐','近期營業及四人座位先查。可選 Grill Victoria，晚到就近用餐。','グリルビクトリヤ 入谷','main','依菜單','60–90 分'),
      event('20:00','便利店與藥妝採買','買明早飲品或點心，散步後回飯店。','まいばすけっと 入谷2丁目店','option','','15–30 分')
    ]},
    {id:2,date:'2027-01-25',label:'1/25（一）',area:'銀座',title:'銀座購物、美食及咖啡甜點',summary:'從銀座北端逛到八丁目，全家可自由分頭逛。',photo:'ginza',walk:'約 35–65 分鐘・中，可隨時縮短',meet:'15:30 GINZA SIX 1F 中央通入口外；19:45 銀座站約定車站入口',rest:'資生堂 Parlour、百貨餐廳層或咖啡座',backup:'雨天優先三越、無印良品和 GINZA SIX。原宿若選擇前往，取代整段自由購物時段。',events:[
      event('10:00','入谷出發・銀座早午餐','日比谷線直達銀座，向銀座二丁目步行。早午餐可選 Marronnier Gate 的むさしの森珈琲。','むさしの森珈琲 マロニエゲート銀座2','main','依菜單','60 分'),
      event('11:00','北段購物','HANDS → MUJI → 松屋銀座，按喜好選 1–2 間。','ハンズ銀座店','main','','90 分'),
      event('12:45','銀座午餐','拉麵、百貨定食或鰻魚。四人也可各自用餐，之後在三越附近會合。','銀座三越','main','每人依菜單','75 分'),
      event('14:00','自由購物・三越至 GINZA SIX','銀座四丁目往六丁目，選三越、GINZA SIX 或 UNIQLO 銀座店。','GINZA SIX','main','','90 分'),
      event('15:30','集合・咖啡甜點','GINZA SIX 1F 集合後續往八丁目，可在資生堂 Parlour 坐下。','資生堂パーラー 銀座本店','main','依菜單','60 分'),
      event('14:00','原宿雙店支線','原宿 @cosme TOKYO 與 Harry Potter Shop 適合有興趣者。預留往返，改約 18:00 晚餐集合。','Harry Potter Shop Harajuku','option','','約 2.5–3 小時'),
      event('18:00','和牛或壽喜燒晚餐','人形町今半銀座店可先查四人訂位。保留用餐時間。','人形町今半 銀座店','main','依預訂套餐','90 分'),
      event('19:45','銀座返回入谷','日比谷線回入谷。','銀座駅 日比谷線')
    ]},
    {id:3,date:'2027-01-26',label:'1/26（二）',area:'御殿場',title:'御殿場 Premium Outlets・HOTEL CLAD',summary:'Outlet 原則留五小時，傍晚入住後吃飯、泡湯。',photo:'gotemba',walk:'約 45–80 分鐘・中，可分段坐下休息',meet:'HILL SIDE 食堂入口。早到方案約 16:20；搭上野班可改約 17:10，依晚餐時間協調。',rest:'HILL SIDE 的 ITADAKI TERRACE 與咖啡店',backup:'搭營運中高速巴士。遇大雪查飯店、巴士及接駁公告，延誤時優先保障入住和晚餐。',events:[
      event('08:30','從入谷出發','Nippon 兩天方案先到上野站前門市 09:00 取車。一天方案可從 JR 上野站入谷口搭直達巴士，或到東京站八重洲南口搭較早班次；依預約班次調整離店時間。','JR 上野駅 入谷口 高速バスのりば','main','依路線','約 2–3 小時'),
      event('11:15','抵達御殿場・處理過夜行李','此時標以較早班次規劃。上野公布班次 09:55 發、12:10 抵達；先問 HOTEL CLAD 能否寄存。','HOTEL CLAD','main','','30–45 分'),
      event('11:30','Outlet 自由購物、午餐、下午茶','早到方案約 11:30–16:30；搭上野班可改約 12:20–17:20，並核對晚餐入場時間。分頭逛 WEST／EAST／HILL SIDE，午餐與休息可在 ITADAKI TERRACE。','Gotemba Premium Outlets','main','依個人採買','300 分'),
      event('16:30','入住 HOTEL CLAD','入住可依購物及晚餐時間調整。由 HILL SIDE 往飯店；住客車輛可移至飯店專用停車場。','HOTEL CLAD'),
      event('18:00','晚餐・木之花之湯','按訂房方案確認餐次。飯後自由泡湯及休息，飲酒後不開車。','Konohana no Yu','main','依住宿方案','約 2–3 小時')
    ]},
    {id:4,date:'2027-01-27',label:'1/27（三）',area:'河口湖・富士吉田',title:'富士山一日遊・返回東京',summary:'天候許可走兩站，路況不佳就回東京。',photo:'fuji',walk:'約 25–50 分鐘・低至中，神社有石面',meet:'13:45 河口湖自然生活館入口；雨雪備案改約飯店大廳',rest:'河口湖自然生活館、餺飥午餐及飯店大廳',backup:'Plan B 依下方切換。道路封閉、降雪、結冰、雪鏈管制或駕駛信心不足時，停掉自駕。',events:[
      event('07:00','晨間溫泉・早餐','可自由選擇，早餐一般最後入店 09:00。若採 Nippon 一天方案，提早退房，安排前往御殿場站的交通，09:00 到門市取車。','HOTEL CLAD','main','依方案','約 2–3 小時'),
      event('10:00','退房截止・確認冬季路況','其他方案依飯店退房時間及門市預約安排。Nippon 一天方案先確認早班接駁或預約計程車，取車及出發前預留驗車時間。','ニッポンレンタカー 御殿場駅前'),
      event('11:30','北口本宮冨士浅間神社','走短程參道，若冰滑就取消這一站。','北口本宮冨士浅間神社','main','參拜通常免費','35–45 分'),
      event('12:25','河口湖餺飥午餐','優先有停車位的店，留足等位時間。','ほうとう不動 東恋路店','main','依菜單','60–75 分'),
      event('13:40','大石公園・河口湖北岸','看富士山並在自然生活館休息。富士山能見度依雲量。','大石公園 河口湖','main','公園通常免費','35–50 分'),
      event('14:45','離開山區・安排加油與還車','兩個 Nippon 報價均為上野站前 20:00 還車，預留塞車、加油及辦還車時間。其他方案依御殿場或河口湖門市與接駁班次規劃。','ニッポンレンタカー 上野駅前','main','','依路線'),
      event('17:00','返回東京動線','自駕依門市預約時間倒排；若搭巴士或鐵路，依預約班次調整。',hotelName,'main','','依路線')
    ],b:[
      event('08:00','早餐・飯店內休息','視天氣選室內休息，10:00 前退房。','HOTEL CLAD'),
      event('10:00','查看交通營運','查 NEXCO、JARTIC、JMA 和巴士公告。若營運中，可查 Outlet 直達東京站或上野的高速巴士，或由御殿場站轉搭鐵路。','Gotemba Premium Outlets'),
      event('11:00','室內午餐或縮短行程','保留 Outlet 食堂或飯店附近室內選項。若僅多雲且巴士營運穩定，可選河口湖室內停留，再逕返東京。','Gotemba Food Hall Itadaki Terrace'),
      event('13:30','提早返回東京','規劃時間，以實際運行班次為準。若交通停駛，留在安全場所，聯絡飯店與運輸業者調整。',hotelName)
    ]},
    {id:5,date:'2027-01-28',label:'1/28（四）',area:'入谷・成田',title:'東京最後採買・返程',summary:'上午只在入谷附近活動，11:40 前開始前往成田。',photo:'narita',walk:'約 15–35 分鐘・低，另計機場距離',meet:'11:10 飯店大廳，點行李；11:40 JST 為開始返程上限',rest:'飯店大廳與成田 T1 候機區',backup:'出發前看鐵路、公路與航空公司公告。如路況、班次或航空要求有變，提早離店。',events:[
      event('08:45','附近早餐','飯店早餐另計，或到便利店與附近咖啡店。',hotelName,'main','','40–60 分'),
      event('09:30','短程散步與最後採買','可選入谷鬼子母神周邊或藥妝店，逛一處即可。','入谷鬼子母神 真源寺','option','','20–35 分'),
      event('10:30','整理行李與退房','依飯店訂單辦退房，與家人確認護照、行李及退稅品。',hotelName),
      event('11:40','完整保留五小時給返程','最晚 11:40 JST 開始赴機場。私人包車使用者報價 ¥16,000／車，尚未預訂，另可選 Skyliner 或其他京成路線。','Narita Airport Terminal 1 North Wing','main','包車 ¥4,000／人','至少 300 分'),
      event('16:40','MM623 成田起飛','前往 T1 北翼四樓報到。按訂單核對時刻與航廈，機場採買視候機餘裕。','Narita Airport Terminal 1 North Wing'),
      event('20:00','抵達桃園第一航廈','入境並領取托運行李。','Taoyuan Airport Terminal 1','main','','','TST')
    ]}
  ];
  const task=(id,title,owner,due,note,url)=>({id,title,owner,due,note,url});
  const tasks=[
    task('clad','預訂 HOTEL CLAD 兩間富士景房','Judy','儘早，規劃','雙床一泊二食優先，填兩房各兩成人，保留含稅總價和取消條款。',src.clad),
    task('vessel','確認東京飯店保留四晚','Judy','入住前，規劃','確認 1/26 外宿當晚保留兩房與大型行李存放。',src.hotel),
    task('license','確認 Vito 台灣駕照正本與日文譯本','Vito','租車前，規劃','查正本效期、譯本、護照入境日期及門市付款文件。',src.thb),
    task('winter','確認日本右駕及冬季駕駛能力','Vito','租車前，規劃','有兩次右駕經驗；冬季能力待本人確認。',src.npa),
    task('carplan','選定取還車方案與車型','Vito','租車前，規劃','優先評估御殿場一天與河口湖異地還車。',src.toyotaGotemba),
    task('insurance','確認雪胎、4WD 選項及租車保險','Vito','訂車時，規劃','雪胎列必要條件。問免責、NOC、ETC 卡、事故救援及取消。',src.toyota),
    task('carbook','完成租車預訂','Vito','儘早，規劃','先確認適用同級車、取還店、營業時間與當日班次。',src.toyotaGotemba),
    task('jpchauffeur','決定 1/28 日本私人機場接送','Judy','出發前，規劃','¥16,000 來源為使用者。確認營業資格、保險、容量、全包費及 T1。',src.nrtTaxi),
    task('bags','確認 Peach 行李額度','全家','出發前，規劃','以訂單票種、加購重量及件數為準。',src.bags),
    task('food','必要餐廳預約','全家','出發前，規劃','銀座晚餐與 HOTEL CLAD 方案餐次。',src.cladFood),
    task('weather','重新確認天氣、道路及交通','全家','出發前與每天早上，JST','道路與各交通營運公司以當日公告為準。',src.drive)
  ];
  const regions=['上野／入谷','銀座','御殿場','河口湖／富士山','成田機場','原宿'];
  const venue = (id,region,cn,ja,en,address,official,category,hours,features={}) =>
    ({id,region:regions[region],cn,ja,en,address,official,category,hours,closed:'休業日與指定日期請看官網',checked,validity:'官網一般資訊；2027 指定日須複核',status:'Confirmed',booking:'不適用',...features});
  const dining=[
    venue('jojoen',1,'敘敘苑 銀座みゆき通店','叙々苑 銀座みゆき通り店','Jojoen Ginza Miyuki-dori','東京都中央区銀座6-8-3 10F','https://www.jojoen.co.jp/shop/jojoen/miyukidori/','燒肉','以店舖與訂位頁公告為準',{reserve:'建議',four:true,price:3,tags:'和牛 yakiniku wagyu 焼肉',note:'四人的和牛燒肉選項，距銀座站 A2 口約兩分鐘。'}),
    venue('victoria',0,'Grill Victoria','グリルビクトリヤ','Grill Victoria','東京都台東区根岸3-12-18','https://www.grill-victoria.com/','日式定食','午、晚餐分時段',{reserve:'建議',four:true,price:2,note:'洋食及生薑豬肉，晚到先問四人桌與最後點餐。'}),
    venue('vesselbreak',0,'Vessel Inn 早餐','ベッセルイン上野入谷駅前 朝食','Vessel Inn Breakfast','東京都台東区入谷1-25-6',src.hotelBreakfast,'日式定食','一般 06:00–09:30',{reserve:'詢問',four:true,price:2,note:'住宿未含早餐，現場能否加購及費用依飯店。'}),
    venue('iriyacafe',0,'入谷 Plus Café','イリヤプラスカフェ','Iriya Plus Café','東京都台東区下谷2-9-10','https://www.iriyapluscafe.jp/','咖啡廳','按店公告',{reserve:'詢問',four:true,price:1,note:'古民家咖啡，確認店休與甜點售完時間。'}),
    venue('imahan',1,'人形町今半 銀座店','人形町今半 銀座店','Ningyocho Imahan Ginza','東京都中央区銀座6-8-7 5F','https://restaurant.imahan.com/ginza/','壽喜燒','11:30–15:00／17:00–22:00',{reserve:'建議',four:true,price:3,tags:'和牛 wagyu sukiyaki しゃぶしゃぶ',note:'和牛壽喜燒與涮涮鍋，四人先預約。'}),
    venue('shiseido',1,'資生堂 Parlour 銀座','資生堂パーラー 銀座本店','Shiseido Parlour Ginza','東京都中央区銀座8-8-3','https://parlour.shiseido.co.jp/en/shoplist/restaurantginza/','甜點','依沙龍及樓層',{reserve:'詢問',four:true,price:2,tags:'下午茶 咖啡廳 parfait dessert cafe',note:'餐廳與甜點沙龍為不同樓層，可在八丁目坐下休息。'}),
    venue('kagari',1,'銀座篝 本店','銀座 篝 本店','Ginza Kagari','東京都中央区銀座6-4-12','https://www.ginza.jp/en/shopcategory/gourmet-japanese','拉麵','依業者公告',{status:'Pending',reserve:'免預約',four:false,price:2,tags:'ramen 鶏白湯',note:'店鋪直連、營業與排隊待複核；連結為銀座官方地區餐廳目錄。四人可能需分開坐。'}),
    venue('ginzasushi',1,'銀座壽司幸本店','銀座寿司幸本店','Ginza Sushiko Honten','東京都中央区銀座6-3-8','https://ginza-sushikou-honten.com/en','壽司','依官方訂位',{reserve:'建議',four:true,price:3,tags:'sushi 鮨'}),
    venue('nodaiwa',1,'銀座野田岩','銀座 野田岩','Ginza Nodaiwa','東京都中央区銀座4-2-15 B1F','https://www.nodaiwa.com/','鰻魚','依銀座店公告',{reserve:'詢問',four:true,price:3,tags:'unagi うなぎ'}),
    venue('musashi',1,'武藏野森珈琲','むさしの森珈琲 マロニエゲート銀座2','Musashino Mori Coffee','東京都中央区銀座3-2-1','https://www.marronniergate.jp/info','咖啡廳','一般 09:00–23:00',{reserve:'詢問',four:true,price:2,tags:'早午餐 pancakes brunch 下午茶'}),
    venue('claddining',2,'DINING 花衣','DINING 花衣','Dining Hanagoromo','HOTEL CLAD 館內',src.cladFood,'日式定食','早餐 07:00–09:30，晚餐 17:30–21:30',{reserve:'建議',four:true,parking:true,price:3,note:'朝食採自助餐形式，晚餐依訂房方案或餐廳菜單，最後點餐一般 20:30。'}),
    venue('itadaki',2,'御殿場 ITADAKI TERRACE','いただきテラス','Gotemba Food Hall Itadaki Terrace','御殿場 Premium Outlets HILL SIDE',src.outletBrands,'日式定食','園區及店鋪各自公告',{reserve:'免預約',four:true,parking:true,price:2,tags:'海鮮 拉麵 seafood ramen',note:'各取所需後在食堂集合。'}),
    venue('toraya',2,'虎屋工房','とらや工房','Toraya Kobo','静岡県御殿場市東山1022-1','https://www.toraya-kobo.jp/','甜點','依工房日曆',{reserve:'免預約',four:true,parking:true,price:1,note:'冬季一般 10:00–17:00，常態週二休息，1/26 勿依此安排。'}),
    venue('hoto',3,'餺飥不動 東戀路店','ほうとう不動 東恋路店','Hoto Fudo Higashikoiji','山梨県南都留郡富士河口湖町船津2458','https://www.houtou-fudou.jp/','富士山特色料理','依店舖公告，售完可能提早結束',{reserve:'詢問',four:true,parking:true,price:2,tags:'ほうとう houtou noodle noodles'}),
    venue('oishicafe',3,'河口湖自然生活館','河口湖自然生活館','Kawaguchiko Natural Living Center','山梨県南都留郡富士河口湖町大石2585',src.oishi,'咖啡廳','依季節及館方公告',{reserve:'免預約',four:true,parking:true,price:1,tags:'soft serve ice cream dessert 甜點',note:'可配合大石公園，自駕或紅線巴士。'}),
    venue('nrtfood',4,'成田 T1 餐飲目錄','成田空港 第1ターミナル レストラン','Narita Terminal 1 Dining','千葉県成田市三里塚御料牧場1-1',src.nrtShop,'餐飲目錄','各店公告',{reserve:'免預約',four:true,price:0,tags:'海鮮 定食 咖啡 甜點 拉麵 sushi seafood ramen',note:'依保安檢查前後與區域查詢。'})
  ];
  const shopping=[
    venue('hands',1,'HANDS 銀座','ハンズ銀座店','Hands Ginza','東京都中央区銀座2-2-14 5–9F','https://info.hands.net/en/list/ginza/','生活用品','11:00–21:00',{zone:'銀座二丁目'}),
    venue('muji',1,'無印良品 銀座','無印良品 銀座','MUJI Ginza','東京都中央区銀座3-3-5','https://www.muji.com/flagship/ginza/ja/','生活用品','多數樓層 11:00 起',{zone:'銀座三丁目'}),
    venue('matsuya',1,'松屋銀座','松屋銀座','Matsuya Ginza','東京都中央区銀座3-6-1','https://www.matsuya.com/ginza/','百貨','依樓層公告',{zone:'銀座三丁目'}),
    venue('mitsukoshi',1,'銀座三越','銀座三越','Ginza Mitsukoshi','東京都中央区銀座4-6-16','https://www.mistore.jp/store/ginza.html','美妝','一般 10:00–20:00，餐廳另計',{zone:'銀座四丁目'}),
    venue('wako',1,'和光・Seiko House','和光 本店','Wako / Seiko House','東京都中央区銀座4-5-11','https://www.wako.co.jp/','精品','依各樓層公告',{zone:'銀座四丁目'}),
    venue('g6',1,'GINZA SIX','ギンザ シックス','GINZA SIX','東京都中央区銀座6-10-1','https://ginza6.tokyo/','精品','一般商店 10:30–20:30',{zone:'銀座六丁目'}),
    venue('uniqlo',1,'UNIQLO 銀座旗艦店','ユニクロ 銀座店','UNIQLO Ginza','東京都中央区銀座6-9-5','https://www.uniqlo.com/jp/ja/special-feature/ginza','服飾','依門市公告',{zone:'銀座六丁目',note:'銀座店與 Marronnier Gate 2 的 UNIQLO TOKYO 為不同門市。'}),
    venue('cosme',5,'@cosme TOKYO','アットコスメ トーキョー','@cosme TOKYO','東京都渋谷区神宮前1-14-27','https://www.cosme.net/store/flagship/tokyo/','美妝','依門市公告',{zone:'JR 原宿站前',note:'將需求中的 @cosmos 先比對為 @cosme TOKYO。'}),
    venue('harry',5,'哈利波特原宿旗艦店','ハリー・ポッター ショップ 原宿','Harry Potter Shop Harajuku','東京都渋谷区神宮前6-31-21','https://harrypottershop.jp/en/pages/harajuku','伴手禮','依官網公告',{zone:'神宮前',note:'原宿選配，先查入店公告，勿同時排滿銀座。'}),
    venue('maruetsu',0,'入谷附近超市','まいばすけっと 入谷2丁目店','My Basket Iriya','東京都台東区入谷2丁目','https://www.mybasket.co.jp/','生活用品','依門市公告',{zone:'入谷',status:'Pending'}),
    venue('drug',0,'入谷附近藥妝','ウエルシア台東入谷店','Welcia Taito Iriya','東京都台東区入谷','https://stores.welcia.co.jp/','美妝','依門市公告',{zone:'入谷',status:'Pending'}),
    venue('conbini',0,'入谷附近便利店','コンビニ 入谷駅','Convenience stores near Iriya Station','東京都台東区入谷',src.hotelAccess,'生活用品','各門市公告',{zone:'入谷',status:'Pending'}),
    venue('souvenir',4,'成田機場伴手禮','成田空港 第1ターミナル ショップ','Narita Terminal 1 Shops','成田機場第一航廈',src.nrtShop,'伴手禮','依店與安檢區域',{zone:'T1',note:'東京香蕉、點心、日系化妝品等，品牌庫存與價格以現場為準。'})
  ];
  return {checked,members,src,places,days,tasks,regions,dining,shopping,venue};
})();

;
/* transport.js */
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
    nipponUeno:'https://store.nipponrentacar.co.jp/en/b/nrs/info/512011/',
    outletUenoBus:'https://www.premiumoutlets.co.jp/cht/gotemba/access/detail7013.html',
    outletTokyoBus:'https://www.premiumoutlets.co.jp/gotemba/access/bus/detail37.html',
    outletBusGuide:'https://www.jrbuskanto.co.jp/jwp/bus_info/guide',
    outletBusBooking:'https://www.kousokubus.net/',
    uenoBusStop:'https://www.jrbuskanto.co.jp/bus_stop/etc_map.cfm?code=130005&pref_code=13',
    tokyoBusStop:'https://www.jrbuskanto.co.jp/jwp/bus_stop/tokyo',
    metroFare:'https://www.tokyometro.jp/ticket/types/regular/index.html',
    outletName:'https://www.premiumoutlets.co.jp/en/gotemba/brands/shop_name.html',
    taxDetail:'https://www.nta.go.jp/publication/pamph/shohi/menzei/202506/pdf/0025006-106.pdf',
    iriyaMap:'https://www.tokyometro.jp/station/iriya/yardmap/index_print.html'
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
    ['base','租車費／報價小計','¥'],['winter','雪胎','¥'],['awd','4WD 車型差額','¥'],
    ['cdw','免責補償','¥'],['noc','NOC 補償','¥'],['insurance','其他保險','¥'],
    ['etc','ETC 卡及設備','¥'],['toll','高速過路費','¥'],['parking','停車','¥'],
    ['oneway','異地還車','¥'],['local','門市接駁與市區交通（四人）','¥'],
    ['bus','巴士與鐵路（四人）','¥'],['other','其他稅金或必要費用','¥'],
    ['km','全程駕駛距離','km'],['kmpl','油耗','km/L'],['fuel','每公升油價','¥/L']
  ];
  const outletBus = {weekday:[1900,2000],special:[2100,2200],uenoMetroPaper:180};
  const groupBusUpper = outletBus.weekday[1]*window.TRIP.members.length;
  const plans=[
    {id:'a',name:'A｜Nippon 兩天・上野取還',quote:true,time:'6–8 小時',mid:7,drive:'4–5.5 小時',transfer:'0–1 次',comfort:'行李便利，兩天均可開車。回到上野時留時間加油及辦還車。',route:'上野站前取車 → 御殿場 Premium Outlets／HOTEL CLAD → 富士山周邊 → 上野站前還車',basis:'1/26 09:00 取車，1/27 20:00 還車，門市均為上野站前。高速過路費採使用者提供的 ¥3,600。',numbers:[37180,0,0,0,0,0,0,3600,0,0,0,0,0,0,11,175]},
    {id:'d',name:'B｜Nippon 一天・御殿場取／上野還',quote:true,time:'6–8.5 小時',mid:7.25,drive:'3.5–4.5 小時',transfer:'1–3 次',comfort:'首日搭巴士與住一晚，隔天開車回上野。',route:'1/26 入谷 → 上野入谷口或東京站 → 御殿場 Premium Outlets／HOTEL CLAD；1/27 御殿場站取車 → 富士山周邊 → 上野站前還車',basis:'1/27 09:00 御殿場站取車，20:00 上野站前還車。取車前確認清晨接駁或預約計程車，回程高速費另查。',numbers:[26510,0,0,0,0,0,0,0,0,0,0,groupBusUpper,0,0,11,175]},
    {id:'b',name:'C｜御殿場取還',time:'6.5–9 小時',mid:7.75,drive:'2.5–3.5 小時',transfer:'2–4 次',comfort:'少開東京市區，需搬運戰利品上巴士',route:'上野／東京站 → Premium Outlets → 御殿場站取還 → Premium Outlets → 上野／東京站',basis:'規劃 1/26 約 11:00–1/27 16:30，約 29.5 小時。御殿場站門市回圈較好確認；兩個半天中只有後段消耗較多里程。',numbers:[34100,3300,2200,2200,2200,0,550,1200,0,0,2400,2*groupBusUpper,0,115,11,175]},
    {id:'b24',name:'D 變體｜1/27 才租',time:'6.5–9 小時',mid:7.75,drive:'2.5–3 小時',transfer:'3–5 次',comfort:'首日直達 Outlet，隔日需安排接駁至門市',route:'上野／東京站 → Outlet／CLAD；次日御殿場站取還 → 富士山周邊 → Outlet → 上野／東京站',basis:'1/26 搭巴士。1/27 估 10:45–16:30 御殿場同站還車，租金保守按 24 小時級距。',numbers:[22000,1650,1100,1100,1100,0,550,1200,0,0,2400,2*groupBusUpper,0,105,11,175]},
    {id:'c',name:'E｜御殿場取・河口湖還',time:'5.5–7.5 小時',mid:6.5,drive:'1.5–2.5 小時',transfer:'3–5 次',comfort:'減少山區折返，需搬運購物袋及過夜行李',route:'上野／東京站 → Premium Outlets → 御殿場取車 → CLAD → 河口湖還車 → 東京站／上野',basis:'規劃 1/26 11:00–1/27 15:30，約 28.5 小時。先確認業者允許指定車型與雪胎車輛跨縣還車；河口湖門市至車站接送另查。',numbers:[34100,3300,2200,2200,2200,0,550,1000,0,8800,2400,16800,0,75,11,175]},
    {id:'public',name:'基準｜全程大眾運輸',time:'7–9.5 小時',mid:8.25,drive:'0 小時',transfer:'3–6 次',comfort:'免開車，巴士空位、行李規格和轉乘最重要',route:'上野／東京站 → Outlet／CLAD → 河口湖巴士（營運時） → 東京站／上野；或直接由 Outlet 返東京',basis:'以有河口湖停留、附區域巴士的版本估算，若縮短為御殿場往返，時間與金額均低於此基準。道路停駛時查鐵路。',numbers:[0,0,0,0,0,0,0,0,0,0,2400,26600,0,0,0,0]}
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
    {name:'Nippon Rent-A-Car 上野站前',ja:'ニッポンレンタカー 上野駅前',area:'東京',anchor:'上野站',url:src.nipponUeno,detail:'兩天方案取還車門市，也是一天方案的還車門市。通常 08:00–20:00；先核對取還車手續及指定日期營業時間。'},
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
  return {zones,fields,plans,outletBus,cars,shops,airport,parking,roadChecks};
})();

;
/* site-version.js */
'use strict';
(() => {
  const releaseNode = document.querySelector('#trip-release');
  if (!releaseNode) return;
  const current = JSON.parse(releaseNode.textContent);
  const offline = document.documentElement.hasAttribute('data-trip-offline');
  const publicSite = 'https://oceanwhileru.github.io/Tokyo-Family-Trip-2027/';
  const reloadParam = '_trip_reload';
  const taipeiTime = new Intl.DateTimeFormat('sv-SE', {
    timeZone:'Asia/Taipei', year:'numeric', month:'2-digit', day:'2-digit',
    hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23'
  });
  const locationUrl = new URL(window.location.href);
  if (locationUrl.searchParams.has(reloadParam)) {
    locationUrl.searchParams.delete(reloadParam);
    window.history.replaceState(window.history.state, '', locationUrl);
  }

  let message = '';
  let checking = false;
  let updated = false;
  let requestSequence = 0;
  const freshToken = () => Date.now().toString(36)+'-'+(++requestSequence).toString(36);

  function render() {
    for (const panel of document.querySelectorAll('[data-version-panel]')) {
      if (!panel.firstElementChild) {
        panel.append(document.querySelector('#version-panel-template').content.cloneNode(true));
        panel.querySelector('[data-current-version]').textContent = current.version;
        const time = panel.querySelector('[data-deployed-at]');
        time.dateTime = current.deployedAt;
        time.textContent = taipeiTime.format(new Date(current.deployedAt))+' 台灣時間';
        panel.querySelector('[data-new-offline]').href = publicSite+'#sources';
      }
      panel.querySelector('[data-version-status]').textContent = message;
      panel.querySelector('[data-version-action="check"]').disabled = checking;
      panel.querySelector('[data-new-offline]').hidden = !offline || !updated;
    }
  }

  async function check(manual) {
    if (checking) return;
    checking = true;
    if (manual) message = '正在檢查版本…';
    render();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const endpoint = new URL('version.json', offline ? publicSite : window.location.href);
      endpoint.searchParams.set('_trip_check', freshToken());
      const response = await fetch(endpoint, {
        cache:'no-store', credentials:'omit', signal:controller.signal
      });
      if (!response.ok) throw new Error('Version request failed');
      const latest = await response.json();
      if (!/^V\d+\.\d+\.\d+$/.test(latest?.version ?? '') ||
          !/^v\d+\.\d+\.\d+-[a-f0-9]{12}$/.test(latest?.buildId ?? '') ||
          !latest.buildId.startsWith(latest.version.toLowerCase()+'-') ||
          !Number.isFinite(Date.parse(latest?.deployedAt))) {
        throw new Error('Invalid version metadata');
      }
      updated = latest.buildId !== current.buildId;
      message = updated
        ? '線上版本為 '+latest.version+'。'+(offline ? '請下載新版離線檔。' : '請重新載入以更新。')
        : manual ? '目前使用的是最新版本。' : '';
    } catch {
      if (manual) message = '目前無法檢查版本，請確認網路後重試。';
    } finally {
      clearTimeout(timer);
      checking = false;
      render();
    }
  }

  function reload() {
    if (window.location.protocol === 'file:') {
      window.location.reload();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set(reloadParam, freshToken());
    window.location.replace(url);
  }

  document.addEventListener('click', event => {
    const action = event.target.closest('button[data-version-action]')?.dataset.versionAction;
    if (action === 'check') check(true);
    if (action === 'reload') reload();
  });
  window.TRIP_VERSION = {render};
  render();
  if (!offline) check(false);
})();

;
/* ledger-rates.js */
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

;
/* app.js */
'use strict';
(() => {
  const D = window.TRIP;
  const T = window.TRANSPORT;
  const L = window.TRIP_LEDGER;
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
  let expensePerson = '';
  const defaultModel = () => {
    const profiles = Object.fromEntries(D.members.map(name => [name,{done:{},tasks:{},favorites:{},shopping:[],expenses:[]}]));
    return {profile:'Judy',profiles,fx:null};
  };
  const storageKey='tokyo-family-trip-2027.v1';
  const ledgerKey=profile=>'tokyo-family-trip-2027.ledger.v1.'+profile;
  const ledgerMemory=Object.fromEntries(D.members.map(name=>[name,[]]));
  let canStoreLedger=true;
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
  let modelPlan = 'd';
  let model = planInput(T.plans.find(p=>p.id===modelPlan));

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
      ext(t.url,'官方資訊')+'</div></div>').join('')+'</div>';
  }
  function dashboard() {
    const now=new Date();
    const today=nowDate(now);
    const remain=Math.round((Date.parse(D.days[0].date)-Date.parse(today))/86400000);
    const tripDay=D.days.find(d=>d.date===today);
    const over=today>D.days[4].date;
    const upcoming=D.days.flatMap(d=>d.events.filter(e=>e.kind==='main').map(e=>({d,e,ts:when(d,e)}))).filter(x=>x.ts>now).sort((a,b)=>a.ts-b.ts)[0];
    const next=upcoming?upcoming.d.label+' '+upcoming.e.time+' '+upcoming.e.zone+' · '+upcoming.e.title:'五天行程已結束';
    const reminders=[['HOTEL CLAD 尚未訂房','1/26 兩間富士景房，優先雙床房與一泊二食。','#transport/stay'],
      ['御殿場租車尚未預訂','1/26–1/27 行程區段，先確認雪胎與駕駛條件。','#transport/rental'],
      ['日本私人包車待決定','1/28 四人 ¥16,000 為使用者報價。11:40 JST 前開始赴機場。','#transport/airport']];
    return '<section class="hero">'+photo('fuji',true)+'<div><p class="hero-meta">2027.01.24 – 01.28 ｜ 五天四夜</p><h1><span>Tokyo Family</span><span>Trip <b class="year">2027</b></span></h1>'+
      '<p class="hero-zh">東京家族旅行</p><div class="hero-foot"><span>東京・御殿場・富士山</span><span>4 位成人</span></div></div>'+
      '<div class="countdown"><strong>'+esc(remain>0?remain:over?'完成':'DAY '+tripDay.id)+'</strong><span>'+esc(remain>0?'距出發 · 天':over?'旅程已結束':'旅途中 · JST')+'</span></div></section>'+
      (window.TRIP_VERSION?'<section class="home-version" data-version-panel aria-label="網站版本"></section>':'')+
      section('五天行程','<div class="daystrip">'+D.days.map(d=>'<a href="#itinerary/'+d.id+'" class="day-short">'+photo(d.photo,true)+'<span class="day-num">DAY '+d.id+' · '+esc(d.label)+'</span><b>'+esc(d.area)+'</b></a>').join('')+'</div>',
        '<div class="member-row" aria-label="四位家人">'+D.members.map(n=>'<button class="member" data-action="profile" data-value="'+n+'" aria-pressed="'+(n===memory.profile)+'"><i aria-hidden="true">'+n[0]+'</i>'+n+'</button>').join('')+'</div>')+
      '<div class="dash-lower">'+section(tripDay?'今天在日本':over?'旅行回顧':'出發前','<article class="panel"><h3>'+esc(tripDay?tripDay.title:over?'回顧收藏與費用':'下一個活動')+'</h3><p>'+esc(tripDay?tripDay.summary:next)+'</p>'+
        (tripDay?'<p class="small muted">'+esc(next)+'</p>':'')+'<div class="tools-row">'+internal(tripDay?'itinerary/'+tripDay.id:'itinerary/1','查看行程',true)+internal('tools','旅行工具')+'</div></article>')+
      section('三地天氣','<div id="weather-view">'+weatherView()+'</div>',button('weather','更新'))+'</div>'+
      section(over?'出發前安排紀錄':'住宿與交通提醒','<div class="grid dash-alerts">'+reminders.map(([title,detail,url])=>
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
    // Retain saved completion keys when a leading event has been removed.
    const key=day.id+'-'+plan+'-'+(i+(day.firstEventIndex??0));
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
    if(day.id===1) extra=internal('transport/airport','到飯店的交通')+' '+internal('transport/stay','入谷飯店');
    if(day.id===2) extra=internal('shopping','銀座店鋪')+' '+internal('dining','找午餐與晚餐')+links([[routeLink(D.places.hotel.en,'Ginza Station','transit'),'入谷至銀座'],[routeLink('HANDS Ginza','Shiseido Parlour','walking','MUJI Ginza|Matsuya Ginza|Ginza Mitsukoshi|GINZA SIX'),'銀座北至南步行路線'],[map('歌舞伎座 東銀座'),'附近文化景點：歌舞伎座']]);
    if(day.id===3||day.id===4) extra=internal('transport/rental','取還車與費用試算')+' '+internal('transport/roads','停車與道路')+' '+internal('transport/fuji',day.id===3?'上野／東京站直達 Outlet':'大眾運輸備案')+links([[day.id===3?S.outletMap:routeLink('HOTEL CLAD','Oishi Park','driving','Kitaguchi Hongu Fuji Sengen Jinja'),'路線與動線'],[map('ENEOS 御殿場駅'),'御殿場加油站'],[map('ENEOS 河口湖駅'),'河口湖加油站']]);
    if(day.id===5) extra=internal('transport/airport','包車與大眾運輸比較')+links([[S.nrtShop,'成田 T1 餐飲與伴手禮']]);
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
    ['鐵路備案｜東京站 → 御殿場 Premium Outlets','東京站搭 JR 東海道線至國府津，轉 JR 御殿場線至御殿場站，再從箱根乙女口搭 Outlet 免費接駁。班次較疏時預留轉乘時間。',S.outletAccess,routeLink('Tokyo Station','Gotemba Premium Outlets','transit','Gotemba Station')],
    ['Outlet ↔ HOTEL CLAD','從 HILL SIDE 依官方指標上樓到飯店、溫泉方向。大件行李確認可用電梯與飯店接駁上車點。',S.cladAccess,routeLink('Gotemba Premium Outlets Hill Side','HOTEL CLAD','walking')],
    ['御殿場 ↔ 河口湖','先核對 Outlet 至河口湖直達巴士的運行日、是否要預約、行李規定。遇停駛改御殿場直接返東京。',S.fujiBus,routeLink('Gotemba Premium Outlets','Kawaguchiko Station')],
    ['河口湖 ↔ 東京','查河口湖至東京站／上野的富士急高速巴士。配合還車時間預約座位，搭車前留轉乘時間。',S.fujiReturn,routeLink('Kawaguchiko Station','Tokyo Station')]
  ];
  const transportTabs=[['flights','航班'],['airport','成田往返'],['fuji','市區・富士山'],['rental','租車自駕'],['roads','停車及道路'],['stay','兩間飯店']];
  function flights() {
    return '<div class="grid two">'+card('去程｜MM626','1/24（日）10:40 台灣時間 桃園 T1 → 14:55 JST 成田 T1。抵達後至少保留三小時，到飯店目標 17:55。',chips(chip('使用者提供'),badge('Pending'))+links([[S.peachTPE,'桃園 T1 官方指引'],[map('Taoyuan International Airport Terminal 1'),'桃園 T1 地圖']]))+
      card('回程｜MM623','1/28（四）16:40 JST 成田 T1 北翼 4F → 20:00 台灣時間 桃園 T1。最晚 11:40 JST 開始赴機場。',chips(chip('使用者提供'),badge('Pending'))+links([[S.peachNRT,'成田 T1 官方指引'],[map('Narita Terminal 1 North Wing'),'成田 T1 北翼地圖']]))+'</div>'+
      section('航班時刻與行李查核','<article class="panel"><p>航空公司機場指南已核對兩地均為 T1。去回時刻保留訂單原資料，官方航線可用日期下拉查詢，出票與變更以訂單為準。公開冬季班表的非官方交叉資料另列 12–2 月回程 16:35，尚待 Peach 指定日期班表或訂單核實。如確認提前 5 分鐘，五小時緩衝的出發上限也前移至 11:35。</p>'+
      '<p>Peach 國際線一般報到窗口為起飛前 120 至 50 分鐘，登機口一般為起飛前 30 分鐘。隨身行李含個人物品合計兩件、總重 7 kg，登機箱三邊合計 115 cm 以內且須符合單邊限制。托運件數看票種與加購，單件標準 20 kg，超重按官網。</p>'+links([[S.peachLookup,'指定日期班表'],[S.peachStatus,'Peach 航班狀態'],[S.peachCheck,'報到規定'],[S.carry,'隨身行李'],[S.bags,'托運行李']])+'</article>');
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
    const weekday=T.outletBus.weekday.map(jpy).join('–');
    const special=T.outletBus.special.map(jpy).join('–');
    const fare='平日成人單程 '+weekday+'；週末、假日或指定日 '+special+'。';
    const ueno=card('上野站入谷口 → 御殿場 Premium Outlets',
      '離飯店較近。可步行到 JR 上野站入谷口，或搭日比谷線一站至上野後再走到乘車點。Outlet 公布班次為 09:55 發車、12:10 抵達。',
      '<p>'+fare+' 入谷到上野如搭地鐵，普通票另加 '+jpy(T.outletBus.uenoMetroPaper)+'／人。</p>'+
      links([[S.outletUenoBus,'上野直達班次與票價'],[S.uenoBusStop,'JR 上野乘車點'],[routeLink(D.places.hotel.en,'JR 上野駅 入谷口 高速バスのりば','walking'),'飯店步行路線']]));
    const tokyo=card('東京站八重洲南口 → 御殿場 Premium Outlets',
      '從入谷搭地鐵到上野，轉 JR 到東京站，出站後往八重洲南口的 JR 高速巴士總站。班次較多，Outlet 公布的平日例為 09:00→10:40 或 09:30→11:10。',
      '<p>'+fare+' 入谷到東京站的市區電車費另計。部分回程在東京站日本橋口下車。</p>'+
      links([[S.outletTokyoBus,'東京站直達班次與票價'],[S.tokyoBusStop,'JR 東京車站乘車點'],[routeLink(D.places.hotel.en,'東京駅 JR高速バスターミナル 八重洲南口'),'飯店到乘車點']]));
    return section('1/26 前往御殿場 Premium Outlets','<div class="grid two">'+ueno+tokyo+'</div>'+
      '<p class="record-meta">兩條路線均在 Outlet 園區下車。上野較近，想在中午前到 Outlet 可先查東京站較早班次。班表是目前公布的參考，2027/1/26 班次、票價與座位請在開賣後確認。</p>'+
      links([[S.outletBusBooking,'高速巴士網訂位'],[S.outletBusGuide,'JR 巴士購票說明'],[S.metroFare,'東京 Metro 票價']]))+
      section('其他市區與富士山交通','<div class="grid two">'+routes.map(([title,detail,source,directions])=>card(title,detail,links([[source,'官網'],[directions,'Google Maps']]))).join('')+'</div>'+
      links([[S.jr,'JR 東日本'],[S.fujiReturn,'富士急巴士'],[S.circleBus,'河口湖周遊巴士']]));
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
  function planInput(plan) {
    return Object.fromEntries(T.fields.map(([key],i)=>[key,plan.numbers[i]]));
  }
  function rental() {
    const baseline=T.plans.at(-1);
    const plans=T.plans.map(p=>{
      const input=planInput(p);
      const {total}=modelSum(input);
      const amounts=p.id==='d'?T.outletBus.weekday.map(fare=>input.base+fare*D.members.length):[total,total];
      const diff=baseline.mid-p.mid;
      const compare=diff===0?'基準':(diff>0?'中位估快 ':'中位估慢 ')+Math.abs(diff)+' 小時';
      const breakdown=p.id==='d'?'含稅租金 '+jpy(input.base)+' ＋ 上野直達巴士 '+T.outletBus.weekday.map(fare=>jpy(fare*D.members.length)).join('–')+'（四人）。以入谷飯店步行到上野入谷口計。若搭地鐵到上野，再加 '+jpy(T.outletBus.uenoMetroPaper*D.members.length)+'／四人。':
        '含稅租金 '+jpy(input.base)+' ＋ 高速費 '+jpy(input.toll)+'。';
      return '<article class="card"><h3>'+esc(p.name)+'</h3>'+chips(p.quote?chip('使用者提供報價','easy'):badge('Estimated'))+
        '<p class="route">'+esc(p.route)+'</p><p>'+esc(p.basis)+'</p><p class="small">'+esc('總交通 '+p.time+' · 駕駛 '+p.drive+' · 轉乘 '+p.transfer+' · '+compare)+'</p><p class="small">'+esc(p.comfort)+'</p>'+
        (p.quote?'<p class="small">'+esc(breakdown)+'</p>':'')+
        '<p><strong>'+range(amounts)+'</strong>／四人'+(p.quote?'已列費用小計':'')+'</p><p class="small">'+range(amounts,4)+'／人</p>'+
        '<div class="tools-row"><button type="button" class="btn" data-action="use-plan" data-value="'+p.id+'">帶入試算</button></div></article>';
    }).join('');
    return '<article class="alert"><h3>Nippon Rent-A-Car 同車級報價</h3><p>兩張截圖均為 Intermediate Plus、車款未指定、雪胎、禁菸、標準方案，均未加購 CDW 或 ECO。報價含稅，油費、停車及未列費用需另估。截圖顯示 ETC 卡租用選項為 ¥330，請在確認頁核對是否已計入。冬季路況不適合自駕時，可改搭大眾運輸。</p>'+
      '<div class="tools-row">'+internal('transport/fuji','看上野／東京站直達巴士')+'</div></article>'+
      section('兩日交通比較','<div class="grid">'+plans+'</div><p class="record-meta">A、D 租金來源為使用者提供的報價截圖。D 的上野巴士依目前公開平日單程票價估算，實際以訂位畫面為準。其他方案的金額及所有交通時間均為規劃估算。'+esc(fxBrief())+'。</p>'+
        links([[S.nippon,'Nippon 租車官網'],[S.nipponUeno,'Nippon 上野站前'],[S.nipponGotemba,'Nippon 御殿場站'],[S.toll,'高速過路費查詢'],[S.outletBusBooking,'巴士訂位']]))+
      section('四人租車成本試算','<article class="panel" id="rental-calculator">'+rentCalculator()+'</article>')+
      section('車型比較','<div class="grid">'+T.cars.map(c=>card(c.name,c.models,'<p>'+esc(c.choice)+'</p><p>'+esc(c.note)+'</p><p class="small muted">'+esc(c.price)+'</p>')).join('')+
        '</div><p class="record-meta">租車訂單多按級距，同級替代車、動力及輔助功能須以訂單與門市答覆為準。估算油耗受車款、道路與天氣影響。</p>')+
      section('租車公司與門市','<article class="panel"><label>搜尋公司、地區或門市 <input id="shop-search" type="search" value="'+esc(filter.transport.q||'')+'" placeholder="Toyota、御殿場、河口湖"></label></article><div id="shop-results">'+shopsView()+'</div>')+
      section('預約與取消','<article class="panel"><p>Toyota 官方說明一般最早可於取車前三個月預約，這段日期已落在一般預約窗口內。儘早向首選與備選門市詢價，並同時查 1/27 日租。核對預設有無稅金、冬季設備、有無雪胎指定選項、付款方式及確認信。先記下取消截止與費率。Toyota 一般規則可能自取車前第 6 日起收取消費，適用條款依訂單。</p>'+
      links([[S.toyotaCancel,'Toyota 預約與取消'],[S.toyotaBookingFAQ,'Toyota 預約窗口'],[S.nippon,'Nippon 官方預約'],[S.toyotaGotemba,'Toyota 御殿場門市']])+'</article>');
  }
  function rentCalculator() {
    return '<p class="muted">已包含在租車報價的費用，請勿重複加計。各金額欄為四人總費用。油費＝公里數 ÷ 每公升行駛公里 × 每公升油價。</p>'+
      (modelPlan==='d'?'<p class="small">預填上野單程巴士預算，每人 '+jpy(T.outletBus.weekday[1])+'。若改走東京站或搭地鐵到上野，請補上市區車資。尚未提供的高速、油費等欄位先留 0。</p>':
        modelPlan==='a'?'<p class="small">預填租金及兩天高速費，尚未提供的油費等欄位先留 0。</p>':'')+
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
    const routes={flights,airport,fuji:fujiTransport,rental,roads,stay};
    const type=Object.hasOwn(routes,tab)?tab:'flights';
    return heading('交通導航','航班、成田往返、東京市區及富士山交通。')+tabs('transport',transportTabs,type)+routes[type]();
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
  function shares(row) {
    const base = Math.floor(row.amount/row.people.length);
    const remainder = row.amount%row.people.length;
    return Object.fromEntries(row.people.map((name,index)=>[name,base+(index<remainder?1:0)]));
  }
  function settle(rows,code) {
    const balances=Object.fromEntries(D.members.map(n=>[n,0]));
    for(const row of rows.filter(r=>r.currency===code)){
      balances[row.payer]+=row.amount;
      for(const [name,value] of Object.entries(shares(row)))balances[name]-=value;
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
  function visibleExpenses() {
    return me().expenses.filter(row=>!expensePerson||row.payer===expensePerson||row.people.includes(expensePerson));
  }
  function expenseList() {
    const rows=visibleExpenses();
    if(!rows.length)return '<p class="small muted section">'+(expensePerson?'沒有此成員的支出紀錄。':'尚無支出。')+'</p>';
    return '<p class="small muted show-count">共 '+rows.length+' 筆</p>'+rows.map(r=>'<div class="list-row"><h3 class="break-anywhere">'+esc(r.name)+'</h3><p>'+
      esc((r.currency==='JPY'?jpy(r.amount):twd(r.amount))+' · 代墊 '+r.payer+' · '+r.people.join('、'))+'</p><div class="tools-row"><button type="button" class="btn danger" data-action="remove-expense" data-value="'+esc(r.id)+'">移除</button></div></div>').join('');
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
      '<button type="submit" class="btn primary">加入支出</button></form></article><article class="panel"><h2>全部支出結算</h2><p class="result">'+jpy(yen)+' ＋ '+twd(nt)+'<br>總計約 '+twd(yen*fx.value.rate+nt)+'</p>'+
      '<p class="small muted">餘數依畫面成員順序各加 1 元，轉帳逐幣別結算。'+esc(fxBrief())+'。</p>'+(payments.length?'<ul>'+payments.join('')+'</ul>':'<p>目前無需互轉。</p>')+'</article></div>'+
      section('支出紀錄','<article class="panel"><div class="tools-row"><label for="expense-person">代墊或分攤成員</label>'+
        '<select id="expense-person"><option value="">全部成員</option>'+options(D.members,expensePerson)+'</select>'+
        button('export-expenses','匯出明細 CSV')+'</div><div id="expense-list" aria-live="polite">'+expenseList()+'</div></article>');
  }

  function ledgerMethods() {
    return [...new Set([...L.methods,...ledgerEntries().map(row=>row.method)])];
  }
  function ledgerEntries(profile=memory.profile) {
    if(canStoreLedger){
      try{
        const rows=JSON.parse(localStorage.getItem(ledgerKey(profile))||'[]');
        if(Array.isArray(rows))ledgerMemory[profile]=rows;
      }catch{canStoreLedger=false;}
    }
    return ledgerMemory[profile];
  }
  function storeLedger(profile,rows) {
    ledgerMemory[profile]=rows;
    if(!canStoreLedger)return;
    try{localStorage.setItem(ledgerKey(profile),JSON.stringify(rows));}
    catch{canStoreLedger=false;}
  }
  function ledgerRows() {
    return [...ledgerEntries()].reverse().sort((a,b)=>b.date.localeCompare(a.date));
  }
  function ledgerRateDetail(row) {
    if(row.currency==='TWD')return '';
    const rate=Number(row.rate);
    const source=row.source==='manual'?'手動輸入 · '+row.quoteDate:'台銀 '+row.quoteDate;
    return '<small class="record-meta">'+esc(source+' · '+rate)+'</small>';
  }
  function ledgerTool() {
    const today=L.dateInTaipei();
    const rows=ledgerRows();
    return '<article class="panel"><h2>'+esc(memory.profile)+' 的個人帳本</h2><p class="muted">資料保存在這個瀏覽器的個人帳本。若共用同一個瀏覽器，切換姓名即可查看其他本機帳本。</p>'+
      '<form id="ledger-form"><fieldset class="form-grid ledger-fields section" aria-label="新增支出">'+
      '<label>種類<select name="category">'+options(L.categories,L.categories[0])+'</select></label>'+
      '<label>付款時間<input type="date" name="date" required value="'+today+'" max="'+today+'"></label>'+
      '<label>支付方式<select name="method">'+ledgerMethods().map(v=>'<option value="method:'+esc(v)+'">'+esc(v)+'</option>').join('')+'<option value="custom">＋ 自訂支付方式</option></select></label>'+
      '<div id="ledger-custom" hidden><label>自訂支付方式<input name="customMethod" maxlength="50" disabled></label></div>'+
      '<label class="wide">支出明細<input name="detail" maxlength="50" required placeholder="最多 50 字"></label>'+
      '<label>幣種<select name="currency">'+options(L.currencies,'TWD')+'</select></label>'+
      '<label>原幣金額<input name="amount" inputmode="decimal" maxlength="13" required placeholder="例：10,000.50"></label>'+
      '<label class="wide">備注<textarea name="note" maxlength="150" rows="2" placeholder="最多 150 字"></textarea></label>'+
      '<details id="ledger-manual" class="wide" hidden><summary>手動填入台銀匯率</summary><label>每 1 外幣可換多少台幣<input name="manualRate" inputmode="decimal" maxlength="12" placeholder="例：0.1988" disabled></label></details>'+
      '<button type="submit" class="btn primary">儲存支出</button></fieldset>'+
      '<p class="form-note small" id="ledger-status" role="status"></p></form>'+
      '<p class="record-meta">日圓與美元採付款日的台銀即期賣出牌告，儲存後固定。週末若沿用最近牌告，會標明牌告日期。</p>'+
      links([[S.bank,'資料來源：臺灣銀行牌告匯率'],['https://rate.bot.com.tw/xrt/history','台銀歷史牌告'],['https://app.haotool.org/ratewise/','資料整理：匯率好工具 RateWise（https://app.haotool.org/ratewise/）']])+
      '</article>'+
      section('個人記帳明細','<article class="panel"><div class="tools-row">'+button('export-ledger','匯出明細 CSV')+'</div>'+
      (rows.length?'<div class="ledger-table section" tabindex="0" role="region" aria-label="個人記帳明細，可左右滑動"><table aria-label="個人記帳明細"><thead><tr>'+
        L.headers.map(title=>'<th scope="col">'+esc(title)+'</th>').join('')+'</tr></thead><tbody>'+
        rows.map(row=>'<tr><td>'+esc(row.category)+'</td><td>'+esc(row.date)+'</td><td>'+esc(row.method)+'</td><td>'+esc(row.detail)+
          '<div class="tools-row"><button type="button" class="btn danger" aria-label="'+esc('移除 '+row.detail)+'" data-action="remove-ledger" data-value="'+esc(row.id)+'">移除</button></div></td>'+
          '<td>'+esc(row.currency)+'</td><td class="ledger-number">'+L.formatAmount(row.amountCents)+'</td>'+
          '<td class="ledger-number">'+L.formatAmount(row.twdCents)+ledgerRateDetail(row)+'</td><td>'+esc(row.note)+'</td></tr>').join('')+
        '</tbody></table></div>':'<p class="muted section">尚無個人記帳。</p>')+'</article>');
  }
  const toolTabs=[['currency','匯率換算'],['shopping','購物清單'],['expenses','費用分攤'],['ledger','個人記帳']];
  function toolsView(tab) {
    const views={currency,shopping:shoppingTool,expenses,ledger:ledgerTool};
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
      '<p>官方通用資訊已核對，以旅行日業者公告為準。旅行意向與訂房狀態獨立記錄。使用者資料包括預訂住宿、航班時刻、成員分工、私人包車報價及行程緩衝。規劃費用與時間可隨後續報價調整。</p></article>'+
      section('待複核資訊','<article class="panel"><ul><li>Peach 指定日航班時刻與票種、成田包車。</li><li>HOTEL CLAD 請重查下單時庫存、最終價格、免費取消時點及行李寄存。</li><li>租車車級、雪胎、跨縣、保險和取還店。班次、車票、餐廳與停車等依指定日公告。</li></ul></article>')+
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
    window.TRIP_VERSION?.render();
    if(move){window.scrollTo(0,0);root.focus({preventScroll:true});}
    if(!canStore)root.insertAdjacentHTML('afterbegin','<p class="panel small">這個瀏覽器目前無法保存資料。你仍可在本次開啟期間使用與匯出。</p>');
    if(page==='home'&&!weather.attempted&&!localFile)updateWeather();
    fxDraw();
  }
  function changeProfile(name){
    if(!D.members.includes(name))return;
    expensePerson='';
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
  function downloadCsv(name,table){
    const quote=cell=>{
      let value=String(cell??'');
      if(typeof cell==='string'&&/^[\s]*[=+\-@]|^[\t\r\n]/.test(value))value="'"+value;
      return '"'+value.replace(/"/g,'""')+'"';
    };
    const url=URL.createObjectURL(new Blob(['\ufeff'+table.map(r=>r.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');
    a.href=url;
    a.download='Tokyo-'+name+'.csv';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function exportShopping(){
    downloadCsv('購物清單-'+memory.profile,[['商品','品牌','預算 JPY','價格 JPY','約 TWD','已購入','備註','匯率 JPY→TWD','匯率日期'],
      ...me().shopping.map(r=>[r.name,r.brand,r.budget,r.price,r.price==null?'':Math.round(r.price*fx.value.rate),r.bought?'是':'否',r.note,fx.value.rate,fx.value.date])]);
  }
  function exportExpenses(){
    const headers=['項目','幣別','原幣金額','代墊人','分攤成員',...D.members.map(name=>name+' 分攤金額')];
    const rows=visibleExpenses().map(row=>{
      const split=shares(row);
      return [row.name,row.currency,row.amount,row.payer,row.people.join('、'),...D.members.map(name=>split[name]??'')];
    });
    downloadCsv('費用分攤-'+memory.profile+(expensePerson?'-'+expensePerson:''),[headers,...rows]);
  }
  function exportLedger(){
    const rows=ledgerRows().map(row=>[row.category,row.date,row.method,row.detail,row.currency,row.amountCents/100,row.twdCents/100,row.note]);
    downloadCsv('個人記帳-'+memory.profile,[L.headers,...rows]);
  }
  function updateLedgerFields(form){
    const custom=form.elements.method.value==='custom';
    $('#ledger-custom',form).hidden=!custom;
    form.elements.customMethod.disabled=!custom;
    form.elements.customMethod.required=custom;
    const foreign=form.elements.currency.value!=='TWD';
    const manual=$('#ledger-manual',form);
    manual.hidden=!foreign;
    form.elements.manualRate.disabled=!foreign||!manual.open;
  }
  async function addLedgerEntry(form,clean){
    const fieldset=$('fieldset',form);
    const status=$('#ledger-status',form);
    if(fieldset.disabled)return;
    const profile=memory.profile;
    const category=clean('category');
    const date=clean('date');
    const methodChoice=clean('method');
    const method=methodChoice==='custom'?clean('customMethod'):methodChoice.replace(/^method:/,'');
    const currency=clean('currency');
    const detail=clean('detail');
    const note=clean('note');
    const amountCents=L.parseAmount(clean('amount'));
    if(!L.categories.includes(category)||!L.currencies.includes(currency)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>L.dateInTaipei()){
      status.textContent='請確認種類、幣種與付款時間。';return;
    }
    if(!method||method.length>50||!detail||detail.length>50||note.length>150){
      status.textContent='請確認支付方式、支出明細和備注。';return;
    }
    if(amountCents===null){
      status.textContent='請輸入大於 0 的金額，最多 8 位整數與 2 位小數。';return;
    }
    const manual=currency==='TWD'?'':clean('manualRate');
    if(manual&&!L.parseRate(manual)){
      status.textContent='請輸入有效的正數匯率，最多 8 位小數。';return;
    }
    let quote={rate:'1',quoteDate:date,source:'twd'};
    if(currency!=='TWD'&&manual)quote={rate:manual,quoteDate:date,source:'manual'};
    if(currency!=='TWD'&&!manual){
      fieldset.disabled=true;
      status.textContent='正在查詢付款日的台銀牌告…';
      try{quote=await L.bankRate(currency,date);}
      catch{quote=null;}
      finally{fieldset.disabled=false;}
      if(!quote){
        status.textContent='暫時查不到這天的台銀即期賣出匯率。可連網重試，或查台銀後手動填入。';
        return;
      }
    }
    const entry={
      id:id(),category,date,method,detail,currency,amountCents,twdCents:L.convert(amountCents,quote.rate),note,...quote
    };
    storeLedger(profile,[...ledgerEntries(profile),entry]);
    if(form.isConnected&&memory.profile===profile)render();
    notify(canStoreLedger?'已存入 '+profile+' 的個人帳本。':'已加入本次使用的帳本。瀏覽器無法保存，請先匯出 CSV。');
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
  function removeLedgerEntry(value){
    if(!confirm('確定要移除這筆個人支出？'))return;
    const profile=memory.profile;
    storeLedger(profile,ledgerEntries(profile).filter(row=>row.id!==value));
    render();notify('已移除。');
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
    'export-expenses':exportExpenses,
    'export-ledger':exportLedger,
    'edit-shop':btn=>editShopping(btn.dataset.value),
    'remove-shop':btn=>removeRow('shopping',btn.dataset.value),
    'remove-expense':btn=>removeRow('expenses',btn.dataset.value),
    'remove-ledger':btn=>removeLedgerEntry(btn.dataset.value)
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
    if(el.id==='expense-person'){
      expensePerson=el.value;
      $('#expense-list').innerHTML=expenseList();
    }
    if(el.matches('#ledger-form select[name=method],#ledger-form select[name=currency]')){
      updateLedgerFields(el.form);
    }
  });
  root.addEventListener('toggle',event=>{
    if(event.target.id==='ledger-manual')updateLedgerFields(event.target.closest('form'));
  },true);
  root.addEventListener('focusout',event=>{
    if(event.target.matches('#ledger-form input[name=amount]')){
      const cents=L.parseAmount(event.target.value);
      if(cents!==null)event.target.value=L.formatAmount(cents);
    }
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
    if(formId==='ledger-form')addLedgerEntry(form,clean);
  });
  $('#profile').addEventListener('change',e=>changeProfile(e.target.value));
  $('#share').addEventListener('click',share);
  $('.skip').addEventListener('click',e=>{e.preventDefault();root.focus();});
  window.addEventListener('hashchange',()=>render(true));
  render();
})();
