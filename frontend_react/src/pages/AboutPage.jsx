import React from 'react';
import { About, Footer, Skills } from '../container';
import usePageMeta from '../hooks/usePageMeta';
import pages from '../constants/pageMeta.json';

const AboutPage = () => {
  usePageMeta(pages.about.title, pages.about.description);
  return (
    <>
      <About titleAs='h1' />
      <Skills />
      <Footer />
    </>
  );
};

export default AboutPage;
