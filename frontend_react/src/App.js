// src/App.js
import React from 'react';
import { About, Footer, Header, Skills, Work } from './container';
import { Navbar } from './components';
import { ThemeProvider } from './context/ThemeContext';
// Dark mode is disabled for now — re-enable by restoring this import,
// the <ThemeToggle /> below, and getInitialTheme() in ThemeContext.js
// import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.scss';

const App = () => {
    return (
        <ThemeProvider>
            <div className="app">
                {/* <ThemeToggle /> */}
                <Navbar />
                <Header />
                <About />
                <Work />
                <Skills />
                {/* <Testimonial /> */}
                <Footer />

                <footer className="copyright">
                    <p className="p-text">© 2026 Kenneth</p>
                    <p className="p-text">All rights reserved</p>
                </footer>
            </div>
        </ThemeProvider>
    )
}

export default App;