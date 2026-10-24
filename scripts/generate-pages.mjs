// scripts/generate-pages.mjs
// Runs AFTER `vite build`. Generates static, crawlable pages into dist/:
//   /guide/                 + /guide/<slug>/        (from src/data/journalData.js)
//   /happenings/            + /happenings/<slug>/   (from src/data/happeningsData.js)
// and rewrites dist/sitemap.xml to include everything.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE = 'https://a2vibe.com';
const GA_ID = 'G-5SKGDHGWWZ';
const TZ = 'America/Detroit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

if (!fs.existsSync(DIST)) {
  throw new Error('dist/ not found. Run "vite build" before generate-pages.');
}

const load = async (rel, exportName) => {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.warn(`! ${rel} not found, skipping`);
    return [];
  }
  const mod = await import(pathToFileURL(file).href);
  return mod[exportName] || [];
};

const journalData = await load('src/data/journalData.js', 'journalData');
const happeningsData = await load('src/data/happeningsData.js', 'happeningsData');

/* =========================================================================
   Helpers
   ========================================================================= */
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
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const isIsoDate = (d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d);
const pad = (n) => String(n).padStart(2, '0');
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

// "Today" in Ann Arbor's time zone (YYYY-MM-DD). TODAY env var is for testing.
const today =
  process.env.TODAY ||
  new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

const uniqueSlug = (base, used, fallback) => {
  let slug = base || slugify(fallback || 'page');
  let unique = slug, i = 2;
  while (used.has(unique)) unique = `${slug}-${i++}`;
  used.add(unique);
  return unique;
};

const sitemapUrls = [];
const addUrl = (loc, lastmod, changefreq, priority) => sitemapUrls.push({ loc, lastmod, changefreq, priority });

/* =========================================================================
   Shared page shell
   ========================================================================= */
const css = `
:root{--bg:#0a121e;--card:#151f2e;--text:#f1f5f9;--muted:#94a3b8;--accent:#ffcb05;--link:#38bdf8;--border:#1e293b;--navy:#00274c;--warn:#3b2f05}
@media (prefers-color-scheme:light){:root{--bg:#f8fafc;--card:#ffffff;--text:#0f172a;--muted:#475569;--accent:#b45309;--link:#0369a1;--border:#e2e8f0;--warn:#fef3c7}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.7}
a{color:var(--link)}
.wrap{max-width:720px;margin:0 auto;padding:0 20px}
header.site{position:sticky;top:0;z-index:10;background:var(--navy);border-bottom:1px solid var(--border)}
header.site .wrap{display:flex;align-items:center;justify-content:space-between;height:60px}
.brand{display:flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-family:'Outfit',system-ui,sans-serif;font-weight:800;letter-spacing:.02em}
.brand img{border-radius:8px}
nav{display:flex;align-items:center;gap:12px;font-size:14px}
nav a{color:#e2e8f0;text-decoration:none}
nav a.cta,.btn{background:#ffcb05;color:#000;font-weight:800;padding:9px 16px;border-radius:12px;text-decoration:none;display:inline-block}
.btn.alt{background:transparent;color:var(--link);border:1px solid var(--border)}
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
.card{display:flex;gap:14px;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:12px;text-decoration:none;color:var(--text);scroll-margin-top:76px}
.card img{width:96px;height:96px;object-fit:cover;border-radius:14px;flex:none}
.card b{display:block}
.card small{display:block;color:var(--muted)}
.facts{display:grid;gap:12px;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:18px 20px;margin:0 0 24px}
.facts div{display:grid;grid-template-columns:110px 1fr;gap:8px}
.facts dt{color:var(--muted);font-size:13px;text-transform:uppercase;letter-spacing:.08em;font-weight:700}
.facts dd{margin:0}
.actions{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 28px}
.banner{background:var(--warn);border:1px solid var(--border);border-radius:16px;padding:12px 16px;margin:20px 0}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 8px}
.chip{font:inherit;font-size:13px;font-weight:700;color:var(--text);background:var(--card);border:1px solid var(--border);border-radius:999px;padding:6px 14px;cursor:pointer}
.chip.on{background:#ffcb05;color:#000;border-color:#ffcb05}
.month h2{margin:32px 0 0;font-size:22px}
details.past{margin:32px 0}
details.past summary{cursor:pointer;font-weight:800;font-family:'Outfit',system-ui,sans-serif;font-size:20px}
footer{border-top:1px solid var(--border);color:var(--muted);font-size:14px;padding:28px 0 48px;margin-top:40px}
@media(max-width:480px){.facts div{grid-template-columns:1fr;gap:2px}}
`;

