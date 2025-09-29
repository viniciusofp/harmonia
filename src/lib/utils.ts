import { clsx, type ClassValue } from 'clsx';
import { find, keyBy } from 'lodash';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notes = [
  { id: 0, name: 'Dó', symbol: 'C', distanceToA: -9 },
  {
    id: 1,
    name: ['Dó Sustenido', 'Ré Bemol'],
    symbol: ['C#', 'Db'],
    distanceToA: -8
  },
  { id: 2, name: 'Ré', symbol: 'D', distanceToA: -7 },
  {
    id: 3,
    name: ['Ré Sustenido', 'Mi Bemol'],
    symbol: ['D#', 'Eb'],
    distanceToA: -6
  },
  { id: 4, name: 'Mi', symbol: 'E', distanceToA: -5 },
  { id: 5, name: 'Fá', symbol: 'F', distanceToA: -4 },
  {
    id: 6,
    name: ['Fá Sustenido', 'Sol Bemol'],
    symbol: ['F#', 'Gb'],
    distanceToA: -3
  },
  { id: 7, name: 'Sol', symbol: 'G', distanceToA: -2 },
  {
    id: 8,
    name: ['Sol Sustenido', 'Lá Bemol'],
    symbol: ['G#', 'Ab'],
    distanceToA: -1
  },
  { id: 9, name: 'Lá', symbol: 'A', distanceToA: 0 },
  {
    id: 10,
    name: ['Lá Sustenido', 'Si Bemol'],
    symbol: ['A#', 'Bb'],
    distanceToA: 1
  },
  { id: 11, name: 'Si', symbol: 'B', distanceToA: 2 }
];

export const noteMap = keyBy(notes, 'id');
export const roman_numbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
export const graus_romano = [
  'I',
  'IIm',
  'IIM',
  'IIIm',
  'IIIM',
  'IV',
  'IV#/Vb',
  'V',
  'VIm',
  'VIM',
  'VIIm',
  'VIIM'
];
const graus = [
  '1',
  '2m',
  '2M',
  '3m',
  '3M',
  '4',
  '4#/5b',
  '5',
  'VIm',
  '6IM',
  '7m',
  '7M'
];

export const modes = [
  {
    name: 'Maior',
    scale: [0, 2, 4, 5, 7, 9, 11],
    chords: ['7M', 'm7', 'm7', '7M', '7', 'm7', 'Ø']
  },
  {
    name: 'Menor',
    scale: [0, 2, 3, 5, 7, 8, 10],
    chords: ['m7', 'Ø', '7M', 'm7', 'm7', '7M', '7']
  }
];

// 'Ø'

export function createScale(toneId: number, scaleName: string) {
  const mode = find(modes, { name: scaleName });

  //@ts-ignore
  let scaleNotes = mode.scale.map(
    (distance: number) => (toneId + distance) % 12
  );

  return scaleNotes;
}

export function notesStartingByTone(toneId: number) {
  const notesBefore = notes
    .slice(0, toneId)
    .map((note) => ({ ...note, distanceToA: note.distanceToA + 12 }));
  const notesAfter = notes.slice(toneId, notes.length);
  return [...notesAfter, ...notesBefore];
}

export function getFrequency(distanceToA: number) {
  return 440 * Math.pow(2, distanceToA / 12);
}

export function sharpOrFlat(toneId: number, scaleName: string) {
  if (toneId === undefined) return 0;
  // Se tem duas opções de nome:
  // Se tom for MAIOR
  return scaleName === 'Maior' &&
    (toneId === 5 || typeof noteMap[toneId].symbol !== 'string') // Fá
    ? 1
    : scaleName === 'Maior'
    ? 0
    : // Se tom for MENOR
    typeof noteMap[(toneId + 3) % 12].symbol !== 'string' ||
      (toneId + 3) % 12 === 5 // Fá
    ? 1
    : 0;
}
