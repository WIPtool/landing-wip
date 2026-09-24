(function(){
  var f=document.getElementById('contactForm');
  if(!f) return;
  var ok=document.getElementById('contactOk');
  var err=document.getElementById('contactError');
  var tel=document.getElementById('c-telefono');
  var iti=null;

  function initTel(){
    if(!tel||iti) return;
    iti=window.intlTelInput(tel,{
      initialCountry:'auto',
      preferredCountries:['co','mx','pe','cl','ec','pa','gt','sv','hn'],
      separateDialCode:true,
      autoPlaceholder:'polite',
      utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js',
      geoIpLookup:function(cb){
        fetch('/api/geo').then(function(r){return r.json();})
          .then(function(d){cb((d&&d.country)?d.country:'co');})
          .catch(function(){cb('co');});
      }
    });
    /* intl-tel-input deja aria-activedescendant apuntando a un item oculto mientras la lista esta cerrada. */
    var flag=tel.closest('.iti')&&tel.closest('.iti').querySelector('.iti__selected-flag');
    if(flag) flag.setAttribute('aria-label','Código de país del teléfono');
    if(flag && 'MutationObserver' in window){
      var strip=function(){ if(flag.getAttribute('aria-expanded')==='false' && flag.hasAttribute('aria-activedescendant')) flag.removeAttribute('aria-activedescendant'); };
      strip();
      new MutationObserver(strip).observe(flag,{attributes:true,attributeFilter:['aria-expanded','aria-activedescendant']});
    }
  }
  /* El selector de pais del telefono se descarga cuando la persona empieza a usar el formulario. */
  (function(){
    var loaded=false;
    function load(){
      if(loaded) return; loaded=true;
      var css=document.createElement('link'); css.rel='stylesheet'; css.href='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css'; document.head.appendChild(css);
      var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js'; s.async=true; s.onload=initTel; document.head.appendChild(s);
    }
    ['focusin','pointerdown','touchstart'].forEach(function(ev){ f.addEventListener(ev,load,{once:true,passive:true}); });
  })();

  /* Calendly: se descarga al pulsar el boton y abre la agenda en una ventana emergente. */
  var cal=document.getElementById('calendlyBtn');
  if(cal){
    cal.addEventListener('click',function(e){
      if(window.gtag) gtag('event','click_calendly',{page_location:location.href});
      if(window.fbq) fbq('trackCustom','ClickCalendly');
      e.preventDefault();
      var url=cal.getAttribute('href');
      if(window.Calendly){ Calendly.initPopupWidget({url:url}); return; }
      var css=document.createElement('link'); css.rel='stylesheet'; css.href='https://assets.calendly.com/assets/external/widget.css'; document.head.appendChild(css);
      var s=document.createElement('script'); s.src='https://assets.calendly.com/assets/external/widget.js'; s.async=true;
      s.onload=function(){ Calendly.initPopupWidget({url:url}); };
      s.onerror=function(){ window.open(url,'_blank','noopener'); };
      document.head.appendChild(s);
    });
  }
  f.addEventListener('submit',function(e){
    e.preventDefault();
    err.hidden=true;
    if(!f.checkValidity()){ f.reportValidity(); return; }
    var btn=f.querySelector('button[type=submit]');
    var data={}; new FormData(f).forEach(function(v,k){data[k]=v;});
    data.event_id='ev-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10); data.page=location.href; data.cookies=(window.wipConsent||{}).estado||'granted';
    if(iti && tel.value.trim()!==''){ data.telefono=iti.getNumber()||data.telefono; }
    try{
      var q=new URLSearchParams(location.search);
      ['utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(k){ if(q.get(k)) data[k]=q.get(k); });
    }catch(x){}
    btn.disabled=true; btn.textContent='Enviando…';
    fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      .then(function(r){
        if(!r.ok) throw new Error('http');
        f.hidden=true; ok.hidden=false;
        ok.scrollIntoView({behavior:'smooth',block:'center'});
        if(window.gtag){
          gtag('event','formulario_contacto',{empresa:data.empresa||'',servicios:data.servicios||'',origen:'contacto'});
          gtag('event','generate_lead',{lead_source:'contacto'});
        }
        if(window.fbq) fbq('track','Lead',{content_name:'formulario_contacto'},{eventID:data.event_id});
      })
      .catch(function(){
        btn.disabled=false; btn.textContent='Quiero que me contacten';
        err.hidden=false;
        err.innerHTML='No pudimos enviar tus datos. Inténtalo de nuevo o escríbenos a <a href="mailto:comercial@wiptool.com">comercial@wiptool.com</a>.';
      });
  });
})();
