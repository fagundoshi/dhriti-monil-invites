import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

interface Props {
  onOpen: () => void;
}

/**
 * Luxury Royal Scroll Reveal
 * Cinematic 4–6s unfurl: blurred fade-in → seal lift → rods part → parchment
 * unrolls → staggered text reveal. Ambient bokeh, light rays, floating petals,
 * golden dust and glassmorphism behind the scroll create a premium royal mood.
 */
export const ScrollReveal = ({ onOpen }: Props) => {
  const [opened, setOpened] = useState(false);
  const reduce = useReducedMotion();

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    // Total cinematic duration ~4.6s before handing off
    setTimeout(onOpen, reduce ? 600 : 4600);
  };

  const closedH = 110;
  const openH = 470;
  const EASE = [0.22, 1, 0.36, 1] as const;

  // Pre-computed bokeh, dust and petals
  const bokeh = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 60 + Math.random() * 140,
        delay: Math.random() * 6,
        dur: 10 + Math.random() * 10,
        opacity: 0.18 + Math.random() * 0.22,
      })),
    [],
  );
  const dust = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.2 + Math.random() * 2.4,
        delay: Math.random() * 8,
        dur: 9 + Math.random() * 10,
      })),
    [],
  );
  const petals = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 14 + Math.random() * 10,
        rot: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.6,
      })),
    [],
  );

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #FFF6E4 0%, #F6E9CF 38%, #E8D2A6 75%, #C9A66B 100%)",
      }}
    >
      {/* === Backdrop layers === */}

      {/* Animated silk gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          background:
            "conic-gradient(from 210deg at 50% 50%, rgba(255, 232, 188, 0.0) 0deg, rgba(255, 220, 160, 0.35) 90deg, rgba(255, 240, 205, 0.0) 180deg, rgba(220, 170, 90, 0.25) 270deg, rgba(255, 232, 188, 0.0) 360deg)",
          mixBlendMode: "screen",
          filter: "blur(40px)",
        }}
      />

      {/* Cinematic light rays */}
      <motion.div
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[140%] w-[140%] -translate-x-1/2"
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 0.55, rotate: 0 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        style={{
          background:
            "repeating-conic-gradient(from 200deg at 50% 0%, rgba(255, 235, 180, 0.0) 0deg, rgba(255, 230, 170, 0.10) 4deg, rgba(255, 235, 180, 0.0) 8deg)",
          filter: "blur(2px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Soft floral silhouettes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, #8B5A2B 0 2px, transparent 3px), radial-gradient(circle at 88% 22%, #8B5A2B 0 2px, transparent 3px), radial-gradient(circle at 22% 82%, #8B5A2B 0 2px, transparent 3px), radial-gradient(circle at 78% 86%, #8B5A2B 0 2px, transparent 3px)",
          backgroundSize: "320px 320px",
          filter: "blur(1px)",
        }}
      />

      {/* Bokeh lights */}
      <div className="pointer-events-none absolute inset-0">
        {bokeh.map((b) => (
          <motion.span
            key={b.id}
            className="absolute rounded-full"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: b.size,
              height: b.size,
              background:
                "radial-gradient(circle, rgba(255, 225, 170, 0.85) 0%, rgba(255, 205, 130, 0.35) 40%, rgba(255, 200, 120, 0) 70%)",
              filter: "blur(14px)",
              opacity: b.opacity,
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [b.opacity * 0.7, b.opacity, b.opacity * 0.7],
            }}
            transition={{
              duration: b.dur,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Golden dust particles */}
      <div className="pointer-events-none absolute inset-0">
        {dust.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: "rgba(255, 220, 150, 0.9)",
              boxShadow: "0 0 6px rgba(255, 210, 130, 0.7)",
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, -28, 0],
              x: [0, 6, 0],
              opacity: [0.2, 0.85, 0.2],
            }}
            transition={{
              duration: d.dur,
              delay: d.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {petals.map((p) => (
          <motion.span
            key={p.id}
            className="absolute -top-10"
            style={{
              left: `${p.left}%`,
              width: 14 * p.scale,
              height: 18 * p.scale,
              background:
                "radial-gradient(ellipse at 50% 30%, #F6C4B5 0%, #D68A78 70%, transparent 100%)",
              borderRadius: "60% 40% 60% 40%",
              filter: "blur(0.4px)",
              willChange: "transform",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, 24, -18, 12, 0],
              rotate: [p.rot, p.rot + 240],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Soft vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(80, 40, 10, 0.32) 100%)",
        }}
      />

      {/* Glassmorphism halo behind scroll */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 230, 180, 0.55) 0%, rgba(255, 215, 150, 0.18) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      {/* === Foreground === */}
      <div className="relative z-10 w-full max-w-[440px]">
        <motion.p
          initial={{ opacity: 0, y: -10, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
          transition={{ delay: 0.6, duration: 1.4, ease: EASE }}
          className="mb-10 text-center font-serif-d text-[11px] sm:text-xs"
          style={{ color: "#7C5238", textShadow: "0 1px 0 rgba(255,240,210,0.6)" }}
        >
          ✦ TOGETHER WITH THEIR FAMILIES ✦
        </motion.p>

        {/* Scroll wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)", y: 18 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
          onClick={handleOpen}
          className="relative mx-auto cursor-pointer select-none"
          style={{ width: "100%", maxWidth: 360, willChange: "transform, filter, opacity" }}
          whileHover={!opened ? { scale: 1.012 } : undefined}
          whileTap={!opened ? { scale: 0.985 } : undefined}
        >
          {/* TOP ROD */}
          <motion.div
            className="relative z-20 mx-auto"
            animate={opened ? { y: -22 } : { y: 0 }}
            transition={{ duration: 2.4, ease: EASE, delay: opened ? 0.6 : 0 }}
            style={{ width: "100%", height: 18 }}
          >
            <Rod />
          </motion.div>

          {/* PARCHMENT */}
          <motion.div
            className="relative mx-auto overflow-hidden"
            initial={false}
            animate={{
              height: opened ? openH : closedH,
              boxShadow: opened
                ? "inset 0 0 80px rgba(170, 125, 65, 0.22), 0 30px 70px rgba(80, 45, 10, 0.35), 0 8px 16px rgba(80, 45, 10, 0.18)"
                : "inset 0 0 50px rgba(170, 125, 65, 0.18), 0 14px 32px rgba(80, 45, 10, 0.25)",
            }}
            transition={{ duration: 2.6, ease: EASE, delay: opened ? 0.6 : 0 }}
            style={{
              width: "94%",
              background:
                "linear-gradient(180deg, #D8C29C 0%, #F4E8CE 6%, #FBF3DC 22%, #FFF9EA 50%, #FBF3DC 78%, #F4E8CE 94%, #D8C29C 100%)",
              borderLeft: "1px solid rgba(160, 120, 65, 0.35)",
              borderRight: "1px solid rgba(160, 120, 65, 0.35)",
            }}
          >
            {/* Paper grain */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(140,100,55,0.08) 1px, transparent 1px), radial-gradient(rgba(140,100,55,0.06) 1px, transparent 1px), radial-gradient(rgba(140,100,55,0.05) 1px, transparent 1px)",
                backgroundSize: "3px 3px, 7px 7px, 13px 13px",
                backgroundPosition: "0 0, 1px 2px, 3px 1px",
              }}
            />
            {/* Vertical fold creases */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(150,110,60,0.18) 0%, transparent 8%, rgba(255,250,235,0.35) 22%, transparent 40%, transparent 60%, rgba(255,250,235,0.35) 78%, transparent 92%, rgba(150,110,60,0.18) 100%)",
                mixBlendMode: "soft-light",
              }}
            />
            {/* Subtle horizontal fabric sheen */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 30%, rgba(255, 240, 200, 0.35) 50%, transparent 70%)",
                backgroundSize: "100% 200%",
              }}
              animate={{ backgroundPositionY: ["0%", "100%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner gold border frame */}
            <motion.div
              className="absolute inset-5 rounded-[2px]"
              initial={false}
              animate={{ opacity: opened ? 1 : 0 }}
              transition={{ delay: opened ? 2.4 : 0, duration: 0.9, ease: EASE }}
              style={{ border: "1px solid rgba(181, 138, 73, 0.7)" }}
            >
              <div
                className="absolute inset-[3px] rounded-[2px]"
                style={{ border: "1px solid rgba(181, 138, 73, 0.28)" }}
              />
              {/* Corner ornaments */}
              {([
                ["top-0 left-0", "0 0"],
                ["top-0 right-0", "100% 0"],
                ["bottom-0 left-0", "0 100%"],
                ["bottom-0 right-0", "100% 100%"],
              ] as const).map(([pos, origin], i) => (
                <span
                  key={i}
                  className={`absolute h-3 w-3 ${pos}`}
                  style={{
                    transform: `translate(${origin.startsWith("0") ? "-50%" : "50%"}, ${origin.endsWith("0") ? "-50%" : "50%"})`,
                    background:
                      "radial-gradient(circle, #C99B52 0%, #8E6738 70%, transparent 71%)",
                    borderRadius: "50%",
                  }}
                />
              ))}
            </motion.div>

            {/* Names — staggered reveal */}
            <RevealContent active={opened} />
          </motion.div>

          {/* BOTTOM ROD */}
          <motion.div
            className="relative z-20 mx-auto"
            animate={opened ? { y: 22 } : { y: 0 }}
            transition={{ duration: 2.4, ease: EASE, delay: opened ? 0.6 : 0 }}
            style={{ width: "100%", height: 18 }}
          >
            <Rod />
          </motion.div>

          {/* SEAL */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                key="seal"
                className="absolute left-1/2 z-30"
                style={{
                  top: "calc(50% + 4px)",
                  transform: "translate(-50%, -50%)",
                  willChange: "transform, opacity",
                }}
                initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.25, opacity: 0, y: -40, rotate: 8 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Seal />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hint */}
        <AnimatePresence>
          {!opened && (
            <motion.p
              key="hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mt-10 text-center font-serif-d italic text-sm tracking-[0.18em]"
              style={{
                color: "#7C5238",
                textShadow: "0 0 14px rgba(255, 220, 160, 0.6)",
              }}
            >
              <motion.span
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦ tap to unveil ✦
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ============================= Sub-components ============================= */

const RevealContent = ({ active }: { active: boolean }) => {
  const EASE = [0.22, 1, 0.36, 1] as const;
  const baseDelay = 2.6;
  const item = (i: number) => ({
    initial: { opacity: 0, y: 18, filter: "blur(6px)" },
    animate: active
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 18, filter: "blur(6px)" },
    transition: { duration: 0.9, ease: EASE, delay: baseDelay + i * 0.18 },
  });

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <motion.p
        {...item(0)}
        className="font-serif-d text-[10px] tracking-[0.42em]"
        style={{ color: "#9A6F4E" }}
      >
        ✦ WITH JOY ✦
      </motion.p>
      <motion.h2
        {...item(1)}
        className="mt-3 font-script leading-tight"
        style={{
          color: "#7C4A4A",
          fontSize: "clamp(2.4rem, 7.5vw, 3.4rem)",
          textShadow: "0 1px 0 rgba(255, 245, 220, 0.7)",
        }}
      >
        Dhriti
      </motion.h2>
      <motion.p
        {...item(2)}
        className="my-1 font-serif-d text-lg italic"
        style={{ color: "#B58A49" }}
      >
        &
      </motion.p>
      <motion.h2
        {...item(3)}
        className="font-script leading-tight"
        style={{
          color: "#7C4A4A",
          fontSize: "clamp(2.4rem, 7.5vw, 3.4rem)",
          textShadow: "0 1px 0 rgba(255, 245, 220, 0.7)",
        }}
      >
        Monil
      </motion.h2>
      <motion.div
        {...item(4)}
        className="mt-5 h-px w-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #B58A49, transparent)",
        }}
      />
      <motion.p
        {...item(5)}
        className="mt-3 font-serif-d text-[10px] tracking-[0.4em]"
        style={{ color: "#9A6F4E" }}
      >
        25 · 06 · 2026
      </motion.p>
    </div>
  );
};

const Rod = () => (
  <div className="relative h-full w-full" style={{ filter: "drop-shadow(0 6px 10px rgba(70, 40, 10, 0.4))" }}>
    <div
      className="absolute inset-x-0 top-0 h-full rounded-full"
      style={{
        background:
          "linear-gradient(180deg, #F1D38A 0%, #D9A857 20%, #B58A49 50%, #7E5824 85%, #5A3E1A 100%)",
        boxShadow:
          "inset 0 1px 1px rgba(255,240,200,0.85), inset 0 -2px 3px rgba(40,20,5,0.55)",
      }}
    />
    {/* Thin highlight */}
    <span
      className="pointer-events-none absolute inset-x-3 top-[26%] h-[1.5px] rounded-full"
      style={{ background: "rgba(255, 245, 215, 0.7)" }}
    />
    {/* End caps */}
    <span
      className="absolute -left-2 top-1/2 h-[160%] w-4 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 32% 30%, #F1D38A 0%, #B58A49 55%, #5A3E1A 100%)",
        boxShadow:
          "0 3px 6px rgba(50,25,5,0.5), inset 0 1px 1px rgba(255,240,200,0.6)",
      }}
    />
    <span
      className="absolute -right-2 top-1/2 h-[160%] w-4 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 32% 30%, #F1D38A 0%, #B58A49 55%, #5A3E1A 100%)",
        boxShadow:
          "0 3px 6px rgba(50,25,5,0.5), inset 0 1px 1px rgba(255,240,200,0.6)",
      }}
    />
  </div>
);

