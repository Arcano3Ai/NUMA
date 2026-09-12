/**
 * Cursor NÜMA: Hardware Nativo (Bolita Dorada de Cero Lag y Máxima Precisión)
 * 
 * Se elimina todo renderizado por DOM o requestAnimationFrame para garantizar
 * respuesta instantánea a nivel hardware del sistema operativo (0ms de latencia),
 * sin desfases ("sin lag") y con máxima visibilidad sobre cualquier fondo.
 */

export function initNumerologyCursor() {
  // Eliminar cualquier elemento residual de cursores anteriores
  const oldCanvas = document.getElementById('numa-cursor-canvas');
  if (oldCanvas) oldCanvas.remove();

  const oldCursor = document.getElementById('numa-sacred-cursor');
  if (oldCursor) oldCursor.remove();

  // Asegurar que el body no tenga clases que oculten el cursor
  document.body.classList.remove('numa-has-custom-cursor');
}
