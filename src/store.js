// ─── Mana Daily News – Shared Data Store ───
const STORAGE_KEY = 'mana-daily-news-articles';

export const districts = [
  'Adilabad', 'Bhadradri Kothagudem', 'Hanamkonda', 'Hyderabad', 'Jagitial',
  'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy',
  'Karimnagar', 'Khammam', 'Kumuram Bheem Asifabad', 'Mahabubabad',
  'Mahbubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu',
  'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad',
  'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy',
  'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
];

export const mandals = [
  'Adilabad', 'Aloor', 'Armoor', 'Bachupally', 'Balkonda', 'Banswada', 'Bhainsa', 'Bhongir',
  'Bodhan', 'Chennur', 'Choppadandi', 'Devarakonda', 'Dharmapuri', 'Dichpally',
  'Gadwal', 'Gajwel', 'Goshamahal', 'Halia', 'Husnabad', 'Huzurabad', 'Huzurnagar',
  'Jagtial', 'Jangaon', 'Kalwakurthy', 'Kamareddy', 'Karimnagar', 'Khammam',
  'Kodangal', 'Korutla', 'Kothur', 'Kukatpally', 'LB Nagar', 'Luxettipet',
  'Mahabubabad', 'Mancherial', 'Medak', 'Medchal', 'Metpally', 'Miryalaguda',
  'Mothkur', 'Nagarkurnool', 'Nalgonda', 'Narsapur', 'Narayanpet',
  'Nirmal', 'Nizamabad', 'Parkal', 'Peddapalli', 'Pragathi Nagar', 'Sangareddy', 'Secunderabad',
  'Shadnagar', 'Shamshabad', 'Shankarampet', 'Siddipet', 'Sircilla', 'Suryapet', 'Tandur',
  'Toopran', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yellareddy', 'Zahirabad'
];

export const catIcons = {
  Education: '📚', Technology: '💻', Sports: '🏏',
  Agriculture: '🌾', Health: '🏥', Entertainment: '🎬',
  Politics: '🏛️'
};

