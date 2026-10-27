import React, { useState, useEffect, useRef } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../../constants/profile';
import './Navbar.scss';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link for whichever section is crossing the middle of the viewport
  useEffect(() => {
    const sections = [...links.map((l) => l.id), 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toggle) return undefined;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setToggle(false);
      }
    };
    const handleKey = (e) => e.key === 'Escape' && setToggle(false);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [toggle]);

  return (
    <header className={`app__navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className='app__navbar-inner' ref={menuRef} aria-label='Main'>
        <a className='app__navbar-logo' href='#home' aria-label={`${profile.name}, back to top`}>
          <span className='app__navbar-mark' aria-hidden='true'>K</span>
          <span className='app__navbar-name'>{profile.name}</span>
        </a>

        <ul className='app__navbar-links'>
          {links.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a className='btn btn--primary btn--sm app__navbar-cta' href='#contact'>Get in touch</a>

        <button
          className='app__navbar-menu-btn'
          onClick={() => setToggle((prev) => !prev)}
          aria-label={toggle ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={toggle}
          aria-controls='mobile-menu'
        >
          {toggle ? <HiX /> : <HiMenuAlt4 />}
        </button>

        <AnimatePresence>
          {toggle && (
            <motion.div
              id='mobile-menu'
              className='app__navbar-menu'
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ul>
                {[...links, { id: 'contact', label: 'Contact' }].map(({ id, label }) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={() => setToggle(false)}>{label}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar
