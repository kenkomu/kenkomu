import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import PageHeader from '../components/PageHeader';
import usePageMeta from '../hooks/usePageMeta';

const NotFoundPage = ({ title = 'Page not found', message = "There's nothing at this address." }) => {
  usePageMeta(title);
  return (
    <section className='section page-top not-found'>
      <div className='container'>
        <PageHeader eyebrow='404' title={title} lead={message}>
          <div className='not-found__actions'>
            <Link className='btn btn--primary' to='/work'>Browse my work <HiArrowRight aria-hidden='true' /></Link>
            <Link className='btn btn--ghost' to='/'>Go home</Link>
          </div>
        </PageHeader>
      </div>
    </section>
  );
};

export default NotFoundPage;
