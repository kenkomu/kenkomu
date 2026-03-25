import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query)
      .then((data) => {
        setAbouts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <h2 className="head-text">
        I Know that
        <span> Good Design </span>
        <br />
        means
        <span> Good Business </span>
      </h2>

      <div className="app__profiles">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div className="app__profile-item app__profile-skeleton" key={i}>
                <div className="skeleton-img" />
                <div className="skeleton-text" />
                <div className="skeleton-text skeleton-text--short" />
              </div>
            ))
          : abouts.map((about, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.4, type: 'tween', delay: index * 0.1 }}
                className="app__profile-item"
                key={about.title + index}
              >
                <img src={urlFor(about.imgUrl)} alt={about.title} />
                <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
                <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
              </motion.div>
            ))
        }
      </div>
    </>
  );
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);