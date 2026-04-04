/* Sound toggle button — mute/unmute sound effects */
import { Volume2, VolumeX } from "lucide-react";

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-[60] border border-terminal/15 bg-black/80
                 p-2 text-terminal/40 hover:text-terminal/70 hover:border-terminal/30
                 transition-all"
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </button>
  );
}
