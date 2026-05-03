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
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      <Particles count={45} />

      <div className="relative w-full max-w-[520px]">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-8 text-center font-display tracking-[0.4em] text-sm text-heading/70"
        >
          ✦ AN INVITATION ✦
        </motion.p>

        {/* Envelope body */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/3] w-full cursor-pointer"
          onClick={handleOpen}
        >
          {/* Envelope back */}
          <div className="absolute inset-0 rounded-sm bg-gradient-envelope-body shadow-envelope overflow-hidden">
            <div className="absolute inset-0 bg-mandala opacity-30" />
            {/* Inner glow border */}
            <div className="absolute inset-2 border border-gold/40 rounded-sm" />
            <div className="absolute inset-3 border border-gold/20 rounded-sm" />
          </div>

          {/* Letter peeking out */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -80, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-6 top-6 bottom-6 rounded-sm bg-gradient-card shadow-soft flex items-center justify-center"
              >
                <p className="font-script text-4xl text-gold-gradient">Dhriti & Monil</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope flap (top triangle) */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top z-10"
            style={{
              height: "60%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "var(--gradient-envelope-body)",
              boxShadow: "0 4px 20px hsl(var(--ink) / 0.4)",
            }}
            animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-mandala opacity-30" />
          </motion.div>

          {/* Wax seal — sits where the flap tip meets the envelope body */}
          <motion.img
            src={waxSeal}
            alt="D & M monogram seal"
            className="absolute left-1/2 top-[60%] w-24 h-24 sm:w-28 sm:h-28 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-[0_8px_20px_hsl(var(--ink)/0.6)]"
            animate={opened ? { scale: 0, opacity: 0, rotate: 180 } : { scale: [1, 1.05, 1] }}
            transition={opened ? { duration: 0.6 } : { duration: 3, repeat: Infinity }}
          />

          {/* Shimmer overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-sm overflow-hidden"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, hsl(var(--gold-light) / 0.3) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 5s linear infinite",
            }}
          />
        </motion.div>

        {!opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-10 text-center font-script text-2xl text-heading animate-pulse"
          >
            ✨ Tap to open ✨
          </motion.p>
        )}
      </div>
    </div>
  );
};
