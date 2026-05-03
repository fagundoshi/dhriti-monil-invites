import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import brideGroom from "@/assets/bride-groom.png";
import { PetalRain } from "./PetalRain";

interface Props {
  showPetals?: boolean;
}

export const MainReveal = ({ showPetals = false }: Props) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      {showPetals && <PetalRain burst scattered={22} />}

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="section-eyebrow mb-4"
        >
          ✦ WITH THE BLESSINGS OF OUR FAMILIES ✦
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="gold-divider w-40 mx-auto mb-8"
        />

        {/* BRIDE */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-script text-7xl sm:text-8xl md:text-9xl leading-none text-gold-gradient"
        >
          {wedding.bride}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9 }}
          className="mt-3 font-display tracking-[0.25em] text-xs sm:text-sm text-ink font-semibold"
        >
          {wedding.brideParents}
        </motion.p>

        {/* AMPERSAND */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="my-5 flex items-center justify-center gap-4"
        >
          <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold-dark" />
          <span className="font-script text-4xl sm:text-5xl text-ink">&amp;</span>
          <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold-dark" />
        </motion.div>

        {/* GROOM */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="font-script text-7xl sm:text-8xl md:text-9xl leading-none text-gold-gradient"
        >
          {wedding.groom}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.9 }}
          className="mt-3 font-display tracking-[0.25em] text-xs sm:text-sm text-ink font-semibold"
        >
          {wedding.groomParents}
        </motion.p>

        <motion.img
          src={brideGroom}
          alt="Indian bride and groom in traditional attire"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 1.2 }}
          className="mx-auto mt-10 w-56 sm:w-64 md:w-72 drop-shadow-[0_15px_30px_hsl(0_70%_22%/0.35)]"
          loading="lazy"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-8 font-body italic text-lg sm:text-xl text-ink max-w-xl mx-auto leading-relaxed"
        >
          “{wedding.poeticLine}”
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.9 }}
          className="mt-6 font-display tracking-[0.5em] text-sm text-gold-dark font-semibold"
        >
          {wedding.hashtag}
        </motion.p>
      </div>
    </section>
  );
};
