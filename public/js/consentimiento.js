/* Aviso de cookies de wiptool.com.
   El estado por defecto lo fija el script del <head> (antes de cargar Google y Meta):
   en Europa todo queda rechazado hasta que la persona acepte; en el resto de paises se mide
   desde el inicio y la persona puede rechazar. Este archivo muestra el aviso, guarda la
   eleccion en localStorage ("wip_consent") y avisa a Google (Consent Mode), al pixel de Meta
   y a quien escuche el evento "wip:consent" (por ejemplo Clarity).
   Cualquier elemento con data-cookies vuelve a abrir el aviso. */
(function () {
  var CLAVE = 'wip_consent';
  var c = window.wipConsent || (window.wipConsent = { estado: 'granted', eu: false, elegido: false });

  function aplicar(estado) {
    c.estado = estado;
    c.elegido = true;
    try { localStorage.setItem(CLAVE, JSON.stringify({ estado: estado, fecha: new Date().toISOString(), v: 1 })); } catch (e) {}
    if (window.gtag) gtag('consent', 'update', { ad_storage: estado, analytics_storage: estado, ad_user_data: estado, ad_personalization: estado });
    if (window.fbq) fbq('consent', estado === 'granted' ? 'grant' : 'revoke');
    try { window.dispatchEvent(new CustomEvent('wip:consent', { detail: estado })); } catch (e) {}
  }

  var caja = null;
  function estilos() {
    if (document.getElementById('wip-cookies-css')) return;
    var s = document.createElement('style');
    s.id = 'wip-cookies-css';
    s.textContent =
      '.wip-cookies{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:2147483000;max-width:440px;' +
      'background:#161d31;color:#eef1f8;border:1px solid rgba(219,255,87,.25);border-radius:16px;padding:18px 18px 16px;' +
      'box-shadow:0 12px 40px rgba(0,3,20,.35);font:14px/1.5 Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '.wip-cookies p{margin:0 0 14px}.wip-cookies a{color:#dbff57;text-decoration:underline;text-underline-offset:2px}' +
      '.wip-cookies strong{display:block;font-size:15px;margin-bottom:4px;color:#fff}' +
      '.wip-cookies__acc{display:flex;gap:10px;flex-wrap:wrap}' +
      '.wip-cookies button{font:inherit;font-weight:700;border-radius:999px;padding:9px 18px;cursor:pointer;border:1px solid #dbff57}' +
      '.wip-cookies__si{background:#dbff57;color:#161d31}.wip-cookies__no{background:transparent;color:#eef1f8;border-color:rgba(238,241,248,.45)!important}' +
      '.wip-cookies button:focus-visible{outline:2px solid #dbff57;outline-offset:2px}' +
      '@media (max-width:520px){.wip-cookies{left:12px;right:12px;max-width:none}}';
    document.head.appendChild(s);
  }

  function cerrar() { if (caja) { caja.remove(); caja = null; } }

  function abrir() {
    if (caja) return;
    estilos();
    caja = document.createElement('div');
    caja.className = 'wip-cookies';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-label', 'Preferencias de cookies');
    caja.innerHTML =
      '<p><strong>Cookies en wiptool.com</strong>Usamos cookies de Google y Meta para medir las visitas y mejorar nuestros anuncios. ' +
      'Más detalles en la <a href="/politica-privacidad#finalidades">política de privacidad</a>.</p>' +
      '<div class="wip-cookies__acc"><button type="button" class="wip-cookies__si">Aceptar</button>' +
      '<button type="button" class="wip-cookies__no">Rechazar</button></div>';
    caja.querySelector('.wip-cookies__si').addEventListener('click', function () { aplicar('granted'); cerrar(); });
    caja.querySelector('.wip-cookies__no').addEventListener('click', function () { aplicar('denied'); cerrar(); });
    document.body.appendChild(caja);
  }

  window.wipCookies = { abrir: abrir };
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-cookies]');
    if (t) { e.preventDefault(); abrir(); }
  });

  // El aviso aparece despues de cargar la pagina, para no retrasar lo que la persona vino a ver.
  if (!c.elegido) {
    var mostrar = function () { setTimeout(abrir, 800); };
    if (document.readyState === 'complete') mostrar(); else window.addEventListener('load', mostrar, { once: true });
  }
})();
