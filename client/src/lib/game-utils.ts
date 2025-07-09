export interface GameLevel {
  id: number;
  name: string;
  description: string;
  // questions: number; // Hapus jumlah soal
  timeLimit: number; // time per word in seconds
  totalTimeLimit: number; // total game time limit in seconds
  icon: string;
  gradient: string;
  hintsAllowed: boolean;
}

export const gameLevels: GameLevel[] = [
  {
    id: 1,
    name: "Pemula",
    description: "Waktu 4 menit (soal tak terbatas), waktu per kata 30 detik, hint aktif",
    timeLimit: 30, // 30 seconds per word
    totalTimeLimit: 240, // 4 minutes total
    icon: "🌟",
    gradient: "gradient-mint-teal",
    hintsAllowed: true
  },
  {
    id: 2,
    name: "Menengah",
    description: "Waktu 3 menit (soal tak terbatas), waktu per kata 20 detik, tanpa hint",
    timeLimit: 20, // 20 seconds per word
    totalTimeLimit: 180, // 3 minutes total
    icon: "⭐",
    gradient: "gradient-yellow-coral",
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
