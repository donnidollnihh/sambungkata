import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/use-game-state';
import { useEffect } from 'react';
import { GameScore } from '@shared/schema';
import { gameLevels } from '@/lib/game-utils';

export default function GameOver() {
  const [, setLocation] = useLocation();
  const { gameState, resetGame } = useGameState();

  const { data: scores = [] } = useQuery<GameScore[]>({
    queryKey: ['/api/scores'],
  });

  const previousHighScore = gameState.level ? 
    Math.max(...scores.filter(s => s.level === gameState.level?.id).map(s => s.score), 0) : 0;
  
  const isNewHighScore = gameState.score > previousHighScore;

  const handlePlayAgain = () => {
    resetGame();
    setLocation('/level-selection');
  };

  const handleSelectNewLevel = () => {
    resetGame();
    setLocation('/level-selection');
  };

  const handleBackToMenu = () => {
    resetGame();
    setLocation('/');
  };

  const getAccuracy = () => {
    if (gameState.level && gameState.level.questions > 0) {
      return Math.round((gameState.correctWords / gameState.level.questions) * 100);
    }
    return 0;
  };

  const getAverageTime = () => {
    if (gameState.correctWords > 0) {
      return Math.round(gameState.totalTime / 1000 / gameState.correctWords);
    }
    return 0;
  };

  if (!gameState.level) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center">
            <p className="text-medium-gray">Game data not found</p>
            <Button 
              onClick={() => setLocation('/')}
              className="mt-4 bg-medium-gray text-white py-2 px-4 rounded-xl"
            >
              Back to Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {gameState.isGameOver && gameState.gameOverReason.includes('Waktu') ? '⏰' : '🎉'}
          </div>
          <h2 className="text-3xl font-bold text-dark-gray mb-2">
            {gameState.isGameOver && gameState.gameOverReason.includes('Waktu') ? 'Waktu Habis!' : 'Permainan Selesai!'}
          </h2>
          <p className="text-medium-gray text-sm">
            {gameState.isGameOver && gameState.gameOverReason ? gameState.gameOverReason : 'Selamat, Anda telah menyelesaikan permainan'}
          </p>
        </div>

        {/* Final Score Display */}
        <div className="gradient-coral-teal rounded-xl p-6 mb-6">
          <div className="text-center text-white">
            <p className="text-lg font-semibold mb-2">Skor Final</p>
            <p className="text-5xl font-bold">{gameState.score}</p>
            <p className="text-sm opacity-90 mt-2">
              Level {gameState.level.id} - {gameState.level.name}
            </p>
          </div>
        </div>

        {/* Game Statistics */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="text-dark-gray font-semibold mb-3 text-center">Statistik Permainan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-coral">{gameState.correctWords}</p>
              <p className="text-medium-gray text-sm">Kata Benar</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-teal">{gameState.hintsUsed}</p>
              <p className="text-medium-gray text-sm">Hint Digunakan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-sky">{getAverageTime()}s</p>
              <p className="text-medium-gray text-sm">Rata-rata Waktu</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warm-yellow">{getAccuracy()}%</p>
              <p className="text-medium-gray text-sm">Akurasi</p>
            </div>
          </div>
        </div>

        {/* High Score Notification */}
        {isNewHighScore && (
          <div className="gradient-yellow-purple rounded-xl p-4 mb-6">
            <div className="text-center text-white">
              <p className="font-semibold">🏆 Skor Tertinggi Baru!</p>
              <p className="text-sm opacity-90">Anda memecahkan rekor sebelumnya</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handlePlayAgain}
            className="w-full gradient-coral-teal text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            🔄 Main Lagi
          </Button>
          
          <Button 
            onClick={handleSelectNewLevel}
            className="w-full gradient-sky-purple text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            🎯 Pilih Level Lain
          </Button>
          
          <Button 
            onClick={handleBackToMenu}
            className="w-full bg-medium-gray text-white py-3 rounded-xl font-semibold hover:bg-dark-gray transition-colors duration-300"
          >
            🏠 Kembali ke Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
