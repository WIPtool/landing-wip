// Enlaces a WhatsApp que se miden: /wa-ig y /wa-fb (rewrites en vercel.json) llegan aqui.
// Registra el clic en Google Analytics con su origen (Measurement Protocol) y redirige al
// chat de WIP con un mensaje que dice de donde viene la persona, para las etiquetas de
// WhatsApp Business. El clic se registra como click_whatsapp, el mismo evento de los
// botones del sitio, con el parametro origen.
import { createHash } from 'node:crypto';

const TELEFONO = '573005124111';
const MEDICION = 'G-2ZX12K09EW';
const ORIGENES = {
  instagram: 'Hola, vengo de Instagram y quiero saber más de WIP',
  facebook: 'Hola, vengo de Facebook y quiero saber más de WIP',
};
// Vistas previas de enlaces (Facebook, WhatsApp, etc.) y robots: se redirigen pero no cuentan.
// El navegador interno de Instagram y Facebook (FBAN, Instagram) si es una persona.
const ROBOT = /facebookexternalhit|facebot|meta-externalagent|whatsapp\/|bot\b|bot\/|crawler|spider|preview|slurp|curl|wget|python|headless/i;

async function registrarClic(req, origen) {
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
        events: [{ name: 'click_whatsapp', params: { origen, engagement_time_msec: 1 } }],
      }),
      signal: AbortSignal.timeout(1500),
    });
    if (!r.ok) console.error('GA4 MP', r.status);
  } catch (err) {
    console.error('GA4 MP no enviado:', err.message);
  }
}

export default async function handler(req, res) {
  const origen = String(req.query.src || '').toLowerCase();
  const texto = ORIGENES[origen];
  if (texto) await registrarClic(req, origen);
  res.statusCode = 302;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Location', `https://wa.me/${TELEFONO}` + (texto ? `?text=${encodeURIComponent(texto)}` : ''));
  res.end();
}
