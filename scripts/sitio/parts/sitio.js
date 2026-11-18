  /* Enlaces viejos a la home (#corporativo, #proveedores) llevan a su landing */
  if(document.body.getAttribute('data-page')==='home'&&/^#(corporativo|proveedores)$/.test(location.hash)) location.replace('/'+location.hash.slice(1));

  /* Barra de lanzamiento: se puede cerrar, y el menú baja mientras se ve */
  var bar=document.getElementById('bar');
  if(bar){
    try{if(sessionStorage.getItem('wipBar')==='0') bar.hidden=true;}catch(e){}
    document.body.classList.toggle('has-bar',!bar.hidden);
    var placeNav=function(){var h=bar.hidden?0:bar.offsetHeight;nav.style.top=Math.max(14,h+10-scrollY)+'px';};
    addEventListener('scroll',placeNav,{passive:true});addEventListener('resize',placeNav);placeNav();
    bar.querySelector('button').addEventListener('click',function(){
      bar.hidden=true;document.body.classList.remove('has-bar');placeNav();
      try{sessionStorage.setItem('wipBar','0');}catch(e){}
    });
  }

  /* Tarjeta viva: el servicio avanza etapa por etapa y el reloj corre */
  [].forEach.call(document.querySelectorAll('.live'),function(card){
    var li=[].slice.call(card.querySelectorAll('.live__steps li'));
    var clock=card.querySelector('.live__t b'), st=card.querySelector('.live__t span');
    var T=li.map(function(l){return +l.getAttribute('data-t');});
    var hms=function(s){s=Math.round(s);return [Math.floor(s/3600),Math.floor(s%3600/60),s%60].map(function(n){return (n<10?'0':'')+n;}).join(':');};
    var show=function(i){li.forEach(function(l,k){l.classList.toggle('on',k<i);l.classList.toggle('now',k===i);});};
    var done=function(){show(li.length);clock.textContent=hms(T[T.length-1]);st.textContent='Resuelto';card.classList.add('is-done');};
    if(reduce){done();return;}
    var run=function(){
      var i=0, t0=0;
      card.classList.remove('is-done');st.textContent='En curso';show(0);clock.textContent=hms(0);
      var step=function(){
        var from=t0, to=T[i], start=performance.now();
        var tick=function(now){var p=Math.min(1,(now-start)/750);clock.textContent=hms(from+(to-from)*p);if(p<1)requestAnimationFrame(tick);};
        requestAnimationFrame(tick);
        setTimeout(function(){t0=to;i++;if(i<li.length){show(i);step();}else{done();setTimeout(run,4500);}},1000);
      };
      setTimeout(step,500);
    };
    whenVisible(card,run,{threshold:.3});
  });

  /* Antes de irte: el informe gratis, una sola vez por visitante */
  var xm=document.getElementById('xm');
  if(xm){
    var visto=false, armado=false, antes=null;
    try{visto=!!localStorage.getItem('wipInforme');}catch(e){}
    var abrir=function(){
      if(visto||!xm.hidden) return;
      visto=true;try{localStorage.setItem('wipInforme',String(Date.now()));}catch(e){}
      antes=document.activeElement;xm.hidden=false;void xm.offsetWidth;xm.classList.add('is-open');
      xm.querySelector('#x-nombre').focus({preventScroll:true});
      if(window.gtag) gtag('event','popup_informe_visto');
    };
    var cerrar=function(){
      xm.classList.remove('is-open');setTimeout(function(){xm.hidden=true;},300);
      if(antes&&antes.focus) antes.focus({preventScroll:true});
    };
    xm.addEventListener('click',function(e){if(e.target===xm||e.target.closest('.xm__x')) cerrar();});
    document.addEventListener('keydown',function(e){
      if(xm.hidden) return;
      if(e.key==='Escape') cerrar();
      if(e.key==='Tab'){
        var f=[].filter.call(xm.querySelectorAll('button,input,a'),function(x){return x.offsetParent!==null;});
        if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f[f.length-1].focus();}
        else if(!e.shiftKey&&document.activeElement===f[f.length-1]){e.preventDefault();f[0].focus();}
      }
    });
    setTimeout(function(){armado=true;},8000);
    /* En computador: cuando el mouse sale por arriba, hacia las pestañas o la barra de direcciones */
    document.addEventListener('mouseout',function(e){if(armado&&!e.relatedTarget&&e.clientY<=0) abrir();});
    /* En celular no hay mouse: se ofrece después de leer más de la mitad de la página */
    if(matchMedia('(hover:none)').matches){
      var alLeer=function(){
        if(!armado||scrollY+innerHeight<document.documentElement.scrollHeight*.6) return;
        removeEventListener('scroll',alLeer);setTimeout(abrir,1200);
      };
      addEventListener('scroll',alLeer,{passive:true});
    }
    var xf=document.getElementById('xmForm'), xerr=xm.querySelector('.xm__err');
    xf.addEventListener('submit',function(e){
      e.preventDefault();
      if(!xf.checkValidity()){xerr.hidden=false;xf.reportValidity();return;}
      xerr.hidden=true;
      var d={};new FormData(xf).forEach(function(v,k){d[k]=v;});
      var data={nombre:d.nombre,email:d.email,empresa:d.empresa,telefono:'',servicios:'',
        necesidad:'[Informe Asistencias en Colombia 2026] Perfil: '+(d.xperfil||'')+(d.cargo?' · Cargo: '+d.cargo:''),
        'bot-field':d['bot-field']||'',page:location.href,origen:(window.wipOrigen&&wipOrigen())||'',
        event_id:'ev-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10)};
      try{var q=new URLSearchParams(location.search);['utm_source','utm_medium','utm_campaign','utm_content'].forEach(function(k){if(q.get(k))data[k]=q.get(k);});}catch(x){}
      var btn=xf.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Enviando…';
      fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
        .then(function(r){
          if(!r.ok) throw new Error('net');
          xf.hidden=true;xm.querySelector('.xm__note').hidden=true;xm.querySelector('.xm__ok').hidden=false;
          if(window.gtag) gtag('event','formulario_informe',{perfil:d.xperfil||''});
          if(window.fbq) fbq('track','Lead',{content_name:'informe_asistencias'},{eventID:data.event_id});
        })
        .catch(function(){btn.disabled=false;btn.textContent='Quiero el informe';xerr.hidden=false;});
    });
  }

  /* Cifras de la home: cuentan desde cero cuando aparecen */
  var stats=document.querySelector(".stats");
  if(stats&&!reduce){
    var nums=[].slice.call(stats.querySelectorAll("[data-count]"));
    nums.forEach(function(n){n.textContent="0";});
    whenVisible(stats,function(){
      nums.forEach(function(n){
        var fin=+n.getAttribute("data-count"), t0=performance.now();
        var paso=function(t){var p=Math.min(1,(t-t0)/1200),e=1-Math.pow(1-p,3);n.textContent=(n.getAttribute("data-pre")||"")+Math.round(fin*e);if(p<1)requestAnimationFrame(paso);};
        requestAnimationFrame(paso);
      });
    },{threshold:.4});
  }

  /* Recorrido de la plataforma: cada pestaña muestra su captura */
  var tour=document.getElementById("tour");
  if(tour){
    var tt=[].slice.call(tour.querySelectorAll("[role=tab]")), tp=[].slice.call(tour.querySelectorAll("[role=tabpanel]"));
    var tourShow=function(k,focus){
      tt.forEach(function(b,i){var on=i===k;b.classList.toggle("is-on",on);b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;});
      tp.forEach(function(p,i){var on=i===k;p.hidden=!on;p.classList.toggle("is-on",on);});
      if(focus) tt[k].focus();
    };
    tt.forEach(function(b,i){
      b.addEventListener("click",function(){tourShow(i);});
      b.addEventListener("keydown",function(e){
        if(e.key==="ArrowDown"||e.key==="ArrowRight"){e.preventDefault();tourShow((i+1)%tt.length,true);}
        if(e.key==="ArrowUp"||e.key==="ArrowLeft"){e.preventDefault();tourShow((i+tt.length-1)%tt.length,true);}
      });
    });
  }

  /* Ventana de Wipi: escribe la orden y la ejecuta paso a paso, en bucle */
  var wwin=document.getElementById("wwin");
  if(wwin){
    var typed=wwin.querySelector(".wwin__typed"), full=typed.getAttribute("data-text"), steps=[].slice.call(wwin.querySelectorAll(".wwin__steps li"));
    var paint=function(i){steps.forEach(function(li,k){li.classList.toggle("ok",k<i);li.classList.toggle("now",k===i);});};
    if(reduce){paint(steps.length);}
    else{
      var cycle=function(){
        typed.textContent="";paint(-1);var n=0;
        var tipo=setInterval(function(){n++;typed.textContent=full.slice(0,n);if(n>=full.length){clearInterval(tipo);
          var i=0;paint(0);
          var paso=setInterval(function(){i++;paint(i);if(i>=steps.length){clearInterval(paso);setTimeout(cycle,4200);}},950);
        }},38);
      };
      whenVisible(wwin,cycle,{threshold:.3});
    }
  }

  /* Recorrido animado: cada pestaña tiene su escena; avanza sola mientras la pestaña está a la vista */
  var scenes=[].slice.call(document.querySelectorAll(".asg"));
  if(scenes.length){
    var asgSet=function(el,k){
      el.setAttribute("data-s",String(k));
      [].forEach.call(el.querySelectorAll("[data-s]"),function(x){x.classList.toggle("is-on",x.getAttribute("data-s")===String(k));});
      el._k=k;
    };
    scenes.forEach(function(el){asgSet(el,reduce?1:0);});
    if(!reduce){
      var asgInt=null;
      var asgTick=function(){
        scenes.forEach(function(el){
          var open=!el.closest("[hidden]");
          if(!open){el._was=false;return;}
          if(!el._was){el._was=true;asgSet(el,0);return;}
          asgSet(el,(el._k+1)%4);
        });
      };
      whenVisible(scenes[0].closest(".tour")||scenes[0],function(){asgTick();asgInt=setInterval(asgTick,3600);},{threshold:.2});
      if(tour) tour.addEventListener("click",function(e){if(e.target.closest("[role=tab]")) scenes.forEach(function(el){if(!el.closest("[hidden]")){el._was=true;asgSet(el,0);}});if(asgInt){clearInterval(asgInt);asgInt=setInterval(asgTick,3600);}});
    }
  }


  /* Carriles de tarjetas (Datos duros, Novedades, Verticales): flechas que avanzan una tarjeta */
  [].forEach.call(document.querySelectorAll("[data-rail]"),function(rail){
    var track=rail.querySelector(".ap-rail__track"), btns=rail.querySelectorAll(".ap-arrow");
    if(!track) return;
    var upd=function(){
      var max=track.scrollWidth-track.clientWidth-2;
      [].forEach.call(btns,function(b){b.disabled=+b.getAttribute("data-dir")<0?track.scrollLeft<=2:track.scrollLeft>=max;});
      rail.classList.toggle("is-static",max<=0);
    };
    [].forEach.call(btns,function(b){
      b.addEventListener("click",function(){
        var li=track.querySelector("li"), step=li?li.getBoundingClientRect().width+20:track.clientWidth*.8;
        track.scrollBy({left:step*+b.getAttribute("data-dir"),behavior:reduce?"auto":"smooth"});
      });
    });
    track.addEventListener("scroll",upd,{passive:true});
    window.addEventListener("resize",upd);
    upd();
  });

  /* Tarjetas de Datos duros: el botón + muestra el detalle */
  [].forEach.call(document.querySelectorAll(".ap-plus"),function(b){
    b.addEventListener("click",function(){
      var card=b.closest(".ap-fact"), open=!card.classList.contains("is-open");
      card.classList.toggle("is-open",open);
      b.setAttribute("aria-expanded",open);
    });
  });

  /* Cifras estilo SpaceX: cuentan hasta su valor al aparecer */
  var sxNums=document.querySelector(".sx-nums");
  if(sxNums&&!reduce){
    var sxEls=[].slice.call(sxNums.querySelectorAll("[data-sx-count]"));
    sxEls.forEach(function(n){n.textContent=(n.getAttribute("data-pre")||"")+"0";});
    whenVisible(sxNums,function(){
      sxEls.forEach(function(n){
        var fin=+n.getAttribute("data-sx-count"), t0=performance.now();
        var paso=function(t){var p=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-p,3);n.textContent=(n.getAttribute("data-pre")||"")+Math.round(fin*e);if(p<1)requestAnimationFrame(paso);};
        requestAnimationFrame(paso);
      });
    },{threshold:.4});
  }

  /* Wipi flotante: cambia de accesorio y resalta la tarea que corresponde */
  var wv=document.getElementById("wv"), wvChips=document.querySelectorAll("#wv-chips span");
  if(wv){
    var wvK=0, wvSet=function(k){wv.setAttribute("data-v",String(k));[].forEach.call(wvChips,function(c){c.classList.toggle("is-on",c.getAttribute("data-v")===String(k));});};
    wvSet(0);
    if(!reduce) whenVisible(wv,function(){setInterval(function(){wvK=(wvK+1)%5;wvSet(wvK);},2400);},{threshold:.3});
  }
