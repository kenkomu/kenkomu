import React from 'react';

const NavigationDots = ({ active }) => (
    <div className="app__navigation">
        {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item, index) => (
            <a
                href={`#${item}`}
                key={item + index}
                className='app__navigation-dot'
                style={active === item ? { backgroundColor: '#313BAC' } : {}}
                aria-label={item}
            >
                {/* <span className="sr-only">{item}</span> */}
            </a>
        ))}
    </div>
);

export default NavigationDots;