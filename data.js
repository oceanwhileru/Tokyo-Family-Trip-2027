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
