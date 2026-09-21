(function(){
  var tabs=[].slice.call(document.querySelectorAll('.cards [role=tab]'));
  var panels=[].slice.call(document.querySelectorAll('.course'));
  var state={course:null,lesson:null};

  function panelOf(course){ return document.getElementById(course); }
  function lessonOf(course,lesson){ return document.getElementById(course+'/'+lesson); }

  /* Al cambiar de leccion, el video que estuviera sonando vuelve a su portada. */
  function resetPlayer(article){
    var p=article.querySelector('.player');
    if(p && p.dataset.html){ p.innerHTML=p.dataset.html; delete p.dataset.html; }
  }

  function select(course,lesson,opts){
    opts=opts||{};
    var panel=panelOf(course);
    if(!panel) return false;
    var articles=[].slice.call(panel.querySelectorAll('.lesson'));
    var target=(lesson&&lessonOf(course,lesson))||articles[0];
    if(!target) return false;
    var lessonSlug=target.getAttribute('data-lesson');

    panels.forEach(function(p){ p.classList.toggle('is-active',p===panel); });
    /* Solo hay una leccion activa en toda la pagina; cualquier otro video vuelve a su portada. */
    [].forEach.call(document.querySelectorAll('.lesson'),function(a){
      var on=a===target;
      a.classList.toggle('is-active',on);
      if(!on) resetPlayer(a);
    });
    [].forEach.call(panel.querySelectorAll('.playlist a'),function(a){
      if(a.getAttribute('data-lesson')===lessonSlug){ a.setAttribute('aria-current','true'); }
      else { a.removeAttribute('aria-current'); }
    });
    tabs.forEach(function(t){
      var on=t.getAttribute('data-course')===course;
      t.setAttribute('aria-selected',on?'true':'false');
      t.setAttribute('tabindex',on?'0':'-1');
    });
    state.course=course; state.lesson=lessonSlug;
    if(opts.hash!==false && window.history && history.replaceState){
      history.replaceState(null,'','#'+course+'/'+lessonSlug);
    }
    if(opts.scroll==='course'){
      panel.scrollIntoView({behavior:'smooth',block:'start'});
    } else if(opts.scroll==='stage'){
      var st=panel.querySelector('.stage');
      var r=st.getBoundingClientRect();
      if(r.top<0||r.top>window.innerHeight*0.55){ st.scrollIntoView({behavior:'smooth',block:'start'}); }
    }
    return true;
  }

  function fromHash(){
    var h=decodeURIComponent((location.hash||'').replace(/^#/,''));
    var parts=h.split('/');
    if(parts[0] && select(parts[0],parts[1]||null,{hash:false})) return;
    /* Un ancla que no es de curso (p. ej. #cursos) no cambia la seleccion actual. */
    if(state.course===null && tabs.length){ select(tabs[0].getAttribute('data-course'),null,{hash:false}); }
  }

  document.addEventListener('click',function(e){
    var play=e.target.closest('.player__btn');
    if(play){
      e.preventDefault();
      var box=play.parentNode, id=box.getAttribute('data-yt');
      box.dataset.html=box.innerHTML;
      var f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';
      f.title=box.getAttribute('data-title')||'Video de WIP Academy';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen=true;
      f.referrerPolicy='strict-origin-when-cross-origin';
      box.innerHTML=''; box.appendChild(f);
      if(window.gtag){ gtag('event','academy_video_play',{curso:state.course,leccion:state.lesson,video_id:id}); }
      return;
    }
    var tab=e.target.closest('.cards [role=tab]');
    if(tab){
      e.preventDefault();
      select(tab.getAttribute('data-course'),null,{scroll:'course'});
      return;
    }
    var link=e.target.closest('a[data-course][data-lesson]');
    if(link){
      e.preventDefault();
      select(link.getAttribute('data-course'),link.getAttribute('data-lesson'),{scroll:'stage'});
    }
  });

  /* Navegacion con flechas entre las tarjetas de curso */
  document.querySelector('.cards').addEventListener('keydown',function(e){
    var i=tabs.indexOf(document.activeElement);
    if(i<0) return;
    var n=null;
    if(e.key==='ArrowRight'||e.key==='ArrowDown') n=(i+1)%tabs.length;
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp') n=(i-1+tabs.length)%tabs.length;
    else if(e.key==='Home') n=0;
    else if(e.key==='End') n=tabs.length-1;
    if(n===null) return;
    e.preventDefault();
    tabs[n].focus();
    select(tabs[n].getAttribute('data-course'),null);
  });

  window.addEventListener('hashchange',fromHash);
  fromHash();
})();
