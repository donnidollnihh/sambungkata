import { users, gameScores, gameSettings, type User, type InsertUser, type GameScore, type InsertGameScore, type GameSettings, type InsertGameSettings } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createGameScore(score: InsertGameScore): Promise<GameScore>;
  getHighScores(userId?: number): Promise<GameScore[]>;
  getHighScoreByLevel(level: number, userId?: number): Promise<GameScore | undefined>;
  
  getGameSettings(userId?: number): Promise<GameSettings | undefined>;
  updateGameSettings(settings: InsertGameSettings): Promise<GameSettings>;
  
  validateWord(word: string): Promise<boolean>;
  getHintForLetter(letter: string): Promise<string | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameScores: Map<number, GameScore>;
  private gameSettings: Map<number, GameSettings>;
  private currentUserId: number;
  private currentScoreId: number;
  private currentSettingsId: number;
  private indonesianWords: Set<string>;

  constructor() {
    this.users = new Map();
    this.gameScores = new Map();
    this.gameSettings = new Map();
    this.currentUserId = 1;
    this.currentScoreId = 1;
    this.currentSettingsId = 1;
    
    // Initialize Indonesian words dictionary
    this.indonesianWords = new Set([
      "apel", "lampu", "udang", "gajah", "harimau", "ular", "rumah", "hijau", "ubi",
      "ibu", "ubur", "raja", "ayam", "mobil", "langit", "tas", "sepatu", "ulat",
      "telur", "roti", "ikan", "nasi", "ice", "ember", "ringgit", "tikus", "semut",
      "topi", "iring", "gula", "air", "radio", "otak", "kaki", "iklan", "nanas",
      "sate", "ekor", "roda", "ada", "anak", "kucing", "guru", "uang", "gigi",
      "intan", "nilai", "ide", "elang", "garam", "mata", "anjing", "gelas",
      "sapi", "indah", "hijab", "buku", "urut", "taman", "nyonya", "anggur",
      "radio", "orangutan", "naga", "angsa", "api", "ikal", "lalat", "tikus",
      "singa", "abdi", "istana", "ayah", "hati", "iblis", "salon", "noda",
      "adik", "kuda", "api", "iman", "nuri", "iglesias", "lembu", "udara"
    ]);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createGameScore(insertScore: InsertGameScore): Promise<GameScore> {
    const id = this.currentScoreId++;
    const score: GameScore = { 
      ...insertScore, 
      id, 
      completedAt: new Date() 
    };
    this.gameScores.set(id, score);
    return score;
  }

  async getHighScores(userId?: number): Promise<GameScore[]> {
    let scores = Array.from(this.gameScores.values());
    if (userId) {
      scores = scores.filter(score => score.userId === userId);
    }
    return scores.sort((a, b) => b.score - a.score);
  }

  async getHighScoreByLevel(level: number, userId?: number): Promise<GameScore | undefined> {
    let scores = Array.from(this.gameScores.values())
      .filter(score => score.level === level);
    
    if (userId) {
      scores = scores.filter(score => score.userId === userId);
    }
    
    return scores.sort((a, b) => b.score - a.score)[0];
  }

  async getGameSettings(userId?: number): Promise<GameSettings | undefined> {
    if (userId) {
      return Array.from(this.gameSettings.values())
        .find(settings => settings.userId === userId);
    }
    return Array.from(this.gameSettings.values())[0];
  }

  async updateGameSettings(insertSettings: InsertGameSettings): Promise<GameSettings> {
    const existing = insertSettings.userId ? 
      Array.from(this.gameSettings.values()).find(s => s.userId === insertSettings.userId) :
      Array.from(this.gameSettings.values())[0];
    
    if (existing) {
      const updated = { ...existing, ...insertSettings };
      this.gameSettings.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentSettingsId++;
      const settings: GameSettings = { ...insertSettings, id };
      this.gameSettings.set(id, settings);
      return settings;
    }
  }

  async validateWord(word: string): Promise<boolean> {
    return this.indonesianWords.has(word.toLowerCase());
  }

  async getHintForLetter(letter: string): Promise<string | null> {
    const wordsStartingWithLetter = Array.from(this.indonesianWords)
      .filter(word => word.startsWith(letter.toLowerCase()));
    
    if (wordsStartingWithLetter.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * wordsStartingWithLetter.length);
    return wordsStartingWithLetter[randomIndex];
  }
}

export const storage = new MemStorage();
