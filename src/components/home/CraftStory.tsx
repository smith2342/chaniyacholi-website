import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PROCESS, STATS } from "../../data/site";
import AnimatedHeading from "../ui/AnimatedHeading";
import Reveal from "../ui/Reveal";

const MAIN_IMG =
  "https://images.pexels.com/photos/16182245/pexels-photo-16182245.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1250&fit=crop";
const SIDE_IMG =
  "https://images.pexels.com/photos/31508152/pexels-photo-31508152.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function CraftStory() {
  const collage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: collage, offset: ["start end", "end start"] });
  const mainY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const sideY = useTransform(scrollYProgress, [0, 1], [-30, 40]);

  return (
    <section id="craft" className="relative scroll-mt-24 overflow-hidden bg-night text-ivory">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20">
        {/* Collage */}
        <div ref={collage} className="relative">
          <motion.div
            style={{ y: mainY }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-night-2"
          >
            <img
              src={MAIN_IMG}
              alt="Karigars embroidering fabric by hand in the Bhuj workshop"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: sideY }}
            className="absolute -bottom-8 -right-2 w-40 overflow-hidden rounded-xl border border-ivory/20 shadow-2xl md:-right-8 md:w-56"
          >
            <img
              src={SIDE_IMG}
              alt="Handloom weaving colourful fabric in a Jodhpur workshop"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </motion.div>

          <div className="absolute -left-3 top-6 rounded-full border border-gold/40 bg-night/80 px-4 py-2 text-[0.62rem] uppercase tracking-[0.24em] text-gold backdrop-blur md:-left-6">
            Est. 2016 · Gujarat
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="inline-block h-px w-10 bg-gold" />
            The craft
          </p>
          <AnimatedHeading className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05]">
            Made by hands you can name
          </AnimatedHeading>

          <Reveal delay={0.15} className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-ivory/70">
            <p>
              Every chaniya begins as flat cloth on a table in Bhuj. Mirrors are laid one by one,
              gota petals are cut by scissors (never punch-pressed), and bandhani is tied in knots
              small enough that a thumb covers three at once.
            </p>
            <p>
              We pay per piece, not per hour — so the karigar who finishes your flare has every
              reason to make it perfect. Fourteen families, one floor, no middlemen.
            </p>
          </Reveal>

          {/* Stats */}
          <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <p className="font-display text-[2rem] leading-none text-gold">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[0.66rem] uppercase tracking-[0.16em] text-ivory/50">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Process */}
          <div className="mt-10 space-y-5 border-l border-ivory/15 pl-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={0.1 + i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-[1.92rem] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-marigold text-[0.6rem] font-semibold text-night">
                    {p.step}
                  </span>
                  <h3 className="font-display text-lg text-ivory">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ivory/60">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35} className="mt-9">
            <Link
              to="/info#size-guide"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-ivory hover:text-night"
            >
              Measurements & size guide
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