const shell = ({ title, description, canonical, image, type = 'website', jsonld = [], body, extraHead = '' }) => `<!DOCTYPE html>
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
<style>${css}</style>${extraHead}
</head>
<body>
<header class="site"><div class="wrap">
  <a class="brand" href="/"><img src="/favicon-48x48.png" width="32" height="32" alt="">A2 Vibe</a>
  <nav><a href="/guide/">Guides</a><a href="/happenings/">Events</a><a class="cta" href="/">Open app</a></nav>
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
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

/* =========================================================================
   GUIDES
   ========================================================================= */
const usedGuideSlugs = new Set();
const guides = (journalData || [])
  .filter((p) => p && p.title && (p.longDesc || p.excerpt))
  .map((p) => {
    const slug = uniqueSlug(p.slug ? slugify(p.slug) : slugify(p.title), usedGuideSlugs, p.id);
    return {
      ...p,
      slug,
      url: `${SITE}/guide/${slug}/`,
      description: clip(stripHtml(p.excerpt || p.longDesc)),
      bodyHtml: p.longDesc || `<p>${esc(p.excerpt)}</p>`,
      date: isIsoDate(p.date) ? p.date : null,
    };
  });

for (const p of guides) {
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

  const others = guides.filter((o) => o.slug !== p.slug).slice(0, 5);

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
  <a class="btn" href="/">Open A2 Vibe</a> <a class="btn alt" href="/happenings/">See Ann Arbor events</a>
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
  addUrl(p.url, p.date || today, 'monthly', '0.7');
}

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
        hasPart: guides.map((p) => ({ '@type': 'Article', headline: p.title, url: p.url })),
      },
    ],
    body: `
<main>
  <p class="kicker">A2 Guide</p>
  <h1>Ann Arbor Stories, Tips &amp; Local Secrets</h1>
  <p class="meta">Field notes on food, culture, parks and city life from the A2 Vibe team.</p>
  <div class="cards">
${guides
  .map(
    (p) => `    <a class="card" href="/guide/${p.slug}/">
      ${p.img ? `<img src="${esc(abs(p.img))}" alt="${esc(p.title)}" loading="lazy" width="96" height="96">` : ''}
      <div><small>${esc(p.category || '')}</small><b>${esc(p.title)}</b><small>${esc(p.description)}</small></div>
    </a>`
  )
  .join('\n')}
  </div>
