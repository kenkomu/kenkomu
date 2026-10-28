import React from 'react';

// The h1 block at the top of each inner page
const PageHeader = ({ eyebrow, title, lead, children }) => (
  <header className='page-head'>
    <p className='eyebrow'>{eyebrow}</p>
    <h1 className='page-head__title'>{title}</h1>
    {lead && <p className='page-head__lead'>{lead}</p>}
    {children}
  </header>
);

export default PageHeader;
