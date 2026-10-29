import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../../constants/profile';
import BrandMark from '../BrandMark';
import scrollToSection from '../../utils/scrollToSection';
import './Navbar.scss';

const links = [
  { to: '/work', label: 'Work' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu once a link has taken us to another page
  useEffect(() => setToggle(false), [pathname]);

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

  const linkClass = ({ isActive }) => (isActive ? 'is-active' : undefined);

  return (
    <header className={`app__navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className='app__navbar-inner' ref={menuRef} aria-label='Main'>
        <Link className='app__navbar-logo' to='/' viewTransition aria-label={`${profile.name}, home`}>
          <BrandMark className='app__navbar-mark' />
          <span className='app__navbar-name'>{profile.name}</span>
        </Link>

        <ul className='app__navbar-links'>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} viewTransition className={linkClass}>{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* Every page ends with the contact section */}
        <a className='btn btn--primary btn--sm app__navbar-cta' href='#contact' onClick={(e) => scrollToSection(e, 'contact')}>Get in touch</a>

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
                <li><NavLink to='/' end viewTransition className={linkClass}>Home</NavLink></li>
                {links.map(({ to, label }) => (
                  <li key={to}><NavLink to={to} viewTransition className={linkClass}>{label}</NavLink></li>
                ))}
                <li><a href='#contact' onClick={(e) => { setToggle(false); scrollToSection(e, 'contact'); }}>Contact</a></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar
