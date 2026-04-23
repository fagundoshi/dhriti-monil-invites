import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Calendar, Clock } from "lucide-react";
import { wedding, type WeddingEvent } from "@/config/wedding";

export const Events = () => {
  const [active, setActive] = useState<WeddingEvent | null>(null);

  return (
    <section className="relative px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-eyebrow mb-3">✦ JOIN US ✦</p>
          <h2 className="font-script text-6xl sm:text-7xl text-gold-gradient mb-4">Moments to Celebrate</h2>
          <div className="gold-divider w-48 mx-auto" />
          <p className="font-body text-lg text-maroon-deep/85 mt-6 max-w-xl mx-auto">
            Six sacred occasions, one unforgettable journey. Tap any moment to unfold the details.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {wedding.events.map((event, i) => (
            <motion.button
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setActive(event)}
              className="group relative rounded-2xl bg-gradient-card border border-gold-dark/30 p-6 sm:p-8 shadow-soft transition-all duration-500 hover:shadow-royal hover:border-gold-dark/60"
            >
              {/* corner ornaments */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold-dark/50 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold-dark/50 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-dark/50 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-dark/50 rounded-br-lg" />

              <div className="text-3xl sm:text-4xl mb-2 transition-transform duration-500 group-hover:scale-110">
                {event.emoji}
              </div>
              <h3 className="font-script text-3xl sm:text-4xl text-maroon-deep">{event.name}</h3>
              <div className="gold-divider w-12 mx-auto my-2" />
              <p className="font-display tracking-[0.2em] text-[10px] sm:text-xs text-gold-dark font-semibold">
                UNFOLD DETAILS
              </p>
            </motion.button>
          ))}
        </div>

        {/* Footer signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 text-center"
        >
          <div className="gold-divider w-64 mx-auto mb-8" />
          <p className="font-script text-5xl text-gold-gradient">
            {wedding.bride} &amp; {wedding.groom}
          </p>
          <p className="mt-4 font-body italic text-maroon-deep/80">
            "And so the forever begins…"
          </p>
          <p className="mt-6 font-display tracking-[0.4em] text-xs text-maroon-deep font-semibold">
            {wedding.hashtag}
          </p>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-deep/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-gradient-card border-2 border-gold-dark/50 p-8 shadow-royal"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-maroon-deep/10 hover:bg-maroon-deep/20 text-maroon-deep flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold-dark/60 rounded-tl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold-dark/60 rounded-br-lg" />

              <div className="text-center">
                <div className="text-5xl mb-2">{active.emoji}</div>
                <h3 className="font-script text-5xl text-gold-gradient mb-1">{active.name}</h3>
                <div className="gold-divider w-24 mx-auto my-3" />
                <p className="font-body italic text-maroon-deep/80 px-2 mb-6">{active.blurb}</p>

                <div className="space-y-3 text-left max-w-xs mx-auto">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gold-dark mt-0.5 shrink-0" />
                    <div>
                      <p className="font-display tracking-widest text-[10px] text-maroon-deep/60">DATE</p>
                      <p className="font-body text-maroon-deep font-semibold">{active.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-dark mt-0.5 shrink-0" />
                    <div>
                      <p className="font-display tracking-widest text-[10px] text-maroon-deep/60">TIME</p>
                      <p className="font-body text-maroon-deep font-semibold">{active.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-dark mt-0.5 shrink-0" />
                    <div>
                      <p className="font-display tracking-widest text-[10px] text-maroon-deep/60">VENUE</p>
                      <p className="font-body text-maroon-deep font-semibold">{active.venue}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={active.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-royal text-primary-foreground font-display text-xs tracking-[0.25em] shadow-gold transition-all duration-300 hover:scale-105 hover:animate-glow-pulse"
                >
                  <MapPin className="w-4 h-4" />
                  FIND THE WAY
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
