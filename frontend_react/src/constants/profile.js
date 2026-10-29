// Personal details that aren't managed in Sanity. Edit these to update the hero,
// About and Contact sections.
const profile = {
  name: 'Kenneth Komu',
  role: 'Blockchain & full-stack developer',
  // Hero: the name is the headline, then the role, then this line naming the work.
  // It is followed by "Now building <nowBuilding.short>." so the hero and the About tile always agree.
  // M\u2011Pesa uses a non-breaking hyphen so the name never splits across lines.
  intro: 'I connect M\u2011Pesa to blockchains: USDC remittances on Base, escrow on Solana, cross-chain privacy on Starknet.',
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
    short: 'a trustless M\u2011Pesa ↔ CKB onramp',
    description:
      'Trustless M-Pesa to CKB trades: the buyer proves an M-Pesa payment with zkTLS and an escrow contract releases the funds.',
    link: 'https://github.com/kenkomu/ckb-mpesa-onramp',
  },
  // The "Built on" strip under the hero
  chains: ['Ethereum', 'Base', 'Solana', 'Starknet', 'Nervos CKB', 'Monad', 'Arc'],
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
