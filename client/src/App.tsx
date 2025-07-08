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
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Game Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-gray mb-2">Sambung Kata</h1>
          <p className="text-medium-gray text-sm">Game Kata Indonesia</p>
          <div className="mt-4 flex justify-center">
            <div className="gradient-coral-yellow rounded-full px-4 py-2">
              <span className="text-white font-semibold text-sm">🎮 Versi 1.0</span>
            </div>
          </div>
        </div>

        {/* Main Menu Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => setLocation('/level-selection')}
            className="w-full gradient-coral-teal text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2">▶️</span> Mulai Permainan
          </Button>
          
          <Button 
            onClick={() => setLocation('/high-score')}
            className="w-full gradient-yellow-purple text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2">🏆</span> High Score
          </Button>
          
          <Button 
            onClick={() => setLocation('/settings')}
            className="w-full gradient-mint-teal text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2">⚙️</span> Pengaturan
          </Button>
          
          <Button 
            onClick={() => window.close()}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2">❌</span> Keluar
          </Button>
        </div>
      </div>
    </div>
  );
}

function GameWrapper() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const levelId = parseInt(searchParams.get('level') || '1');
  const selectedLevel = gameLevels.find(level => level.id === levelId) || gameLevels[0];
  
  return <Game selectedLevel={selectedLevel} />;
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
