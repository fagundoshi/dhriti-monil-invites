import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/config/wedding";
import { celebrateConfetti } from "@/lib/confetti";

interface CoinProps {
  label: string;
  value: string;
  onRevealed: () => void;
  delay?: number;
}

const Coin = ({ label, value, onRevealed, delay = 0 }: CoinProps) => {
  const [revealed, setRevealed] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleReveal = () => {
    if (revealed) return;
    // sparkle burst
    const burst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: 50 + (Math.random() - 0.5) * 80,
    }));
    setSparkles(burst);
    setTimeout(() => setSparkles([]), 800);
    setRevealed(true);
    onRevealed();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center gap-3"
    >
      <button
        onClick={handleReveal}
        aria-label={`Reveal ${label}`}
        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-royal overflow-hidden ring-2 ring-gold-dark/50 focus:outline-none focus:ring-4 focus:ring-gold/60 transition-transform active:scale-95"
      >
        {/* underlying value */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ivory via-blush to-peach">
          <span className="font-display font-bold text-3xl sm:text-4xl text-maroon-deep leading-none">
            {value}
          </span>
        </div>

        {/* gold cover */}
        <AnimatePresence>
          {!revealed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2, rotate: 25 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, hsl(45 90% 75%) 0%, hsl(43 80% 55%) 35%, hsl(38 75% 32%) 75%, hsl(28 70% 22%) 100%)",
              }}
            >
              <span className="font-display font-semibold text-[11px] tracking-[0.2em] text-maroon-deep/90">
                {label}
              </span>
              <span className="font-body italic text-[11px] text-maroon-deep/80 mt-1">
                tap
              </span>
              {/* shimmer */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, hsl(45 95% 88% / 0.55) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s linear infinite",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* sparkles */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.span
              key={s.id}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute pointer-events-none w-1.5 h-1.5 rounded-full bg-gold-light"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                boxShadow: "0 0 12px hsl(45 90% 70%)",
              }}
            />
          ))}
        </AnimatePresence>
      </button>
      <p className="font-display tracking-[0.2em] text-[10px] text-maroon-deep font-semibold">
        {label}
      </p>
    </motion.div>
  );
};

export const TapReveal = () => {
  const [count, setCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);

  const handleRevealed = () => {
    setCount((c) => {
      const next = c + 1;
      if (next >= 3 && !allRevealed) {
        setAllRevealed(true);
        setTimeout(() => celebrateConfetti(), 200);
      }
      return next;
    });
  };

  return (
    <section className="relative px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-eyebrow mb-3">✦ SAVE OUR DAY ✦</p>
          <h2 className="font-script text-5xl sm:text-6xl text-gold-gradient mb-3">
            Unveil the Date
          </h2>
          <p className="font-body text-base text-maroon-deep mb-10 max-w-md mx-auto">
            Tap each golden coin to reveal the day, month and year of our wedding.
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-3 sm:gap-6 my-8">
          <Coin label="DAY" value={wedding.dateParts.day} onRevealed={handleRevealed} delay={0} />
          <span className="font-display text-2xl text-gold-dark font-bold">/</span>
          <Coin label="MONTH" value={wedding.dateParts.month} onRevealed={handleRevealed} delay={0.1} />
          <span className="font-display text-2xl text-gold-dark font-bold">/</span>
          <Coin label="YEAR" value={wedding.dateParts.year} onRevealed={handleRevealed} delay={0.2} />
        </div>

        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8"
            >
              <div className="gold-divider w-40 mx-auto mb-4" />
              <p className="font-script text-3xl sm:text-4xl text-maroon-deep">
                {wedding.bride} ♥ {wedding.groom}
              </p>
              <p className="mt-2 font-body italic text-maroon-deep">
                Mark your calendars — and your hearts.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!allRevealed && (
          <p className="mt-6 font-body text-sm text-maroon-deep/80">
            {count} of 3 revealed
          </p>
        )}
      </div>
    </section>
  );
};
