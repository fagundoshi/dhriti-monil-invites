import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/config/wedding";
import { celebrateConfetti } from "@/lib/confetti";

interface CircleProps {
  label: string;
  value: string;
  onRevealed: () => void;
  delay?: number;
}

const ScratchCircle = ({ label, value, onRevealed, delay = 0 }: CircleProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const grd = ctx.createRadialGradient(
      rect.width / 2, rect.height / 2, 5,
      rect.width / 2, rect.height / 2, rect.width / 1.4,
    );
    grd.addColorStop(0, "#fff2c4");
    grd.addColorStop(0.4, "#f0c453");
    grd.addColorStop(0.8, "#a87320");
    grd.addColorStop(1, "#6b4513");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(rect.width / 2, rect.height / 2, rect.width / 2, 0, Math.PI * 2);
    ctx.fill();

    // texture
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.18})`;
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1, 1);
    }

    ctx.fillStyle = "rgba(50, 20, 0, 0.85)";
    ctx.font = "600 11px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, rect.width / 2, rect.height / 2 - 6);
    ctx.font = "400 10px Cormorant Garamond, serif";
    ctx.fillText("scratch", rect.width / 2, rect.height / 2 + 8);
  }, [label]);

  const getPos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (e: React.PointerEvent) => {
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.5) {
      const id = Math.random();
      setSparkles((s) => [...s.slice(-8), { id, x, y }]);
      setTimeout(() => setSparkles((s) => s.filter((sp) => sp.id !== id)), 700);
    }

    // progress check
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    let total = 0;
    const step = 200;
    for (let i = 3; i < img.length; i += step * 4) {
      total++;
      if (img[i] === 0) cleared++;
    }
    const pct = (cleared / total) * 100;
    if (pct > 45 && !revealed) {
      setRevealed(true);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      onRevealed();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-royal overflow-hidden ring-2 ring-gold-dark/40">
        {/* underlying value */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ivory via-blush to-peach">
          <span className="font-script text-4xl sm:text-5xl text-gold-gradient leading-none">{value}</span>
        </div>
        {/* canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none cursor-grab active:cursor-grabbing rounded-full"
          style={{ display: revealed ? "none" : "block" }}
          onPointerDown={(e) => {
            isDrawing.current = true;
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => (isDrawing.current = false)}
          onPointerLeave={() => (isDrawing.current = false)}
        />
        {/* sparkles */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.span
              key={s.id}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute pointer-events-none w-2 h-2 rounded-full bg-gold-light"
              style={{ left: s.x - 4, top: s.y - 4, boxShadow: "0 0 12px hsl(45 90% 70%)" }}
            />
          ))}
        </AnimatePresence>
      </div>
      <p className="font-display tracking-[0.2em] text-[10px] text-maroon-deep">{label}</p>
    </motion.div>
  );
};

export const ScratchCard = () => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);

  const handleRevealed = () => {
    setRevealedCount((c) => {
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
          <h2 className="font-script text-5xl sm:text-6xl text-gold-gradient mb-3">Unveil the Date</h2>
          <p className="font-body text-base text-maroon-deep/85 mb-10 max-w-md mx-auto">
            Gently scratch each golden coin to discover the day, month and year of our wedding.
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-4 sm:gap-8 my-8">
          <ScratchCircle label="DAY" value={wedding.dateParts.day} onRevealed={handleRevealed} delay={0} />
          <span className="font-display text-2xl text-gold-dark">/</span>
          <ScratchCircle label="MONTH" value={wedding.dateParts.month} onRevealed={handleRevealed} delay={0.1} />
          <span className="font-display text-2xl text-gold-dark">/</span>
          <ScratchCircle label="YEAR" value={wedding.dateParts.year} onRevealed={handleRevealed} delay={0.2} />
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
              <p className="mt-2 font-body italic text-maroon-deep/80">
                Mark your calendars — and your hearts.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!allRevealed && (
          <p className="mt-6 font-body text-sm text-maroon-deep/70">
            {revealedCount} of 3 revealed
          </p>
        )}
      </div>
    </section>
  );
};
