// Genera la imagen descargable de la guia (public/img/academy/guia-colaborador-wip.jpg)
// a partir de los mismos pasos de la pagina. Volver a correrlo si cambian los pasos o
// las capturas. Requiere Playwright con Chromium (no es dependencia del proyecto):
//   npm i --no-save playwright && npx playwright install chromium
//   node scripts/academy/poster.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { GUIDE_PATH, GUIDE_IMG, GUIDE_H1, GUIDE_LEAD, guideSteps } from './guide.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const pub = path.join(root, 'public');

// Las rutas absolutas (/fonts, /img) se vuelven relativas a public/ via <base>.
const css = fs.readFileSync(path.join(here, 'styles.css'), 'utf8').replace(/url\('\/fonts\//g, "url('fonts/");

const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8">
<base href="${pathToFileURL(pub).href}/">
<style>${css}
body{width:1080px;background:var(--surface)}
.poster__top{background:var(--navy);color:#fff;text-align:center;padding:44px 48px 40px}
.poster__top img{height:44px;width:auto;margin:0 auto 18px}
.poster__top .eyebrow{color:var(--lime);margin-bottom:10px}
.poster__top h1{color:#fff;font-size:44px}
.poster__top p{margin-top:12px;font-size:19px;color:rgba(255,255,255,.85)}
.steps{grid-template-columns:repeat(3,1fr);gap:18px;margin:28px 28px 0;padding:0}
.step--done{grid-column:auto;justify-content:center}
.step--done h3{font-size:22px}
.poster__foot{text-align:center;padding:28px 24px 36px;font-size:17px;color:var(--navy-soft)}
.poster__foot b{color:var(--navy)}
</style></head>
<body>
  <div class="poster__top">
    <img src="img/wip-logo-lima-94w.png" alt="WIP">
    <span class="eyebrow">Guía para colaboradores</span>
    <h1>${GUIDE_H1}</h1>
    <p>${GUIDE_LEAD}</p>
  </div>
  <ol class="steps">${guideSteps('img').replace(/ loading="lazy"/g, '')}
  </ol>
  <p class="poster__foot">Mira esta guía en línea: <b>wiptool.com${GUIDE_PATH}</b></p>
</body></html>`;

const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'wip-poster-')), 'poster.html');
fs.writeFileSync(tmp, html);
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1000 }, deviceScaleFactor: 1.5 });
await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode())]));
const out = path.join(pub, GUIDE_IMG);
await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 85 });
await browser.close();
console.log(`${path.relative(root, out)}: ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
