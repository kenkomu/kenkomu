import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import { images } from '../../constants/';
import profile from '../../constants/profile';
import { imageUrl } from '../../client';
import useWorks, { workSlug } from '../../hooks/useWorks';
import useAchievements from '../../hooks/useAchievements';
import useCoverMorph from '../../hooks/useCoverMorph';
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

// A cover in the hero fan; it morphs into its project page's hero when clicked
const FanCard = ({ work, index, pose }) => {
  const slug = workSlug(work);
  const { morphStyle, markSource } = useCoverMorph(slug, `fan:${slug}`);
  return (
    <MotionLink
      to={`/work/${slug}`}
      viewTransition
      onClick={markSource}
      className='hero__card'
      style={{ zIndex: pose.z }}
      aria-label={`${work.title}: view project`}
      initial={{ opacity: 0, y: 80, rotate: 0 }}
      animate={{
        opacity: 1,
        y: pose.y,
        rotate: pose.rotate,
        transition: { type: 'spring', stiffness: 140, damping: 20, delay: 0.3 + index * 0.07 },
      }}
      whileHover={{ y: pose.y - 20, rotate: 0, scale: 1.06, transition: { type: 'spring', stiffness: 320, damping: 24 } }}
      whileFocus={{ y: pose.y - 20, rotate: 0, scale: 1.06 }}
    >
      <img src={imageUrl(work.imgUrl, 640, 400)} alt='' width='640' height='400' style={morphStyle} />
      <span className='hero__card-label'>{work.title}</span>
    </MotionLink>
  );
};

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
  const internalCount = works.filter((w) => w.status === 'Internal tool').length;
  // Hackathons in the most recent year that has any, so the count doesn't vanish on 1 January
  const hackathons = achievements.filter((a) => a.type === 'Hackathon' && a.date);
  const hackathonYear = hackathons.map((a) => a.date.slice(0, 4)).sort().pop();
  const hackathonCount = hackathons.filter((a) => a.date.startsWith(hackathonYear)).length;
  const { availability, nowBuilding } = profile;
  const [firstName, ...lastNames] = profile.name.split(' ');

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
            <span className='hero__where'><LocalTime /> in {profile.location.split(',')[0]}</span>
          </motion.div>

          {/* Name, role, then the work by name: recruiters look at name and title first */}
          <motion.h1 className='hero__title' variants={item}>
            {firstName} <em>{lastNames.join(' ')}</em>
          </motion.h1>
          <motion.p className='hero__role' variants={item}>{profile.role} · {profile.location.split(',')[0]}</motion.p>
          <motion.p className='hero__lead' variants={item}>
            {profile.intro} Now building {nowBuilding.short}.
          </motion.p>

          <motion.div className='hero__actions' variants={item}>
            <a className='btn btn--primary' href={`mailto:${profile.email}`}>Email me <HiArrowRight aria-hidden='true' /></a>
            <Link className='btn btn--ghost' to='/work' viewTransition>See my work</Link>
          </motion.div>
          {!loading && !error && (
            <motion.ul className='hero__proof' variants={item} aria-label='Track record'>
              <li>
                <strong>{liveCount}</strong> apps live<span className='hero__proof-long'>&nbsp;in production</span>
              </li>
              {internalCount > 0 && (
                <li>
                  <strong>{internalCount}</strong> field tools<span className='hero__proof-long'>&nbsp;running a fibre ISP</span>
                </li>
              )}
              {hackathonCount > 0 && (
                <li><strong>{hackathonCount}</strong> hackathons<span className='hero__proof-long'>&nbsp;in {hackathonYear}</span></li>
              )}
            </motion.ul>
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
                return <FanCard key={work._id} work={work} index={i} pose={pose} />;
              })}
        </div>
      </div>

      <div className='hero__strip'>
        <div className='container hero__strip-inner'>
          <p className='eyebrow'>Built on</p>
          <ul className='hero__chains'>
            {profile.chains.map((chain) => <li key={chain}>{chain}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Header;
