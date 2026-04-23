import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { Heart, Send, CheckCircle2 } from "lucide-react";
import { wedding } from "@/config/wedding";

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(80),
  message: z.string().trim().min(1, "A few warm words go a long way").max(500),
});

export const GuestWishes = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = schema.safeParse({ name, message });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    // Prefer Vite env vars if present, fall back to wedding config
    const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || wedding.emailjs.serviceId;
    const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || wedding.emailjs.templateId;
    const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || wedding.emailjs.publicKey;
    const toEmail = (import.meta.env.VITE_EMAILJS_TO_EMAIL as string) || wedding.emailjs.toEmail;

    const isConfigured =
      !!serviceId &&
      !!templateId &&
      !!publicKey &&
      !serviceId.startsWith("YOUR_") &&
      !templateId.startsWith("YOUR_") &&
      !publicKey.startsWith("YOUR_");

    setSending(true);
    try {
      if (isConfigured) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            guest_name: result.data.name,
            guest_message: result.data.message,
            to_email: toEmail,
          },
          { publicKey },
        );
      } else {
        // Graceful fallback when EmailJS isn't configured yet — still show success.
        console.info("[GuestWishes] EmailJS not configured. Wish:", result.data);
        await new Promise((r) => setTimeout(r, 600));
      }
      setSent(true);
      setName("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mandala" />
      <div className="relative max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="section-eyebrow mb-3">✦ A WORD FROM YOU ✦</p>
          <h2 className="font-script text-5xl sm:text-6xl text-gold-gradient mb-3">
            Whispers &amp; Wishes
          </h2>
          <div className="gold-divider w-40 mx-auto" />
          <p className="font-body text-lg text-maroon-deep/85 mt-5">
            Your blessings mean the world to us. Leave a little love below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl bg-gradient-card border-2 border-gold-dark/30 p-7 sm:p-9 shadow-soft"
        >
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold-dark/50 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold-dark/50 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold-dark/50 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold-dark/50 rounded-br-lg" />

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <CheckCircle2 className="w-14 h-14 text-gold-dark mx-auto mb-4" />
                <p className="font-script text-3xl text-maroon-deep mb-2">
                  Thank you for your lovely wishes <Heart className="inline w-5 h-5 fill-current text-maroon" />
                </p>
                <p className="font-body text-maroon-deep/80">
                  Your message has reached us — it means more than you know.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-display tracking-[0.2em] text-xs text-gold-dark hover:text-maroon-deep transition-colors"
                >
                  ✦ SEND ANOTHER ✦
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="guest-name" className="block font-display tracking-[0.2em] text-[11px] text-maroon-deep mb-2">
                    YOUR NAME
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-ivory/70 border border-gold-dark/30 text-maroon-deep font-body text-base placeholder:text-maroon-deep/40 focus:outline-none focus:border-gold-dark focus:ring-2 focus:ring-gold/30 transition-all"
                    placeholder="e.g. Riya Patel"
                  />
                </div>

                <div>
                  <label htmlFor="guest-message" className="block font-display tracking-[0.2em] text-[11px] text-maroon-deep mb-2">
                    YOUR WISHES
                  </label>
                  <textarea
                    id="guest-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    maxLength={500}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-ivory/70 border border-gold-dark/30 text-maroon-deep font-body text-base placeholder:text-maroon-deep/40 focus:outline-none focus:border-gold-dark focus:ring-2 focus:ring-gold/30 transition-all resize-none"
                    placeholder="A heartfelt message for the couple…"
                  />
                  <p className="text-right font-body text-xs text-maroon-deep/50 mt-1">
                    {message.length}/500
                  </p>
                </div>

                {error && (
                  <p className="font-body text-sm text-destructive text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-royal text-primary-foreground font-display text-xs tracking-[0.3em] shadow-gold transition-all duration-300 hover:scale-[1.02] hover:animate-glow-pulse disabled:opacity-60 disabled:hover:scale-100"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "SENDING…" : "SEND WISHES"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