</main>`,
  })
);
addUrl(`${SITE}/guide/`, today, 'weekly', '0.8');

/* =========================================================================
   HAPPENINGS (EVENTS)
   ========================================================================= */
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const MONTH_NAMES = MONTHS.map((m) => m[0].toUpperCase() + m.slice(1));
const monthIdx = (s) => MONTHS.findIndex((m) => m.startsWith(String(s).toLowerCase().slice(0, 3)));

// "October 23, 2026" | "October 23 - November 14, 2026" | "December 11 - 13, 2026"
function parseDateRange(str) {
  const m = String(str || '').trim().match(/^([A-Za-z]+)\.?\s+(\d{1,2})(?:\s*[-–]\s*(?:([A-Za-z]+)\.?\s+)?(\d{1,2}))?,?\s*(\d{4})$/);
  if (!m) return null;
  const y = +m[5];
  const m1 = monthIdx(m[1]);
  if (m1 < 0) return null;
  let m2 = m1, d2 = +m[2];
  if (m[4]) {
    d2 = +m[4];
    if (m[3]) { m2 = monthIdx(m[3]); if (m2 < 0) return null; }
  }
  return { start: { y, m: m1, d: +m[2] }, end: { y, m: m2, d: d2 } };
}

const to24 = (h, min, ap) => ({ h: (+h % 12) + (/p/i.test(ap) ? 12 : 0), min: +min });

// "7:30 PM" | "12:00 PM - 6:00 PM (Tues...)" | "12:00 PM Kickoff" | "Dec 11 (7:00 PM), ..."
function parseTimes(str) {
  const s = String(str || '');
  const range = s.match(/^\s*(\d{1,2}):(\d{2})\s*([AP]M)\s*[-–]\s*(\d{1,2}):(\d{2})\s*([AP]M)/i);
  if (range) return { start: to24(range[1], range[2], range[3]), end: to24(range[4], range[5], range[6]) };
  const one = s.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
  if (one) return { start: to24(one[1], one[2], one[3]), end: null };
  return { start: null, end: null };
}

// US Eastern daylight-saving rules (2nd Sunday of March -> 1st Sunday of November)
const nthSunday = (y, m, n) => 1 + ((7 - new Date(Date.UTC(y, m, 1)).getUTCDay()) % 7) + (n - 1) * 7;
const offsetFor = (y, m, d, h) => {
  const t = Date.UTC(y, m, d, h);
  const start = Date.UTC(y, 2, nthSunday(y, 2, 2), 2);
  const end = Date.UTC(y, 10, nthSunday(y, 10, 1), 2);
  return t >= start && t < end ? '-04:00' : '-05:00';
};
const iso = ({ y, m, d }, time) =>
  time
    ? `${y}-${pad(m + 1)}-${pad(d)}T${pad(time.h)}:${pad(time.min)}:00${offsetFor(y, m, d, time.h)}`
    : `${y}-${pad(m + 1)}-${pad(d)}`;
const ymd = ({ y, m, d }) => `${y}-${pad(m + 1)}-${pad(d)}`;
const addDay = ({ y, m, d }) => {
  const dt = new Date(Date.UTC(y, m, d + 1));
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth(), d: dt.getUTCDate() };
};

function eventTimes(ev) {
  const r = parseDateRange(ev.date);
  if (!r) return null;
  const t = parseTimes(ev.time);
  const multiDay = ymd(r.start) !== ymd(r.end);
  let endISO = null;
  if (multiDay) {
    endISO = iso(r.end, t.end);
  } else if (t.start && t.end) {
    const endsNextDay = t.end.h * 60 + t.end.min <= t.start.h * 60 + t.start.min;
    endISO = iso(endsNextDay ? addDay(r.start) : r.start, t.end);
  }
  return { startISO: iso(r.start, t.start), endISO, firstDay: ymd(r.start), lastDay: ymd(r.end), startYM: ymd(r.start).slice(0, 7), startMonth: r.start.m, startYear: r.start.y };
}

// "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)"
function parseAddress(addr = '') {
  const m = String(addr).match(/^(.*?),\s*Ann Arbor,\s*MI\s*(\d{5})?\s*(?:\((.*)\))?\s*$/i);
  if (!m) return { street: String(addr), zip: null, venue: null };
  return { street: m[1].trim(), zip: m[2] || null, venue: m[3] ? m[3].trim() : null };
}

function parsePrice(p) {
  if (!p) return null;
  if (/free/i.test(p)) return '0';
  const m = String(p).match(/\$\s*(\d+(?:\.\d{1,2})?)/);
  return m ? m[1] : null;
}

const usedEventSlugs = new Set();
const events = (happeningsData || [])
  .filter((e) => e && e.name && e.date)
  .map((e) => {
    const times = eventTimes(e);
    if (!times) console.warn(`! Could not parse date "${e.date}" for "${e.name}" (page created, no Event markup)`);
    const addr = parseAddress(e.address);
    let slug = e.slug ? slugify(e.slug) : slugify(e.name);
    if (usedEventSlugs.has(slug) && times) slug = `${slug}-${times.firstDay}`;
    slug = uniqueSlug(slug, usedEventSlugs, e.id);
    const cats = toArray(e.category);
    return {
      ...e,
      slug,
      url: `${SITE}/happenings/${slug}/`,
      times,
      addr,
      cats,
      isPast: times ? times.lastDay < today : false,
      description: clip(
        `${e.shortDesc || stripHtml(e.longDesc || '')} ${e.date}${addr.venue ? ` at ${addr.venue}` : ''}.`.replace(/\s+/g, ' ').trim()
      ),
    };
  })
  .sort((a, b) => (a.times?.firstDay || '9999').localeCompare(b.times?.firstDay || '9999'));

const upcoming = events.filter((e) => !e.isPast);
const past = events.filter((e) => e.isPast).reverse();

const mapsLink = (e) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.addr.venue || ''} ${e.address}`.trim())}`;

const eventJsonLd = (e) => {
  if (!e.times) return null;
  const price = parsePrice(e.price);
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.name,
    startDate: e.times.startISO,
    ...(e.times.endISO ? { endDate: e.times.endISO } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: e.addr.venue || e.addr.street,
      address: {
        '@type': 'PostalAddress',
        streetAddress: e.addr.street,
        addressLocality: 'Ann Arbor',
        addressRegion: 'MI',
        ...(e.addr.zip ? { postalCode: e.addr.zip } : {}),
        addressCountry: 'US',
      },
    },
    image: [abs(e.img)],
    description: clip(stripHtml(e.longDesc || e.shortDesc || e.name), 500),
    ...(price !== null
      ? { offers: { '@type': 'Offer', price, priceCurrency: 'USD', url: e.url && /^https?:/.test(e.url) ? e.url : undefined, availability: 'https://schema.org/InStock' } }
      : {}),
  };
};

for (const e of events) {
  const others = upcoming.filter((o) => o.slug !== e.slug).slice(0, 5);
  const jsonld = [
    eventJsonLd(e),
    crumbs([
      { name: 'A2 Vibe', url: `${SITE}/` },
      { name: 'Ann Arbor Events', url: `${SITE}/happenings/` },
      { name: e.name, url: e.url },
    ]),
  ].filter(Boolean);

  const whereLine = `${e.addr.venue ? `<strong>${esc(e.addr.venue)}</strong><br>` : ''}${esc(e.addr.street)}${e.addr.zip ? `, Ann Arbor, MI ${esc(e.addr.zip)}` : ''}`;
  const rel = `noopener${e.sponsored ? ' sponsored nofollow' : ''}`;

  const body = `
