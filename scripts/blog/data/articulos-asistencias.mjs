// Artículos sobre operación de asistencias (nov 2026): el núcleo del blog para posicionar Wip
// en búsquedas de software de asistencias, grúas, aseguradoras y proveedores.
// Reglas: Wip es software, nunca prestador del servicio; solo datos agregados de la plataforma;
// sin rayas largas; cada artículo enlaza a Wip Corporativo o a Wip Proveedores.

const img = (slug, alt) => ({
  image: { file: `/img/blog/${slug}-800.webp`, w: 800, h: 500, alt },
  thumb: { file: `/img/blog/${slug}-420.webp`, w: 420, h: 263 },
  og: `/img/blog/${slug}-og.jpg`,
});

const tool = (titulo, texto, href, boton, dibujo) => {
  const d = {
    app: ['draw-app-colaborador-x2-360.webp', 360, 321],
    monitoreo: ['draw-central-monitoreo-x2-360.webp', 360, 225],
    whatsapp: ['draw-expereincia-sin-app-360.webp', 360, 268],
    mapa: ['draw-gps-360.webp', 360, 232],
  }[dibujo];
  return `<aside class="cta-tool"><div class="cta-tool__body"><p class="cta-tool__title">${titulo}</p><p>${texto}</p><a class="btn btn--primary" href="${href}">${boton}</a></div><img src="/img/blog/${d[0]}" width="${d[1]}" height="${d[2]}" alt="" loading="lazy" decoding="async"></aside>`;
};

const CORP = '/software-empresas-de-asistencia';
const PROV = '/proveedores-de-asistencia';
const HOY = '2026-11-22';
const base = { category: 'operacion-de-asistencias', date: HOY, modified: HOY, ebookCtas: ['checklist-definitiva'] };

