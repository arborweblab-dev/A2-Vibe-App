// scripts/generate-guides.mjs
// Runs AFTER `vite build`. Reads src/data/journalData.js and writes one static,
// crawlable HTML page per guide into dist/guide/<slug>/index.html, plus a guide
// index page (dist/guide/index.html) and a refreshed dist/sitemap.xml.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE = 'https://a2vibe.com';
const GA_ID = 'G-5SKGDHGWWZ';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

if (!fs.existsSync(DIST)) {
  throw new Error('dist/ not found. Run "vite build" before generate-guides.');
}

const dataUrl = pathToFileURL(path.join(ROOT, 'src/data/journalData.js')).href;
const { journalData } = await import(dataUrl);

/* ---------- helpers ---------- */
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stripHtml = (s = '') => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const abs = (u) =>
  !u ? `${SITE}/og-image.png` : /^https?:\/\//.test(u) ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`;

const clip = (s, n = 155) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');

const ld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const isIsoDate = (d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d);
const today = new Date().toISOString().slice(0, 10);

/* ---------- build the post list ---------- */
const used = new Set();
const posts = (journalData || [])
  .filter((p) => p && p.title && (p.longDesc || p.excerpt))
  .map((p) => {
    let slug = p.slug ? slugify(p.slug) : slugify(p.title);
    if (!slug) slug = slugify(p.id || 'guide');
    let unique = slug, i = 2;
    while (used.has(unique)) unique = `${slug}-${i++}`;
    used.add(unique);
    return {
      ...p,
      slug: unique,
      url: `${SITE}/guide/${unique}/`,
      description: clip(stripHtml(p.excerpt || p.longDesc)),
      bodyHtml: p.longDesc || `<p>${esc(p.excerpt)}</p>`,
      date: isIsoDate(p.date) ? p.date : null,
    };
  });

/* ---------- shared page shell ---------- */
const css = `
:root{--bg:#0a121e;--card:#151f2e;--text:#f1f5f9;--muted:#94a3b8;--accent:#ffcb05;--link:#38bdf8;--border:#1e293b;--navy:#00274c}
@media (prefers-color-scheme:light){:root{--bg:#f8fafc;--card:#ffffff;--text:#0f172a;--muted:#475569;--accent:#b45309;--link:#0369a1;--border:#e2e8f0}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.7}
a{color:var(--link)}
.wrap{max-width:720px;margin:0 auto;padding:0 20px}
header.site{position:sticky;top:0;z-index:10;background:var(--navy);border-bottom:1px solid var(--border)}
header.site .wrap{display:flex;align-items:center;justify-content:space-between;height:60px}
.brand{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-family:'Outfit',system-ui,sans-serif;font-weight:800;letter-spacing:.02em}
.brand img{border-radius:8px}
nav{display:flex;align-items:center;gap:16px;font-size:14px}
nav a{color:#e2e8f0;text-decoration:none}
nav a.cta,.btn{background:#ffcb05;color:#000;font-weight:800;padding:9px 16px;border-radius:12px;text-decoration:none;display:inline-block}
.kicker{color:var(--accent);font-weight:800;text-transform:uppercase;letter-spacing:.14em;font-size:12px;margin:32px 0 0}
h1{font-family:'Outfit',system-ui,sans-serif;font-size:clamp(30px,6vw,44px);line-height:1.12;margin:8px 0 12px}
h2{font-family:'Outfit',system-ui,sans-serif}
.meta{color:var(--muted);font-size:14px;margin:0 0 20px}
.hero{width:100%;height:auto;border-radius:24px;margin:8px 0 24px;display:block}
.content h3{font-family:'Outfit',system-ui,sans-serif;font-size:24px;margin:28px 0 8px}
.content p{margin:0 0 1rem}
.content img{max-width:100%;height:auto;border-radius:16px}
.box{background:var(--card);border:1px solid var(--border);border-radius:24px;padding:22px;margin:36px 0}
.more ul{list-style:none;padding:0;margin:0;display:grid;gap:12px}
.more li a{display:block;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:14px 16px;text-decoration:none;color:var(--text);font-weight:700}
.more li span{display:block;color:var(--muted);font-weight:400;font-size:14px;margin-top:2px}
.cards{display:grid;gap:16px;margin:24px 0 40px}
.card{display:flex;gap:14px;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:12px;text-decoration:none;color:var(--text)}
.card img{width:96px;height:96px;object-fit:cover;border-radius:14px;flex:none}
.card b{display:block}
.card small{color:var(--muted)}
footer{border-top:1px solid var(--border);color:var(--muted);font-size:14px;padding:28px 0 48px;margin-top:40px}
`;

