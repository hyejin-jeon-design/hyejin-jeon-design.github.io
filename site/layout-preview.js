(()=>{
const headline=document.querySelector('.display-title'),words=[...headline.children];
words.forEach((word,i)=>{word.classList.add('hero-word');word.style.setProperty('--mobile-step',[-30,-10,10,30][i]+'px');});
for(let row=0;row<2;row++){const group=document.createElement('span');group.className='hero-title-row';group.append(words[row*2],words[row*2+1]);headline.append(group);}

const reduce=matchMedia('(prefers-reduced-motion: reduce)'),title=document.querySelector('.scattered-title');
const phrase=document.createElement('span');phrase.className='intro-phrase';[...title.children].slice(1).forEach(e=>phrase.append(e));title.append(phrase);
let played=false;function reveal(){if(reduce.matches||played)return;played=true;const signature=title.firstElementChild;signature.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:850,easing:'cubic-bezier(.16,1,.3,1)'});phrase.querySelectorAll('[data-t]').forEach((line,i)=>line.animate([{opacity:0,transform:`translate(${(i-1)*90}px,22px)`,clipPath:'inset(100% 0 0 0)'},{opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}],{duration:1000,delay:180+i*130,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));title.dataset.entrance='played';}
const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)reveal();},{threshold:.4});observer.observe(title);
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{played=false;if(title.getBoundingClientRect().top<innerHeight&&title.getBoundingClientRect().bottom>0)requestAnimationFrame(reveal);}));
let pressed=null,timer;const interactive='a,button,[role=button]';document.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;pressed?.classList.remove('is-touch-pressed');pressed=e.target.closest(interactive);pressed?.classList.add('is-touch-pressed');},{passive:true});function clear(){clearTimeout(timer);timer=setTimeout(()=>{pressed?.classList.remove('is-touch-pressed');pressed=null;},160);}document.addEventListener('pointerup',clear,{passive:true});document.addEventListener('pointercancel',clear,{passive:true});
})();
