export interface GameLevel {
  id: number;
  name: string;
  description: string;
  questions: number;
  timeLimit: number; // 0 means no time limit
  icon: string;
  gradient: string;
  hintsAllowed: boolean;
}

export const gameLevels: GameLevel[] = [
  {
    id: 1,
    name: "Sangat Mudah",
    description: "20 soal • Tanpa batas waktu",
    questions: 20,
    timeLimit: 0,
    icon: "🌟",
    gradient: "gradient-mint-teal",
    hintsAllowed: true
  },
  {
    id: 2,
    name: "Mudah",
    description: "15 soal • 20 detik per kata",
    questions: 15,
    timeLimit: 20,
    icon: "⭐",
    gradient: "gradient-yellow-coral",
    hintsAllowed: true
  },
  {
    id: 3,
    name: "Sedang",
    description: "10 soal • 15 detik per kata",
    questions: 10,
    timeLimit: 15,
    icon: "🔥",
    gradient: "gradient-sky-purple",
    hintsAllowed: false
  },
  {
    id: 4,
    name: "Sulit",
    description: "5 soal • 10 detik per kata",
    questions: 5,
    timeLimit: 10,
    icon: "💀",
    gradient: "gradient-coral-gray",
    hintsAllowed: false
  }
];

export function getLastLetter(word: string): string {
  return word.charAt(word.length - 1).toLowerCase();
}

export function getFirstLetter(word: string): string {
  return word.charAt(0).toLowerCase();
}

export function generateRandomStartingLetter(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[Math.floor(Math.random() * letters.length)];
}

export function calculateScore(baseScore: number, timeBonus: number, level: number): number {
  const levelMultiplier = level * 0.5 + 0.5;
  return Math.floor((baseScore + timeBonus) * levelMultiplier);
}

export function formatTime(seconds: number): string {
  return seconds.toString();
}
