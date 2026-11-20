// Arma el sitio: la home (/), las landings /software-empresas-de-asistencia (aseguradoras) y
// /proveedores-de-asistencia (proveedores), y /preguntas-frecuentes.
// Toma la plantilla de una sola página (base.html) como base de estilos, menú, pie y scripts,
// y copia sin cambios los bloques de seguimiento y formulario del index anterior.
// Uso, desde la raíz del repo: node scripts/sitio/armar-sitio.cjs scripts/sitio/index-anterior.html .
const fs = require('fs');
const path = require('path');
const [, , srcPath, repo] = process.argv;
const here = __dirname;
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const part = (f) => read(path.join(here, 'parts', f));
const src = read(srcPath);
let base = read(path.join(here, 'base.html'));

function between(text, start, end, inclusiveEnd = true) {
  const a = text.indexOf(start);
  if (a < 0) throw new Error('No encontré: ' + start.slice(0, 60));
  const b = text.indexOf(end, a + start.length);
  if (b < 0) throw new Error('Sin cierre para: ' + start.slice(0, 60));
  return text.slice(a, inclusiveEnd ? b + end.length : b);
}
function rep(t, a, b) {
  if (!t.includes(a)) throw new Error('Falta: ' + a.slice(0, 80));
  return t.split(a).join(b);
}

// ---------- Bloques copiados del index anterior ----------
const blocks = {
  BOOT: src.slice(0, src.indexOf('<title>')),
  VENDOR_CSS: between(src, '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input', '<script>', false).trim(),
  LOADERS: between(src, '<script>\n/* Calendly se carga', '</script>'),
  PIXEL: between(src, '<script>\n/* Pixel de Meta', '</script>'),
  WA_FAB: between(src, '<a class="wa-fab"', '</a>'),
  CONTACT_JS: between(src, '<script id="contact-js">', '</script>'),
  CONVERSION_JS: between(src, '<script id="conversion-events-js">', '</script>'),
};
const social = between(src, '<div class="footer__col footer__col--social">', '</div>');
blocks.SOCIAL = (social.match(/<a [\s\S]*?<\/a>/g) || []).map((a) => '        ' + a).join('\n');
const seen = new Set();
const logos = [];
for (const m of src.matchAll(/<div class="client-logo">(<img [^>]*alt="([^"]+)"[^>]*>)<\/div>/g)) {
  if (seen.has(m[2])) continue;
  seen.add(m[2]);
  logos.push(m[1]);
}
if (logos.length < 6) throw new Error('Pocos logos: ' + logos.length);
blocks.LOGOS = [
  ...logos.map((img) => `        <div>${img}</div>`),
  ...logos.map((img) => `        <div aria-hidden="true">${img.replace(/alt="[^"]*"/, 'alt=""')}</div>`),
].join('\n');

// ---------- Cascarón común: estilos, menú, pie y scripts ----------
const mainA = base.indexOf('<main>\n') + '<main>\n'.length, mainB = base.indexOf('</main>');
const oldMain = base.slice(mainA, mainB);
let shell = base.slice(0, mainA) + '{{MAIN}}\n' + base.slice(mainB);

shell = shell.replace(/<title>[^<]*<\/title>/, '<title>{{TITLE}}</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="{{DESC}}">')
  .replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="https://www.wiptool.com{{PATH}}">')
  .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="{{TITLE}}">')
  .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="{{DESC}}">')
  .replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://www.wiptool.com{{PATH}}">');
for (const k of ['{{TITLE}}</title>', 'content="{{DESC}}"', 'wiptool.com{{PATH}}">']) if (!shell.includes(k)) throw new Error('Cabecera sin ' + k);

