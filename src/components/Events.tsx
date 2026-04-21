import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { wedding } from "@/config/wedding";

export const Events = () => {
  return (
    <section className="relative px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display tracking-[0.4em] text-xs text-maroon/70 mb-3">✦ JOIN US ✦</p>
          <h2 className="font-script text-6xl sm:text-7xl text-gold-gradient mb-4">Wedding Festivities</h2>
          <div className="gold-divider w-48 mx-auto" />
          <p className="font-body italic text-maroon/80 mt-6 max-w-xl mx-auto">
            Six days of love, music, colour and timeless tradition. We'd be honoured by your presence.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wedding.events.map((event, i) => (
            <motion.article
              key={event.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl bg-gradient-card border border-gold/40 p-7 shadow-soft overflow-hidden transition-all duration-500 hover:shadow-royal hover:-translate-y-2">
                {/* Corner ornaments */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold/60 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold/60 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold/60 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold/60 rounded-br-lg" />

                {/* Hover shimmer */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "linear-gradient(110deg, transparent 40%, hsl(var(--gold-light)/0.25) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s linear infinite",
                  }}
                />

                <div className="relative text-center">
                  <div className="text-5xl mb-3 transition-transform duration-500 group-hover:scale-110">
                    {event.emoji}
                  </div>
                  <h3 className="font-script text-4xl text-gold-gradient mb-1">{event.name}</h3>
                  <div className="gold-divider w-20 mx-auto my-3" />
                  <p className="font-display tracking-widest text-sm text-maroon-deep">{event.date}</p>
                  <p className="font-body text-base text-maroon/70 mt-1">{event.time}</p>
                  <p className="font-body italic text-maroon/80 mt-3 px-2">{event.venue}</p>

                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-royal text-primary-foreground font-display text-xs tracking-[0.2em] shadow-gold transition-all duration-300 hover:scale-105 hover:animate-glow-pulse"
                  >
                    <MapPin className="w-4 h-4" />
                    VIEW LOCATION
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 text-center"
        >
          <div className="gold-divider w-64 mx-auto mb-8" />
          <p className="font-script text-5xl text-gold-gradient">{wedding.bride} & {wedding.groom}</p>
          <p className="mt-4 font-body italic text-maroon/70">
            "And they lived happily ever after..."
          </p>
          <p className="mt-6 font-display tracking-[0.4em] text-xs text-maroon/60">
            {wedding.hashtag}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
