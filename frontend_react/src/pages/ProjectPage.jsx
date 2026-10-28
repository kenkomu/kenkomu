import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import { HiArrowLeft, HiArrowRight, HiArrowUpRight, HiCheck } from 'react-icons/hi2';

import { imageUrl } from '../client';
import useWorks, { workSlug } from '../hooks/useWorks';
import useAchievements from '../hooks/useAchievements';
import usePageMeta from '../hooks/usePageMeta';
import { StatusBadge } from '../container/Work/ProjectCard';
import { formatMonth } from '../container/Achievements/AchievementCard';
import { Footer } from '../container';
import NotFoundPage from './NotFoundPage';
import './ProjectPage.scss';

// Previous reads "← thumbnail title", next reads "title thumbnail →"
const NeighbourLink = ({ work, direction }) => {
  const isPrev = direction === 'prev';
  const thumb = work.imgUrl && <img src={imageUrl(work.imgUrl, 320, 200)} alt='' width='160' height='100' loading='lazy' />;
  const label = (
    <span>
      <small>{isPrev ? 'Previous' : 'Next'}</small>
      {work.title}
    </span>
  );
  return (
    <Link to={`/work/${workSlug(work)}`} className={`project__neighbour project__neighbour--${direction}`}>
      {isPrev && <HiArrowLeft aria-hidden='true' />}
      {isPrev ? <>{thumb}{label}</> : <>{label}{thumb}</>}
      {!isPrev && <HiArrowRight aria-hidden='true' />}
    </Link>
  );
};

const ProjectPage = () => {
  const { slug } = useParams();
  const { works, loading, error } = useWorks();
  const { achievements } = useAchievements();

  const index = works.findIndex((w) => workSlug(w) === slug);
  const work = works[index];
  usePageMeta(work?.title || (loading ? 'Work' : 'Project not found'), work?.description);

  if (loading) {
    return (
      <section className='section page-top' aria-busy='true'>
        <div className='container'><div className='project__skeleton' /></div>
      </section>
    );
  }
  if (error || !work) {
    return <NotFoundPage title='Project not found' message="That project doesn't exist, or it has moved." />;
  }

  const prev = works[index - 1];
  const next = works[index + 1];
  const recognition = achievements.filter((a) => a.project?.slug === slug);
  const meta = [work.tags?.[0]?.replace(/ App$/, ''), work.year].filter(Boolean).join(' · ');

  return (
    <>
      <article className='section page-top project'>
        <div className='container'>
          <Link to='/work' className='project__back'><HiArrowLeft aria-hidden='true' /> All work</Link>

          <header className='project__head'>
            <p className='eyebrow'>{meta}</p>
            <div className='project__title-row'>
              <h1>{work.title}</h1>
              <StatusBadge status={work.status} />
            </div>
            {work.description && <p className='project__desc'>{work.description}</p>}
            {(work.projectLink || work.codeLink) && (
              <div className='project__actions'>
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
          </header>

          {work.imgUrl && (
            <img className='project__cover' src={imageUrl(work.imgUrl, 1600, 1000)} alt={`${work.title} preview`} width='1600' height='1000' />
          )}

          <div className='project__body'>
            <div className='project__main'>
              {work.highlights?.length > 0 && (
                <section className='project__section'>
                  <h2>Highlights</h2>
                  <ul className='project__highlights'>
                    {work.highlights.map((item) => (
                      <li key={item}><HiCheck aria-hidden='true' /> {item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {work.gallery?.length > 0 && (
                <section className='project__section'>
                  <h2>Screens</h2>
                  <div className='project__gallery'>
                    {work.gallery.map((img, i) => (
                      <img key={img._key || i} src={imageUrl(img, 900)} alt={`${work.title} screen ${i + 1}`} loading='lazy' />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className='project__aside'>
              <dl className='project__facts'>
                {work.role && <div><dt>Role</dt><dd>{work.role}</dd></div>}
                {work.client && <div><dt>Built for</dt><dd>{work.client}</dd></div>}
                {work.year && <div><dt>Year</dt><dd>{work.year}</dd></div>}
                <div><dt>Source</dt><dd>{work.codeLink ? 'Open source' : 'Private repository'}</dd></div>
              </dl>

              {work.stack?.length > 0 && (
                <section className='project__section'>
                  <h2>Stack</h2>
                  <ul className='project__stack'>
                    {work.stack.map((item) => <li key={item} className='chip'>{item}</li>)}
                  </ul>
                </section>
              )}

              {recognition.length > 0 && (
                <section className='project__section'>
                  <h2>Recognition</h2>
                  <ul className='project__recognition'>
                    {recognition.map((a) => (
                      <li key={a._id}>
                        <Link to='/achievements'>{a.title}</Link>
                        <span>{[a.result, a.date && formatMonth(a.date)].filter(Boolean).join(' · ')}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </div>

          {(prev || next) && (
            <nav className='project__nav' aria-label='More projects'>
              {prev ? <NeighbourLink work={prev} direction='prev' /> : <span />}
              {next && <NeighbourLink work={next} direction='next' />}
            </nav>
          )}
        </div>
      </article>
      <Footer />
    </>
  );
};

export default ProjectPage;
