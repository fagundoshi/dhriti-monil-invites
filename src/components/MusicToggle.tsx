import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { wedding } from "@/config/wedding";

export const MusicToggle = ({ autoplay }: { autoplay: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [autoplay]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.volume = 0.4;
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.musicUrl} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-royal text-primary-foreground shadow-gold flex items-center justify-center transition-transform hover:scale-110 animate-glow-pulse"
      >
        {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
    </>
  );
};
