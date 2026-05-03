import { motion } from "framer-motion";

export const FamilyNote = () => {
  return (
    <section className="relative px-4 py-24 overflow-hidden bg-note">
      <div className="absolute inset-0 bg-mandala" />
      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="section-eyebrow mb-3">✦ A HEARTFELT NOTE ✦</p>
          <h2 className="font-display text-4xl sm:text-5xl text-heading">
            A Note From Our Family
          </h2>
          <div className="gold-divider w-40 mx-auto mt-5" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -0.6 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
        >
          <div
            className="relative rounded-lg paper-texture shadow-card border px-7 py-10 sm:px-12 sm:py-14"
            style={{
              backgroundColor: "hsl(36 100% 97%)",
              borderColor: "hsl(36 39% 74%)",
            }}
          >
            {/* corner ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[hsl(var(--gold)/0.6)] rounded-tl" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[hsl(var(--gold)/0.6)] rounded-tr" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[hsl(var(--gold)/0.6)] rounded-bl" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[hsl(var(--gold)/0.6)] rounded-br" />

            <h3 className="text-center font-script text-4xl sm:text-5xl text-heading mb-6">
              With love &amp; blessings
            </h3>

            <p className="font-body text-lg sm:text-xl text-ink leading-relaxed text-center">
              With hearts full of joy, our families warmly invite you to celebrate
              this beautiful beginning with us. Your blessings, love, and presence
              will make this occasion even more special.
            </p>

            <div className="gold-divider w-32 mx-auto my-7" />

            <p className="text-center font-body italic text-ink-soft">With love,</p>
            <p className="text-center font-script text-3xl sm:text-4xl text-heading mt-1">
              The Families of Dhriti &amp; Monil
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
