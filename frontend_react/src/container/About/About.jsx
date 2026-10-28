import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiArrowUpRight, HiCodeBracket, HiCube, HiFingerPrint, HiGlobeAlt, HiSparkles } from 'react-icons/hi2';
import { client, imageUrl } from '../../client';
import { images } from '../../constants';
import profile from '../../constants/profile';
import LocalTime from '../../components/LocalTime';
import './About.scss';

// Picks an icon from the service title; anything unmatched gets the sparkle
const iconFor = (title = '') => {
  const t = title.toLowerCase();
  if (t.includes('blockchain')) return HiCube;
  if (t.includes('crypto')) return HiFingerPrint;
  if (t.includes('web')) return HiGlobeAlt;
  if (t.includes('software') || t.includes('engineer')) return HiCodeBracket;
  return HiSparkles;
};

const Tile = ({ i = 0, className, children }) => (
  <motion.div
    className={`tile about__tile ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// compact: the home page version, without the toolbox and services, linking to /about.
// titleAs: 'h1' when this is the top of the About page.
const About = ({ compact = false, titleAs: Title = 'h2' }) => {
  const [abouts, setAbouts] = useState([]);
  const [skills, setSkills] = useState([]);
  const { nowBuilding } = profile;

  useEffect(() => {
    if (compact) return;
    client.fetch('*[_type == "abouts"] | order(_createdAt asc){ _id, title, description }').then(setAbouts).catch(() => {});
    client.fetch('*[_type == "skills"] | order(name asc){ name, bgColor, icon }').then(setSkills).catch(() => {});
  }, [compact]);

  return (
    <section id='about' className={`section about ${Title === 'h1' ? 'page-top' : ''}`}>
      <div className={`container about__grid ${compact ? 'about__grid--compact' : ''}`}>
        <Tile className='about__intro'>
          <p className='eyebrow'>About</p>
          <Title className='section-title'>Engineer first, across the whole stack.</Title>
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className='about__bio'>{paragraph}</p>
          ))}
          {compact && (
            <Link className='btn btn--ghost about__more' to='/about'>More about me <HiArrowRight aria-hidden='true' /></Link>
          )}
        </Tile>

        <Tile i={1} className='about__photo'>
          <img src={images.portrait} alt={profile.name} width='900' height='1125' loading='lazy' />
        </Tile>

        <Tile i={2} className='about__now'>
          <p className='eyebrow'><span className='about__now-dot' aria-hidden='true' /> Now building</p>
          <p className='about__now-title'>{nowBuilding.title}</p>
          <p className='about__muted'>{nowBuilding.description}</p>
          {nowBuilding.link && (
            <a className='about__link' href={nowBuilding.link} target='_blank' rel='noopener noreferrer'>
              Follow along on GitHub <HiArrowUpRight aria-hidden='true' />
            </a>
          )}
        </Tile>

        <Tile i={3} className='about__place'>
          <p className='eyebrow'>Based in</p>
          <p className='about__place-name'>{profile.location}</p>
          <p className='about__muted'>It's <LocalTime /> here</p>
        </Tile>

        {!compact && (
          <>
            <Tile i={4} className='about__tools'>
              <p className='eyebrow'>Toolbox</p>
              <p className='about__tile-title'>Tools I reach for most</p>
              <ul>
                {skills.map((skill) => (
                  <li key={skill.name}>
                    <span className='about__tool-icon' style={{ backgroundColor: skill.bgColor || undefined }}>
                      {skill.icon && <img src={imageUrl(skill.icon, 80)} alt='' width='24' height='24' loading='lazy' />}
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </Tile>

            <Tile i={5} className='about__services'>
              <p className='eyebrow'>What I do</p>
              <ul>
                {abouts.map((about) => {
                  const Icon = iconFor(about.title);
                  return (
                    <li key={about._id}>
                      <span className='about__icon' aria-hidden='true'><Icon /></span>
                      <div>
                        <h3>{about.title}</h3>
                        <p>{about.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Tile>
          </>
        )}
      </div>
    </section>
  );
}

export default About;
