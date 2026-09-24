// Registro de clics en Google Analytics 4 desde el servidor (Measurement Protocol).
// Lo usan los enlaces medidos que redirigen a WhatsApp o a Calendly (/wa-ig, /wa-email, /agenda-email...).
// Solo envia en produccion y si existe la variable de Vercel GA4_API_SECRET.
import { createHash } from 'node:crypto';

const MEDICION = 'G-2ZX12K09EW';
// Vistas previas de enlaces (Facebook, WhatsApp, Gmail, Outlook, etc.) y robots: se redirigen pero no cuentan.
// El navegador interno de Instagram y Facebook (FBAN, Instagram) si es una persona.
const ROBOT = /facebookexternalhit|facebot|meta-externalagent|whatsapp\/|bot\b|bot\/|crawler|spider|preview|slurp|curl|wget|python|headless|googleimageproxy|safelinks|barracuda|proofpoint|mimecast/i;

export async function registrarEvento(req, nombre, params) {
  const secreto = process.env.GA4_API_SECRET;
  if (!secreto) return; // Sin la clave de Analytics configurada no se envia nada.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return;
  const ua = String(req.headers['user-agent'] || '');
  if (req.method !== 'GET' || !ua || ROBOT.test(ua)) return;

  // Identificador anonimo y estable para no contar dos veces a la misma persona el mismo dia.
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const dia = new Date().toISOString().slice(0, 10);
  const h = createHash('sha256').update(`${ip}|${ua}|${dia}`).digest();
  const clientId = `${h.readUInt32BE(0)}.${h.readUInt32BE(4)}`;

  try {
    const r = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${MEDICION}&api_secret=${encodeURIComponent(secreto)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: nombre, params: { ...params, engagement_time_msec: 1 } }],
      }),
      signal: AbortSignal.timeout(1500),
    });
    if (!r.ok) console.error('GA4 MP', r.status);
  } catch (err) {
    console.error('GA4 MP no enviado:', err.message);
  }
}

// Identificador corto del correo o pieza (?c=3, ?c=bienvenida): solo letras, numeros, guion y guion bajo.
export function pieza(req) {
  return String(req.query.c || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
}

export function redirigir(res, destino) {
  res.statusCode = 302;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Location', destino);
  res.end();
}
