export const EXPERIENCES = [
  {
    id: 'numerologia-transpersonal',
    name: 'Numerología Transpersonal & Carta del Ser',
    category: 'numerologia',
    categoryTitle: 'NUMEROLOGÍA',
    tagline: 'Un mapa vibracional de autoconocimiento, ciclos y dones innatos.',
    description: 'La numerología en NÜMA no es adivinatoria: es una brújula de introspección profunda basada en la vibración de tu fecha natal y tu nombre completo. A través del análisis de tu Camino de Vida, Número del Alma, Expresión y Año Personal, descubrimos las frecuencias que rigen tus talentos, aprendizajes kármicos y momentos óptimos para tomar decisiones.',
    image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=900&q=85',
    types: [
      {
        id: 'num-individual',
        title: 'Lectura de Carta Numerológica Completa',
        duration: '75 minutos',
        modality: 'Presencial o Sesión Online en Vivo (Vía Zoom/Meet)',
        price: 1200,
        includes: [
          'Cálculo y análisis de Camino de Vida, Número del Alma y Personalidad',
          'Estudio de Tránsitos y Año Personal actual con recomendaciones mensuales',
          'Entrega de reporte digital en PDF de alta costura con tu geometría personal',
          'Grabación en audio de la sesión y recomendación de ritual botánico personalizado'
        ]
      },
      {
        id: 'num-pareja',
        title: 'Sinergia & Resonancia Vinculante (Parejas o Socios)',
        duration: '90 minutos',
        modality: 'Online o Presencial',
        price: 1800,
        includes: [
          'Cruce de frecuencias entre dos personas y análisis del código en común',
          'Puntos de armonía natural y áreas de crecimiento o fricción evolutiva',
          'Ritual conjunto de sincronización energética'
        ]
      },
      {
        id: 'num-express',
        title: 'Lectura de Enfoque: Año Personal & Desafío Actual',
        duration: '45 minutos',
        modality: 'Online en Vivo',
        price: 850,
        includes: [
          'Análisis exhaustivo del ciclo anual en curso',
          'Fechas clave y aperturas energéticas de los próximos 6 meses',
          'Mantra y frecuencia de anclaje recomendada'
        ]
      }
    ],
    ctaText: 'RESERVAR SESIÓN DE NUMEROLOGÍA'
  },
  {
    id: 'sonoterapia-cuencos',
    name: 'Sonoterapia & Viaje Vibracional con Cuencos',
    category: 'cuencos',
    categoryTitle: 'CUENCOS / SONOTERAPIA',
    tagline: 'El sonido como puente hacia la quietud mental y la armonización celular.',
    description: 'Nuestras sesiones utilizan cuencos tibetanos forjados a mano con aleaciones ancestrales de 7 metales y cuencos de cristal de cuarzo afinados a frecuencias armónicas (432 Hz y tonos Solfeggio). El sonido actúa como un masaje acústico sutil que induce ondas cerebrales Alfa y Theta, favoreciendo una relajación profunda sin esfuerzo.',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=900&q=85',
    types: [
      {
        id: 'cuencos-individual',
        title: 'Inmersión Sonora Individual (Baño Acústico Personal)',
        duration: '60 minutos',
        modality: 'Presencial (Estudio NÜMA) u Online Binaural HD',
        price: 1100,
        includes: [
          'Colocación de cuencos sobre puntos energéticos clave del cuerpo',
          'Aromaterapia NÜMA de apertura y cierre con brumas consagradas',
          'Diálogo reflexivo inicial para fijar una intención para el baño sonoro',
          'Infusión herbal reconfortante de cierre'
        ]
      },
      {
        id: 'cuencos-grupal',
        title: 'Círculo de Sonido & Meditación Colectiva',
        duration: '75 minutos',
        modality: 'Presencial (Grupos reducidos max 8 personas)',
        price: 550,
        includes: [
          'Viaje guiado de respiración consciente y paisaje sonoro envolvente',
          'Cuencos tibetanos, campanas koshi, gongs y lluvia de semillas',
          'Espacio de integración y reflexión compartida'
        ]
      },
      {
        id: 'cuencos-duo',
        title: 'Experiencia Sonora para Dos (Conexión Sagrada)',
        duration: '75 minutos',
        modality: 'Presencial',
        price: 1750,
        includes: [
          'Espacio exclusivo decorado con velas y pétalos para dos personas',
          'Baño de sonido personalizado en frecuencia de armonización mutua',
          'Obsequio de Bruma Áurica NÜMA para continuar el ritual en casa'
        ]
      }
    ],
    ctaText: 'RESERVAR EXPERIENCIA SONORA'
  }
];

export const UPCOMING_EXPERIENCES = [
  {
    id: 'breathwork-consciente',
    type: '[NUEVA EXPERIENCIA]',
    title: 'Respiración Consciente & Breathwork Transformativo',
    tagline: 'Liberación emocional somática guiada a través del aliento vital.',
    status: 'Próxima apertura — Primavera 2026',
    availableSoon: true
  },
  {
    id: 'circulos-luna',
    type: '[NUEVA TERAPIA]',
    title: 'Círculos de Luna & Ceremonias de Cacao Sagrado',
    tagline: 'Espacios comunitarios de reflexión, canto medicina e integración cíclica.',
    status: 'Próxima apertura — Fase Creciente',
    availableSoon: true
  },
  {
    id: 'retiros-santuario',
    type: '[NUEVO RITUAL]',
    title: 'Retiros Boutique de Silencio & Desconexión',
    tagline: 'Jornadas de inmersión en naturaleza, gastronomía consciente y autocuidado.',
    status: 'Próximamente — Registro prioritario abierto',
    availableSoon: true
  }
];
