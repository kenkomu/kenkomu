import React from 'react'
import './Header.scss';
import { AppWrap } from '../../wrapper';
// The AppWrap component is used to wrap the Header component for additional functionality like navigation dots and social media links.

import { motion } from 'framer-motion';
import { images } from '../../constants/';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
};
const Header = () => {
  return (
    <div className='app__header app__flex'>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className='app__header-info'
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <span>
              👋
            </span>
            <div style={{ marginLeft: 20 }}>
              <p className='p-text'>Hello, I am</p>
              <h1 className='head-text'>Kenneth</h1>
            </div>
          </div>
          <div className='tag-cmp app__flex'>
            <p className='p-text'>Blockchain Developer</p>
            <p className='p-text'>Web Developer</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__header-img'
      >
        <img src={images.profile} alt="Kenneth Komu - Blockchain and Web Developer" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt='profile_circle'
          className='overlay_circle'
        />
      </motion.div>


      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        viewport={{ once: true }}
        className='app__header-circles'
        >
          {[
            { src: images.react, alt: 'React' },
            { src: images.redux, alt: 'Redux' },
            { src: images.rust, alt: 'Rust' },
          ].map(({ src, alt }) => (
            <div className='circle-cmp app__flex' key={alt}>
              <img src={src} alt={alt} />
            </div>
          ))}
      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');
