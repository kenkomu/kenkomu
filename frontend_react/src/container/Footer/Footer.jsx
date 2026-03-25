import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
        toast.success('Message sent! I\'ll get back to you soon.');
      })
      .catch(() => {
        setLoading(false);
        toast.error('Something went wrong. Please try again or email me directly.');
      });
  };

  return (
    <>
      <Toaster position="top-center" />
      <h2 className="head-text">Take a coffee & <span>chat with me</span></h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="" aria-hidden="true" />
          <a href="mailto:komukenneth216@gmail.com" className="p-text">komukenneth216@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="" aria-hidden="true" />
          <a href="tel:+254112285105" className="p-text">+254 (112) 285-105</a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <label htmlFor="footer-name" className="sr-only">Your Name</label>
            <input
              id="footer-name"
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChangeInput}
              autoComplete="name"
            />
          </div>
          <div className="app__flex">
            <label htmlFor="footer-email" className="sr-only">Your Email</label>
            <input
              id="footer-email"
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="footer-message" className="sr-only">Your Message</label>
            <textarea
              id="footer-message"
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button
            type="button"
            className="p-text"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      ) : (
        <div className="app__footer-success">
          <h3 className="head-text">Thank you for getting in touch!</h3>
          <p className="p-text">I'll get back to you as soon as possible.</p>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
