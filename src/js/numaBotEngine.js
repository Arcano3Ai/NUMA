import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { LIFE_PATH_ARCHETYPES, NUMEROLOGY_CONCEPTS } from '../data/numerology.js';
import {
  calculateLifePath,
  calculatePersonalYear,
  calculateSoulNumber,
  calculateExpressionNumber,
  reduceToCoreNumber
} from './numerologyEngine.js';

/**
 * Normaliza cadenas de texto para búsqueda insensible a acentos y puntuación
 */
function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Mapeo de meses en español a números de dos dígitos
 */
const MONTH_MAP = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  setiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12'
};

/**
 * Intenta extraer una fecha YYYY-MM-DD del texto
 */
function extractBirthDate(text) {
  const norm = normalizeText(text);

  // Formato: DD/MM/YYYY o DD-MM-YYYY
  const slashMatch = norm.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/);
  if (slashMatch) {
    const day = slashMatch[1].padStart(2, '0');
    const month = slashMatch[2].padStart(2, '0');
    const year = slashMatch[3];
    return `${year}-${month}-${day}`;
  }

  // Formato: YYYY-MM-DD
  const isoMatch = norm.match(/\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/);
  if (isoMatch) {
    const year = isoMatch[1];
    const month = isoMatch[2].padStart(2, '0');
    const day = isoMatch[3].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Formato textual: "15 de marzo de 1990" o "15 marzo 1990"
  const textMatch = norm.match(/\b(\d{1,2})\s+(?:de\s+)?([a-z]+)\s+(?:de\s+)?(\d{4})\b/);
  if (textMatch) {
    const day = textMatch[1].padStart(2, '0');
    const monthName = textMatch[2];
    const year = textMatch[3];
    if (MONTH_MAP[monthName]) {
      return `${year}-${MONTH_MAP[monthName]}-${day}`;
    }
  }

  return null;
}

/**
 * Encuentra productos recomendados por nombre o similitud
 */
function findProductByTerm(queryTerm) {
  const normQuery = normalizeText(queryTerm);
  return PRODUCTS.find(p => {
    const normName = normalizeText(p.name);
    return normName.includes(normQuery) || normQuery.includes(normName);
  });
}

/**
 * Búsqueda de productos en catálogo
 */
