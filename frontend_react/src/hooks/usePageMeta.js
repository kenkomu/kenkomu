import { useEffect } from 'react';
import profile from '../constants/profile';

// The description in public/index.html, used for pages that don't set their own
const DEFAULT_DESCRIPTION = document.querySelector('meta[name="description"]')?.content || '';

// Sets the browser tab title and meta description for the current page
const usePageMeta = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · ${profile.role}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description || DEFAULT_DESCRIPTION);
  }, [title, description]);
};

export default usePageMeta;
