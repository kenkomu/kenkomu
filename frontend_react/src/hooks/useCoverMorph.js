import { useViewTransitionState } from 'react-router-dom';

// The element whose project cover started the last morph. A project can appear twice on a page
// (hero fan and project grid), and the browser abandons a view transition if two elements share
// a view-transition-name, so only the clicked one takes part, both on the way in and on Back.
let source = null;

// Props for a cover image that should morph into the project page's hero.
// fallback: may take part when no click started the transition (e.g. after a direct page load);
// only safe where each project appears once.
const useCoverMorph = (slug, id, { fallback = false } = {}) => {
  const transitioning = useViewTransitionState(`/work/${slug}`);
  const active = transitioning && (source === id || (source === null && fallback));
  return {
    morphStyle: active ? { viewTransitionName: 'project-cover' } : undefined,
    markSource: () => { source = id; },
  };
};

export default useCoverMorph;
