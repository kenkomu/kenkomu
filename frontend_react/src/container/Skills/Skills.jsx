import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client, imageUrl } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    client.fetch('*[_type == "experiences"] | order(year desc)').then(setExperiences).catch(() => {});
    client.fetch('*[_type == "skills"] | order(name asc)').then(setSkills).catch(() => {});
  }, []);

  return (
    <section id='experience' className='section experience'>
      <div className='container'>
        <div className='section-head'>
          <div>
            <p className='eyebrow'>Experience</p>
            <h2 className='section-title'>Where I've worked</h2>
          </div>
          <p className='section-lead'>From network engineering to smart contracts, newest first.</p>
        </div>

        <div className='experience__grid'>
          <ol className='experience__timeline'>
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
                      <h3>{work.name}</h3>
                      <p className='experience__company'>{work.company}</p>
                      {work.desc && <p className='experience__desc'>{work.desc}</p>}
                    </motion.li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <aside className='tile experience__stack' aria-labelledby='stack-title'>
            <p className='eyebrow' id='stack-title'>Stack</p>
            <p className='experience__stack-lead'>Tools I reach for most.</p>
            <ul>
              {skills.map((skill) => (
                <li key={skill.name}>
                  <span className='experience__skill-icon' style={{ backgroundColor: skill.bgColor || undefined }}>
                    {skill.icon && <img src={imageUrl(skill.icon, 64)} alt='' width='20' height='20' loading='lazy' />}
                  </span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Skills;
