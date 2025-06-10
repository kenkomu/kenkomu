import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
// import  { images } from '../../constants';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import {urlFor, client } from '../../client';
// const abouts = [
//   //use web development, software engineering, blockchain development, and AI development, cryptographic research

//   { title: 'Web Development', description: 'I create responsive and user-friendly web applications using modern technologies.', imgUrl: images.about01 },
//   { title: 'Software Engineering', description: 'I design and implement software solutions that meet user needs and business goals.', imgUrl: images.about02 },
//   { title: 'Blockchain Development', description: 'I build decentralized applications and smart contracts on blockchain platforms.', imgUrl: images.about03 },
//   { title: 'Cryptographic Research', description: 'I conduct research in cryptography to enhance security in digital communications.', imgUrl: images.about04 },
// ];

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query)
      .then((data) => setAbouts(data)
      )
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
      {abouts.map((about, index) => (
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, type: 'tween' }}
          className="app__profile-item"
          key={about.title + index}
        >
          
            <img src={urlFor(about.imgUrl)} alt={about.title} />
        
          <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
          <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
        </motion.div>
      ))}
      </div>
      
    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);