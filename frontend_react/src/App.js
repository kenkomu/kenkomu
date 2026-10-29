// src/App.js
import React from 'react';
import { Link, Navigate, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components';
import { ThemeProvider } from './context/ThemeContext';
import { AboutPage, AchievementsPage, HomePage, NotFoundPage, ProjectPage, WorkPage } from './pages';
import profile from './constants/profile';
// Dark mode is disabled for now — re-enable by restoring this import,
// the <ThemeToggle /> below, and getInitialTheme() in ThemeContext.js
// import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.scss';

export const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/work', element: <WorkPage /> },
    { path: '/work/:slug', element: <ProjectPage /> },
    { path: '/achievements', element: <AchievementsPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '*', element: <NotFoundPage /> },
];

// Project links shared before the site had pages looked like /#work/<slug>
const LegacyProjectRedirect = () => {
    const { hash } = useLocation();
    const match = hash.match(/^#work\/([\w-]+)$/);
    return match ? <Navigate to={`/work/${match[1]}`} replace /> : null;
};

// The layout around every page
const App = () => {
    return (
        <ThemeProvider>
            <MotionConfig reducedMotion="user">
                <div className="app">
                    <a className="skip-link" href="#main">Skip to content</a>
                    {/* <ThemeToggle /> */}
                    {/* New pages start at the top (or at a #section); Back restores the old position */}
                    <ScrollRestoration />
                    <LegacyProjectRedirect />
                    <Navbar />
                    <main id="main">
                        <Outlet />
                    </main>

                    <footer className="site-footer">
                        <div className="container">
                            <p>© {new Date().getFullYear()} {profile.name}</p>
                            <nav aria-label="Footer">
                                <Link to="/work" viewTransition>Work</Link>
                                <Link to="/achievements" viewTransition>Achievements</Link>
                                <Link to="/about" viewTransition>About</Link>
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