const defaultArticles = [
  {
    id: '1', status: 'published', breaking: true,
    category: 'Technology', mandal: 'Secunderabad', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&h=400&fit=crop',
    te: { title: 'హైదరాబాద్ మెట్రో రైల్ తెలంగాణ ప్రభుత్వ ఆధీనంలోకి', body: 'తెలంగాణ ప్రభుత్వం L&T నుండి హైదరాబాద్ మెట్రో రైల్ ఫేజ్-1ను మార్చి 2026 నాటికి పూర్తిగా స్వాధీనం చేసుకుంటోంది. రూ. 15,000 కోట్ల లావాదేవీలో రూ. 13,000 కోట్ల అప్పు మరియు L&T వాటా కోసం రూ. 2,000 కోట్లు చెల్లించనుంది.' },
    en: { title: 'Telangana Government to Take Over Hyderabad Metro Rail from L&T by March End', body: 'The Government of Telangana is set to complete the takeover of Hyderabad Metro Rail Phase-1 from Larsen & Toubro by March 2026. The state will absorb Rs 13,000 crore in outstanding debt and pay approximately Rs 2,000 crore for L&T equity stake, totalling Rs 15,000 crore.' },
    author: 'Staff Reporter', time: '2h ago'
  },
  {
    id: '2', status: 'published', breaking: true,
    category: 'Politics', mandal: 'Banswada', district: 'Kamareddy',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop',
    te: { title: 'BJP అధ్యక్షుడు బన్స్‌వాడ వెళ్లకుండా గృహ నిర్బంధం', body: 'తెలంగాణ BJP అధ్యక్షుడు రామచంద్ర రావును కామారెడ్డి జిల్లా బన్స్‌వాడకు వెళ్లకుండా గృహ నిర్బంధం చేశారు. గోషామహల్ MLA రాజాసింగ్‌ను కూడా శంకరంపేటలో పోలీసులు అదుపులోకి తీసుకున్నారు.' },
    en: { title: 'BJP State President Put Under House Arrest to Prevent Banswada Visit', body: 'Telangana BJP president Ramchandra Rao was put under house arrest to prevent him from going to Banswada in Kamareddy district. Goshamahal MLA T Raja Singh was also taken into preventive custody by police at Shankarampet.' },
    author: 'Political Desk', time: '4h ago'
  },
  {
    id: '3', status: 'published', breaking: false,
    category: 'Technology', mandal: 'Kukatpally', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    te: { title: 'లాంజా గ్రూప్ హైదరాబాద్‌లో కొత్త గ్లోబల్ కేపబిలిటీ సెంటర్ ఏర్పాటు', body: 'ప్రపంచ ప్రఖ్యాత CDMO సంస్థ లాంజా గ్రూప్ AG హైదరాబాద్‌లో కొత్త గ్లోబల్ కేపబిలిటీ సెంటర్ (GCC) ఏర్పాటు చేయనున్నట్లు ప్రకటించింది. వందల మంది ఉద్యోగులకు అవకాశం.' },
    en: { title: 'Lonza Group to Set Up New Global Capability Centre in Hyderabad', body: 'Lonza Group AG, a world-leading contract development and manufacturing organization (CDMO), has announced its decision to establish a new Global Capability Centre (GCC) in Hyderabad, creating hundreds of jobs.' },
    author: 'Business Desk', time: '6h ago'
  },
  {
    id: '4', status: 'published', breaking: false,
    category: 'Politics', mandal: 'LB Nagar', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    te: { title: 'HYDRAA హైదరాబాద్ IT కారిడార్‌లో రూ. 600 కోట్ల భూమి స్వాధీనం', body: 'హైదరాబాద్ విపత్తు ప్రతిస్పందన మరియు ఆస్తి రక్షణ ఏజెన్సీ (HYDRAA) IT కారిడార్‌లో 6.30 ఎకరాల ఆక్రమిత ప్రభుత్వ భూమిని స్వాధీనం చేసుకుంది. ఈ భూమి విలువ రూ. 600 కోట్లు.' },
    en: { title: 'HYDRAA Reclaims Rs 600 Crore Worth Government Land in IT Corridor', body: 'The Hyderabad Disaster Response and Asset Protection Agency (HYDRAA) reclaimed 6.30 acres of encroached government land worth Rs 600 crore in Hyderabad IT Corridor.' },
    author: 'City Desk', time: '8h ago'
  },
  {
    id: '5', status: 'published', breaking: false,
    category: 'Technology', mandal: 'Secunderabad', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop',
    te: { title: 'TiE Women 2026 హైదరాబాద్‌లో ప్రారంభం: టైర్ 2 నగరాల్లో రోడ్‌షోలు', body: 'TiE హైదరాబాద్ TiE Women 2026 7వ ఎడిషన్‌ను ప్రారంభించింది. నిజామాబాద్, వరంగల్, కరీంనగర్ వంటి టైర్ 2 నగరాల్లో రోడ్‌షోలు నిర్వహించనుంది. మార్చి 31 లోపు నమోదు చేసుకునే మహిళలకు 50% రాయితీ.' },
    en: { title: 'TiE Women 2026 Launched in Hyderabad with Tier 2 City Roadshows', body: 'TiE Hyderabad launched the 7th edition of TiE Women 2026 with plans to conduct roadshows in Nizamabad, Warangal, Karimnagar, and other Tier 2 cities. 50% discount on membership for women registering before March 31.' },
    author: 'Sravani M', time: '10h ago'
  },
  {
    id: '6', status: 'published', breaking: false,
    category: 'Education', mandal: 'Siddipet', district: 'Siddipet',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    te: { title: 'తెలంగాణ ఇంజనీరింగ్ కాలేజీల ట్యూషన్ ఫీజులు ఖరారు', body: 'తెలంగాణ ప్రభుత్వం ప్రైవేట్ ఇంజనీరింగ్ కాలేజీల్లో BE మరియు BTech కోర్సుల ట్యూషన్ ఫీజు నిర్మాణాన్ని ఖరారు చేసింది. విద్యార్థులు మరియు తల్లిదండ్రులకు ఊరట కల్పించే విధంగా ఫీజులు నిర్ణయించారు.' },
    en: { title: 'Telangana Finalizes Engineering College Tuition Fee Structure', body: 'The Telangana government has finalized the tuition fee structure for BE and BTech courses in private unaided engineering colleges, providing relief to students and parents.' },
    author: 'Education Desk', time: '12h ago'
  },
  {
    id: '7', status: 'published', breaking: false,
    category: 'Sports', mandal: 'Secunderabad', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop',
    te: { title: 'CK నాయుడు ట్రోఫీలో హైదరాబాద్ ఫస్ట్ ఇన్నింగ్స్ ఆధిక్యం', body: 'రాజీవ్ గాంధీ స్టేడియంలో అస్సాంతో జరుగుతున్న CK నాయుడు ట్రోఫీ మ్యాచ్‌లో హైదరాబాద్ ఫస్ట్ ఇన్నింగ్స్ ఆధిక్యం సాధించింది. యువ ఆటగాళ్ల అద్భుత ప్రదర్శన.' },
    en: { title: 'Hyderabad Takes First-Innings Lead Against Assam in CK Nayudu Trophy', body: 'Hyderabad took the first-innings lead against Assam in the CK Nayudu Trophy at Rajiv Gandhi Stadium, with impressive performances from young players.' },
    author: 'Sports Desk', time: '14h ago'
  },
  {
    id: '8', status: 'published', breaking: false,
    category: 'Sports', mandal: 'Secunderabad', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
    te: { title: 'TFA C-డివిజన్ ఫుట్‌బాల్ లీగ్‌లో CCOB సబ్ జూనియర్ FC విజయం', body: 'గింఖానా గ్రౌండ్‌లో జరిగిన TFA C-డివిజన్ ఫుట్‌బాల్ లీగ్‌లో CCOB సబ్ జూనియర్ FC యంగ్ స్పోర్టింగ్ FCను 2-0తో ఓడించింది.' },
    en: { title: 'CCOB Sub Junior FC Wins 2-0 in TFA C-Division Football League', body: 'CCOB Sub Junior FC defeated Young Sporting FC 2-0 in the TFA C-Division football league at Gymkhana Ground, Hyderabad. Emmadi Chethan scored in the second minute.' },
    author: 'Sports Desk', time: '16h ago'
  },
  {
    id: '9', status: 'published', breaking: false,
    category: 'Health', mandal: 'Pragathi Nagar', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop',
    te: { title: 'బచుపల్లి ప్రగతి నగర్‌లో భారీ అగ్నిప్రమాదం', body: 'బచుపల్లి ప్రగతి నగర్‌లో ఫర్నిచర్ షెడ్ల సమూహంలో భారీ అగ్ని ప్రమాదం సంభవించింది. దాదాపు 15 తాత్కాలిక నిర్మాణాలు ధ్వంసమయ్యాయి. ప్రాణనష్టం లేదు.' },
    en: { title: 'Major Fire Destroys 15 Furniture Sheds in Bachupally Pragathi Nagar', body: 'A major fire swept through a cluster of furniture sheds in Pragathi Nagar, Bachupally, destroying nearly 15 temporary structures. No casualties were reported.' },
    author: 'City Desk', time: '18h ago'
  },
  {
    id: '10', status: 'published', breaking: false,
    category: 'Entertainment', mandal: 'Vikarabad', district: 'Vikarabad',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop',
    te: { title: 'అనంతగిరి హిల్స్‌లో ప్రీమియం ఎకో-టూరిజం "The Breeze" ప్రారంభం', body: 'తెలంగాణ అటవీ అభివృద్ధి సంస్థ అనంతగిరి హిల్స్‌లో "The Breeze" అనే ప్రీమియం ఎకో-టూరిజం ప్రాజెక్టును ప్రారంభించింది. లగ్జరీ టెంట్ స్టేలు మరియు అడవి అనుభవాలు అందుబాటులో ఉంటాయి.' },
    en: { title: 'TGFDCL Launches Premium Eco-Tourism "The Breeze" at Ananthagiri Hills', body: 'The Telangana Forest Development Corporation Limited has introduced "The Breeze", a premium eco-tourism initiative at Ananthagiri Hills, offering luxury tent stays and wilderness experiences.' },
    author: 'Tourism Desk', time: '20h ago'
  },
  {
    id: '11', status: 'published', breaking: false,
    category: 'Technology', mandal: 'Kukatpally', district: 'Hyderabad',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    te: { title: 'హైదరాబాద్ మెట్రో ఫేజ్ II: 162 కి.మీ. విస్తరణ ప్రతిపాదనలు కేంద్రానికి', body: 'తెలంగాణ ప్రభుత్వం హైదరాబాద్ మెట్రో 162 కి.మీ. మార్గ విస్తరణ ప్రతిపాదనలను కేంద్రానికి సమర్పించింది. ఫేజ్ IIA 76.4 కి.మీ. రూ. 24,269 కోట్లు, ఫేజ్ IIB 86.1 కి.మీ. రూ. 19,579 కోట్లతో ప్రతిపాదించింది.' },
    en: { title: 'Centre to Decide on 162-km Hyderabad Metro Phase II Expansion', body: 'Union minister Khattar confirmed the Centre will review Telangana proposal for 162-km metro expansion. Phase IIA covers 76.4 km at Rs 24,269 crore and Phase IIB covers 86.1 km at Rs 19,579 crore.' },
    author: 'Infrastructure Desk', time: '1d ago'
  },
  {
    id: '12', status: 'published', breaking: false,
    category: 'Agriculture', mandal: 'Nalgonda', district: 'Nalgonda',
    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    te: { title: 'తెలంగాణలో మొక్కజొన్న సాగు 174% పెరుగుదల', body: 'తెలంగాణలో మొక్కజొన్న సాగు రబీ సీజన్‌లో 7.25 లక్షల ఎకరాల నుండి 11.21 లక్షల ఎకరాలకు పెరిగింది. అయితే రైతులకు MSP రూ. 2,400కు బదులు కేవలం రూ. 1,200-1,600 మాత్రమే లభిస్తోంది.' },
    en: { title: 'Maize Cultivation Surges 174% in Telangana Rabi Season', body: 'Maize acreage in Telangana surged from 7.25 lakh acres to 11.21 lakh acres in a single rabi season. However, farmers receive only Rs 1,200-1,600 per quintal against MSP of Rs 2,400.' },
    author: 'Agriculture Desk', time: '1d ago'
  },
  {
    id: '13', status: 'published', breaking: false,
    category: 'Agriculture', mandal: 'Bodhan', district: 'Nizamabad',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
    te: { title: 'తెలంగాణ పత్తి సాగులో తగ్గుదల: US-భారత్ వాణిజ్య ఒప్పందం భయాలు', body: 'తెలంగాణలో పత్తి సాగు 50 లక్షల ఎకరాల నుండి 44 లక్షల ఎకరాలకు తగ్గింది. US-భారత్ వాణిజ్య ఒప్పందం మొక్కజొన్న రైతులపై ప్రభావం చూపే ప్రమాదం ఉంది.' },
    en: { title: 'Cotton Acreage Falls in Telangana; US-India Trade Deal Concerns Rise', body: 'Cotton acreage in Telangana has been sliding from 50 lakh acres to under 44 lakh acres. A looming US-India trade agreement threatens to undercut maize prices that farmers depend on.' },
    author: 'Agriculture Desk', time: '1d ago'
  },
  {
    id: '14', status: 'published', breaking: false,
    category: 'Education', mandal: 'Aloor', district: 'Nizamabad',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
    te: { title: 'తెలంగాణ పాఠశాలలకు హోలీ సెలవు ప్రకటన', body: 'తెలంగాణ విద్యా క్యాలెండర్ ప్రకారం మార్చి 2026లో హోలీ సందర్భంగా పాఠశాలలకు సెలవు ప్రకటించారు. విద్యార్థులు మరియు ఉపాధ్యాయులకు ఊరట.' },
    en: { title: 'Telangana Schools to Get Holi Holiday in March', body: 'The Telangana academic calendar has confirmed a school holiday for Holi in March 2026, providing a break for students and teachers across all districts.' },
    author: 'Education Desk', time: '2d ago'
  },
  {
    id: '15', status: 'published', breaking: false,
    category: 'Health', mandal: 'Kamareddy', district: 'Kamareddy',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    te: { title: 'కామారెడ్డిలో ఉచిత వైద్య శిబిరం: హైదరాబాద్ స్పెషలిస్ట్ డాక్టర్లు', body: 'కామారెడ్డి జిల్లా ఆసుపత్రిలో 3 రోజుల ఉచిత వైద్య శిబిరం నిర్వహిస్తున్నారు. హైదరాబాద్ నుండి హృద్రోగ, ఎముకల, కంటి నిపుణులు సేవలు అందిస్తున్నారు.' },
    en: { title: 'Free Medical Camp at Kamareddy with Hyderabad Specialists', body: 'A 3-day free medical camp at Kamareddy district hospital featuring specialists from Hyderabad in cardiology, orthopedics, and ophthalmology.' },
    author: 'Health Desk', time: '2d ago'
  },
  {
    id: '16', status: 'published', breaking: false,
    category: 'Entertainment', mandal: 'Balkonda', district: 'Nizamabad',
    img: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&h=400&fit=crop',
    te: { title: 'బాల్కొండలో 3 రోజుల సాంస్కృతిక ఉత్సవం ప్రారంభం', body: 'బాల్కొండ మండలంలో వార్షిక సాంస్కృతిక ఉత్సవం 3 రోజులు జరుగనుంది. జానపద ప్రదర్శనలు, ఆహార స్టాళ్లు, స్థానిక కళాకారుల ప్రదర్శనలు ప్రధాన ఆకర్షణలు.' },
    en: { title: '3-Day Cultural Festival Begins in Balkonda with Folk Performances', body: 'The annual cultural festival in Balkonda mandal kicks off with 3 days of folk performances, food stalls, and local artisan exhibitions. Over 5,000 visitors expected.' },
    author: 'Culture Desk', time: '2d ago'
  },
  {
    id: '17', status: 'published', breaking: false,
    category: 'Sports', mandal: 'Nizamabad', district: 'Nizamabad',
    img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop',
    te: { title: 'నిజామాబాద్ జిల్లా క్రికెట్ టోర్నమెంట్ ఫైనల్స్ ఈ ఆదివారం', body: 'నిజామాబాద్ జిల్లా వార్షిక క్రికెట్ టోర్నమెంట్ ఫైనల్ ఈ ఆదివారం జిల్లా స్టేడియంలో జరగనుంది. 2,000 మంది ప్రేక్షకులు ఆశిస్తున్నారు.' },
    en: { title: 'Nizamabad District Cricket Tournament Finals This Sunday', body: 'The annual Nizamabad district cricket tournament final will be held this Sunday at the district stadium with over 2,000 spectators expected.' },
    author: 'Sports Desk', time: '2d ago'
  },
  {
    id: '18', status: 'published', breaking: false,
    category: 'Technology', mandal: 'Sangareddy', district: 'Sangareddy',
    img: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=600&h=400&fit=crop',
    te: { title: 'సంగారెడ్డిలో 500 ఎకరాల కొత్త పారిశ్రామిక వాడ ప్రకటన', body: 'సంగారెడ్డి జిల్లాలో 500 ఎకరాల్లో కొత్త పారిశ్రామిక వాడ ఏర్పాటు చేయనున్నట్లు ప్రభుత్వం ప్రకటించింది. 10,000 మందికి ఉపాధి కల్పించడం లక్ష్యం.' },
    en: { title: 'New 500-Acre Industrial Park Announced in Sangareddy District', body: 'Government announced a new 500-acre industrial park in Sangareddy district, targeting 10,000 new jobs. Infrastructure development to begin next quarter.' },
    author: 'Business Desk', time: '3d ago'
  },
  {
    id: '19', status: 'published', breaking: false,
    category: 'Health', mandal: 'Warangal', district: 'Warangal',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
    te: { title: 'వరంగల్ MGM ఆసుపత్రికి రూ. 3 కోట్ల కొత్త CT స్కాన్ యంత్రం', body: 'వరంగల్ MGM ఆసుపత్రికి రూ. 3 కోట్ల విలువైన అధునాతన CT స్కాన్ యంత్రం వచ్చింది. ఇప్పుడు రోగులు హైదరాబాద్ వెళ్లాల్సిన అవసరం తగ్గింది.' },
    en: { title: 'Warangal MGM Hospital Gets Rs 3 Crore Advanced CT Scanner', body: 'Warangal MGM Hospital receives a new Rs 3 crore advanced CT scan machine. Patients in the region no longer need to travel to Hyderabad for diagnostic imaging.' },
    author: 'Health Desk', time: '3d ago'
  },
  {
    id: '20', status: 'published', breaking: false,
    category: 'Education', mandal: 'Adilabad', district: 'Adilabad',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
    te: { title: 'ఆదిలాబాద్‌లో 1000 మంది గిరిజన విద్యార్థులకు స్కాలర్‌షిప్‌లు', body: 'ఆదిలాబాద్ జిల్లాలో 1000 మంది గిరిజన విద్యార్థులకు స్కాలర్‌షిప్‌లు మంజూరు చేశారు. ప్రతి విద్యార్థికి సంవత్సరానికి రూ. 25,000 అందిస్తారు.' },
    en: { title: 'Scholarships for 1000 Tribal Students in Adilabad District', body: 'Government sanctions scholarships for 1000 tribal students in Adilabad district. Each student to receive Rs 25,000 annually for higher education pursuits.' },
    author: 'Education Desk', time: '3d ago'
  }
];

