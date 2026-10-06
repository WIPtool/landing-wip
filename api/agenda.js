// Enlace medido a la agenda comercial en Calendly: /agenda-email (secuencias de Brevo), /agenda-explee (prospeccion
// en frio de Explee) y /agenda-ig, /agenda-fb, /agenda-meta (los usa el agente de WhatsApp segun de donde llego la
// persona, con ?c=kommo-<id> para que la cita mueva esa oportunidad), rewrites en vercel.json, llegan aqui.
// Registra el clic en Google Analytics como click_calendly (el mismo evento de los botones del
// sitio) con su origen, y redirige a Calendly con UTM para que la cita agendada quede con su
// origen en Calendly. ?c= identifica el correo de la secuencia (utm_content y parametro correo).
import { registrarEvento, pieza, redirigir } from './_ga4.js';

const CALENDLY = 'https://calendly.com/comercial-wiptool/acercamiento-wip';
const ORIGENES = {
  email: { utm_source: 'brevo', utm_medium: 'email', utm_campaign: 'secuencias' },
  explee: { utm_source: 'explee', utm_medium: 'email', utm_campaign: 'prospeccion' },
  instagram: { utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'whatsapp' },
  facebook: { utm_source: 'facebook', utm_medium: 'social', utm_campaign: 'whatsapp' },
  meta_ads: { utm_source: 'meta_ads', utm_medium: 'paid_social', utm_campaign: 'whatsapp' },
};

export default async function handler(req, res) {
  const origen = String(req.query.src || '').toLowerCase();
  const utm = ORIGENES[origen];
  if (!utm) return redirigir(res, CALENDLY);

  const correo = pieza(req);
  await registrarEvento(req, 'click_calendly', correo ? { origen, correo } : { origen });
  const q = new URLSearchParams(correo ? { ...utm, utm_content: correo } : utm);
  redirigir(res, `${CALENDLY}?${q}`);
}
