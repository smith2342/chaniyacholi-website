import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { buttonVariants } from "../../lib/utils";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden bg-marigold text-night">
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-night/15"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full border border-night/15"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <p className="eyebrow flex items-center gap-2 text-night/70">
            <Sparkles size={14} /> The garba list
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.05]">
            10% off your first chaniya,
            <br />
            <span className="italic">before the drop sells out.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-night/70">
            One letter a month: new drops, restock alerts and what the karigars are working on.
            No spam, ever.
          </p>
        </div>

        <div className="md:justify-self-end md:pl-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="flex items-center gap-4 rounded-2xl bg-night px-6 py-5 text-ivory"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-peacock">
                  <Check size={20} strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-display text-lg">You are on the list</p>
                  <p className="text-xs text-ivory/60">
                    Code FIRST10 is waiting in your inbox.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex w-full flex-col gap-3 sm:flex-row md:w-[480px]"
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-full border border-night/25 bg-ivory/95 px-6 py-3.5 text-sm text-ink placeholder:text-ink/40 focus:border-night focus:outline-none"
                />
                <button type="submit" className={buttonVariants("primary", "shrink-0 whitespace-nowrap")}>
                  Join the list
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="mt-3 text-xs text-night/60">
            By joining you agree to receive drop alerts. Unsubscribe in one click.
          </p>
        </div>
      </div>
    </section>
  );
}
