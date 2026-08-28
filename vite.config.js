import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// En dev, Vite sirve páginas anidadas (equipos/index.html) en /equipos/ (con slash).
// Vercel resuelve /equipos -> equipos/index.html vía cleanUrls en producción;
// este middleware replica ese comportamiento en el servidor local.
function cleanUrlsDev() {
  return {
    name: 'clean-urls-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/equipos') {
          req.url = '/equipos/';
        } else if (req.url === '/cotizaciones/asisya01') {
          req.url = '/cotizaciones/asisya01/';
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
        politicaPrivacidad: resolve(__dirname, 'politica-privacidad.html'),
      },
    },
  },
});
