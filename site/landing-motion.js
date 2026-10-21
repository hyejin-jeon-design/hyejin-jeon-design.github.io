/* Native, progressively enhanced editorial motion. All content remains visible without JS. */
(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const cue=document.querySelector('.scroll-cue');
cue?.addEventListener('click',()=>{
 const target=document.querySelector('.work-head h2');
 const top=target.getBoundingClientRect().top+scrollY-28;
 scrollTo({top:Math.max(0,top),behavior:reduce.matches?'instant':'smooth'});
});
const project=document.querySelector('[data-view="project"]');
renderProject=function(){
 const id=(location.hash||'').split('/')[2]?.split('?')[0]||'tealay';
 const tea=['tealay','project-03'].includes(id),t=translations[language];
 const suffix=id.slice(-2);
 project.querySelector('h1').textContent=tea?'TEALAY':t['project'+suffix]||id;
 project.querySelector('.project-kicker').textContent=tea?'BRANDING / BLENDED TEA':t[suffix==='02'?'digitalPending':'objectPending'];
 project.querySelector('.lead').innerHTML=tea?t.tealayDesc:t.pendingDesc;
 project.querySelector('.note').innerHTML=tea?t.tealayNote:t.pendingNote;
 const cover=project.querySelector('.project-cover');
 cover.innerHTML=tea?'<img class="project-art" src="assets/collection.png?v=20261021visual" alt="TEALAY blended tea packaging">':'<span>PROJECT '+suffix+' / IMAGE</span>';
};
renderProject();
const hero=document.querySelector('.hero-visual');
let scheduled=false;
function updateScroll(){scheduled=false;if(reduce.matches)return;const r=hero.getBoundingClientRect();const progress=Math.max(0,Math.min(1,-r.top/r.height));hero.style.setProperty('--hero-pan',`${progress*65}px`);hero.style.setProperty('--hero-scale',`${1.06-progress*.04}`);hero.style.setProperty('--brand-pan',`${-progress*55}px`);hero.style.setProperty('--brand-opacity',`${1-progress*.35}`);}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
const onScreen=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)continue;const target=e.target;if(!reduce.matches)target.animate([{opacity:0,transform:'translateY(48px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});onScreen.unobserve(target);}},{threshold:.12});
document.querySelectorAll('.editorial-grid,.work-head,.work-composition,.category-links,.contact-section h2').forEach(n=>onScreen.observe(n));
// Start each entrance when its content becomes visible, including below the
// fold on phones, after the responsive headline has been grouped.
const headline=document.querySelector('.display-title');
const signature=document.querySelector('.hero-brand');
const entrances=new Map([[headline,{played:false,animations:[]}],[signature,{played:false,animations:[]}]]);
function playEntrance(target){
 const state=entrances.get(target);
 if(!state||state.played||reduce.matches||document.hidden||target.closest('[hidden]'))return;
 const r=target.getBoundingClientRect();
 if(r.bottom<=0||r.top>=innerHeight||r.width===0||r.height===0)return;
 state.played=true;
 if(target===headline){
  const distance=Math.min(innerWidth*.13,190);
  state.animations=[...target.querySelectorAll('[data-t]')].map((n,i)=>n.animate([
   {opacity:.15,transform:`translate(${(i%2===0?-1:1)*distance}px,12px)`},
   {opacity:1,transform:'translate(0,0)'}
  ],{duration:1350,delay:100+i*85,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));
  target.dataset.motion='gather';
 }else{
  state.animations=[target.animate([{opacity:0,filter:'blur(7px)'},{opacity:1,filter:'blur(0)'}],{duration:1600,delay:150,easing:'ease-out',fill:'backwards'})];
 }
}
function checkEntrances(){entrances.forEach((state,target)=>playEntrance(target));}
function resetEntrances(){
 entrances.forEach(state=>{state.animations.forEach(a=>a.cancel());state.animations=[];state.played=false;});
 requestAnimationFrame(()=>requestAnimationFrame(checkEntrances));
}
let entranceReady=false;
function startEntrances(){
 if(entranceReady)return;
 entranceReady=true;
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)playEntrance(e.target);}),{threshold:.15});
 entrances.forEach((state,target)=>observer.observe(target));
 checkEntrances();updateScroll();
}
function afterLayout(){document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(startEntrances)));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',afterLayout,{once:true});else afterLayout();
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',resetEntrances));
addEventListener('hashchange',()=>{if(!location.hash||location.hash==='#/')resetEntrances();});
addEventListener('pageshow',event=>{if(event.persisted)resetEntrances();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)checkEntrances();});
})();
