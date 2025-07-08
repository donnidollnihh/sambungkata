import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}

export function PauseModal({ isOpen, onClose, onResume, onRestart, onQuit }: PauseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle className="text-2xl font-bold text-dark-gray text-center">
          Permainan Dipause
        </DialogTitle>
        <DialogDescription className="text-medium-gray text-sm text-center">
          Pilih tindakan Anda
        </DialogDescription>
        <div className="text-center space-y-6">
          <div className="text-4xl mb-4">⏸️</div>
          
          <div className="space-y-3">
            <Button 
              onClick={onResume}
              className="w-full gradient-coral-teal text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              ▶️ Lanjutkan
            </Button>
            
            <Button 
              onClick={onRestart}
              className="w-full gradient-yellow-purple text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              🔄 Mulai Ulang
            </Button>
            
            <Button 
              onClick={onQuit}
              className="w-full bg-medium-gray text-white py-3 rounded-xl font-semibold hover:bg-dark-gray transition-colors duration-300"
            >
              🏠 Kembali ke Menu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
