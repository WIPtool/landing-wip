// Pasos de la guia de descarga de la app (los usan build.mjs y poster.mjs).
import { appSteps } from './data.mjs';

export const GUIDE_PATH = '/academy/guia-colaborador';
export const GUIDE_IMG = '/img/academy/guia-colaborador-wip.jpg';
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// imgBase: '/img' en la web; poster.mjs usa una ruta relativa.
export const guideSteps = (imgBase = '/img') => appSteps.map((s, i) => {
  let media = '';
  if (s.img) {
    media = `
            <div class="phone"><img src="${imgBase}/academy/app/${s.img}.jpg" width="540" height="1200" alt="${esc(`Paso ${i + 1}: ${s.title}`)}" loading="lazy" decoding="async"></div>`;
  }
  return `
          <li class="step${s.done ? ' step--done' : ''}">
            <div class="step__head">
              <span class="step__n">${s.done ? '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4Z"/></svg><span class="sr-only">Listo</span>' : i + 1}</span>
              <h3>${esc(s.title)}</h3>
            </div>
            <p>${esc(s.text)}</p>${media}
          </li>`;
}).join('');

export const GUIDE_H1 = 'Descarga la app y conéctate con tu empresa';
export const GUIDE_LEAD = `Sigue estos ${appSteps.length} pasos desde tu celular para empezar a recibir y gestionar servicios en WIP.`;
