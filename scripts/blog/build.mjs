// Genera el blog (/blog, /blog/<categoria>, /blog/<articulo>) y los ebooks (/ebook, /ebook/<slug>)
// como paginas estaticas, actualiza los redirects de las URLs antiguas (WordPress) en vercel.json
// y las entradas del sitemap. Uso: node scripts/blog/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postSeo, ebookSeo, pageSeo } from './data/seo.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));

const SITE = 'https://www.wiptool.com';
const posts = readJson('scripts/blog/data/posts.json').sort((a, b) => (a.date < b.date ? 1 : -1));
const ebooks = readJson('scripts/blog/data/ebooks.json');
const { categories } = readJson('scripts/blog/data/categories.json');
const catBy = Object.fromEntries(categories.map((c) => [c.slug, c]));
const ebookBy = Object.fromEntries(ebooks.map((e) => [e.slug, e]));

// ---------- Consistencia con la API de descargas ----------
const api = read('api/ebook.js');
for (const e of ebooks) {
  if (!api.includes(`/ebooks/${e.slug}.pdf`)) throw new Error(`api/ebook.js no tiene el ebook ${e.slug}`);
  if (!fs.existsSync(path.join(root, 'public', e.pdf))) throw new Error(`falta el PDF ${e.pdf}`);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtDate = (d) => new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(d + 'T12:00:00Z'));
const clip = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)) + '…');
const withBrand = (t, brand = ' | WIP') => (t.length + brand.length <= 62 ? t + brand : t);

for (const p of posts) {
  const o = postSeo[p.slug] || {};
  p.metaTitle = withBrand(o.title || p.seoTitle.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]\s*/gu, '').trim());
  p.metaDesc = clip(o.desc || p.seoDesc || p.excerpt, 158);
}
for (const e of ebooks) {
  const o = ebookSeo[e.slug] || {};
  e.metaTitle = withBrand(o.title || e.seoTitle || e.title);
  e.metaDesc = clip(o.desc || e.seoDesc || e.excerpt, 158);
}
for (const c of categories) {
  c.metaTitle = (c.seoTitle || c.name).replace(/\|\s*Wip$/i, '| WIP');
  c.metaDesc = clip(c.seoDesc || '', 158);
  c.posts = posts.filter((p) => p.category === c.slug);
}

// ---------- Piezas comunes ----------
const home = read('index.html');
let footer = home.match(/<footer class="footer"[\s\S]*?<\/footer>/)[0]
  .replace('<footer class="footer" id="blog">', '<footer class="footer">')
  .replace(/<div class="nav__logo"><img src="[^"]+" alt="WIP" class="brand-logo" width="148" height="82"><\/div>/, '<img src="/img/wip-logo-nav-2x.webp" alt="WIP" width="148" height="82" loading="lazy">')
  .replace(/href="#(industrias|asignacion|testimonios)"/g, 'href="/#$1"')
  // h4 -> h3: en estas paginas el pie viene despues de un h2 y no debe saltar niveles
  .replace(/<(\/?)h4>/g, '<$1h3>');

const css = read('scripts/blog/styles.css');
const blogJs = read('scripts/blog/blog.js');
const ebookJs = read('scripts/blog/ebook.js');

const GTAG = `<script>
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
</script>`;

const ORG = { '@type': 'Organization', name: 'WIP', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } };
const crumbsLd = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}${it.url}` })),
});

function page({ url, title, desc, ogType = 'website', ogImage = '/og-image.jpg', ogW = 1200, ogH = 630, ogAlt, ld, preload = '', active, body, scripts = '', extraMeta = '' }) {
  const nav = [['/blog', 'Blog'], ['/ebook', 'Ebooks'], ['/academy', 'Academy']]
    .map(([h, t]) => `<a href="${h}"${active === h ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="theme-color" content="#161d31">
<link rel="canonical" href="${SITE}${url}">
<link rel="icon" type="image/png" href="/favicon.png">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="WIP">
<meta property="og:locale" content="es_LA">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${url}">
<meta property="og:image" content="${SITE}${ogImage}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="${ogW}">
<meta property="og:image:height" content="${ogH}">
<meta property="og:image:alt" content="${esc(ogAlt || title)}">
${extraMeta}<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': ld })}
</script>
${GTAG}
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload}<style>
${css}</style>
</head>
<body>
<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="/" aria-label="WIP, inicio"><img src="/img/wip-logo-lima-94w.png" alt="WIP" width="47" height="26"></a>
    <nav class="topnav" aria-label="Recursos">${nav}</nav>
    <a class="topbar__cta" href="/#contacto" data-cta="header-demo">Agenda una demo</a>
  </div>
