// src/App.js
import React from 'react';
import { About, Footer, Header, Skills, Work } from './container';
import { Navbar } from './components';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.scss';

const App = () => {
    return (
        <ThemeProvider>
            <div className="app">
                <ThemeToggle />
                <Navbar />
                <Header />
                <About />
                <Work />
                <Skills />
                {/* <Testimonial /> */}
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default App;