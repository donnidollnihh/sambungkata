import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { gameLevels } from '@/lib/game-utils';
import { useState } from 'react';

export default function LevelSelection() {
  const [, setLocation] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevel(levelId);
    setLocation(`/game?level=${levelId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-dark-gray mb-2">Pilih Level</h2>
          <p className="text-medium-gray text-sm">Pilih tingkat kesulitan yang sesuai</p>
        </div>

        <div className="space-y-4">
          {gameLevels.sort((a, b) => a.id - b.id).map((level) => (
            <div
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              className={`${level.gradient} rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Level {level.id} - {level.name}
                  </h3>
                  <p className="text-white text-sm opacity-90">{level.description}</p>
                </div>
                <div className="text-2xl">{level.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => setLocation('/')}
          className="w-full mt-6 bg-medium-gray text-white py-3 rounded-xl font-semibold hover:bg-dark-gray transition-colors duration-300"
        >
          ← Kembali ke Menu
        </Button>
      </div>
    </div>
  );
}
