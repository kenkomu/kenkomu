// Runs after `react-scripts build` (see the "build" script in package.json).
//
// Link previews (LinkedIn, X, WhatsApp, Slack) and some crawlers don't run JavaScript, so every
// page needs its own title, description, image and canonical URL in the HTML itself. This writes
// one HTML file per route (work.html, work/<slug>.html, ...) from the built index.html. Vercel
// serves those files directly and falls back to 200.html, the plain app shell, for anything else
// (see vercel.json). Project pages come from Sanity, so new projects get their own file on the
// next deploy; until then they still work through the fallback.
const fs = require('fs');
const path = require('path');
const pages = require('../src/constants/pageMeta.json');

const SITE = 'https://kenkomu.com';
const BUILD = path.resolve(process.env.BUILD_PATH || path.join(__dirname, '..', 'build'));
const PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID;

// Keep in sync with name, role and socials in src/constants/profile.js
const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Kenneth Komu',
  url: SITE,
  image: `${SITE}/og/about.jpg`,
  jobTitle: 'Full-stack and smart-contract engineer',
  address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  sameAs: [
    'https://github.com/kenkomu',
    'https://x.com/kikis216',
    'https://www.linkedin.com/in/kenneth-njoroge-2b2542211/',
  ],
};

const escape = (value = '') =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Tags that differ per page; everything else in the template (icons, og:site_name, twitter:site...) is shared
const PER_PAGE_TAGS = [
  /<title>[\s\S]*?<\/title>/,
  /<meta[^>]+name="description"[^>]*>/g,
  /<meta[^>]+property="og:(?:type|title|description|image|image:width|image:height|image:alt)"[^>]*>/g,
  /<meta[^>]+name="twitter:(?:title|description|image)"[^>]*>/g,
];

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
const shell = PER_PAGE_TAGS.reduce((html, pattern) => html.replace(pattern, ''), template);

const renderPage = ({ route, title, description, image, imageAlt, type = 'website', jsonLd }) => {
  const url = `${SITE}${route === '/' ? '' : route}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE}${image}`;
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${escape(title)}">`,
    `<meta property="og:description" content="${escape(description)}">`,
    `<meta property="og:image" content="${escape(absoluteImage)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${escape(imageAlt || title)}">`,
    `<meta name="twitter:title" content="${escape(title)}">`,
    `<meta name="twitter:description" content="${escape(description)}">`,
    `<meta name="twitter:image" content="${escape(absoluteImage)}">`,
  ];
  if (jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`);
  }
  return shell.replace('</head>', `${tags.join('')}</head>`);
};

const write = (route, html) => {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  const target = path.join(BUILD, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
};

const fetchProjects = async () => {
  if (!PROJECT_ID) {
    console.warn('prerender: REACT_APP_SANITY_PROJECT_ID is not set, skipping project pages');
    return [];
  }
  const query = '*[_type == "works" && defined(slug.current)]{ title, description, "slug": slug.current, "image": imgUrl.asset->url, _updatedAt }';
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v2025-02-19/data/query/production?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()).result || [];
  } catch (err) {
    // A failed fetch shouldn't fail the deploy: project pages still work through the app shell
    console.warn(`prerender: could not load projects from Sanity (${err.message}), skipping project pages`);
    return [];
  }
};

const main = async () => {
  // The fallback shell must be written before index.html is replaced with the home page
  fs.writeFileSync(path.join(BUILD, '200.html'), template);

  const today = new Date().toISOString().slice(0, 10);
  const sitemap = [];

  write('/', renderPage({
    route: '/', ...pages.home,
    jsonLd: { '@context': 'https://schema.org', '@graph': [{ '@type': 'WebSite', name: 'Kenneth Komu', url: SITE, publisher: { '@id': PERSON['@id'] } }, PERSON] },
  }));
  write('/work', renderPage({ route: '/work', ...pages.work }));
  write('/achievements', renderPage({ route: '/achievements', ...pages.achievements }));
  write('/about', renderPage({
    route: '/about', ...pages.about, type: 'profile',
    jsonLd: { '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${SITE}/about`, mainEntity: PERSON },
  }));
  ['/', '/work', '/achievements', '/about'].forEach((route) => sitemap.push({ route, lastmod: today }));

  const projects = await fetchProjects();
  projects.forEach((p) => {
    const route = `/work/${p.slug}`;
    write(route, renderPage({
      route,
      title: `${p.title} · Kenneth Komu`,
      description: p.description || pages.work.description,
      image: p.image ? `${p.image}?w=1200&h=630&fit=crop&fm=jpg&q=82` : pages.work.image,
      imageAlt: `${p.title}, a project by Kenneth Komu`,
      type: 'article',
    }));
    sitemap.push({ route, lastmod: (p._updatedAt || today).slice(0, 10) });
  });

  fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemap.map(({ route, lastmod }) => `  <url><loc>${SITE}${route === '/' ? '' : route}</loc><lastmod>${lastmod}</lastmod></url>`),
    '</urlset>',
    '',
  ].join('\n'));

  // Preview deployments get an amber favicon, so a preview tab is never mistaken for the live site
  const previewIcon = path.join(BUILD, 'favicon-preview.svg');
  if (process.env.VERCEL_ENV === 'preview') fs.copyFileSync(previewIcon, path.join(BUILD, 'favicon.svg'));
  fs.rmSync(previewIcon, { force: true });

  console.log(`prerender: wrote ${4 + projects.length} pages and sitemap.xml`);
};

main().catch((err) => {
  console.error('prerender failed:', err);
  process.exit(1);
});
