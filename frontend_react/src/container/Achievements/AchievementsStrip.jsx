import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import useAchievements from '../../hooks/useAchievements';
import AchievementCard from './AchievementCard';
import './Achievements.scss';

const STRIP_SIZE = 4;

// Home page: featured achievements (or the latest ones), linking to /achievements
const AchievementsStrip = () => {
  const { achievements, loading, error } = useAchievements();
  if (loading || error || achievements.length === 0) return null;

  const featured = achievements.filter((a) => a.featured);
  const shown = (featured.length ? featured : achievements).slice(0, STRIP_SIZE);

  return (
    <section id='achievements' className='section achievements-strip'>
      <div className='container'>
        <div className='section-head'>
          <div>
            <p className='eyebrow'><span className='eyebrow__num'>02</span>Achievements</p>
            <h2 className='section-title'>Hackathons and <em>programmes</em></h2>
          </div>
          <Link className='btn btn--ghost' to='/achievements' viewTransition>
            All {achievements.length} achievements <HiArrowRight aria-hidden='true' />
          </Link>
        </div>
        <div className='achievements__grid achievements__grid--strip'>
          {shown.map((item) => <AchievementCard key={item._id} item={item} compact />)}
        </div>
      </div>
    </section>
  );
};

export default AchievementsStrip;
