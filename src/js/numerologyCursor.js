/**
 * Cursor Orbe Sagrado NÜMA (Golden Glowing Orb Cursor)
 * Diseñado a petición: un orbe compacto, amarillo brillante que parpadea/pulsa
 * con máxima visibilidad sobre fondos claros u oscuros, siguiendo el puntero con
 * precisión inmediata ("notorio y normal").
 */

export function initNumerologyCursor() {
  // Desactivar en pantallas táctiles (móviles/tablets) para preservar interacción nativa
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Limpiar cualquier cursor previo
  const oldCanvas = document.getElementById('numa-cursor-canvas');
  if (oldCanvas) oldCanvas.remove();

  const oldCursor = document.getElementById('numa-sacred-cursor');
  if (oldCursor) oldCursor.remove();

  // Crear elemento del cursor de orbe
  const cursorWrap = document.createElement('div');
  cursorWrap.id = 'numa-sacred-cursor';
  cursorWrap.className = 'numa-sacred-cursor';
  cursorWrap.innerHTML = `
    <div class="numa-orb-halo"></div>
    <div class="numa-orb-core"></div>
  `;

  document.body.appendChild(cursorWrap);
  document.body.classList.add('numa-has-custom-cursor');

  let mouseX = -100;
  let mouseY = -100;
  let posX = -100;
  let posY = -100;
  let haloX = -100;
  let haloY = -100;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onMouseDown() {
    cursorWrap.classList.add('clicking');
  }

  function onMouseUp() {
    cursorWrap.classList.remove('clicking');
  }

  function updateHoverListeners() {
    const interactives = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"], .category-filter-btn, .product-card, .btn-icon, .med-track-card'
    );
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursorWrap.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorWrap.classList.remove('hovering'));
    });
  }

  // Animación continua con alta reactividad (cero pérdida, puntero fiel y notorio)
  function render() {
    // El núcleo del orbe sigue al cursor directamente (sin retraso) para máxima precisión ("normal")
    posX = mouseX;
    posY = mouseY;

    // El halo luminoso tiene un seguimiento suave que crea un aura etérea
    haloX += (mouseX - haloX) * 0.45;
    haloY += (mouseY - haloY) * 0.45;

    cursorWrap.style.setProperty('--cursor-x', `${posX}px`);
    cursorWrap.style.setProperty('--cursor-y', `${posY}px`);
    cursorWrap.style.setProperty('--halo-x', `${haloX}px`);
    cursorWrap.style.setProperty('--halo-y', `${haloY}px`);

    requestAnimationFrame(render);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);

  updateHoverListeners();

  // Observar inserciones dinámicas en el DOM
  const observer = new MutationObserver(() => updateHoverListeners());
  observer.observe(document.body, { childList: true, subtree: true });

  render();
}
