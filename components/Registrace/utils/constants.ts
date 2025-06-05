// components/Registrace/utils/constants.ts

// Typy pro řádek rozvrhu
export type ScheduleRow = {
  time: string;
  pondeli: string;
  utery: string;
  streda: string;
  ctvrtek: string;
  patek: string;
  sobota: string;
  nedele: string;
};

// Typ pro barvy tréninků
export type TrainingColors = {
  [key: string]: string;
};

// Rozvrh tréninků
export const schedule: ScheduleRow[] = [
  { time: '16:00', pondeli: '', utery: '', streda: '', ctvrtek: '', patek: 'Děti Kickbox', sobota: '', nedele: '' },
  { time: '17:00', pondeli: '', utery: 'Kondiční Kickbox', streda: '', ctvrtek: '', patek: 'Kondiční Kickbox', sobota: 'Grappling', nedele: '' },
  { time: '18:00', pondeli: 'Thaibox', utery: 'Kickbox', streda: '', ctvrtek: 'Thaibox', patek: 'Kickbox', sobota: '', nedele: 'Kruhový Trénink' },
  { time: '19:00', pondeli: '', utery: 'Pokročilí', streda: '', ctvrtek: '', patek: '', sobota: '', nedele: '' }
];

// Barvy tréninků
export const trainingColors: TrainingColors = {
  'Kickbox': 'lg:border-l-4 border-l-2 border-green-500 pl-2 w-32',
  'Thaibox': 'lg:border-l-4 border-l-2 border-red-500 pl-2 w-32',
  'Kondiční Kickbox': 'lg:border-l-4 border-l-2 border-blue-500 pl-2 w-32',
  'Děti Kickbox': 'lg:border-l-4 border-l-2 border-green-500 pl-2 w-32',
  'Pokročilí': 'lg:border-l-4 border-l-2 border-purple-500 pl-2 w-32',
  'Grappling': 'lg:border-l-4 border-l-2 border-yellow-500 pl-2 w-32',
  'Kruhový Trénink': 'lg:border-l-4 border-l-2 border-primary pl-2 w-32'
};
