import React, { useState, useEffect, useRef } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
      setLoading(false);
    }).catch(() => setLoading(false));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      setFilterWork(item === 'All' ? works : works.filter((work) => Array.isArray(work.tags) && work.tags.includes(item)));
    }, 400);
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {['UI/UX', 'Web App', 'Blockchain App', 'All'].map((item) => (
          <button
            key={item}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="app__work-portfolio"
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div className="app__work-item app__work-skeleton" key={i}>
                <div className="skeleton-work-img" />
                <div className="skeleton-work-text" />
                <div className="skeleton-work-text skeleton-work-text--short" />
              </div>
            ))
          : filterWork.map((work) => (
              <div className="app__work-item app__flex" key={work._id}>
                <div className="app__work-img app__flex">
                  <img src={urlFor(work.imgUrl)} alt={work.title} />

                  <motion.div
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="app__work-hover app__flex"
                  >
                    {work.projectLink && (
                      <a href={work.projectLink} target="_blank" rel="noreferrer" aria-label={`View ${work.title} live`}>
                        <motion.div
                          whileHover={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="app__flex"
                        >
                          <AiFillEye />
                        </motion.div>
                      </a>
                    )}
                    {work.codeLink && (
                      <a href={work.codeLink} target="_blank" rel="noreferrer" aria-label={`View ${work.title} source code`}>
                        <motion.div
                          whileHover={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="app__flex"
                        >
                          <AiFillGithub />
                        </motion.div>
                      </a>
                    )}
                  </motion.div>
                </div>

                <div className="app__work-content app__flex">
                  <h4 className="bold-text">{work.title}</h4>
                  <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                  <div className="app__work-tag app__flex">
                    <p className="p-text">{work.tags && work.tags.length > 0 ? work.tags[0] : ''}</p>
                  </div>
                </div>
              </div>
            ))
        }
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