export function getArticles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.length > 0 && !parsed[0].district) {
        saveArticles(defaultArticles);
        return defaultArticles;
      }
      return parsed;
    }
  } catch (e) { /* ignore */ }
  saveArticles(defaultArticles);
  return defaultArticles;
}

export function saveArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  window.dispatchEvent(new CustomEvent('mana-news-updated'));
}

export function addArticle(article) {
  const articles = getArticles();
  articles.unshift({ ...article, id: Date.now().toString() });
  saveArticles(articles);
  return articles;
}

export function updateArticle(id, updates) {
  const articles = getArticles().map(a => a.id === id ? { ...a, ...updates } : a);
  saveArticles(articles);
  return articles;
}

export function deleteArticle(id) {
  const articles = getArticles().filter(a => a.id !== id);
  saveArticles(articles);
  return articles;
}

// ─── Google News Auto-Fetch ───
const FETCH_KEY = 'mana-news-last-fetch';
const FETCH_INTERVAL = 60 * 60 * 1000; // 1 hour

const CORS_PROXIES = [
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
];

const RSS_FEEDS = [
  { url: 'https://news.google.com/rss/search?q=Telangana&hl=te&gl=IN&ceid=IN:te', lang: 'te' },
  { url: 'https://news.google.com/rss/search?q=Telangana+news&hl=en-IN&gl=IN&ceid=IN:en', lang: 'en' },
];

