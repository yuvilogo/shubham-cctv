export const business = {
  name: 'Shubham CCTV',
  legalLine: 'CCTV Camera Installation • Sale • Service',
  owner: 'Shubham Mankotia',
  tagline: 'Eyes that never blink.',
  city: 'Hoshiarpur',
  region: 'Punjab',
  phones: ['+91 76961 19316', '+91 76964 10710'],
  whatsapp: '917696119316',
  instagram: 'https://www.instagram.com/cctv_service_provider_/',
  rating: 4.8,
  ratingCount: 24,
  since: 2014,
  hours: [
    { day: 'Monday — Saturday', time: '09:00 — 20:00' },
    { day: 'Sunday', time: '10:00 — 16:00' },
    { day: 'Emergency call-out', time: '24 × 7' },
  ],
  stores: [
    {
      label: 'Head Office & Showroom',
      lines: [
        'Vishwakarma Chowk, Premgarh Road',
        'Near SK Medical Store, Jagat Pura',
        'Hoshiarpur, Punjab 146001',
      ],
      map: 'https://www.google.com/maps?q=31.5308005,75.9089651',
    },
    {
      label: 'Sales & Service Point',
      lines: [
        'House No. 360, Near Sharma Dairy',
        'Kacha Toba Chowk, Jalandhar Road',
        'Hoshiarpur, Punjab 146001',
      ],
      map: 'https://www.google.com/maps?q=Shubham+CCTV+Installation+Jalandhar+Road+Hoshiarpur',
    },
  ],
  coords: { lat: 31.5308005, lng: 75.9089651 },
}

export const stats = [
  { value: '1,200+', label: 'Cameras installed' },
  { value: `${new Date().getFullYear() - business.since} yrs`, label: 'On-site experience' },
  { value: '24×7', label: 'Service response' },
  { value: '4.8★', label: 'Customer rating' },
]

export const brands = [
  'CP PLUS',
  'HIKVISION',
  'DAHUA',
  'ACTIVE PIXEL',
  'GODREJ',
  'EZVIZ',
  'SECUREYE',
  'TP-LINK TAPO',
]

export const services = [
  {
    id: 'C-01',
    title: 'CCTV Camera Sales',
    body:
      'Genuine HD, IP, Wi-Fi and PTZ cameras from CP Plus, Hikvision, Dahua and Active Pixel — with bill, brand warranty and honest advice on what your site actually needs.',
    points: ['2MP / 4MP / 5MP HD', 'IP & Wi-Fi models', 'PTZ & 360° dome'],
  },
  {
    id: 'C-02',
    title: 'Professional Installation',
    body:
      'Concealed wiring, weather-sealed joints, correct angle and focus for every camera. Neat cabling and a clean rack — the job is finished only when the picture is perfect.',
    points: ['Concealed PVC casing', 'IP66 outdoor sealing', 'Angle & focus tuning'],
  },
  {
    id: 'C-03',
    title: 'DVR / NVR & Storage',
    body:
      'Channel planning, DVR-NVR configuration, hard-disk sizing for the exact number of days of footage you want, and power backup so recording never stops.',
    points: ['4 / 8 / 16 / 32 channel', 'HDD retention planning', 'UPS & power backup'],
  },
  {
    id: 'C-04',
    title: 'Mobile & Remote Viewing',
    body:
      'Watch every camera live from your phone, from anywhere. App setup, DDNS, port forwarding and multi-user access configured and explained until you can do it yourself.',
    points: ['Android & iOS apps', 'Remote / DDNS setup', 'Multi-user access'],
  },
  {
    id: 'C-05',
    title: 'Night Vision & Audio',
    body:
      'Full-colour night vision, IR up to 50 metres, and two-way audio cameras that let you see and speak — day, night, rain or dust.',
    points: ['Full-colour night', 'IR up to 50 m', 'Two-way audio'],
  },
  {
    id: 'C-06',
    title: 'AMC, Repair & Shifting',
    body:
      'Annual maintenance contracts, fault diagnosis, camera and DVR repair, and safe shifting of an existing setup when you move premises.',
    points: ['Annual contracts', 'Fault & repair service', 'System shifting'],
  },
]

