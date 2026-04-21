import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/config/wedding";

export const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
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

    // Gold foil layer
    const grd = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grd.addColorStop(0, "#b8862c");
    grd.addColorStop(0.3, "#f5d97a");
    grd.addColorStop(0.5, "#fff2c4");
    grd.addColorStop(0.7, "#e3b94a");
    grd.addColorStop(1, "#8a5f1a");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Texture noise
    for (let i = 0; i < 800; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1, 1);
    }

    ctx.fillStyle = "rgba(80, 40, 0, 0.85)";
    ctx.font = "600 22px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", rect.width / 2, rect.height / 2 - 12);
    ctx.font = "400 16px Cormorant Garamond, serif";
    ctx.fillText("the wedding date", rect.width / 2, rect.height / 2 + 16);
  }, []);

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
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // sparkle
    if (Math.random() > 0.6) {
      const id = Math.random();
      setSparkles((s) => [...s.slice(-12), { id, x, y }]);
      setTimeout(() => setSparkles((s) => s.filter((sp) => sp.id !== id)), 800);
    }

    // progress check (sample)
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    const step = 200;
    for (let i = 3; i < img.length; i += step * 4) {
      if (img[i] === 0) cleared++;
    }
    const pct = (cleared / (img.length / (step * 4))) * 100;
    setProgress(pct);
    if (pct > 55 && !revealed) {
      setRevealed(true);
      // wipe rest
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <section className="relative px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display tracking-[0.4em] text-xs text-maroon/70 mb-3">✦ SAVE THE DATE ✦</p>
          <h2 className="font-script text-5xl sm:text-6xl text-gold-gradient mb-3">A little surprise...</h2>
          <p className="font-body italic text-maroon/80 mb-10">
            Scratch the golden foil to unveil our most special day
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md aspect-[3/2] rounded-2xl shadow-royal overflow-hidden"
        >
          {/* Underlying date reveal */}
          <div className="absolute inset-0 bg-gradient-to-br from-ivory via-blush to-peach flex flex-col items-center justify-center p-6">
            <div className="absolute inset-3 border-2 border-gold/50 rounded-xl" />
            <div className="absolute inset-5 border border-gold/30 rounded-lg" />
            <p className="font-display tracking-[0.3em] text-xs text-maroon mb-2">SAVE THE DATE</p>
            <p className="font-script text-6xl sm:text-7xl text-gold-gradient leading-tight">
              {wedding.mainDate.split(" ").slice(0, 1).join(" ")}
            </p>
            <p className="font-display text-2xl sm:text-3xl text-maroon-deep mt-1 tracking-wider">
              {wedding.mainDate.split(" ").slice(1).join(" ").toUpperCase()}
            </p>
            <p className="mt-3 font-script text-xl text-maroon">{wedding.bride} ♥ {wedding.groom}</p>
          </div>

          {/* Scratch canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full touch-none cursor-grab active:cursor-grabbing"
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

          {/* Sparkles */}
          <AnimatePresence>
            {sparkles.map((s) => (
              <motion.span
                key={s.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute pointer-events-none w-2 h-2 rounded-full bg-gold-light"
                style={{
                  left: s.x - 4,
                  top: s.y - 4,
                  boxShadow: "0 0 12px hsl(var(--gold-light))",
                }}
              />
            ))}
          </AnimatePresence>

          {/* Burst on reveal */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1.5, 0],
                      x: Math.cos((i / 24) * Math.PI * 2) * 200,
                      y: Math.sin((i / 24) * Math.PI * 2) * 140,
                      opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute w-3 h-3 rounded-full bg-gold-light"
                    style={{ boxShadow: "0 0 20px hsl(var(--gold))" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!revealed && (
          <p className="mt-6 font-body text-sm text-maroon/60">
            {progress > 5 ? `${Math.min(100, Math.round((progress / 55) * 100))}% revealed...` : "Drag your finger or cursor across the gold ↑"}
          </p>
        )}
      </div>
    </section>
  );
};
