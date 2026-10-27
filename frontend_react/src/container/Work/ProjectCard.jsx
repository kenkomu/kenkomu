import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { imageUrl } from '../../client';

const statusClass = {
  Live: 'live',
  'In development': 'dev',
  'Internal tool': 'internal',
  Hackathon: 'hackathon',
  Archived: 'archived',
};

export const StatusBadge = ({ status }) =>
  status ? <span className={`status-badge status-badge--${statusClass[status] || 'archived'}`}>{status}</span> : null;

// size: 'lg' (first featured), 'md' (other featured) or 'sm' (grid)
const ProjectCard = ({ work, size = 'sm', onOpen }) => {
  const width = size === 'lg' ? 1200 : 720;
  const height = Math.round(width * 0.625);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`work-card work-card--${size}`}
    >
      <div className='work-card__media'>
        {work.imgUrl && (
          <img src={imageUrl(work.imgUrl, width, height)} alt='' width={width} height={height} loading='lazy' decoding='async' />
        )}
        <StatusBadge status={work.status} />
        <span className='work-card__arrow' aria-hidden='true'><HiArrowUpRight /></span>
        {work.tags?.length > 0 && (
          <ul className='work-card__tags'>
            {work.tags.map((tag) => <li key={tag}>{tag.replace(/ App$/, '')}</li>)}
          </ul>
        )}
      </div>

      <div className='work-card__body'>
        {work.client && <p className='work-card__meta'>{work.client}</p>}
        <div className='work-card__head'>
          <h3 className='work-card__title'>
            <button type='button' onClick={() => onOpen(work)} aria-haspopup='dialog'>{work.title}</button>
          </h3>
          {work.year && <span className='work-card__year'>{work.year}</span>}
        </div>
        {work.description && <p className='work-card__desc'>{work.description}</p>}
        {size !== 'sm' && work.stack?.length > 0 && (
          <ul className='work-card__stack'>
            {work.stack.slice(0, 4).map((item) => <li key={item} className='chip'>{item}</li>)}
          </ul>
        )}
      </div>
    </motion.article>
  );
};

export default React.memo(ProjectCard);