<main>
<article>
  <p class="kicker">${esc(e.cats[0] || 'Ann Arbor Event')}</p>
  <h1>${esc(e.name)}</h1>
  ${e.isPast ? `<div class="banner">This event has already taken place. <a href="/happenings/">See upcoming Ann Arbor events</a>.</div>` : ''}
  <dl class="facts">
    <div><dt>When</dt><dd>${esc(e.date)}${e.time ? `<br>${esc(e.time)}` : ''}</dd></div>
    <div><dt>Where</dt><dd>${whereLine}</dd></div>
    ${e.price ? `<div><dt>Price</dt><dd>${esc(e.price)}</dd></div>` : ''}
    ${e.neighborhood ? `<div><dt>Area</dt><dd>${esc(e.neighborhood)}</dd></div>` : ''}
  </dl>
  <div class="actions">
    ${e.url ? `<a class="btn" href="${esc(e.url)}" target="_blank" rel="${rel}">Official event website</a>` : ''}
    <a class="btn alt" href="${esc(mapsLink(e))}" target="_blank" rel="noopener">Get directions</a>
  </div>
  ${e.img ? `<img class="hero" src="${esc(abs(e.img))}" alt="${esc(e.name)}" loading="eager">` : ''}
  <div class="content">${e.longDesc || `<p>${esc(e.shortDesc || '')}</p>`}</div>
</article>
<div class="box">
  <strong>More to do in Ann Arbor</strong>
  <p style="margin:6px 0 14px">Find restaurants, shops, parks and more events in the free A2 Vibe app.</p>
  <a class="btn" href="/">Open A2 Vibe</a> <a class="btn alt" href="/happenings/">All Ann Arbor events</a>
