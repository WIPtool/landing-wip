// Optimiza las páginas generadas por armar-sitio.cjs, en el mismo lugar:
// 1) quita del <style> las reglas que la página no usa (PurgeCSS, con lista de clases que agrega el JS),
// 2) pone width/height a las imágenes que no los tienen (evita saltos de diseño),
// 3) agrega srcset/sizes a las imágenes grandes que tienen versiones livianas (scripts/sitio/imagenes.json).
// Uso: node scripts/sitio/optimizar.cjs <archivo.html> [...]
const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');

const imgs = JSON.parse(fs.readFileSync(path.join(__dirname, 'imagenes.json'), 'utf8'));
const dims = imgs.__dims || {};

// Clases y estados que el JS agrega en tiempo de ejecución o que se arman por concatenación.
const safelist = {
  standard: ['in', 'on', 'ok', 'open', 'show', 'active', 'is-open', 'is-resolved', 'scrolled', 'hidden', 'sent', 'error', 'loading', 'done', 'playing', 'visible', 'vivo'],
  deep: [/^iti/, /^calendly/, /^mon__/, /^ck-/, /^cookie/, /^consent/, /^xm/, /^nav/, /^menu/, /^sx-/, /^pl-/, /^ix-/, /^amap/, /^rmap/, /^asg/, /^pslide/, /^brd/, /^wh-/, /^wn/, /^cht/, /^cp/, /^as__/, /^ap-/, /^cb-/, /^fx/, /^dd/],
  greedy: [/--on$/, /--active$/, /is-/],
};

function imagenes(html) {
  return html.replace(/<img\b[^>]*>/g, (tag) => {
    const src = (tag.match(/\ssrc="([^"]+)"/) || [])[1];
    if (!src) return tag;
    let t = tag;
    const d = dims[src] || (imgs[src] && [imgs[src].w, imgs[src].h]);
    if (d && !/\swidth=/.test(t) && !/\sheight=/.test(t)) t = t.replace(/<img\b/, `<img width="${d[0]}" height="${d[1]}"`);
    const v = imgs[src];
    if (v && v.variants && v.variants.length && !/\ssrcset=/.test(t)) {
      const set = v.variants.map(([p, w]) => `${p} ${w}w`).concat(`${src} ${v.w}w`).join(', ');
      t = t.replace(/<img\b/, `<img srcset="${set}" sizes="${v.sizes}"`);
    }
    return t;
  });
}

async function cssUsado(html) {
  const bloques = [...html.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)];
  let out = html;
  for (const [entero, attrs, css] of bloques) {
    if (css.length < 2000) continue;
    const [res] = await new PurgeCSS().purge({
      content: [{ raw: html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, ''), extension: 'html' }],
      css: [{ raw: css }],
      safelist,
      keyframes: false,
      fontFace: false,
      variables: false,
    });
    out = out.replace(entero, `<style${attrs}>${res.css}</style>`);
  }
  return out;
}

(async () => {
  for (const f of process.argv.slice(2)) {
    const antes = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
    let html = imagenes(antes);
    html = await cssUsado(html);
    fs.writeFileSync(f, html.replace(/\n/g, '\r\n'));
    console.log('optimizado', f, (antes.length / 1024).toFixed(0) + ' KB ->', (html.length / 1024).toFixed(0) + ' KB');
  }
})();
