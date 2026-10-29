// Smoothly scroll to a section on the current page (e.g. #contact), unless the visitor prefers
// reduced motion. Page-wide smooth scrolling is off because it would also animate the router's
// jump to the top of each new page.
const scrollToSection = (event, id) => {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  window.history.replaceState(window.history.state, '', `#${id}`);
};

export default scrollToSection;
