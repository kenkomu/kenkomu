// Personal details that aren't managed in Sanity. Edit these to update the hero,
// About and Contact sections.
const profile = {
  name: 'Kenneth Komu',
  role: 'Blockchain & full-stack developer',
  // The accent part is shown in the brand colour after the headline
  headline: 'I build payments, wallets and tools',
  headlineAccent: 'for Africa.',
  intro:
    'From M-Pesa onramps on CKB and USDC remittances on Base to the field apps a fibre ISP runs on. I ship the contract, the API and the app.',
  location: 'Nairobi, Kenya',
  timeZone: 'Africa/Nairobi',
  timeZoneLabel: 'EAT',
  // Set `open` to false to hide the availability badge.
  availability: {
    open: true,
    label: 'Open to work',
    detail: 'Freelance and full-time',
  },
  nowBuilding: {
    title: 'CKB ↔ M-Pesa onramp',
    description:
      'Trustless M-Pesa to CKB trades: the buyer proves an M-Pesa payment with zkTLS and an escrow contract releases the funds.',
    link: 'https://github.com/kenkomu/ckb-mpesa-onramp',
  },
  chains: ['Ethereum', 'Base', 'Starknet', 'Nervos CKB', 'Monad', 'Arc'],
  bio: [
    "I'm Kenneth, a developer based in Nairobi. I work where payments, blockchains and everyday tools meet: escrow contracts and M-Pesa rails, remittance APIs, and the warehouse, asset and field-ops systems a fibre ISP runs on.",
    'I like owning a product end to end: the smart contract, the backend, the mobile app and the pipeline that ships it. Most of what I build is for African users first.',
  ],
  email: 'komukenneth216@gmail.com',
  phone: { display: '+254 112 285 105', href: 'tel:+254112285105' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/kenkomu' },
    { label: 'X', href: 'https://x.com/kikis216' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kenneth-njoroge-2b2542211/' },
  ],
};

export default profile;
