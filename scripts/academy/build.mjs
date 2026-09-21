// Genera academy/index.html (pagina estatica), los redirects de las URLs antiguas en
// vercel.json y la entrada del sitemap. Uso: node scripts/academy/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { courses } from './data.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const SITE = 'https://www.wiptool.com';
const TITLE = 'WIP Academy | Cursos gratuitos para dominar WIP';
const DESCRIPTION = 'Cursos gratuitos en video para dominar WIP: crea tu cuenta y tu empresa, conecta clientes, proveedores y colaboradores, y gestiona tus servicios paso a paso.';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const total = courses.reduce((n, c) => n + c.lessons.length, 0);

// ---------- Pie de pagina: se reutiliza el de la home ----------
const home = read('index.html');
let footer = home.match(/<footer class="footer"[\s\S]*?<\/footer>/)[0];
footer = footer
  .replace('<footer class="footer" id="blog">', '<footer class="footer">')
  .replace(/<div class="nav__logo"><img src="([^"]+)" alt="WIP" class="brand-logo" width="148" height="82"><\/div>/, '<img src="$1" alt="WIP" width="148" height="82">')
  .replace('href="#industrias"', 'href="/#industrias"')
  .replace('href="#asignacion"', 'href="/#asignacion"')
  .replace('href="#testimonios"', 'href="/#testimonios"')
  .replace('<a href="/equipos">', '<a href="/academy">WIP Academy</a>\n        <a href="/equipos">');

// ---------- Tarjetas de curso ----------
const cards = courses.map((c, i) => `
        <li role="presentation">
          <a class="card" id="tab-${c.slug}" role="tab" href="#${c.slug}" data-course="${c.slug}" aria-controls="${c.slug}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
            ${i === 0 ? '<span class="card__badge">Empieza aquí</span>' : ''}
            <img src="/img/academy/${c.img}.jpg" width="640" height="320" alt="" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">
            <span class="card__body">
              <span class="card__name">${esc(c.name)}</span>
              <span class="card__meta">${c.lessons.length} videos</span>
            </span>
          </a>
        </li>`).join('');

// ---------- Cursos con sus lecciones ----------
const panels = courses.map((c, ci) => {
  const lessons = c.lessons.map((l, li) => {
    const prev = c.lessons[li - 1];
    const next = c.lessons[li + 1];
    const nav = [
      prev ? `<a class="btn" href="#${c.slug}/${prev.slug}" data-course="${c.slug}" data-lesson="${prev.slug}">← Anterior</a>` : '',
      next ? `<a class="btn btn--next" href="#${c.slug}/${next.slug}" data-course="${c.slug}" data-lesson="${next.slug}">Siguiente lección →</a>`
        : '<a class="btn btn--next" href="#cursos">Ver otro curso ↑</a>',
    ].join('');
    return `
          <article class="lesson${ci === 0 && li === 0 ? ' is-active' : ''}" id="${c.slug}/${l.slug}" data-lesson="${l.slug}">
            <div class="player" data-yt="${l.yt}" data-title="${esc(l.title)}">
              <a class="player__btn" href="https://www.youtube.com/watch?v=${l.yt}" target="_blank" rel="noopener">
                <img class="player__thumb" src="https://i.ytimg.com/vi/${l.yt}/hqdefault.jpg" width="480" height="360" alt="" loading="${ci === 0 && li === 0 ? 'eager' : 'lazy'}" decoding="async">
                <span class="player__play" aria-hidden="true"></span>
                <span class="sr-only">Reproducir video: ${esc(l.title)}</span>
              </a>
            </div>
            <h3>${esc(l.title)}</h3>
            ${l.dur ? `<p class="lesson__meta">Video · ${l.dur} min</p>` : '<p class="lesson__meta">Video</p>'}
            ${l.text.length ? `<div class="lesson__text">${l.text.map((p) => `<p>${esc(p)}</p>`).join('')}</div>` : ''}
            <div class="lesson__nav">${nav}</div>
          </article>`;
  }).join('');

  const list = c.lessons.map((l, li) => `
            <li><a href="#${c.slug}/${l.slug}" data-course="${c.slug}" data-lesson="${l.slug}"${ci === 0 && li === 0 ? ' aria-current="true"' : ''}><span class="playlist__n">${li + 1}</span><span>${esc(l.title)}${l.dur ? `<span class="playlist__dur">${l.dur} min</span>` : ''}</span></a></li>`).join('');

  return `
    <section class="course${ci === 0 ? ' is-active' : ''}" id="${c.slug}" role="tabpanel" aria-labelledby="tab-${c.slug}">
      <div class="container">
        <div class="course__head">
          <h2>${esc(c.name)}</h2>
          <p>${esc(c.desc)}</p>
          <span class="course__count">${c.lessons.length} videos</span>
        </div>
        <div class="course__layout">
          <div class="stage">${lessons}
          </div>
          <aside class="playlist" aria-label="Lecciones de ${esc(c.name)}">
            <p class="playlist__title">Lecciones (${c.lessons.length})</p>
            <ol>${list}
            </ol>
          </aside>
        </div>
      </div>
    </section>`;
}).join('');

