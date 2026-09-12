/**
 * Cursor de Simbología Sagrada NÜMA (Sacred Numerology Cursor)
 * Reemplaza el cursor estándar por un símbolo místico de la numerología
 * (Estrella Pitagórica de 8 Puntas / Geometría Sagrada) con halo de luz dorada
 * y micro-reacciones magnéticas al interactuar con elementos clicables.
 */

export function initNumerologyCursor() {
  // Desactivar en pantallas puramente táctiles (móviles/tablets) para preservar experiencia nativa
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Limpiar cualquier canvas o cursor previo
  const oldCanvas = document.getElementById('numa-cursor-canvas');
  if (oldCanvas) oldCanvas.remove();

  const oldCursor = document.getElementById('numa-sacred-cursor');
  if (oldCursor) oldCursor.remove();

  // Crear elemento del cursor sagrado
  const cursorWrap = document.createElement('div');
  cursorWrap.id = 'numa-sacred-cursor';
  cursorWrap.className = 'numa-sacred-cursor';
  cursorWrap.innerHTML = `
    <div class="sacred-cursor-symbol">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Resplandor exterior -->
        <circle cx="16" cy="16" r="14" stroke="rgba(255, 215, 0, 0.2)" stroke-width="1" stroke-dasharray="2 3" />
        <!-- Cuadrado 1 de la estrella de 8 puntas (Merkaba / Geometría 8) -->
        <rect x="7.5" y="7.5" width="17" height="17" stroke="#FFD700" stroke-width="1.2" fill="none" opacity="0.85" />
        <!-- Cuadrado 2 rotado 45° -->
        <rect x="7.5" y="7.5" width="17" height="17" stroke="#FFE57F" stroke-width="1.2" fill="rgba(255, 215, 0, 0.08)" transform="rotate(45 16 16)" />
        <!-- Punto Central de Conciencia (Mónada / Origen) -->
        <circle cx="16" cy="16" r="2.2" fill="#FFD700" />
      </svg>
    </div>
    <div class="sacred-cursor-aura"></div>
  `;

  document.body.appendChild(cursorWrap);
  document.body.classList.add('numa-has-custom-cursor');

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let rotation = 0;
  let isHovering = false;
  let isClicking = false;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onMouseDown() {
    isClicking = true;
    cursorWrap.classList.add('clicking');
  }

  function onMouseUp() {
    isClicking = false;
    cursorWrap.classList.remove('clicking');
  }

  function updateHoverListeners() {
    const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .category-filter-btn, .product-card, .btn-icon');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        isHovering = true;
        cursorWrap.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        isHovering = false;
        cursorWrap.classList.remove('hovering');
      });
    });
  }

  // Animación continua con interpolación suave (lerp)
  function animate() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.22;
    cursorY += dy * 0.22;

    // Rotación sutil proporcional a la velocidad del movimiento
    const speed = Math.sqrt(dx * dx + dy * dy);
    rotation += speed * 0.08;

    cursorWrap.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

    const symbolEl = cursorWrap.querySelector('.sacred-cursor-symbol');
    if (symbolEl) {
      symbolEl.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);

  updateHoverListeners();

  // Observar inserciones dinámicas en el DOM para actualizar los elementos interactivos
  const observer = new MutationObserver(() => {
    updateHoverListeners();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  animate();
}
