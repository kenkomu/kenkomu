// src/App.js
import React from 'react';
import { MotionConfig } from 'framer-motion';
import { About, Footer, Header, Skills, Work } from './container';
import { Navbar } from './components';
import { ThemeProvider } from './context/ThemeContext';
import profile from './constants/profile';
// Dark mode is disabled for now — re-enable by restoring this import,
// the <ThemeToggle /> below, and getInitialTheme() in ThemeContext.js
// import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.scss';

const App = () => {
    return (
        <ThemeProvider>
            <MotionConfig reducedMotion="user">
                <div className="app">
                    <a className="skip-link" href="#main">Skip to content</a>
                    {/* <ThemeToggle /> */}
                    <Navbar />
                    <main id="main">
                        <Header />
                        <Work />
                        <About />
                        <Skills />
                        {/* <Testimonial /> */}
                        <Footer />
                    </main>

                    <footer className="site-footer">
                        <div className="container">
                            <p>© {new Date().getFullYear()} {profile.name}</p>
                            <a href="#home">Back to top ↑</a>
                        </div>
                    </footer>
                </div>
            </MotionConfig>
        </ThemeProvider>
    )
}

export default App;
