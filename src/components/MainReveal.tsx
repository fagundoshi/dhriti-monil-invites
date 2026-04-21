import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import brideGroom from "@/assets/bride-groom.png";

export const MainReveal = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
        {/* Left ornament */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="hidden md:block text-right"
        >
          <p className="font-display tracking-[0.3em] text-xs text-maroon/60 mb-2">WITH BLESSINGS</p>
          <div className="gold-divider w-32 ml-auto" />
        </motion.div>

        {/* Center: names + couple */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-display tracking-[0.4em] text-xs sm:text-sm text-maroon/70 mb-4"
          >
            ✦ TOGETHER WITH OUR FAMILIES ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="font-script text-7xl sm:text-8xl md:text-9xl leading-none text-gold-gradient drop-shadow-[0_4px_20px_hsl(var(--gold)/0.3)]"
          >
            {wedding.bride}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="my-3 flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold" />
            <span className="font-script text-3xl sm:text-4xl text-maroon">&</span>
            <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="font-script text-7xl sm:text-8xl md:text-9xl leading-none text-gold-gradient drop-shadow-[0_4px_20px_hsl(var(--gold)/0.3)]"
          >
            {wedding.groom}
          </motion.h1>

          <motion.img
            src={brideGroom}
            alt="Bride and groom illustration"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.4 }}
            className="mx-auto mt-8 w-48 sm:w-64 md:hidden"
            loading="lazy"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1.2 }}
            className="mt-8 font-body italic text-lg sm:text-xl text-maroon/80 max-w-xl mx-auto leading-relaxed"
          >
            "{wedding.poeticLine}"
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6, duration: 1 }}
            className="mt-6 font-display tracking-[0.5em] text-sm text-gold-dark"
          >
            {wedding.hashtag}
          </motion.p>
        </div>

        {/* Right: bride/groom illustration on desktop */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 1.4 }}
          className="hidden md:block"
        >
          <img
            src={brideGroom}
            alt="Indian bride and groom in traditional attire"
            className="w-full max-w-xs drop-shadow-[0_15px_40px_hsl(var(--maroon)/0.3)]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};
