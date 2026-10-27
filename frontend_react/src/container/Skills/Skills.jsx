import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../../client';
import './Skills.scss';

const CURRENT_YEAR = String(new Date().getFullYear());

const Skills = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "experiences"] | order(year desc)').then(setExperiences).catch(() => {});
  }, []);

  return (
    <section id='experience' className='section experience'>
      <div className='container experience__inner'>
        <div className='section-head'>
          <div>
            <p className='eyebrow'>Experience</p>
            <h2 className='section-title'>Where I've worked</h2>
          </div>
          <p className='section-lead'>From network engineering to smart contracts, newest first.</p>
        </div>

        <ol className='experience__list'>
          {experiences.map((experience) => (
            <li key={experience._id || experience.year} className='experience__year'>
              <p className='experience__year-label'>{experience.year}</p>
              <ul>
                {(experience.works || []).map((work) => (
                  <motion.li
                    key={work._key || work.name}
                    className='experience__item'
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className='experience__item-head'>
                      <h3>{work.name}</h3>
                      {experience.year === CURRENT_YEAR && <span className='experience__badge'>Present</span>}
                    </div>
                    <p className='experience__company'>{work.company}</p>
                    {work.desc && <p className='experience__desc'>{work.desc}</p>}
                  </motion.li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Skills;
