export interface GameLevel {
  id: number;
  name: string;
  description: string;
  questions: number;
  timeLimit: number; // time per word in seconds
  totalTimeLimit: number; // total game time limit in seconds
  icon: string;
  gradient: string;
  hintsAllowed: boolean;
}

export const gameLevels: GameLevel[] = [
  {
    id: 1,
    name: "Very Easy",
    description: "20 soal • 10 menit total",
    questions: 20,
    timeLimit: 30, // 30 seconds per word
    totalTimeLimit: 600, // 10 minutes total
    icon: "🌟",
    gradient: "gradient-mint-teal",
    hintsAllowed: true
  },
  {
    id: 2,
    name: "Easy", 
    description: "15 soal • 6 menit total",
    questions: 15,
    timeLimit: 20, // 20 seconds per word
    totalTimeLimit: 360, // 6 minutes total
    icon: "⭐",
    gradient: "gradient-yellow-coral",
    hintsAllowed: true
  },
  {
    id: 3,
    name: "Medium",
    description: "10 soal • 3 menit total", 
    questions: 10,
    timeLimit: 15, // 15 seconds per word
    totalTimeLimit: 180, // 3 minutes total
    icon: "🔥",
    gradient: "gradient-sky-purple",
    hintsAllowed: false
  },
  {
    id: 4,
    name: "Hard",
    description: "5 soal • 1 menit total",
    questions: 5,
    timeLimit: 10, // 10 seconds per word
    totalTimeLimit: 60, // 1 minute total
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
