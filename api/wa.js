// Enlaces a WhatsApp que se miden: /wa-ig, /wa-fb y /wa-email (rewrites en vercel.json) llegan aqui.
// Registra el clic en Google Analytics con su origen (Measurement Protocol) y redirige al
// chat de WIP con un mensaje que dice de donde viene la persona, para las etiquetas de
// WhatsApp Business. El clic se registra como click_whatsapp, el mismo evento de los
// botones del sitio, con el parametro origen (y correo, si el enlace trae ?c=).
import { registrarEvento, pieza, redirigir } from './_ga4.js';

const TELEFONO = '573005124111';
const ORIGENES = {
  instagram: 'Hola, vengo de Instagram y quiero saber más de WIP',
  facebook: 'Hola, vengo de Facebook y quiero saber más de WIP',
  email: 'Hola, vengo del correo de WIP y quiero saber más',
};

export default async function handler(req, res) {
  const origen = String(req.query.src || '').toLowerCase();
  const texto = ORIGENES[origen];
  if (texto) {
    const correo = pieza(req);
    await registrarEvento(req, 'click_whatsapp', correo ? { origen, correo } : { origen });
  }
  redirigir(res, `https://wa.me/${TELEFONO}` + (texto ? `?text=${encodeURIComponent(texto)}` : ''));
}
