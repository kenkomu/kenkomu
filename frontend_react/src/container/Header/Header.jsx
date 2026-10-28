import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import { images } from '../../constants/';
import profile from '../../constants/profile';
import { imageUrl } from '../../client';
import useWorks, { workSlug } from '../../hooks/useWorks';
import useAchievements from '../../hooks/useAchievements';
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

const MotionLink = motion.create(Link);

// The headline's cycling word. Words slide up through a pill that resizes to fit each one,
// so the centred line re-centres smoothly instead of jumping.
const RotatingWord = ({ words, interval = 2200 }) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState(null);
  const itemRefs = useRef([]);
  const measuredOnce = useRef(false);

  // Measure every word (again once the web font has loaded, and on resize, since the size is fluid)
  useLayoutEffect(() => {
    const measure = () => setWidths(itemRefs.current.map((el) => (el ? el.offsetWidth : 0)));
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [words]);

  useEffect(() => {
    if (widths) measuredOnce.current = true;
  }, [widths]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduceMotion, words.length, interval]);

  const previous = (index - 1 + words.length) % words.length;
  return (
    <motion.span
      className='hero__word'
      initial={false}
      animate={widths ? { width: widths[index] } : undefined}
      // The first measurement snaps into place; later changes ease
      transition={measuredOnce.current ? { type: 'spring', stiffness: 220, damping: 30 } : { duration: 0 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={word}
          ref={(el) => { itemRefs.current[i] = el; }}
          className='hero__word-item'
          initial={false}
          animate={{
            y: i === index ? '0%' : i === previous ? '-110%' : '110%',
            opacity: i === index ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// e.g. ["payments", "wallets", "escrow"] -> "payments, wallets and escrow"
const listOf = (words) => `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;

// Covers fan out from the middle card: tilted and lowered further toward the edges
const fanPose = (i, count) => {
  const offset = i - (count - 1) / 2;
  return { rotate: offset * 5, y: Math.abs(offset) * 16, z: count - Math.abs(offset) };
};

const Header = () => {
  const { works, loading, error } = useWorks();
  const { achievements } = useAchievements();
  const covers = works.filter((w) => w.imgUrl).slice(0, FAN_SIZE);
  const liveCount = works.filter((w) => w.status === 'Live').length;
  const thisYear = String(new Date().getFullYear());
  const hackathonsThisYear = achievements.filter((a) => a.type === 'Hackathon' && a.date?.startsWith(thisYear)).length;
  const { availability, headline } = profile;

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
            <span className='sr-only'>{headline.before} {listOf(headline.words)} {headline.after}</span>
            <span aria-hidden='true'>
              {headline.before} <RotatingWord words={headline.words} />
              {/* Always two lines, so the layout below never moves as the word changes */}
              <br />
              {headline.after}
            </span>
          </motion.h1>
          <motion.p className='hero__lead' variants={item}>{profile.intro}</motion.p>

          <motion.div className='hero__actions' variants={item}>
            <Link className='btn btn--primary' to='/work'>See my work <HiArrowRight aria-hidden='true' /></Link>
            <a className='btn btn--ghost' href='#contact'>Get in touch</a>
          </motion.div>
          {!loading && !error && (
            <motion.p className='hero__proof' variants={item}>
              <span><strong>{works.length}</strong> projects</span>
              <span><strong>{liveCount}</strong> live<span className='hero__proof-long'>&nbsp;in production</span></span>
              {hackathonsThisYear > 0 && <span><strong>{hackathonsThisYear}</strong> hackathons in {thisYear}</span>}
            </motion.p>
          )}
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
                  <MotionLink
                    key={work._id}
                    to={`/work/${workSlug(work)}`}
                    className='hero__card'
                    style={{ zIndex: pose.z }}
                    aria-label={`${work.title}: view project`}
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
                  </MotionLink>
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
        </div>
      </div>
    </section>
  )
}

export default Header;