const jsonld = {
  '@context': 'https://schema.org',
  '@graph': courses.map((c) => ({
    '@type': 'Course',
    name: c.name,
    description: c.desc,
    url: `${SITE}/academy#${c.slug}`,
    inLanguage: 'es',
    isAccessibleForFree: true,
    provider: { '@type': 'Organization', name: 'WIP', url: `${SITE}/` },
    offers: { '@type': 'Offer', category: 'Free', price: '0', priceCurrency: 'COP' },
  })),
};

const css = read('scripts/academy/styles.css');
const client = read('scripts/academy/client.js');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${TITLE}</title>
<meta name="description" content="${DESCRIPTION}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#161d31">
<link rel="canonical" href="${SITE}/academy">
<link rel="icon" type="image/png" href="/favicon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WIP">
<meta property="og:locale" content="es_LA">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESCRIPTION}">
<meta property="og:url" content="${SITE}/academy">
<meta property="og:image" content="${SITE}/og-image.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="WIP, Field Service Management para LATAM: asignación inteligente y seguimiento en vivo de tu red de proveedores y tu equipo">
<script type="application/ld+json">
${JSON.stringify(jsonld)}
</script>
<script>document.documentElement.className+=' js';</script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if(location.hostname==='www.wiptool.com'){
gtag('js', new Date());
gtag('config', 'G-2ZX12K09EW');
(function(){var l=false;function load(){if(l)return;l=true;
var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-2ZX12K09EW';s.async=true;document.head.appendChild(s);}
['pointerdown','keydown','scroll','touchstart'].forEach(function(e){window.addEventListener(e,load,{once:true,passive:true});});
window.addEventListener('load',function(){
  if('requestIdleCallback' in window){requestIdleCallback(load,{timeout:3000});}else{setTimeout(load,1500);}
});})();
}
</script>
<link rel="preconnect" href="https://i.ytimg.com">
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>
${css}</style>
</head>
<body>
<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="/academy" aria-label="WIP Academy, inicio">
      <img src="/img/wip-logo-lima-94w.png" alt="WIP" width="47" height="26">
      <span class="brand__tag">Academy</span>
    </a>
    <a class="topbar__link" href="/">Ir a wiptool.com</a>
  </div>
</header>

<main>
  <section class="hero">
    <div class="container">
      <span class="eyebrow">Academy</span>
      <h1>Conoce los cursos para dominar nuestro software y potencia tu empresa</h1>
      <p>Cursos completamente gratuitos para ti</p>
    </div>
  </section>

  <section class="picker" id="cursos">
    <div class="container">
      <h2>Elige tu perfil</h2>
      <p class="picker__lead">${courses.length} cursos, ${total} videos cortos. Selecciona el que corresponde a tu rol y empieza a ver.</p>
      <ul class="cards" role="tablist" aria-label="Cursos de WIP Academy">${cards}
      </ul>
    </div>
  </section>
${panels}
</main>

${footer}

<script>
${client}</script>
</body>
</html>
`;
fs.mkdirSync(path.join(root, 'academy'), { recursive: true });
fs.writeFileSync(path.join(root, 'academy/index.html'), html);

// ---------- Redirects de las URLs antiguas (WordPress) ----------
const vercelPath = path.join(root, 'vercel.json');
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
const keep = (vercel.redirects || []).filter((r) => !r.source.startsWith('/academy/'));
const red = [
  { source: '/academy/cursos', destination: '/academy', permanent: true },
  { source: '/academy/instructor/:slug', destination: '/academy', permanent: true },
];
for (const c of courses) {
  red.push({ source: `/academy/cursos/${c.slug}`, destination: `/academy#${c.slug}`, permanent: true });
  for (const l of c.lessons) {
    red.push({ source: `/academy/cursos/${c.slug}/clases/${l.slug}`, destination: `/academy#${c.slug}/${l.slug}`, permanent: true });
  }
}
vercel.redirects = [...keep, ...red];
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n');

// ---------- Sitemap ----------
const smPath = path.join(root, 'public/sitemap.xml');
let sm = fs.readFileSync(smPath, 'utf8');
if (!sm.includes(`${SITE}/academy`)) {
  sm = sm.replace('</urlset>', `  <url>\n    <loc>${SITE}/academy</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n</urlset>`);
  fs.writeFileSync(smPath, sm);
}

console.log(`academy/index.html: ${(html.length / 1024).toFixed(1)} KB, ${courses.length} cursos, ${total} lecciones`);
console.log(`redirects academy: ${red.length}`);
