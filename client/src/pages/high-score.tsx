import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { GameScore } from '@shared/schema';
import { gameLevels } from '@/lib/game-utils';

export default function HighScore() {
  const [, setLocation] = useLocation();

  const { data: scores = [], isLoading } = useQuery<GameScore[]>({
    queryKey: ['/api/scores'],
  });

  const getHighScoreByLevel = (levelId: number) => {
    const levelScores = scores.filter(score => score.level === levelId);
    return levelScores.length > 0 ? Math.max(...levelScores.map(s => s.score)) : 0;
  };

  const getTotalStats = () => {
    const totalGames = scores.length;
    const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
    return { totalGames, totalScore };
  };

  const handleResetScores = () => {
    localStorage.removeItem('high-scores');
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center">
            <p className="text-medium-gray">Memuat skor...</p>
          </div>
        </div>
      </div>
    );
  }

  const { totalGames, totalScore } = getTotalStats();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-dark-gray mb-2">🏆 High Score</h2>
          <p className="text-medium-gray text-sm">Skor tertinggi Anda</p>
        </div>

        {/* Score List */}
        <div className="space-y-4">
          {gameLevels.map((level) => (
            <div key={level.id} className={`${level.gradient} rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">Level {level.id} - {level.name}</h3>
                  <p className="text-white text-sm opacity-90">Skor Tertinggi</p>
                </div>
                <div className="text-white font-bold text-2xl">
                  {getHighScoreByLevel(level.id)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Stats */}
        <div className="bg-gray-50 rounded-xl p-4 mt-6">
          <div className="text-center">
            <h3 className="text-dark-gray font-bold mb-2">Statistik Total</h3>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="text-2xl font-bold text-coral">{totalGames}</p>
                <p className="text-medium-gray text-sm">Total Game</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-teal">{totalScore}</p>
                <p className="text-medium-gray text-sm">Total Skor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button 
          onClick={handleResetScores}
          className="w-full mt-6 bg-coral text-white py-3 rounded-xl font-semibold hover:bg-red-500 transition-colors duration-300"
        >
          🔄 Reset Semua Skor
        </Button>

        <Button 
          onClick={() => setLocation('/')}
          className="w-full mt-3 bg-medium-gray text-white py-3 rounded-xl font-semibold hover:bg-dark-gray transition-colors duration-300"
        >
          ← Kembali ke Menu
        </Button>
      </div>
    </div>
  );
}
