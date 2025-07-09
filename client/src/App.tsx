import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LevelSelection from "@/pages/level-selection";
import Game from "@/pages/game";
import HighScore from "@/pages/high-score";
import Settings from "@/pages/settings";
import GameOver from "@/pages/game-over";
import { Button } from "@/components/ui/button";
import { gameLevels } from "@/lib/game-utils";

function MainMenu() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 via-cyan-100 to-pink-100 p-0">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center relative">
        {/* Logo/Icon Besar */}
        <div className="text-6xl mb-4 drop-shadow-lg select-none">🔗</div>
        {/* Game Title */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-extrabold text-dark-gray mb-2 drop-shadow-lg tracking-tight">Sambung Kata</h1>
          <p className="text-medium-gray text-lg font-medium mb-2">Game Kata KBBI Indonesia</p>
        </div>
        {/* Info KBBI */}
        <div className="mb-8 w-full flex justify-center">
          <div className="bg-blue-50 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <span className="text-blue-600 text-lg">📚</span>
            <span className="text-blue-600 text-xs font-semibold">Menggunakan KBBI (Kamus Besar Bahasa Indonesia)</span>
          </div>
        </div>
        {/* Main Menu Buttons */}
        <div className="space-y-4 w-full">
          <Button 
            onClick={() => setLocation('/level-selection')}
            className="w-full gradient-coral-teal text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <span className="mr-2">▶️</span> Mulai Permainan
          </Button>
          <Button 
            onClick={() => setLocation('/high-score')}
            className="w-full gradient-yellow-purple text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <span className="mr-2">🏆</span> High Score
          </Button>
          <Button 
            onClick={() => setLocation('/settings')}
            className="w-full gradient-mint-teal text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <span className="mr-2">⚙️</span> Pengaturan
          </Button>
          <Button 
            onClick={() => window.close()}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <span className="mr-2">❌</span> Keluar
          </Button>
        </div>
        {/* Footer */}
        <div className="mt-10 text-xs text-gray-400 text-center w-full">
          <hr className="mb-2" />
          <span>© 2024 Sambung Kata • Versi 1.0</span>
        </div>
      </div>
    </div>
  );
}

function GameWrapper() {
  // Ambil parameter level dari URL
  const searchParams = new URLSearchParams(window.location.search);
  const levelId = parseInt(searchParams.get('level') || '1');
  const selectedLevel = gameLevels.find(level => level.id === levelId) || gameLevels[0];
  return <Game key={selectedLevel.id} selectedLevel={selectedLevel} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={MainMenu} />
      <Route path="/level-selection" component={LevelSelection} />
      <Route path="/game" component={GameWrapper} />
      <Route path="/high-score" component={HighScore} />
      <Route path="/settings" component={Settings} />
      <Route path="/game-over" component={GameOver} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
