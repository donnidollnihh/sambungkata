import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameScoreSchema, insertGameSettingsSchema } from "@shared/schema";
import { z } from "zod";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load KBBI wordlist sekali saat server start
const kbbiWords = new Set(
  fs.readFileSync(path.join(__dirname, 'kbbi-wordlist.txt'), 'utf-8')
    .split('\n')
    .map(w => w.trim().toLowerCase())
    .filter(Boolean)
);

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get high scores
  app.get("/api/scores", async (req, res) => {
    try {
      const scores = await storage.getHighScores();
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scores" });
    }
  });

  // Get high score by level
  app.get("/api/scores/level/:level", async (req, res) => {
    try {
      const level = parseInt(req.params.level);
      const score = await storage.getHighScoreByLevel(level);
      res.json(score || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch score" });
    }
  });

  // Create new score
  app.post("/api/scores", async (req, res) => {
    try {
      const scoreData = insertGameScoreSchema.parse(req.body);
      const score = await storage.createGameScore(scoreData);
      res.json(score);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid score data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create score" });
      }
    }
  });

  // Get game settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getGameSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  // Update game settings
  app.post("/api/settings", async (req, res) => {
    try {
      const settingsData = insertGameSettingsSchema.parse(req.body);
      const settings = await storage.updateGameSettings(settingsData);
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid settings data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update settings" });
      }
    }
  });

  // Validate word
  app.post("/api/validate-word", async (req, res) => {
    try {
      const { word } = req.body;
      if (!word || typeof word !== 'string') {
        return res.status(400).json({ error: "Word is required" });
      }
      const isValid = kbbiWords.has(word.toLowerCase());
      res.json({ valid: isValid });
    } catch (error) {
      res.status(500).json({ error: "Failed to validate word" });
    }
  });

  // Get hint for letter
  app.post("/api/hint", async (req, res) => {
    try {
      const { letter } = req.body;
      if (!letter || typeof letter !== 'string') {
        return res.status(400).json({ error: "Letter is required" });
      }
      
      const hint = await storage.getHintForLetter(letter);
      res.json({ hint });
    } catch (error) {
      res.status(500).json({ error: "Failed to get hint" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
