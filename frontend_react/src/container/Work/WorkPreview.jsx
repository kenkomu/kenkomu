import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';

import useWorks from '../../hooks/useWorks';
import ProjectCard from './ProjectCard';
import { FeaturedRow, MAX_FEATURED, WorkError, WorkSkeleton } from './Work';
import './Work.scss';

const PREVIEW_SIZE = 6;

// Home page: the featured projects plus the newest others, linking to /work for the rest
const WorkPreview = () => {
  const { works, loading, error } = useWorks();
  const featured = works.filter((w) => w.featured).slice(0, MAX_FEATURED);
  const latest = works.filter((w) => !featured.includes(w)).slice(0, PREVIEW_SIZE - featured.length);
  const numberOf = (w) => works.indexOf(w) + 1;

  return (
    <section id='work' className='section work'>
      <div className='container'>
        <div className='section-head'>
          <div>
            <p className='eyebrow'><span className='eyebrow__num'>01</span>Selected work</p>
            <h2 className='section-title'>Things I've <em>built</em></h2>
          </div>
          <p className='section-lead'>
            Payments, wallets and marketplaces, plus the internal tools that keep a fibre network running.
          </p>
        </div>

        {loading && <WorkSkeleton />}
        {error && <WorkError />}
        {!loading && !error && (
          <>
            {featured.length > 0 && <FeaturedRow works={featured} numberOf={numberOf} />}
            {latest.length > 0 && (
              <div className='work__grid work__grid--after-featured'>
                {latest.map((w) => <ProjectCard key={w._id} work={w} number={numberOf(w)} />)}
              </div>
            )}
            <div className='work__more'>
              <Link className='btn btn--primary' to='/work' viewTransition>
                See all {works.length} projects <HiArrowRight aria-hidden='true' />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WorkPreview;
