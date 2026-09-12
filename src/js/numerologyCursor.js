/**
 * Rastreador de Cursor Numerológico NÜMA (Sacred Numbers Trail)
 * Genera una estela etérea de números sagrados (1-9, 11, 22, 33, 432)
 * al mover el cursor por la pantalla, con 60fps fluidos y cero reflows en el DOM.
 */

export function initNumerologyCursor() {
  // Evitar duplicados
  if (document.getElementById('numa-cursor-canvas')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'numa-cursor-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9998';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Lista de números sagrados para la estela
  const SACRED_NUMBERS = ['3', '7', '11', '1', '9', '22', '5', '8', '33', '4', '2', '6', '432'];
  let numberIndex = 0;

  let activeParticles = [];
  let lastPos = { x: -1000, y: -1000 };
  let isRunning = false;
  let rafId = null;
  const MIN_DISTANCE = 32; // Distancia mínima en píxeles antes de spawnear el siguiente número

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function spawnNumber(x, y) {
    const char = SACRED_NUMBERS[numberIndex % SACRED_NUMBERS.length];
    numberIndex++;

    // Detección de tema claro vs oscuro para el contraste óptimo del dorado
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    const goldColor = isLightTheme ? '184, 134, 11' : '255, 215, 0';

    activeParticles.push({
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      char,
      size: Math.floor(Math.random() * 5) + 14, // 14px a 18px
      alpha: 0.95,
      decay: Math.random() * 0.015 + 0.018, // Desvanecimiento suave en ~40-50 frames
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.6 + 0.3), // Flotación ascendente etérea
      scale: 0.85,
      maxScale: 1.08,
      goldColor
    });

    if (!isRunning) {
      isRunning = true;
      render();
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = activeParticles.length - 1; i >= 0; i--) {
      const p = activeParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      if (p.scale < p.maxScale) p.scale += 0.01;

      if (p.alpha <= 0.01) {
        activeParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.font = `600 ${p.size * p.scale}px 'Cinzel', 'Playfair Display', Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(${p.goldColor}, ${Math.max(0, p.alpha)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.goldColor}, ${p.alpha * 0.7})`;
      ctx.fillText(p.char, p.x, p.y);
      ctx.restore();
    }

    if (activeParticles.length > 0) {
      rafId = requestAnimationFrame(render);
    } else {
      isRunning = false;
      ctx.clearRect(0, 0, width, height);
    }
  }

  function handlePointerMove(e) {
    const x = e.clientX;
    const y = e.clientY;

    const dx = x - lastPos.x;
    const dy = y - lastPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist >= MIN_DISTANCE) {
      spawnNumber(x, y);
      lastPos = { x, y };
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  return () => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', handlePointerMove);
    if (rafId) cancelAnimationFrame(rafId);
    canvas.remove();
  };
}
