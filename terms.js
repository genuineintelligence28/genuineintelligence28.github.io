// Particle Background
(function(){
  const holder = document.getElementById('particles');
  if(!holder) return;
  const c = document.createElement('canvas');
  holder.appendChild(c);
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  resize(); addEventListener('resize', resize);
  const density = Math.min(180, Math.floor((innerWidth*innerHeight)/13000));
  const dots = Array.from({length:density}).map(()=>({
    x: Math.random()*c.width, y: Math.random()*c.height,
    r: Math.random()*1.8 + 0.5, vx: (Math.random()*0.4 - 0.2), vy: (Math.random()*0.4 - 0.2),
    a: 0.5 + Math.random()*0.5
  }));
  function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const d of dots){
      d.x+=d.vx; d.y+=d.vy;
      if(d.x<0||d.x>c.width) d.vx*=-1;
      if(d.y<0||d.y>c.height) d.vy*=-1;
      const g = ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*3);
      g.addColorStop(0, `rgba(168,85,247,${0.4*d.a})`);
      g.addColorStop(1, `rgba(253,183,26,0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(d.x,d.y,d.r*2,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// Nav Drawer and Overlay
document.addEventListener('DOMContentLoaded', () => {
  const qs = (sel, el=document) => el.querySelector(sel);
  const hamburger = qs('#hamburger');
  const navDrawer = qs('#navDrawer');
  const overlay = qs('#overlay');
  const closeDrawer = qs('#closeDrawer');
  function openDrawer(){
    navDrawer.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
  }
  function closeDrawerFn(){
    navDrawer.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
  }
  if(hamburger) hamburger.addEventListener('click', openDrawer);
  if(closeDrawer) closeDrawer.addEventListener('click', closeDrawerFn);
  if(overlay) overlay.addEventListener('click', closeDrawerFn);
});