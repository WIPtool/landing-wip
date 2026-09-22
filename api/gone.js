// Responde 410 (eliminada definitivamente) a las paginas del sitio anterior que no deben
// volver a aparecer en Google, como las de solicitud de servicios de grua de /asiste/.
// WIP es software de gestion y no presta esos servicios.
export default function handler(req, res) {
  res.statusCode = 410;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.end(`<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow"><title>Esta página ya no existe | WIP</title>
<style>body{font-family:Arial,Helvetica,sans-serif;background:#f9f9fb;color:#161d31;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px;text-align:center}
a{display:inline-block;margin-top:18px;background:#dbff57;color:#161d31;padding:12px 20px;border-radius:999px;font-weight:700;text-decoration:none}p{color:#45464d;max-width:520px}</style></head>
<body><main><h1>Esta página ya no existe</h1>
<p>WIP es un software de gestión de servicios en campo para empresas. No prestamos servicios de grúa ni de asistencia directamente.</p>
<a href="/">Conoce WIP</a></main></body></html>`);
}
