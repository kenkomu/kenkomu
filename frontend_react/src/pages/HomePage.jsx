import React from 'react';
import { About, Footer, Header } from '../container';
import WorkPreview from '../container/Work/WorkPreview';
import AchievementsStrip from '../container/Achievements/AchievementsStrip';
import usePageMeta from '../hooks/usePageMeta';

const HomePage = () => {
  usePageMeta();
  return (
    <>
      <Header />
      <WorkPreview />
      <AchievementsStrip />
      <About compact />
      <Footer index='04' />
    </>
  );
};

export default HomePage;
