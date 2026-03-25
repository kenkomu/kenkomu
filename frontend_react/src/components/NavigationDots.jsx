import React from 'react';

const NavigationDots = ({ active }) => (
    <div className="app__navigation">
        {['home', 'about', 'work', 'skills', 'contact'].map((item) => (
            <a
                href={`#${item}`}
                key={item}
                className={`app__navigation-dot${active === item ? ' active' : ''}`}
                aria-label={`Navigate to ${item} section`}
            />
        ))}
    </div>
);

export default NavigationDots;