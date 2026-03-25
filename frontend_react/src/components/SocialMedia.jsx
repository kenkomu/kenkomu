import React from 'react';
import { BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs';

const SocialMedia = () => {
    return (
        <div className='app__social'>
            <a href="https://x.com/kikis216" target="_blank" rel="noopener noreferrer" aria-label="Kenneth on X (Twitter)">
                <div><BsTwitter /></div>
            </a>
            <a href="https://github.com/kenkomu" target="_blank" rel="noopener noreferrer" aria-label="Kenneth on GitHub">
                <div><BsGithub /></div>
            </a>
            <a href="https://www.linkedin.com/in/kenneth-njoroge-2b2542211/" target="_blank" rel="noopener noreferrer" aria-label="Kenneth on LinkedIn">
                <div><BsLinkedin /></div>
            </a>
        </div>
    )
}

export default SocialMedia;