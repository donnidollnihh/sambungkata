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
    <div className="flex flex-col items-center justify-center min-h-screen p-0 bg-gradient-to-br from-blue-200 via-cyan-100 to-pink-100">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center relative">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-dark-gray mb-2 drop-shadow-lg tracking-tight">Pilih Level</h2>
          <p className="text-medium-gray text-lg font-medium mb-4">Pilih tingkat kesulitan yang sesuai untuk memulai permainan</p>
          <div className="mt-2 p-3 bg-blue-50 rounded-xl flex items-center justify-center gap-2 shadow-sm">
            <span className="text-blue-600 text-xl">📚</span>
            <span className="text-blue-600 text-xs font-semibold">Menggunakan KBBI (Kamus Besar Bahasa Indonesia)</span>
          </div>
        </div>

        <div className="space-y-8 w-full mb-6">
          {gameLevels.sort((a, b) => a.id - b.id).map((level) => (
            <div
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              className={`relative group rounded-2xl p-6 cursor-pointer flex items-center justify-between shadow-lg border border-white/40 bg-white/30 backdrop-blur-md hover:scale-105 hover:border-blue-400 hover:bg-white/50 transition-all duration-300`}
            >
              {/* Badge rekomendasi untuk level 1 */}
              {level.id === 1 && (
                <span className="absolute top-2 right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full shadow">
                  Rekomendasi
                </span>
              )}
              <div>
                <h3 className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow">
                  Level {level.id} - {level.name}
                </h3>
                <p className="text-gray-800 text-sm opacity-90 font-medium">
                  Waktu {Math.floor(level.totalTimeLimit/60)} menit (soal tak terbatas), waktu per kata {level.timeLimit} detik, {level.hintsAllowed ? 'hint aktif' : 'tanpa hint'}
                </p>
              </div>
              <div className="text-4xl drop-shadow-lg group-hover:animate-bounce transition-transform duration-300">
                {level.icon}
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => setLocation('/')} 
          className="w-full mt-4 bg-medium-gray text-white py-3 rounded-xl font-semibold hover:bg-dark-gray transition-colors duration-300"
        >
          ← Kembali ke Menu
        </Button>

        {/* Footer */}
        <div className="mt-10 text-xs text-gray-400 text-center w-full">
          <hr className="mb-2" />
          <span>© 2024 Sambung Kata • Versi 1.0</span>
        </div>
      </div>
    </div>
  );
}
