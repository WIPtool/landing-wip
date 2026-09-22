/* Comprime el HTML publicado (dist) sin tocar el codigo fuente.
   Quita los comentarios y minifica el CSS y el JS que van en linea. No toca
   los espacios del HTML: colapsarlos cambia donde parten las lineas de texto
   y mueve la maquetacion. El JS tampoco se comprime ni se renombra, solo
   pierde comentarios y sangria. */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { minify } from 'html-minifier-terser';

const DIST = path.resolve('dist');
const OPCIONES = {
  collapseWhitespace: false,
  minifyCSS: true,
  minifyJS: { compress: false, mangle: false },
  removeComments: true,
  keepClosingSlash: true,
  removeAttributeQuotes: false,
  removeRedundantAttributes: false,
  sortAttributes: false,
  sortClassName: false,
};

const paginas = [];
const recorrer = (dir) => {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) recorrer(p);
    else if (f.endsWith('.html')) paginas.push(p);
  }
};
if (!fs.existsSync(DIST)) throw new Error('no existe dist, ejecuta vite build antes');
recorrer(DIST);

let antes = 0, despues = 0;
for (const p of paginas) {
  const origen = fs.readFileSync(p, 'utf8');
  const salida = await minify(origen, OPCIONES);

  /* Red de seguridad: los datos estructurados y las etiquetas que lee Google
     deben sobrevivir intactos, o la pagina se publica sin comprimir. */
  const ld = (s) => [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const ldAntes = ld(origen), ldDespues = ld(salida);
  let valido = ldAntes.length === ldDespues.length;
  if (valido) {
    for (let i = 0; i < ldDespues.length; i++) {
      try {
        if (JSON.stringify(JSON.parse(ldDespues[i])) !== JSON.stringify(JSON.parse(ldAntes[i]))) valido = false;
      } catch (e) { valido = false; }
    }
  }
  const etiqueta = (s, re) => (s.match(re) || []).length;
  for (const re of [/<title>/g, /<link rel="canonical"/g, /<meta name="description"/g, /<h1[\s>]/g, /<script/g, /<style/g]) {
    if (etiqueta(origen, re) !== etiqueta(salida, re)) valido = false;
  }
  if (!valido) {
    console.warn('sin comprimir (no paso la comprobacion):', path.relative(DIST, p));
    continue;
  }
  antes += Buffer.byteLength(origen);
  despues += Buffer.byteLength(salida);
  fs.writeFileSync(p, salida);
}
const br = (b) => zlib.brotliCompressSync(Buffer.from(b)).length;
const inicio = fs.existsSync(path.join(DIST, 'index.html')) ? br(fs.readFileSync(path.join(DIST, 'index.html'))) : 0;
console.log(`html comprimido: ${paginas.length} paginas, ${Math.round(antes / 1024)} KB -> ${Math.round(despues / 1024)} KB` +
  (inicio ? ` (portada ${Math.round(inicio / 1024)} KB con brotli)` : ''));
