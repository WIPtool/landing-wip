import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// En dev, Vite sirve páginas anidadas (pymes/index.html) en /pymes/ (con slash).
// Vercel resuelve /pymes -> pymes/index.html vía cleanUrls en producción;
// este middleware replica ese comportamiento en el servidor local.
function cleanUrlsDev() {
  return {
    name: 'clean-urls-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/pymes') {
          req.url = '/pymes/';
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
        pymes: resolve(__dirname, 'pymes/index.html'),
      },
    },
  },
});
