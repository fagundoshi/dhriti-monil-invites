import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import waxSeal from "@/assets/wax-seal.png";
import { Particles } from "./Particles";

interface Props {
  onOpen: () => void;
}

export const Envelope = ({ onOpen }: Props) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 1800);
  };

  return (
    <div className="ambient-glow relative flex min-h-screen items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      <Particles count={28} />

      <div className="relative w-full max-w-[540px]">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-8 text-center font-serif-d tracking-[0.45em] text-xs sm:text-sm text-terracotta"
        >
          ✦ AN INVITATION ✦
        </motion.p>

        {/* Envelope (3D, soft paper) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/3] w-full cursor-pointer"
          onClick={handleOpen}
          style={{ perspective: 1400 }}
        >
          {/* Envelope body */}
          <div
            className="absolute inset-0 rounded-md shadow-envelope overflow-hidden paper-texture"
            style={{ background: "var(--gradient-envelope-body)" }}
          >
            {/* gold inner edge */}
            <div className="absolute inset-[6px] rounded-sm border border-[hsl(var(--gold)/0.55)]" />
            <div className="absolute inset-[10px] rounded-sm border border-[hsl(var(--gold)/0.20)]" />
            {/* subtle inner shadow for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 30px 60px hsl(21 35% 25% / 0.18)" }}
            />
          </div>

          {/* Letter rising out */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -90, opacity: 1 }}
                transition={{ delay: 0.55, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-7 top-7 bottom-7 rounded-md bg-cream paper-texture shadow-card flex items-center justify-center border border-[hsl(var(--border))]"
              >
                <div className="absolute inset-2 border border-[hsl(var(--champagne-soft))] rounded-[6px]" />
                <p className="font-script text-4xl sm:text-5xl text-heading">Dhriti & Monil</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope flap (top triangle) */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top z-10"
            style={{
              height: "60%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "var(--gradient-envelope-flap)",
              boxShadow: "0 6px 18px hsl(18 35% 20% / 0.25)",
              transformStyle: "preserve-3d",
            }}
            animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* gold edging on flap */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--gold) / 0.35) 0%, transparent 30%)",
              }}
            />
          </motion.div>

          {/* Wax seal */}
          <motion.img
            src={waxSeal}
            alt="D & M monogram seal"
            className="absolute left-1/2 top-[60%] w-24 h-24 sm:w-28 sm:h-28 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-[0_8px_20px_hsl(18_35%_18%/0.55)]"
            animate={opened ? { scale: 0, opacity: 0, rotate: 180 } : { scale: [1, 1.04, 1] }}
            transition={opened ? { duration: 0.6 } : { duration: 3.2, repeat: Infinity }}
          />

          {/* Soft shimmer */}
          <div
            className="pointer-events-none absolute inset-0 rounded-md overflow-hidden"
            style={{
              background:
                "linear-gradient(110deg, transparent 35%, hsl(45 80% 85% / 0.22) 50%, transparent 65%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 7s linear infinite",
            }}
          />
        </motion.div>

        {!opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-10 text-center font-script text-2xl sm:text-3xl text-heading"
          >
            Tap to open
          </motion.p>
        )}
      </div>
    </div>
  );
};