function searchProducts(query) {
  const norm = normalizeText(query);
  const words = norm.split(/\s+/).filter(w => w.length > 2);

  const scored = PRODUCTS.map(prod => {
    let score = 0;
    const nameNorm = normalizeText(prod.name);
    const catNorm = normalizeText(prod.categoryLabel + ' ' + prod.category);
    const descNorm = normalizeText(prod.description + ' ' + prod.tagline + ' ' + prod.experience);
    const aromaNorm = normalizeText(
      Object.values(prod.aroma || {}).join(' ')
    );

    // Coincidencia exacta de nombre o categoría
    if (nameNorm.includes(norm)) score += 50;
    if (catNorm.includes(norm)) score += 35;
    if (aromaNorm.includes(norm)) score += 30;
    if (descNorm.includes(norm)) score += 20;

    // Coincidencia por palabras individuales
    words.forEach(word => {
      if (nameNorm.includes(word)) score += 15;
      if (catNorm.includes(word)) score += 10;
      if (aromaNorm.includes(word)) score += 12;
      if (descNorm.includes(word)) score += 6;
    });

    return { prod, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.prod);
}

/**
 * Núcleo del Bot: Procesa la entrada del usuario y devuelve respuesta estructurada
 * @param {string} input Mensaje del usuario
 * @returns {{ text: string, products: Array, quickReplies: Array }}
 */
export function processBotQuery(input) {
  if (!input || !input.trim()) {
    return {
      text: 'Estoy aquí para acompañar tu viaje hacia la calma y el autoconocimiento. ¿Deseas consultar tu Carta Numerológica o descubrir una herramienta sagrada de nuestro catálogo?',
      products: [],
      quickReplies: [
        'Calcular mi Camino de Vida',
        'Velas para calmar la mente',
        '¿Qué es un Número Maestro?',
        'Ver Kits de regalo'
      ]
    };
  }

  const raw = input.trim();
  const norm = normalizeText(raw);

  // 1. DETECCIÓN DE FECHA DE NACIMIENTO -> CÁLCULO DIRECTO DE CAMINO DE VIDA Y AÑO PERSONAL
  const birthDate = extractBirthDate(raw);
  if (birthDate) {
    const lifePath = calculateLifePath(birthDate);
    const personalYear = calculatePersonalYear(birthDate);
    const archetype = LIFE_PATH_ARCHETYPES[lifePath];

    if (archetype) {
      // Buscar el producto recomendado del arquetipo en el catálogo
      let matchedProducts = [];
      const prodTokens = archetype.recommendedProduct.split('+').map(s => s.trim());
      prodTokens.forEach(t => {
        const found = findProductByTerm(t);
        if (found && !matchedProducts.some(p => p.id === found.id)) {
          matchedProducts.push(found);
        }
      });

      // Si no encontró por coincidencia exacta, proveer el producto insignia
      if (matchedProducts.length === 0) {
        const fallback = PRODUCTS.find(p => p.id === 'vela-frecuencia-dorada');
        if (fallback) matchedProducts.push(fallback);
      }

      const responseText = `✨ **Tu Frecuencia Sagrada: Camino de Vida ${lifePath}**

**${archetype.title}**
*${archetype.essence}*

🌿 **Vibración:** ${archetype.frequency}
🔥 **Elemento:** ${archetype.element}
💎 **Cristal Afín:** ${archetype.crystal}
🗓️ **Año Personal ${new Date().getFullYear()}:** Vibración ${personalYear} (ciclo de energía y alineación).

📜 **Mensaje de tu Arquetipo:**
${archetype.description}

🧘 **Tu Mantra Sagrado:**
${archetype.mantra}

🕯️ **Ritual & Elemento Recomendado:**
*${archetype.recommendedRitual}* con **${archetype.recommendedProduct}**.`;

      return {
        text: responseText,
        products: matchedProducts,
        quickReplies: [
          '¿Qué significa mi Año Personal?',
          'Velas aromáticas recomendadas',
          '¿Cómo calculo el Número del Alma?',
          'Ver kits de bienestar'
        ]
      };
    }
  }

  // 2. DETECCIÓN DE NÚMEROS ESPECÍFICOS DE ARQUETIPO (1-9, 11, 22, 33)
  const numberPatterns = [
    { num: 11, regex: /\b(numero\s+)?(11|once|maestro\s+11)\b/ },
    { num: 22, regex: /\b(numero\s+)?(22|veintidos|maestro\s+22)\b/ },
    { num: 33, regex: /\b(numero\s+)?(33|treinta\s+y\s+tres|maestro\s+33)\b/ },
    { num: 1, regex: /\b(numero\s+)?(1|uno)\b/ },
    { num: 2, regex: /\b(numero\s+)?(2|dos)\b/ },
    { num: 3, regex: /\b(numero\s+)?(3|tres)\b/ },
    { num: 4, regex: /\b(numero\s+)?(4|cuatro)\b/ },
    { num: 5, regex: /\b(numero\s+)?(5|cinco)\b/ },
    { num: 6, regex: /\b(numero\s+)?(6|seis)\b/ },
    { num: 7, regex: /\b(numero\s+)?(7|siete)\b/ },
    { num: 8, regex: /\b(numero\s+)?(8|ocho)\b/ },
    { num: 9, regex: /\b(numero\s+)?(9|nueve)\b/ }
  ];

  const isAskingAboutNumber = norm.includes('significa') || norm.includes('arquetipo') || norm.includes('numero') || norm.includes('frecuencia') || norm.includes('maestro');

  if (isAskingAboutNumber) {
    for (const item of numberPatterns) {
      if (item.regex.test(norm)) {
        const arch = LIFE_PATH_ARCHETYPES[item.num];
        if (arch) {
          let recProducts = [];
          const prodTokens = arch.recommendedProduct.split('+').map(s => s.trim());
          prodTokens.forEach(t => {
            const found = findProductByTerm(t);
            if (found && !recProducts.some(p => p.id === found.id)) recProducts.push(found);
          });

          return {
            text: `✨ **Arquetipo del Número ${arch.number}: ${arch.title}**

🌿 **Esencia:** ${arch.essence}
💫 **Frecuencia:** ${arch.frequency}
💎 **Cristal Conector:** ${arch.crystal} | **Elemento:** ${arch.element}

📜 **Enseñanza:**
${arch.description}

🕊️ **Mantra de Sintonización:**
${arch.mantra}

🕯️ **Herramienta NÜMA Recomendada:**
${arch.recommendedProduct} para acompañar el *${arch.recommendedRitual}*.`,
            products: recProducts,
            quickReplies: [
              'Calcular con mi fecha de nacimiento',
              'Ver productos recomendados',
              '¿Qué son los Números Maestros?',
              'Consultar otro número'
            ]
          };
        }
      }
    }
  }

  // 3. CONCEPTOS FUNDAMENTALES DE NUMEROLOGÍA
  if (norm.includes('camino de vida') || norm.includes('sendero')) {
    const concept = NUMEROLOGY_CONCEPTS.find(c => c.id === 'camino-de-vida');
    return {
      text: `🧭 **${concept.title}: ${concept.subtitle}**

${concept.description}

✨ **¿Cómo calcularlo?**
Dime tu fecha de nacimiento (por ejemplo: *"Nací el 14 de agosto de 1992"*) y calcularé tu arquetipo sagrado y herramientas recomendadas de inmediato.`,
      products: [PRODUCTS[1]], // Vela Sagrada Frecuencia del Ser
      quickReplies: [
        'Nací el 14/08/1992',
        'Nací el 03/11/1988',
        '¿Qué es el Número del Alma?',
        '¿Qué es el Año Personal?'
      ]
    };
  }

  if (norm.includes('alma') || norm.includes('numero del alma')) {
    const concept = NUMEROLOGY_CONCEPTS.find(c => c.id === 'numero-del-alma');
    return {
      text: `💖 **${concept.title}: ${concept.subtitle}**

${concept.description}

Escribe tu nombre completo (ejemplo: *"Mi nombre es Sofia Morales"*) para que revele la vibración profunda de tus vocales.`,
      products: [PRODUCTS[0]], // Vela Calma
      quickReplies: [
        'Calcular mi Camino de Vida',
        '¿Qué es el Número de Expresión?',
        'Ver velas de meditación'
      ]
    };
  }

  if (norm.includes('expresion') || norm.includes('mascara sagrada')) {
    const concept = NUMEROLOGY_CONCEPTS.find(c => c.id === 'numero-de-expresion');
    return {
      text: `🎭 **${concept.title}: ${concept.subtitle}**

${concept.description}

Integra todas las letras de tu nombre natal y describe cómo compartes tus dones y energía con el plano exterior.`,
      products: [PRODUCTS[3]], // Jabón Carbón & Oro
      quickReplies: [
        'Calcular mi Camino de Vida',
        '¿Qué es el Año Personal?',
        'Productos para energía y foco'
      ]
    };
  }

  if (norm.includes('ano personal') || norm.includes('ciclo') || norm.includes('ano 2026') || norm.includes('ano actual')) {
    const concept = NUMEROLOGY_CONCEPTS.find(c => c.id === 'ano-personal');
    return {
      text: `🌀 **${concept.title}: ${concept.subtitle}**

${concept.description}

Los ciclos de 9 años marcan fases de inicio, gestación, creatividad, orden, cambio, armonía familiar, introspección, cosecha y trascendencia.

Proporcióname tu día y mes de nacimiento para sintonizar en cuál ciclo estás transitando este año.`,
      products: [PRODUCTS[1]],
      quickReplies: [
        'Nací el 21 de septiembre',
        '¿Qué son los Números Maestros?',
        'Ver rituales de bienestar'
      ]
    };
  }

  if (norm.includes('maestro') || norm.includes('11:11') || norm.includes('numeros maestros')) {
    return {
      text: `🌟 **Los Números Maestros en NÜMA: 11, 22 y 33**

En la numerología pitagórica sagrada, estos números no se reducen a un solo dígito cuando aparecen como resultado final, ya que portan una octava superior de vibración:

• **11 — El Canal Luminoso:** Intuición despierta, visión espiritual y capacidad de iluminar la conciencia colectiva.
• **22 — El Maestro Constructor:** Capacidad de plasmar ideales elevados y utopías en obras tangibles y legados perdurables.
• **33 — El Amor Crístico:** Servicio incondicional, sanación del corazón y compasión universal.

¿Te resuena alguno de estos números o deseas calcular si portas uno en tu fecha natal?`,
      products: [PRODUCTS[1], PRODUCTS[4]], // Vela Frecuencia + Bruma Áurica
      quickReplies: [
        'Háblame del Número Maestro 11',
        'Háblame del Número Maestro 22',
        'Háblame del Número Maestro 33',
        'Calcular mi fecha'
      ]
    };
  }

  // 4. DETECCIÓN DE CÁLCULO POR NOMBRE
  const nameMatch = raw.match(/(?:mi nombre es|me llamo|soy|nombre:?)\s+([A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,})/i);
  if (nameMatch) {
    const nameFound = nameMatch[1].trim();
    const soulNum = calculateSoulNumber(nameFound);
    const expNum = calculateExpressionNumber(nameFound);

    if (soulNum && expNum) {
      return {
        text: `🌸 **Sintonización Numerológica para ${nameFound}:**

✨ **Número del Alma (Vibración de tus Vocales): ${soulNum}**
Representa los deseos más íntimos de tu ser, lo que anhela tu corazón en silencio y tu mayor motivación interior.

🎭 **Número de Expresión (Consonantes y Vocales): ${expNum}**
Refleja cómo proyectas tus talentos en el mundo y las herramientas con las que construyes tu realidad.

Combina esta vibración con tu **Camino de Vida** compartiéndome tu fecha de nacimiento completa.`,
        products: [PRODUCTS[1], PRODUCTS[6]],
        quickReplies: [
          'Calcular con mi fecha de nacimiento',
          'Velas recomendadas',
          'Ver kits de bienestar'
        ]
      };
    }
  }

  // 5. CONSULTAS DE PRODUCTOS POR BENEFICIO / INTENCIÓN
  // Relajación / Dormir / Calma
  if (norm.includes('dormir') || norm.includes('insomnio') || norm.includes('sueno') || norm.includes('calma') || norm.includes('relajar') || norm.includes('paz') || norm.includes('estres') || norm.includes('ansiedad')) {
    const calmProds = PRODUCTS.filter(p =>
      p.id === 'vela-calma-intensa' ||
      p.id === 'sales-himalaya-loto' ||
      p.id === 'jabon-lavanda-serenidad' ||
      p.id === 'difusor-ultrasonico-obsidian'
    );
    return {
      text: `🌿 **Ritual de Calma & Descanso Profundo NÜMA**

Para apaciguar la mente, disolver tensiones y preparar tu templo para un sueño restaurador, te sugerimos elementos con aceites esenciales de lavanda silvestre de Provenza, manzanilla noble y sales botánicas del Himalaya:`,
      products: calmProds,
      quickReplies: [
        '¿Cuánto cuesta la Vela Calma Intensa?',
        'Ver Jabón de Lavanda',
        'Calcular mi Camino de Vida',
        'Ver difusores ultrasónicos'
      ]
    };
  }

  // Energía / Foco / Mañanas
  if (norm.includes('energia') || norm.includes('foco') || norm.includes('concentracion') || norm.includes('manana') || norm.includes('vitalidad') || norm.includes('despertar')) {
    const energyProds = PRODUCTS.filter(p =>
      p.id === 'vela-energia-solar' ||
      p.id === 'bruma-aurica-frecuencia' ||
      p.id === 'jabon-carbon-oro' ||
      p.id === 'oleo-esencial-enfoque'
    );
    return {
      text: `☀️ **Elevación de Frecuencia, Vitalidad & Enfoque Mental**

Para despejar la niebla matutina y conectar con tu poder creador, nuestra sinergia botánica de cítricos nobles (naranja dulce, pomelo rosa), romero silvestre y menta piperita brinda claridad sin alterar tu centro:`,
      products: energyProds.length > 0 ? energyProds : [PRODUCTS[2], PRODUCTS[4]],
      quickReplies: [
        'Vela Despertar Solar',
        'Bruma Áurica Frecuencia NÜMA',
        'Roll-on Óleo de Enfoque',
        'Calcular mi número'
      ]
    };
  }

  // Meditación / Espiritualidad / Conexión
  if (norm.includes('meditar') || norm.includes('meditacion') || norm.includes('ritual') || norm.includes('espiritual') || norm.includes('presencia') || norm.includes('cuencos')) {
    const spiritProds = PRODUCTS.filter(p =>
      p.id === 'vela-frecuencia-dorada' ||
      p.id === 'bruma-aurica-frecuencia' ||
      p.id === 'kit-despertar-esencia'
    );
    return {
      text: `🕯️ **Sintonización del Espacio Sagrado & Meditación**

Nuestra pieza insignia, la **Vela Sagrada Frecuencia del Ser**, con notas místicas de Incienso Olíbano, Mirra y Ámbar Cálido, junto con la **Bruma Áurica**, crean una atmósfera de templo interior idónea para acompañar tu respiración y meditación:`,
      products: spiritProds,
      quickReplies: [
        'Ver Vela Sagrada Frecuencia del Ser',
        '¿Qué es la sonoterapia con cuencos?',
        'Kit Alquimia de la Esencia',
        'Calcular mi Camino de Vida'
      ]
    };
  }

  // Regalos / Kits
  if (norm.includes('regalo') || norm.includes('kit') || norm.includes('set') || norm.includes('detalle') || norm.includes('obsequio')) {
    const giftProds = PRODUCTS.filter(p => p.category === 'kits' || p.badge === 'Regalo Ideal' || p.badge === 'Insignia');
    return {
      text: `🎁 **Kits Rituales & Regalos con Propósito NÜMA**

Regalar NÜMA es ofrecer un ancla de presencia y paz. Cada cofre viene en empaque de lujo sostenible con detalles en hot stamping dorado y tarjeta de intención personalizable:`,
      products: giftProds,
      quickReplies: [
        'Cofre Ritual de Calma',
        'Kit Alquimia de la Esencia',
        'Ver todas las velas',
        'Consultar precios'
      ]
    };
  }

  // 6. BÚSQUEDA GENERAL DE PRODUCTOS EN EL CATÁLOGO (Por nombre, aroma o categoría)
  const matched = searchProducts(raw);
  if (matched.length > 0) {
    const topResults = matched.slice(0, 3);
    const categoryDetected = CATEGORIES.find(c => norm.includes(normalizeText(c.label)) || norm.includes(c.id));

    let intro = `🌿 Encontré estas piezas sagradas en nuestro catálogo que resuenan con tu búsqueda:`;
    if (categoryDetected) {
      intro = `✨ Explorando nuestra colección de **${categoryDetected.label}**:`;
    }

    return {
      text: intro,
      products: topResults,
      quickReplies: [
        `¿Qué aroma tiene ${topResults[0]?.name.split(' ')[0] || 'este producto'}?`,
        'Ver todos los precios',
        'Calcular mi Camino de Vida',
        'Productos para relajarme'
      ]
    };
  }

  // 7. PREGUNTAS GENERALES SOBRE NÜMA, EXPERIENCIAS Y CONTACTO
  if (norm.includes('whatsapp') || norm.includes('contacto') || norm.includes('telefono') || norm.includes('celular') || norm.includes('hablar') || norm.includes('asesor') || norm.includes('agendar')) {
    return {
      text: `📱 **Atención Personalizada NÜMA por WhatsApp**

Puedes comunicarte directamente con nuestro equipo de sintonización y atención al cliente a través de nuestro canal oficial:

✨ **WhatsApp:** [+52 1 844 122 8140](https://wa.me/5218441228140?text=Hola%20NÜMA%20✨%20Quisiera%20recibir%20atención%20personalizada)
🕊️ Horario de atención: Lunes a Sábado de 10:00 a 19:00 hrs.

¿Deseas además que te recomiende algún ritual o producto mientras tanto?`,
      products: [PRODUCTS[1], PRODUCTS[0]],
      quickReplies: [
        'Calcular mi Camino de Vida',
        'Velas para calmar la mente',
        'Ver kits de regalo',
        '¿Qué es un Número Maestro?'
      ]
    };
  }

  if (norm.includes('que es numa') || norm.includes('quienes son') || norm.includes('concepto') || norm.includes('marca')) {
    return {
      text: `✨ **Bienvenido a NÜMA: Frecuencia del Ser**

NÜMA es un espacio de bienestar integral que fusiona la pureza botánica, la geometría sagrada, la numerología transpersonal y la sonoterapia con cuencos tibetanos.

Diseñamos rituales, aromas y herramientas conscientes vertidas a mano con cera vegetal, aceites botánicos puros y envases reutilizables para transformar tus rutinas en actos de presencia y calma.`,
      products: [PRODUCTS[1], PRODUCTS[0]],
      quickReplies: [
        'Calcular mi Camino de Vida',
        'Ver colección de velas',
        'Ver jabones artesanales',
        'Agendar una experiencia'
      ]
    };
  }

  if (norm.includes('cuenco') || norm.includes('sonoterapia') || norm.includes('sonido') || norm.includes('432')) {
    return {
      text: `🔔 **Sonoterapia & Frecuencia 432 Hz**

El sonido es medicina para el sistema nervioso. En NÜMA facilitamos inmersiones sonoras individuales y círculos de meditación con cuencos tibetanos forjados artesanalmente en siete metales sagrados.

Puedes activar la sintonización auditiva en el reproductor inferior izquierdo para escuchar la vibración de 432 Hz mientras exploras nuestro espacio.`,
      products: [PRODUCTS[1]],
      quickReplies: [
        'Agendar sesión de cuencos',
        'Calcular mi Camino de Vida',
        'Vela Sagrada Frecuencia del Ser',
        'Productos para meditar'
      ]
    };
  }

  if (norm.includes('hola') || norm.includes('buen') || norm.includes('saludos') || norm.includes('namaste') || norm.includes('inicio')) {
    return {
      text: `🕊️ Saludos y bienvenida a este espacio de calma. Soy el **Oráculo de NÜMA**, guardián del catálogo y de la sabiduría numerológica.

¿En qué puedo asistirte hoy?
• 🔢 Revelar tu **Camino de Vida** y arquetipo con tu fecha natal.
• 🕯️ Encontrar el aroma, vela o ritual perfecto para tus momentos de bienestar.
• 💎 Explicarte el significado de cualquier número o número maestro (11, 22, 33).`,
      products: [PRODUCTS[1], PRODUCTS[0]],
      quickReplies: [
        'Calcular mi Camino de Vida',
        'Recomiéndame una vela para relajarme',
        '¿Qué es el Número Maestro 11?',
        'Ver kits de regalo'
      ]
    };
  }

  // 8. FALLBACK CORDIAL Y GUIADO
  return {
    text: `🌿 Siento la resonancia de tu mensaje. Como guardián de NÜMA, puedo orientarte sobre **nuestro catálogo de aromas botánicos, velas y rituales**, o guiarte a través de la **sabiduría de la numerología pitagórica**.

Para darte una respuesta precisa, puedes:
• Escribir tu **fecha de nacimiento** (ej: *"Nací el 15/07/1991"*).
• Preguntar por una intención (ej: *"¿Qué tienen para dormir o meditar?"*).
• Consultar por un producto o ingrediente (ej: *"Jabón de lavanda"*, *"Velas aromáticas"*).`,
    products: [PRODUCTS[0], PRODUCTS[1]],
    quickReplies: [
      'Calcular mi Camino de Vida',
      'Velas para relajación profunda',
      '¿Qué significa el número 7?',
      'Ver jabones botánicos'
    ]
  };
}
