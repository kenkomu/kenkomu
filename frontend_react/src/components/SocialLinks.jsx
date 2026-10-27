import React from 'react';
import { BsGithub, BsLinkedin, BsTwitterX } from 'react-icons/bs';
import profile from '../constants/profile';

const icons = { GitHub: BsGithub, X: BsTwitterX, LinkedIn: BsLinkedin };

const SocialLinks = ({ className = '' }) => (
  <ul className={`social-links ${className}`}>
    {profile.socials.map(({ label, href }) => {
      const Icon = icons[label];
      return (
        <li key={label}>
          <a className="icon-btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on ${label}`}>
            {Icon ? <Icon aria-hidden="true" /> : label}
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialLinks;
