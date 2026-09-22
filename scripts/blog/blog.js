(function(){
  /* Buscador del listado: filtra las tarjetas por titulo, resumen y categoria. */
  var input=document.getElementById('buscar');
  if(input){
    var cards=[].slice.call(document.querySelectorAll('[data-search]'));
    var empty=document.getElementById('sin-resultados');
    var norm=function(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();};
    var t=null;
    input.addEventListener('input',function(){
      var q=norm(input.value.trim()), shown=0;
      cards.forEach(function(c){
        var ok=!q||norm(c.getAttribute('data-search')).indexOf(q)>-1;
        c.hidden=!ok; if(ok) shown++;
      });
      if(empty) empty.hidden=shown>0;
      clearTimeout(t);
      if(q.length>2) t=setTimeout(function(){ if(window.gtag) gtag('event','search',{search_term:input.value.trim()}); },1200);
    });
  }

  /* Video de YouTube: se carga solo al pulsar (la pagina no descarga el reproductor). */
  document.addEventListener('click',function(e){
    var b=e.target.closest('.yt__btn');
    if(b){
      e.preventDefault();
      var box=b.parentNode, id=box.getAttribute('data-yt');
      var f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';
      f.title=box.getAttribute('data-title')||'Video';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen=true;
      box.innerHTML=''; box.appendChild(f);
      return;
    }
    var cta=e.target.closest('[data-cta]');
    if(cta && window.gtag){ gtag('event','blog_cta_click',{cta:cta.getAttribute('data-cta'),destino:cta.getAttribute('href'),page_location:location.href}); }
  });

  /* Indice de contenidos: resalta la seccion visible. */
  var links=[].slice.call(document.querySelectorAll('.post-aside .toc a'));
  if(links.length && 'IntersectionObserver' in window){
    var map={};
    links.forEach(function(a){ map[a.getAttribute('href').slice(1)]=a; });
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          links.forEach(function(a){a.classList.remove('is-active');});
          var a=map[en.target.id]; if(a) a.classList.add('is-active');
        }
      });
    },{rootMargin:'0px 0px -70% 0px'});
    Object.keys(map).forEach(function(id){ var h=document.getElementById(id); if(h) io.observe(h); });
  }
})();