</header>
<main>
${body}
</main>

${footer}

<script>
${blogJs}</script>
${scripts}</body>
</html>
`;
}

const catPill = (c) => `<span class="pill">${esc(c.name)}</span>`;
function postCard(p, { feature = false, heading = 'h2', eager = false } = {}) {
  const c = catBy[p.category];
  const search = esc(`${p.title} ${p.excerpt} ${c.name}`);
  return `
        <li data-search="${search}"${feature ? ' class="grid__feature" style="grid-column:1/-1"' : ''}>
          <a class="post-card${feature ? ' post-card--feature' : ''}" href="/blog/${p.slug}">
            <span class="post-card__img"><img src="${p.thumb.file}" width="${p.thumb.w}" height="${p.thumb.h}" alt="" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></span>
            <span class="post-card__body">
              ${catPill(c)}
              <${heading}>${esc(p.title)}</${heading}>
              <p>${esc(p.metaDesc)}</p>
              <span class="post-card__meta">${p.readMin} min de lectura</span>
            </span>
          </a>
        </li>`;
}

const ebookBand = () => `
    <section class="ebook-band" aria-labelledby="ebooks-band">
      <div>
        <span class="eyebrow" style="color:var(--lime)">Recursos gratuitos</span>
        <h2 id="ebooks-band">Descarga nuestros ebooks</h2>
        <p>Guías prácticas sobre gestión de proveedores, uberización y equipos de trabajo en campo.</p>
        <a class="btn btn--primary" href="/ebook" data-cta="band-ebooks">Ver ebooks gratuitos</a>
      </div>
      <div class="ebook-band__covers">
        ${ebooks.map((e) => `<a href="/ebook/${e.slug}" aria-label="${esc(e.title)}"><img src="${e.coverSm.file}" width="${e.coverSm.w}" height="${e.coverSm.h}" alt="" loading="lazy" decoding="async"></a>`).join('\n        ')}
      </div>
    </section>`;

const searchBox = `
        <div class="search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <label class="sr-only" for="buscar">Buscar artículo</label>
          <input id="buscar" type="search" placeholder="Buscar artículo" autocomplete="off">
        </div>`;

const chips = (current) => `
        <nav class="chips" aria-label="Categorías">
          <a class="chip" href="/blog"${current === null ? ' aria-current="page"' : ''}>Todos</a>
          ${categories.map((c) => `<a class="chip" href="/blog/${c.slug}"${current === c.slug ? ' aria-current="page"' : ''}>${esc(c.name)} (${c.posts.length})</a>`).join('\n          ')}
        </nav>`;

const written = [];
function write(rel, html) {
  const file = path.join(root, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  written.push(rel);
}

// ---------- /blog ----------
{
  const [first, ...rest] = posts;
  const body = `
  <section class="page-head">
    <div class="container">
      <span class="eyebrow">WIP Blog</span>
      <h1>Blog de logística, delivery y gestión de servicios en campo</h1>
      <p>Bienvenido a nuestro blog: guías prácticas y contenido de valor para que tu empresa lleve su operación a otro nivel.</p>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="filters">${chips(null)}${searchBox}
      </div>
      <ul class="grid">${postCard(first, { feature: true, eager: true })}${rest.map((p) => postCard(p)).join('')}
      </ul>
      <p class="empty" id="sin-resultados" hidden>No encontramos artículos con esa búsqueda. Prueba con otra palabra.</p>
      ${ebookBand()}
    </div>
  </section>`;
  write('blog', page({
    url: '/blog', title: pageSeo.blog.title, desc: pageSeo.blog.desc, active: '/blog', body,
    ld: [
      { '@type': 'Blog', name: 'Blog de WIP', url: `${SITE}/blog`, inLanguage: 'es', publisher: ORG,
        blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: p.date, dateModified: p.modified })) },
      crumbsLd([{ name: 'Inicio', url: '/' }, { name: 'Blog', url: '/blog' }]),
    ],
  }));
}

// ---------- /blog/<categoria> ----------
for (const c of categories) {
  const body = `
  <section class="page-head">
    <div class="container">
      <nav class="crumbs" aria-label="Ruta"><a href="/">Inicio</a><span aria-hidden="true">/</span><a href="/blog">Blog</a><span aria-hidden="true">/</span><span>${esc(c.name)}</span></nav>
      <h1>${esc(c.name)}</h1>
      <p>${esc(c.metaDesc)}</p>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="filters">${chips(c.slug)}${searchBox}
      </div>
      <ul class="grid">${c.posts.map((p, i) => postCard(p, { eager: i === 0 })).join('')}
      </ul>
      <p class="empty" id="sin-resultados" hidden>No encontramos artículos con esa búsqueda. Prueba con otra palabra.</p>
      ${ebookBand()}
    </div>
  </section>`;
  write(`blog/${c.slug}`, page({
    url: `/blog/${c.slug}`, title: c.metaTitle, desc: c.metaDesc, active: '/blog', body,
    ld: [
      { '@type': 'CollectionPage', name: c.name, url: `${SITE}/blog/${c.slug}`, inLanguage: 'es', isPartOf: { '@type': 'Blog', name: 'Blog de WIP', url: `${SITE}/blog` },
        mainEntity: { '@type': 'ItemList', itemListElement: c.posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/blog/${p.slug}` })) } },
      crumbsLd([{ name: 'Inicio', url: '/' }, { name: 'Blog', url: '/blog' }, { name: c.name, url: `/blog/${c.slug}` }]),
    ],
  }));
}

