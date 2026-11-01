// Guias graficas paso a paso (las usan build.mjs y poster.mjs):
//  - colaborador: descarga de la app, capturas de celular (540x1200) en public/img/academy/app/
//  - operador: plataforma web, capturas de escritorio (1600x1000) en public/img/academy/plataforma/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appSteps, webSteps } from './data.mjs';

const pub = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public');

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// **x** -> negrita (boton o etiqueta de la plataforma); [x](url) -> enlace
const fmt = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

export const GUIDES = {
  colaborador: {
    path: '/academy/guia-colaborador',
    img: '/img/academy/guia-colaborador-wip.jpg',
    // /img se cachea un ano: el ?v obliga a pedir de nuevo las capturas y la imagen cuando se reemplazan en la misma ruta.
    imgV: 2, shotsV: 2,
    file: 'guia-wip-colaboradores.jpg',
    title: 'Guía para colaboradores: descarga la app de WIP | WIP Academy',
    description: 'Paso a paso con imágenes para que tus colaboradores descarguen la app Wip colaboradores, se registren y se conecten con tu empresa.',
    eyebrow: 'Guía para colaboradores',
    h1: 'Descarga la app y conéctate con tu empresa',
    lead: `Sigue estos ${appSteps.length} pasos desde tu celular para empezar a recibir y gestionar servicios en WIP.`,
    back: { href: '/academy#colaborador', text: 'Ver los cursos en video para colaboradores →' },
    steps: appSteps, shots: 'app', web: false,
  },
  operador: {
    path: '/academy/guia-operador',
    img: '/img/academy/guia-operador-wip.jpg',
    // /img se cachea un ano: el ?v obliga a pedir la imagen de nuevo (la ruta estuvo publicada en 404 antes de existir).
    imgV: 2,
    file: 'guia-wip-operadores.jpg',
    title: 'Guía para operadores: entra a la plataforma de WIP | WIP Academy',
    description: 'Paso a paso con imágenes para que tus operadores creen su cuenta en la plataforma web de WIP y se conecten con tu empresa.',
    eyebrow: 'Guía para operadores',
    h1: 'Crea tu cuenta y conéctate con tu empresa',
    lead: 'Desde el computador vas a crear tu cuenta en la plataforma web de WIP y conectarte con la empresa que te invitó, para gestionar sus servicios.',
    back: { href: '/academy#usuarios', text: 'Ver los cursos en video para operadores →' },
    steps: webSteps, shots: 'plataforma', web: true,
  },
};

const shotFile = (g, s) => path.join(pub, 'img/academy', g.shots, `${s.img}.jpg`);
// Capturas que todavia no estan en public/: en la pagina se ve un marcador del mismo tamano.
export const missingShots = (g) => g.steps.filter((s) => s.img && !fs.existsSync(shotFile(g, s))).map((s) => `/img/academy/${g.shots}/${s.img}.jpg`);

// imgBase: '/img' en la web; poster.mjs usa una ruta relativa.
export const guideSteps = (g, imgBase = '/img') => g.steps.map((s, i) => {
  const alt = esc(`Paso ${i + 1}: ${s.title}`);
  let media = '';
  if (s.img && !g.web) {
    media = `
            <div class="phone"><img src="${imgBase}/academy/${g.shots}/${s.img}.jpg${g.shotsV ? `?v=${g.shotsV}` : ''}" width="540" height="1200" alt="${alt}" loading="lazy" decoding="async"></div>`;
  } else if (s.img) {
    media = fs.existsSync(shotFile(g, s))
      ? `
            <div class="screen"><img src="${imgBase}/academy/${g.shots}/${s.img}.jpg" width="1600" height="1000" alt="${alt}" loading="lazy" decoding="async"></div>`
      : `
            <div class="screen"><div class="screen__ph" role="img" aria-label="${alt}"><svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M5 21q-.8 0-1.4-.6T3 19V5q0-.8.6-1.4T5 3h14q.8 0 1.4.6T21 5v14q0 .8-.6 1.4T19 21Zm0-2h14V5H5Zm1-2h12l-3.8-5-3 4-2.2-3Z"/></svg>Captura pendiente</div></div>`;
  }
  const body = s.list
    ? `<ul class="step__list">${s.list.map((t) => `<li>${fmt(t)}</li>`).join('')}</ul>`
    : `<p>${fmt(s.text)}</p>`;
  return `
          <li class="step${s.done ? ' step--done' : ''}">
            <div class="step__head">
              <span class="step__n">${s.done ? '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4Z"/></svg><span class="sr-only">Listo</span>' : i + 1}</span>
              <h3>${esc(s.title)}</h3>
            </div>
            ${body}${media}
          </li>`;
}).join('');
