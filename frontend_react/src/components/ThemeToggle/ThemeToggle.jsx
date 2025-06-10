// src/components/ThemeToggle/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button 
        className={`theme-toggle__button ${isDarkMode ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <div className="theme-toggle__slider">
          <div className="theme-toggle__icon">
            {isDarkMode ? (
              // Moon icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="currentColor"
                />
              </svg>
            ) : (
              // Sun icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                <path 
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;