export const articulosAsistencias = [
  {
    ...base,
    slug: 'software-para-empresas-de-asistencia',
    title: 'Software para empresas de asistencia: qué debe tener y cómo elegirlo',
    seoTitle: 'Software para empresas de asistencia: qué debe tener',
    seoDesc: 'Guía para elegir un software para empresas de asistencia y aseguradoras: recepción de casos, asignación, monitoreo de ANS, WhatsApp, tarifas y facturación.',
    excerpt: 'Un software para empresas de asistencia no es un CRM ni un software de campo genérico. Te contamos qué funciones debe tener para operar una red de proveedores con control.',
    solucion: 'software-empresas-de-asistencia',
    ...img('software-para-empresas-de-asistencia', 'Ilustración de un tablero de operación de asistencias con servicios y proveedores'),
    html: `
<p>Una empresa de asistencia vive de cumplir: cuando un asegurado se vara a las 11 de la noche o se le inunda el baño, espera que alguien llegue rápido y resuelva. Detrás de esa promesa hay una operación compleja: casos que llegan de varias aseguradoras, una red de proveedores en distintas ciudades, tiempos pactados en cada convenio y una facturación que tiene que cuadrar al final del mes.</p>
<p>Por eso un <strong>software para empresas de asistencia</strong> no es lo mismo que un CRM o un software genérico de servicios en campo. En esta guía te contamos qué debe tener y cómo evaluarlo.</p>
<h2>Qué es un software para empresas de asistencia</h2>
<p>Es la plataforma con la que una aseguradora o empresa de asistencia recibe los casos de sus asegurados, los asigna a su red de proveedores, sigue cada servicio en tiempo real y controla lo que paga. Su diferencia con otras herramientas es que maneja tres actores a la vez: quien vende la asistencia, quien la opera y quien la presta, cada uno con sus convenios, tarifas y acuerdos de nivel de servicio (ANS).</p>
<h2>Las funciones que no pueden faltar</h2>
<h3>1. Recepción de casos desde cualquier canal</h3>
<p>Los casos llegan por la plataforma de la aseguradora, por API, por WhatsApp o los crea el equipo del call center. El software debe recibirlos todos en un mismo lugar, con el convenio, la cobertura y el ANS que les corresponde, sin que nadie tenga que copiar datos de un sistema a otro.</p>
<h3>2. Asignación inteligente a la red</h3>
<p>Asignar llamando proveedor por proveedor es la principal fuente de demoras. La asignación debe considerar cercanía, disponibilidad, tipo de servicio y desempeño del proveedor, y si uno no acepta, pasar al siguiente de forma automática.</p>
<h3>3. Central de monitoreo con semáforo de ANS</h3>
<p>Cada servicio debe tener su estado en vivo (asignado, en camino, en sitio, finalizado), quién es el responsable en cada momento y una alerta antes de incumplir. Revisar el ANS a fin de mes ya no sirve: el asegurado ya esperó.</p>
<h3>4. Comunicación con el asegurado y con la red</h3>
<p>Avisos por WhatsApp desde el número de la empresa, ubicación compartida por el cliente, fotos que llegan directo al servicio y un chat donde técnicos, proveedores y operadores resuelven novedades y autorizaciones con registro.</p>
<h3>5. Tarifas automáticas por convenio</h3>
<p>Cada aseguradora paga distinto: tarifa base, kilómetros adicionales, recargos nocturnos o de festivo. El software debe aplicar la tarifa del convenio a cada servicio de forma automática, para que el costo se conozca desde el cierre.</p>
<h3>6. Evidencias, conciliación e informes</h3>
<p>Fotos con fecha, hora y ubicación, firma del usuario y horas de cada estado. Con esa evidencia, la conciliación con la aseguradora deja de ser una discusión y los informes de ANS, calidad y costo por proveedor salen solos.</p>
${tool('Wip Corporativo', 'Recibe, asigna y monitorea las asistencias de tu red en tiempo real, con tarifas automáticas y evidencias en cada servicio.', CORP, 'Conoce Wip Corporativo', 'monitoreo')}
<h2>Cómo evaluar un software de asistencias</h2>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Pregunta</strong></td><td><strong>Por qué importa</strong></td></tr>
<tr><td>¿Se integra con las plataformas de mis aseguradoras?</td><td>Sin integración, el call center sigue copiando datos a mano.</td></tr>
<tr><td>¿Opera todas mis verticales?</td><td>Vial, hogar, médica, jurídica y veterinaria tienen tiempos y reglas distintas.</td></tr>
<tr><td>¿Mis proveedores lo van a usar?</td><td>Si la app del técnico es difícil, nadie registra los estados y el monitoreo se cae.</td></tr>
<tr><td>¿Cómo maneja las tarifas de cada convenio?</td><td>Es la base para controlar el costo y facturar sin errores.</td></tr>
<tr><td>¿Qué pasa si un proveedor no acepta?</td><td>La reasignación automática define cuánto tarda el servicio.</td></tr>
<tr><td>¿Tiene experiencia en asistencias?</td><td>Un software de campo genérico no entiende de convenios, coberturas ni ANS.</td></tr>
</tbody></table></div>
<!--EBOOK:checklist-definitiva-->
<h2>Errores comunes al elegir</h2>
<ul>
<li><strong>Comprar un CRM y adaptarlo:</strong> sirve para ventas, no para despachar una grúa en minutos.</li>
<li><strong>Pensar solo en el call center:</strong> si los proveedores no están conectados, la información del campo sigue llegando por llamadas.</li>
<li><strong>Dejar la facturación para después:</strong> las tarifas y evidencias deben quedar en el mismo servicio desde el primer día.</li>
</ul>
<h2>Conclusión</h2>
<p>Un buen software para empresas de asistencia conecta a la aseguradora, al operador y a la red de proveedores en un mismo lugar. Con Wip se han gestionado más de 4 millones de asistencias en Latinoamérica y hay más de 354 tipos de asistencia configurados. Si operas una red, conoce <a href="${CORP}">Wip Corporativo</a>; si prestas los servicios, mira <a href="${PROV}">Wip Proveedores</a>.</p>
`,
  },

  {
    ...base,
    slug: 'software-para-gruas',
    title: 'Software para grúas y asistencia vial: cómo elegir el adecuado',
    seoTitle: 'Software para grúas y asistencia vial: cómo elegirlo',
    seoDesc: 'Qué debe tener un software para grúas: todos los servicios de tus aseguradoras en un lugar, asignación por cercanía, app para conductores, evidencias y cobro.',
    excerpt: 'Si tienes grúas y le trabajas a varias aseguradoras, el reto no es conseguir servicios: es atenderlos todos sin estar pegado a cinco plataformas. Esto es lo que debe tener tu software.',
    solucion: 'software-para-gruas-y-flotas',
    ...img('software-para-gruas', 'Ilustración de una grúa con su ruta en el mapa y el estado del servicio'),
    html: `
<p>Una empresa de grúas que le trabaja a varias aseguradoras y empresas de asistencia vive una rutina conocida: el call center pegado a varias plataformas tomando servicios, los conductores coordinados por grupos de WhatsApp, autorizaciones por teléfono para los kilómetros adicionales y, al final del mes, días enteros armando el visado en Excel.</p>
<p>Un <strong>software para grúas</strong> debe resolver justo eso. Te contamos qué buscar.</p>
<h2>Todos tus servicios en un solo lugar</h2>
<p>Cada aseguradora te habilita su propia plataforma. Si tu software no se integra con ellas, tu equipo sigue saltando de una a otra. Busca un sistema que reciba los servicios de todos tus clientes (aseguradoras, empresas de asistencia, corporativos y particulares) en una sola bandeja, con las reglas y la tarifa de cada convenio ya aplicadas.</p>
<h2>Asignación al conductor más cercano</h2>
<p>En asistencia vial el tiempo de llegada lo es todo. El software debe mostrarte en el mapa qué grúa está libre, cuál va en camino y cuál está en servicio, para asignar al más cercano sin llamar a nadie. Si el conductor no acepta, el servicio debe pasar al siguiente.</p>
${tool('Radar de técnicos y grúas', 'Mira en el mapa quién está libre, en camino o en servicio, y asigna al más cercano.', PROV, 'Conoce Wip Proveedores', 'mapa')}
<h2>Una sola app para tus conductores</h2>
<p>Cuando cada aseguradora tiene su propia app, los conductores terminan sin usar ninguna. Con una sola app para todos los servicios, el conductor ve su ruta, cambia los estados (en camino, en sitio, finalizado) y cierra con fotos, firma y horas, sin importar de qué cliente venga el servicio.</p>
<h2>Novedades y autorizaciones sin llamadas</h2>
<p>El cliente pide llevar el carro a otro taller, el vehículo no está donde dijeron, hay que esperar más de lo previsto. Cada novedad debe quedar en el chat del servicio, con quién autorizó qué y a qué hora. Así, cuando llegue la conciliación, la autorización está documentada.</p>
<h2>Kilómetros, recargos y tarifas de cada cliente</h2>
<p>Una grúa liviana urbana no se paga igual que una pesada en carretera, y cada aseguradora tiene su tarifado. El software debe calcular cada servicio con la tarifa del convenio, los kilómetros recorridos y los recargos que apliquen, para que el valor esté claro desde el cierre.</p>
<!--EBOOK:checklist-definitiva-->
<h2>Del servicio al cobro</h2>
<p>El visado es donde se pierde plata: servicios sin evidencia, kilómetros que no cuadran, tarifas mal aplicadas. Con cada servicio cerrado con sus fotos, su firma y su tarifa, el informe por cliente sale del sistema y la cuenta de cobro deja de armarse a mano.</p>
<h2>Checklist para elegir software para grúas</h2>
<ul>
<li>Integración con las plataformas de tus aseguradoras y asistencias.</li>
<li>Mapa en vivo con el estado de cada grúa.</li>
<li>Asignación por cercanía y reasignación automática.</li>
<li>Una sola app para los conductores, fácil de usar.</li>
<li>Chat del servicio con registro de autorizaciones.</li>
<li>Tarifas por convenio con kilómetros y recargos.</li>
<li>Evidencias con fecha, hora y ubicación.</li>
<li>Informes listos para el visado.</li>
</ul>
<h2>Conclusión</h2>
<p>El mejor software para grúas es el que te deja prestar más servicios con el mismo equipo. Conoce <a href="${PROV}">Wip Proveedores</a>, la herramienta creada para el proveedor de asistencia, o revisa la solución para <a href="/software-para-gruas-y-flotas">grúas y flotas de servicio</a>.</p>
`,
  },

  {
    ...base,
    slug: 'reducir-servicios-fallidos-en-asistencias',
    title: 'Cómo reducir los servicios fallidos y cancelados en asistencias',
    seoTitle: 'Cómo reducir servicios fallidos y cancelados en asistencias',
    seoDesc: 'Cancelaciones, servicios fallidos y rechazos de proveedores son comunes en el mercado de asistencias. Por qué pasan y cómo la tecnología ayuda a reducirlos.',
    excerpt: 'En el mercado de asistencias, una parte de los servicios se cancela, falla o la rechaza el proveedor. Estas son las causas más comunes y cómo la tecnología ayuda a atacarlas.',
    solucion: 'software-empresas-de-asistencia',
    ...img('reducir-servicios-fallidos-en-asistencias', 'Ilustración de servicios de asistencia con estados finalizado, cancelado y fallido'),
    html: `
<p>Cada asistencia que no termina bien tiene un costo doble: un asegurado insatisfecho y una operación que gastó tiempo sin resultado. En el mercado de asistencias es un problema frecuente: <strong>una parte de los servicios se cancela, falla o la rechaza el proveedor</strong>, y pasa sobre todo cuando la operación depende de llamadas, chats sueltos y hojas de cálculo.</p>
<p>Sin herramientas adecuadas, asignar toma más tiempo, la ubicación llega incompleta, el asegurado no sabe cuándo llega su servicio y nadie ve a tiempo cuál se está retrasando. Cuando la operación se apoya en tecnología como Wip, esos indicadores mejoran: se asigna más rápido, se sigue cada servicio en vivo y se actúa antes de que se caiga. Te contamos cómo.</p>
<h2>Cancelados, fallidos y rechazados: no son lo mismo</h2>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Estado</strong></td><td><strong>Qué significa</strong></td><td><strong>Causas frecuentes</strong></td></tr>
<tr><td>Cancelado</td><td>El servicio no se presta porque el cliente o la operación lo cancelan</td><td>Demora en asignar o en llegar, el cliente resolvió por su cuenta, datos errados</td></tr>
<tr><td>Fallido</td><td>El proveedor llega pero no puede prestar el servicio</td><td>Ubicación imprecisa, cliente ausente, servicio mal tipificado</td></tr>
<tr><td>Rechazado</td><td>El proveedor no acepta el servicio asignado</td><td>Distancia, saturación, tarifa o zona poco atractiva</td></tr>
</tbody></table></div>
<h2>1. Asigna más rápido</h2>
<p>La causa más común de cancelación es la espera. Si asignar depende de llamar proveedor por proveedor, los minutos se van. La asignación automática por cercanía y disponibilidad, con reasignación cuando alguien no acepta, recorta el tiempo desde la apertura del caso hasta que alguien va en camino.</p>
<h2>2. Pide la ubicación exacta</h2>
<p>Muchos servicios fallidos empiezan con una dirección incompleta. Pedirle al asegurado que comparta su ubicación por WhatsApp, en tiempo real o con el punto exacto, evita que el técnico llegue al lugar equivocado.</p>
<h2>3. Mantén informado al asegurado</h2>
<p>Un cliente que no sabe quién va ni cuándo llega cancela. Avisarle por WhatsApp en cada cambio de estado (asignado, en camino, en sitio) reduce las cancelaciones por incertidumbre y las llamadas al call center.</p>
${tool('Avisos al asegurado por WhatsApp', 'Wip le avisa al cliente cada paso del servicio y le pide su ubicación sin llamadas.', CORP, 'Ver cómo funciona', 'whatsapp')}
<h2>4. Alerta antes de incumplir</h2>
<p>Un semáforo de ANS en la central de monitoreo permite actuar cuando un servicio va tarde: reasignar, escalar o avisar al cliente antes de que cancele.</p>
<h2>5. Entiende por qué rechazan tus proveedores</h2>
<p>Si un proveedor rechaza seguido ciertas zonas o tipos de servicio, el problema puede ser la tarifa, la distancia o la carga. Medir la tasa de rechazo por proveedor, zona y vertical te dice dónde ampliar la red o ajustar condiciones.</p>
<!--EBOOK:checklist-definitiva-->
<h2>6. Tipifica bien desde el inicio</h2>
<p>Un servicio mal tipificado (una grúa liviana cuando se necesitaba una pesada, una cerrajería cuando era un daño eléctrico) termina en fallido. Formularios claros por tipo de servicio ayudan al call center a pedir la información correcta desde el primer contacto.</p>
<h2>Cómo medir tu avance</h2>
<ul>
<li>Porcentaje de servicios finalizados sobre el total de casos abiertos.</li>
<li>Cancelaciones por causa, por ciudad y por franja horaria.</li>
<li>Fallidos por proveedor y por tipo de servicio.</li>
<li>Tasa de rechazo por proveedor y zona.</li>
<li>Tiempo de asignación y de llegada frente al ANS.</li>
</ul>
<h2>Conclusión</h2>
<p>Los servicios fallidos y cancelados no son un problema de una empresa en particular: aparecen en todo el mercado cuando la operación no tiene las herramientas para asignar rápido, informar al asegurado y seguir cada servicio en vivo. Con la tecnología adecuada, esos indicadores mejoran. Conoce cómo <a href="${CORP}">Wip Corporativo</a> ayuda a las aseguradoras y empresas de asistencia a cumplir cada servicio, y revisa cómo medir el <a href="/blog/sla-proveedores-de-asistencia">SLA de tus proveedores de asistencia</a>.</p>
`,
  },

  {
    ...base,
    slug: 'como-facturar-servicios-a-aseguradoras',
    title: 'Cómo facturar servicios de asistencia a aseguradoras: visado y conciliación',
    seoTitle: 'Cómo facturar servicios a aseguradoras: visado y conciliación',
    seoDesc: 'Guía para proveedores de asistencia: cómo preparar el visado, conciliar con la aseguradora, evitar glosas y sacar la cuenta de cobro sin armarla a mano.',
    excerpt: 'El visado es donde el proveedor de asistencia se juega el pago del mes. Cómo preparar cada servicio para que la conciliación con la aseguradora sea rápida y sin glosas.',
    solucion: 'software-para-gruas-y-flotas',
    ...img('como-facturar-servicios-a-aseguradoras', 'Ilustración de una cuenta de cobro con servicios conciliados y evidencias'),
    html: `
<p>Para un proveedor de asistencia, prestar el servicio es solo la mitad del trabajo. La otra mitad es cobrarlo: en los días de visado hay que enviar todos los servicios del periodo, la aseguradora o la empresa de asistencia los revisa uno por uno y solo después de conciliar se puede emitir la factura.</p>
<p>Cuando la información está regada entre plataformas, WhatsApp y Excel, ese proceso toma días y termina en glosas. Te explicamos cómo hacerlo bien.</p>
<h2>Qué es el visado en asistencias</h2>
<p>El visado es la revisión que hace el cliente (aseguradora, empresa de asistencia o corporativo) de los servicios prestados en el periodo, antes de autorizar la factura. Compara lo que el proveedor cobra contra lo que tiene registrado: servicios, tarifas, kilómetros, recargos y evidencias.</p>
<h2>Por qué se glosan los servicios</h2>
<ul>
<li><strong>Falta evidencia:</strong> el servicio no tiene fotos, firma u horas que demuestren que se prestó.</li>
<li><strong>Kilómetros que no cuadran:</strong> el recorrido cobrado no coincide con el registrado.</li>
<li><strong>Autorizaciones sin soporte:</strong> se cobraron kilómetros adicionales o tiempos de espera que nadie puede demostrar que se autorizaron.</li>
<li><strong>Tarifa equivocada:</strong> se aplicó el valor de otro convenio o un recargo que no correspondía.</li>
<li><strong>Servicio duplicado o mal tipificado.</strong></li>
</ul>
<h2>Cómo preparar cada servicio para el visado</h2>
<h3>Cierra con evidencia completa</h3>
<p>Fotos con fecha, hora y ubicación; firma del usuario; y la hora de cada estado. Si la app del técnico obliga a completarlos al cierre, ningún servicio llega incompleto al visado.</p>
<h3>Documenta cada autorización</h3>
<p>Los kilómetros adicionales, los cambios de destino y las esperas deben quedar autorizados en el chat del servicio, con nombre y hora. Así no hay discusión en la conciliación.</p>
<h3>Aplica la tarifa del convenio desde el cierre</h3>
<p>Cada cliente tiene su tarifado. Si el sistema aplica la tarifa base, los kilómetros y los recargos de cada convenio de forma automática, el valor de cada servicio queda claro desde que se cierra.</p>
${tool('Del servicio al cobro', 'Informes por cliente con la tarifa de cada convenio aplicada y las evidencias de cada servicio.', PROV, 'Conoce Wip Proveedores', 'app')}
<h2>La conciliación paso a paso</h2>
<ol>
<li>Saca el informe del periodo por cliente, con la tarifa de cada convenio aplicada.</li>
<li>Revisa que cada servicio tenga evidencia completa y autorizaciones documentadas.</li>
<li>Envíalo al cliente en el formato que pide.</li>
<li>Responde las observaciones con la evidencia del sistema, no con memoria.</li>
<li>Con lo conciliado, emite la factura o pásalo a tu software contable.</li>
</ol>
<!--EBOOK:checklist-definitiva-->
<h2>Conecta la operación con la contabilidad</h2>
<p>Si los servicios conciliados pasan directo a tu software contable, te ahorras digitarlos otra vez y reduces errores en la factura. Es el último paso para que el cobro deje de depender del Excel.</p>
<h2>Conclusión</h2>
<p>Un visado rápido empieza en el campo: servicios cerrados con evidencia, autorizaciones documentadas y tarifas bien aplicadas. Conoce <a href="${PROV}">Wip Proveedores</a> y cómo te lleva del servicio al cobro, o lee sobre las <a href="/blog/tarifas-por-convenio-en-asistencias">tarifas por convenio en asistencias</a>.</p>
`,
  },

  {
    ...base,
    slug: 'tarifas-por-convenio-en-asistencias',
    title: 'Tarifas por convenio en asistencias: kilómetros, recargos y variables de costo',
    seoTitle: 'Tarifas por convenio en asistencias: km y recargos',
    seoDesc: 'Cómo se calcula el valor de un servicio de asistencia según el convenio: tarifa base, kilómetros adicionales, recargos nocturnos y de festivo, esperas y más.',
    excerpt: 'Cada aseguradora paga distinto. Cómo organizar el tarifado de cada convenio, qué variables de costo tener en cuenta y cómo aplicarlas sin errores.',
    solucion: 'software-empresas-de-asistencia',
    ...img('tarifas-por-convenio-en-asistencias', 'Ilustración de una tabla de tarifas con kilómetros y recargos por convenio'),
    html: `
<p>En asistencias, el mismo servicio puede valer distinto según quién lo pague. Una grúa liviana urbana para una aseguradora tiene un valor; para otra, otro; y si es de noche, en festivo o con kilómetros adicionales, cambia de nuevo. Manejar esas reglas a mano es la receta para cobrar de menos, pagar de más o terminar en glosas.</p>
<h2>Qué es el tarifado por convenio</h2>
<p>Es la lista de valores y reglas que cada cliente acuerda para cada tipo de servicio. Lo tienen las aseguradoras con las empresas de asistencia y las empresas de asistencia con sus proveedores. Un buen tarifado define qué se paga, cuánto y en qué condiciones.</p>
<h2>Las variables de costo más comunes</h2>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Variable</strong></td><td><strong>Cómo funciona</strong></td></tr>
<tr><td>Tarifa base</td><td>Valor del servicio según tipo (por ejemplo grúa liviana, cerrajería, médico a domicilio).</td></tr>
<tr><td>Kilómetros incluidos y adicionales</td><td>Un número de kilómetros va incluido; lo demás se paga por kilómetro.</td></tr>
<tr><td>Zona</td><td>Urbano, periferia o rural, con valores distintos.</td></tr>
<tr><td>Recargo nocturno</td><td>Porcentaje o valor adicional en la franja de la noche.</td></tr>
<tr><td>Recargo de domingo o festivo</td><td>Valor adicional por prestar el servicio en esos días.</td></tr>
<tr><td>Tiempo de espera</td><td>Valor por hora o fracción cuando el proveedor espera más de lo previsto.</td></tr>
<tr><td>Servicios complementarios</td><td>Maniobras, peajes, custodia o desplazamientos adicionales.</td></tr>
</tbody></table></div>
<h2>Por qué aplicarlas a mano sale caro</h2>
<ul>
<li>Un recargo olvidado es plata que no se cobra.</li>
<li>Un kilómetro mal contado es una glosa en el visado.</li>
<li>Un cambio de tarifa que no llega a todo el equipo genera cobros con valores viejos.</li>
</ul>
<h2>Cómo organizarlas</h2>
<ol>
<li><strong>Una tarifa por convenio y por tipo de servicio,</strong> con sus reglas escritas.</li>
<li><strong>Las variables en el mismo lugar:</strong> kilómetros, zonas, horarios y recargos.</li>
<li><strong>Aplicación automática al cierre:</strong> que el sistema calcule el valor con los datos reales del servicio.</li>
<li><strong>Cambios con fecha:</strong> cuando se actualiza una tarifa, que aplique desde una fecha y no cambie los servicios ya cerrados.</li>
</ol>
${tool('Tarifas automáticas por convenio', 'Cada servicio con la tarifa de su convenio aplicada sola, con kilómetros y recargos.', CORP, 'Conoce Wip Corporativo', 'monitoreo')}
<!--EBOOK:checklist-definitiva-->
<h2>Tarifas y control de costos</h2>
<p>Para una aseguradora o empresa de asistencia, las tarifas automáticas también sirven para detectar fugas: kilómetros cobrados que no cuadran con el recorrido, el mismo servicio cobrado dos veces o recargos que no aplicaban. Revisar cada servicio contra su convenio antes de pagarlo es la forma más directa de controlar el costo de la red.</p>
<h2>Conclusión</h2>
<p>Un tarifado claro y aplicado de forma automática protege a las dos partes: el proveedor cobra lo justo y quien paga controla su costo. Mira cómo lo resuelven <a href="${CORP}">Wip Corporativo</a> para quien opera la red y <a href="${PROV}">Wip Proveedores</a> para quien presta el servicio.</p>
`,
  },

  {
    ...base,
    slug: 'asignacion-de-proveedores-por-cercania',
    title: 'Asignación de proveedores por cercanía: cómo despachar asistencias más rápido',
    seoTitle: 'Asignación de proveedores por cercanía en asistencias',
    seoDesc: 'Cómo funciona la asignación automática de servicios de asistencia por cercanía, disponibilidad y desempeño, y qué pasa cuando un proveedor no acepta.',
    excerpt: 'Asignar llamando proveedor por proveedor es la principal causa de demora en una asistencia. Así funciona la asignación inteligente por cercanía.',
    solucion: 'software-empresas-de-asistencia',
    ...img('asignacion-de-proveedores-por-cercania', 'Ilustración de un mapa con proveedores conectados y el más cercano asignado'),
    html: `
<p>En una asistencia vial o de hogar, los primeros minutos definen la experiencia del asegurado. Y la mayor parte de esos minutos se va en una sola tarea: encontrar quién puede atender. Cuando el call center llama proveedor por proveedor, la espera crece y las cancelaciones también.</p>
<h2>Qué es la asignación por cercanía</h2>
<p>Es asignar el servicio al proveedor o técnico disponible que está más cerca del cliente, usando su ubicación en tiempo real. Bien hecha, no mira solo la distancia: también tiene en cuenta el tipo de servicio, la disponibilidad y el desempeño de cada proveedor.</p>
<h2>Los criterios de una buena asignación</h2>
<ul>
<li><strong>Distancia o tiempo estimado de llegada</strong> al punto del cliente.</li>
<li><strong>Disponibilidad:</strong> si está libre, en camino o en otro servicio.</li>
<li><strong>Capacidad:</strong> si tiene el vehículo o la especialidad que pide el servicio.</li>
<li><strong>Reglas del convenio:</strong> proveedores habilitados para ese cliente o esa zona.</li>
<li><strong>Desempeño:</strong> cumplimiento del ANS, tasa de rechazo y calificación.</li>
</ul>
<h2>Qué pasa si el proveedor no acepta</h2>
<p>Este es el punto donde más tiempo se pierde. Una asignación automática bien configurada le da al proveedor un tiempo para aceptar y, si no responde o rechaza, pasa el servicio al siguiente de la lista sin que nadie tenga que intervenir.</p>
${tool('Asignación inteligente a tu red', 'Wip asigna al proveedor más cercano según las reglas de cada convenio y pasa al siguiente si no acepta.', CORP, 'Conoce Wip Corporativo', 'mapa')}
<h2>Asignación para quien presta el servicio</h2>
<p>La asignación por cercanía no es solo para aseguradoras. Un proveedor con varias grúas o técnicos también la necesita: ver en un radar quién está libre, quién va en camino y quién está en servicio, y mandar al más cercano sin llamar a nadie.</p>
<!--EBOOK:checklist-definitiva-->
<h2>Qué necesitas para que funcione</h2>
<ol>
<li>Que los técnicos tengan una app que comparta su ubicación y su estado.</li>
<li>Que los tipos de servicio y las capacidades de cada proveedor estén bien configurados.</li>
<li>Reglas claras de tiempo para aceptar y de reasignación.</li>
<li>Un monitoreo en vivo para ver los servicios que nadie ha tomado.</li>
</ol>
<h2>Conclusión</h2>
<p>Asignar por cercanía, con reasignación automática, es la forma más directa de bajar los tiempos de llegada y las cancelaciones. Conoce cómo lo hace <a href="${CORP}">Wip Corporativo</a> para las redes de proveedores y <a href="${PROV}">Wip Proveedores</a> para quien tiene sus propios técnicos.</p>
`,
  },

  {
    ...base,
    slug: 'whatsapp-en-la-operacion-de-asistencias',
    title: 'WhatsApp en la operación de asistencias: avisos, ubicación y chat con el asegurado',
    seoTitle: 'WhatsApp en la operación de asistencias',
    seoDesc: 'Cómo usar WhatsApp en una operación de asistencias: avisos al asegurado en cada paso, ubicación en tiempo real, fotos y chat organizado en cada servicio.',
    excerpt: 'Tus asegurados ya están en WhatsApp. Cómo usarlo para avisarles cada paso del servicio, pedir su ubicación y resolver novedades sin perder el registro.',
    solucion: 'software-empresas-de-asistencia',
    ...img('whatsapp-en-la-operacion-de-asistencias', 'Ilustración de un chat de WhatsApp con avisos del estado de una asistencia'),
    html: `
<p>La experiencia del asegurado en una asistencia depende de algo muy simple: saber qué está pasando. ¿Ya asignaron a alguien? ¿Cuánto falta? Cuando no lo sabe, llama al call center o cancela. Y como casi todos tus clientes ya usan WhatsApp, es el canal natural para mantenerlos informados.</p>
<p>El reto es usarlo sin que la operación se convierta en cientos de chats sueltos imposibles de auditar.</p>
<h2>Avisos en cada paso del servicio</h2>
<p>El asegurado debería recibir un mensaje cuando su servicio se asigna, cuando el proveedor va en camino (con el tiempo estimado) y cuando llega. Estos avisos automáticos reducen las llamadas al centro de atención y las cancelaciones por incertidumbre.</p>
<h2>Ubicación en tiempo real</h2>
<p>Una dirección mal escrita es la causa de muchos servicios fallidos. Pedirle al cliente que comparta su ubicación por WhatsApp, en tiempo real o el punto exacto, y que esa ubicación llegue directo al formulario del servicio, evita que el técnico llegue al lugar equivocado.</p>
<h2>Fotos y documentos del cliente</h2>
<p>El asegurado puede enviar fotos del daño o del vehículo por el mismo chat. Si quedan guardadas en el servicio, sirven de evidencia y ayudan al proveedor a llegar preparado.</p>
${tool('WhatsApp con el número de tu empresa', 'Los mensajes le llegan al cliente desde tu número y con tu nombre, y todo queda en el servicio.', CORP, 'Ver cómo funciona', 'whatsapp')}
<h2>Un chat por servicio, no por persona</h2>
<p>El error común es que cada operador hable con el cliente desde su celular. Cuando el chat vive dentro de cada servicio, cualquier persona del equipo ve la conversación completa, las autorizaciones quedan registradas y la información no se pierde cuando cambia el turno.</p>
<h2>Desde el número de tu empresa</h2>
<p>Que los mensajes le lleguen al asegurado desde el número y con el nombre de tu empresa genera confianza y refuerza tu marca. El cliente responde por WhatsApp y el equipo contesta desde el chat de cada servicio.</p>
<!--EBOOK:checklist-definitiva-->
<h2>Buenas prácticas</h2>
<ul>
<li>Mensajes cortos y claros en cada cambio de estado.</li>
<li>Datos del técnico y tiempo estimado de llegada.</li>
<li>Un solo número de la empresa, no celulares personales.</li>
<li>Todo el historial guardado en el servicio.</li>
<li>Encuesta corta al cierre para medir la satisfacción.</li>
</ul>
<h2>Conclusión</h2>
<p>WhatsApp bien integrado a la operación reduce llamadas, cancelaciones y servicios fallidos, y deja cada conversación organizada en su servicio. Conoce cómo funciona en <a href="${CORP}">Wip Corporativo</a> y en <a href="${PROV}">Wip Proveedores</a>.</p>
`,
  },

  {
    ...base,
    slug: 'multiservicios-en-asistencias',
    title: 'Multiservicios en asistencias: cómo coordinar varios servicios en un mismo caso',
    seoTitle: 'Multiservicios: varios servicios en un mismo caso',
    seoDesc: 'Cómo coordinar grúa, desplazamiento, custodia o médico y ambulancia en un mismo evento de asistencia, con cada servicio asignado a su prestador.',
    excerpt: 'Un accidente puede necesitar grúa, transporte para el conductor y custodia del vehículo. Cómo coordinar varios servicios en un mismo caso sin perder el control.',
    solucion: 'software-empresas-de-asistencia',
    ...img('multiservicios-en-asistencias', 'Ilustración de un evento de asistencia con varios servicios conectados'),
    html: `
<p>No todas las asistencias se resuelven con un solo servicio. Un accidente puede necesitar una grúa para el vehículo, transporte para el conductor y custodia del carro. Una emergencia médica, un médico a domicilio y una ambulancia. Cuando cada servicio se maneja por separado, la operación pierde la visión del caso completo.</p>
<h2>Qué es un multiservicio</h2>
<p>Es un evento que agrupa varios servicios para el mismo usuario y el mismo caso. Cada servicio tiene su tipo, su prestador y su estado, pero todos comparten la información del evento.</p>
<h2>Ejemplos comunes</h2>
<ul>
<li>Grúa más desplazamiento más custodia.</li>
<li>Carro taller más grúa, si el problema no se resuelve en sitio.</li>
<li>Médico a domicilio más ambulancia.</li>
<li>Cerrajería más vidriería en una asistencia de hogar.</li>
</ul>
<h2>Cómo coordinarlos bien</h2>
<h3>Crear el evento una sola vez</h3>
<p>Los datos del usuario, la ubicación y la póliza se escriben una vez y se comparten con todos los servicios del evento. Si un servicio necesita un dato distinto, se cambia solo en ese.</p>
<h3>Asignar cada servicio a su prestador</h3>
<p>La grúa va al proveedor de grúas, el transporte a otro y la custodia a otro. Cada uno recibe solo lo suyo, pero la operación ve el evento completo.</p>
<h3>Seguir el estado de todos en un solo lugar</h3>
<p>El operador ve qué servicio está pendiente por asignar, cuál va en camino y cuál terminó, sin buscar en varias pantallas.</p>
${tool('Multiservicios en Wip', 'Crea un evento con varios servicios, asígnalos a cada prestador y síguelos en un solo lugar.', CORP, 'Conoce Wip Corporativo', 'monitoreo')}
<!--EBOOK:checklist-definitiva-->
<h2>Beneficios</h2>
<ul>
<li>Menos tiempo creando servicios y menos errores de digitación.</li>
<li>Una sola vista del caso para el call center.</li>
<li>Mejor experiencia para el usuario, que recibe todo coordinado.</li>
<li>Costo total del caso claro para la conciliación.</li>
</ul>
<h2>Conclusión</h2>
<p>Coordinar varios servicios en un mismo evento es cada vez más común en asistencias. Con la herramienta correcta, el caso se opera completo y cada prestador hace su parte. Conoce <a href="${CORP}">Wip Corporativo</a>.</p>
`,
  },

  {
    ...base,
    slug: 'trazabilidad-de-servicios-de-asistencia',
    title: 'Trazabilidad de servicios de asistencia en tiempo real',
    seoTitle: 'Trazabilidad de servicios de asistencia en tiempo real',
    seoDesc: 'Qué es la trazabilidad en asistencias, qué estados registrar, cómo seguir cada servicio en vivo y por qué es la base del ANS, la conciliación y la calidad.',
    excerpt: 'Saber en qué va cada servicio, quién lo tiene y a qué hora pasó cada cosa. Qué es la trazabilidad en asistencias y cómo lograrla en tiempo real.',
    solucion: 'software-empresas-de-asistencia',
    ...img('trazabilidad-de-servicios-de-asistencia', 'Ilustración de la línea de tiempo de un servicio con sus estados'),
    html: `
<p>La trazabilidad es la capacidad de reconstruir la historia completa de un servicio: cuándo se abrió, quién lo asignó, a qué hora aceptó el proveedor, cuándo llegó, qué novedades hubo y cómo terminó. En asistencias es la base de todo lo demás: el ANS, la calidad, la conciliación y la confianza con la aseguradora.</p>
<h2>Qué estados registrar</h2>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Estado</strong></td><td><strong>Para qué sirve</strong></td></tr>
<tr><td>Creado</td><td>Inicio del conteo del ANS.</td></tr>
<tr><td>Asignado</td><td>Mide el tiempo de asignación.</td></tr>
<tr><td>Aceptado</td><td>Mide la respuesta del proveedor.</td></tr>
<tr><td>En camino</td><td>Permite avisar al cliente y estimar la llegada.</td></tr>
<tr><td>En sitio</td><td>Mide el tiempo de llegada frente al ANS.</td></tr>
<tr><td>Finalizado, cancelado o fallido</td><td>Cierre con su causa y evidencias.</td></tr>
</tbody></table></div>
<h2>Cada estado con hora y responsable</h2>
<p>No basta con saber que el servicio cambió de estado. Para auditar hay que saber a qué hora y quién lo hizo: el operador, el proveedor, el técnico o el sistema. Así se sabe en qué parte del proceso se fue el tiempo.</p>
<h2>Trazabilidad en tiempo real</h2>
<p>Una trazabilidad que se arma al final del mes sirve para explicar lo que pasó, no para evitarlo. En tiempo real, la central de monitoreo muestra el estado de cada servicio, un semáforo de ANS y alertas antes de incumplir.</p>
${tool('Central de monitoreo', 'Trazabilidad en tiempo real de cada servicio, con su estado, responsable y semáforo de ANS.', CORP, 'Conoce Wip Corporativo', 'monitoreo')}
<h2>Evidencias que completan la historia</h2>
<p>Fotos con fecha, hora y ubicación, firma del usuario, ruta recorrida y conversaciones del chat. Todo guardado en el mismo servicio, listo para revisar.</p>
<!--EBOOK:checklist-definitiva-->
<h2>Para qué sirve la trazabilidad</h2>
<ul>
<li><strong>Cumplir el ANS:</strong> actuar a tiempo cuando un servicio se demora.</li>
<li><strong>Conciliar sin discusiones:</strong> cada cobro tiene su soporte.</li>
<li><strong>Medir a la red:</strong> tiempos y cumplimiento por proveedor.</li>
<li><strong>Responder al asegurado:</strong> saber qué pasó con su servicio en segundos.</li>
</ul>
<h2>Conclusión</h2>
<p>Una operación de asistencias con trazabilidad en tiempo real cumple más, concilia más rápido y mide mejor a su red. Conoce <a href="${CORP}">Wip Corporativo</a> y cómo medir el <a href="/blog/sla-proveedores-de-asistencia">SLA de tus proveedores</a>.</p>
`,
  },

  {
    ...base,
    slug: 'indicadores-red-de-proveedores-de-asistencia',
    title: 'Indicadores para medir una red de proveedores de asistencia',
    seoTitle: 'Indicadores para medir tu red de proveedores de asistencia',
    seoDesc: 'Los indicadores clave para medir una red de proveedores de asistencia: ANS, tiempos de llegada, rechazos, calidad, costo por servicio y evidencias.',
    excerpt: 'Lo que no se mide no mejora. Los indicadores que toda aseguradora o empresa de asistencia debería seguir de su red de proveedores, y cómo usarlos.',
    solucion: 'software-empresas-de-asistencia',
    ...img('indicadores-red-de-proveedores-de-asistencia', 'Ilustración de un tablero con indicadores de una red de proveedores'),
    html: `
<p>Una red de proveedores de asistencia puede tener cientos de grúas, técnicos, médicos y abogados en varias ciudades. Sin indicadores claros, la gestión se hace a ojo: se sabe quién es "bueno" o "malo" por las quejas, no por los datos. Estos son los indicadores que conviene medir y cómo usarlos.</p>
<h2>Indicadores de tiempo</h2>
<ul>
<li><strong>Tiempo de asignación:</strong> desde que se crea el caso hasta que se asigna.</li>
<li><strong>Tiempo de aceptación:</strong> cuánto tarda el proveedor en tomar el servicio.</li>
<li><strong>Tiempo de llegada:</strong> desde la asignación hasta que llega al sitio.</li>
<li><strong>Cumplimiento del ANS:</strong> porcentaje de servicios dentro del tiempo pactado.</li>
</ul>
<h2>Indicadores de resultado</h2>
<ul>
<li><strong>Servicios finalizados</strong> sobre el total asignado.</li>
<li><strong>Tasa de rechazo</strong> por proveedor y zona.</li>
<li><strong>Servicios fallidos</strong> y su causa.</li>
<li><strong>Calificación del usuario</strong> al cierre.</li>
</ul>
<h2>Indicadores de costo</h2>
<ul>
<li><strong>Costo promedio por servicio</strong> según tipo y ciudad.</li>
<li><strong>Kilómetros adicionales</strong> frente al recorrido real.</li>
<li><strong>Servicios con observaciones</strong> en la conciliación.</li>
</ul>
<h2>Indicadores de calidad de la información</h2>
<ul>
<li><strong>Evidencia completa:</strong> servicios con fotos, firma y horas.</li>
<li><strong>Estados registrados a tiempo</strong> desde el campo.</li>
</ul>
${tool('Indicadores de tu red en vivo', 'ANS, calidad y costo por proveedor, ciudad y tipo de servicio, en tiempo real.', CORP, 'Conoce Wip Corporativo', 'monitoreo')}
<h2>Cómo usarlos</h2>
<ol>
<li><strong>Compara por tipo de servicio y zona,</strong> no en general: una grúa rural no se mide igual que una cerrajería urbana.</li>
<li><strong>Convierte los indicadores en un puntaje</strong> por proveedor y úsalo en la asignación.</li>
<li><strong>Revisa cada mes</strong> con cada proveedor y define planes de mejora concretos.</li>
<li><strong>Reconoce a los mejores</strong> con más servicios.</li>
</ol>
<!--EBOOK:checklist-definitiva-->
<h2>Mejora continua con datos</h2>
<p>Planear, hacer, verificar y actuar, el clásico <a href="/blog/que-es-el-ciclo-phva">ciclo PHVA</a>, funciona en una red de asistencia cuando los datos llegan solos: cada servicio registra sus tiempos, su resultado y su costo, y el tablero muestra dónde actuar.</p>
<h2>Conclusión</h2>
<p>Medir la red con indicadores de tiempo, resultado, costo y calidad permite asignar mejor, negociar con datos y mejorar el servicio al asegurado. Conoce <a href="${CORP}">Wip Corporativo</a>.</p>
`,
  },

  {
    ...base,
    slug: 'temporada-alta-asistencia-vial',
    title: 'Temporada alta en asistencia vial: diciembre, puentes y festivos',
    seoTitle: 'Temporada alta en asistencia vial: cómo prepararte',
    seoDesc: 'Datos agregados de Wip sobre la demanda de asistencia vial en diciembre, puentes y festivos, y cómo preparar tu operación y tu red de proveedores.',
    excerpt: 'Diciembre y los días después de un festivo son los de mayor demanda en asistencia vial. Lo que muestran los datos agregados de Wip y cómo preparar tu operación.',
    solucion: 'software-para-gruas-y-flotas',
    ...img('temporada-alta-asistencia-vial', 'Ilustración de un calendario de diciembre con picos de servicios de asistencia vial'),
    html: `
<p>La demanda de asistencia vial no es pareja durante el año. Hay temporadas en las que los casos se disparan y la red de proveedores se queda corta, y otras en las que baja. Conocer esos picos permite preparar al call center y a los proveedores antes de que lleguen.</p>
<h2>Lo que muestran los datos agregados de Wip</h2>
<p>Con base en los servicios de asistencia gestionados en la plataforma entre noviembre de 2025 y octubre de 2026:</p>
<ul>
<li><strong>Diciembre</strong> es el mes de mayor demanda en asistencia vial: un 14 % por encima del promedio mensual del año.</li>
<li><strong>Enero</strong> cae: un 15 % por debajo del promedio.</li>
<li>El día de mayor demanda fue el <strong>lunes 22 de diciembre de 2025</strong>, con un 72 % más que un día promedio.</li>
<li>El <strong>día después de un festivo</strong> sube: un 29 % más después de la Inmaculada y un 51 % más después de Reyes.</li>
<li>El <strong>martes</strong> es el día de la semana con más servicios y el <strong>domingo</strong> tiene cerca de un tercio de esa demanda.</li>
</ul>
<h2>Cómo preparar tu operación</h2>
<h3>Refuerza turnos en los días pico</h3>
<p>Programa más personas en el call center para la semana antes de Navidad y para los días después de los festivos, cuando la gente regresa a las vías.</p>
<h3>Amplía y confirma tu red</h3>
<p>Revisa con tus proveedores su disponibilidad en diciembre, confirma grúas y conductores de respaldo y asegura cobertura en las rutas de viaje.</p>
<h3>Automatiza la asignación</h3>
<p>Cuando entran muchos casos a la vez, asignar llamando no alcanza. La asignación automática por cercanía, con reasignación si alguien no acepta, mantiene los tiempos bajo control.</p>
${tool('Asignación y monitoreo en temporada alta', 'Asigna en automático y sigue cada servicio en vivo cuando la demanda se dispara.', CORP, 'Conoce Wip Corporativo', 'mapa')}
<h3>Informa al asegurado</h3>
<p>En temporada alta los tiempos pueden subir. Avisarle al cliente por WhatsApp quién va y cuándo llega reduce las llamadas y las cancelaciones.</p>
<!--EBOOK:checklist-definitiva-->
<h2>Checklist de temporada alta</h2>
<ul>
<li>Turnos del call center reforzados para los días pico.</li>
<li>Disponibilidad de proveedores confirmada por ciudad y ruta.</li>
<li>Reglas de asignación y reasignación revisadas.</li>
<li>Avisos al asegurado activos.</li>
<li>Semáforo de ANS en la central de monitoreo.</li>
</ul>
<h2>Conclusión</h2>
<p>La temporada alta de asistencia vial se puede anticipar. Con datos, una red preparada y la asignación automática, diciembre deja de ser un caos. Conoce <a href="${CORP}">Wip Corporativo</a> y <a href="${PROV}">Wip Proveedores</a>.</p>
`,
  },
];
