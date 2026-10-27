import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCodeBracket, HiCube, HiFingerPrint, HiGlobeAlt, HiSparkles } from 'react-icons/hi2';
import { client } from '../../client';
import profile from '../../constants/profile';
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

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch('*[_type == "abouts"] | order(_createdAt asc){ _id, title, description }')
      .then((data) => {
        setAbouts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id='about' className='section about'>
      <div className='container about__grid'>
        <motion.div className='about__intro' {...reveal} transition={{ duration: 0.5 }}>
          <p className='eyebrow'>About</p>
          <h2 className='section-title'>Engineer first, across the whole stack.</h2>
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className='about__bio'>{paragraph}</p>
          ))}
        </motion.div>

        <div className='about__services'>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <div key={i} className='tile about__service about__service--skeleton' aria-hidden='true' />)
            : abouts.map((about, index) => {
                const Icon = iconFor(about.title);
                return (
                  <motion.article
                    key={about._id}
                    className='tile about__service'
                    {...reveal}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <span className='about__icon' aria-hidden='true'><Icon /></span>
                    <h3>{about.title}</h3>
                    <p>{about.description}</p>
                  </motion.article>
                );
              })}
        </div>
      </div>
    </section>
  );
}

export default About;
