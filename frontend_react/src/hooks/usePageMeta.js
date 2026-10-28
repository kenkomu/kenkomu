import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pages from '../constants/pageMeta.json';

const SITE = 'https://kenkomu.com';

const setHeadTag = (selector, create, attr, value) => {
  let el = document.head.querySelector(selector);
  if (value == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

// Keeps the tab title, description and canonical URL in step with client-side navigation.
// The HTML each route is first served with already has these (scripts/prerender.js).
// noindex: for pages that shouldn't be in search results, like the 404.
const usePageMeta = (title, description, { noindex = false } = {}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title || pages.home.title;
    setHeadTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }),
      'content', description || pages.home.description);
    setHeadTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      'href', noindex ? null : `${SITE}${pathname === '/' ? '' : pathname}`);
    setHeadTag('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }),
      'content', noindex ? 'noindex' : null);
  }, [title, description, noindex, pathname]);
};

export default usePageMeta;
