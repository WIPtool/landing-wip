const RESEND_API_URL = 'https://api.resend.com/emails';

// Ebooks disponibles (slug -> titulo y PDF). Debe coincidir con scripts/blog/data/ebooks.json;
// scripts/blog/build.mjs falla si no coinciden.
const EBOOKS = {
  'checklist-definitiva': { title: 'Checklist definitiva', pdf: '/ebooks/checklist-definitiva.pdf' },
  uberizacion: { title: 'Uberización', pdf: '/ebooks/uberizacion.pdf' },
  'gestion-de-equipos-de-trabajo-en-campo': { title: 'Gestión de equipos de trabajo en campo', pdf: '/ebooks/gestion-de-equipos-de-trabajo-en-campo.pdf' },
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

const clean = (v, max = 200) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const data = req.body || {};
  const ebook = EBOOKS[clean(data.ebook, 80)];

  // Honeypot: si viene lleno es un bot; respondemos como si todo hubiera ido bien.
  if (data['bot-field']) {
    return res.status(200).json({ ok: true, url: ebook ? ebook.pdf : '/ebook' });
  }

  const nombre = clean(data.nombre);
  const email = clean(data.email);
  const telefono = clean(data.telefono, 40);
  if (!ebook || !nombre || !email || !telefono || data.acepto !== true) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Correo no válido' });
  }
  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
    .map((k) => [k, clean(data[k], 100)]).filter(([, v]) => v);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'comercial@wiptool.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'WIP Web <onboarding@resend.dev>';
  const filas = [
    ['Ebook', ebook.title],
    ['Nombre', nombre],
    ['Correo', email],
    ['Teléfono', telefono],
    ['Aceptó términos y política de datos', 'Sí'],
    ...utm,
  ];
  const html = `
    <h2>Nueva descarga de ebook desde wiptool.com</h2>
    ${filas.map(([k, v]) => `<p><b>${escapeHtml(k)}:</b> ${escapeHtml(v)}</p>`).join('\n    ')}
  `;

  // La descarga no depende del correo: si el envio falla, el lead queda en los logs de Vercel.
  try {
    if (!apiKey) throw new Error('RESEND_API_KEY no configurada');
    const r = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, reply_to: email, subject: `Descarga de ebook: ${ebook.title} (${nombre})`, html }),
    });
    if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
  } catch (err) {
    console.error('Correo de ebook no enviado:', err.message, JSON.stringify(Object.fromEntries(filas)));
  }

  return res.status(200).json({ ok: true, url: ebook.pdf });
}
