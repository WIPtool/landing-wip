const RESEND_API_URL = 'https://api.resend.com/emails';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
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

  const { nombre, email, empresa, telefono, necesidad } = data;
  if (!nombre || !email || !empresa) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada');
    return res.status(500).json({ error: 'Servicio de correo no configurado' });
  }

  const to = process.env.CONTACT_TO_EMAIL || 'comercial@wiptool.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'WIP Web <onboarding@resend.dev>';

  const html = `
    <h2>Nuevo lead desde wiptool.com</h2>
    <p><b>Nombre:</b> ${escapeHtml(nombre)}</p>
    <p><b>Correo:</b> ${escapeHtml(email)}</p>
    <p><b>Empresa:</b> ${escapeHtml(empresa)}</p>
    <p><b>Teléfono:</b> ${escapeHtml(telefono || '-')}</p>
    <p><b>Necesidad:</b><br>${escapeHtml(necesidad || '-').replace(/\n/g, '<br>')}</p>
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
        subject: `Nuevo lead: ${empresa}`,
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
