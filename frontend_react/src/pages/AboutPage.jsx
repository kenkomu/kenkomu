import React from 'react';
import { About, Footer, Skills } from '../container';
import usePageMeta from '../hooks/usePageMeta';

const AboutPage = () => {
  usePageMeta('About', 'About Kenneth Komu: background, tools, services and experience.');
  return (
    <>
      <About titleAs='h1' />
      <Skills />
      <Footer />
    </>
  );
};

export default AboutPage;
