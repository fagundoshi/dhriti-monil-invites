import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/Envelope";
import { MainReveal } from "@/components/MainReveal";
import { TapReveal } from "@/components/TapReveal";
import { Events } from "@/components/Events";
import { MusicToggle } from "@/components/MusicToggle";
import { GuestWishes } from "@/components/GuestWishes";
import { wedding } from "@/config/wedding";
import { subtleConfetti } from "@/lib/confetti";

const Index = () => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    // gentle confetti when envelope opens
    setTimeout(() => subtleConfetti(), 400);
  };

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <Envelope onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Petals burst on landing/main reveal only */}
            <MainReveal showPetals />
            <TapReveal />
            <Events />
            <GuestWishes />
          </motion.div>
        )}
      </AnimatePresence>

      {opened && <MusicToggle autoplay />}

      {/* SEO h1 fallback for screen readers */}
      <h1 className="sr-only">
        {wedding.bride} &amp; {wedding.groom} Wedding Invitation — {wedding.mainDate}
      </h1>
    </main>
  );
};

export default Index;
