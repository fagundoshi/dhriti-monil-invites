"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { wedding } from "@/config/wedding";

export const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        a.volume = 0.4;
        await a.play();
        setPlaying(true);
      }
    } catch (err) {
      console.error("Playback failed:", err);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.musicUrl}
        loop
        preload="auto"
        playsInline
      />

      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full"
      >
        {playing ? <Volume2 /> : <VolumeX />}
      </button>
    </>
  );
};