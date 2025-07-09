import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { GameSettings, InsertGameSettings } from '@shared/schema';

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [settings, setSettings] = useState<InsertGameSettings>({
    userId: null,
    soundEffects: true,
    backgroundMusic: false,
    defaultLevel: 1,
    autoHint: false,
    animations: true,
    vibration: true,
  });

  const { data: currentSettings, isLoading } = useQuery<GameSettings>({
    queryKey: ['/api/settings'],
  });

  const saveSettingsMutation = useMutation({
    mutationFn: (settingsData: InsertGameSettings) => 
      apiRequest('POST', '/api/settings', settingsData),
    onSuccess: () => {
      toast({
        title: "Pengaturan Tersimpan",
        description: "Pengaturan berhasil disimpan.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Gagal menyimpan pengaturan.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (currentSettings) {
      setSettings({
        userId: currentSettings.userId,
        soundEffects: currentSettings.soundEffects,
        backgroundMusic: currentSettings.backgroundMusic,
        defaultLevel: currentSettings.defaultLevel,
        autoHint: currentSettings.autoHint,
        animations: currentSettings.animations,
        vibration: currentSettings.vibration,
      });
    }
  }, [currentSettings]);

  const handleSaveSettings = () => {
    saveSettingsMutation.mutate(settings);
  };

  const updateSetting = (key: keyof InsertGameSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center">
            <p className="text-medium-gray">Memuat pengaturan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-dark-gray mb-2">⚙️ Pengaturan</h2>
          <p className="text-medium-gray text-sm">Sesuaikan pengalaman bermain</p>
          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
            <p className="text-blue-600 text-xs">📚 Menggunakan KBBI (Kamus Besar Bahasa Indonesia)</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Sound Settings */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-dark-gray font-semibold mb-4">🔊 Suara</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-medium-gray">Efek Suara</span>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-medium-gray">Musik Latar</span>
                <Switch
                  checked={settings.backgroundMusic}
                  onCheckedChange={(checked) => updateSetting('backgroundMusic', checked)}
                />
              </div>
            </div>
          </div>

          {/* Difficulty Preferences */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-dark-gray font-semibold mb-4">🎯 Preferensi Kesulitan</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-medium-gray">Level Default</span>
                <Select 
                  value={settings.defaultLevel?.toString()} 
                  onValueChange={(value) => updateSetting('defaultLevel', parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Pemula</SelectItem>
                    <SelectItem value="2">Menengah</SelectItem>
                    <SelectItem value="3">Sedang</SelectItem>
                    <SelectItem value="4">Sulit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-medium-gray">Auto-hint</span>
                <Switch
                  checked={settings.autoHint}
                  onCheckedChange={(checked) => updateSetting('autoHint', checked)}
                />
              </div>
            </div>
          </div>

          {/* Game Preferences */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-dark-gray font-semibold mb-4">🎮 Game</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-medium-gray">Animasi</span>
                <Switch
                  checked={settings.animations}
                  onCheckedChange={(checked) => updateSetting('animations', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-medium-gray">Getaran</span>
                <Switch
                  checked={settings.vibration}
                  onCheckedChange={(checked) => updateSetting('vibration', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <Button 
          onClick={handleSaveSettings}
          disabled={saveSettingsMutation.isPending}
          className="w-full mt-6 gradient-coral-teal text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          {saveSettingsMutation.isPending ? 'Menyimpan...' : '💾 Simpan Pengaturan'}
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
