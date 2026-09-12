/**
 * Catálogo de Pistas de Meditación Guiada NÜMA
 * Las canciones de audio se almacenan en ./assets/audio/meditacion_guiada/
 */

export const MEDITACIONES_GUIADAS = [
  {
    id: 'meditacion-retorno-al-ser',
    title: 'Retorno al Ser',
    subtitle: 'Reconexión con tu Centro Sagrado',
    frequency: '432 Hz · Frecuencia Natural',
    duration: '12:40',
    intention: 'Paz mental, anclaje al presente y disolución de ansiedad.',
    description: 'Una guía inmersiva para serenar el diálogo interno y restablecer la armonía bioenergética.',
    audioSrc: './assets/audio/meditacion_guiada/retorno_al_ser.mp3',
    fallbackSrc: './assets/audio/frecuencia_del_ser.mp3',
    badge: 'Insignia NÜMA',
    tag: 'CALMA & PRESENCIA'
  },
  {
    id: 'meditacion-sanacion-corazon',
    title: 'Apertura del Chakra Corazón',
    subtitle: 'Transformación & Amor Propio',
    frequency: '528 Hz · Frecuencia Milagrosa',
    duration: '15:20',
    intention: 'Liberación de cargas emocionales, perdón y reconciliación íntima.',
    description: 'Vibraciones acústicas de cuencos de cuarzo y respiración compasiva para abrir el espacio del pecho.',
    audioSrc: './assets/audio/meditacion_guiada/apertura_corazon.mp3',
    fallbackSrc: './assets/audio/frecuencia_del_ser.mp3',
    badge: 'Transformación',
    tag: 'AMOR & GRATITUD'
  },
  {
    id: 'meditacion-claridad-proposito',
    title: 'Claridad & Propósito de Vida',
    subtitle: 'Sintonía con tu Número Sagrado',
    frequency: '741 Hz · Despertar de la Intuición',
    duration: '10:15',
    intention: 'Iluminación mental, toma de decisiones y confianza interior.',
    description: 'Especialmente diseñada para acompañar lecturas numerológicas y momentos de reinvención personal.',
    audioSrc: './assets/audio/meditacion_guiada/claridad_proposito.mp3',
    fallbackSrc: './assets/audio/frecuencia_del_ser.mp3',
    badge: 'Numerología',
    tag: 'ENFOQUE & VISIÓN'
  },
  {
    id: 'meditacion-sueno-profundo',
    title: 'Quietud Nocturna & Sueño Reparador',
    subtitle: 'Desconexión Profunda de las Cargas del Día',
    frequency: '396 Hz · Liberación de Miedos',
    duration: '18:50',
    intention: 'Conciliación de sueño profundo, descanso celular y serenidad nocturna.',
    description: 'Ondas delta y susurros de relajación progresiva para descansar cuerpo y mente sin interrupciones.',
    audioSrc: './assets/audio/meditacion_guiada/sueno_profundo.mp3',
    fallbackSrc: './assets/audio/frecuencia_del_ser.mp3',
    badge: 'Descanso',
    tag: 'NOCHE & SUEÑO'
  }
];