const categoryKeywords = {
  Education: ['school', 'college', 'university', 'student', 'exam', 'education', 'scholarship', 'విద్యార్థ', 'పరీక్ష', 'విశ్వవిద్యాల'],
  Technology: ['tech', 'digital', 'ai ', 'software', 'cyber', 'app ', 'startup', 'it ', 'company', 'టెక్నాల', 'పరిశ్రమ'],
  Sports: ['cricket', 'football', 'kabaddi', 'match', 'tournament', 'ipl', 'stadium', 'player', 'క్రికెట్', 'టోర్నమెంట్', 'ఆట'],
  Agriculture: ['farmer', 'crop', 'agriculture', 'rain', 'irrigation', 'paddy', 'cotton', 'రైతు', 'వ్యవసాయ', 'పంట'],
  Health: ['hospital', 'health', 'doctor', 'medical', 'vaccine', 'disease', 'patient', 'ఆసుపత్రి', 'వైద్య', 'ఆరోగ్య'],
  Entertainment: ['movie', 'film', 'tollywood', 'actor', 'song', 'festival', 'సినిమా', 'చిత్ర', 'ఉత్సవ'],
  Politics: ['minister', 'cm ', 'bjp', 'congress', 'brs', 'election', 'vote', 'mla', 'mp ', 'assembly', 'governor', 'cabinet', 'మంత్రి', 'ఎన్నిక', 'సభ', 'ప్రభుత్వ', 'crore', 'కోట్ల', 'investment', 'business', 'market', 'stock', 'వ్యాపార', 'industry'],
};

