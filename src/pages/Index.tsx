import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Envelope } from "@/components/Envelope";
import { MainReveal } from "@/components/MainReveal";
import { ScratchCard } from "@/components/ScratchCard";
import { Events } from "@/components/Events";
import { PetalRain } from "@/components/PetalRain";
import { MusicToggle } from "@/components/MusicToggle";
import { wedding } from "@/config/wedding";

const Index = () => {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <Envelope onOpen={() => setOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <PetalRain count={20} />
            <MainReveal />
            <ScratchCard />
            <Events />
          </motion.div>
        )}
      </AnimatePresence>

      {opened && <MusicToggle autoplay />}

      {/* SEO h1 fallback for screen readers */}
      <h1 className="sr-only">
        {wedding.bride} & {wedding.groom} Wedding Invitation — {wedding.mainDate}
      </h1>
    </main>
  );
};

export default Index;
