import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { HiCheck, HiEnvelope, HiOutlineClipboard, HiPhone } from 'react-icons/hi2';
import { client } from '../../client';
import profile from '../../constants/profile';
import SocialLinks from '../../components/SocialLinks';
import './Footer.scss';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, message }) => {
  const errors = {};
  if (!name.trim()) errors.name = 'Please tell me your name.';
  if (!email.trim()) errors.email = 'I need an email to reply to.';
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'That email address doesn’t look right.';
  if (!message.trim()) errors.message = 'Write a short message.';
  return errors;
};

const Field = ({ id, label, error, children }) => (
  <div className={`contact__field ${error ? 'has-error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    {children}
    {error && <p className='contact__error' id={`${id}-error`}>{error}</p>}
  </div>
);

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name: field, value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success('Email copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(formData);
    setErrors(found);
    const firstInvalid = ['name', 'email', 'message'].find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
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
      })
      .catch(() => {
        setLoading(false);
        toast.error('Something went wrong. Please email me directly.');
      });
  };

  const inputProps = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: formData[field],
    onChange: handleChangeInput,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <section id='contact' className='section contact'>
      <Toaster position='bottom-center' toastOptions={{ style: { borderRadius: '999px', fontWeight: 500 } }} />
      <div className='container'>
        <div className='contact__panel'>
          <div className='contact__intro'>
            <p className='eyebrow'>Contact</p>
            <h2 className='contact__title'>Have a project in mind? Let’s build it.</h2>
            <p className='contact__lead'>
              Payments, a smart contract, a mobile app or an internal tool. Tell me what you’re working on and I’ll get back to you within a couple of days.
            </p>

            <ul className='contact__channels'>
              <li>
                <HiEnvelope aria-hidden='true' />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button type='button' className='contact__copy' onClick={copyEmail} aria-label='Copy email address'>
                  {copied ? <HiCheck aria-hidden='true' /> : <HiOutlineClipboard aria-hidden='true' />}
                </button>
              </li>
              <li>
                <HiPhone aria-hidden='true' />
                <a href={profile.phone.href}>{profile.phone.display}</a>
              </li>
            </ul>

            <SocialLinks className='contact__socials' />
          </div>

          <div className='contact__card'>
            {!isFormSubmitted ? (
              <form className='contact__form' onSubmit={handleSubmit} noValidate>
                <Field id='contact-name' label='Name' error={errors.name}>
                  <input type='text' autoComplete='name' {...inputProps('name')} />
                </Field>
                <Field id='contact-email' label='Email' error={errors.email}>
                  <input type='email' autoComplete='email' inputMode='email' {...inputProps('email')} />
                </Field>
                <Field id='contact-message' label='Message' error={errors.message}>
                  <textarea rows='5' {...inputProps('message')} />
                </Field>
                <button type='submit' className='btn btn--primary contact__submit' disabled={loading}>
                  {loading ? 'Sending…' : 'Send message'}
                </button>
              </form>
            ) : (
              <div className='contact__success' role='status'>
                <span className='contact__success-icon' aria-hidden='true'><HiCheck /></span>
                <h3>Thanks, {name.trim().split(' ')[0]}!</h3>
                <p>Your message is in. I’ll reply to {email.trim()} soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
