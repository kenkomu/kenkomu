import React from 'react';
import { Footer } from '../container';
import Achievements from '../container/Achievements/Achievements';
import PageHeader from '../components/PageHeader';
import usePageMeta from '../hooks/usePageMeta';
import pages from '../constants/pageMeta.json';

const AchievementsPage = () => {
  usePageMeta(pages.achievements.title, pages.achievements.description);
  return (
    <>
      <section className='section page-top'>
        <div className='container'>
          <PageHeader
            eyebrow='Achievements'
            title='Hackathons, programmes and recognition'
            lead='Where I have shipped under a deadline and kept learning, newest first. Each one links to the project it produced.'
          />
          <Achievements />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AchievementsPage;
