import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiAcademicCap, HiArrowRight, HiArrowUpRight, HiBanknotes, HiCheckBadge, HiRocketLaunch, HiSparkles, HiStar, HiTrophy,
} from 'react-icons/hi2';
import { imageUrl } from '../../client';

const typeIcon = {
  Hackathon: HiRocketLaunch,
  Grant: HiBanknotes,
  Programme: HiAcademicCap,
  Certification: HiCheckBadge,
  Award: HiTrophy,
};

export const formatMonth = (date) =>
  new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));

// compact: the home page strip, without description or image
const AchievementCard = ({ item, compact = false }) => {
  const Icon = typeIcon[item.type] || HiSparkles;

  return (
    <article className={`achievement ${compact ? 'achievement--compact' : ''}`}>
      <div className='achievement__top'>
        <span className={`achievement__icon achievement__icon--${(item.type || 'other').toLowerCase()}`} aria-hidden='true'>
          <Icon />
        </span>
        <p className='achievement__meta'>
          {item.type}
          {item.date && <> · <time dateTime={item.date}>{formatMonth(item.date)}</time></>}
        </p>
      </div>

      <h3 className='achievement__title'>{item.title}</h3>
      {item.organizer && <p className='achievement__org'>{item.organizer}</p>}
      {item.result && <p className='achievement__result'><HiStar aria-hidden='true' /> {item.result}</p>}
      {!compact && item.description && <p className='achievement__desc'>{item.description}</p>}
      {!compact && item.image && (
        <img className='achievement__image' src={imageUrl(item.image, 800)} alt={`${item.title}`} loading='lazy' />
      )}

      {(item.project || item.link) && (
        <div className='achievement__links'>
          {item.project && (
            <Link to={`/work/${item.project.slug}`}>{item.project.title} <HiArrowRight aria-hidden='true' /></Link>
          )}
          {item.link && (
            <a href={item.link} target='_blank' rel='noopener noreferrer'>
              Proof <HiArrowUpRight aria-hidden='true' />
              <span className='sr-only'> for {item.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
};

export default AchievementCard;
