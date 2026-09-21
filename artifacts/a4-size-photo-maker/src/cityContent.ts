export type CityFAQ = {
  question: string;
  answer: string;
};

export type CityInfo = {
  path: string;
  name: string;
  district: string;
  nearbyCities: { name: string; path: string }[];
  rtoCodes: string;
  pincode: string;
  famousPlaces: string[];
  accent: string;
  variant: 1 | 2 | 3;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  aboutCounty: string[];
  faqItems: CityFAQ[];
};

export const CITY_PAGES: Record<string, CityInfo> = {
  '/kaithal': {
    path: '/kaithal',
    name: 'Kaithal',
    district: 'Kaithal',
    nearbyCities: [
      { name: 'Jind', path: '/jind' },
      { name: 'Karnal', path: '/karnal' },
      { name: 'Kurukshetra', path: '/kurukshetra' },
      { name: 'Pehowa', path: '/pehowa' },
      { name: 'Narwana', path: '/narwana' },
      { name: 'Cheeka', path: '/cheeka' },
    ],
    rtoCodes: 'HR-08 / HR-64',
    pincode: '136027',
    famousPlaces: ['Shri Kali Devi Mandir', 'Kalsora handloom village', 'Kaithal Junction Railway Station', 'Sthulgarh (ancient site)'],
    accent: '#7c5cff',
    variant: 1,
    heroTitle: 'Passport Size & ID Photos in Kaithal — Print an A4 Sheet at Home',
    metaTitle: 'Passport Photo Studio Kaithal | Make & Print A4 ID Photo Sheets at Home',
    metaDescription:
      'Make passport, PAN, voter ID and driving licence photo sheets in Kaithal. 35×45 mm A4 layout, 300 DPI, browser-only. Take the PDF to any Kaithal print shop.',
    aboutCounty: [
      'Kaithal, the district headquarters of north Haryana, sits roughly 90 km north of Rohtak and is connected by the Kaithal–Narwana–Jind highway and the Kaithal Junction railway line. Along with the town of Kaithal, the district covers tehsils and sub-divisions such as Guhla, Kalayat, Fatehpur Pundri and Cheeka.',
      'For residents of Kaithal, getting compliant 35×45 mm passport photos or PAN/voter ID pictures usually means visiting a studio near the main market or the bus stand. A simpler route is to build the sheet at home in a few minutes and print it at the nearest digital print shop near Mini Secretariat, Civil Lines or Railway Road.',
    ],
    faqItems: [
      {
        question: 'Where do passport photo studios charge the most in Kaithal?',
        answer:
          'Studio rates near the Kaithal main market, Civil Lines and the bus stand commonly run from ₹100 to ₹150 for a sheet of passport photos. FitMyPhotoA4 is free — you only pay the print shop for an A4 sheet, which is usually a fraction of a studio sheet.',
      },
      {
        question: 'Where is the nearest Passport Seva Kendra (PSK) from Kaithal?',
        answer:
          'There is no PSK inside Kaithal district. The nearest passport centres are around Ambala and Chandigarh. Book an appointment on passportindia.gov.in, and take printed 35×45 mm photos — the A4 sheet built with FitMyPhotoA4 works well for this.',
      },
      {
        question: 'Which photo size do I need for a Haryana driving licence application in Kaithal?',
        answer:
          'Haryana driving licence applications (Form 9/C) require recent photographs on the form and, in many cases, on the medical certificate. Use the Passport size preset (35×45 mm) or the Custom size option in the maker if the RTO Kaithal (HR-08) office specifies a different measurement at the time of your visit.',
      },
      {
        question: 'Do my photos stay only on my device if I use the Kaithal page?',
        answer:
          'Yes. FitMyPhotoA4 reads the image in your browser and never uploads it to a server. You can refresh, edit and download the finished A4 sheet without any account, in Kaithal or anywhere else.',
      },
    ],
  },
  '/jind': {
    path: '/jind',
    name: 'Jind',
    district: 'Jind',
    nearbyCities: [
      { name: 'Narwana', path: '/narwana' },
      { name: 'Kaithal', path: '/kaithal' },
      { name: 'Panipat', path: '/panipat' },
      { name: 'Safidon', path: '/jind' },
      { name: 'Rohtak', path: '/jind' },
    ],
    rtoCodes: 'HR-31 / HR-56',
    pincode: '126102',
    famousPlaces: ['Jwala Devi Temple', 'Rani Talab', 'Jind Railway Station'],
    accent: '#e8590c',
    variant: 2,
    heroTitle: 'Passport Photo Sheet Maker for Jind — 35×45 mm, Print Local',
    metaTitle: 'Passport Photo in Jind | A4 ID Photo Sheet Maker — Print at Local Shops',
    metaDescription:
      'Make A4 sheets of passport, PAN, voter and licence photos in Jind. Browser-only, no signup, 300 DPI PDF. Print near Jind bus stand, City Gate or any shop.',
    aboutCounty: [
      'Jind is a district headquarters in Haryana located midway between Rohtak and Kaithal, around 125 km north-west of Delhi. The town is a road and rail junction for the Jind–Kaithal, Jind–Panipat and Jind–Rohtak routes, with several small towns such as Narwana, Safidon, Julana and Uchana around it.',
      'Around Jind, passport, PAN and voter ID photo prints are often taken from studios near the market or the bus stand. Most residents now carry the PDF of their A4 photo sheet on a phone and get a single sheet printed — a faster and cheaper option than a full studio sheet.',
    ],
    faqItems: [
      {
        question: 'Can I get a single A4 photo sheet printed in Jind without a studio?',
        answer:
          'Yes. Many digital stores and stationary shops near the Jind bus stand and main bazaar print A4 PDFs directly. Build the sheet with FitMyPhotoA4, save the PDF, carry it on a pen drive or phone, and ask for a 100% scale A4 print.',
      },
      {
        question: 'What size are PAN card photos used by applicants from Jind?',
        answer:
          'PAN card photographs are normally 25×35 mm on a light or white background. FitMyPhotoA4 has a PAN Card preset (25×35 mm) so PAN applicants around Jind can fill an A4 sheet directly.',
      },
      {
        question: 'Is an appointment needed at the nearest passport office from Jind?',
        answer:
          'Yes — passport appointments are booked online on passportindia.gov.in. The commonly used centres near Jind are in Rohtak and Chandigarh regions. Printed 35×45 mm photos in a plain background are the standard requirement.',
      },
      {
        question: 'Are the photos from this tool suitable for Haryana documents?',
        answer:
          'The tool produces measured, print-ready layouts at 300 DPI that work for Aadhaar-adjacent, PAN, voter ID, school and office paperwork. For official passports, visas or permits, always check the receiving authority\'s current photo rules before printing.',
      },
    ],
  },
  '/karnal': {
    path: '/karnal',
    name: 'Karnal',
    district: 'Karnal',
    nearbyCities: [
      { name: 'Panipat', path: '/panipat' },
      { name: 'Kaithal', path: '/kaithal' },
      { name: 'Kurukshetra', path: '/kurukshetra' },
      { name: 'Assandh', path: '/karnal' },
    ],
    rtoCodes: 'HR-05 / HR-45',
    pincode: '132001',
    famousPlaces: ['Karnal Lake', 'Gurdwara Manji Sahib', 'Karnal Junction Railway Station', 'NH-44 (Grand Trunk Road)'],
    accent: '#0ca678',
    variant: 3,
    heroTitle: 'A4 Passport Photo Sheet for Karnal — Make, Save, Print',
    metaTitle: 'Passport Photo Studio Karnal | Instant A4 ID Photo Sheet Maker',
    metaDescription:
      'Karnal passport, PAN and voter photo sheets in 35×45 mm and more. Free browser tool, 300 DPI, no signup. Print at any shop on NH-44 or Karnal market.',
    aboutCounty: [
      'Karnal is an important city of Haryana on National Highway 44 (the old Grand Trunk Road), about 120 km north of Delhi, with Karnal Lake, Gurdwara Manji Sahib and the cantonment and rice-belt markets nearby. The city connects Panipat, Kaithal, Kurukshetra and Ambala by road and rail.',
      'Students, government staff and bank customers in Karnal frequently need passport-spec photos for forms, exams and ID applications. Instead of paying per-copy studio rates near the market, residents of Karnal can now compose their own A4 sheet and print it locally in minutes.',
    ],
    faqItems: [
      {
        question: 'Where can I print my photo sheet in Karnal?',
        answer:
          'Digital print shops around the Karnal bus stand, the main bazaar, and the NH-44 stretch accept PDFs. Keep the scale at 100% (Actual size) in the print dialog so the 35×45 mm rectangle stays correct.',
      },
      {
        question: 'Which photo size is commonly required by banks in Karnal?',
        answer:
          'Bank and KYC forms across Karnal usually demand recent photos in standard sizes such as 2×2 inch (51×51 mm) or passport size. Use the Custom size option in FitMyPhotoA4 to enter the millimetre value printed on the individual form.',
      },
      {
        question: 'Is there a passport office in Karnal?',
        answer:
          'Karnal has passport-seva related applications processed at regional centres; the nearest dedicated Passport Seva Kendra is commonly in Chandigarh or Ambala. Book online and confirm the photo specification at the time of your appointment.',
      },
      {
        question: 'Is this tool safe to use on public Wi-Fi in Karnal?',
        answer:
          'Yes. Photo processing runs entirely in your browser and the image never leaves your device, so public networks at Karnal cafés or cyber cafés do not expose your photo.',
      },
    ],
  },
  '/panipat': {
    path: '/panipat',
    name: 'Panipat',
    district: 'Panipat',
    nearbyCities: [
      { name: 'Karnal', path: '/karnal' },
      { name: 'Jind', path: '/jind' },
      { name: 'Sonipat', path: '/panipat' },
      { name: 'Samalkha', path: '/panipat' },
    ],
    rtoCodes: 'HR-06 / HR-67',
    pincode: '132103',
    famousPlaces: ['Panipat textile & carpet market', 'Battle of Panipat memorial sites', 'Panipat Junction Railway Station', 'NH-44 corridor'],
    accent: '#f76707',
    variant: 1,
    heroTitle: 'Passport & ID Photo Sheets for Panipat — Print at Textile-Market Shops',
    metaTitle: 'Passport Photo in Panipat | A4 ID Photo Sheet Maker (35×45 mm)',
    metaDescription:
      'Create and print passport, PAN, voter and licence photos in Panipat. Free browser tool — 300 DPI A4 sheets. Print near Panipat bus stand, grain market or junction.',
    aboutCounty: [
      'Panipat, a major textile and handloom hub of Haryana on NH-44, lies between Delhi and Karnal, about 90 km north of the capital. The city is connected by Panipat Junction railway and is surrounded by industrial estates famous for carpets, blankets and tufted handloom products.',
      'Workers and traders around Panipat\'s markets often need ID photographs for factory gates, KYC and licence paperwork. With FitMyPhotoA4, an entire A4 sheet of numbered passport photos can be prepared at home and printed at any local store near the bus stand or grain market.',
    ],
    faqItems: [
      {
        question: 'How much do photo studios charge in Panipat vs printing one sheet?',
        answer:
          'Studio sheets in Panipat commonly start near ₹100–₹200. A single A4 print from our tool at a local digital shop usually costs far less, and you can regenerate as many sheets as you need for free.',
      },
      {
        question: 'Does the tool work for factory and KYC ID photos in Panipat?',
        answer:
          'It covers the common sizes: 35×45 mm passport, 25×35 mm PAN, 25×35 mm voter ID and 20×25 mm stamp size, plus Custom size for factory access and KYC forms that print their exact measurement.',
      },
      {
        question: 'Where is the passport centre near Panipat?',
        answer:
          'The closest regular passport facilities are in the Chandigarh and Ambala regions. Confirm your appointment date online, and print photos before travelling so you are not rushed at the centre.',
      },
      {
        question: 'Can I preview my sheet before downloading in Panipat?',
        answer:
          'Yes. The maker shows a live A4 preview with the crop, margins and cutting gap. Adjust and download as PNG or PDF, then print at 100% scale.',
      },
    ],
  },
  '/kurukshetra': {
    path: '/kurukshetra',
    name: 'Kurukshetra',
    district: 'Kurukshetra',
    nearbyCities: [
      { name: 'Pehowa', path: '/pehowa' },
      { name: 'Kaithal', path: '/kaithal' },
      { name: 'Karnal', path: '/karnal' },
      { name: 'Ambala', path: '/kurukshetra' },
    ],
    rtoCodes: 'HR-07 / HR-65',
    pincode: '136118',
    famousPlaces: ['Brahma Sarovar', 'Sannihit Sarovar', 'Jyotisar (birthplace of the Bhagavad Gita)', 'Kurukshetra Panorama & Science Centre'],
    accent: '#e03131',
    variant: 2,
    heroTitle: 'Passport Photo Sheet Maker for Kurukshetra & Thanesar',
    metaTitle: 'Passport Photo Kurukshetra | Free A4 ID Photo Sheet Maker',
    metaDescription:
      'Passport, PAN, voter and licence photo sheets for Kurukshetra and Thanesar. Browser-only tool, 300 DPI prints. Print near Brahma Sarovar, bus stand or railway road.',
    aboutCounty: [
      'Kurukshetra is a pilgrimage and tourism district of Haryana around Thanesar, home to Brahma Sarovar, Sannihit Sarovar, Jyotisar and the Kurukshetra Panorama. It connects Ambala, Karnal, Kaithal and Pehowa by road, and Pehowa town in the district is itself a Saraswati-bank pilgrimage site.',
      'Pilgrims and visitors in Kurukshetra often require photos for yatra passes, hotels, temple trust forms and ID documents. Preparing an A4 sheet before the visit with FitMyPhotoA4 saves the last-minute search for a studio near the sarovars.',
    ],
    faqItems: [
      {
        question: 'What sizes does the Kurukshetra page support?',
        answer:
          'Presets of 35×45 mm (passport), 25×35 mm (PAN), 25×35 mm (voter) and 20×25 mm (stamp), plus a millimetre Custom size for yatra, hotel and office forms that print their exact requirement.',
      },
      {
        question: 'Where can pilgrims get a photo sheet printed in Kurukshetra?',
        answer:
          'Print shops near the Kurukshetra bus stand, Thanesar market and around Brahma Sarovar accept A4 PDFs. Ask for Actual size / 100% scale printing so the millimetre dimensions remain exact.',
      },
      {
        question: 'Is the nearest passport office far from Kurukshetra?',
        answer:
          'Passport appointments for this region are usually booked at the Chandigarh or Ambala centres. Prepare your 35×45 mm photos with FitMyPhotoA4 and collect them well before the appointment date.',
      },
      {
        question: 'Does the maker keep copies of my photo?',
        answer:
          'No. All processing happens locally in your browser; nothing is uploaded or stored, which is convenient if you are using a shared device at a cyber café in Kurukshetra.',
      },
    ],
  },
  '/narwana': {
    path: '/narwana',
    name: 'Narwana',
    district: 'Jind',
    nearbyCities: [
      { name: 'Jind', path: '/jind' },
      { name: 'Kaithal', path: '/kaithal' },
      { name: 'Safidon', path: '/jind' },
      { name: 'Barwala', path: '/narwana' },
    ],
    rtoCodes: 'HR-32',
    pincode: '126116',
    famousPlaces: ['Narwana Junction Railway Station', 'Gur (jaggery) market area', 'Jind–Kaithal highway corridor'],
    accent: '#f08c00',
    variant: 3,
    heroTitle: 'A4 Passport Photo Sheets for Narwana (Jind District)',
    metaTitle: 'Passport Photo in Narwana | A4 ID Photo Sheet Maker — Jind District',
    metaDescription:
      'Make passport, PAN, voter and licence photo sheets in Narwana, Jind district. Free browser tool, 300 DPI. Print near Narwana junction, bus stand or grain market.',
    aboutCounty: [
      'Narwana is a growing town and railway junction in Jind district of Haryana, on the Kaithal–Jind road with strong agricultural mandi activity. Its junction station connects Kaithal, Jind, Hisar and Rohtak routes, making it a common transport point for north Haryana.',
      'Residents of Narwana and nearby villages often commute for paperwork to Jind or Kaithal. Creating passport-size photo sheets at home before such trips, then printing them locally, saves both time and studio charges near the junction.',
    ],
    faqItems: [
      {
        question: 'Do photographers in Narwana print A4 photo sheets from a PDF?',
        answer:
          'Most digital print shops near Narwana junction and the mandi accept PDFs. Hand them the FitMyPhotoA4 PDF and ask for A4, portrait, 100% scale — the same as at any Haryana town.',
      },
      {
        question: 'Which photo size do school forms in Narwana need?',
        answer:
          'School and admission forms around Narwana commonly ask for stamp size (20×25 mm) or passport size (35×45 mm). FitMyPhotoA4 covers both presets with an adjustable gap for easy cutting.',
      },
      {
        question: 'Where is the passport centre nearest to Narwana?',
        answer:
          'The usual centres for this region are Rohtak and Chandigarh. Book on passportindia.gov.in and carry photos that match the current 35×45 mm passport-spec requirements.',
      },
      {
        question: 'Can I print more than one size on a single sheet in Narwana?',
        answer:
          'The free tool is designed around repeated copies of one size per A4 sheet for clean cutting. For mixed sizes, use the Custom size setting and build separate sheets.',
      },
    ],
  },
  '/pehowa': {
    path: '/pehowa',
    name: 'Pehowa',
    district: 'Kurukshetra',
    nearbyCities: [
      { name: 'Kurukshetra', path: '/kurukshetra' },
      { name: 'Kaithal', path: '/kaithal' },
      { name: 'Cheeka', path: '/cheeka' },
      { name: 'Ambala', path: '/kurukshetra' },
    ],
    rtoCodes: 'HR-41',
    pincode: '136128',
    famousPlaces: ['Saraswati-bank pilgrimage ghats', 'Pehowa Temple complex', 'Pehowa Railway Station'],
    accent: '#6741d9',
    variant: 1,
    heroTitle: 'Passport & ID Photo Sheets for Pehowa (Kurukshetra District)',
    metaTitle: 'Passport Photo in Pehowa | A4 ID Photo Sheet Maker — Kurukshetra Dist.',
    metaDescription:
      'Create passport, PAN, voter and licence photo sheets in Pehowa, Kurukshetra district. Free, 300 DPI, no upload. Print near Pehowa bus stand or market.',
    aboutCounty: [
      'Pehowa is a pilgrimage town of Kurukshetra district on the banks of the Saraswati, about 40 km from Kurukshetra city and close to the Kaithal border. It is reached by the Pehowa–Kaithal and Pehowa–Kurukshetra roads and has its own railway halt.',
      'During yatra seasons, visitors in Pehowa need ID photographs for trust forms, hotels and passes. Rather than queuing at a studio near the temple complex, a pre-built A4 sheet printed locally covers every copy size needed.',
    ],
    faqItems: [
      {
        question: 'Are passport photos required for yatra forms in Pehowa?',
        answer:
          'Many temple trust, hotel and dharamshala registration forms in Pehowa ask for a recent photograph, typically passport or stamp size. FitMyPhotoA4 covers both and lets pilgrims print a fresh sheet at any nearby digital shop.',
      },
      {
        question: 'What is the nearest railway station for a Pehowa visit?',
        answer:
          'Pehowa has a small railway halt; the bigger junction stations are Kurukshetra and Kaithal. If you are travelling to a passport centre, plan for Ambala or Chandigarh and carry 35×45 mm printed photos.',
      },
      {
        question: 'Do I need an account to use this tool in Pehowa?',
        answer:
          'No signup, upload or account is needed. The tool works entirely in the browser, which is ideal on shared devices available at cyber cafés in Pehowa.',
      },
      {
        question: 'Can the sheet include cutting marks for Pehowa print shops?',
        answer:
          'Yes — the layout leaves a configurable gap between copies, giving clear cutting guidance on the printed A4 sheet.',
      },
    ],
  },
  '/cheeka': {
    path: '/cheeka',
    name: 'Cheeka',
    district: 'Kaithal',
    nearbyCities: [
      { name: 'Kaithal', path: '/kaithal' },
      { name: 'Pehowa', path: '/pehowa' },
      { name: 'Guhla', path: '/kaithal' },
      { name: 'Kurukshetra', path: '/kurukshetra' },
    ],
    rtoCodes: 'HR-08 (SDO Cheeka)',
    pincode: '136034',
    famousPlaces: ['Cheeka market town', 'Cheeka Railway Station', 'Agri & sugar belt of Kaithal district'],
    accent: '#2b8a3e',
    variant: 3,
    heroTitle: 'Passport & ID Photo Sheets for Cheeka (Kaithal District)',
    metaTitle: 'Passport Photo in Cheeka | A4 ID Photo Sheet Maker — Kaithal District',
    metaDescription:
      'Create passport, PAN, voter and licence photo sheets in Cheeka, Kaithal district. Free browser tool, no upload. Print near Cheeka bus stand, market or railway halt.',
    aboutCounty: [
      'Cheeka is a sub-division town of Kaithal district in north Haryana, on the road between Kaithal and Pehowa with its own railway halt. The town is a market centre for the surrounding sugar, wheat and cotton belt.',
      'For families in Cheeka and the nearby villages, a trip to Kaithal for photo purposes is common. With FitMyPhotoA4, sheets can be made at home and printed at a local store in Cheeka itself, saving a trip and reducing costs.',
    ],
    faqItems: [
      {
        question: 'Can I get printed passport photos in Cheeka itself?',
        answer:
          'Yes — print shops and photocopy stores near the Cheeka market accept standard A4 PDF sheets. Prepare the sheet with FitMyPhotoA4 and ask for Actual size printing.',
      },
      {
        question: 'Which photo size is needed around Cheeka for KYC?',
        answer:
          'PAN, voter ID and bank KYC work usually takes 25×35 mm; passport applications take 35×45 mm. Both are presets in the maker, or use Custom size when a form prints its own measurement.',
      },
      {
        question: 'Where does a Cheeka resident go for passport applications?',
        answer:
          'Passport appointments for this area are typically at the Chandigarh or Ambala centres, reachable by road from Cheeka via top-of-district routes. Prepare photos well in advance with the tool.',
      },
      {
        question: 'Is the tool usable offline in Cheeka?',
        answer:
          'After the page loads, photo processing happens in the browser. Internet is only needed for the initial page load, so the tool remains practical on slow village connections.',
      },
    ],
  },
};

export const CITY_LINKS = Object.values(CITY_PAGES).map((c) => ({ name: c.name, path: c.path }));