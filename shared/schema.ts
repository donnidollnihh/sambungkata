import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const gameScores = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  level: integer("level").notNull(),
  score: integer("score").notNull(),
  wordsCorrect: integer("words_correct").notNull(),
  hintsUsed: integer("hints_used").notNull(),
  totalTime: integer("total_time").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const gameSettings = pgTable("game_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  soundEffects: boolean("sound_effects").default(true),
  backgroundMusic: boolean("background_music").default(false),
  defaultLevel: integer("default_level").default(1),
  autoHint: boolean("auto_hint").default(false),
  animations: boolean("animations").default(true),
  vibration: boolean("vibration").default(true),
});

export const insertGameScoreSchema = createInsertSchema(gameScores).omit({
  id: true,
  completedAt: true,
});

export const insertGameSettingsSchema = createInsertSchema(gameSettings).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GameScore = typeof gameScores.$inferSelect;
export type InsertGameScore = z.infer<typeof insertGameScoreSchema>;
export type GameSettings = typeof gameSettings.$inferSelect;
export type InsertGameSettings = z.infer<typeof insertGameSettingsSchema>;
