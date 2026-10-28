import React, { useMemo, useState } from 'react';
import useAchievements from '../../hooks/useAchievements';
import AchievementCard from './AchievementCard';
import './Achievements.scss';

const TYPE_ORDER = ['Hackathon', 'Grant', 'Award', 'Certification', 'Programme'];

// Every achievement, filterable by type and grouped by year (newest first)
const Achievements = () => {
  const { achievements, loading, error } = useAchievements();
  const [filter, setFilter] = useState('All');

  const types = useMemo(() => {
    const counts = {};
    achievements.forEach((a) => { counts[a.type] = (counts[a.type] || 0) + 1; });
    return TYPE_ORDER.filter((t) => counts[t])
      .concat(Object.keys(counts).filter((t) => !TYPE_ORDER.includes(t)))
      .map((type) => ({ type, count: counts[type] }));
  }, [achievements]);

  const years = useMemo(() => {
    const groups = new Map();
    achievements
      .filter((a) => filter === 'All' || a.type === filter)
      .forEach((a) => {
        const year = (a.date || '').slice(0, 4) || 'Undated';
        if (!groups.has(year)) groups.set(year, []);
        groups.get(year).push(a);
      });
    return [...groups.entries()];
  }, [achievements, filter]);

  if (loading) {
    return <div className='achievements__grid' aria-hidden='true'>{[0, 1, 2, 3].map((i) => <div key={i} className='achievement achievement--skeleton' />)}</div>;
  }
  if (error) return <p className='achievements__empty'>Achievements couldn't be loaded right now.</p>;
  if (achievements.length === 0) return <p className='achievements__empty'>Nothing here yet.</p>;

  return (
    <div className='achievements'>
      <div className='work__filters achievements__filters' role='group' aria-label='Filter achievements by type'>
        {[{ type: 'All', count: achievements.length }, ...types].map(({ type, count }) => (
          <button
            key={type}
            type='button'
            className={`work__filter ${filter === type ? 'is-active' : ''}`}
            aria-pressed={filter === type}
            onClick={() => setFilter(type)}
          >
            {type === 'All' ? 'All' : `${type}s`}
            <span className='work__count'>{count}</span>
          </button>
        ))}
      </div>

      {years.map(([year, items]) => (
        <section key={year} className='achievements__year' aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className='achievements__year-label'>{year}</h2>
          <div className='achievements__grid'>
            {items.map((item) => <AchievementCard key={item._id} item={item} />)}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Achievements;