// ---------- /blog/<articulo> ----------
const RED = new Set(['uberizacion', 'insurtech']);
function ebookCta(slug) {
  const e = ebookBy[slug];
  return `<aside class="cta-ebook"><img src="${e.coverSm.file}" width="${e.coverSm.w}" height="${e.coverSm.h}" alt="" loading="lazy" decoding="async"><div><span class="cta-ebook__tag">Ebook gratis</span><p class="cta-ebook__title">${esc(e.title)}</p><p>${esc(clip(e.excerpt, 140))}</p><a class="btn btn--primary" href="/ebook/${e.slug}" data-cta="post-ebook-${e.slug}">Descárgalo gratis</a></div></aside>`;
}
for (const p of posts) {
  const c = catBy[p.category];
  const ebook = ebookBy[p.ebookCtas[0]] || ebooks[0];
  const toRed = RED.has(p.category) || /proveedor/.test(p.slug);
  const content = p.html
    .replace(/<!--EBOOK:([\w-]+)-->/g, (_, s) => ebookCta(s))
    .replace(/<aside class="cta-tool">/g, '<aside class="cta-tool">').replace(/(<aside class="cta-tool">[\s\S]*?<a class="btn btn--primary")/g, '$1 data-cta="post-herramienta"');
  const toc = p.toc.length >= 2 ? `<ol>${p.toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol>` : '';
  const related = [...posts.filter((x) => x.category === p.category && x.slug !== p.slug), ...posts.filter((x) => x.category !== p.category)].slice(0, 3);
  const dateLabel = p.modified > p.date ? `Actualizado el ${fmtDate(p.modified)}` : `Publicado el ${fmtDate(p.date)}`;
  const body = `
  <article>
    <header class="post-hero">
      <div class="container post-hero__grid">
        <div>
          <nav class="crumbs" aria-label="Ruta"><a href="/">Inicio</a><span aria-hidden="true">/</span><a href="/blog">Blog</a><span aria-hidden="true">/</span><a href="/blog/${c.slug}">${esc(c.name)}</a></nav>
          <a class="pill" href="/blog/${c.slug}">${esc(c.name)}</a>
          <h1>${esc(p.title)}</h1>
          <p class="post-hero__lead">${esc(p.metaDesc)}</p>
          <p class="post-meta"><span>${dateLabel}</span><span>${p.readMin} min de lectura</span><span>Por el equipo de WIP</span></p>
        </div>
        <div class="post-hero__img"><img src="${p.image.file}" width="${p.image.w}" height="${p.image.h}" alt="${esc(p.image.alt)}" fetchpriority="high" decoding="async"></div>
      </div>
    </header>
    <div class="container post-layout">
      <div>
        ${toc ? `<details class="toc toc--inline"><summary>Contenido del artículo</summary>${toc}</details>` : ''}
        <div class="prose">
${content}
        </div>
        <aside class="post-end">
          <div>
            <h2>${toRed ? '¿Gestionas una red de proveedores?' : '¿Tienes personal o servicios en campo?'}</h2>
            <p>${toRed ? 'WIP asigna, monitorea y califica los servicios de tu red de proveedores en tiempo real.' : 'Con WIP asignas servicios, sigues a tu equipo en el mapa y tu cliente recibe el seguimiento por WhatsApp.'}</p>
          </div>
          <div class="post-end__actions">
            <a class="btn btn--primary" href="/#contacto" data-cta="post-demo">Agenda una demo</a>
            <a class="btn btn--ghost" href="${toRed ? '/' : '/equipos'}" data-cta="post-producto">${toRed ? 'Conoce WIP Red' : 'Conoce WIP Equipos'}</a>
          </div>
        </aside>
      </div>
      <aside class="post-aside">
        ${toc ? `<nav class="toc" aria-label="Contenido"><details open><summary>Contenido</summary>${toc}</details></nav>` : ''}
        <div class="aside-ebook">
          <img src="${ebook.coverSm.file}" width="${ebook.coverSm.w}" height="${ebook.coverSm.h}" alt="" loading="lazy" decoding="async">
          <strong>Ebook gratis: ${esc(ebook.title)}</strong>
          <span>${esc(clip(ebook.excerpt, 110))}</span>
          <a class="btn btn--primary" href="/ebook/${ebook.slug}" data-cta="aside-ebook-${ebook.slug}">Descargar</a>
        </div>
      </aside>
    </div>
  </article>
  <section class="related" aria-labelledby="rel">
    <div class="container">
      <h2 id="rel">Sigue leyendo</h2>
      <ul class="grid">${related.map((r) => postCard(r, { heading: 'h3' })).join('')}
      </ul>
    </div>
  </section>`;
  write(`blog/${p.slug}`, page({
    url: `/blog/${p.slug}`, title: p.metaTitle, desc: p.metaDesc, ogType: 'article', ogImage: p.og, ogAlt: p.image.alt, active: '/blog', body,
    extraMeta: `<meta property="article:published_time" content="${p.date}">\n<meta property="article:modified_time" content="${p.modified}">\n<meta property="article:section" content="${esc(c.name)}">\n`,
    scripts: content.includes('class="yt"') ? '' : '',
    ld: [
      { '@type': 'BlogPosting', headline: p.title, description: p.metaDesc, url: `${SITE}/blog/${p.slug}`, mainEntityOfPage: `${SITE}/blog/${p.slug}`,
        image: [`${SITE}${p.og}`, `${SITE}${p.image.file}`], datePublished: p.date, dateModified: p.modified,
        author: { '@type': 'Organization', name: 'Equipo de WIP', url: `${SITE}/` }, publisher: ORG,
        articleSection: c.name, inLanguage: 'es', wordCount: p.words, isPartOf: { '@type': 'Blog', name: 'Blog de WIP', url: `${SITE}/blog` } },
      crumbsLd([{ name: 'Inicio', url: '/' }, { name: 'Blog', url: '/blog' }, { name: c.name, url: `/blog/${c.slug}` }, { name: p.title, url: `/blog/${p.slug}` }]),
    ],
  }));
}

