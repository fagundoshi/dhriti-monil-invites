import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import petalImg from "@/assets/petal.png";

interface Petal {
  id: number;
  x: number; // vw
  y: number; // vh
  rotate: number;
  size: number;
  // for burst phase
  vx?: number;
  vy?: number;
}

interface Props {
  burst?: boolean; // trigger initial dispersion burst
  scattered?: number; // number of resting petals after burst
}

/**
 * Intentional petal animation:
 * 1. On mount (burst=true), petals burst outward from center
 * 2. They settle in scattered positions across the screen
 * 3. Clicking/tapping any petal makes it gently bounce, glow, and fade
 */
export const PetalRain = ({ burst = true, scattered = 22 }: Props) => {
  const [phase, setPhase] = useState<"burst" | "rest">(burst ? "burst" : "rest");
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Initial burst petals — emanate from center
    const initial: Petal[] = Array.from({ length: scattered }, (_, i) => {
      const angle = (i / scattered) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 40 + Math.random() * 50;
      return {
        id: i,
        x: 50 + Math.cos(angle) * distance,
        y: 50 + Math.sin(angle) * distance * 0.7,
        rotate: Math.random() * 720 - 360,
        size: 20 + Math.random() * 22,
        vx: Math.cos(angle),
        vy: Math.sin(angle),
      };
    });
    setPetals(initial);

    const t = setTimeout(() => setPhase("rest"), 2000);
    return () => clearTimeout(t);
  }, [scattered]);

  const handlePetalClick = useCallback((id: number) => {
    setPetals((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, x: p.x + (Math.random() - 0.5) * 10, y: p.y + (Math.random() - 0.5) * 10, rotate: p.rotate + 180 }
          : p,
      ),
    );
    // Fade out after the bounce
    setTimeout(() => {
      setPetals((prev) => prev.filter((p) => p.id !== id));
    }, 900);
  }, []);

  return (
    <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {petals.map((p) => (
          <motion.img
            key={p.id}
            src={petalImg}
            alt=""
            aria-hidden
            onClick={() => handlePetalClick(p.id)}
            initial={
              phase === "burst"
                ? { left: "50%", top: "50%", scale: 0, rotate: 0, opacity: 0 }
                : false
            }
            animate={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              rotate: p.rotate,
              scale: 1,
              opacity: 0.9,
            }}
            exit={{ scale: 1.6, opacity: 0, rotate: p.rotate + 360 }}
            transition={{
              duration: phase === "burst" ? 1.6 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.25, filter: "drop-shadow(0 0 10px hsl(43 90% 60%))" }}
            whileTap={{ scale: 1.4 }}
            className="absolute pointer-events-auto cursor-pointer select-none -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              filter: "drop-shadow(0 2px 4px hsl(0 70% 25% / 0.25))",
            }}
            draggable={false}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
