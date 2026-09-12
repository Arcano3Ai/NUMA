import { processBotQuery } from './src/js/numaBotEngine.js';

console.log('--- INICIANDO VERIFICACIÓN DEL MOTOR DEL BOT NÜMA ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ [PASS]: ${message}`);
    passed++;
  } else {
    console.error(`❌ [FAIL]: ${message}`);
    failed++;
  }
}

// 1. Prueba de fecha de nacimiento (Camino de Vida 3: 15/03/1992 -> 1+5=6, 3=3, 1+9+9+2=21->3 -> 6+3+3=12 -> 3)
const resDate = processBotQuery('Nací el 15/03/1992');
assert(resDate.text.includes('Camino de Vida 3'), 'Debe calcular Camino de Vida 3 correctamente');
assert(resDate.products.length > 0, 'Debe adjuntar al menos un producto afín al arquetipo 3');
assert(resDate.quickReplies.length > 0, 'Debe proveer sugerencias rápidas contextuales');

// 2. Prueba de fecha con texto ("23 de noviembre de 1985")
const resDateText = processBotQuery('Nací el 23 de noviembre de 1985');
// 2+3=5, 11=11 (maestro) o 2, 1+9+8+5=23 -> 5 -> 5+11+5 = 21 -> 3
assert(resDateText.text.includes('Tu Frecuencia Sagrada'), 'Debe reconocer fechas en lenguaje natural');

// 3. Prueba de número maestro 11
const resMaster11 = processBotQuery('Háblame del número maestro 11');
assert(resMaster11.text.includes('Número 11') || resMaster11.text.includes('Canal Luminoso'), 'Debe explicar el arquetipo maestro 11');
assert(resMaster11.products.length > 0, 'Debe incluir productos para el arquetipo maestro 11');

// 4. Prueba de concepto: Camino de Vida
const resConceptCV = processBotQuery('¿Qué es el camino de vida?');
assert(resConceptCV.text.includes('Camino de Vida') && resConceptCV.text.includes('fecha de nacimiento'), 'Debe explicar el concepto de Camino de Vida');

// 5. Prueba de producto por intención: "velas para dormir y calmarme"
const resCalm = processBotQuery('busco velas para relajarme y dormir mejor');
assert(resCalm.products.some(p => p.id === 'vela-calma-intensa'), 'Debe recomendar la Vela Calma Intensa');

// 6. Prueba de producto por ingrediente: "lavanda"
const resLavanda = processBotQuery('¿tienen algo con lavanda?');
assert(resLavanda.products.length > 0, 'Debe encontrar productos con lavanda en aroma o notas');

// 7. Prueba de kits de regalo
const resGifts = processBotQuery('quiero un kit de regalo');
assert(resGifts.products.some(p => p.category === 'kits' || p.badge.includes('Regalo')), 'Debe sugerir kits y regalos');

// 8. Prueba de saludo inicial
const resHello = processBotQuery('Hola');
assert(resHello.text.includes('Oráculo de NÜMA'), 'Debe saludar amablemente como el Oráculo de NÜMA');

console.log(`\nResumen: ${passed} pruebas superadas, ${failed} fallos.`);
if (failed > 0) process.exit(1);
