const qs = (s, el = document) => el.querySelector(s);

(function () {
  const holder = document.getElementById('particles');
  if (!holder) return;

  const c = document.createElement('canvas');
  holder.appendChild(c);
  const ctx = c.getContext('2d');

  function resize() {
    c.width = innerWidth;
    c.height = innerHeight;
  }

  resize();
  addEventListener('resize', resize);

  const density = Math.min(180, Math.floor((innerWidth * innerHeight) / 13000));
  const dots = Array.from({ length: density }).map(() => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 1.8 + 0.5,
    vx: Math.random() * 0.4 - 0.2,
    vy: Math.random() * 0.4 - 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx;
      d.y += d.vy;

      // Bounce from edges
      if (d.x < 0 || d.x > c.width) d.vx *= -1;
      if (d.y < 0 || d.y > c.height) d.vy *= -1;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();

      // Connect nearby dots
      for (let j = i + 1; j < dots.length; j++) {
        const d2 = dots[j];
        const dx = d.x - d2.x;
        const dy = d.y - d2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();