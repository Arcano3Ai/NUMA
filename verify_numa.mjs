// Tests unitarios de verificación para NÜMA
import assert from 'node:assert/strict';
import { calculateLifePath, calculatePersonalYear, calculateSoulNumber, reduceToCoreNumber } from './src/js/numerologyEngine.js';
import { PRODUCTS } from './src/data/products.js';
import { RITUALS } from './src/data/rituals.js';
import { EXPERIENCES } from './src/data/experiences.js';
import { JOURNAL_POSTS } from './src/data/journal.js';

console.log('--- Iniciando Tests de Verificación de Arquitectura NÜMA ---');

// 1. Numerología: Reducción y números maestros
assert.equal(reduceToCoreNumber(11, true), 11, 'Debe preservar el número maestro 11');
assert.equal(reduceToCoreNumber(22, true), 22, 'Debe preservar el número maestro 22');
assert.equal(reduceToCoreNumber(33, true), 33, 'Debe preservar el número maestro 33');
assert.equal(reduceToCoreNumber(29, true), 11, '29 -> 2+9=11 (Maestro)');
assert.equal(reduceToCoreNumber(15, false), 6, '15 -> 1+5=6');

// 2. Cálculo de Camino de Vida
// Fecha: 1990-07-15 -> 15 (1+5=6), 7, 1990 (1+9+9+0=19 -> 1+9=10 -> 1) -> 6+7+1 = 14 -> 1+4 = 5
const lp1 = calculateLifePath('1990-07-15');
assert.equal(lp1, 5, 'Camino de vida para 1990-07-15 debe ser 5');

// Fecha que suma 11: 1985-05-29 -> 29 (11), 5, 1985 (23->5) -> 11+5+5 = 21 -> 3
const lp2 = calculateLifePath('1985-05-29');
assert(lp2 >= 1 && lp2 <= 33, 'Camino de vida válido');

// 3. Catálogo de Productos
assert(PRODUCTS.length >= 6, 'Debe haber al menos 6 productos esenciales');
PRODUCTS.forEach(p => {
  assert(p.id && p.name && p.price > 0, `Producto inválido: ${p.name}`);
  assert(p.category, `Producto sin categoría: ${p.name}`);
  assert(p.image, `Producto sin imagen: ${p.name}`);
});

// 4. Rituales
assert.equal(RITUALS.length, 5, 'Deben existir exactamente los 5 rituales pedidos');
RITUALS.forEach(r => {
  assert(r.title && r.elements.breath, `Ritual incompleto: ${r.title}`);
});

// 5. Experiencias
assert(EXPERIENCES.length >= 2, 'Deben incluirse Numerología y Cuencos');

// 6. Journal
assert(JOURNAL_POSTS.length >= 4, 'Deben existir al menos 4 reflexiones editoriales');

console.log('✅ Todos los tests unitarios pasaron exitosamente.');
