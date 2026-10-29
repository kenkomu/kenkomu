import React from 'react';

// The site's mark (also the favicon): a block K whose spine is the Kenyan flag
const BrandMark = ({ size = 34, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox='0 0 64 64' aria-hidden='true' focusable='false'>
    <rect width='64' height='64' rx='16' fill='#fff' />
    <rect x='1' y='1' width='62' height='62' rx='15' fill='none' stroke='#dcd8ce' strokeWidth='2' />
    <rect x='16' y='13' width='11' height='11' rx='2.5' fill='#1d1d1b' />
    <rect x='16' y='26.5' width='11' height='11' rx='2.5' fill='#c8102e' />
    <rect x='16' y='40' width='11' height='11' rx='2.5' fill='#007a3d' />
    <path d='M31 31 L44 16 M33 33 L45 48' stroke='#1d1d1b' strokeWidth='8' strokeLinecap='round' fill='none' />
  </svg>
);

export default BrandMark;
