// Contenido de WIP Academy, migrado desde la web anterior (WordPress + LearnPress).
// Los slugs (curso y leccion) son los de las URLs originales: se usan para los
// redirects /academy/cursos/<curso>/clases/<leccion> -> /academy#<curso>/<leccion>.
// Correcciones respecto al original: erratas de transcripcion automatica
// ("plataforma TV/Uy/Wii/Wift" -> WIP, "prefible" -> "preferible") y tildes en titulos.

export const courses = [
  {
    slug: 'usuarios',
    img: 'usuarios',
    name: 'Crear y configurar tu cuenta de usuario',
    short: 'Tu cuenta',
    desc: 'Descubre cómo crear y configurar tu cuenta de usuario en nuestra plataforma. Conéctate a empresas, actualiza tus datos y mantén tu perfil al día de manera sencilla y rápida.',
    lessons: [
      {
        slug: 'como-crear-tu', title: 'Cómo crear tu usuario', dur: 1, yt: 'IeCt5zLCcRA',
        text: [
          'En este tutorial, se mostrará cómo crear una cuenta en la web. Si se observa en la parte inferior derecha, se encontrará el botón de registro. Una vez que se presiona, solicitará dos datos importantes: la dirección de correo electrónico y el nombre completo.',
          'Después de diligenciar estos datos y hacer clic en “Siguiente”, la plataforma enviará un código de verificación al correo electrónico proporcionado. Una vez que el código esté en la bandeja de entrada, se deberá validar y luego copiar y pegar en la plataforma.',
          'Una vez ingresado el código, se podrá establecer la contraseña que se utilizará para iniciar sesión en el futuro. ¡Y listo! Una vez completados todos estos pasos, se podrá iniciar sesión en la plataforma web. Así de sencillo es el proceso. ¡Anímese a probarlo!',
        ],
      },
      {
        slug: 'enviar-solicitud-y-conectarse-a-una-empresa-desde-la-web', title: 'Enviar solicitud y conectarse a una empresa desde la web (preferible operadores)', dur: 1, yt: 'ShRE2kSFugg',
        text: [
          'Para conectar un usuario a una empresa, lo primero que se debe hacer es iniciar sesión en la plataforma WIP. Una vez dentro, en la pantalla principal, se busca la empresa y se selecciona la opción de “conectar”. Con esto, se inicia el proceso.',
          'A continuación, es necesario esperar a que la empresa acepte la solicitud de conexión. Una vez que el propietario de la empresa se encuentra dentro de la plataforma, debe verificar que se encuentre en modo empresa. En la pantalla principal, en el campo de solicitudes, aparecerán todos los usuarios que intentan conectarse a la empresa.',
          'En el lado derecho de la pantalla, se tendrá la opción de aceptar o rechazar la solicitud. Además, se podrá establecer el rol que cumplirá este usuario dentro de la empresa. Con estos pasos completados, los usuarios quedan conectados a las empresas de manera exitosa.',
        ],
      },
      {
        slug: 'enviar-solicitud-y-conectarse-a-una-empresa-desde-la-app', title: 'Enviar solicitud y conectarse a una empresa desde la app (preferible colaboradores)', dur: 1, yt: '4DKXKWFLqLA',
        text: [
          'Para conectarse a una empresa desde la aplicación Wip Colaboradores, lo primero que se debe hacer es iniciar sesión en la aplicación. Una vez que se haya iniciado sesión, en la parte superior derecha se encontrará el campo de “Mi Red”.',
          'Dentro de este campo, se buscará la empresa deseada y se seleccionará la opción de “conectar”. A partir de este punto, solo queda esperar a que la empresa propietaria acepte la solicitud de conexión. Este proceso puede llevar un poco de tiempo, por lo que se recomienda tener paciencia.',
          'Una vez que la solicitud sea aceptada, se establecerá la conexión entre el usuario y la empresa, permitiendo así acceder a las funcionalidades y recursos correspondientes. ¡Así de sencillo es conectar tu perfil a una empresa en Wip Colaboradores!',
        ],
      },
      {
        slug: 'editar-tu-usuario-desde-la-web', title: 'Editar tu usuario desde la web', dur: 1, yt: 'le91gJCSVvE',
        text: [
          'Para actualizar tus datos en la plataforma de Wip, localiza en la parte superior derecha donde se encuentra tu nombre. Al hacer clic en él, se desplegará la opción de “Perfil del Usuario”.',
          'Una vez que accedas al perfil del usuario, se abrirá un pequeño formulario donde podrás completar todos tus datos personales. Si posees algún vehículo, también tendrás la posibilidad de ingresar la información correspondiente sobre el mismo.',
          'Finalmente, basta con hacer clic en “Guardar” y todos tus datos en la plataforma quedarán actualizados. ¡Así de sencillo es mantener tu perfil al día en Wip!',
        ],
      },
      {
        slug: 'como-editar-tu-usuario-desde-la-app', title: 'Editar tu usuario desde la app', dur: 1, yt: 'mk1Y1vQEF1k',
        text: [
          'Para editar tu usuario desde la aplicación web Colaboradores, el primer paso es acceder al icono de tu perfil. Una vez dentro, encontrarás un ícono de un lápiz al lado de tu nombre.',
          'Al hacer clic en este lápiz, se abrirá la opción para modificar y actualizar tus datos personales, así como la información de tu vehículo si aplica. Es importante asegurarse de ingresar la información correcta y actualizada.',
          'Una vez que hayas completado los cambios, simplemente guarda los ajustes y tu perfil quedará actualizado en la plataforma. ¡Así de sencillo es mantener tu información al día en Wip Colaboradores!',
        ],
      },
    ],
  },
  {
    slug: 'empresas-colaboradores',
    img: 'empresas-colaboradores',
    name: 'Soy una empresa propietaria con colaboradores',
    short: 'Empresa con colaboradores',
    desc: 'Crea tu empresa, organiza tus unidades de negocio, conecta clientes y colaboradores en campo, crea servicios y haz seguimiento en la central de monitoreo.',
    lessons: [
      {
        slug: 'como-crear-una-empresa', title: 'Cómo crear una empresa', dur: 2, yt: 'MIrgOVrmmoQ',
        text: [
          'En este tutorial, se mostrará cómo registrarse en la web y crear una empresa. Para empezar, ve a la pantalla principal y haz clic en “Regístrate”. Ingresa el correo de la empresa y el nombre de la persona que está creando la cuenta. Luego, haz clic en “Siguiente”.',
          'Recibirás un código de seis dígitos en el correo electrónico que acabas de registrar. Si no encuentras el correo en tu bandeja principal, verifica en la carpeta de spam. Después de obtener el código, haz clic en “Siguiente” y se te solicitará que elijas una contraseña fácil de recordar. Haz clic en “Finalizar” y habrás completado el registro.',
          'Serás redirigido a la pantalla de inicio, donde podrás ingresar con el correo y la clave que acabas de crear. En la parte superior, verás que aún no tienes una empresa creada. Haz clic en “Crear uno” y se abrirá un recuadro donde podrás ingresar los datos de la empresa.',
          'Completa todos los campos con la información de la empresa y haz clic en “Guardar”. También puedes cargar una imagen, como el logo de la empresa. Al hacer clic en “Guardar”, la empresa quedará creada correctamente. ¡Así de fácil es el proceso!',
        ],
      },
      {
        slug: 'creacion-y-edicion-de-unidades-de-negocio', title: 'Crea y edita unidades de negocio', dur: 1, yt: '43g2PF4lguk',
        text: [
          'En este tutorial, se aprenderá a crear y editar unidades de negocio. Una vez que hayas creado la empresa, dirígete a la configuración de la unidad de negocio. Al hacerlo, serás llevado a una pantalla donde encontrarás la opción de “Crear Unidad”. Haz clic en esta opción e ingresa el nombre de la unidad.',
          'Las unidades de negocio te permiten organizar tu empresa según tus preferencias, ya sea por sedes, ciudades u otros criterios. Coloca el nombre de la unidad y haz clic en “Guardar”. Una vez guardado, aparecerá en la lista, y podrás editarla haciendo clic en “Editar”.',
          'Al editar la unidad, tendrás la posibilidad de agregar formularios, usuarios y empresas, ya sea como clientes o proveedores. Este proceso te brinda flexibilidad para ajustar y organizar tu empresa de acuerdo con tus necesidades específicas. ¡Así de fácil es crear y editar unidades de negocio!',
        ],
      },
      {
        slug: 'agregar-formularios-a-tu-empresa', title: 'Agrega formularios a tu empresa', dur: 2, yt: 'iEv3AhuQ18c',
        text: [
          'En este tutorial, se explicará cómo agregar formularios a tu empresa en Wip. Para comenzar, dirígete a la sección de configuración y selecciona “Mis Formularios”. Aquí encontrarás la opción de “Agregar Formulario”, donde podrás visualizar todos los formularios existentes en Wip, identificándolos por sus nombres y líneas de servicio, ya sea vehicular, hogar, empresa u otros.',
          'Cuando encuentres el formulario que se ajuste a tu tipo de servicio, haz clic en “Agregar”. Posteriormente, se te permitirá personalizar el nombre del formulario según la operación de tu empresa. Después de seleccionar el nombre, haz clic en “Aceptar”.',
          'Una vez que hayas agregado el formulario, podrás visualizar sus campos en la sección de “Mis Formularios” en vista previa. Esto te permitirá entender cuáles son los campos necesarios para crear tu servicio. Si no encuentras algún campo que necesitas, simplemente haz clic en “Crear Campos Personalizados”.',
          'En la sección de Campos Personalizados, podrás crear un nuevo campo, definiendo si es de texto, lista o foto. Selecciona el tipo, coloca el nombre del campo y haz clic en “Guardar”. Después de guardarlo, agrégalo al formulario y haz clic en “Guardar”.',
          'Con este proceso, los campos necesarios quedarán agregados a tu empresa, permitiéndote crear servicios de manera más personalizada y adaptada a tus necesidades. ¡Así de fácil es personalizar los formularios en Wip!',
        ],
      },
      {
        slug: 'envia-solicitud-y-conectate-con-empresa-cliente', title: 'Envía solicitud y conéctate con una empresa cliente', dur: 1, yt: '3wV4k5D73Os',
        text: [
          'En este tutorial, se explicará cómo conectar clientes desde la plataforma WIP. Tendrás dos opciones: conectar a clientes online, aquellos que ya tienen acceso a la plataforma Wip, o crear una empresa offline.',
          'Para conectar a un cliente online, busca el nombre de tu cliente que ya debería tener su empresa creada en Wip. Cuando lo encuentres, haz clic en “Conectar” a ese usuario y empresa. Se enviará un correo electrónico al cliente indicándole que has enviado una solicitud de conexión. Una vez que la empresa acepte la solicitud, verás la confirmación en la parte superior de la plataforma.',
          'Para crear una empresa offline, dirígete al módulo de “Empresas Offline” y crea el nombre de la empresa. Simplemente, ingresa los datos necesarios, como el país, y haz clic en “Guardar”. Este proceso es ideal cuando la empresa no tendrá acceso a la plataforma Wip.',
          'Después de que la empresa offline esté creada o la solicitud online sea aceptada, ve a la sección de “Configuración de Unidad de Negocio”. En “Unidad de Negocio”, haz clic en “Editar”, luego selecciona “Empresas de la Unidad” y añade la empresa. En este paso, puedes definir el rol de la empresa, ya sea cliente o proveedor, y asignar una prioridad. Haz clic en “Agregar a la Unidad” y con eso, podrás crear servicios con el cliente ya conectado. ¡Así de fácil es conectar y gestionar clientes en la plataforma!',
        ],
      },
      {
        slug: 'conectar-operadores-y-colaboradores', title: 'Envía solicitud y conéctate con operadores y colaboradores', dur: 2, yt: 'AjeJeEIu82c',
        text: [
          'En este tutorial, se detallará cómo conectar operadores y colaboradores en la plataforma. Para comenzar, dirígete a la opción “Mi Red” y busca el nombre del operador que deseas conectar. Asegúrate de que el operador ya haya creado su propio usuario con correo y clave, como se enseñó anteriormente.',
          'Una vez confirmado que el usuario está creado, búscalo en la lista y verifica que su perfil indique “Operador” o “Colaborador”. Haz clic en “Conectar”, y así enviarás la solicitud. Una vez que el usuario acepte tu solicitud, recibirás una notificación informándote sobre la aceptación.',
          'Al recibir la notificación, ve a “Configuración Unidad de Negocio”. Selecciona la unidad de negocio en la que deseas agregar el operador, haz clic en “Editar” y, en la sección de usuarios, selecciona al operador recién conectado. Haz clic en “Agregar a la Unidad” y con esto, el operador o colaborador tendrá acceso a tus servicios.',
          'Este proceso facilita la integración de operadores y colaboradores a tus unidades de negocio, permitiéndoles acceder y participar en tus servicios de manera eficiente. ¡Así de sencillo es conectar y gestionar tu red de colaboradores!',
        ],
      },
      {
        slug: 'como-editar-tu-empresa-desde-la-web', title: 'Edita tu empresa desde la web', dur: 1, yt: 'S5wfSqFAXoo',
        text: [
          'En este tutorial, se explicará cómo editar tu empresa desde la web. Para comenzar, ingresa al enlace de la plataforma utilizando tu usuario y contraseña. Una vez dentro y en modo empresa, haz clic en “Mi Red” y luego selecciona el icono que indica “Mi Empresa”. Aquí verás la empresa que tienes creada, simplemente haz clic en “Administrar”.',
          'En la sección de administración, tendrás la posibilidad de realizar varios cambios, como la dirección, subir un nuevo logo, cambiar el teléfono o modificar el correo. Todos estos ajustes se pueden hacer, excepto cambiar el nombre de la empresa. Una vez que hayas actualizado la información que necesitas, haz clic en el botón de “Actualizar” para aplicar los cambios.',
          'Este proceso te permite mantener tu información empresarial actualizada y personalizada según tus necesidades. ¡Editar tu empresa desde la web es fácil y rápido!',
        ],
      },
      {
        slug: 'crear-servicio-y-enviar-a-colaborador-en-campo', title: 'Crear un servicio y enviarlo a un colaborador en campo', dur: 1, yt: 'Nf3hrE_pu3c',
        text: [
          'En este tutorial, se detallará cómo crear un servicio y asignarlo a un colaborador en campo. Para empezar, dirígete a la sección de “Servicios”. Aquí, selecciona el tipo de servicio previamente agregado. Una vez hecho esto, se desplegará un formulario que deberás completar con la información necesaria. En este ejemplo, se diligenciará con datos de prueba.',
          'Selecciona el cliente al que va dirigido el servicio y el colaborador que realizará la tarea. Es importante destacar que previamente debes haber conectado con los colaboradores para que aparezcan en la lista. También ingresa la dirección, fecha y hora programada. Una vez que todos los datos estén completos, haz clic en “Crear”.',
          'Con este simple paso, se creará automáticamente el servicio y el formulario desaparecerá. El colaborador asignado debería recibir la notificación del servicio en su aplicación móvil casi de inmediato.',
          'Este proceso facilita la asignación de tareas a colaboradores en campo, optimizando la gestión de servicios y garantizando una comunicación eficiente entre la plataforma y la aplicación móvil del colaborador. ¡Así de sencillo es crear y asignar servicios en la plataforma!',
        ],
      },
      {
        slug: 'central-de-monitoreo', title: 'Seguimiento a tus servicios (central de monitoreo)', dur: 2, yt: 'DJ_sFF0c3ts',
        text: [
          'En este tutorial, se mostrará cómo visualizar la central de monitoreo para supervisar la operación y sus servicios diarios. Para comenzar, dirígete a la sección de “Operaciones” y haz clic en “Central de Monitoreo”. Aquí, encontrarás un resumen del día que incluye el total de servicios, aquellos pendientes, por iniciar, por finalizar, cancelados o que haya fallido. Al final del día, se presentará el cumplimiento, idealmente manteniéndose al 100%.',
          'En la parte superior, tendrás la opción de cambiar la fecha, permitiéndote revisar días anteriores o posteriores. Simplemente, selecciona la fecha deseada en el calendario. En la parte inferior, se mostrarán todos los servicios del día con información detallada sobre su estado y el responsable de cada uno.',
          'Puedes observar quién está encargado de cambiar el estado de un servicio específico, como el colaborador en este caso. Al hacer clic en cualquier servicio, podrás visualizar el formulario, conocer quién lo creó, cuándo lo creó y otros detalles relevantes. La trazabilidad completa, multimedia, chats de operación y usuario, así como la ubicación en el mapa, estarán disponibles para cada servicio individual.',
          'Este enfoque detallado te brinda un control total sobre la operación, permitiéndote supervisar y gestionar cada servicio de manera eficiente. ¡Así de fácil es utilizar la central de monitoreo para optimizar tu operación diaria!',
        ],
      },
    ],
  },
  {
    slug: 'soy-una-empresa-propietaria-con-proveedores',
    img: 'proveedores',
    name: 'Soy una empresa propietaria con proveedores',
    short: 'Empresa con proveedores',
    desc: 'Para empresas que asignan servicios a una red de proveedores: crea tu empresa, conecta clientes, proveedores y operadores, envía servicios y haz seguimiento en la central de monitoreo.',
    lessons: [
      {
        slug: 'como-crear-tu-empresa', title: 'Cómo crear tu empresa', dur: 0, yt: 'MIrgOVrmmoQ',
        text: [
          'En este tutorial, se explicará el proceso para registrarse en la web y crear una empresa. Para comenzar, accede a la pantalla principal y haz clic en la opción “Registrarse”. Ingresa el correo de la empresa y el nombre del titular de la cuenta, luego haz clic en “Siguiente”. Recibirás un código de verificación de seis dígitos en el correo registrado, en caso de no recibirlo, verifica la bandeja de spam. Después, haz clic en “Siguiente” y crea una contraseña fácil de recordar.',
          'Luego de clic en “Finalizar”, quedas registrado y serás dirigido a la pantalla de inicio. Ingresa con el correo y la clave recién creada. En la parte superior, si aún no tienes una empresa creada, haz clic en “Crear uno”. Aparecerá un recuadro donde podrás ingresar los datos de la empresa. Después de completar la información, haz clic en “Guardar”. También tienes la opción de cargar una imagen, como el logo de la empresa, simplemente haz clic en “Guardar” y así la empresa quedará creada de manera exitosa.',
          'Este proceso facilita la creación y registro de empresas en la plataforma web, permitiéndote comenzar a utilizar todas las funcionalidades de manera rápida y sencilla. ¡Anímate a probarlo y crear tu empresa en pocos pasos!',
        ],
      },
      {
        slug: 'crea-y-edita-unidades-de-negocio', title: 'Crea y edita unidades de negocio', dur: 0, yt: '43g2PF4lguk',
        text: [
          'En este tutorial, se explicará el proceso para crear y editar unidades de negocio una vez que la empresa ha sido creada. Después de haber configurado la empresa, dirígete a la sección de “Configuración” y selecciona “Unidad de Negocio”. Esto te llevará a una pantalla específica donde podrás gestionar las unidades de negocio asociadas a tu empresa.',
          'Para crear una unidad, simplemente haz clic en “Crear Unidad” y asigna un nombre representativo. Las unidades de negocio permiten organizar tu empresa según tu preferencia, ya sea por sedes, ciudades u otras categorías. Una vez que hayas ingresado el nombre, guarda la configuración.',
          'Una vez guardado, la unidad creada aparecerá en la pantalla. Puedes realizar ediciones adicionales haciendo clic en “Editar”. Dentro de las opciones de edición, podrás agregar formularios, usuarios y empresas, ya sea como clientes o proveedores. Esta flexibilidad te brinda la capacidad de estructurar y organizar tu empresa de manera personalizada según tus necesidades específicas. ¡Explora estas opciones para optimizar la gestión de tu empresa de manera eficiente!',
        ],
      },
      {
        slug: 'agrega-formularios-a-tu-empresa', title: 'Agrega formularios a tu empresa', dur: 0, yt: 'iEv3AhuQ18c',
        text: [
          'En este tutorial, se explicará el proceso de agregar formularios a tu empresa en la plataforma. Para comenzar, dirígete a la sección de “Configuración” y selecciona la opción de “Mis Formularios”. Aquí encontrarás una lista de todos los formularios previamente creados en WIP.',
          'Dentro de esta sección, podrás visualizar los nombres de los formularios y la línea de servicio asociada, ya sea vehicular, hogar, empresa u otras categorías. Selecciona el formulario que se adapte a tu tipo de servicio y haz clic en “Agregar”.',
          'Una vez agregado, tendrás la oportunidad de personalizar el formulario cambiándole el nombre para que se adapte mejor a la operación de tu empresa. Después de seleccionar el nombre adecuado, haz clic en “Aceptar”. El formulario personalizado se añadirá a la lista en la sección de “Mis Formularios”.',
          'Para visualizar los campos de este formulario y determinar cuáles son necesarios para crear un servicio, haz clic en “Vista Previa”. En caso de que no encuentres uno de los campos requeridos, puedes crear campos personalizados. Haz clic en “Crear Campos Personalizados”, selecciona el tipo de campo (texto, lista, foto), asigna un nombre y haz clic en “Guardar”.',
          'Una vez guardados los campos personalizados, agrégales a tu empresa y guarda los ajustes. Con estos pasos, habrás agregado los formularios necesarios y personalizado los campos para crear servicios de manera eficiente en tu empresa. ¡Explora estas opciones para adaptar la plataforma a tus necesidades operativas!',
        ],
      },
      {
        slug: 'envia-solicitud-y-conectate-con-una-empresa-cliente', title: 'Envía solicitud y conéctate con una empresa cliente', dur: 0, yt: '3wV4k5D73Os',
        text: [
          'En este tutorial, se detallará el proceso de conexión de clientes desde la plataforma WIP, brindando dos opciones: una para clientes online, aquellos que tienen acceso a la plataforma WIP, y otra para empresas offline.',
          'Para conectar un cliente online, busca el nombre del cliente que ya debe tener su empresa creada en la plataforma WIP. Una vez ubicado, haz clic en “Conectar” a ese usuario y a esa empresa. Se enviará una solicitud de amistad, y una vez aceptada por la empresa, se reflejará en la parte superior que la conexión ha sido establecida.',
          'Si el cliente es una empresa offline, dirígete al módulo de “Empresas Offline” y crea el nombre de la empresa. Completa los datos disponibles, como el país, si lo deseas. Luego, haz clic en “Guardar”. Esta opción es útil cuando la empresa no tendrá acceso a la plataforma.',
          'Posteriormente, accede a la sección de “Configuración”, selecciona “Unidad de Negocio” y haz clic en “Editar”. Dirígete a “Empresas de la Unidad” y añade la empresa, ya sea offline o aceptada la solicitud online. Selecciona el rol (cliente o proveedor), ajusta la prioridad si es necesario, y finalmente, haz clic en “Agregar a la Unidad”. Con estos pasos, habrás creado la empresa y podrás comenzar a ofrecer servicios a tu cliente, ya sea online u offline. ¡Explora estas opciones para gestionar efectivamente las conexiones con tus clientes desde la plataforma!',
        ],
      },
      {
        slug: 'envia-solicitud-y-conectate-con-una-empresa-proveedor', title: 'Envía solicitud y conéctate con una empresa proveedor', dur: 1, yt: 'VdRFeWU6KLY',
        text: [
          'En este tutorial, se describirá el proceso para conectar un proveedor a tu empresa de manera sencilla y eficiente.',
          'Primero, el proveedor debe enviar una solicitud de conexión. Para ello, inicia sesión en la plataforma y busca la empresa a la que desea conectarse. Una vez ubicada, hace clic en “Conectar”, enviando así la solicitud al propietario de la empresa.',
          'A continuación, la empresa propietaria revisa y acepta la solicitud de conexión. Posteriormente, agrega al proveedor a la unidad de negocio correspondiente, asignándole el rol de proveedor.',
          'Con estos simples pasos, el proveedor queda conectado exitosamente a la empresa. Este proceso facilita la colaboración entre empresas y proveedores, permitiendo una gestión eficiente de las conexiones en la plataforma. ¡Explora y optimiza la integración de proveedores en tu empresa de forma práctica!',
        ],
      },
      {
        slug: 'conectar-operadores-y-colaboradores-2', title: 'Envía solicitud y conéctate con operadores y colaboradores', dur: 2, yt: '8ncsssDfBSo',
        text: [
          'En este tutorial, se detalla el proceso para conectar operadores y colaboradores a tu empresa de forma fácil y eficiente.',
          'Primeramente, accede a la opción “Mi Red” y busca el nombre del operador o colaborador que deseas conectar. Asegúrate de que el usuario ya esté creado, utilizando su correo y clave, como se explicó anteriormente. Una vez confirmado, procede a buscar y asegurarte de que el usuario esté etiquetado como “Solo Usuario” y haz clic en “Conectar”.',
          'Tras enviar la solicitud, el usuario recibirá una notificación informándole que su solicitud ha sido aceptada. Recibirás una notificación similar para mantenerte al tanto de la aceptación. Dirígete a la configuración de la unidad de negocio, selecciona la unidad correspondiente y haz clic en “Editar”. En la sección de “Usuarios”, agrega al operador o colaborador seleccionado a la unidad.',
          'Con estos pasos, el operador o colaborador quedará conectado a tu empresa, permitiéndole acceder a los servicios. Este proceso garantiza una integración fluida de operadores y colaboradores en tu plataforma. ¡Optimiza la gestión de tu equipo de trabajo de manera práctica y eficaz!',
        ],
      },
      {
        slug: 'como-editar-tu-empresa-desde-la-web-2', title: 'Edita tu empresa desde la web', dur: 1, yt: '-hjYNJM45f4',
        text: [
          'En este tutorial, se proporciona una guía paso a paso para editar la información de tu empresa de manera sencilla y rápida a través de la plataforma web.',
          'Primero, ingresa al enlace de la plataforma utilizando tus credenciales de usuario y contraseña. Una vez dentro, asegúrate de estar en el modo empresa y haz clic en la pestaña “Mi Red”. Ubica el icono que dice “Mi Empresa” y selecciona la empresa que deseas editar.',
          'Al hacer clic en “Administrar”, se abrirá una interfaz que te permitirá realizar diversas modificaciones. Entre las opciones disponibles, puedes cambiar la dirección, subir un nuevo logo, modificar el número de teléfono o actualizar la dirección de correo electrónico. Es importante destacar que la opción de cambiar el nombre de la empresa no está habilitada.',
          'Después de realizar los cambios deseados, simplemente haz clic en el botón de “Actualizar”. Esto aplicará las modificaciones realizadas y tu empresa estará actualizada con la información más reciente. Este proceso te brinda la flexibilidad de ajustar los detalles de tu empresa de manera fácil y eficiente. ¡Optimiza la presentación de tu empresa en la plataforma con estos simples pasos!',
        ],
      },
      {
        slug: 'crear-un-servicio-y-envialo-a-un-proveedor', title: 'Crear un servicio y envíalo a un proveedor', dur: 1, yt: 'szDSP4JrdjI',
        text: [
          'En este tutorial, se detalla el proceso para enviar un servicio a un proveedor de manera eficiente y sin complicaciones.',
          'Primero, selecciona el servicio que deseas crear. Posteriormente, completa todos los datos requeridos en el formulario correspondiente. Es importante asegurarse de proporcionar toda la información necesaria para el servicio que estás creando.',
          'En el formulario, encontrarás un campo específico etiquetado como “Proveedor”. Al hacer clic en este campo, se desplegará una lista con todos los proveedores que tienes registrados en tu plataforma. Simplemente, selecciona el proveedor al cual deseas asignar el servicio.',
          'Una vez que hayas seleccionado al proveedor, procede a crear el servicio. Llena todos los datos necesarios y revisa que toda la información esté correctamente ingresada. Con estos pasos completados, habrás enviado exitosamente el servicio al proveedor designado.',
          'Este proceso simplificado te permite asignar servicios a proveedores de manera rápida y precisa, optimizando la gestión de tus operaciones. ¡Envía servicios de forma eficiente y mantén tus procesos operativos en marcha sin contratiempos!',
        ],
      },
      {
        slug: 'central-de-monitoreo-2', title: 'Seguimiento a tus servicios (central de monitoreo)', dur: 0, yt: 'DJ_sFF0c3ts',
        text: [
          'En este tutorial, te guiaremos a través del proceso para acceder y utilizar la central de monitoreo, una herramienta esencial para visualizar y gestionar tus operaciones y servicios diarios.',
          'Para empezar, dirígete a la sección de “Operaciones” y haz clic en “Central de Monitoreo”. Aquí encontrarás un resumen detallado de tu actividad del día, incluyendo el total de servicios, aquellos pendientes de afinar, iniciar, finalizar, cancelados o fallidos. Al final del día, también podrás verificar el cumplimiento de los servicios, buscando siempre alcanzar el 100%.',
          'En la parte superior de la pantalla, tendrás la opción de cambiar la fecha. Si necesitas revisar servicios de días anteriores o posteriores, simplemente selecciona la fecha deseada en el calendario.',
          'En la sección inferior, podrás visualizar todos los servicios, identificando su estado actual y quién es el responsable de cada uno. Esto te permitirá identificar fácilmente qué servicios requieren atención o acción.',
          'Para obtener detalles específicos de un servicio, como quién lo creó, cuándo y los datos asociados, solo tienes que hacer clic en el servicio en cuestión. Desde esta vista, tendrás acceso a la trazabilidad completa, multimedia, y chats tanto de la operación como del usuario asociado al servicio.',
          'Este enfoque detallado e individual por cada servicio te proporciona un control total sobre tus operaciones, permitiéndote tomar decisiones informadas y gestionar eficazmente tu flujo de trabajo. ¡Optimiza tu proceso de monitoreo con esta herramienta integral!',
        ],
      },
    ],
  },
  {
    slug: 'empresa-cliente',
    img: 'empresa-cliente',
    name: 'Soy una empresa cliente',
    short: 'Empresa cliente',
    desc: 'Conéctate con tu empresa propietaria, suma a tus operadores, crea servicios para ella y haz seguimiento en la central de monitoreo.',
    lessons: [
      { slug: 'como-crear-tu-empresa-2', title: 'Cómo crear tu empresa', dur: 0, yt: '5q4yrBwvQek', text: [] },
      { slug: 'envia-solicitud-y-conectate-con-tu-empresa-propietaria', title: 'Envía solicitud y conéctate con tu empresa propietaria', dur: 0, yt: '82n0ar9Gi0s', text: [] },
      { slug: 'envia-solicitud-y-conectate-con-operadores-tus-empleados', title: 'Envía solicitud y conéctate con operadores (tus empleados)', dur: 0, yt: 'tkNx6CI9US4', text: [] },
      { slug: 'agrega-usuarios-a-la-unidad-de-negocio', title: 'Agrega usuarios a la unidad de negocio', dur: 0, yt: 'FzO4W59w-DA', text: [] },
      { slug: 'edita-tu-empresa-desde-la-web', title: 'Edita tu empresa desde la web', dur: 0, yt: 'xPuw5FbQ1Mk', text: [] },
      { slug: 'crear-un-servicio-y-envialo-a-un-propietaro', title: 'Crear un servicio y envíalo a un propietario', dur: 0, yt: 'U33k2yPzaGI', text: [] },
      { slug: 'seguimiento-a-tus-servicios-central-de-monitoreo', title: 'Seguimiento a tus servicios (central de monitoreo)', dur: 0, yt: 'DJ_sFF0c3ts', text: [] },
    ],
  },
  {
    slug: 'proveedor',
    img: 'proveedor',
    name: 'Soy un proveedor',
    short: 'Proveedor',
    desc: 'Conéctate con tu empresa propietaria, suma a tus operadores y colaboradores, y acepta y gestiona los servicios que te envían.',
    lessons: [
      { slug: 'como-crear-tu-empresa-3', title: 'Cómo crear tu empresa', dur: 0, yt: 't2vHHNltVQ0', text: [] },
      { slug: 'envia-solicitud-y-conectate-con-tu-empresa-propietaria-2', title: 'Envía solicitud y conéctate con tu empresa propietaria', dur: 0, yt: '82n0ar9Gi0s', text: [] },
      { slug: 'envia-solicitud-y-conectate-con-operadores-y-colaboradores', title: 'Envía solicitud y conéctate con operadores y colaboradores', dur: 0, yt: 'Z1IuJv-ICdw', text: [] },
      { slug: 'agrega-usuarios-a-la-unidad-de-negocio-2', title: 'Agrega usuarios a la unidad de negocio', dur: 0, yt: '_BJG46y79wE', text: [] },
      { slug: 'edita-tu-empresa-desde-la-web-2', title: 'Edita tu empresa desde la web', dur: 0, yt: 'W_TzNYWUXf4', text: [] },
      { slug: 'acepta-y-gestiona-un-servicio', title: 'Acepta y gestiona un servicio', dur: 0, yt: 'hZPJ3aW42Vs', text: [] },
      { slug: 'seguimiento-a-tus-servicios-central-de-monitoreo-2', title: 'Seguimiento a tus servicios (central de monitoreo)', dur: 0, yt: 'UxoxsKUNguc', text: [] },
    ],
  },
  {
    slug: 'colaborador',
    img: 'colaborador',
    name: 'Soy un colaborador',
    short: 'Colaborador',
    desc: 'Aprende a usar la app: crea tu usuario, vincúlate a una empresa, gestiona servicios, consulta tu historial y ajusta tu celular para el mejor rendimiento.',
    lessons: [
      { slug: 'como-crear-tu-usuario-colaborador', title: 'Cómo crear tu usuario colaborador', dur: 0, yt: 'Vbj5CDc_uJM', text: [] },
      { slug: 'vincularse-a-una-empresa', title: 'Vincularse a una empresa', dur: 0, yt: '44G9-u5TbfI', text: [] },
      { slug: 'editar-tu-usuario', title: 'Editar tu usuario', dur: 0, yt: 'wPY75f4FvwI', text: [] },
      { slug: 'gestionar-un-servicio', title: 'Gestionar un servicio', dur: 0, yt: 'ZzEk1jGp_Qk', text: [] },
      { slug: 'historial-de-servicios', title: 'Historial de servicios', dur: 0, yt: '9Oz7IgpipME', text: [] },
      { slug: 'ajustes-a-tu-celular-para-mejor-rendimiento-de-la-app', title: 'Ajustes a tu celular para mejor rendimiento de la app', dur: 0, yt: '8E0BQ8qsC1k', text: [] },
    ],
  },
];
