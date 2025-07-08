import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameState } from '@/hooks/use-game-state';
import { useTimer } from '@/hooks/use-timer';
import { PauseModal } from '@/components/pause-modal';
import { GameLevel } from '@/lib/game-utils';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface GameProps {
  selectedLevel: GameLevel;
}

export default function Game({ selectedLevel }: GameProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [wordInput, setWordInput] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameInitialized, setIsGameInitialized] = useState(false);
  const { gameState, startGame, submitWord, useHint, resetGame, updateTotalTime, isGameComplete } = useGameState();

  const { time, isRunning, start, pause, reset, getProgress } = useTimer(
    selectedLevel.timeLimit,
    () => {
      if (!isGameComplete) {
        handleTimeUp();
      }
    }
  );

  useEffect(() => {
    if (!isGameInitialized) {
      startGame(selectedLevel);
      setIsGameInitialized(true);
    }
  }, [selectedLevel, isGameInitialized, startGame]);

  useEffect(() => {
    if (isGameInitialized && selectedLevel.timeLimit > 0) {
      setTimeout(() => {
        reset(selectedLevel.timeLimit);
        start();
      }, 100); // Small delay to ensure game state is fully set
    }
  }, [isGameInitialized, selectedLevel.timeLimit, reset, start]);

  useEffect(() => {
    if (isGameComplete) {
      updateTotalTime();
      handleGameComplete();
    }
  }, [isGameComplete, updateTotalTime]);

  const handleTimeUp = () => {
    toast({
      title: "Waktu Habis!",
      description: "Silakan coba lagi dengan kata yang berbeda.",
      variant: "destructive",
    });
    
    if (selectedLevel.timeLimit > 0) {
      reset(selectedLevel.timeLimit);
      start();
    }
  };

  const handleGameComplete = async () => {
    try {
      await apiRequest('POST', '/api/scores', {
        level: gameState.level?.id,
        score: gameState.score,
        wordsCorrect: gameState.correctWords,
        hintsUsed: gameState.hintsUsed,
        totalTime: Math.floor(gameState.totalTime / 1000),
        userId: null
      });
      
      setLocation('/game-over');
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };

  const validateAndSubmitWord = async (word: string) => {
    if (!word.trim()) {
      toast({
        title: "Kata Kosong",
        description: "Silakan masukkan kata yang valid.",
        variant: "destructive",
      });
      return;
    }

    const firstLetter = word.charAt(0).toLowerCase();
    const expectedLetter = gameState.lastLetter.toLowerCase();
    
    if (firstLetter !== expectedLetter) {
      toast({
        title: "Kata Salah",
        description: `Kata harus dimulai dengan huruf "${expectedLetter.toUpperCase()}"`,
        variant: "destructive",
      });
      return;
    }

    if (gameState.usedWords.includes(word.toUpperCase())) {
      toast({
        title: "Kata Sudah Digunakan",
        description: "Silakan gunakan kata yang berbeda.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/validate-word', { word });
      const { valid } = await response.json();
      
      if (valid) {
        const timeBonus = selectedLevel.timeLimit > 0 ? Math.max(0, time - 5) : 0;
        submitWord(word, timeBonus);
        setWordInput('');
        
        if (selectedLevel.timeLimit > 0) {
          reset(selectedLevel.timeLimit);
          start();
        }
        
        toast({
          title: "Kata Benar!",
          description: `+${10 + timeBonus} poin`,
        });
      } else {
        toast({
          title: "Kata Tidak Valid",
          description: "Kata tidak ditemukan dalam kamus bahasa Indonesia.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memvalidasi kata.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    validateAndSubmitWord(wordInput);
  };

  const handleUseHint = async () => {
    if (gameState.hintsRemaining <= 0) {
      toast({
        title: "Hint Habis",
        description: "Anda sudah menggunakan semua hint yang tersedia.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await apiRequest('POST', '/api/hint', { 
        letter: gameState.lastLetter 
      });
      const { hint } = await response.json();
      
      if (hint) {
        useHint();
        toast({
          title: "Hint",
          description: `Coba kata: "${hint.toUpperCase()}"`,
        });
      } else {
        toast({
          title: "Hint Tidak Tersedia",
          description: "Tidak ada hint untuk huruf ini.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengambil hint.",
        variant: "destructive",
      });
    }
  };

  const handlePause = () => {
    if (selectedLevel.timeLimit > 0) {
      pause();
    }
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    if (selectedLevel.timeLimit > 0) {
      start();
    }
  };

  const handleRestart = () => {
    setIsPaused(false);
    setIsGameInitialized(false);
    resetGame();
    setWordInput('');
    // Timer will be restarted by the useEffect when isGameInitialized changes
  };

  const handleQuit = () => {
    setLocation('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <p className="text-medium-gray text-sm">Level {gameState.level?.id}</p>
            <p className="text-dark-gray font-bold text-xl">{gameState.level?.name}</p>
          </div>
          <div className="text-center">
            <p className="text-medium-gray text-sm">Skor</p>
            <p className="text-coral font-bold text-xl">{gameState.score}</p>
          </div>
        </div>

        {/* Timer Display */}
        {selectedLevel.timeLimit > 0 && (
          <div className="gradient-coral-yellow rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-sm opacity-90">Waktu Tersisa</p>
                <p className="text-2xl font-bold">{time}s</p>
                <p className="text-xs opacity-75">
                  Status: {isRunning ? 'Berjalan' : 'Berhenti'} | Limit: {selectedLevel.timeLimit}s
                </p>
              </div>
              <div className="text-3xl">⏰</div>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        )}

        {/* Question Display */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-medium-gray text-sm mb-2">
              Soal {gameState.currentQuestion} dari {gameState.level?.questions}
            </p>
            {gameState.currentQuestion === 1 ? (
              <div>
                <p className="text-dark-gray font-semibold mb-4">Kata pertama:</p>
                <div className="gradient-coral-teal rounded-xl p-4 inline-block mb-2">
                  <span className="text-white font-bold text-2xl">
                    {gameState.usedWords[0] || 'MEMUAT...'}
                  </span>
                </div>
                <p className="text-medium-gray text-sm">
                  Masukkan kata yang dimulai dengan huruf "<strong>{gameState.lastLetter.toUpperCase()}</strong>"
                </p>
              </div>
            ) : (
              <div>
                <p className="text-dark-gray font-semibold mb-4">Kata terakhir berakhiran:</p>
                <div className="gradient-coral-teal rounded-xl p-4 inline-block">
                  <span className="text-white font-bold text-3xl">
                    {gameState.lastLetter.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Word Input */}
        <div className="mb-6">
          <Input
            type="text"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            placeholder={`Masukkan kata yang dimulai dengan huruf ${gameState.lastLetter.toUpperCase()}...`}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-coral focus:outline-none text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={isLoading}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 gradient-coral-teal text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? 'Memvalidasi...' : 'Kirim Kata'}
          </Button>
          {gameState.level?.hintsAllowed && (
            <Button 
              onClick={handleUseHint}
              disabled={gameState.hintsRemaining <= 0}
              className="px-6 gradient-yellow-purple text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              💡 Hint ({gameState.hintsRemaining})
            </Button>
          )}
        </div>

        {/* Used Words Display */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-medium-gray text-sm mb-2">Kata yang sudah digunakan:</p>
          <div className="flex flex-wrap gap-2 min-h-[32px]">
            {gameState.usedWords.map((word, index) => (
              <span key={index} className="bg-mint text-white px-3 py-1 rounded-full text-sm">
                {word}
              </span>
            ))}
            {gameState.usedWords.length === 0 && (
              <span className="text-medium-gray text-sm">Belum ada kata yang digunakan</span>
            )}
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex gap-3">
          <Button 
            onClick={handlePause}
            className="flex-1 bg-medium-gray text-white py-3 rounded-xl font-semibold hover:bg-dark-gray transition-colors duration-300"
          >
            ⏸️ Pause
          </Button>
          <Button 
            onClick={handleQuit}
            className="flex-1 bg-medium-gray text-white py-3 rounded-xl font-semibold hover:bg-dark-gray transition-colors duration-300"
          >
            🏠 Menu
          </Button>
        </div>
      </div>

      <PauseModal
        isOpen={isPaused}
        onClose={() => setIsPaused(false)}
        onResume={handleResume}
        onRestart={handleRestart}
        onQuit={handleQuit}
      />
    </div>
  );
}
