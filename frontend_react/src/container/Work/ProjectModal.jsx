import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { HiArrowLeft, HiArrowRight, HiArrowUpRight, HiCheck, HiXMark } from 'react-icons/hi2';
import { imageUrl } from '../../client';
import { StatusBadge } from './ProjectCard';

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])';

const ProjectModal = ({ work, prev, next, onNavigate, onClose }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Lock page scroll while open and hand focus back to the card afterwards
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      body.style.overflow = saved.overflow;
      body.style.paddingRight = saved.paddingRight;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [work._id]);

  const meta = [work.tags?.[0], work.year].filter(Boolean).join(' · ');

  return (
    <motion.div
      className='project-modal'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className='project-modal__backdrop' onClick={onClose} aria-hidden='true' />

      <motion.div
        ref={panelRef}
        className='project-modal__panel'
        role='dialog'
        aria-modal='true'
        aria-labelledby='project-modal-title'
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
        transition={{ type: 'spring', damping: 34, stiffness: 320 }}
      >
        <div className='project-modal__bar'>
          <p className='eyebrow'>{meta}</p>
          <button ref={closeRef} type='button' className='icon-btn' onClick={onClose} aria-label='Close project details'>
            <HiXMark aria-hidden='true' />
          </button>
        </div>

        <div className='project-modal__content'>
          {work.imgUrl && (
            <img className='project-modal__cover' src={imageUrl(work.imgUrl, 1400, 875)} alt={`${work.title} preview`} width='1400' height='875' />
          )}

          <div className='project-modal__heading'>
            <h2 id='project-modal-title'>{work.title}</h2>
            <StatusBadge status={work.status} />
          </div>
          {work.description && <p className='project-modal__desc'>{work.description}</p>}

          {(work.projectLink || work.codeLink) && (
            <div className='project-modal__actions'>
              {work.projectLink && (
                <a className='btn btn--primary' href={work.projectLink} target='_blank' rel='noopener noreferrer'>
                  Visit site <HiArrowUpRight aria-hidden='true' />
                </a>
              )}
              {work.codeLink && (
                <a className='btn btn--ghost' href={work.codeLink} target='_blank' rel='noopener noreferrer'>
                  <AiFillGithub aria-hidden='true' /> View code
                </a>
              )}
            </div>
          )}

          {(work.role || work.client || work.year) && (
            <dl className='project-modal__facts'>
              {work.role && <div><dt>Role</dt><dd>{work.role}</dd></div>}
              {work.client && <div><dt>Built for</dt><dd>{work.client}</dd></div>}
              {work.year && <div><dt>Year</dt><dd>{work.year}</dd></div>}
              {!work.codeLink && <div><dt>Source</dt><dd>Private repository</dd></div>}
            </dl>
          )}

          {work.highlights?.length > 0 && (
            <section className='project-modal__section'>
              <h3>Highlights</h3>
              <ul className='project-modal__highlights'>
                {work.highlights.map((item) => (
                  <li key={item}><HiCheck aria-hidden='true' /> {item}</li>
                ))}
              </ul>
            </section>
          )}

          {work.stack?.length > 0 && (
            <section className='project-modal__section'>
              <h3>Stack</h3>
              <ul className='project-modal__stack'>
                {work.stack.map((item) => <li key={item} className='chip'>{item}</li>)}
              </ul>
            </section>
          )}

          {work.gallery?.length > 0 && (
            <section className='project-modal__section'>
              <h3>Screens</h3>
              <div className='project-modal__gallery'>
                {work.gallery.map((img, i) => (
                  <img key={img._key || i} src={imageUrl(img, 640)} alt={`${work.title} screen ${i + 1}`} loading='lazy' />
                ))}
              </div>
            </section>
          )}
        </div>

        {(prev || next) && (
          <nav className='project-modal__nav' aria-label='Other projects'>
            {prev ? (
              <button type='button' className='project-modal__nav-btn' onClick={() => onNavigate(prev)}>
                <HiArrowLeft aria-hidden='true' />
                <span><small>Previous</small>{prev.title}</span>
              </button>
            ) : <span />}
            {next && (
              <button type='button' className='project-modal__nav-btn project-modal__nav-btn--next' onClick={() => onNavigate(next)}>
                <span><small>Next</small>{next.title}</span>
                <HiArrowRight aria-hidden='true' />
              </button>
            )}
          </nav>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
