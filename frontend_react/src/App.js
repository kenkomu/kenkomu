// src/App.js
import React, { useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components';
import { ThemeProvider } from './context/ThemeContext';
import { AboutPage, AchievementsPage, HomePage, NotFoundPage, ProjectPage, WorkPage } from './pages';
import profile from './constants/profile';
// Dark mode is disabled for now — re-enable by restoring this import,
// the <ThemeToggle /> below, and getInitialTheme() in ThemeContext.js
// import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.scss';

// A new page starts at the top, unless the link points at a #section on it
const ScrollManager = () => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [pathname, hash]);
    return null;
};

// Project links shared before the site had pages looked like /#work/<slug>
const LegacyProjectRedirect = () => {
    const { hash } = useLocation();
    const match = hash.match(/^#work\/([\w-]+)$/);
    return match ? <Navigate to={`/work/${match[1]}`} replace /> : null;
};

const App = () => {
    return (
        <ThemeProvider>
            <MotionConfig reducedMotion="user">
                <div className="app">
                    <a className="skip-link" href="#main">Skip to content</a>
                    {/* <ThemeToggle /> */}
                    <ScrollManager />
                    <LegacyProjectRedirect />
                    <Navbar />
                    <main id="main">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/work" element={<WorkPage />} />
                            <Route path="/work/:slug" element={<ProjectPage />} />
                            <Route path="/achievements" element={<AchievementsPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>

                    <footer className="site-footer">
                        <div className="container">
                            <p>© {new Date().getFullYear()} {profile.name}</p>
                            <nav aria-label="Footer">
                                <Link to="/work">Work</Link>
                                <Link to="/achievements">Achievements</Link>
                                <Link to="/about">About</Link>
                                <button type="button" onClick={() => window.scrollTo({ top: 0 })}>Back to top ↑</button>
                            </nav>
                        </div>
                    </footer>
                </div>
            </MotionConfig>
        </ThemeProvider>
    )
}

export default App;
