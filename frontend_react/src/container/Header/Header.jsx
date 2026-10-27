import React from 'react'
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi2';
import { images } from '../../constants/';
import profile from '../../constants/profile';
import { imageUrl } from '../../client';
import useWorks, { workSlug } from '../../hooks/useWorks';
import SocialLinks from '../../components/SocialLinks';
import LocalTime from '../../components/LocalTime';
import './Header.scss';

const FAN_SIZE = 5;
const ease = [0.22, 1, 0.36, 1];

const intro = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// Let the Work section open the panel itself, so closing it restores the URL.
// Modified clicks (new tab, new window) keep the normal link behaviour.
const openFromHero = (work) => (e) => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: work }));
};

// Covers fan out from the middle card: tilted and lowered further toward the edges
const fanPose = (i, count) => {
  const offset = i - (count - 1) / 2;
  return { rotate: offset * 5, y: Math.abs(offset) * 16, z: count - Math.abs(offset) };
};

const Header = () => {
  const { works, loading, error } = useWorks();
  const covers = works.filter((w) => w.imgUrl).slice(0, FAN_SIZE);
  const liveCount = works.filter((w) => w.status === 'Live').length;
  const { availability } = profile;

  return (
    <section id='home' className='hero'>
      <div className='container'>
        <motion.div className='hero__intro' variants={intro} initial='hidden' animate='show'>
          <motion.div className='hero__badge' variants={item}>
            <img className='hero__avatar' src={images.profile} alt='' width='40' height='40' />
            {availability.open && (
              <span className='hero__status'>
                <span className='hero__pulse' aria-hidden='true' />
                {availability.label}
              </span>
            )}
            <span className='hero__where'>{profile.location.split(',')[0]} · <LocalTime /></span>
          </motion.div>

          <motion.h1 className='hero__title' variants={item}>
            {profile.headline} <span>{profile.headlineAccent}</span>
          </motion.h1>
          <motion.p className='hero__lead' variants={item}>{profile.intro}</motion.p>

          <motion.div className='hero__actions' variants={item}>
            <a className='btn btn--primary' href='#work'>See my work <HiArrowDown aria-hidden='true' /></a>
            <a className='btn btn--ghost' href='#contact'>Get in touch</a>
          </motion.div>
          <motion.div variants={item}>
            <SocialLinks className='hero__socials' />
          </motion.div>
        </motion.div>

        <div className='hero__fan' aria-label='Recent projects'>
          {loading || error
            ? Array.from({ length: FAN_SIZE }).map((_, i) => {
                const pose = fanPose(i, FAN_SIZE);
                return (
                  <div
                    key={i}
                    className='hero__card hero__card--skeleton'
                    style={{ zIndex: pose.z, transform: `translateY(${pose.y}px) rotate(${pose.rotate}deg)` }}
                    aria-hidden='true'
                  />
                );
              })
            : covers.map((work, i) => {
                const pose = fanPose(i, covers.length);
                return (
                  <motion.a
                    key={work._id}
                    href={`#work/${workSlug(work)}`}
                    className='hero__card'
                    style={{ zIndex: pose.z }}
                    aria-label={`${work.title}: open project details`}
                    onClick={openFromHero(work)}
                    initial={{ opacity: 0, y: 80, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      y: pose.y,
                      rotate: pose.rotate,
                      transition: { type: 'spring', stiffness: 140, damping: 20, delay: 0.3 + i * 0.07 },
                    }}
                    whileHover={{ y: pose.y - 20, rotate: 0, scale: 1.06, transition: { type: 'spring', stiffness: 320, damping: 24 } }}
                    whileFocus={{ y: pose.y - 20, rotate: 0, scale: 1.06 }}
                  >
                    <img src={imageUrl(work.imgUrl, 640, 400)} alt='' width='640' height='400' />
                    <span className='hero__card-label'>{work.title}</span>
                  </motion.a>
                );
              })}
        </div>
      </div>

      <div className='hero__strip'>
        <div className='container hero__strip-inner'>
          <p className='eyebrow'>Shipped on</p>
          <ul className='hero__chains'>
            {profile.chains.map((chain) => <li key={chain}>{chain}</li>)}
          </ul>
          {!loading && !error && (
            <p className='hero__count'>
              <strong>{works.length}</strong> projects · <strong>{liveCount}</strong> live
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Header;
