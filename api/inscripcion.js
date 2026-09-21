const RESEND_API_URL = 'https://api.resend.com/emails';

// Copias fijas de cada inscripcion (ademas del buzon comercial).
const INSCRIPCION_CC = ['auxadministrativo@wiptool.com', 'jessica@wiptool.com'];

const PLANES = [
  'Plan Básico - Esencial',
  'Plan Avanzado',
  'Plan Pro',
  'Plan Básico - Esencial anualidad',
  'Plan Avanzado anualidad',
  'Plan Pro anualidad',
  'Plan corporativo personalizado',
];

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function clean(value, max = 200) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body || {};

  // Honeypot: si el campo oculto viene lleno, es un bot. Respondemos ok sin enviar nada.
  if (data['bot-field']) {
    return res.status(200).json({ ok: true });
  }

  const nombre = clean(data.nombre);
  const email = clean(data.email);
  const empresa = clean(data.empresa);
  const nit = clean(data.nit, 60);
  const pais = clean(data.pais, 80);
  const departamento = clean(data.departamento, 80);
  const ciudad = clean(data.ciudad, 80);
  const direccion = clean(data.direccion, 250);
  const telefono = clean(data.telefono, 40);
  const tipoServicio = clean(data.tipo_servicio);
  const plan = clean(data.plan, 80);
  const codigo = clean(data.codigo, 60);

  const faltantes = [nombre, email, empresa, nit, pais, departamento, ciudad, direccion, telefono, plan].some((v) => !v);
  if (faltantes || data.acepto !== true) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Correo no válido' });
  }
  if (!PLANES.includes(plan)) {
    return res.status(400).json({ error: 'Plan no válido' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada');
    return res.status(500).json({ error: 'Servicio de correo no configurado' });
  }

  const principal = process.env.CONTACT_TO_EMAIL || 'comercial@wiptool.com';
  const to = [...new Set([principal, ...INSCRIPCION_CC].map((m) => m.trim().toLowerCase()))];
  const from = process.env.CONTACT_FROM_EMAIL || 'WIP Web <onboarding@resend.dev>';

  const filas = [
    ['Nombre', nombre],
    ['Correo', email],
    ['Razón social', empresa],
    ['NIT', nit],
    ['País', pais],
    ['Departamento', departamento],
    ['Ciudad', ciudad],
    ['Dirección', direccion],
    ['Celular', telefono],
    ['Tipo de servicio que presta', tipoServicio || '-'],
    ['Plan', plan],
    ['Código promocional', codigo || '-'],
  ];
  const html = `
    <h2>Nueva inscripción desde wiptool.com/inscripcion</h2>
    ${filas.map(([k, v]) => `<p><b>${k}:</b> ${escapeHtml(v)}</p>`).join('\n    ')}
    <p><b>Aceptó las Políticas de Privacidad:</b> Sí</p>
  `;

  try {
    const r = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `Nueva inscripción: ${empresa} (${plan})`,
        html,
      }),
    });

    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'No se pudo enviar el correo' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