</div>
${others.length ? `<aside class="more"><h2>More upcoming events</h2><ul>
${others.map((o) => `<li><a href="/happenings/${o.slug}/">${esc(o.name)}<span>${esc(o.date)}${o.addr.venue ? ` · ${esc(o.addr.venue)}` : ''}</span></a></li>`).join('\n')}
</ul></aside>` : ''}
</main>`;

  write(
    `happenings/${e.slug}/index.html`,
    shell({
      title: `${e.name} – ${e.date} | A2 Vibe Ann Arbor Events`,
      description: e.description,
      canonical: e.url,
      image: abs(e.img),
      jsonld,
      body,
    })
  );
  addUrl(e.url, e.isPast ? e.times?.lastDay || today : today, 'weekly', e.isPast ? '0.3' : '0.7');
}

/* ---------- events index ---------- */
const evCard = (e) => `    <a class="card evcard" id="${esc(e.id || e.slug)}" data-cats="${e.cats.map(slugify).join(' ')}" href="/happenings/${e.slug}/">
      ${e.img ? `<img src="${esc(abs(e.img))}" alt="${esc(e.name)}" loading="lazy" width="96" height="96">` : ''}
      <div><small>${esc(e.date)}${e.time ? ` · ${esc(e.time.split(/[(,]/)[0].trim())}` : ''}</small><b>${esc(e.name)}</b><small>${esc(e.addr.venue || e.addr.street)}${e.price ? ` · ${esc(e.price)}` : ''}</small><small>${esc(e.shortDesc || '')}</small></div>
    </a>`;

const byMonth = new Map();
for (const e of upcoming) {
  const key = e.times ? `${e.times.startYear}-${pad(e.times.startMonth + 1)}` : 'tbd';
  if (!byMonth.has(key)) byMonth.set(key, { label: e.times ? `${MONTH_NAMES[e.times.startMonth]} ${e.times.startYear}` : 'More events', list: [] });
  byMonth.get(key).list.push(e);
}

const catSet = new Map();
upcoming.forEach((e) => e.cats.forEach((c) => catSet.set(slugify(c), c)));

const filterScript = `<script>
(function(){var t=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));if(t){var d=t.closest('details');if(d){d.open=true;t.scrollIntoView();}}
var chips=document.querySelectorAll('.chip');if(!chips.length)return;
chips.forEach(function(c){c.addEventListener('click',function(){var v=c.getAttribute('data-cat');
chips.forEach(function(x){x.classList.toggle('on',x===c)});
document.querySelectorAll('.month').forEach(function(sec){var any=false;
sec.querySelectorAll('.evcard').forEach(function(k){var cs=(k.getAttribute('data-cats')||'').split(' ');var show=(v==='all'||cs.indexOf(v)>-1);k.style.display=show?'':'none';if(show)any=true;});
sec.style.display=any?'':'none';});});});})();
</script>`;

write(
  'happenings/index.html',
  shell({
    title: 'Ann Arbor Events & Things To Do | A2 Vibe',
    description:
      'Upcoming Ann Arbor, Michigan events: concerts, U-M games, festivals, markets, workshops and nightlife, curated by A2 Vibe.',
    canonical: `${SITE}/happenings/`,
    image: `${SITE}/og-image.png`,
    jsonld: [
      crumbs([
        { name: 'A2 Vibe', url: `${SITE}/` },
        { name: 'Ann Arbor Events', url: `${SITE}/happenings/` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Ann Arbor Events',
        url: `${SITE}/happenings/`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: upcoming.map((e, i) => ({ '@type': 'ListItem', position: i + 1, url: e.url })),
        },
      },
    ],
    body: `
<main>
  <p class="kicker">A2 Events</p>
  <h1>Ann Arbor Events &amp; Things To Do</h1>
  <p class="meta">Concerts, U-M games, festivals, markets, workshops and nightlife in Ann Arbor, Michigan. Always check the organizer's site for the latest details.</p>
  ${
    catSet.size > 1
      ? `<div class="chips" aria-label="Filter events by category"><button type="button" class="chip on" data-cat="all">All</button>${[...catSet]
          .map(([slug, label]) => `<button type="button" class="chip" data-cat="${esc(slug)}">${esc(label)}</button>`)
          .join('')}</div>`
      : ''
  }
${
  upcoming.length
    ? [...byMonth.values()]
        .map((g) => `  <section class="month">\n    <h2>${esc(g.label)}</h2>\n    <div class="cards">\n${g.list.map(evCard).join('\n')}\n    </div>\n  </section>`)
        .join('\n')
    : '  <p>No upcoming events are listed right now. Check back soon, or open the A2 Vibe app.</p>'
}
${
  past.length
    ? `  <details class="past"><summary>Past events (${past.length})</summary>\n    <div class="cards">\n${past.map(evCard).join('\n')}\n    </div>\n  </details>`
    : ''
}
  <div class="box">
    <strong>Hosting an event in Ann Arbor?</strong>
    <p style="margin:6px 0 14px">Open the A2 Vibe app to list or feature your event.</p>
    <a class="btn" href="/">Open A2 Vibe</a>
  </div>
</main>
${filterScript}`,
  })
);
addUrl(`${SITE}/happenings/`, today, 'daily', '0.9');

/* =========================================================================
   Sitemap
   ========================================================================= */
const all = [{ loc: `${SITE}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' }, ...sitemapUrls];

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`
);

console.log(`✓ ${guides.length} guide page(s), ${events.length} event page(s) (${upcoming.length} upcoming, ${past.length} past)`);
console.log(`✓ sitemap.xml with ${all.length} URLs (build date ${today})`);
