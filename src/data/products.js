export const PRODUCTS = [
  // --- VELAS ---
  {
    id: 'vela-calma-intensa',
    name: 'Vela Ritual Calma Intensa',
    category: 'velas',
    categoryLabel: 'Velas Aromáticas',
    price: 680,
    originalPrice: 750,
    rating: 5.0,
    reviewsCount: 38,
    isFeatured: true,
    badge: 'Insignia',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85',
    tagline: 'Una invitación al silencio y al descanso profundo.',
    description: 'Vertida a mano con cera de soya 100% vegetal y pábilo de madera que crepita suavemente como fuego de hogar. Diseñada para bajar el ruido mental y envolver el espacio en una frecuencia de absoluta serenidad.',
    aroma: {
      salida: 'Lavanda Silvestre de Provenza & Manzanilla',
      corazon: 'Vainilla Bourbon & Flor de Azahar',
      fondo: 'Madera de Cedro & Almizcle Blanco'
    },
    experience: 'Ideal para encender al anochecer, antes de una sesión de meditación o durante un baño restaurador.',
    variants: [
      { id: 'vci-280', label: '280g — 55 horas de combustión', price: 680 },
      { id: 'vci-420', label: '420g — 85 horas de combustión', price: 920 }
    ],
    inStock: true,
    stockQuantity: 14
  },
  {
    id: 'vela-frecuencia-dorada',
    name: 'Vela Sagrada Frecuencia del Ser',
    category: 'velas',
    categoryLabel: 'Velas Rituales',
    price: 740,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 29,
    isFeatured: true,
    badge: 'Exclusiva NÜMA',
    image: 'https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=900&q=85',
    tagline: 'Luz dorada que sintoniza tu espacio con tu esencia.',
    description: 'Nuestra vela icónica en vaso negro mate con acabado interior dorado refractario. A medida que la cera se funde, el reflejo dorado cobra vida iluminando la geometría sagrada del símbolo NÜMA.',
    aroma: {
      salida: 'Incienso Olibano & Bergamota Calabresa',
      corazon: 'Mirra & Rosa Damascena',
      fondo: 'Ámbar Cálido & Roble Tostado'
    },
    experience: 'Perfecta para consagrar intenciones, rituales de inicio de mes y momentos de autoafirmación.',
    variants: [
      { id: 'vfd-300', label: '300g — 60 horas de combustión', price: 740 }
    ],
    inStock: true,
    stockQuantity: 9
  },
  {
    id: 'vela-energia-solar',
    name: 'Vela Despertar Solar',
    category: 'velas',
    categoryLabel: 'Velas Aromáticas',
    price: 650,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 19,
    isFeatured: false,
    badge: 'Energía',
    image: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&w=900&q=85',
    tagline: 'Claridad mental y vitalidad para tus mañanas.',
    description: 'Formulada para elevar la vibración de tus mañanas y despejar la niebla mental. Sus notas botánicas cítricas despiertan el enfoque creativo sin alterar tu centro de calma.',
    aroma: {
      salida: 'Naranja Dulce & Pomelo Rosa',
      corazon: 'Romero Silvestre & Jengibre Fresco',
      fondo: 'Vetiver & Menta Piperita'
    },
    experience: 'Enciende al iniciar tu jornada creativa o durante tus lecturas matutinas.',
    variants: [
      { id: 'ves-280', label: '280g — 55 horas de combustión', price: 650 }
    ],
    inStock: true,
    stockQuantity: 21
  },

  // --- JABONES ---
  {
    id: 'jabon-carbon-oro',
    name: 'Jabón Botánico Carbón Obsidiana & Oro',
    category: 'jabones',
    categoryLabel: 'Jabones Artesanales',
    price: 280,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 42,
    isFeatured: true,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1607006314644-88cb077c5709?auto=format&fit=crop&w=900&q=85',
    tagline: 'Purificación profunda con mística mineral mexicana.',
    description: 'Saponificado en frío durante 6 semanas con aceites orgánicos de oliva virgen, coco y manteca de karité, infusionado con carbón activado de coco y destellos de mica dorada biodegradable.',
    aroma: {
      salida: 'Árbol de Té & Eucalipto Azul',
      corazon: 'Hierba de San Juan & Tomillo',
      fondo: 'Tierra Húmeda & Pachulí'
    },
    experience: 'Limpia la pesadez de una jornada demandante dejando la piel suave, nutrida y con un toque sedoso de luz.',
    variants: [
      { id: 'jco-150', label: 'Barra individual 150g', price: 280 },
      { id: 'jco-pack2', label: 'Dúo Ritual 2x150g', price: 510 }
    ],
    inStock: true,
    stockQuantity: 30
  },
  {
    id: 'jabon-lavanda-serena',
    name: 'Jabón Artesanal Lavanda & Caléndula',
    category: 'jabones',
    categoryLabel: 'Jabones Artesanales',
    price: 260,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 27,
    isFeatured: false,
    badge: 'Calma',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=85',
    tagline: 'Ternura botánica para pieles sensibles.',
    description: 'Con pétalos enteros de caléndula cultivada orgánicamente y aceite esencial de lavanda vera. Crea una espuma cremosa y reconfortante que calma la piel y alivia el estrés del día.',
    aroma: {
      salida: 'Lavanda Francesa & Melisa',
      corazon: 'Caléndula & Miel de Agave',
      fondo: 'Almendra Dulce'
    },
    experience: 'Perfecto para el baño nocturno antes de dormir o para lavar las manos con intención de pausa.',
    variants: [
      { id: 'jls-150', label: 'Barra individual 150g', price: 260 }
    ],
    inStock: true,
    stockQuantity: 18
  },

  // --- AROMAS ---
  {
    id: 'bruma-aurica-frecuencia',
    name: 'Bruma Áurica Frecuencia NÜMA',
    category: 'aromas',
    categoryLabel: 'Aceites & Esencias',
    price: 490,
    originalPrice: null,
    rating: 5.0,
    reviewsCount: 33,
    isFeatured: true,
    badge: 'Favorito del Altar',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=900&q=85',
    tagline: 'Armonizador de espacios, almohada y aura personal.',
    description: 'Agua floral de rosas y hamamelis dinamizada con cristales de cuarzo blanco, combinada con aceites esenciales botánicos puros. Rocía sobre tu espacio, sábanas o alrededor de tu cuerpo para cambiar la atmósfera en un segundo.',
    aroma: {
      salida: 'Bruma Marina & Bergamota',
      corazon: 'Palo Santo Sustentable & Flor de Loto',
      fondo: 'Sándalo Blanco & Resina de Copal'
    },
    experience: 'Rocía 3 pulsaciones sobre tu cabeza inhalando profundo antes de meditar, trabajar o descansar.',
    variants: [
      { id: 'baf-100', label: 'Frasco vidrio ámbar 100ml con atomizador dorado', price: 490 }
    ],
    inStock: true,
    stockQuantity: 16
  },
  {
    id: 'oleo-esencial-equilibrio',
    name: 'Óleo Esencial Ritual de Equilibrio',
    category: 'aromas',
    categoryLabel: 'Aceites & Esencias',
    price: 420,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 15,
    isFeatured: false,
    badge: 'Roll-on',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85',
    tagline: 'Elixir botánico para puntos de pulso y respiración.',
    description: 'Mezcla concentrada en base de aceite de jojoba dorada lista para aplicar directamente sobre sienes, muñecas y detrás de las orejas. Compacto para llevar contigo en todo momento.',
    aroma: {
      salida: 'Menta Piperita & Enebro',
      corazon: 'Salvia Esclarea & Geranio',
      fondo: 'Cedro del Atlas'
    },
    experience: 'Aplica en puntos de pulso, frota las manos, cóbrelas sobre tu rostro e inhala en 4 tiempos.',
    variants: [
      { id: 'oee-15', label: 'Roll-on vidrio negro mate 15ml con esfera de acero', price: 420 }
    ],
    inStock: true,
    stockQuantity: 25
  },

  // --- DIFUSORES ---
  {
    id: 'difusor-obsidian-gold',
    name: 'Difusor Ultrasónico Obsidian & Gold',
    category: 'difusores',
    categoryLabel: 'Difusores de Ambiente',
    price: 1350,
    originalPrice: 1550,
    rating: 5.0,
    reviewsCount: 22,
    isFeatured: true,
    badge: 'Edición Limitada',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85',
    tagline: 'Diseño escultórico minimalista con halo de luz cálida.',
    description: 'Cuerpo de cerámica esmaltada en negro carbón con anillo de luz ambiental dorada y base mineral. Tecnología ultrasónica silenciosa que fragmenta los aceites esenciales sin calentarlos, preservando sus notas vivas.',
    aroma: {
      salida: 'Compatible con todas nuestras esencias puras NÜMA',
      corazon: 'Temporizador de 1h, 3h, 6h o vapor intermitente',
      fondo: 'Apagado automático inteligente sin agua'
    },
    experience: 'Transforma cualquier habitación en un santuario sensorial con niebla fría y tenue brillo dorado.',
    variants: [
      { id: 'dog-200', label: 'Capacidad 220ml — Cobertura 35m²', price: 1350 }
    ],
    inStock: true,
    stockQuantity: 7
  },
  {
    id: 'difusor-varillas-calma',
    name: 'Difusor de Varillas Botánicas NÜMA Calma',
    category: 'difusores',
    categoryLabel: 'Difusores de Ambiente',
    price: 580,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 16,
    isFeatured: false,
    badge: 'Aroma Continuo',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85',
    tagline: 'Difusión pasiva sutil y constante durante más de 3 meses.',
    description: 'Frasco de cristal negro grabado con tapón dorado y 8 varillas de ratán natural de alta capilaridad. Emite de forma gradual un aroma refinado sin necesidad de calor ni electricidad.',
    aroma: {
      salida: 'Lavanda & Mandarina Verde',
      corazon: 'Hojas de Té Blanco & Lirio',
      fondo: 'Almizcle de Cachemira'
    },
    experience: 'Ideal para recibidores, estudios y dormitorios donde deseas un aroma acogedor constante.',
    variants: [
      { id: 'dvc-180', label: '180ml + 8 varillas negras de ratán', price: 580 }
    ],
    inStock: true,
    stockQuantity: 12
  },

  // --- BAÑO Y RELAJACIÓN ---
  {
    id: 'sales-himalaya-loto',
    name: 'Sales de Baño Sagradas Himalaya & Loto',
    category: 'bano',
    categoryLabel: 'Baño & Relajación',
    price: 390,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 31,
    isFeatured: true,
    badge: 'Ritual Corporal',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=85',
    tagline: 'Inmersión mineral para desintoxicar cuerpo y mente.',
    description: 'Sales puras del Himalaya, sales de Epsom ricas en magnesio mineral y flores secas de aciano, lavanda y jazmín. Ayudan a liberar tensiones musculares y propician una desconexión mental absoluta.',
    aroma: {
      salida: 'Flor de Loto & Bergamota',
      corazon: 'Jazmín Silvestre & Cardamomo',
      fondo: 'Notas Minerales & Sándalo'
    },
    experience: 'Vierte media taza en tina de agua tibia o prepara un pediluvio reconfortante al finalizar la semana.',
    variants: [
      { id: 'shl-400', label: 'Frasco boticario 400g con cuchara dosificadora', price: 390 }
    ],
    inStock: true,
    stockQuantity: 19
  },

  // --- KITS NÜMA ---
  {
    id: 'kit-ritual-calma-completo',
    name: 'Cofre Ritual de Calma & Reconexión',
    category: 'kits',
    categoryLabel: 'Kits & Experiencias',
    price: 1480,
    originalPrice: 1720,
    rating: 5.0,
    reviewsCount: 54,
    isFeatured: true,
    badge: 'Cofre Emblemático',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
    tagline: 'Todo lo necesario para inaugurar tu santuario personal.',
    description: 'Presentado en una elegante caja rígida negra mate con sello dorado hot-stamping y papel seda. Incluye: Vela Calma Intensa 280g, Jabón Botánico Carbón & Oro 150g, Bruma Áurica 100ml, Cerillos largos con cabeza negra y Tarjeta de Intención guiada.',
    aroma: {
      salida: 'Sinergia aromática completa de lavanda, olíbano y flores blancas',
      corazon: 'Experiencia multisensorial armonizada en frecuencia de paz',
      fondo: 'Incluye código QR con meditación sonora exclusiva de cuencos'
    },
    experience: 'El regalo definitivo para ti o para quien aprecias. Una experiencia de lujo para el alma.',
    variants: [
      { id: 'krc-completo', label: 'Cofre Deluxe NÜMA', price: 1480 }
    ],
    inStock: true,
    stockQuantity: 10
  },
  {
    id: 'kit-despertar-esencia',
    name: 'Kit Alquimia de la Esencia',
    category: 'kits',
    categoryLabel: 'Kits & Experiencias',
    price: 1120,
    originalPrice: 1290,
    rating: 4.9,
    reviewsCount: 23,
    isFeatured: false,
    badge: 'Regalo Ideal',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=85',
    tagline: 'Vela Sagrada Frecuencia del Ser + Roll-on Óleo de Equilibrio.',
    description: 'Un dúo armónico creado para quienes buscan un ancla de presencia en su rutina diaria de trabajo o meditación. Incluye bolsita de terciopelo negro grabada en hilo dorado.',
    aroma: {
      salida: 'Olíbano, cítricos nobles y maderas cálidas',
      corazon: 'Sinergia de concentración y arraigo',
      fondo: 'Acabado en terciopelo y detalles dorados'
    },
    experience: 'Mantén en tu escritorio o velador para encender momentos de foco y centramiento.',
    variants: [
      { id: 'kde-duo', label: 'Set Dúo Esencia', price: 1120 }
    ],
    inStock: true,
    stockQuantity: 15
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todas las Colecciones' },
  { id: 'velas', label: 'Velas Aromáticas & Rituales' },
  { id: 'jabones', label: 'Jabones Artesanales' },
  { id: 'aromas', label: 'Aromas & Brumas' },
  { id: 'difusores', label: 'Difusores de Ambiente' },
  { id: 'bano', label: 'Baño & Relajación' },
  { id: 'kits', label: 'Kits & Regalos NÜMA' }
];
