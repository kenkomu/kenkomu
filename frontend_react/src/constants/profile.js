// Personal details that aren't managed in Sanity. Edit these to update the hero,
// About and Contact sections.
const profile = {
  name: 'Kenneth Komu',
  role: 'Blockchain & full-stack developer',
  // Hero headline reads "I build <word> for Africa.", with the word cycling through the list
  headline: {
    before: 'I build',
    words: ['payments', 'wallets', 'escrow', 'remittances', 'field apps'],
    after: 'for Africa.',
  },
  intro:
    'Full-stack and smart-contract engineer in Nairobi. I connect M-Pesa to blockchains, and ship everything from the contract to the app.',
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
