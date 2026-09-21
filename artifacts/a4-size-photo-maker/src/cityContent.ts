export type CityFAQ = {
  question: string;
  answer: string;
};

export type CitySection = {
  heading: string;
  paragraphs: string[];
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
  intro: string;
  keywords: string[];
  sections: CitySection[];
  localTip: string;
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
    heroTitle: 'Passport Size Photos in Kaithal — Build & Print an A4 Sheet from Home',
    metaTitle: 'Passport Photo Studio Kaithal | Make A4 ID Photo Sheets at Home (HR-08)',
    metaDescription:
      'Passport size photo in Kaithal made at home — 35×45 mm A4 sheets, PAN 25×35, voter photo. Print near Mini Secretariat, Civil Lines or Railway Road. No signup.',
    intro:
      'From Kaithal, the nearest Passport Seva Kendra sits in the Ambala–Chandigarh region — which is exactly why people across Kaithal district now prepare a full A4 sheet of 35×45 mm passport photos at home and only pay for a single print near the Mini Secretariat, Civil Lines, Railway Road or the bus stand.',
    keywords: [
      'passport size photo in Kaithal',
      'passport photo studio near Kaithal bus stand',
      'passport photo print at Civil Lines Kaithal',
      '35×45 mm A4 photo sheet Kaithal',
      'PAN photo 25×35 mm Haryana',
      'voter ID photo print Kaithal',
      'nearest Passport Seva Kendra from Kaithal',
      'photo print shop Railway Road Kaithal',
    ],
    sections: [
      {
        heading: 'Photo errands in Kaithal — from PSK appointments to RTO HR-08 work',
        paragraphs: [
          'Kaithal households file passport photos for PSK appointments at Ambala or Chandigarh, attach stamp-size pictures with school admission forms in Kalayat and Fatehpur Pundri, and carry photo prints for bank KYC in the main market. RTO Kaithal (HR-08) paperwork for driving licences and vehicle transfers routinely asks for fresh photographs on the form and medical affidavit.',
          'The quiet pattern is the same everywhere: people from Guhla, Cheeka and the yatra side of the district come into town for one photograph — and come back again because the studio printer jammed or the sizes were wrong. A measured A4 sheet, built before you leave home, removes that second trip entirely.',
        ],
      },
      {
        heading: 'Where Kaithal photo studios sit — and the print-shop short cut',
        paragraphs: [
          'Traditional photo studios in Kaithal cluster near the Mini Secretariat, Civil Lines, Railway Road and the bus stand, with most charging ₹100–₹300 per sheet of passport-size photos. During Aadhaar camps and wedding season the counters swell and turnaround stretches to an hour or more.',
          'The practical short cut is to build the sheet yourself and print it at any of the digital print shops on Railway Road or opposite the bus stand — most accept a PDF from a pen drive or phone. Search behaviour in this town already follows those lines: "passport photo print in Kaithal", "photo studio near Kaithal bus stand" and "A4 photo sheet Rate ki shop".',
        ],
      },
      {
        heading: 'The A4 sheet method Kaithal families now prefer',
        paragraphs: [
          'FitMyPhotoA4 is built for that exact habit. Choose Passport (35×45 mm), PAN Card (25×35 mm), Voter ID (25×35 mm), Stamp (20×25 mm) or type a Custom size from the form, upload a well-lit photo from your phone, and the tool lays out a full A4 sheet with margins and a cutting gap on your screen.',
          'Download as PNG or PDF, carry it to a print shop near Kaithal Junction or the bus stand, and ask for <em>Actual size / 100% scale</em> printing. The photograph never leaves your browser, so you can re-print as many sheets as you need without paying a Paisa to a studio again.',
        ],
      },
    ],
    localTip:
      'At the shop near Mini Secretariat or Civil Lines, say the magic line: "A4, portrait, 100% scale print" — then your 35×45 mm photos stay exactly 35×45 mm on paper.',
    faqItems: [
      {
        question: 'Where do passport photo studios charge the most in Kaithal?',
        answer:
          'Studio rates near the Kaithal main market, Civil Lines and the bus stand commonly run from ₹100 to ₹300 for a sheet of passport photos. FitMyPhotoA4 is free — you only pay a local print shop for a single A4 sheet, which is a fraction of a studio sheet.',
      },
      {
        question: 'Where is the nearest Passport Seva Kendra (PSK) from Kaithal?',
        answer:
          'There is no PSK inside Kaithal district. The nearest passport centres are around Ambala and Chandigarh. Book an appointment on passportindia.gov.in, and carry printed 35×45 mm photos — the A4 sheet built with FitMyPhotoA4 works well for this.',
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
      { name: 'Assandh', path: '/karnal' },
      { name: 'Rohtak', path: '/jind' },
    ],
    rtoCodes: 'HR-31 / HR-56',
    pincode: '126102',
    famousPlaces: ['Jwala Devi Temple', 'Rani Talab', 'Jind Railway Station', 'City Gate market'],
    accent: '#e8590c',
    variant: 2,
    heroTitle: 'Passport Photo Jind — Free A4 Sheet, Print at City Gate or Bus Stand',
    metaTitle: 'Passport Photo in Jind | A4 ID Photo Sheet Maker — Print near City Gate',
    metaDescription:
      'Passport photo in Jind? Make 35×45 mm A4 sheets free, no signup. Print near Jind bus stand, City Gate or any shop. Works for PAN, voter ID and RTO HR-31 forms.',
    intro:
      'Jind is a road-and-rail junction town between Rohtak, Panipat and Kaithal, and its photo plaints mirror that crossroads life — PSK appointments go to Rohtak or Chandigarh, licence photos run the HR-31 office, and extra copies are forever needed for school and bank forms. Preparing the whole A4 sheet at home first takes the crunch out of every one of those errands.',
    keywords: [
      'passport photo in Jind',
      'passport photo studio near Jind bus stand',
      'photo print near City Gate Jind',
      'A4 photo sheet print Jind',
      'PAN photo size for Jind residents',
      'RTO Jind HR-31 licence photo',
      'nearest passport centre from Jind',
      'stamp size photo Jind school admission',
    ],
    sections: [
      {
        heading: 'Where Jind paperwork sends you — PSK, RTO HR-31 and the banks',
        paragraphs: [
          'Government and bank errands pull Jind residents in several directions: passport applications are booked for Rohtak or Chandigarh, licence and vehicle files are handled at RTO Jind (HR-31), and KYC at the bank branches near City Gate wants two fresh photographs every few years. Each trip carries its own "photo size" argument.',
          'Because Narwana, Safidon, Julana and Uchana bottles funnel through Jind town for these visits, making the sheet at home first means the family in Jind — and every village around it — hands a single correct print to the office instead of surrendering to studio wait times.',
        ],
      },
      {
        heading: 'Jind print points — from the bus stand lanes to City Gate',
        paragraphs: [
          'Old-school studios in Jind sit along the bus stand approaches, near the railway station and around City Gate, asking ₹100–₹200 for a filled sheet. Around examination weeks and at admission-reopening time the counters are routinely busy for two to three hours.',
          'Most of those same lanes now hold digital print shops that take an A4 PDF and deliver in minutes. Build your sheet with FitMyPhotoA4, slide the file across on a pen drive, and your "passport photo in Jind" order is done for the price of one sheet of paper and ink.',
        ],
      },
      {
        heading: 'Sizes that actually turn up on Jind desks',
        paragraphs: [
          'The forms circulating in Jind are honest about their sizes: passport applications want 35×45 mm, PAN Card and voter ID files want 25×35 mm, and small admissions forms want 20×25 mm. When a form prints its own millimetre box — some RTO HR-31 paperwork does — the Custom size option handles it.',
          'FitMyPhotoA4 arranges one size across a real A4 sheet with margins and a gap for cutting, so a single visit to the print shop near City Gate or the bus stand delivers every copy the form asked for, in the exact measurement printed on it.',
        ],
      },
    ],
    localTip:
      'At any shop near Jind bus stand or City Gate, hand over the pen drive and ask: "A4, portrait, Actual size" — the sheet prints exactly as measured.',
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
          'Yes — passport appointments are booked online on passportindia.gov.in. The commonly used centres near Jind are in Rohtak and Chandigarh regions. Printed 35×45 mm photos with a plain background are the standard requirement.',
      },
      {
        question: 'Are the photos from this tool suitable for Haryana documents?',
        answer:
          'The tool produces measured, print-ready layouts at 300 DPI that work for PAN, voter ID, school and office paperwork across Haryana. For official passports, visas or permits, always check the receiving authority\'s current photo rules before printing.',
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
    heroTitle: 'Passport Photo Sheet Maker for Karnal — 35×45 mm, Print Local on NH-44',
    metaTitle: 'Passport Photo Karnal | A4 ID Photo Sheet Maker — Onetime Free',
    metaDescription:
      'Passport photo in Karnal without a studio visit — 35×45 mm A4 sheets, 25×35 PAN, voter and licence sizes. Print near Karnal bus stand, GT Road or lake market. Free.',
    intro:
      'Karnal runs on the NH-44 corridor, and a surprising share of its offices — banks near the GT Road stretch, schools around the lake market, firms along the cantonment road — want photographs in sizes they keep changing. Skipping the studio and laying out a measured A4 sheet at home, then printing it in the bazaar, has quietly become the fastest routine in town.',
    keywords: [
      'passport photo in Karnal',
      'passport size photo sheet maker',
      'photo studio near Karnal bus stand',
      'A4 photo print Karnal NH-44',
      'PAN photo size HR-05',
      'bank KYC photo Karnal lake market',
      'nearest passport office from Karnal',
      'custom size photo sheet Haryana',
    ],
    sections: [
      {
        heading: 'Karnal\'s photo workloads — banking, jobs and NH-44 offices',
        paragraphs: [
          'Karnal\'s employment belt — the grain mandi, cooperatives, cantonment-adjacent firms and coaching centres on the GT Road — churns through ID photographs faster than most Haryana districts. RTO Karnal (HR-05) licence files, bank KYC at the main bazaar branches and exam forms at the coaching hubs each carry their own size note.',
          'The city\'s location between Panipat and Kurukshetra also makes it a small travel hub: applicants from the Assandh side and the Yamunanagar border run their PSK errands towards Ambala or Chandigarh through Karnal, and a correctly built photo sheet travels with them instead of a rushed studio stop.',
        ],
      },
      {
        heading: 'Where Karnal prints photos — bus stand, old bazaar and the lake road',
        paragraphs: [
          'Studios span the bus stand lanes, the old bazaar near Karnal Junction and the shop rows on the lake road, with a sheet typically costing ₹150–₹300 and the wait stretching at admission time.',
          'The newer digital shops on the same streets accept A4 PDFs directly. So your flow becomes: build the sheet at home, hand it to the counter near the bus stand, and step out with numbered, correctly sized prints in the time it takes to fill a form. That is the "passport photo in Karnal" experience people actually want — no studio, no marker-pen sizes, no second visit.',
        ],
      },
      {
        heading: 'The measured-sheet habit spreading through Karnal',
        paragraphs: [
          'FitMyPhotoA4 keeps the procedure honest: pick Passport 35×45, PAN 25×35, Voter 25×35 or Stamp 20×25, or enter the exact millimetres written on the Karnal form in front of you. The preview shows the true A4 layout with margins and a cutting gap before you download.',
          'Everything runs in your browser on a phone — convenient at a café, cyber café or at home near the lake — and nothing is uploaded. Karnal\'s families now print fresh sheets for every office errand and keep the PDF for the next one.',
        ],
      },
    ],
    localTip:
      'For NH-44 errands, keep the PDF on your phone and show it at any shop near the bus stand — "A4 portrait, 100% scale" and the sheet is perfect.',
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
          'Karnal passport work is processed at regional centres; the nearest dedicated Passport Seva Kendra is commonly in Chandigarh or Ambala. Book online and confirm the photo specification at the time of your appointment.',
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
      { name: 'Samalkha', path: '/panipat' },
      { name: 'Sonipat', path: '/panipat' },
    ],
    rtoCodes: 'HR-06 / HR-67',
    pincode: '132103',
    famousPlaces: ['Panipat textile & carpet market', 'Battle of Panipat memorial sites', 'Panipat Junction Railway Station', 'NH-44 corridor'],
    accent: '#f76707',
    variant: 1,
    heroTitle: 'Panipat Passport & ID Photo Sheets — Print Near the Textile Market',
    metaTitle: 'Passport Photo in Panipat | Free A4 ID Photo Sheet Maker (35×45 mm)',
    metaDescription:
      'Passport photo in Panipat from home — A4 sheets for factory IDs, PAN, voter and licence. Print near Panipat bus stand, grain market or junction. No upload, free.',
    intro:
      'Panipat is a factory town on NH-44, and factory gate passes, KYC papers, trade register files and RTO HR-06 licence forms all summon photographs at different sizes. Building the sheet at home and printing it in the bazaar — near the bus stand, grain market or the textile-market lanes — is the habit Panipat\'s working families now reach for without a studio detour.',
    keywords: [
      'passport photo in Panipat',
      'photo print shop near Panipat grain market',
      'factory ID photo size Panipat',
      'passport size photo sheet A4',
      'PAN card photo size Panipat',
      'RTO Panipat HR-06 licence photo',
      'nearest passport office from Panipat',
      'custom size photo sheet Panipat',
    ],
    sections: [
      {
        heading: 'ID photos in Panipat\'s mill town rhythm',
        paragraphs: [
          'Textile units, handloom clusters and roadside factories on the Panipat–Samalkha stretch issue gate passes, contractor cards and insurance files that want photographs replaced on a cycle. Traders in the grain market and carpet dealers near the old city keep shop-register photos, and RTO Panipat (HR-06) licence files ask for fresh prints whenever papers are lodged.',
          'Because work shifts rarely wait for a studio, Panipat\'s fix is to mass-produce a sheet at home: every gate pass, KYC form and licence file pulls from the same correctly sized A4 print, cut to size with scissors at the desk.',
        ],
      },
      {
        heading: 'Where Panipat counter prints live — bus stand, grain market and junction roads',
        paragraphs: [
          'Classic studios ring the bus stand and the Panipat Junction roads, asking ₹100–₹250 per sheet, with the crowd peaking near Aadhaar camp dates and at admission time. The digital print shops woven into the grain market and textile lanes will happily take a prepared A4 PDF.',
          'So the efficient loop is: open FitMyPhotoA4, choose the size written on your form (Passport 35×45, PAN 25×35, Voter 25×35, Stamp 20×25, or Custom), download the sheet, and get it printed near the arm between the bus stand and the bazaar. Ten minutes, one sheet, every copy done — the way "passport photo in Panipat" should work.',
        ],
      },
      {
        heading: 'Making Panipat\'s mixed sizes in one sitting',
        paragraphs: [
          'The trick Panipat users like is the Custom size box: when a factory form prints 33×45 or a licence form prints its own figure, they type those exact millimetres instead of guessing from a studio\'s angry chart.',
          'The layout steers with millimetre margins and a cutting gap on a true A4 plan, downloadable as PNG or PDF at 300 DPI for clean home printing or shop printing. And since the image stays in the browser, factory workers in Panipat re-print a fresh sheet every cycle without paying anyone again.',
        ],
      },
    ],
    localTip:
      'Grain-market shops are quickest: walk in with the PDF on your phone, say "A4, portrait, 100% scale", and pick up your cut sheet within minutes.',
    faqItems: [
      {
        question: 'How much do photo studios charge in Panipat vs printing one sheet?',
        answer:
          'Studio sheets in Panipat commonly start near ₹100–₹300. A single A4 print from our tool at a local digital shop usually costs far less, and you can regenerate as many sheets as you need for free.',
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
    heroTitle: 'Passport Photo Kurukshetra & Thanesar — A4 Sheet for Yatra & Office',
    metaTitle: 'Passport Photo Kurukshetra | A4 ID Photo Sheet Maker (Thanesar HR-07)',
    metaDescription:
      'Passport photo in Kurukshetra without a studio — Free A4 sheets, 35×45 mm, 25×35 PAN/voter, Yatra and hotel forms. Print near Brahma Sarovar, bus stand or Thanesar.',
    intro:
      'Kurukshetra\'s photo needs split in two directions: pilgrims around Brahma Sarovar, Sannihit Sarovar and Jyotisar quietly need pictures for yatra passes, hotel desks and trust forms, while the town\'s schools, RTO HR-07/Thanesar office and bank counters need their routine prints. Both crowds now carry a home-made A4 sheet instead of standing around the sarovar-edge studios.',
    keywords: [
      'passport photo in Kurukshetra',
      'passport size photo for yatra pass',
      'photo print near Brahma Sarovar',
      'A4 photo sheet Thanesar',
      'PAN photo 25×35 Kurukshetra',
      'RTO Kurukshetra HR-07 photo',
      'hotel form photo size India',
      'stamp photo temple trust form',
    ],
    sections: [
      {
        heading: 'Two kinds of photo errands in Kurukshetra town',
        paragraphs: [
          'One is the pilgrimage economy — temple trust forms, dharamshala registers, hotel registration desks and yatra passes around the sarovars take a photograph in no fixed standard, so a sheet that lets you cut any size is worth its weight. The other is the everyday office economy — RTO Kurukshetra (HR-07, Thanesar), school admissions near the Panorama, and PSK runs towards Ambala or Chandigarh that want disciplined 35×45 mm prints.',
          'Both circles meet in a single habit: layout the sheet at home, cut from one A4, and stop paying for studio "special" sheets at every dharamshala and counter in Kurukshetra.',
        ],
      },
      {
        heading: 'Printing near the sarovars — and the bus stand row',
        paragraphs: [
          'Studios gather near the Kurukshetra bus stand, the Thanesar bazaar and along the roads to Brahma Sarovar, pricing a sheet from ₹100 to ₹250. At yatra weekends that price triples and the queue runs across the pavement — the worst moment to be searching for "passport photo near Brahma Sarovar".',
          'Prepared visitors skip it: one A4 sheet built before the journey, printed at the first digital shop on the bus-stand row, and every yatra, hotel and temple form is covered at a glance.',
        ],
      },
      {
        heading: 'The sheet that serves pilgrims and panchayat forms alike',
        paragraphs: [
          'FitMyPhotoA4 covers the sizes shown on these papers — 35×45 mm for passport work and big forms, 25×35 mm for PAN and voter files, 20×25 mm stamp for trust and admission forms — plugs a Custom value when a hotel sheet prints its own box, and draws the A4 plan with margins and a cutting gap.',
          'Local processing means a phone at the ghat works as well as a computer, nothing is uploaded for a cyber-café clerk to see, and the same PDF covers the whole season\'s forms. That is the Kurukshetra habit now: one sheet, many forms, zero studio stress.',
        ],
      },
    ],
    localTip:
      'Print at a shop on the Thanesar bus-stand row before entering the sarovar area — "A4, Actual size" and you\'re done in minutes.',
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
      { name: 'Safidon', path: '/narwana' },
      { name: 'Barwala', path: '/narwana' },
      { name: 'Hansi', path: '/narwana' },
    ],
    rtoCodes: 'HR-32',
    pincode: '126116',
    famousPlaces: ['Narwana Junction Railway Station', 'Gur (jaggery) mandi', 'Jind–Kaithal highway corridor'],
    accent: '#f08c00',
    variant: 3,
    heroTitle: 'Passport Photo Sheets for Narwana — Jind District, Print at the Mandi',
    metaTitle: 'Passport Photo in Narwana | Free A4 Sheet Maker — Jind District HR-32',
    metaDescription:
      'Passport photo in Narwana from home — 35×45 mm A4 sheets, PAN 25×35, voter & licence. Print near the junction, bus stand or mandi. No signup, browser only.',
    intro:
      'Narwana is the town people from Barwala, Safidon and the Kaithal border villages pass through on their way to Jind or Hisar for paperwork. Because there is always a form waiting at the far end of that trip — an HR-32 licence file, a PSK photo for Rohtak, a school admission in town — the reliable move is to build the sheet before boarding the bus.',
    keywords: [
      'passport photo in Narwana',
      'photo print near Narwana junction',
      'A4 photo sheet Jind district',
      'gate pass photo size Narwana',
      'PAN photo 25×35 for HR-32',
      'nearest passport centre from Narwana',
      'school admission stamp photo',
      'photo studio near Narwana mandi',
    ],
    sections: [
      {
        heading: 'Narwana\'s paperwork culture — built around the junction',
        paragraphs: [
          'Narwana Junction serves Kaithal-, Jind-, Hisar- and Rohtak-bound routes, so the town\'s photo needs travel with its passengers: RTO files for HR-32 run through Jind, PSK appointments are chased to Rohtak or Chandigarh, and village school admissions land on desks in Narwana itself.',
          'The same passengers now travel lighter — a PDF on the phone, not a brittle studio envelope. Build the sheet at home, print a copy near the junction or the mandi, and every counter on the route receives the size printed on its own form.',
        ],
      },
      {
        heading: 'Print points in Narwana — mandi, junction and the bus stand',
        paragraphs: [
          'Studios circle the bus stand and the junction roads with a standard ₹100–₹200 sheet, and the gur mandi lane holds several shops that print A4 PDFs in minutes. Compared with a full day lost to a Jind or Kaithal studio trip, that counter stop is the whole difference.',
          'Searching "passport photo in Narwana" or "photo studio near Narwana mandi" usually surfaces those same lanes — carry your finished sheet file and you will never wait in them again.',
        ],
      },
      {
        heading: 'The sizes Narwana forms actually ask for',
        paragraphs: [
          'Licence forms from the HR-32 corridor, PAN and voter work at 25×35 mm, passport-bound photos at 35×45 mm, and stamp-size 20×25 mm for the admission season — FitMyPhotoA4 keeps all four presets plus a Custom millimetre box for whatever a Barwala or Safidon school prints on its own sheet.',
          'The preview draws the full A4 layout with margins and a cutting gap, download lands as PNG or PDF at 300 DPI, and the whole thing runs offline-friendly in the browser so a single sheet covers the whole family\'s errand run.',
        ],
      },
    ],
    localTip:
      'Take the PDF to the mandi-lane shop closest to the bus stand — "A4, portrait, Actual size" is all they need to hear.',
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
    famousPlaces: ['Saraswati-bank pilgrimage ghats', 'Pehowa temple complex', 'Pehowa Railway Station'],
    accent: '#6741d9',
    variant: 1,
    heroTitle: 'Pehowa Passport & Yatra Photo Sheets — Print Near the Temple Complex',
    metaTitle: 'Passport Photo in Pehowa | A4 Sheet Maker — Kurukshetra District HR-41',
    metaDescription:
      'Passport photo in Pehowa and yatra-pass photos in one A4 sheet — 35×45, 25×35, 20×25 mm. Print near Pehowa bus stand or the temple complex. Free, no upload.',
    intro:
      'Pehowa opens its gates to pilgrims on the Saraswati bank, and the yatra economy asks for photographs everywhere — trust forms, dharamshala registers, hotel desks. Kit the town\'s own RTO HR-41 and Kurukshetra-bound errands, and the one habit that covers both is building the sheet at home before the visit.',
    keywords: [
      'passport photo in Pehowa',
      'yatra pass photo size Pehowa',
      'photo print near Pehowa temple',
      'A4 photo sheet Kurukshetra district',
      'PAN photo 25×35 HR-41',
      'hotel register photo for pilgrims',
      'nearest passport centre from Pehowa',
      'stamp size photo dharamshala form',
    ],
    sections: [
      {
        heading: 'Pehowa\'s two photo stories — ghat and government',
        paragraphs: [
          'Pehowa\'s pilgrims come for the Saraswati ghats, and the town\'s offices run on the same paperwork as the rest of Kurukshetra district: RTO Pehowa (HR-41) sub-registry files, school admissions in the bazaar, and PSK journeys toward Ambala or Chandigarh that want clean 35×45 mm prints.',
          'One A4 sheet built at home serves both audiences. The yatra visitor folds it into a palm-sized envelope; the student\'s family cuts stamp-size squares for an admission form the same evening — and no one pays the temple-road studios their festival-hour rates.',
        ],
      },
      {
        heading: 'Where Pehowa prints photos — temple complex, bus stand, railway halt',
        paragraphs: [
          'Studio counters near the temple complex and the bus stand price a sheet at ₹100–₹250, hiking to double through yatra weeks. Alongside them, the photocopy shops of Pehowa\'s single main lane print A4 PDFs as-is.',
          'So the sight-saver is: open FitMyPhotoA4 on the phone before arriving, pick the size from your form (or Custom for whatever box a hotel prints), download the sheet, and complete it at the first counter on the bus-stand side — "passport photo in Pehowa" settled at the price of paper and ink.',
        ],
      },
      {
        heading: 'One sheet method for the whole Kurukshetra district family',
        paragraphs: [
          'The maker\'s presets cover the forms that circle this district: 35×45 mm passport, 25×35 mm PAN and voter, 20×25 mm stamp for trust and admission papers, plus a Custom millimetre box for rare sizes. The real A4 preview shows margins and a cutting gap before you download.',
          'Processing stays in the browser — a comfort at shared phones and café machines — and the finished PNG or PDF at 300 DPI prints cleanly at Pehowa\'s shops or any district counter. The same sheet that passes one dharamshala desk will pass the RTO mail too.',
        ],
      },
    ],
    localTip:
      'For yatra weeks, print BEFORE the rush — "A4, Actual size" at any bazaar counter on the bus-stand side, and you beat the temple-road queues.',
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
    heroTitle: 'Cheeka Passport & School Photo Sheets — Kaithal District, Print Local',
    metaTitle: 'Passport Photo in Cheeka | A4 Sheet Maker — Kaithal District HR-08',
    metaDescription:
      'Passport photo in Cheeka from home — A4 sheets for school, KYC, PAN and voter photos. Print near Cheeka market or railway halt. No upload, browser only, free.',
    intro:
      'Cheeka is a sub-division town where a trip to Kaithal for a photograph was once the only option. Village families near Pehowa road, the sugar belt and the railway halt now keep the sheet at home — one A4 print on the Cheeka market for school, KYC and PAN files, and the round trip to Kaithal disappears.',
    keywords: [
      'passport photo in Cheeka',
      'school admission photo size Cheeka',
      'photo print near Cheeka market',
      'A4 photo sheet Kaithal district',
      'PAN photo 25×35 for HR-08',
      'bank KYC photo Cheeka village',
      'nearest passport office from Cheeka',
      'stamp size photo sugar belt schools',
    ],
    sections: [
      {
        heading: 'Cheeka\'s errands — school, KYC and the Kaithal run',
        paragraphs: [
          'Cheeka\'s households live a short rail-and-road hop from Kaithal, and the paperwork rhythm shows it: admission forms at the bazaar\'s schools want stamp-size photos, bank and DBT KYC in the market lanes want recent prints, and any true passport work means a fuller journey to Ambala or Chandigarh afterwards.',
          'The change Cheeka embraced is simple — stop treating "photo" as a Kaithal errand. A sheet built on the phone at home, printed at the market counter, covers the school file today, the KYC next month and the RTO file at HR-08 the season after, all from the same PDF.',
        ],
      },
      {
        heading: 'Print counters around Cheeka market and the railway halt',
        paragraphs: [
          'A couple of dependable studios near the Cheeka market price their sheets around ₹100–₹200, and photocopy shops on the Pehowa road side of the halt take A4 PDFs without ceremony — the faster option when a school bell is ticking.',
          'That is why "passport photo in Cheeka" and "photo print near Cheeka market" searches now lead to files, not queues: you arrive with the sheet, and a single counter visit finishes the errand at the price of one paper and a few minutes of ink.',
        ],
      },
      {
        heading: 'Sizes that keep following Cheeka families',
        paragraphs: [
          'The set rarely changes — 35×45 mm passport, 25×35 mm PAN and voter, 20×25 mm stamp for school, plus a Custom box for a bank\'s particular form. FitMyPhotoA4 sets one size per A4 with margins and a cutting gap, drawn true to the 210×297 mm page.',
          'Download the PNG or PDF and the image never leaves your phone — comfortable on a shared village device — and every future sheet is one re-print away without another Rupee to a studio or a trip to Kaithal.',
        ],
      },
    ],
    localTip:
      'Print at the market-lane counter near the halt with the file on your phone — "A4, Actual size" finishes the school folder in minutes.',
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
          'Passport appointments for this area are typically at the Chandigarh or Ambala centres, reachable by road from Cheeka via district routes. Prepare photos well in advance with the tool.',
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