function guessCategory(text) {
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) return cat;
  }
  return 'Education';
}

function guessDistrict(text) {
  const lower = text.toLowerCase();
  for (const d of districts) {
    if (lower.includes(d.toLowerCase())) return d;
  }
  if (lower.includes('hyderabad') || lower.includes('హైదరాబాద్')) return 'Hyderabad';
  if (lower.includes('warangal') || lower.includes('వరంగల్')) return 'Warangal';
  if (lower.includes('nizamabad') || lower.includes('నిజామాబాద్')) return 'Nizamabad';
  if (lower.includes('karimnagar') || lower.includes('కరీంనగర్')) return 'Karimnagar';
  if (lower.includes('khammam') || lower.includes('ఖమ్మం')) return 'Khammam';
  return districts[Math.floor(Math.random() * districts.length)];
}

function guessMandal(district) {
  const districtMandals = mandals.filter(m => m.toLowerCase().includes(district.toLowerCase().split(' ')[0]));
  return districtMandals.length > 0 ? districtMandals[0] : mandals[Math.floor(Math.random() * mandals.length)];
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function parseRSS(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');
  const items = doc.querySelectorAll('item');
  const articles = [];
  items.forEach((item, i) => {
    if (i >= 15) return; // max 15 per feed
    const title = item.querySelector('title')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const source = item.querySelector('source')?.textContent || 'Google News';
    // Clean title - Google News appends " - Source Name"
    const cleanTitle = title.replace(/\s*-\s*[^-]+$/, '').trim();
    articles.push({ title: cleanTitle, pubDate, link, source });
  });
  return articles;
}

async function fetchWithProxy(url) {
  for (const makeProxy of CORS_PROXIES) {
    try {
      const resp = await fetch(makeProxy(url), { signal: AbortSignal.timeout(10000) });
      if (resp.ok) return await resp.text();
    } catch (e) { /* try next proxy */ }
  }
  return null;
}

export async function fetchGoogleNews(force = false) {
  // Check if we already fetched recently
  if (!force) {
    const lastFetch = localStorage.getItem(FETCH_KEY);
    if (lastFetch && (Date.now() - parseInt(lastFetch)) < FETCH_INTERVAL) {
      return null; // too soon
    }
  }

  try {
    const allNew = [];

    for (const feed of RSS_FEEDS) {
      const xml = await fetchWithProxy(feed.url);
      if (!xml) continue;
      const parsed = parseRSS(xml);

      for (const item of parsed) {
        const fullText = item.title;
        const cat = guessCategory(fullText);
        const dist = guessDistrict(fullText);
        const mandal = guessMandal(dist);
        const tAgo = timeAgo(item.pubDate);

        // Build article
        const article = {
          id: 'gn_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          status: 'published',
          breaking: false,
          category: cat,
          mandal: mandal,
          district: dist,
          img: `https://picsum.photos/seed/${encodeURIComponent(item.title.slice(0, 20))}/600/400`,
          te: feed.lang === 'te' ? { title: item.title, body: item.title + ' — ' + item.source } : { title: '', body: '' },
          en: feed.lang === 'en' ? { title: item.title, body: item.title + ' — ' + item.source } : { title: '', body: '' },
          author: item.source,
          time: tAgo,
          sourceUrl: item.link,
          autoFetched: true,
        };
        allNew.push(article);
      }
    }

    if (allNew.length > 0) {
      const existing = getArticles();
      // Remove old auto-fetched articles (keep manually added ones)
      const manual = existing.filter(a => !a.autoFetched);
      // Combine: new auto-fetched on top, then manual
      const combined = [...allNew, ...manual];
      saveArticles(combined);
      localStorage.setItem(FETCH_KEY, Date.now().toString());
      return allNew.length;
    }
    return 0;
  } catch (e) {
    console.error('News fetch failed:', e);
    return null;
  }
}

// Start auto-fetch interval
let _fetchInterval = null;
export function startAutoFetch() {
  // Fetch immediately on load
  fetchGoogleNews();
  // Then every hour
  if (_fetchInterval) clearInterval(_fetchInterval);
  _fetchInterval = setInterval(() => fetchGoogleNews(), FETCH_INTERVAL);
}

export function stopAutoFetch() {
  if (_fetchInterval) { clearInterval(_fetchInterval); _fetchInterval = null; }
}
