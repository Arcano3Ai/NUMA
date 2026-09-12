/**
 * Catálogo de Pistas de Meditación Guiada NÜMA
 * Las canciones de audio se leen directamente desde la carpeta oficial ./meditacion_guiada/
 */

export const MEDITACIONES_GUIADAS = [
  {
    id: 'meditacion-bienvenida-al-silencio',
    title: 'Bienvenida al Silencio',
    subtitle: 'Alineación & Apertura Consciente',
    frequency: '432 Hz · Sintonía de Calma',
    duration: '03:56',
    intention: 'Disolver el ruido mental, pausar la prisa y anclarse en la respiración sagrada.',
    description: 'Pista insignia introductoria de NÜMA diseñada para abrir sesiones meditativas y rituales de calma.',
    audioSrc: './meditacion_guiada/Bienvenida al Silencio.mp3',
    fallbackSrc: './assets/audio/frecuencia_del_ser.mp3',
    badge: 'Disponible Ahora',
    tag: 'APERTURA & CALMA'
  },
  {
    id: 'meditacion-retorno-al-ser',
    title: 'Retorno al Ser',
    subtitle: 'Reconexión con tu Centro Sagrado',
    frequency: '432 Hz · Frecuencia Natural',
    duration: '12:40',
    intention: 'Paz mental, anclaje al presente y disolución de ansiedad.',
    description: 'Una guía inmersiva para serenar el diálogo interno y restablecer la armonía bioenergética.',
    audioSrc: './meditacion_guiada/retorno_al_ser.mp3',
    fallbackSrc: './meditacion_guiada/Bienvenida al Silencio.mp3',
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
    description: 'Vibraciones acústicas de cuencos y respiración compasiva para abrir el espacio del pecho.',
    audioSrc: './meditacion_guiada/apertura_corazon.mp3',
    fallbackSrc: './meditacion_guiada/Bienvenida al Silencio.mp3',
    badge: 'Transformación',
    tag: 'AMOR & GRATITUD'
  },
  {
    id: 'meditacion-frecuencia-sagrada',
    title: 'Frecuencia Sagrada del Ser',
    subtitle: 'Ondas Armónicas & Cuencos de Cuarzo',
    frequency: '528 Hz / 432 Hz · Balance Acústico',
    duration: '04:02',
    intention: 'Equilibrio de los 7 centros energéticos mediante resonancia acústica pura.',
    description: 'Armonización multidimensional con cuencos e instrumentos ancestrales grabados en alta fidelidad.',
    audioSrc: './meditacion_guiada/Frecuencia del Ser.wav',
    fallbackSrc: './assets/audio/frecuencia_del_ser.mp3',
    badge: 'Disponible Ahora',
    tag: 'ARMONIZACIÓN VIBRACIONAL'
  }
];
