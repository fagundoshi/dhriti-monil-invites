import { useEffect, useState } from "react";
import petalImg from "@/assets/petal.png";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  rotate: number;
}

export const PetalRain = ({ count = 18, continuous = true }: { count?: number; continuous?: boolean }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const make = (n: number, baseDelay = 0): Petal[] =>
      Array.from({ length: n }, (_, i) => ({
        id: Math.random(),
        left: Math.random() * 100,
        delay: baseDelay + Math.random() * 6,
        duration: 8 + Math.random() * 8,
        size: 18 + Math.random() * 28,
        drift: (Math.random() - 0.5) * 300,
        rotate: Math.random() * 360,
      }));

    setPetals(make(count));
    if (!continuous) return;
    const interval = setInterval(() => {
      setPetals((prev) => [...prev.slice(-count * 2), ...make(Math.ceil(count / 2))]);
    }, 4000);
    return () => clearInterval(interval);
  }, [count, continuous]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((p) => (
        <img
          key={p.id}
          src={petalImg}
          alt=""
          aria-hidden
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s forwards`,
            ['--drift' as string]: `${p.drift}px`,
            transform: `rotate(${p.rotate}deg)`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
};
