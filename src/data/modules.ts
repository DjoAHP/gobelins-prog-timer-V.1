import { DrawingModule } from '../types/types';

export const DRAWING_MODULES: DrawingModule[] = [
  {
    id: 'warm-up',
    name: 'Échauffement du poignet',
    durationMinutes: 30,
    startTime: '14:00',
    description: 'Exercices d\'échauffement pour préparer votre poignet au dessin',
    color: '#38bdf8', // primary-400
  },
  {
    id: 'anatomy',
    name: 'Étude de l\'anatomie',
    durationMinutes: 60,
    startTime: '14:30',
    description: 'Approfondir les connaissances sur l\'anatomie humaine',
    color: '#a78bfa', // secondary-400
  },
  {
    id: 'gesture',
    name: 'Gesture',
    durationMinutes: 60,
    startTime: '15:30',
    description: 'Pratiquer les dessins de mouvement rapide',
    color: '#fb7185', // rose-400
  },
  {
    id: 'graphic-universe',
    name: 'Études d\'univers graphique',
    durationMinutes: 30,
    startTime: '16:30',
    description: 'Explorer différents styles et univers graphiques',
    color: '#34d399', // emerald-400
  },
  {
    id: 'observation',
    name: 'Dessins d\'observation',
    durationMinutes: 90,
    startTime: '17:00',
    description: 'Pratiquer le dessin d\'après observation',
    color: '#fbbf24', // amber-400
  },
  {
    id: 'composition',
    name: 'Étude de composition',
    durationMinutes: 30,
    startTime: '18:30',
    description: 'Analyser et pratiquer les principes de composition',
    color: '#f472b6', // pink-400
  },
];