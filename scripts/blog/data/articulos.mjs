// Articulos escritos para el sitio nuevo (no vienen del WordPress). El build les calcula
// los id de los h2, la tabla de contenido, las palabras y el tiempo de lectura.
// Regla: WIP es software de gestion; nunca presentarlo como prestador de los servicios.

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

const HOY = '2026-09-22';

export const articulos = [
  {
    slug: 'orden-de-trabajo',
    title: 'Orden de trabajo: qué es, qué debe incluir y ejemplo de formato',
    seoTitle: 'Orden de trabajo: qué es, formato y ejemplo',
    seoDesc: 'Qué es una orden de trabajo, qué campos debe tener, un ejemplo de formato listo para usar y cómo pasar del papel o el Excel a órdenes digitales en campo.',
    excerpt: 'La orden de trabajo es el documento que convierte una solicitud en un servicio ejecutado. Te explicamos qué debe incluir, te damos un ejemplo de formato y te mostramos cómo digitalizarla.',
    category: 'gestion-servicios-en-campo',
    solucion: 'software-servicio-tecnico',
    date: HOY, modified: HOY,
    ...img('orden-de-trabajo', 'Ilustración de una orden de trabajo digital con lista de chequeo'),
    ebookCtas: ['checklist-definitiva'],
    html: `
<p>Toda empresa que presta servicios fuera de su oficina, sea instalaciones, mantenimientos, reparaciones o visitas técnicas, depende de un documento que casi nunca recibe la atención que merece: la <strong>orden de trabajo</strong>. Cuando está bien hecha, el técnico sabe exactamente qué hacer, el cliente sabe qué esperar y la empresa puede cobrar sin discusiones. Cuando está incompleta, empiezan las llamadas, las visitas repetidas y las facturas que nadie puede sustentar.</p>
<p>En esta guía te explicamos qué es una orden de trabajo, en qué se diferencia de una orden de servicio, qué campos no pueden faltar y te dejamos un ejemplo de formato que puedes adaptar a tu operación.</p>
<h2>¿Qué es una orden de trabajo?</h2>
<p>Una orden de trabajo (OT) es el documento que autoriza y describe una tarea concreta: qué hay que hacer, dónde, cuándo, quién lo hace y con qué recursos. Es la instrucción que convierte una solicitud del cliente en un trabajo ejecutable y, al final, en la prueba de que el trabajo se hizo.</p>
<p>En operaciones de campo, la orden de trabajo acompaña al servicio durante toda su vida: se crea cuando llega la solicitud, se asigna a un técnico o a un proveedor, se actualiza mientras el trabajo avanza y se cierra con la evidencia de lo que se hizo.</p>
<h2>Orden de trabajo y orden de servicio: ¿son lo mismo?</h2>
<p>En muchas empresas se usan como sinónimos, pero hay una diferencia útil:</p>
<ul>
<li><strong>Orden de servicio:</strong> nace del cliente. Registra lo que el cliente pidió y lo que la empresa se compromete a entregar (alcance, fecha, condiciones y valor).</li>
<li><strong>Orden de trabajo:</strong> es interna. Traduce ese compromiso en instrucciones para quien ejecuta: técnico asignado, materiales, pasos, tiempos y evidencias requeridas.</li>
</ul>
<p>En empresas de servicios en campo con operaciones sencillas, una sola orden cumple las dos funciones. Lo importante no es el nombre, sino que el documento tenga toda la información que necesitan el cliente, el técnico y el área que factura.</p>
<h2>Qué debe incluir una orden de trabajo</h2>
<p>Estos son los campos que no deberían faltar, agrupados según el momento en que se usan:</p>
<h3>1. Identificación</h3>
<ul>
<li>Número o consecutivo único de la orden.</li>
<li>Fecha y hora de creación.</li>
<li>Tipo de servicio (instalación, mantenimiento preventivo, correctivo, inspección, emergencia).</li>
<li>Prioridad.</li>
</ul>
<h3>2. Cliente y lugar</h3>
<ul>
<li>Nombre del cliente o de la empresa que solicita.</li>
<li>Dirección exacta y referencias para llegar.</li>
<li>Persona de contacto en el sitio y teléfono.</li>
<li>Franja horaria acordada.</li>
</ul>
<h3>3. Trabajo a realizar</h3>
<ul>
<li>Descripción del problema o de la solicitud.</li>
<li>Actividades a ejecutar o lista de chequeo.</li>
<li>Materiales, repuestos o herramientas necesarias.</li>
<li>Instrucciones de seguridad cuando apliquen.</li>
</ul>
<h3>4. Asignación y ejecución</h3>
<ul>
<li>Técnico, cuadrilla o proveedor asignado.</li>
<li>Hora de asignación, de llegada y de finalización.</li>
<li>Observaciones y novedades encontradas en el sitio.</li>
</ul>
<h3>5. Cierre</h3>
<ul>
<li>Trabajo realizado y estado final.</li>
<li>Fotos antes y después, actas o documentos.</li>
<li>Firma de conformidad del cliente.</li>
<li>Valor del servicio y recargos aplicados.</li>
<li>Calificación del cliente, si la mides.</li>
</ul>
<div class="callout"><p><strong>Regla práctica:</strong> si con la orden cerrada no puedes responder qué se hizo, quién lo hizo, cuánto tardó y cuánto vale, a tu formato le faltan campos.</p></div>
<h2>Ejemplo de formato de orden de trabajo</h2>
<p>Este ejemplo corresponde a un mantenimiento correctivo de aire acondicionado. Puedes usarlo como plantilla y cambiar los campos según tu tipo de servicio.</p>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Orden n.º</strong></td><td>OT-2026-01482</td></tr>
<tr><td><strong>Fecha de creación</strong></td><td>14 de septiembre de 2026, 8:05 a. m.</td></tr>
<tr><td><strong>Tipo de servicio</strong></td><td>Mantenimiento correctivo</td></tr>
<tr><td><strong>Prioridad</strong></td><td>Alta</td></tr>
<tr><td><strong>Cliente</strong></td><td>Oficinas Centro S.A.S.</td></tr>
<tr><td><strong>Dirección</strong></td><td>Calle 10 # 5-20, piso 3. Ingreso por portería</td></tr>
<tr><td><strong>Contacto en sitio</strong></td><td>Laura Gómez, jefe administrativa</td></tr>
<tr><td><strong>Franja acordada</strong></td><td>9:00 a. m. a 11:00 a. m.</td></tr>
<tr><td><strong>Descripción</strong></td><td>Equipo de sala de juntas no enfría y presenta goteo</td></tr>
<tr><td><strong>Actividades</strong></td><td>Diagnóstico, limpieza de filtros, revisión de drenaje y de carga de refrigerante</td></tr>
<tr><td><strong>Técnico asignado</strong></td><td>Carlos Martínez</td></tr>
<tr><td><strong>Llegada / finalización</strong></td><td>9:22 a. m. / 10:40 a. m.</td></tr>
<tr><td><strong>Trabajo realizado</strong></td><td>Destapado de drenaje y limpieza de filtros. Equipo operando</td></tr>
<tr><td><strong>Evidencias</strong></td><td>4 fotos (antes y después) y acta firmada</td></tr>
<tr><td><strong>Valor</strong></td><td>Tarifa base más recargo por prioridad alta</td></tr>
</tbody></table></div>
<h2>Tipos de órdenes de trabajo más comunes</h2>
<ul>
<li><strong>Instalación:</strong> puesta en marcha de un equipo o servicio nuevo, como internet, aire acondicionado o redes eléctricas.</li>
<li><strong>Mantenimiento preventivo:</strong> revisiones programadas para evitar fallas.</li>
<li><strong>Mantenimiento correctivo:</strong> reparación de una falla ya ocurrida.</li>
<li><strong>Inspección o visita técnica:</strong> diagnóstico, levantamiento de información o verificación.</li>
<li><strong>Emergencia:</strong> atención inmediata, con tiempos de respuesta más exigentes.</li>
</ul>
<h2>El ciclo de vida de una orden de trabajo</h2>
<ol class="steps">
<li><strong>Creada</strong> Llega la solicitud y se registran los datos del cliente y del trabajo.</li>
<li><strong>Asignada</strong> Se elige al técnico o proveedor según cercanía, disponibilidad o especialidad.</li>
<li><strong>En camino</strong> El técnico se desplaza y el cliente sabe cuándo llega.</li>
<li><strong>En ejecución</strong> Se registran novedades, materiales y evidencias.</li>
<li><strong>Finalizada</strong> El cliente firma y califica.</li>
<li><strong>Cerrada</strong> Se valida la evidencia y se liquida el servicio.</li>
</ol>
<p>Cada cambio de estado debería quedar con fecha y hora. Esos registros son los que después te permiten medir tiempos de respuesta y cumplimiento.</p>
<h2>Problemas de las órdenes en papel o en Excel</h2>
<p>El papel y la hoja de cálculo funcionan mientras la operación es pequeña. A medida que crece aparecen problemas conocidos:</p>
<ul>
<li>La orden llega tarde a la oficina, o no llega, y el servicio no se puede cobrar.</li>
<li>Las fotos quedan en el celular del técnico y nunca se asocian a la orden.</li>
<li>Nadie sabe en qué estado está cada trabajo sin llamar al técnico.</li>
<li>Los tiempos se reconstruyen de memoria, así que no hay forma real de medir el cumplimiento.</li>
<li>Las tarifas se calculan a mano, con errores y con discusiones con el cliente.</li>
</ul>
<!--EBOOK:checklist-definitiva-->
<h2>Cómo digitalizar tus órdenes de trabajo</h2>
<p>Digitalizar no es pasar el formato a un PDF editable. Es lograr que la orden viva en un solo lugar y que cada persona la actualice en el momento en que ocurre cada cosa. Al evaluar una herramienta, revisa que permita:</p>
<ul>
<li>Crear órdenes desde cualquier canal y con formularios distintos por tipo de servicio.</li>
<li>Asignarlas automáticamente según reglas como cercanía, prioridad o tarifa.</li>
<li>Que el técnico actualice estados, suba fotos y recoja la firma del cliente desde el celular.</li>
<li>Ver el estado de todas las órdenes en tiempo real, sin llamadas.</li>
<li>Calcular el valor de cada servicio con tus reglas y exportar reportes.</li>
</ul>
<p>Eso es lo que hace un <a href="/software-servicio-tecnico">software para empresas de servicio técnico e instalaciones</a> como WIP: cada orden de trabajo queda con su responsable, sus tiempos, su evidencia y su tarifa, y tu cliente puede seguirla por WhatsApp.</p>
${tool('App para técnicos en campo', 'Tus técnicos reciben la orden, actualizan el estado y suben fotos y firma desde el celular.', '/software-servicio-tecnico', 'Ver cómo funciona en WIP', 'app')}
<h2>Conclusión</h2>
<p>Una buena orden de trabajo ahorra visitas repetidas, reclamos y discusiones de cobro. Empieza por asegurarte de que tu formato tenga los campos de identificación, cliente, trabajo, ejecución y cierre. Cuando el volumen crezca, llévala a una herramienta digital para que la información llegue completa y a tiempo. Si tienes tu propio equipo técnico, puedes ver los planes de <a href="/equipos">WIP Equipos</a>.</p>
`,
  },

  {
    slug: 'como-elegir-software-gestion-servicios-en-campo',
    title: 'Cómo elegir un software de gestión de servicios en campo: 10 criterios',
    seoTitle: 'Cómo elegir un software de gestión de servicios en campo',
    seoDesc: 'Guía para elegir un software FSM: los 10 criterios que importan en una operación de servicios en campo en LATAM, preguntas para la demo y errores a evitar.',
    excerpt: 'Antes de pedir demos, define qué necesita tu operación. Estos son los 10 criterios para elegir un software de gestión de servicios en campo (FSM) y las preguntas que conviene hacer.',
    category: 'gestion-servicios-en-campo',
    solucion: 'software-gestion-servicios-en-campo',
    date: HOY, modified: HOY,
    ...img('como-elegir-software-gestion-servicios-en-campo', 'Ilustración de un panel de gestión de servicios en campo con mapa y lista de criterios'),
    ebookCtas: ['gestion-de-equipos-de-trabajo-en-campo'],
    html: `
<p>Si tu empresa coordina técnicos, cuadrillas o proveedores que trabajan en la calle, probablemente ya te preguntaste si es momento de dejar el Excel y los grupos de WhatsApp. El siguiente paso suele ser buscar un <strong>software de gestión de servicios en campo</strong>, también conocido como software FSM (Field Service Management). El problema es que las opciones van desde un GPS con agenda hasta suites globales que tardan meses en implementarse.</p>
<p>Esta guía te ayuda a decidir con criterio: qué revisar, qué preguntar en la demo y qué errores evitar.</p>
<h2>Qué es un software de gestión de servicios en campo</h2>
<p>Es una plataforma para coordinar los servicios que se prestan fuera de la oficina, como instalaciones, mantenimientos, asistencias, inspecciones o visitas a domicilio. Cubre todo el recorrido del servicio: recibir la solicitud, asignarla, hacer seguimiento en tiempo real, recoger la evidencia y cerrarla para cobrar. Si quieres el detalle, lo explicamos en nuestra página de <a href="/software-gestion-servicios-en-campo">software de gestión de servicios en campo</a>.</p>
<h2>Señales de que tu operación ya lo necesita</h2>
<ul>
<li>Para saber el estado de un servicio hay que llamar al técnico o al proveedor.</li>
<li>La asignación depende de quién contesta primero en el chat.</li>
<li>Los clientes llaman a preguntar a qué hora llega el técnico.</li>
<li>Te enteras de los incumplimientos cuando el cliente ya reclamó.</li>
<li>Cerrar el mes implica reconstruir tiempos, fotos y tarifas a mano.</li>
</ul>
<p>Si te identificas con dos o más, un FSM te va a ahorrar tiempo desde el primer mes.</p>
<h2>Los 10 criterios para elegir un software FSM</h2>
<h3>1. Que se ajuste a cómo prestas el servicio</h3>
<p>No es lo mismo operar con técnicos de nómina que coordinar una red de proveedores o contratistas externos. Muchas empresas tienen ambos. Verifica que la plataforma maneje tu modelo, y que cada actor (operación, proveedor, técnico y cliente) tenga su propio acceso y vea solo lo que le corresponde.</p>
<h3>2. Asignación inteligente, no solo manual</h3>
<p>Pregunta con qué criterios puede asignar el sistema: cercanía, disponibilidad, prioridad, cobertura, tarifa o calificación del proveedor. Y si lo puede hacer automáticamente según reglas por cliente o por tipo de servicio.</p>
<h3>3. Seguimiento en tiempo real</h3>
<p>Un mapa con puntos no basta. Lo útil es ver el estado de cada servicio: quién está disponible, quién va en camino y quién ya está con el cliente, con la línea de tiempo completa de cada orden.</p>
<h3>4. Una app que el técnico quiera usar</h3>
<p>Si la app del técnico es complicada, no la va a usar y el sistema se queda sin datos. Pide ver la app en la demo: cuántos toques se necesitan para cambiar un estado, subir una foto o recoger la firma del cliente.</p>
<h3>5. Evidencias ligadas a cada servicio</h3>
<p>Fotos antes y después, documentos, formularios y firma deben quedar asociados a la orden, no en el celular del técnico. Es lo que te permite cobrar, auditar y responder un reclamo.</p>
<h3>6. Una experiencia pensada para tu cliente</h3>
<p>En Latinoamérica el cliente vive en WhatsApp. Un sistema que le informe por ese canal quién lo atiende y cuándo llega, sin obligarlo a descargar una app, reduce llamadas y reclamos más que cualquier otra función.</p>
<h3>7. Indicadores y SLA en vivo</h3>
<p>El cumplimiento se gestiona mientras el servicio está en curso, no al final del mes. Busca alertas antes de incumplir y reportes de tiempos por cliente, ciudad, técnico o proveedor.</p>
<h3>8. Tarifas y liquidación automáticas</h3>
<p>Si cobras por tipo de servicio, distancia, horario o convenio, el sistema debería calcular el valor de cada servicio con tus reglas. Esto elimina errores de cobro y discusiones con clientes y proveedores.</p>
<h3>9. Parametrización e integraciones</h3>
<p>Tus estados, formularios y flujos deberían configurarse sin desarrollo a la medida. Pregunta también cómo se integra con tus herramientas actuales, como la línea de atención, tu plataforma o tu ERP.</p>
<h3>10. Soporte, implementación y condiciones</h3>
<p>Revisa quién te acompaña en la puesta en marcha, en qué idioma y en qué horario. Pregunta cuánto tarda la implementación, si tiene costo, si hay cláusulas de permanencia y cómo se cobra el crecimiento.</p>
<!--EBOOK:gestion-de-equipos-de-trabajo-en-campo-->
<h2>Preguntas para hacer en la demo</h2>
<ul>
<li>¿Me muestras cómo se asigna automáticamente un servicio con mis reglas?</li>
<li>¿Qué ve exactamente mi cliente y por qué canal?</li>
<li>¿Qué pasa si un técnico o proveedor rechaza el servicio?</li>
<li>¿Cómo se calcula la tarifa de un servicio con recargo nocturno?</li>
<li>¿Qué reportes puedo exportar y con qué filtros?</li>
<li>¿Cuánto tiempo toma estar operando y quién configura los flujos?</li>
<li>¿Qué soporte tengo si algo falla un domingo en la noche?</li>
</ul>
<h2>Errores comunes al elegir</h2>
<ul>
<li><strong>Elegir un CRM pensando que resuelve la operación.</strong> El CRM gestiona la relación comercial; el FSM gestiona quién presta el servicio, dónde está y si cumplió.</li>
<li><strong>Quedarse con un rastreador GPS.</strong> Saber dónde está un vehículo no te dice qué servicio está haciendo, cuánto tardó ni qué evidencia dejó.</li>
<li><strong>Comprar la suite más grande.</strong> Una plataforma global sin soporte local puede tardar meses en implementarse y terminar subutilizada.</li>
<li><strong>No involucrar a los técnicos.</strong> Si quienes están en campo no adoptan la herramienta, no hay datos.</li>
</ul>
${tool('Central de monitoreo', 'Mira cómo WIP muestra cada servicio en vivo, con semáforo de SLA y evidencias.', '/software-gestion-servicios-en-campo', 'Conocer WIP', 'monitoreo')}
<h2>Conclusión</h2>
<p>El mejor software FSM no es el que tiene más funciones, sino el que tu equipo usa todos los días y te da datos para decidir. Antes de pedir demos, anota tu modelo de operación, tus reglas de asignación y cómo cobras. Con eso, la comparación se vuelve sencilla. WIP nació en Latinoamérica para este tipo de operaciones: si quieres verlo con un caso como el tuyo, <a href="/contacto">agenda una demo</a>.</p>
`,
  },

  {
    slug: 'control-de-personal-en-campo',
    title: 'Control de personal en campo: cómo hacer seguimiento a tu equipo sin perseguirlo',
    seoTitle: 'Control de personal en campo: cómo hacer seguimiento',
    seoDesc: 'Cómo hacer seguimiento a tu personal en campo con datos y no con llamadas: qué medir, qué herramientas usar y cómo lograrlo sin afectar la confianza.',
    excerpt: 'Controlar al personal en campo no es vigilarlo: es tener la información de cada servicio sin llamar a nadie. Qué medir, qué herramientas usar y cómo implementarlo con tu equipo.',
    category: 'gestion-servicios-en-campo',
    solucion: null, // el cierre del articulo ya lleva a /equipos
    date: HOY, modified: HOY,
    ...img('control-de-personal-en-campo', 'Ilustración de un mapa con técnicos en campo y sus estados de servicio'),
    ebookCtas: ['gestion-de-equipos-de-trabajo-en-campo'],
    html: `
<p>Cuando tu equipo trabaja en la calle, en casas de clientes, en obras o recorriendo una ciudad, la pregunta de todos los días es la misma: ¿dónde está cada uno y qué está haciendo? La respuesta más común es llamar, escribir por WhatsApp y esperar. Eso consume horas de la operación y, además, desgasta la relación con el equipo.</p>
<p>El <strong>control de personal en campo</strong> bien hecho no consiste en vigilar a las personas. Consiste en que la información de cada servicio llegue sola, en el momento en que ocurre. En esta guía te contamos qué medir, qué herramientas existen y cómo implementarlo.</p>
<h2>Por qué es tan difícil hacer seguimiento al personal en campo</h2>
<ul>
<li>El trabajo ocurre lejos de la oficina y en horarios variables.</li>
<li>La información llega por canales distintos: llamadas, chats, fotos y notas de voz.</li>
<li>Los tiempos se reportan de memoria, al final del día.</li>
<li>Cada supervisor tiene su propio Excel y nadie ve el panorama completo.</li>
</ul>
<p>El resultado es una operación que depende de preguntar, y un equipo que siente que lo persiguen.</p>
<h2>Controlar no es vigilar</h2>
<p>El seguimiento funciona cuando el equipo entiende para qué sirve y lo ve como una ayuda. Algunas buenas prácticas:</p>
<ul>
<li><strong>Explica qué se mide y por qué:</strong> tiempos de respuesta, cumplimiento con el cliente y evidencia para cobrar.</li>
<li><strong>Mide servicios, no personas:</strong> el foco es que cada servicio se preste bien y a tiempo.</li>
<li><strong>Usa los datos para ayudar:</strong> reasignar cuando alguien está saturado, reconocer a quien resuelve bien a la primera y detectar dónde hace falta capacitación.</li>
<li><strong>Ten una política clara</strong> sobre el uso de la ubicación durante la jornada, acorde con la normativa de datos personales de tu país.</li>
</ul>
<h2>Qué medir a tu personal en campo</h2>
<p>Estos indicadores te dan control sin necesidad de llamar a nadie:</p>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Indicador</strong></td><td><strong>Cómo se calcula</strong></td></tr>
<tr><td>Tiempo de respuesta</td><td>Hora de llegada donde el cliente menos hora de asignación</td></tr>
<tr><td>Tiempo en sitio</td><td>Hora de finalización menos hora de llegada</td></tr>
<tr><td>Servicios por técnico</td><td>Servicios cerrados en el periodo dividido entre técnicos activos</td></tr>
<tr><td>Cumplimiento de SLA</td><td>Servicios dentro del tiempo acordado dividido entre servicios totales</td></tr>
<tr><td>Resolución en la primera visita</td><td>Servicios resueltos sin segunda visita dividido entre servicios totales</td></tr>
<tr><td>Calificación del cliente</td><td>Promedio de las calificaciones al cierre de cada servicio</td></tr>
</tbody></table></div>
<p>Todos salen de registrar la hora de cada cambio de estado del servicio. Si ese registro es automático, los indicadores también lo son.</p>
<h2>Herramientas para el control de personal en campo</h2>
<h3>Excel y WhatsApp</h3>
<p>Sirven para empezar, pero no escalan: la información se pierde entre conversaciones, depende de que alguien la reporte y no deja trazabilidad confiable.</p>
<h3>Rastreadores GPS</h3>
<p>Te dicen dónde está una persona o un vehículo, pero no qué servicio está atendiendo, cuánto tardó ni qué evidencia dejó. Son útiles para la flota, pero no resuelven la operación de servicios.</p>
<h3>Software de gestión de personal en campo</h3>
<p>Combina las dos cosas que necesitas: la ubicación y el estado de cada servicio. El técnico usa una app en el celular para recibir el servicio, marcar que va en camino, que llegó y que terminó, y subir fotos y la firma del cliente. La oficina lo ve todo en un mapa y en una línea de tiempo, sin llamar. Así funciona <a href="/equipos">WIP Equipos, el software de gestión de personal en campo</a> de WIP.</p>
${tool('Ubicación del equipo en tiempo real', 'Ve quién está disponible, quién va en camino y quién ya llegó donde el cliente.', '/equipos', 'Ver WIP Equipos', 'mapa')}
<h2>Cómo implementar el seguimiento en 6 pasos</h2>
<ol class="steps">
<li><strong>Define qué vas a medir</strong> Elige tres o cuatro indicadores de la tabla anterior.</li>
<li><strong>Estandariza los estados</strong> Por ejemplo: asignado, en camino, en sitio, finalizado.</li>
<li><strong>Elige la herramienta</strong> Una app sencilla para el técnico y un panel para la operación.</li>
<li><strong>Comunícalo al equipo</strong> Explica el para qué y resuelve dudas antes de arrancar.</li>
<li><strong>Arranca con un grupo piloto</strong> Ajusta formularios y estados con quienes están en la calle.</li>
<li><strong>Revisa los datos cada semana</strong> Usa los indicadores para mejorar, no solo para controlar.</li>
</ol>
<!--EBOOK:gestion-de-equipos-de-trabajo-en-campo-->
<h2>Qué gana tu cliente</h2>
<p>El control del personal en campo no solo le sirve a la operación. Cuando cada estado del servicio queda registrado, el cliente también puede verlo: recibe por WhatsApp quién lo atiende y cuándo llega, y deja de llamar a preguntar. Es una de las mejoras que más valoran las empresas que atienden a domicilio o en el sitio del cliente.</p>
<h2>Conclusión</h2>
<p>El mejor control de personal en campo es el que no necesita llamadas. Define qué medir, estandariza los estados del servicio y dale al equipo una herramienta que le facilite el trabajo. Si coordinas proveedores externos además de tu equipo, revisa también cómo funciona la <a href="/software-gestion-servicios-en-campo">gestión de servicios en campo</a> con una red de terceros.</p>
`,
  },

  {
    slug: 'sla-proveedores-de-asistencia',
    title: 'SLA de proveedores de asistencia: cómo medirlo y hacerlo cumplir',
    seoTitle: 'SLA de proveedores de asistencia: cómo medirlo',
    seoDesc: 'Qué es el SLA en asistencia vial y hogar, qué indicadores medir a tus proveedores, cómo calcularlos y cómo convertir el cumplimiento en mejores asignaciones.',
    excerpt: 'En asistencia, el SLA se cumple o se incumple en minutos. Qué indicadores medir a tu red de proveedores, cómo calcularlos y cómo usar el cumplimiento para asignar mejor.',
    category: 'gestion-servicios-en-campo',
    solucion: 'software-empresas-de-asistencia',
    date: HOY, modified: HOY,
    ...img('sla-proveedores-de-asistencia', 'Ilustración de un tablero de SLA con semáforo de cumplimiento de proveedores'),
    ebookCtas: ['checklist-definitiva'],
    html: `
<p>En una asistencia vial o de hogar, la experiencia del cliente se decide en minutos: cuánto tardaron en asignar, cuánto tardó el proveedor en llegar y si el problema se resolvió. Por eso las aseguradoras miden a las empresas de asistencia con acuerdos de nivel de servicio (SLA), y las empresas de asistencia, a su vez, necesitan medir a su red de proveedores.</p>
<p>En esta guía te explicamos qué indicadores componen un buen <strong>SLA de proveedores de asistencia</strong>, cómo calcularlos y cómo hacer que se cumplan sin depender de llamadas.</p>
<h2>Qué es un SLA en asistencia</h2>
<p>Un SLA (Service Level Agreement, o acuerdo de nivel de servicio) es el compromiso medible sobre cómo se presta un servicio: en cuánto tiempo se atiende, con qué calidad y qué pasa si no se cumple. En asistencia suele haber dos niveles:</p>
<ul>
<li><strong>Aseguradora con la empresa de asistencia:</strong> tiempos de atención y satisfacción del asegurado.</li>
<li><strong>Empresa de asistencia con sus proveedores:</strong> tiempos de aceptación, de llegada y de solución por tipo de servicio y zona.</li>
</ul>
<p>Si el segundo nivel no se mide bien, el primero se incumple sin que nadie lo vea venir.</p>
<h2>Los indicadores que componen el SLA de un proveedor</h2>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Indicador</strong></td><td><strong>Qué mide</strong></td><td><strong>Cómo se calcula</strong></td></tr>
<tr><td>Tiempo de aceptación</td><td>Qué tan rápido el proveedor toma el servicio</td><td>Hora de aceptación menos hora de asignación</td></tr>
<tr><td>Tiempo de llegada</td><td>Qué tan rápido llega donde el cliente</td><td>Hora de llegada menos hora de asignación</td></tr>
<tr><td>Desviación frente a la hora prometida</td><td>Si cumple lo que se le dijo al cliente</td><td>Hora real de llegada menos hora estimada</td></tr>
<tr><td>Tiempo de solución</td><td>Cuánto tarda en resolver</td><td>Hora de finalización menos hora de llegada</td></tr>
<tr><td>Cumplimiento de SLA</td><td>Porcentaje de servicios dentro del tiempo acordado</td><td>Servicios dentro del SLA dividido entre servicios totales</td></tr>
<tr><td>Tasa de rechazo</td><td>Qué tanto rechaza servicios asignados</td><td>Servicios rechazados dividido entre servicios asignados</td></tr>
<tr><td>Calificación del cliente</td><td>Percepción del servicio</td><td>Promedio de las calificaciones al cierre</td></tr>
<tr><td>Evidencia completa</td><td>Si el cierre se puede auditar</td><td>Servicios con fotos y firma dividido entre servicios cerrados</td></tr>
</tbody></table></div>
<h2>Cómo definir un SLA justo</h2>
<p>Un mismo tiempo para todo genera incumplimientos que no son culpa del proveedor. Define el SLA por:</p>
<ul>
<li><strong>Tipo de servicio:</strong> una cerrajería urbana y una grúa en carretera no pueden tener el mismo tiempo de llegada.</li>
<li><strong>Zona:</strong> urbano, periferia y rural.</li>
<li><strong>Horario:</strong> día, noche, fines de semana y festivos.</li>
<li><strong>Prioridad:</strong> por ejemplo, una persona varada en vía frente a un servicio programado.</li>
</ul>
<p>Deja escrito en el acuerdo con cada proveedor cómo se mide cada tiempo, desde qué evento empieza a contar y qué evidencia se exige al cierre.</p>
<!--EBOOK:checklist-definitiva-->
<h2>Medir en vivo, no a fin de mes</h2>
<p>El error más común es revisar el cumplimiento cuando se consolida el reporte mensual. Para entonces el asegurado ya esperó y el incumplimiento ya pasó. Medir en vivo significa:</p>
<ul>
<li>Que cada cambio de estado del servicio (asignado, aceptado, en camino, en sitio, finalizado) quede registrado con hora exacta, desde el celular del proveedor.</li>
<li>Un semáforo que avise cuando un servicio está por incumplir, para reasignarlo o escalarlo a tiempo.</li>
<li>Que el asegurado vea por WhatsApp quién lo atiende y cuándo llega, lo que reduce las llamadas al centro de atención.</li>
</ul>
${tool('Central de monitoreo con semáforo de SLA', 'Sigue cada asistencia de tu red en vivo y actúa antes de incumplir.', '/software-empresas-de-asistencia', 'Ver la solución para asistencias', 'monitoreo')}
<h2>Del indicador a la decisión: el scoring de proveedores</h2>
<p>Medir sirve si cambia algo. La práctica más efectiva es convertir los indicadores en un puntaje por proveedor que combine cumplimiento, tiempos de respuesta y calidad, y usarlo para:</p>
<ul>
<li><strong>Asignar mejor:</strong> los proveedores con mejor puntaje reciben más servicios.</li>
<li><strong>Negociar con datos:</strong> las condiciones contractuales se sostienen con el historial, no con percepciones.</li>
<li><strong>Acompañar a quien se queda atrás:</strong> planes de mejora concretos por zona o tipo de servicio.</li>
</ul>
<p>Plataformas como WIP calculan este puntaje automáticamente y lo usan en la asignación inteligente. Así, mientras más opera tu red, mejores son las asignaciones.</p>
<h2>Checklist para tu SLA de proveedores</h2>
<ul>
<li>Tiempos definidos por tipo de servicio, zona, horario y prioridad.</li>
<li>Eventos que marcan el inicio y el fin de cada tiempo.</li>
<li>Evidencia mínima exigida al cierre: fotos, firma y formulario.</li>
<li>Registro automático de cada estado desde el campo.</li>
<li>Alertas antes de incumplir.</li>
<li>Puntaje por proveedor revisado cada mes.</li>
<li>Consecuencias y reconocimientos escritos en el acuerdo.</li>
</ul>
<h2>Conclusión</h2>
<p>Un SLA de proveedores de asistencia funciona cuando se mide en vivo, es justo según el tipo de servicio y la zona, y se traduce en decisiones de asignación. Si coordinas una red de proveedores para aseguradoras, mira cómo lo resuelve nuestro <a href="/software-empresas-de-asistencia">software para empresas de asistencia y aseguradoras</a>.</p>
`,
  },

  {
    slug: 'gestion-de-flotas-de-servicio',
    title: 'Gestión de flotas de servicio: cómo coordinar grúas, técnicos y unidades en campo',
    seoTitle: 'Gestión de flotas de servicio: grúas, técnicos y unidades',
    seoDesc: 'Qué es la gestión de flotas de servicio, en qué se diferencia de la telemetría, qué indicadores seguir y cómo despachar grúas y unidades con datos en vivo.',
    excerpt: 'Una flota de servicio no se gestiona solo con GPS. Qué la diferencia de una flota de transporte, qué indicadores seguir y cómo despachar grúas, carros taller y técnicos con datos.',
    category: 'gestion-servicios-en-campo',
    solucion: 'software-para-gruas-y-flotas',
    date: HOY, modified: HOY,
    ...img('gestion-de-flotas-de-servicio', 'Ilustración de un mapa con unidades de servicio y rutas de despacho'),
    ebookCtas: ['checklist-definitiva'],
    html: `
<p>Una empresa de grúas, un operador de carros taller o una empresa de mantenimiento con camionetas propias tienen algo en común: su flota no transporta mercancía, <strong>presta servicios</strong>. Cada vehículo sale a atender un caso concreto, con un cliente esperando, un tiempo prometido y una tarifa que depende de lo que pase en la calle.</p>
<p>Por eso la <strong>gestión de flotas de servicio</strong> tiene retos distintos a los de una flota de transporte, y necesita herramientas distintas. En esta guía te explicamos cuáles son y cómo organizar el despacho con datos.</p>
<h2>Flota de servicio frente a flota de transporte</h2>
<ul>
<li><strong>Flota de transporte:</strong> mueve carga o pasajeros entre puntos conocidos. Lo clave es la ruta, el consumo y el mantenimiento del vehículo.</li>
<li><strong>Flota de servicio:</strong> atiende casos que llegan sin aviso (una persona varada, una falla, una instalación). Lo clave es qué unidad atiende cada caso, cuánto tarda en llegar, qué se hizo y cuánto vale.</li>
</ul>
<h2>Dos tipos de software que se complementan</h2>
<h3>Telemetría o gestión de vehículos</h3>
<p>Mide el vehículo: ubicación del dispositivo GPS, consumo de combustible, velocidad, hábitos de conducción y mantenimiento. Es útil para cuidar los activos.</p>
<h3>Software de gestión de servicios en campo</h3>
<p>Gestiona el servicio que presta cada unidad: recibir el caso, despacharlo a la unidad adecuada, seguir su estado, recoger evidencias, calcular la tarifa e informar al cliente. Es lo que determina si cumples a tu cliente y si puedes cobrar.</p>
<p>Muchas empresas de grúas y asistencia vial tienen el primero y siguen despachando por radio o WhatsApp. El salto de productividad suele estar en el segundo.</p>
<h2>Los retos de despachar una flota de servicio</h2>
<ul>
<li><strong>Saber qué unidad está libre y cerca</strong> sin llamar a cada conductor.</li>
<li><strong>Cumplir los tiempos de llegada</strong> que exigen aseguradoras y empresas de asistencia.</li>
<li><strong>Liquidar con precisión:</strong> tarifa base, kilómetros, recargos nocturnos y condiciones por cliente.</li>
<li><strong>Documentar el estado del vehículo atendido</strong> antes y después del servicio, para evitar reclamos.</li>
<li><strong>Mantener informado al cliente</strong> que espera en la vía o en su casa.</li>
</ul>
<h2>Indicadores para una flota de servicio</h2>
<div class="table-wrap"><table><tbody>
<tr><td><strong>Indicador</strong></td><td><strong>Para qué sirve</strong></td></tr>
<tr><td>Tiempo de despacho</td><td>Mide cuánto tarda la operación en asignar cada caso</td></tr>
<tr><td>Tiempo de llegada</td><td>Es el dato que más pesa en el SLA con tus clientes</td></tr>
<tr><td>Servicios por unidad al día</td><td>Muestra la productividad y la capacidad real de la flota</td></tr>
<tr><td>Kilómetros por servicio</td><td>Revela si el despacho está asignando a la unidad más cercana</td></tr>
<tr><td>Cumplimiento de SLA por cliente</td><td>Sustenta tu operación ante aseguradoras y empresas</td></tr>
<tr><td>Servicios con evidencia completa</td><td>Protege la facturación y reduce reclamos</td></tr>
</tbody></table></div>
${tool('Tu flota en el mapa', 'Despacha cada caso a la unidad disponible más cercana y sigue cada servicio en vivo.', '/software-para-gruas-y-flotas', 'Ver software para grúas y flotas', 'mapa')}
<h2>Buenas prácticas de despacho</h2>
<ol class="steps">
<li><strong>Define zonas y turnos</strong> Qué unidades cubren qué zonas y en qué horarios.</li>
<li><strong>Escribe las reglas de asignación</strong> Cercanía, prioridad, tipo de unidad y tarifa por cliente.</li>
<li><strong>Automatiza lo repetitivo</strong> Deja la asignación manual solo para los casos especiales.</li>
<li><strong>Registra cada estado</strong> Asignado, en camino, en sitio y finalizado, con hora exacta.</li>
<li><strong>Exige evidencia al cierre</strong> Fotos antes y después, y firma del cliente.</li>
<li><strong>Informa al cliente</strong> Quién va y cuándo llega, por WhatsApp.</li>
</ol>
<h2>El caso de las grúas y la asistencia vial</h2>
<p>En asistencia vial, los tres momentos críticos son el despacho, la llegada y la entrega del vehículo. Las empresas que mejor lo resuelven hacen esto:</p>
<ul>
<li>Toman fotos del vehículo antes de cargarlo y al entregarlo, para dejar constancia de su estado.</li>
<li>Registran el kilometraje del servicio para calcular la tarifa sin discusiones.</li>
<li>Comparten con la aseguradora o la empresa de asistencia el estado del caso en tiempo real, en lugar de enviar reportes al final del mes.</li>
</ul>
<!--EBOOK:checklist-definitiva-->
<h2>Conclusión</h2>
<p>Gestionar una flota de servicio es gestionar servicios, no solo vehículos. La telemetría cuida tus activos; un software de gestión de servicios en campo te ayuda a cumplir y a cobrar. Si tu empresa opera grúas, carros taller o unidades de servicio, conoce nuestro <a href="/software-para-gruas-y-flotas">software para empresas de grúas y flotas de servicio</a>.</p>
`,
  },

  {
    slug: 'digitalizar-empresa-servicios-a-domicilio',
    title: 'Cómo digitalizar una empresa de servicios a domicilio en 6 pasos',
    seoTitle: 'Cómo digitalizar una empresa de servicios a domicilio',
    seoDesc: '6 pasos para digitalizar una empresa de servicios a domicilio (hogar, salud o mascotas): agenda, asignación, seguimiento, WhatsApp, evidencias y cobro.',
    excerpt: 'Plomería, limpieza, médicos o veterinarios a domicilio: una guía en 6 pasos para pasar del cuaderno y el WhatsApp a una operación ordenada, medible y con clientes informados.',
    category: 'gestion-servicios-en-campo',
    solucion: 'software-servicios-a-domicilio',
    date: HOY, modified: HOY,
    ...img('digitalizar-empresa-servicios-a-domicilio', 'Ilustración de una casa con un técnico a domicilio y avisos en el celular del cliente'),
    ebookCtas: ['gestion-de-equipos-de-trabajo-en-campo'],
    html: `
<p>Las empresas de servicios a domicilio suelen crecer igual: primero con un teléfono y un cuaderno, después con un grupo de WhatsApp y una hoja de cálculo. Funciona hasta que un día hay más servicios que los que alguien puede coordinar de memoria. Ahí aparecen los clientes que esperan sin saber a qué hora llega el técnico, los servicios que se olvidan y los cobros que no cuadran.</p>
<p>Esta guía te muestra cómo <strong>digitalizar una empresa de servicios a domicilio</strong> en 6 pasos, sirve igual para hogar (plomería, electricidad, cerrajería, limpieza), para salud (médicos, enfermería, fisioterapia) y para mascotas (veterinarios a domicilio).</p>
<h2>Señales de que ya es hora de digitalizar</h2>
<ul>
<li>Los clientes llaman para preguntar a qué hora llega el profesional.</li>
<li>Para saber si un servicio terminó hay que escribirle a quien lo atendió.</li>
<li>Los recargos por horario o distancia se calculan a mano y generan reclamos.</li>
<li>No sabes cuántos servicios hace cada persona ni cuánto tardan.</li>
</ul>
<h2>Los 6 pasos</h2>
<ol class="steps">
<li><strong>Centraliza las solicitudes</strong> Un solo lugar para todo lo que llega.</li>
<li><strong>Estandariza tus servicios</strong> Tipos, formularios y tiempos por servicio.</li>
<li><strong>Define cómo asignas</strong> Reglas claras y, si puedes, automáticas.</li>
<li><strong>Informa al cliente</strong> Quién va y cuándo llega, por WhatsApp.</li>
<li><strong>Cierra con evidencia</strong> Fotos, formulario y firma del cliente.</li>
<li><strong>Automatiza tarifas y reportes</strong> Cobros exactos y datos para decidir.</li>
</ol>
<h2>1. Centraliza las solicitudes</h2>
<p>Da igual si el cliente llama, escribe por WhatsApp o llega por una empresa aliada: cada solicitud debe quedar registrada en un solo sistema, con los datos del cliente, la dirección, el tipo de servicio y la franja horaria. Si una solicitud no está en el sistema, no existe.</p>
<h2>2. Estandariza tus tipos de servicio</h2>
<p>Haz la lista de los servicios que prestas y define para cada uno qué información necesitas, qué debe revisar el profesional y qué evidencia se exige al cerrar. Una visita veterinaria, una limpieza y una reparación eléctrica necesitan formularios distintos.</p>
<h2>3. Define cómo asignas</h2>
<p>Escribe las reglas que hoy aplicas de memoria: quién cubre qué zona, quién sabe hacer qué servicio, qué pasa con las urgencias. Con reglas claras, una herramienta puede asignar por cercanía, disponibilidad o prioridad, y la operación solo interviene en los casos especiales.</p>
${tool('Experiencia app sin app', 'Tu cliente sigue el servicio por WhatsApp: quién va, cuándo llega y cómo calificarlo.', '/software-servicios-a-domicilio', 'Ver software para servicios a domicilio', 'whatsapp')}
<h2>4. Informa al cliente en el canal que ya usa</h2>
<p>En un servicio a domicilio, el cliente espera en su casa. Enviarle por WhatsApp el nombre de quien lo atiende, el aviso de que va en camino y el de llegada elimina la mayoría de las llamadas. Al cierre, pídele que califique el servicio: es tu mejor indicador de calidad.</p>
<h2>5. Cierra cada servicio con evidencia</h2>
<p>Fotos antes y después, el formulario diligenciado y la firma del cliente deben quedar asociados al servicio, no en el celular del profesional. Te protege ante reclamos y facilita el cobro, sobre todo si atiendes clientes que pagan a través de una aseguradora o una empresa.</p>
<h2>6. Automatiza tarifas y reportes</h2>
<p>Si el valor cambia por tipo de servicio, distancia u horario, deja que el sistema lo calcule con tus reglas. Y revisa cada semana tres datos: servicios por profesional, tiempo de llegada y calificación de los clientes.</p>
<!--EBOOK:gestion-de-equipos-de-trabajo-en-campo-->
<h2>Particularidades por tipo de servicio a domicilio</h2>
<h3>Hogar y mantenimiento</h3>
<p>Plomería, electricidad, cerrajería, vidriería o aire acondicionado: la clave es el diagnóstico en sitio y las fotos antes y después, porque es común que el alcance cambie cuando el técnico llega.</p>
<h3>Salud a domicilio</h3>
<p>Médicos, enfermería, fisioterapia o toma de muestras: la puntualidad y la comunicación con el paciente pesan tanto como la atención. La herramienta de operación coordina la visita; la información clínica debe seguir en el sistema clínico que corresponda.</p>
<h3>Mascotas</h3>
<p>En las visitas veterinarias a domicilio el dueño quiere saber quién va y cuándo llega. Confirmar la visita y avisar la llegada por WhatsApp cambia la experiencia.</p>
<h2>Errores comunes al digitalizar</h2>
<ul>
<li>Digitalizar todo el primer día. Mejor empezar con un tipo de servicio y un grupo pequeño.</li>
<li>Elegir una herramienta que el profesional en campo no entiende.</li>
<li>Olvidar al cliente: si no lo informas, seguirá llamando.</li>
</ul>
<h2>Conclusión</h2>
<p>Digitalizar una empresa de servicios a domicilio es ordenar cómo entra, se asigna, se atiende y se cobra cada visita. Con los 6 pasos anteriores tendrás una operación que crece sin depender de la memoria de nadie. Si quieres ver cómo se ve en la práctica, conoce nuestro <a href="/software-servicios-a-domicilio">software para empresas de servicios a domicilio</a> o los planes de <a href="/equipos">WIP Equipos</a>.</p>
`,
  },
];