// ---------- /ebook ----------
const ebookCard = (e, h = 'h2') => `
        <li>
          <a class="ebook-card" href="/ebook/${e.slug}">
            <span class="ebook-card__img"><img src="${e.coverSm.file}" width="${e.coverSm.w}" height="${e.coverSm.h}" alt="Portada del ebook ${esc(e.title)}" loading="lazy" decoding="async"></span>
            <span class="ebook-card__body">
              <${h}>${esc(e.title)}</${h}>
              <p>${esc(e.excerpt)}</p>
              <span class="btn btn--primary">Descargar gratis</span>
            </span>
          </a>
        </li>`;
write('ebook', page({
  url: '/ebook', title: pageSeo.ebook.title, desc: pageSeo.ebook.desc, active: '/ebook',
  body: `
  <section class="page-head">
    <div class="container">
      <span class="eyebrow">Ebooks gratuitos</span>
      <h1>Ebooks gratuitos para mejorar tu operación</h1>
      <p>Descarga nuestras guías prácticas sobre gestión de proveedores, uberización y equipos de trabajo en campo. Solo te pedimos tus datos de contacto.</p>
    </div>
  </section>
  <section>
    <div class="container">
      <ul class="ebook-grid">${ebooks.map((e) => ebookCard(e)).join('')}
      </ul>
    </div>
  </section>
  <section class="related" aria-labelledby="rel">
    <div class="container">
      <h2 id="rel">Artículos recientes del blog</h2>
      <ul class="grid">${posts.slice(0, 3).map((r) => postCard(r, { heading: 'h3' })).join('')}
      </ul>
    </div>
  </section>`,
  ld: [
    { '@type': 'CollectionPage', name: 'Ebooks gratuitos de WIP', url: `${SITE}/ebook`, inLanguage: 'es',
      mainEntity: { '@type': 'ItemList', itemListElement: ebooks.map((e, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/ebook/${e.slug}` })) } },
    crumbsLd([{ name: 'Inicio', url: '/' }, { name: 'Ebooks', url: '/ebook' }]),
  ],
}));

// ---------- /ebook/<slug> ----------
for (const e of ebooks) {
  const others = ebooks.filter((x) => x.slug !== e.slug);
  const mb = (e.pdfBytes / 1048576).toFixed(1).replace('.', ',');
  const body = `
  <section class="ebook-page">
    <div class="container">
      <nav class="crumbs" aria-label="Ruta"><a href="/">Inicio</a><span aria-hidden="true">/</span><a href="/ebook">Ebooks</a><span aria-hidden="true">/</span><span>${esc(e.title)}</span></nav>
      <div class="ebook-layout">
        <div>
          <div class="ebook-intro">
            <img src="${e.coverSm.file}" srcset="${e.coverSm.file} ${e.coverSm.w}w, ${e.cover.file} ${e.cover.w}w" sizes="(max-width:640px) 110px, 200px" width="${e.cover.w}" height="${e.cover.h}" alt="Portada del ebook ${esc(e.title)}" fetchpriority="high" decoding="async">
            <div>
              <span class="eyebrow">Ebook gratis · PDF ${mb} MB</span>
              <h1>${esc(e.title)}</h1>
              <p>${esc(e.excerpt)}</p>
            </div>
          </div>
          <ol class="how" aria-label="Cómo obtenerlo">
            <li>Ingresa tus datos<span>Nombre, correo y teléfono.</span></li>
            <li>Descarga<span>El PDF queda disponible al instante.</span></li>
            <li>Disfruta<span>Aplica la guía en tu operación.</span></li>
          </ol>
        </div>
        <div>
          <form class="lead-form" id="ebook-form" novalidate>
            <h2>Descarga el ebook</h2>
            <p>Completa tus datos y descárgalo gratis.</p>
            <div class="hp-field" aria-hidden="true"><label>No llenar este campo <input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></div>
            <input type="hidden" name="ebook" value="${e.slug}">
            <div class="field">
              <label for="e-nombre">Nombre completo <span class="star">*</span></label>
              <input id="e-nombre" name="nombre" type="text" autocomplete="name" placeholder="Nombre completo" required>
            </div>
            <div class="field">
              <label for="e-email">Correo corporativo <span class="star">*</span></label>
              <input id="e-email" name="email" type="email" autocomplete="email" placeholder="nombre@empresa.com" required>
            </div>
            <div class="field">
              <label for="e-telefono">Teléfono <span class="star">*</span></label>
              <input id="e-telefono" name="telefono" type="tel" autocomplete="tel" placeholder="Teléfono" required>
            </div>
            <label class="consent"><input type="checkbox" name="acepto" required><span>Acepto la <a href="/politica-privacidad" target="_blank" rel="noopener">Política de privacidad y tratamiento de datos</a>.</span></label>
            <div class="form-error" id="ebook-error" role="alert" hidden></div>
            <button class="btn btn--primary" type="submit">Descargar ebook</button>
          </form>
          <div class="form-ok" id="ebook-ok" role="status" hidden>
            <h2>¡Listo! Tu ebook está disponible</h2>
            <p>Gracias por tu interés. Descárgalo ahora; nuestro equipo podría contactarte para ayudarte a aplicarlo.</p>
            <a class="btn btn--primary" id="ebook-download" href="/ebook" download>Descargar PDF</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="ebook-more" aria-labelledby="mas">
    <div class="container">
      <h2 id="mas">Otros ebooks gratuitos</h2>
      <ul class="ebook-grid">${others.map((x) => ebookCard(x, 'h3')).join('')}
      </ul>
    </div>
  </section>`;
  write(`ebook/${e.slug}`, page({
    url: `/ebook/${e.slug}`, title: e.metaTitle, desc: e.metaDesc, ogImage: e.og, ogAlt: `Portada del ebook ${e.title}`, active: '/ebook', body,
    preload: '<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>\n',
    scripts: `<script>\n${ebookJs}</script>\n`,
    ld: [
      { '@type': 'Book', name: e.title, description: e.metaDesc, url: `${SITE}/ebook/${e.slug}`, image: `${SITE}${e.cover.file}`, bookFormat: 'https://schema.org/EBook',
        inLanguage: 'es', isAccessibleForFree: true, author: ORG, publisher: ORG, datePublished: e.date },
      crumbsLd([{ name: 'Inicio', url: '/' }, { name: 'Ebooks', url: '/ebook' }, { name: e.title, url: `/ebook/${e.slug}` }]),
    ],
  }));
}

// ---------- Redirects de WordPress y cabeceras ----------
const vercelPath = path.join(root, 'vercel.json');
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
const OWN = /^\/(blog|ebook|ebook-confirmacion|herramientas|demo)(\/|$)/;
const keep = (vercel.redirects || []).filter((r) => !OWN.test(r.source));
const red = [
  { source: '/ebook-confirmacion', destination: '/ebook', permanent: true },
  { source: '/blog/page/:n', destination: '/blog', permanent: true },
  ...categories.map((c) => ({ source: `/blog/${c.slug}/page/:n`, destination: `/blog/${c.slug}`, permanent: true })),
  { source: '/herramientas/central-monitoreo', destination: '/#monitoreo', permanent: true },
  { source: '/herramientas/gps-tracker', destination: '/equipos#ubicacion', permanent: true },
  { source: '/herramientas/gps-tracker-wip', destination: '/equipos#ubicacion', permanent: true },
  { source: '/herramientas/app-colaborador', destination: '/equipos', permanent: true },
  { source: '/herramientas/experiencia-app-sin-app', destination: '/#whatsapp', permanent: true },
  { source: '/herramientas/app-sin-app', destination: '/#whatsapp', permanent: true },
  { source: '/herramientas/unidades-de-negocio', destination: '/', permanent: true },
  { source: '/herramientas', destination: '/', permanent: true },
  { source: '/demo', destination: '/#contacto', permanent: true },
];
vercel.redirects = [...keep, ...red];
vercel.headers = (vercel.headers || []).filter((h) => h.source !== '/ebooks/(.*)');
vercel.headers.push({ source: '/ebooks/(.*)', headers: [
  { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
  { key: 'Cache-Control', value: 'public, max-age=86400' },
] });
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n');

// ---------- Sitemap ----------
const smPath = path.join(root, 'public/sitemap.xml');
const sm = fs.readFileSync(smPath, 'utf8');
const blocks = (sm.match(/<url>[\s\S]*?<\/url>/g) || []).filter((b) => !/\/(blog|ebook)(<|\/)/.test(b));
const entry = (loc, lastmod, pr) => `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${pr}</priority>\n  </url>`;
const newest = posts.reduce((m, p) => (p.modified > m ? p.modified : m), '2000-01-01');
const today = new Date().toISOString().slice(0, 10);
const extra = [
  entry('/blog', today, '0.8'),
  ...categories.map((c) => entry(`/blog/${c.slug}`, c.posts.reduce((m, p) => (p.modified > m ? p.modified : m), newest), '0.5')),
  ...posts.map((p) => entry(`/blog/${p.slug}`, p.modified, '0.6')),
  entry('/ebook', today, '0.6'),
  ...ebooks.map((e) => entry(`/ebook/${e.slug}`, e.date, '0.5')),
];
fs.writeFileSync(smPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${blocks.map((b) => '  ' + b.trim()).join('\n')}\n${extra.join('\n')}\n</urlset>\n`);

console.log(`paginas: ${written.length} (${posts.length} articulos, ${categories.length} categorias, ${ebooks.length} ebooks + 2 listados)`);
console.log(`redirects propios: ${red.length}`);
