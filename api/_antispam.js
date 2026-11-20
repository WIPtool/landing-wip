// Filtro de bots para los formularios del sitio.
//
// Dos niveles:
// 1. "bloqueado": señales de que el envío no salió del formulario real del sitio
//    (campo trampa lleno, sin página de origen, sin event_id válido, enviado desde otro dominio).
//    Se responde ok al bot y no se manda nada.
// 2. "sospechoso": salió del formulario, pero el contenido parece generado
//    (empresa inventada en inglés, texto en inglés sin sentido, enlaces, teléfono de EE. UU.).
//    No se crea en Kommo ni se reporta a Meta; el correo llega marcado [Posible spam] para revisarlo.

const HOSTS_OK = /(^|\.)wiptool\.com$|^localhost$|^127\.0\.0\.1$|\.vercel\.app$/i;

function hostDe(url) {
  try { return new URL(url).hostname; } catch { return ''; }
}

// Todos los formularios del sitio mandan event_id = 'ev-' + Date.now() en base 36 + '-' + aleatorio.
function horaDelEventId(eventId) {
  const m = /^ev-([0-9a-z]{6,12})-[0-9a-z]{4,12}$/.exec(String(eventId || ''));
  return m ? parseInt(m[1], 36) : null;
}

const PALABRAS_ES = /\b(de|la|el|que|en|para|con|los|las|una?|servicios?|empresa|necesito|necesitamos|quiero|queremos|gesti[oó]n|operaci[oó]n|asistencias?|gr[uú]as?|t[eé]cnicos?|clientes?|hola|buen[oa]s?|informaci[oó]n|demo|cotizaci[oó]n|precio)\b/i;

export function revisarEnvio(req, data) {
  const motivos = [];

  // --- Nivel 1: no viene del formulario real ---
  if (data['bot-field']) motivos.push('campo trampa lleno');
  const pagina = hostDe(data.page);
  if (!pagina || !HOSTS_OK.test(pagina)) motivos.push('sin página del sitio');
  const t = horaDelEventId(data.event_id);
  if (t === null) motivos.push('sin event_id válido');
  else if (Math.abs(Date.now() - t) > 2 * 60 * 60 * 1000) motivos.push('event_id viejo o futuro');
  const origen = hostDe(req.headers.origin || req.headers.referer || '');
  if (origen && !HOSTS_OK.test(origen)) motivos.push('enviado desde otro dominio: ' + origen);
  if (motivos.length) return { nivel: 'bloqueado', motivos };

  // --- Nivel 2: contenido que parece generado por un bot ---
  let puntos = 0;
  const empresa = String(data.empresa || '').trim();
  const necesidad = String(data.necesidad || '').trim();
  const nombre = String(data.nombre || '').trim();
  const telefono = String(data.telefono || '').replace(/\s/g, '');

  const todo = [nombre, empresa, necesidad].join(' ');
  if (/https?:\/\/|www\.|\[url|<a\s/i.test(todo)) { puntos += 2; motivos.push('trae enlaces'); }
  // Nombres de empresa de los generadores de datos falsos: "Christiansen, Grimes and Kreiger", "Wolf - Hand", "Kub LLC"
  if (/^[A-Z][a-z]+(, [A-Z][a-z]+)* and [A-Z][a-z]+$|^[A-Z][a-z]+ - [A-Z][a-z]+$|^[A-Z][a-z]+ (LLC|Inc|Group|and Sons)$/.test(empresa)) {
    puntos += 1; motivos.push('empresa con forma de nombre falso');
  }
  if (necesidad.length > 15 && !PALABRAS_ES.test(necesidad) && !/[áéíóúñ¿¡]/i.test(necesidad)) {
    puntos += 1; motivos.push('necesidad sin español');
  }
  if (/^\+?1\(?\d{3}/.test(telefono)) { puntos += 1; motivos.push('teléfono de EE. UU./Canadá'); }
  if (/\d{4,}@/.test(String(data.email || ''))) { puntos += 0.5; motivos.push('correo con muchos números'); }

  if (puntos >= 2) return { nivel: 'sospechoso', motivos };
  return { nivel: 'ok', motivos };
}
