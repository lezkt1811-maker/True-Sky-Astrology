/*!
 * True Sky Astrology — gold star field
 * A sparse, fixed canvas behind the page: faint gold points that twinkle
 * slowly, with a rare four-point glint. Quiet by design so it never competes
 * with the chart. Respects prefers-reduced-motion and pauses in hidden tabs.
 */
(function () {
  "use strict";

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const canvas = document.createElement("canvas");
  canvas.id = "sc13SparkleCanvas";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;z-index:-2;pointer-events:none;";
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext("2d");

  const TONES = ["#D4AF37", "#F7E7A1", "#E9D8A6", "#C9A227", "#FFF6D6", "#F5F7FA"];

  let stars = [];
  let W = 0, H = 0, dpr = 1;
  const rand = (a, b) => a + Math.random() * (b - a);

  function buildStars() {
    const count = Math.round((W * H) / 11000);
    stars = [];
    for (let i = 0; i < count; i++) {
      const glint = Math.random() < 0.025;
      stars.push({
        x: rand(0, W), y: rand(0, H),
        r: glint ? rand(1.1, 1.7) : rand(0.35, 1.05),
        base: rand(0.18, 0.7),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.25, 0.9),
        color: TONES[(Math.random() * TONES.length) | 0],
        glint, gPhase: rand(0, Math.PI * 2), gSpeed: rand(0.08, 0.2)
      });
    }
  }

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
    if (reduce) paint(0);
  }

  function glint(s, a) {
    const len = s.r * 6 * a;
    ctx.save();
    ctx.globalAlpha = a * 0.9;
    ctx.strokeStyle = s.color; ctx.lineWidth = 0.6;
    ctx.shadowColor = "#F7E7A1"; ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.moveTo(s.x - len, s.y); ctx.lineTo(s.x + len, s.y);
    ctx.moveTo(s.x, s.y - len); ctx.lineTo(s.x, s.y + len);
    ctx.stroke();
    ctx.restore();
  }

  function paint(dt) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.phase += dt * s.speed;
      const tw = (Math.sin(s.phase) + 1) / 2;
      ctx.globalAlpha = s.base * (0.4 + tw * 0.6);
      ctx.fillStyle = s.color;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      if (s.glint) {
        s.gPhase += dt * s.gSpeed;
        const g = Math.pow((Math.sin(s.gPhase) + 1) / 2, 8);
        if (g > 0.3) glint(s, g);
      }
    }
    ctx.globalAlpha = 1;
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (!document.hidden) paint(dt);
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  if (!reduce) requestAnimationFrame(frame);
})();
