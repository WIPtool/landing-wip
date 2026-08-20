import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// En dev, Vite sirve páginas anidadas (teams/index.html) en /teams/ (con slash).
// Vercel resuelve /teams -> teams/index.html vía cleanUrls en producción;
// este middleware replica ese comportamiento en el servidor local.
function cleanUrlsDev() {
  return {
    name: 'clean-urls-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/teams') {
          req.url = '/teams/';
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
        teams: resolve(__dirname, 'teams/index.html'),
      },
    },
  },
});