export const packages = [
  {
    code: 'PKG-01',
    name: 'Home Guard',
    cameras: '2 Cameras',
    price: '₹8,999',
    note: 'Indicative package price',
    best: false,
    includes: [
      '2 × 2MP HD bullet/dome cameras',
      '4-channel DVR',
      '500 GB surveillance hard disk',
      'Wiring, casing & connectors',
      'Mobile viewing setup',
      '1 year service support',
    ],
  },
  {
    code: 'PKG-02',
    name: 'Shop Protector',
    cameras: '4 Cameras',
    price: '₹14,999',
    note: 'Indicative package price',
    best: true,
    includes: [
      '4 × 2.4MP HD colour night-vision cameras',
      '4-channel DVR + 1 TB hard disk',
      'Concealed wiring & casing',
      'Audio camera at billing counter',
      'Remote mobile access for 4 users',
      '2 year service support',
    ],
  },
  {
    code: 'PKG-03',
    name: 'Business Shield',
    cameras: '8 Cameras',
    price: '₹24,999',
    note: 'Indicative package price',
    best: false,
    includes: [
      '8 × 2.4MP HD cameras (indoor + outdoor)',
      '8-channel DVR + 2 TB hard disk',
      'Full premises cable routing',
      'UPS backup for DVR',
      'Multi-location remote monitoring',
      '2 year service support',
    ],
  },
]

export const coverage = [
  'Hoshiarpur',
  'Jalandhar',
  'Phagwara',
  'Dasuya',
  'Garhshankar',
  'Mukerian',
  'Tanda',
  'Nawanshahr',
  'Kapurthala',
  'Una',
  'Anandpur Sahib',
  'Ropar',
]

export const process = [
  {
    step: '01',
    title: 'Free site survey',
    body:
      'We visit the site, walk the entry points, and mark exactly where a camera earns its place — no guesswork, no extra cameras billed.',
  },
  {
    step: '02',
    title: 'Plan & quote',
    body:
      'You get a written, itemised quote: camera models, DVR channels, cable length, hard-disk days of recording and labour. Nothing hidden.',
  },
  {
    step: '03',
    title: 'Installation day',
    body:
      'Wiring, mounting, DVR configuration and mobile setup completed in a single visit for most homes and shops. Site left clean.',
  },
  {
    step: '04',
    title: 'Handover & aftercare',
    body:
      'We show you live view, playback and export. Then we stay reachable on call for service, additions and AMC.',
  },
]

export const reviews = [
  {
    quote:
      'Camera installation was done very neatly. Wiring is fully concealed and the shop looks clean. Picture quality is excellent even at night.',
    name: 'Rajesh Kumar',
    role: 'Shop owner, Hoshiarpur',
  },
  {
    quote:
      'Called in the evening with a DVR fault, technician came the same night. Very cooperative and the charges were reasonable.',
    name: 'Manpreet Singh',
    role: 'Residence, Premgarh Road',
  },
  {
    quote:
      'They set up mobile viewing on all our family phones and explained everything patiently. Eight cameras at our factory are working perfectly.',
    name: 'Ashok Verma',
    role: 'Factory, Jalandhar Road',
  },
  {
    quote:
      'Best rates in Hoshiarpur for CP Plus. Gave proper bill and warranty card. Highly recommended for any CCTV work.',
    name: 'Neha Sharma',
    role: 'Boutique, Model Town',
  },
]

export const faqs = [
  {
    q: 'How many cameras do I actually need?',
    a: 'It depends on entry points, not on floor area. A typical home needs 2–4 cameras (main gate, entry door, stair, rear). A shop usually needs 4–6 (counter, entrance, stock room, shutter). We tell you the minimum that covers every access point after a free site survey.',
  },
  {
    q: 'How many days of recording can I store?',
    a: 'As a rule of thumb, 1 TB of hard-disk stores roughly 15–20 days of footage from 4 HD cameras recording continuously. We size the disk for the retention you want, and can set motion-based recording to stretch it much further.',
  },
  {
    q: 'Can I see the cameras on my phone from outside the city?',
    a: 'Yes. Every installation includes mobile app setup with remote access, so you can watch live view and playback from anywhere with an internet connection. We configure it on your phone and your family members\u2019 phones before we leave.',
  },
  {
    q: 'What happens if a camera or DVR stops working?',
    a: 'Call the same number you booked with. Most faults are fixed on-site the same or next day. Cameras and DVRs carry the brand warranty, and our own service support covers the rest.',
  },
  {
    q: 'Do you also work outside Hoshiarpur?',
    a: 'Yes — we regularly install and service in Jalandhar, Phagwara, Dasuya, Garhshankar, Mukerian, Tanda, Nawanshahr, Kapurthala and nearby areas of Punjab.',
  },
  {
    q: 'Is wiring included in the package price?',
    a: 'Yes. Our packages include cable, casing, connectors and labour up to a standard footage for the package. For long runs or extra-long distances we measure on site and tell you before starting.',
  },
]
