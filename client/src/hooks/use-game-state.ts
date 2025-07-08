import { useState, useCallback } from 'react';
import { GameLevel } from '@/lib/game-utils';

export interface GameState {
  level: GameLevel | null;
  currentQuestion: number;
  score: number;
  usedWords: string[];
  hintsRemaining: number;
  lastLetter: string;
  correctWords: number;
  hintsUsed: number;
  totalTime: number;
  gameStartTime: number;
}

const initialState: GameState = {
  level: null,
  currentQuestion: 1,
  score: 0,
  usedWords: [],
  hintsRemaining: 3,
  lastLetter: '',
  correctWords: 0,
  hintsUsed: 0,
  totalTime: 0,
  gameStartTime: 0
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const startGame = useCallback((level: GameLevel) => {
    const startingLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    setGameState({
      ...initialState,
      level,
      lastLetter: startingLetter.toLowerCase(),
      hintsRemaining: level.hintsAllowed ? 3 : 0,
      gameStartTime: Date.now()
    });
  }, []);

  const submitWord = useCallback((word: string, timeBonus: number = 0) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + 10 + timeBonus,
      usedWords: [...prev.usedWords, word.toUpperCase()],
      lastLetter: word.charAt(word.length - 1).toLowerCase(),
      currentQuestion: prev.currentQuestion + 1,
      correctWords: prev.correctWords + 1
    }));
  }, []);

  const useHint = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      hintsRemaining: Math.max(0, prev.hintsRemaining - 1),
      hintsUsed: prev.hintsUsed + 1
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  const updateTotalTime = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      totalTime: Date.now() - prev.gameStartTime
    }));
  }, []);

  const isGameComplete = gameState.level ? gameState.currentQuestion > gameState.level.questions : false;

  return {
    gameState,
    startGame,
    submitWord,
    useHint,
    resetGame,
    updateTotalTime,
    isGameComplete
  };
}
