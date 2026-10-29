import React from 'react';
import { Footer, Work } from '../container';
import PageHeader from '../components/PageHeader';
import usePageMeta from '../hooks/usePageMeta';
import pages from '../constants/pageMeta.json';

const WorkPage = () => {
  usePageMeta(pages.work.title, pages.work.description);
  return (
    <>
      <section className='section page-top'>
        <div className='container'>
          <PageHeader
            eyebrow='Work'
            title={<>Things I've <em>built</em></>}
            lead='Payments, wallets and marketplaces, plus the internal tools that keep a fibre network running. Filter by category or search by name or technology.'
          />
          <Work />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WorkPage;
