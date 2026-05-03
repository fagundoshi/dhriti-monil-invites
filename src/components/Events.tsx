import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Calendar, Clock } from "lucide-react";
import { wedding, type WeddingEvent } from "@/config/wedding";

export const Events = () => {
  const [active, setActive] = useState<WeddingEvent | null>(null);

  return (
    <section className="relative px-4 py-24 overflow-hidden bg-soft-1">
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
          <h2 className="font-display text-4xl sm:text-5xl text-heading mb-4">
            Moments to Celebrate
          </h2>
          <div className="gold-divider w-48 mx-auto" />
          <p className="font-body text-lg text-ink mt-6 max-w-xl mx-auto">
            Six sacred occasions, one unforgettable journey. Tap any moment to unfold the details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {wedding.events.map((event, i) => (
            <motion.button
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setActive(event)}
              className="group relative rounded-2xl bg-cream paper-texture border p-7 sm:p-8 shadow-paper transition-all duration-500 hover:shadow-card text-left"
              style={{ borderColor: "hsl(36 39% 74%)" }}
            >
              <div className="absolute top-2 left-2 w-7 h-7 border-t border-l border-[hsl(var(--gold)/0.55)] rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-7 h-7 border-t border-r border-[hsl(var(--gold)/0.55)] rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-7 h-7 border-b border-l border-[hsl(var(--gold)/0.55)] rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-7 h-7 border-b border-r border-[hsl(var(--gold)/0.55)] rounded-br-lg" />

              <div className="text-3xl mb-2 transition-transform duration-500 group-hover:scale-110">
                {event.emoji}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-heading-soft">{event.name}</h3>
              <div className="gold-divider w-12 my-2" />
              <p className="font-body text-base text-ink mb-4">{event.date}</p>
              <p className="font-serif-d tracking-[0.2em] text-[10px] sm:text-xs text-terracotta font-semibold">
                UNFOLD DETAILS →
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 text-center"
        >
          <div className="gold-divider w-64 mx-auto mb-8" />
          <p className="font-script text-5xl text-heading">
            {wedding.bride} &amp; {wedding.groom}
          </p>
          <p className="mt-4 font-body italic text-ink">
            "And so the forever begins…"
          </p>
          <p className="mt-6 font-serif-d tracking-[0.4em] text-xs text-terracotta font-semibold">
            {wedding.hashtag}
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/55 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-cream paper-texture border p-8 shadow-card"
              style={{ borderColor: "hsl(var(--gold) / 0.45)" }}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-ink/10 hover:bg-ink/20 text-ink flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-[hsl(var(--gold)/0.6)] rounded-tl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-[hsl(var(--gold)/0.6)] rounded-br-lg" />

              <div className="text-center">
                <div className="text-5xl mb-2">{active.emoji}</div>
                <h3 className="font-display text-3xl sm:text-4xl text-heading mb-1">{active.name}</h3>
                <div className="gold-divider w-24 mx-auto my-3" />
                <p className="font-body italic text-ink px-2 mb-6">{active.blurb}</p>

                <div className="space-y-4 text-left max-w-xs mx-auto">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
                    <div>
                      <p className="font-serif-d tracking-widest text-[10px] text-ink/60">DATE</p>
                      <p className="font-body text-ink font-semibold">{active.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
                    <div>
                      <p className="font-serif-d tracking-widest text-[10px] text-ink/60">TIME</p>
                      <p className="font-body text-ink font-semibold">{active.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
                    <div>
                      <p className="font-serif-d tracking-widest text-[10px] text-ink/60">VENUE</p>
                      <p className="font-body text-ink font-semibold">{active.venue}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={active.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-terracotta text-primary-foreground font-serif-d text-xs tracking-[0.25em] shadow-gold transition-all duration-300 hover:scale-105"
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