// Estilos: el planeta sale (el hero ahora muestra la tarjeta viva) y entran los de las tres páginas.
shell = shell.replace(/\/\* Planeta WIP de fondo[^\n]*\n/, '')
  .replace(/^\.world[^\n]*\n/gm, '').replace(/^@keyframes worldIn[^\n]*\n/m, '').replace(/^@media\(max-width:700px\)\{\.world[^\n]*\n/m, '');
shell = rep(shell, '/* Títulos en Roboto */', part('sitio.css') + '\n/* Títulos en Roboto */');

// Cuerpo: barra de lanzamiento arriba de todo y página marcada para los scripts.
shell = rep(shell, '<body>\n', '<body data-page="{{PAGE}}">\n{{BAR}}\n');

// Menú: Soluciones lleva a cada landing; el botón cambia según la página.
shell = rep(shell, '<a href="#inicio" class="nav__logo"', '<a href="/" class="nav__logo"');
shell = rep(shell, '<a href="#corporativo"><span class="ic">', '<a href="/corporativo"><span class="ic">');
shell = rep(shell, '<a href="#proveedores"><span class="ic">', '<a href="/proveedores"><span class="ic">');
shell = rep(shell, '      <a href="#contacto" class="btn btn--lime nav__cta">Agenda una demo</a>', '      {{NAV_CTA}}');
shell = rep(shell, '        <a href="#corporativo">Wip Corporativo</a>\n        <a href="#proveedores">Wip Proveedores</a>',
  '        <a href="/corporativo">Wip Corporativo</a>\n        <a href="/proveedores">Wip Proveedores</a>');

// Antes de irte: el informe, en las tres páginas.
shell = rep(shell, '</main>\n', '</main>\n\n' + part('popup.html'));

// Scripts: sin planeta ni selector de lados; entran barra, tarjeta viva y popup.
{
  const a = shell.indexOf('  /* Planeta WIP:'), b = shell.indexOf('  /* La cuenta del call center');
  if (a < 0 || b < 0) throw new Error('No encontré los scripts del planeta o del selector');
  shell = shell.slice(0, a) + part('sitio.js') + shell.slice(b);
}

{ const m = shell.match(/[^\n]{0,60}\.world(?!s)[^\n]{0,40}/); if (m) throw new Error('Quedaron restos del planeta: ' + m[0]); }

// ---------- Bloques compartidos del cuerpo ----------
let clientes = between(oldMain, '<!-- ===================== CLIENTES', '<!-- ===================== FAQ', false);
clientes = rep(clientes, between(clientes, '    <div class="proof">', '    </div>\n'),
  '    <div class="proof1 rv"><span><b>Forbes</b>30 Promesas de los Negocios de Colombia 2023 y 100 Mejores Startups 2022</span></div>\n');
const faqBlock = between(oldMain, '<!-- ===================== FAQ', '<!-- ===================== CONTACTO', false);
const contacto = between(oldMain, '<!-- ===================== CONTACTO', '<section class="outro">', false);

const CAL_URL = 'https://calendly.com/comercial-wiptool/acercamiento-wip';
const demoBtn = (cls = 'btn btn--lime') => `<a href="${CAL_URL}" class="${cls}" target="_blank" rel="noopener" onclick="if(window.Calendly){Calendly.initPopupWidget({url:'${CAL_URL}'});return false;}">Agenda una demo</a>`;
const MELI_URL = 'https://wa.me/573005124111?text=' + encodeURIComponent('Hola Meli, soy proveedor de asistencia y quiero conocer Wip');
const meliBtn = (cls = 'btn btn--lime', txt = 'Escríbele a Meli por WhatsApp') => `<a href="${MELI_URL}" class="${cls}" target="_blank" rel="noopener" data-cta="meli">${txt}</a>`;
// Barra de lanzamiento: sin uso por ahora (se quitó el aviso del piloto); se deja para la próxima oferta.
const bar = (txt) => `<div class="topbar" id="bar">${txt}<button type="button" aria-label="Cerrar aviso">×</button></div>`;

// Asignación: la quinta regla es "si no acepta, al siguiente" (no rutas).
shell = rep(shell, "{p:5,l:'Ruta más corta · 12 min'}", "{p:5,l:'No aceptó · pasa al siguiente'}");
shell = rep(shell, "{p:4,l:'$45.000 · tarifa convenio'}", "{p:4,l:'$185.000 · tarifa del convenio'}");

// Menú y pie: las landings nuevas y la página de preguntas.
shell = rep(shell, '<a href="/corporativo"><span class="ic">', '<a href="/software-empresas-de-asistencia"><span class="ic">');
shell = rep(shell, '<a href="/proveedores"><span class="ic">', '<a href="/proveedores-de-asistencia"><span class="ic">');
shell = rep(shell, '<b>Wip Corporativo</b><span>Para aseguradoras y empresas de asistencia con su propia red de proveedores.</span>', '<b>Aseguradoras y asistencias</b><span>Toda tu red de proveedores, medida por ANS, calidad y costo.</span>');
shell = rep(shell, '<b>Wip Proveedores</b><span>Para grúas, técnicos, cerrajeros, médicos y abogados que atienden asistencias.</span>', '<b>Proveedores de asistencia</b><span>Las plataformas de tus aseguradoras y empresas de asistencia en un solo lugar.</span>');
shell = rep(shell, '      <a href="#clientes">Clientes</a>\n', '      <a href="/preguntas-frecuentes">Preguntas</a>\n');
shell = rep(shell, `        <a href="/corporativo">Wip Corporativo</a>
        <a href="/proveedores">Wip Proveedores</a>
        <a href="/software-empresas-de-asistencia">Aseguradoras y empresas de asistencia</a>`,
`        <a href="/software-empresas-de-asistencia">Aseguradoras y empresas de asistencia</a>
        <a href="/proveedores-de-asistencia">Proveedores de asistencia</a>`);
shell = rep(shell, '        <a href="/academy">WIP Academy</a>\n', '        <a href="/academy">WIP Academy</a>\n        <a href="/preguntas-frecuentes">Preguntas frecuentes</a>\n');

// Datos estructurados de la empresa y del software, con los datos públicos del brief.
shell = rep(shell, '"description": "Plataforma con agentes IA para aseguradoras, empresas de asistencia y sus proveedores en Latinoamérica.",\n  "areaServed": ["CO", "MX", "HN", "GT", "EC", "PE", "NI", "CL", "PA", "SV"],',
  '"description": "Wip es la plataforma para operar asistencias: conecta a aseguradoras, empresas de asistencia y sus redes de proveedores en vial, hogar, médica, jurídica, veterinaria y otras verticales.",\n  "areaServed": ["CO", "HN", "GT", "DO", "MX"],');
shell = rep(shell, '"description": "Software con agentes IA para asistencias: creación de servicios por WhatsApp, asignación inteligente por cercanía y prioridad, seguimiento en tiempo real y liquidación automática.",',
  '"description": "Wip IA recibe cada caso de asistencia, lo asigna al proveedor según las reglas de cada convenio, avisa al asegurado en vivo, sigue el ANS y alerta antes de incumplir, detecta fugas de costo y deja cada servicio listo para facturar. Incluye Wipi, la IA que ayuda al equipo a crear servicios, configurar convenios y tarifas y sacar informes.",\n  "applicationSubCategory": "Software para empresas de asistencia",\n  "featureList": ["Recepción de casos por plataforma, API o WhatsApp", "Asignación por reglas de convenio", "Seguimiento de ANS con alertas antes de incumplir", "Detección de fugas de costo", "Cierre con fotos, firma y horas", "Liquidación con la tarifa del convenio", "Wipi, asistente de IA dentro de la plataforma"],');

// ---------- Preguntas frecuentes: una sola fuente para la página y las landings ----------
const Q = {
  que: ['¿Qué es Wip?', 'Wip es la plataforma para operar asistencias. Conecta a aseguradoras, empresas de asistencia y sus redes de proveedores para recibir, asignar, seguir y facturar cada servicio, con Wip IA haciendo el trabajo repetitivo. Sirve para asistencia vial, hogar, médica, jurídica, veterinaria y cualquier otra vertical.'],
  software: ['¿Qué es un software para empresas de asistencia?', 'Es la herramienta con la que una aseguradora o empresa de asistencia recibe los casos de sus asegurados, los asigna a su red de proveedores, sigue el ANS de cada servicio y controla lo que paga. Wip es un software para empresas de asistencia con IA.'],
  campo: ['¿En qué se diferencia de un software de servicios en campo?', 'Un software de servicios en campo organiza a los técnicos de una sola empresa. Uno para asistencias maneja tres actores, la aseguradora, la empresa de asistencia y la red de proveedores, cada uno con sus convenios, tarifas y ANS. Wip está hecho para ese modelo.'],
  ia: ['¿Qué es Wip IA?', 'Es la automatización que opera los servicios dentro de Wip: recibe el caso, lo asigna según las reglas de cada convenio, avisa al asegurado en vivo, sigue el ANS, alerta antes de incumplir y atiende novedades.'],
  wipi: ['¿Qué es Wipi?', 'Wipi es la IA que vive dentro de la plataforma Wip. Ayuda a todo el equipo a crear servicios, configurar convenios y tarifas y sacar informes, pidiéndolo en sus propias palabras.'],
  tipos: ['¿Qué tipos de asistencia opera Wip?', 'Todas las verticales: vial, hogar, médica, jurídica, veterinaria y cualquier otra asistencia que se venda con un seguro. Tenemos experiencia operando cada una: por Wip se han registrado más de 4 millones de servicios y hay más de 354 tipos de asistencia configurados.'],
  paises: ['¿En qué países opera Wip?', 'En Colombia, Honduras, Guatemala, República Dominicana y México. Con Wip se han gestionado más de 4 millones de asistencias en Latinoamérica.'],
  ans: ['¿Cómo se mide el ANS de una red de proveedores?', 'Se compara, servicio por servicio, el tiempo real de cada etapa (asignación, llegada y cierre) contra el tiempo pactado en el convenio. Wip lo mide solo, lo muestra por proveedor, ciudad y tipo de servicio, y alerta antes de que un servicio incumpla.'],
  falla: ['¿Cuántas asistencias no terminan bien?', 'En Wip, 1 de cada 6 asistencias no termina en finalizada: 10,8 % se cancelan, 2,1 % fallan y 1,9 % las rechaza el proveedor. Por eso Wip IA sigue cada servicio y avisa antes de que se caiga.'],
  fugas: ['¿Cómo detecta Wip las fugas de costo?', 'Revisa cada servicio antes de pagarlo y marca los que están a punto de incumplir, los kilómetros cobrados que no cuadran con el recorrido y el mismo servicio cobrado dos veces. Lo que cumple queda listo para facturar con la tarifa del convenio.'],
  reemplaza: ['¿Wip reemplaza los sistemas que ya tenemos?', 'No. Wip recibe los casos desde la plataforma de la aseguradora, por API o por WhatsApp, y se conecta con la operación que ya existe, sin reemplazar lo que funciona.'],
  implementa: ['¿Cuánto tarda la implementación?', 'Depende de cuántos convenios, proveedores e integraciones tenga la operación. En la demo se arma el cronograma: configuración, capacitación del equipo y de la red, e inicio de operación con acompañamiento del equipo Wip.'],
  llegan: ['¿Cómo llegan los casos de mis asegurados a Wip?', 'Desde la plataforma de la aseguradora por integración API, por WhatsApp o creados por tu equipo en Wip. Todos quedan en el mismo lugar, con el convenio, la tarifa y el ANS que les corresponden.'],
  propios: ['¿Puedo operar con proveedores externos y con técnicos propios?', 'Sí. Wip integra en una sola plataforma a tus proveedores tercerizados y a tus colaboradores de nómina, cada uno con el perfil adecuado según su rol, y asigna cada servicio al mejor según tus reglas.'],
  noAcepta: ['¿Qué pasa si un proveedor no acepta el servicio?', 'Wip lo pasa al siguiente proveedor según las reglas del convenio, sin que tu equipo tenga que llamar uno por uno. Desde la central de monitoreo ves en todo momento quién lo tiene y en qué estado va.'],
  asegurado: ['¿Cómo se entera el asegurado del estado de su asistencia?', 'Por WhatsApp. Wip le avisa cada cambio de estado, le puede pedir la ubicación de origen y destino, y el asegurado escribe o envía fotos que quedan en el servicio. Si conectas el número de tu empresa, los mensajes le llegan con tu nombre.'],
  eventos: ['¿Puedo coordinar varios servicios para un mismo caso?', 'Sí. Con Multiservicios creas un evento con varios servicios, por ejemplo grúa, desplazamiento y custodia. Se crean en simultánea, Wip asigna cada uno a su prestador y todos comparten el mismo evento y el mismo usuario.'],
  liquida: ['¿Cómo se liquidan los servicios de mi red?', 'Cada servicio toma la tarifa de su convenio de forma automática y cierra con fotos, firma y horas. Al final del periodo tienes los servicios listos para conciliar y pagar, con la evidencia de cada uno.'],
  reportes: ['¿Qué indicadores puedo ver de mi operación?', 'ANS, calidad y costo de tu red, por proveedor, ciudad y tipo de servicio, en tiempo real. También puedes pedirle a Wipi, la IA de Wip, un informe en tus propias palabras.'],
  costoCorp: ['¿Cuánto cuesta Wip para una aseguradora o empresa de asistencia?', 'Se cotiza según la operación: volumen de servicios, convenios, integraciones y desarrollos. En una demo te mostramos Wip con un caso como el tuyo.'],
  varias: ['¿Sirve para proveedores que trabajan con varias aseguradoras y empresas de asistencia?', 'Sí, es justo para eso. Los servicios de todas tus aseguradoras y asistencias llegan a un solo lugar, cada uno con las reglas y la tarifa de su convenio, y tus técnicos trabajan en una sola app.'],
  sinInteg: ['¿Y si mi aseguradora no está integrada con Wip?', 'Pegas el pantallazo del servicio y Wip lo crea con todos sus datos. Si hay integración, los servicios entran solos y Wip puede pedir las autorizaciones a la empresa.'],
  particulares: ['¿Sirve para mis servicios particulares?', 'Sí. Los particulares que llegan por llamada o WhatsApp entran al mismo lugar que los servicios de tus aseguradoras y empresas de asistencia, con tu propia tarifa.'],
  novedades: ['¿Qué hace Wip IA con las novedades y autorizaciones?', 'Atiende las novedades del servicio, como un cliente que no está o un cambio de destino, y te ayuda con las autorizaciones: las pide a la empresa si hay integración o las deja listas para tu equipo.'],
  cobro: ['¿Cómo saco la cuenta de cobro?', 'Sale del reporte: Wip junta los servicios del periodo por empresa, con la tarifa de cada convenio aplicada, las horas y las evidencias de cierre.'],
  costoProv: ['¿Cuánto cuesta Wip para un proveedor?', 'Hay planes mensuales según tu volumen de servicios, desde $195.000 COP al mes. Meli te los explica por WhatsApp.'],
};
const FAQ = {
  home: [Q.que, Q.software, Q.campo, Q.ia, Q.wipi, Q.tipos],
  corp: [Q.llegan, Q.ans, Q.noAcepta, Q.propios, Q.asegurado, Q.eventos, Q.liquida, Q.fugas, Q.reportes, Q.tipos, Q.implementa, Q.costoCorp],
  prov: [Q.varias, Q.sinInteg, Q.particulares, Q.novedades, Q.costoProv],
};
const GROUPS = [
  { id: 'general', h: 'General', items: [Q.que, Q.software, Q.campo, Q.ia, Q.wipi, Q.tipos, Q.paises] },
  { id: 'aseguradoras', h: 'Aseguradoras y empresas de asistencia', items: [Q.llegan, Q.ans, Q.falla, Q.noAcepta, Q.propios, Q.asegurado, Q.eventos, Q.liquida, Q.fugas, Q.reportes, Q.implementa, Q.costoCorp] },
  { id: 'proveedores', h: 'Proveedores de asistencia', items: [Q.varias, Q.sinInteg, Q.particulares, Q.novedades, Q.costoProv] },
];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const faqHtml = (list, name = 'faq') => list.map(([q, a], i) => `      <details name="${name}"${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n');
const faqJson = (list) => JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }, null, 2);
const groupsHtml = GROUPS.map((g) => `<section class="sec faq-group" id="${g.id}" style="padding-top:0;padding-bottom:clamp(50px,7vw,80px)">
  <div class="wrap">
    <div class="head rv"><h2 class="h2">${esc(g.h)}</h2></div>
    <div class="faq rv">
${faqHtml(g.items, g.id)}
    </div>
  </div>
</section>`).join('\n\n');
for (const list of [...Object.values(FAQ), ...GROUPS.map((g) => g.items)]) for (const [q, a] of list) if (!q || !a) throw new Error('Pregunta incompleta');

// ---------- Páginas ----------
const corpCheck = (c, prov) => prov
  ? rep(rep(c, 'value="Aseguradora o empresa de asistencia" checked>', 'value="Aseguradora o empresa de asistencia">'), 'value="Proveedor de asistencia">', 'value="Proveedor de asistencia" checked>')
  : c;
const pages = [
  { key: 'home', out: 'index.html', path: '/', body: 'home.html',
    title: 'Wip · Plataforma para operar asistencias, con Wip IA',
    desc: 'Wip es la plataforma para operar asistencias: aseguradoras, empresas de asistencia y proveedores reciben, asignan, siguen y facturan cada servicio con IA.',
    bar: '',
    navCta: demoBtn('btn btn--lime nav__cta'), xp: '' },
  { key: 'corp', out: 'software-empresas-de-asistencia/index.html', path: '/software-empresas-de-asistencia', body: 'aseguradoras.html',
    title: 'Software para empresas de asistencia y aseguradoras | Wip',
    desc: 'Opera tus asistencias y tu red de proveedores con IA: tarifas automáticas, comunicación con tu red, monitoreo de ANS y datos. +4 millones de servicios en Wip.',
    bar: '',
    navCta: demoBtn('btn btn--lime nav__cta'), xp: 'corp' },
  { key: 'prov', out: 'proveedores-de-asistencia/index.html', path: '/proveedores-de-asistencia', body: 'proveedores.html',
    title: 'Software para proveedores de asistencia | Wip',
    desc: 'Grúas, hogar, médicos y veterinarios: las plataformas de tus aseguradoras y asistencias en un solo lugar, una sola app y la cuenta de cobro desde el reporte.',
    bar: '',
    navCta: meliBtn('btn btn--lime nav__cta', 'Habla con Meli'), xp: 'prov' },
  { key: 'faq', out: 'preguntas-frecuentes/index.html', path: '/preguntas-frecuentes', body: 'preguntas.html',
    title: 'Preguntas frecuentes sobre software para asistencias | Wip',
    desc: 'Qué es un software para empresas de asistencia, cómo se mide el ANS de una red de proveedores y cómo Wip sirve a proveedores de varias aseguradoras.',
    bar: '',
    navCta: demoBtn('btn btn--lime nav__cta'), xp: '' },
];

for (const p of pages) {
  if (p.title.length > 65) throw new Error(`${p.out}: título de ${p.title.length} caracteres`);
  if (p.desc.length > 160) throw new Error(`${p.out}: descripción de ${p.desc.length} caracteres`);
  let main = part(p.body);
  let c = corpCheck(contacto, p.key === 'prov');
  if (p.key === 'corp') {
    c = rep(c, '<h2 class="h2">Mira WIP en vivo <span class="lime">con un caso como el tuyo</span></h2>', '<h2 class="h2">Conversemos y conoce <span class="lime">Wip por dentro</span></h2>');
    c = rep(c, 'Cuéntanos de qué lado de las asistencias estás y cómo operas hoy. Te mostramos WIP operando tu día a día.', 'Una charla corta con nuestro equipo: nos cuentas cómo opera tu red y te mostramos Wip con un caso como el tuyo.');
    // Formulario solo para corporativos: sin la opción de proveedor.
    c = rep(c, between(c, '        <fieldset class="perfil">', '</fieldset>\n'), '        <input type="hidden" name="perfil" value="Aseguradora o empresa de asistencia">\n');
    c = rep(c, '<h3>¿Prefieres que te contactemos?</h3>', '<h3>¿Prefieres que te contactemos?</h3>\n      <p class="form__for">Para aseguradoras y empresas de asistencia</p>');
  }
  if (p.key === 'prov') {
    // Formulario solo para proveedores: registro para que el equipo los contacte.
    c = rep(c, '<h2 class="h2">Mira WIP en vivo <span class="lime">con un caso como el tuyo</span></h2>', '<h2 class="h2">Regístrate y <span class="lime">te contactamos</span></h2>');
    c = rep(c, 'Cuéntanos de qué lado de las asistencias estás y cómo operas hoy. Te mostramos WIP operando tu día a día.', 'Déjanos tus datos y un asesor de Wip te contacta para mostrarte cómo operar todos tus servicios en un solo lugar.');
    c = rep(c, between(c, '        <fieldset class="perfil">', '</fieldset>\n'), '        <input type="hidden" name="perfil" value="Proveedor de asistencia">\n');
    c = rep(c, '<h3>¿Prefieres que te contactemos?</h3>', '<h3>Registro de proveedores</h3>\n      <p class="form__for">Para proveedores de asistencia</p>');
    c = rep(c, between(c, '<div class="contact-calendly">', '</div>'), `<div class="contact-calendly">${meliBtn('btn btn--lime', 'O escríbele a Meli por WhatsApp')}</div>`);
    c = rep(c, 'placeholder="Cuéntanos sobre tu operación y qué te gustaría mejorar."', 'placeholder="Cuántos técnicos tienes, con qué aseguradoras o empresas de asistencia trabajas y qué te gustaría mejorar."');
    c = rep(c, '>Correo corporativo</label>', '>Correo</label>');
  }
  main = main.replace('{{CLIENTES}}', clientes.trim()).replace('{{FAQ}}', faqBlock.trim()).replace('{{CONTACTO}}', c.trim())
    .replace('{{FAQ_GROUPS}}', groupsHtml);
  let t = shell.replace('{{MAIN}}', main);
  const faqList = p.key === 'faq' ? GROUPS.flatMap((g) => g.items) : FAQ[p.key];
  const vars = { TITLE: p.title, DESC: p.desc, PATH: p.path, PAGE: p.key, BAR: p.bar, NAV_CTA: p.navCta,
    DEMO_BTN: demoBtn(), MELI_BTN: meliBtn(), MELI_BTN_GHOST: meliBtn('btn btn--ghost'), MELI_SX: meliBtn('pv-btn', 'Habla con Meli'), DEMO_CX: demoBtn('cx-btn cx-btn--w'), MELI_EP: meliBtn('ep-btn ep-btn--line', 'Habla con Meli'), MELI_EP_MAIN: meliBtn('ep-btn ep-btn--main', 'Escríbele a Meli por WhatsApp'), MELI_CS: meliBtn('cs-btn cs-btn--main', 'Habla con Meli por WhatsApp'), MELI_CS_LINE: meliBtn('cs-btn cs-btn--dark', 'Habla con Meli'), DEMO_IX: demoBtn('ix-btn ix-btn--main'), DEMO_PL: demoBtn('pl-btn pl-btn--main'), DEMO_SPX: demoBtn('spx-btn spx-btn--main'), DEMO_WH: demoBtn('wh-btn wh-btn--main'),
    XP_CORP: p.xp === 'prov' ? '' : ' checked', XP_PROV: p.xp === 'prov' ? ' checked' : '',
    FAQ_HTML: p.key === 'faq' ? '' : faqHtml(faqList), FAQ_JSON: faqJson(faqList), ...blocks };
  for (const [k, v] of Object.entries(vars)) t = t.split(`{{${k}}}`).join(v);
  const left = t.match(/\{\{[A-Z_]+\}\}/);
  if (left) throw new Error(`${p.out}: quedó sin reemplazar ${left[0]}`);
  if (/—/.test(t.replace(/<script[\s\S]*?<\/script>/g, ''))) throw new Error(`${p.out}: hay rayas largas en el texto visible`);
  const out = path.join(repo, p.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, t.replace(/\n/g, '\r\n'));
  console.log('ok', p.out, (t.length / 1024).toFixed(1) + ' KB');
}
