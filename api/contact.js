import { enviarEventoMeta } from './_meta-capi.js';
import { revisarEnvio } from './_antispam.js';

const RESEND_API_URL = 'https://api.resend.com/emails';
// Flujo F1 de n8n: crea el contacto como oportunidad en Kommo con su Origen (ruta difícil de adivinar; solo recibe datos).
const N8N_LEADS_URL = process.env.N8N_LEADS_URL || 'https://n8n.wiptool.com/webhook/leads-sitio-4f9b2c7e1a8d43e6b0d5';

// Le pasa el formulario a n8n; si n8n falla o tarda, el formulario sigue funcionando (el correo ya salió).
async function enviarAKommo(datos) {
  try {
    const r = await fetch(N8N_LEADS_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos),
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) console.error('n8n (Kommo) respondió', r.status);
  } catch (err) {
    console.error('No se pudo enviar el lead a n8n (Kommo)', err.message);
  }
}

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

  // Filtro de bots (ver _antispam.js). A los bloqueados se les responde ok sin enviar nada,
  // para que no sepan que fueron detectados.
  const revision = revisarEnvio(req, data);
  if (revision.nivel === 'bloqueado') {
    console.warn('Lead bloqueado como bot:', revision.motivos.join('; '), '|', data.email || '-');
    return res.status(200).json({ ok: true });
  }
  const sospechoso = revision.nivel === 'sospechoso';
  if (sospechoso) console.warn('Lead marcado como posible spam:', revision.motivos.join('; '), '|', data.email || '-');

  const { nombre, email, empresa, telefono, servicios, necesidad } = data;
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

  const avisoSpam = sospechoso
    ? `<p style="background:#fff3cd;padding:10px;border-radius:6px"><b>Posible spam.</b> No se creó en Kommo ni se reportó a Meta. Motivos: ${escapeHtml(revision.motivos.join(', '))}. Si es un cliente real, créalo a mano en Kommo.</p>`
    : '';
  const html = `
    ${avisoSpam}
    <h2>Nuevo lead desde wiptool.com</h2>
    <p><b>Nombre:</b> ${escapeHtml(nombre)}</p>
    <p><b>Correo:</b> ${escapeHtml(email)}</p>
    <p><b>Empresa:</b> ${escapeHtml(empresa)}</p>
    <p><b>Teléfono:</b> ${escapeHtml(telefono || '-')}</p>
    <p><b>Servicios mensuales:</b> ${escapeHtml(servicios || '-')}</p>
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
        subject: `${sospechoso ? '[Posible spam] ' : ''}Nuevo lead: ${empresa}`,
        html,
      }),
    });

    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'No se pudo enviar el correo' });
    }

    // Los sospechosos solo llegan por correo: no ensucian Kommo ni las conversiones de Meta.
    if (sospechoso) return res.status(200).json({ ok: true });

    await enviarAKommo({
      tipo: 'formulario_contacto', nombre, email, empresa, telefono: telefono || '', servicios: servicios || '', necesidad: necesidad || '',
      origen: data.origen || '', utm_source: data.utm_source || '', utm_medium: data.utm_medium || '', utm_campaign: data.utm_campaign || '',
      utm_content: data.utm_content || '', pagina: data.page || '',
    });
    await enviarEventoMeta(req, { evento: 'Lead', eventId: data.event_id, email, telefono, nombre, url: data.page, datos: { content_name: 'formulario_contacto' } });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
