import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { HiArrowDown, HiArrowUpRight } from 'react-icons/hi2';
import { images } from '../../constants/';
import profile from '../../constants/profile';
import useWorks from '../../hooks/useWorks';
import SocialLinks from '../../components/SocialLinks';
import './Header.scss';

const tileMotion = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] } }),
};

const Tile = ({ i, className, children, ...rest }) => (
  <motion.div className={`tile hero__tile ${className}`} variants={tileMotion} custom={i} {...rest}>
    {children}
  </motion.div>
);

const formatTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timeZone }).format(new Date());

const LocalTime = () => {
  const [time, setTime] = useState(formatTime);
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 20000);
    return () => clearInterval(id);
  }, []);
  return <time>{time}</time>;
};

const Header = () => {
  const { works, loading, error } = useWorks();
  const liveCount = works.filter((w) => w.status === 'Live').length;
  const { availability, nowBuilding } = profile;

  return (
    <section id='home' className='hero'>
      <motion.div className='container hero__grid' initial='hidden' animate='show'>
        <Tile i={0} className='hero__intro'>
          <p className='eyebrow'>{profile.role}</p>
          <h1 className='hero__title'>{profile.headline}</h1>
          <p className='hero__lead'>{profile.intro}</p>
          <div className='hero__actions'>
            <a className='btn btn--primary' href='#work'>See my work <HiArrowDown aria-hidden='true' /></a>
            <a className='btn btn--ghost' href='#contact'>Get in touch</a>
          </div>
          <SocialLinks className='hero__socials' />
        </Tile>

        <Tile i={1} className='hero__photo'>
          <img src={images.profile} alt={profile.name} width='853' height='853' fetchPriority='high' />
        </Tile>

        <Tile i={2} className='hero__stat'>
          <p className='eyebrow'>Projects</p>
          <p className='hero__stat-number' aria-live='polite'>{loading || error ? '–' : works.length}</p>
          <p className='hero__muted'>{loading ? 'Loading…' : error ? 'See them below' : `${liveCount} live in production`}</p>
        </Tile>

        {availability.open && (
          <Tile i={3} className='hero__status'>
            <span className='hero__pulse' aria-hidden='true' />
            <p className='hero__status-label'>{availability.label}</p>
            <p className='hero__muted'>{availability.detail}</p>
          </Tile>
        )}

        <Tile i={4} className='hero__place'>
          <p className='eyebrow'>Based in</p>
          <p className='hero__place-name'>{profile.location}</p>
          <p className='hero__muted'><LocalTime /> {profile.timeZoneLabel}</p>
        </Tile>

        <Tile i={5} className='hero__now'>
          <p className='eyebrow'><span className='hero__now-dot' aria-hidden='true' /> Now building</p>
          <p className='hero__now-title'>{nowBuilding.title}</p>
          <p className='hero__muted'>{nowBuilding.description}</p>
          {nowBuilding.link && (
            <a className='hero__link' href={nowBuilding.link} target='_blank' rel='noopener noreferrer'>
              Follow along on GitHub <HiArrowUpRight aria-hidden='true' />
            </a>
          )}
        </Tile>

        <Tile i={6} className='hero__chains'>
          <p className='eyebrow'>Shipped on</p>
          <ul>
            {profile.chains.map((chain) => <li key={chain} className='chip'>{chain}</li>)}
          </ul>
        </Tile>
      </motion.div>
    </section>
  )
}

export default Header;
