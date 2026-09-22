// API de conversiones de Meta: envia desde el servidor las mismas conversiones que el pixel
// manda desde el navegador. Asi no se pierden cuando el visitante tiene un bloqueador.
// Meta las deduplica porque el navegador y el servidor comparten el mismo event_id.
// (El guion bajo en el nombre hace que Vercel no lo publique como una ruta /api.)
import { createHash } from 'node:crypto';

const PIXEL_ID = '7944401458963798';
const GRAPH = process.env.META_GRAPH_VERSION || 'v23.0';

const sha256 = (v) => createHash('sha256').update(v).digest('hex');
const normalizar = {
  email: (v) => String(v || '').trim().toLowerCase(),
  // Solo digitos, con el indicativo del pais (el formulario ya lo envia en formato internacional).
  telefono: (v) => String(v || '').replace(/\D/g, ''),
  nombre: (v) => String(v || '').trim().toLowerCase().split(/\s+/)[0] || '',
};

function cookie(req, nombre) {
  const m = (req.headers.cookie || '').match(new RegExp('(?:^|;\\s*)' + nombre + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/**
 * Envia un evento a Meta. Nunca lanza errores ni tarda mas de 3 segundos:
 * un fallo aqui no puede afectar al formulario.
 */
export async function enviarEventoMeta(req, { evento, eventId, email, telefono, nombre, url, datos = {} }) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return; // Sin token configurado no se envia nada.
  // Solo produccion: las vistas previas de Vercel no deben sumar conversiones.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return;

  const userData = {
    client_ip_address: String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined,
    client_user_agent: req.headers['user-agent'],
    fbp: cookie(req, '_fbp'),
    fbc: cookie(req, '_fbc'),
  };
  if (email) userData.em = [sha256(normalizar.email(email))];
  const tel = normalizar.telefono(telefono);
  if (tel.length >= 7) userData.ph = [sha256(tel)];
  const fn = normalizar.nombre(nombre);
  if (fn) userData.fn = [sha256(fn)];

  const cuerpo = {
    data: [{
      event_name: evento,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId || undefined,
      action_source: 'website',
      event_source_url: url || req.headers.referer || 'https://www.wiptool.com/',
      user_data: userData,
      custom_data: datos,
    }],
  };
  if (process.env.META_TEST_EVENT_CODE) cuerpo.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const r = await fetch(`https://graph.facebook.com/${GRAPH}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) console.error('Meta CAPI', r.status, (await r.text()).slice(0, 300));
  } catch (err) {
    console.error('Meta CAPI no enviado:', err.message);
  }
}
