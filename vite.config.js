import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';
import { existsSync, readdirSync, statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Paginas generadas por scripts/blog/build.mjs: blog/**/index.html y ebook/**/index.html.
function generatedPages() {
  const out = {};
  const walk = (dir) => {
    const abs = resolve(__dirname, dir);
    if (!existsSync(abs)) return;
    if (existsSync(join(abs, 'index.html'))) out[dir.replace(/[/]/g, '_')] = join(abs, 'index.html');
    for (const d of readdirSync(abs)) if (statSync(join(abs, d)).isDirectory()) walk(dir + '/' + d);
  };
  walk('blog');
  walk('ebook');
  walk('contacto');
  // Paginas de solucion: /software-...
  for (const d of readdirSync(__dirname)) if (d.startsWith('software-') && statSync(resolve(__dirname, d)).isDirectory()) walk(d);
  return out;
}

// En dev, Vite sirve páginas anidadas (equipos/index.html) en /equipos/ (con slash).
// Vercel resuelve /equipos -> equipos/index.html vía cleanUrls en producción;
// este middleware replica ese comportamiento en el servidor local.
function cleanUrlsDev() {
  return {
    name: 'clean-urls-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/academy') {
          req.url = '/academy/';
        } else if (req.url === '/inscripcion' || req.url.startsWith('/inscripcion?')) {
          req.url = '/inscripcion/' + req.url.slice('/inscripcion'.length);
        } else if (req.url === '/equipos') {
          req.url = '/equipos/';
        } else if (req.url === '/cotizaciones/asisya01') {
          req.url = '/cotizaciones/asisya01/';
        } else if (req.url === '/cotizaciones/auxilia01') {
          req.url = '/cotizaciones/auxilia01/';
        } else if (req.url === '/cotizaciones/sotrandes01') {
          req.url = '/cotizaciones/sotrandes01/';
        } else if (req.url === '/cotizaciones/Hisercol01') {
          req.url = '/cotizaciones/Hisercol01/';
        } else if (req.url === '/cotizaciones/MiguelBustamante') {
          req.url = '/cotizaciones/MiguelBustamante/';
        } else if (req.url === '/inversion/onepager') {
          req.url = '/inversion/onepager/';
        } else if (req.url === '/informeFixit/WipIA') {
          req.url = '/informeFixit/WipIA/';
        } else if (req.url === '/informeWip/AviseAsistencia') {
          req.url = '/informeWip/AviseAsistencia/';
        } else if (/^\/(blog|ebook|contacto|software-[\w-]+)(\/[\w-]+)*(\?.*)?$/.test(req.url)) {
          const [p, q] = req.url.split('?');
          req.url = p + '/' + (q ? '?' + q : '');
        }
        next();
      });
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [cleanUrlsDev()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        equipos: resolve(__dirname, 'equipos/index.html'),
        cotizacionesAsisya01: resolve(__dirname, 'cotizaciones/asisya01/index.html'),
        cotizacionesAuxilia01: resolve(__dirname, 'cotizaciones/auxilia01/index.html'),
        cotizacionesSotrandes01: resolve(__dirname, 'cotizaciones/sotrandes01/index.html'),
        cotizacionesHisercol01: resolve(__dirname, 'cotizaciones/Hisercol01/index.html'),
        cotizacionesMiguelBustamante: resolve(__dirname, 'cotizaciones/MiguelBustamante/index.html'),
        inversionOnepager: resolve(__dirname, 'inversion/onepager/index.html'),
        informeFixitWipIA: resolve(__dirname, 'informeFixit/WipIA/index.html'),
        informeWipAviseAsistencia: resolve(__dirname, 'informeWip/AviseAsistencia/index.html'),
        politicaPrivacidad: resolve(__dirname, 'politica-privacidad.html'),
        inscripcion: resolve(__dirname, 'inscripcion/index.html'),
        academy: resolve(__dirname, 'academy/index.html'),
        ...generatedPages(),
      },
    },
  },
});
