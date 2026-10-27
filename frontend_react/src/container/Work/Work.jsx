import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

import useWorks, { workSlug } from '../../hooks/useWorks';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import './Work.scss';

const CATEGORY_ORDER = ['Blockchain App', 'Web App', 'Mobile App', 'UI/UX'];
const PAGE_SIZE = 6;
const MAX_FEATURED = 3;

const categoryLabel = (tag) => tag.replace(/ App$/, '');

const slugFromHash = () => {
  const match = window.location.hash.match(/^#work\/([\w-]+)$/);
  return match ? match[1] : null;
};

const matchesQuery = (work, q) =>
  [work.title, work.description, work.role, work.client, ...(work.tags || []), ...(work.stack || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(q);

const Work = () => {
  const { works, loading, error } = useWorks();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openSlug, setOpenSlug] = useState(slugFromHash);
  // True when opening the panel added a history entry, so closing it can go back
  const pushedRef = useRef(false);
  const openSlugRef = useRef(openSlug);
  openSlugRef.current = openSlug;

  const q = query.trim().toLowerCase();
  const isBrowsing = filter === 'All' && !q;

  const categories = useMemo(() => {
    const counts = {};
    works.forEach((w) => (w.tags || []).forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    const known = CATEGORY_ORDER.filter((t) => counts[t]);
    const other = Object.keys(counts).filter((t) => !CATEGORY_ORDER.includes(t)).sort();
    return [...known, ...other].map((tag) => ({ tag, count: counts[tag] }));
  }, [works]);

  const results = useMemo(
    () => works.filter((w) => (filter === 'All' || (w.tags || []).includes(filter)) && (!q || matchesQuery(w, q))),
    [works, filter, q]
  );

  // Featured projects get their own row only in the unfiltered view
  const featured = isBrowsing ? works.filter((w) => w.featured).slice(0, MAX_FEATURED) : [];
  const listed = results.filter((w) => !featured.includes(w));
  const ordered = [...featured, ...listed];

  useEffect(() => setVisible(PAGE_SIZE), [filter, q]);

  useEffect(() => {
    const sync = () => {
      pushedRef.current = false;
      setOpenSlug(slugFromHash());
    };
    // hashchange also catches #work/<slug> links typed or followed from elsewhere
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const activeWork = openSlug ? works.find((w) => workSlug(w) === openSlug) : null;
  const navList = activeWork && ordered.includes(activeWork) ? ordered : works;
  const activeIndex = activeWork ? navList.indexOf(activeWork) : -1;

  // Stable so the memoized cards don't re-render when the panel opens or closes
  const openProject = useCallback((work) => {
    const hash = `#work/${workSlug(work)}`;
    if (openSlugRef.current) {
      window.history.replaceState(null, '', hash);
    } else {
      window.history.pushState(null, '', hash);
      pushedRef.current = true;
    }
    setOpenSlug(workSlug(work));
  }, []);

  // Requests from elsewhere on the page, like the hero's project covers
  useEffect(() => {
    const onRequest = (e) => openProject(e.detail);
    window.addEventListener('portfolio:open-project', onRequest);
    return () => window.removeEventListener('portfolio:open-project', onRequest);
  }, [openProject]);

  const closeProject = () => {
    if (pushedRef.current) {
      window.history.back();
    } else {
      window.history.replaceState(null, '', '#work');
      setOpenSlug(null);
    }
  };

  const resetFilters = () => {
    setFilter('All');
    setQuery('');
  };

  const renderBody = () => {
    if (loading) {
      return (
        <div className='work__featured work__featured--3' aria-hidden='true'>
          {[0, 1, 2].map((i) => <div key={i} className={`work-card work-card--skeleton ${i === 0 ? 'work-card--lg' : ''}`} />)}
        </div>
      );
    }

    if (error) {
      return (
        <div className='work__empty'>
          <p>Projects couldn't be loaded right now.</p>
          <a className='btn btn--ghost' href='https://github.com/kenkomu' target='_blank' rel='noopener noreferrer'>See my GitHub instead</a>
        </div>
      );
    }

    return (
      <>
        {featured.length > 0 && (
          <div className={`work__featured work__featured--${featured.length}`}>
            {featured.map((w, i) => (
              <ProjectCard key={w._id} work={w} size={i === 0 ? 'lg' : 'md'} onOpen={openProject} />
            ))}
          </div>
        )}

        {isBrowsing && featured.length > 0 && listed.length > 0 && <h3 className='work__subhead'>More projects</h3>}

        <div className='work__grid'>
          <AnimatePresence mode='popLayout'>
            {listed.slice(0, visible).map((w) => (
              <ProjectCard key={w._id} work={w} onOpen={openProject} />
            ))}
          </AnimatePresence>
        </div>

        {results.length === 0 && (
          <div className='work__empty'>
            <p>No projects match {q ? <>“{query.trim()}”</> : 'this filter'}.</p>
            <button type='button' className='btn btn--ghost' onClick={resetFilters}>Show all projects</button>
          </div>
        )}

        {listed.length > visible && (
          <div className='work__more'>
            <button type='button' className='btn btn--ghost' onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Show more <span className='work__count'>{listed.length - visible}</span>
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <section id='work' className='section work'>
      <div className='container'>
        <div className='section-head'>
          <div>
            <p className='eyebrow'>Selected work</p>
            <h2 className='section-title'>Things I've built</h2>
          </div>
          <p className='section-lead'>
            Payments, wallets and marketplaces, plus the internal tools that keep a fibre network running.
          </p>
        </div>

        <div className='work__toolbar'>
          <div className='work__filters' role='group' aria-label='Filter projects by category'>
            {[{ tag: 'All', count: works.length }, ...categories].map(({ tag, count }) => (
              <button
                key={tag}
                type='button'
                className={`work__filter ${filter === tag ? 'is-active' : ''}`}
                aria-pressed={filter === tag}
                onClick={() => setFilter(tag)}
              >
                {tag === 'All' ? 'All' : categoryLabel(tag)}
                <span className='work__count'>{count}</span>
              </button>
            ))}
          </div>

          <div className='work__search'>
            <HiMagnifyingGlass aria-hidden='true' />
            <label htmlFor='work-search' className='sr-only'>Search projects</label>
            <input
              id='work-search'
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search by name or tech'
              autoComplete='off'
            />
            {query && (
              <button type='button' className='work__search-clear' onClick={() => setQuery('')} aria-label='Clear search'>
                <HiXMark aria-hidden='true' />
              </button>
            )}
          </div>
        </div>

        <p className='sr-only' aria-live='polite'>
          {!loading && !isBrowsing ? `${results.length} ${results.length === 1 ? 'project' : 'projects'} found` : ''}
        </p>

        {renderBody()}
      </div>

      <AnimatePresence>
        {activeWork && (
          <ProjectModal
            key='project-modal'
            work={activeWork}
            prev={navList[activeIndex - 1]}
            next={navList[activeIndex + 1]}
            onNavigate={openProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
