import React, { useEffect, useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark'); // Set dark as the default theme
  
  useEffect(() => {
    // Initialize with the dark theme
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
    </button>
  );
};

export default ThemeToggle;
