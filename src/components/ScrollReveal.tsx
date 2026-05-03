import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Particles } from "./Particles";

interface Props {
  onOpen: () => void;
}

/**
 * Luxury royal scroll reveal.
 * - Parchment scroll rolled closed vertically with a gold seal at the fold.
 * - On tap: seal lifts away, top rod rolls up, bottom rod rolls down,
 *   parchment unfurls and reveals the names.
 */
export const ScrollReveal = ({ onOpen }: Props) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 2200);
  };

  // Heights (in px) used to drive the rolled vs. unrolled animation.
  const closedH = 120; // visible parchment between rods when closed
  const openH = 460; // when fully unrolled

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #FBF4E6 0%, #F7F1E8 45%, #EFE3CE 100%)",
      }}
    >
      {/* Soft floral motif backdrop (very faint) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, #B58A49 0 1px, transparent 2px), radial-gradient(circle at 82% 30%, #B58A49 0 1px, transparent 2px), radial-gradient(circle at 30% 78%, #B58A49 0 1px, transparent 2px), radial-gradient(circle at 72% 82%, #B58A49 0 1px, transparent 2px)",
          backgroundSize: "260px 260px, 320px 320px, 280px 280px, 300px 300px",
        }}
      />
      {/* Golden vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(120, 80, 30, 0.18) 100%)",
        }}
      />
      {/* Soft depth blur layer behind scroll */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(181, 138, 73, 0.18)" }}
      />

      <Particles count={22} />

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mb-8 text-center font-serif-d text-[11px] sm:text-xs tracking-[0.42em]"
          style={{ color: "#9A7463" }}
        >
          ✦ TOGETHER WITH THEIR FAMILIES ✦
        </motion.p>

        {/* Scroll */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleOpen}
          className="relative mx-auto cursor-pointer select-none"
          style={{ width: "100%", maxWidth: 360 }}
        >
          {/* TOP ROD */}
          <motion.div
            className="relative z-20 mx-auto"
            animate={opened ? { y: -14, rotate: -2 } : { y: 0, rotate: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", height: 26 }}
          >
            <Rod />
          </motion.div>

          {/* PARCHMENT (between rods) */}
          <motion.div
            className="relative mx-auto overflow-hidden"
            initial={false}
            animate={{ height: opened ? openH : closedH }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "94%",
              background:
                "linear-gradient(180deg, #E3D2B8 0%, #F8F1E6 8%, #FFF9F0 50%, #F8F1E6 92%, #E3D2B8 100%)",
              boxShadow:
                "inset 0 0 60px rgba(180, 140, 80, 0.18), 0 14px 32px rgba(90, 55, 20, 0.18)",
              borderLeft: "1px solid rgba(180, 140, 80, 0.25)",
              borderRight: "1px solid rgba(180, 140, 80, 0.25)",
            }}
          >
            {/* Paper grain */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(160,120,70,0.08) 1px, transparent 1px), radial-gradient(rgba(160,120,70,0.06) 1px, transparent 1px)",
                backgroundSize: "3px 3px, 7px 7px",
                backgroundPosition: "0 0, 1px 2px",
              }}
            />
            {/* Warm edge aging */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(180,140,80,0.18) 0%, transparent 12%, transparent 88%, rgba(180,140,80,0.18) 100%)",
              }}
            />

            {/* Inner gold border frame — visible once open */}
            <motion.div
              className="absolute inset-4 rounded-sm"
              initial={false}
              animate={{ opacity: opened ? 1 : 0 }}
              transition={{ delay: opened ? 1.0 : 0, duration: 0.8 }}
              style={{ border: "1px solid rgba(181, 138, 73, 0.55)" }}
            >
              <div
                className="absolute inset-1 rounded-sm"
                style={{ border: "1px solid rgba(181, 138, 73, 0.22)" }}
              />
            </motion.div>

            {/* Names — revealed after unfurl */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              initial={false}
              animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 8 }}
              transition={{ delay: opened ? 1.1 : 0, duration: 0.9 }}
            >
              <p
                className="font-serif-d text-[10px] tracking-[0.4em]"
                style={{ color: "#9A7463" }}
              >
                ✦ WITH JOY ✦
              </p>
              <h2
                className="mt-4 font-script leading-tight"
                style={{
                  color: "#7C4A4A",
                  fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                }}
              >
                Dhriti
              </h2>
              <p
                className="my-1 font-serif-d text-lg italic"
                style={{ color: "#B58A49" }}
              >
                &
              </p>
              <h2
                className="font-script leading-tight"
                style={{
                  color: "#7C4A4A",
                  fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
                }}
              >
                Monil
              </h2>
              <div
                className="mt-5 h-px w-16"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #B58A49, transparent)",
                }}
              />
              <p
                className="mt-3 font-serif-d text-[10px] tracking-[0.35em]"
                style={{ color: "#9A7463" }}
              >
                25 · 06 · 2026
              </p>
            </motion.div>
          </motion.div>

          {/* BOTTOM ROD */}
          <motion.div
            className="relative z-20 mx-auto"
            animate={opened ? { y: 14, rotate: 2 } : { y: 0, rotate: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", height: 26 }}
          >
            <Rod />
          </motion.div>

          {/* SEAL — sits where the scroll fold meets, slightly below center */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                key="seal"
                className="pointer-events-none absolute left-1/2 z-30"
                style={{
                  top: "calc(50% + 6px)",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.04, 1], opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0, y: -30 }}
                transition={{
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.8 },
                }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-10 text-center font-serif-d italic text-sm"
              style={{
                color: "#8A6152",
                textShadow: "0 0 12px rgba(181, 138, 73, 0.35)",
              }}
            >
              tap to unveil
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Rod = () => (
  <div
    className="relative h-full w-full rounded-full"
    style={{
      background:
        "linear-gradient(180deg, #C89A55 0%, #B58A49 45%, #8E6738 100%)",
      boxShadow:
        "inset 0 2px 2px rgba(255,230,180,0.55), inset 0 -3px 4px rgba(60,35,10,0.45), 0 6px 14px rgba(80,50,15,0.35)",
    }}
  >
    {/* End caps */}
    <span
      className="absolute left-0 top-1/2 h-[140%] w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 35%, #C89A55, #8E6738 70%, #5A3E1A)",
        boxShadow: "0 4px 8px rgba(60,35,10,0.4)",
      }}
    />
    <span
      className="absolute right-0 top-1/2 h-[140%] w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 35%, #C89A55, #8E6738 70%, #5A3E1A)",
        boxShadow: "0 4px 8px rgba(60,35,10,0.4)",
        right: "-6px",
      }}
    />
    {/* Highlight stripe */}
    <span
      className="pointer-events-none absolute inset-x-3 top-[30%] h-[2px] rounded-full"
      style={{ background: "rgba(255, 235, 195, 0.55)" }}
    />
  </div>
);

const Seal = () => (
  <div
    className="relative flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
    style={{
      background:
        "radial-gradient(circle at 35% 30%, #E8C27A 0%, #B58A49 55%, #7A5524 100%)",
      boxShadow:
        "0 10px 24px rgba(80, 45, 10, 0.55), inset 0 2px 4px rgba(255,235,180,0.55), inset 0 -4px 8px rgba(60,35,10,0.5)",
    }}
  >
    {/* Decorative ring */}
    <div
      className="absolute inset-2 rounded-full"
      style={{ border: "1.5px dashed rgba(255, 235, 190, 0.55)" }}
    />
    <span
      className="font-script text-2xl sm:text-3xl"
      style={{
        color: "#FFF3D6",
        textShadow: "0 1px 2px rgba(60,30,10,0.6)",
      }}
    >
      D&M
    </span>
    {/* Soft outer glow */}
    <div
      className="pointer-events-none absolute -inset-2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(255, 215, 140, 0.35), transparent 70%)",
      }}
    />
  </div>
);
