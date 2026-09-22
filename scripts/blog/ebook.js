(function(){
  var f=document.getElementById('ebook-form');
  if(!f) return;
  var ok=document.getElementById('ebook-ok');
  var err=document.getElementById('ebook-error');
  var tel=document.getElementById('e-telefono');
  var dl=document.getElementById('ebook-download');
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
  }
  /* intl-tel-input se descarga cuando el formulario esta cerca de la pantalla. */
  (function(){
    var loaded=false;
    function load(){
      if(loaded) return; loaded=true;
      var css=document.createElement('link'); css.rel='stylesheet'; css.href='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css'; document.head.appendChild(css);
      var s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js'; s.async=true; s.onload=initTel; document.head.appendChild(s);
    }
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ load(); io.disconnect(); } }); },{rootMargin:'400px 0px'});
      io.observe(f);
    } else { load(); }
    ['pointerdown','keydown','touchstart'].forEach(function(ev){ f.addEventListener(ev,load,{once:true,passive:true}); });
  })();

  function showError(html){ err.hidden=false; err.innerHTML=html; }

  f.addEventListener('submit',function(e){
    e.preventDefault();
    err.hidden=true;
    if(!f.checkValidity()){ f.reportValidity(); return; }
    var btn=f.querySelector('button[type=submit]');
    var data={}; new FormData(f).forEach(function(v,k){data[k]=v;});
    data.acepto=f.acepto.checked;
    if(iti && tel.value.trim()!==''){ data.telefono=iti.getNumber()||data.telefono; }
    try{
      var q=new URLSearchParams(location.search);
      ['utm_source','utm_medium','utm_content','utm_campaign'].forEach(function(k){ if(q.get(k)) data[k]=q.get(k); });
    }catch(x){}
    btn.disabled=true; btn.textContent='Enviando…';
    fetch('/api/ebook',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
      .then(function(r){ return r.json().then(function(j){ return {ok:r.ok,j:j}; }); })
      .then(function(res){
        if(!res.ok||!res.j.url) throw new Error('http');
        dl.href=res.j.url;
        f.hidden=true; ok.hidden=false;
        ok.scrollIntoView({behavior:'smooth',block:'center'});
        if(window.gtag){
          gtag('event','ebook_descarga',{ebook:data.ebook});
          gtag('event','generate_lead',{lead_source:'ebook',ebook:data.ebook});
        }
      })
      .catch(function(){
        btn.disabled=false; btn.textContent='Descargar ebook';
        showError('No pudimos procesar tu solicitud. Inténtalo de nuevo o escríbenos a <a href="mailto:comercial@wiptool.com">comercial@wiptool.com</a>.');
      });
  });
})();