const shell = ({ title, description, canonical, image, type = 'website', jsonld = [], body }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="A2 Vibe">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<meta name="theme-color" content="#00274c">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;800&family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
${jsonld.map(ld).join('\n')}
<style>${css}</style>
</head>
<body>
<header class="site"><div class="wrap">
  <a class="brand" href="/"><img src="/favicon-48x48.png" width="32" height="32" alt="">A2 Vibe</a>
  <nav><a href="/guide/">All guides</a><a class="cta" href="/">Open the app</a></nav>
</div></header>
<div class="wrap">
${body}
<footer>A2 Vibe is a free Ann Arbor city guide. <a href="/">Explore restaurants, shops, events and parks in the app</a>.</footer>
</div>
</body>
</html>
`;

const write = (relPath, html) => {
  const file = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

const crumbs = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

/* ---------- individual guide pages ---------- */
for (const p of posts) {
  const isOrg = /a2 vibe|team/i.test(p.author || '');
  const author = p.author
    ? { '@type': isOrg ? 'Organization' : 'Person', name: p.author }
    : { '@type': 'Organization', name: 'A2 Vibe' };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    image: [abs(p.img)],
    author,
    publisher: {
      '@type': 'Organization',
      name: 'A2 Vibe',
      logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` },
    },
    mainEntityOfPage: p.url,
    ...(p.date ? { datePublished: p.date, dateModified: p.date } : {}),
  };

  const others = posts.filter((o) => o.slug !== p.slug).slice(0, 5);

  const body = `
<main>
<article>
  <p class="kicker">${esc(p.category || 'A2 Guide')}</p>
  <h1>${esc(p.title)}</h1>
  <p class="meta">${p.author ? `By ${esc(p.author)}` : 'By A2 Vibe'}${p.date ? ` · ${esc(p.date)}` : ''}</p>
  ${p.img ? `<img class="hero" src="${esc(abs(p.img))}" alt="${esc(p.title)}" loading="eager">` : ''}
  <div class="content">${p.bodyHtml}</div>
</article>
<div class="box">
  <strong>Find more in Ann Arbor</strong>
  <p style="margin:6px 0 14px">Browse local restaurants, shops, events and parks in the free A2 Vibe app.</p>
  <a class="btn" href="/">Open A2 Vibe</a>
</div>
${others.length ? `<aside class="more"><h2>More from the A2 Guide</h2><ul>
${others.map((o) => `<li><a href="/guide/${o.slug}/">${esc(o.title)}<span>${esc(o.description)}</span></a></li>`).join('\n')}
</ul></aside>` : ''}
</main>`;

  write(
    `guide/${p.slug}/index.html`,
    shell({
      title: `${p.title} | A2 Vibe Ann Arbor Guide`,
      description: p.description,
      canonical: p.url,
      image: abs(p.img),
      type: 'article',
      jsonld: [
        article,
        crumbs([
          { name: 'A2 Vibe', url: `${SITE}/` },
          { name: 'A2 Guide', url: `${SITE}/guide/` },
          { name: p.title, url: p.url },
        ]),
      ],
      body,
    })
  );
}

/* ---------- guide index page ---------- */
const indexBody = `
<main>
  <p class="kicker">A2 Guide</p>
  <h1>Ann Arbor Stories, Tips &amp; Local Secrets</h1>
  <p class="meta">Field notes on food, culture, parks and city life from the A2 Vibe team.</p>
  <div class="cards">
${posts
  .map(
    (p) => `    <a class="card" href="/guide/${p.slug}/">
      ${p.img ? `<img src="${esc(abs(p.img))}" alt="${esc(p.title)}" loading="lazy" width="96" height="96">` : ''}
      <div><small>${esc(p.category || '')}</small><b>${esc(p.title)}</b><small>${esc(p.description)}</small></div>
    </a>`
  )
  .join('\n')}
  </div>
</main>`;

write(
  'guide/index.html',
  shell({
    title: 'A2 Guide: Ann Arbor Stories, Tips & Local Secrets | A2 Vibe',
    description:
      'Stories, tips and local secrets about Ann Arbor, Michigan: coffee, culture, parks, dining and city life from the A2 Vibe team.',
    canonical: `${SITE}/guide/`,
    image: `${SITE}/og-image.png`,
    jsonld: [
      crumbs([
        { name: 'A2 Vibe', url: `${SITE}/` },
        { name: 'A2 Guide', url: `${SITE}/guide/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'A2 Guide',
        url: `${SITE}/guide/`,
        hasPart: posts.map((p) => ({ '@type': 'Article', headline: p.title, url: p.url })),
      },
    ],
    body: indexBody,
  })
);

/* ---------- sitemap ---------- */
const urls = [
  { loc: `${SITE}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE}/guide/`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
  ...posts.map((p) => ({ loc: p.url, lastmod: p.date || today, changefreq: 'monthly', priority: '0.7' })),
];

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`
);

console.log(`✓ Generated ${posts.length} guide page(s) + /guide/ index + sitemap.xml`);
posts.forEach((p) => console.log(`  - /guide/${p.slug}/`));
