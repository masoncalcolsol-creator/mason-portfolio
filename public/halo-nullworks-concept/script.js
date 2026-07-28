const canvas = document.getElementById('scope');
const ctx = canvas.getContext('2d');
let w, h, dpr, phase = 0;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = innerWidth * dpr;
  h = canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function trace(yBase, amp, speed, color, width, offset) {
  ctx.beginPath();
  const logicalW = innerWidth;
  for (let x = 0; x <= logicalW; x += 4) {
    const nx = x / logicalW;
    const carrier = Math.sin((nx * 10 + phase * speed + offset) * Math.PI * 2) * amp;
    const pulse = Math.exp(-Math.pow(((nx + phase * .035 + offset) % 1) - .52, 2) / .0015) * amp * 2.2;
    const noise = Math.sin((nx * 73 + phase * .2) * Math.PI * 2) * 2;
    const y = yBase + carrier * .24 - pulse + noise;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.globalAlpha = .24;
  trace(innerHeight * .27, 24, .036, '#76ffe4', 1.1, 0);
  ctx.globalAlpha = .14;
  trace(innerHeight * .64, 18, -.025, '#b7a7ff', 1, .42);
  ctx.globalAlpha = .1;
  trace(innerHeight * .84, 10, .018, '#c9ff64', .8, .77);
  phase += .012;
  requestAnimationFrame(draw);
}

addEventListener('resize', resize);
resize();
draw();
