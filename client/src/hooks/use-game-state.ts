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
  totalTimeRemaining: number;
  isGameOver: boolean;
  gameOverReason: string;
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
  gameStartTime: 0,
  totalTimeRemaining: 0,
  isGameOver: false,
  gameOverReason: ''
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const startGame = useCallback((level: GameLevel) => {
    // Starting words for each game - these will be the first words shown
    const startingWords = ['KUDA', 'BUKU', 'MATA', 'SAPI', 'NASI', 'AYAM', 'GULA', 'RAJA'];
    const randomStartingWord = startingWords[Math.floor(Math.random() * startingWords.length)];
    
    setGameState({
      ...initialState,
      level,
      lastLetter: randomStartingWord.charAt(randomStartingWord.length - 1).toLowerCase(),
      usedWords: [randomStartingWord], // Add the starting word to used words
      hintsRemaining: level.hintsAllowed ? 3 : 0,
      gameStartTime: Date.now(),
      totalTimeRemaining: level.totalTimeLimit,
      isGameOver: false,
      gameOverReason: ''
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

  const updateTotalTimeRemaining = useCallback((timeRemaining: number) => {
    setGameState(prev => ({
      ...prev,
      totalTimeRemaining: timeRemaining
    }));
  }, []);

  const setGameOver = useCallback((reason: string) => {
    setGameState(prev => ({
      ...prev,
      isGameOver: true,
      gameOverReason: reason
    }));
  }, []);

  const isGameComplete = gameState.level ? gameState.currentQuestion > gameState.level.questions : false;
  const isGameTimeUp = gameState.totalTimeRemaining <= 0;

  return {
    gameState,
    startGame,
    submitWord,
    useHint,
    resetGame,
    updateTotalTime,
    updateTotalTimeRemaining,
    setGameOver,
    isGameComplete,
    isGameTimeUp
  };
}