const Seal = () => (
  <div className="relative h-24 w-24 sm:h-28 sm:w-28">
    {/* Outer glow */}
    <div
      className="pointer-events-none absolute -inset-4 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(255, 220, 150, 0.55) 0%, transparent 70%)",
        filter: "blur(6px)",
      }}
    />
    {/* Medallion */}
    <div
      className="relative flex h-full w-full items-center justify-center rounded-full overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 25%, #FFE9B5 0%, #E5B967 28%, #B58A49 60%, #6E4A1E 100%)",
        boxShadow:
          "0 12px 28px rgba(70, 35, 5, 0.6), inset 0 2px 4px rgba(255,240,200,0.7), inset 0 -6px 10px rgba(40,20,5,0.55), 0 0 0 1.5px rgba(70,40,10,0.4)",
      }}
    >
      {/* Reflective shimmer sweep */}
      <motion.span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 35%, rgba(255, 248, 220, 0.75) 50%, transparent 65%)",
          mixBlendMode: "screen",
        }}
        animate={{ x: ["-60%", "60%"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Dashed inner ring */}
      <div
        className="absolute inset-[10px] rounded-full"
        style={{ border: "1px dashed rgba(255, 240, 200, 0.6)" }}
      />
      {/* Solid inner ring */}
      <div
        className="absolute inset-[4px] rounded-full"
        style={{ border: "1px solid rgba(110, 70, 20, 0.45)" }}
      />
      {/* Embossed monogram */}
      <span
        className="relative font-script text-3xl sm:text-[2.1rem]"
        style={{
          color: "#FFF4D6",
          textShadow:
            "0 1px 0 rgba(255,245,210,0.55), 0 -1px 1px rgba(50,25,5,0.7), 0 2px 3px rgba(40,20,5,0.55)",
          letterSpacing: "0.02em",
        }}
      >
        D&amp;M
      </span>
    </div>
    {/* Subtle pulsing ring */}
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-full"
      animate={{ boxShadow: [
        "0 0 0 0 rgba(255, 215, 140, 0.55)",
        "0 0 0 14px rgba(255, 215, 140, 0)",
      ] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
    />
  </div>
);
