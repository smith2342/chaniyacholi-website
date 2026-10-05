import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { buttonVariants, cn } from "../../lib/utils";
import AnimatedHeading from "../ui/AnimatedHeading";
import Marquee from "../ui/Marquee";
import Reveal from "../ui/Reveal";

const px = (id: number, w: number, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${
    h ? `&h=${h}&fit=crop` : ""
  }`;

/** Front page model photography — every id verified to return HTTP 200. */
const HERO_IMAGE = px(34767007, 1100, 1400);
const DETAIL_IMAGE = px(35395108, 460, 460);
const FLOAT_IMAGE = px(38391084, 520, 650);
const HERO_AVATARS = [4595532, 16375797, 13584944, 9346172].map((id) => px(id, 96, 96));

const HERO_WORDS = ["Nine", "nights.", "One", "wardrobe."];

export default function Hero() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgWrap,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -70]);

  return (
    <section className="relative overflow-hidden">
      {/* ambient shapes */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-marigold/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-peacock/15 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-16 pt-14 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow flex items-center gap-3 text-madder"
          >
            <span className="inline-block h-px w-10 bg-madder" />
            Navratri Drop 01 — 2026
          </motion.p>

          <AnimatedHeading
            tag="h1"
            delay={0.15}
            stagger={0.09}
            className="mt-5 text-[clamp(2.7rem,6.6vw,5rem)] font-light leading-[0.98] tracking-[-0.02em] text-ink"
          >
            {HERO_WORDS.join(" ")}
          </AnimatedHeading>

          <p className="font-guj mt-3 text-lg text-ink/45" lang="gu">
            નવ રાત, એક અલમારી
          </p>

          <Reveal delay={0.35} className="mt-6 max-w-md">
            <p className="text-[1.02rem] leading-relaxed text-ink/65">
              Hand-cut chaniya choli with twelve-metre flares, real abhla mirrors and bandhani
              tied by hand in Kutch. Stitched for the garba floor — and everything after it.
            </p>
          </Reveal>

          <Reveal delay={0.45} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/shop" className={buttonVariants("accent", "shimmer-btn")}>
              Shop the drop
            </Link>
            <Link to="/#lookbook" className={buttonVariants("ghost")}>
              See the lookbook
            </Link>
          </Reveal>

          <Reveal delay={0.55} className="mt-9">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ink/10 pt-6 text-xs text-ink/60">
              <span className="flex items-center gap-3">
                <span className="flex -space-x-3">
                  {HERO_AVATARS.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Dancer ${i + 1} in a chaniya choli`}
                      loading="lazy"
                      className="h-9 w-9 rounded-full border-2 border-ivory object-cover shadow-sm"
                    />
                  ))}
                </span>
                <span>
                  <span className="text-marigold">★★★★★</span> 4.9 · 2,400+ dancers
                </span>
              </span>
              <span className="hidden h-3 w-px bg-ink/15 sm:block" />
              <span>Dispatch in 48 hours</span>
              <span className="hidden h-3 w-px bg-ink/15 sm:block" />
              <span>COD across India</span>
            </div>
          </Reveal>
        </div>

        {/* Imagery */}
        <div className="relative lg:col-span-6">
          <div
            ref={imgWrap}
            className="grain relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-parchment shadow-[0_50px_90px_-50px_rgb(15_20_38/0.55)] sm:aspect-[5/5] lg:aspect-[4/5]"
          >
            <motion.img
              src={HERO_IMAGE}
              alt="Woman posing in a red lehenga choli with intricate embroidery"
              style={{ y }}
              className="animate-kenburns absolute inset-0 h-[118%] w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent" />
          </div>

          {/* floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="animate-float absolute -left-2 top-8 rounded-2xl border border-ink/10 bg-ivory/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-6"
          >
            <p className="font-display text-2xl leading-none text-ink">12 m</p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-ink/55">
              flare, edge to edge
            </p>
          </motion.div>

          {/* beauty inset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 left-3 hidden w-32 overflow-hidden rounded-xl border-4 border-ivory shadow-xl sm:block md:w-40"
          >
            <img
              src={DETAIL_IMAGE}
              alt="Close-up of a woman in traditional jewellery and lehenga"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </motion.div>

          {/* second look inset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 7 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 right-2 hidden sm:block"
          >
            <div className="animate-float w-28 rotate-[4deg] overflow-hidden rounded-xl border-4 border-ivory shadow-xl md:w-36">
              <img
                src={FLOAT_IMAGE}
                alt="Woman in a traditional lehenga with ornate jewellery posing indoors"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </motion.div>

          {/* rotating seal */}
          <div className="absolute -right-3 -top-6 hidden h-28 w-28 sm:block lg:-right-6">
            <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
              <defs>
                <path
                  id="seal-path"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
              </defs>
              <circle cx="50" cy="50" r="46" fill="#fbf6ec" stroke="#e5d9c4" />
              <text
                fill="#1a130d"
                fontSize="7.6"
                letterSpacing="2.6"
                style={{ fontFamily: "Jost, sans-serif", textTransform: "uppercase" }}
              >
                <textPath href="#seal-path">
                  hand cut · hand stitched · bhuj · ahmedabad ·
                </textPath>
              </text>
              <circle cx="50" cy="50" r="9" fill="#f08a1d" />
              <circle cx="50" cy="50" r="4" fill="#0f1426" />
            </svg>
          </div>
        </div>
      </div>

      {/* Gujarati ticker */}
      <div className="border-y border-ink/10 bg-parchment/70 py-3">
        <Marquee>
          {[
            "ચણિયાચોળી",
            "Mirror work",
            "ગરબા",
            "Bandhani",
            "ગોટા પત્તી",
            "Twelve metre flare",
            "અભ્લા ભરત",
            "Handcrafted in Kutch",
          ].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-6 px-6">
              <span
                className={cn(
                  "text-lg text-ink/70",
                  i % 2 === 0 ? "font-guj" : "font-display italic",
                )}
              >
                {word}
              </span>
              <span className="mirror-dot h-1.5 w-1.5" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: Truck, title: "Free shipping", copy: "Over ₹2,999, everywhere in India" },
  { icon: RefreshCw, title: "7-day exchange", copy: "Wrong size? Send it back, easy" },
  { icon: BadgeCheck, title: "Hand-finished", copy: "Every mirror stitched, never glued" },
  { icon: ShieldCheck, title: "Secure payments", copy: "UPI, cards, COD via Razorpay" },
];

export function TrustBand() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {TRUST.map(({ icon: Icon, title, copy }, i) => (
          <Reveal key={title} delay={i * 0.08} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-parchment">
              <Icon size={17} strokeWidth={1.5} className="text-madder" />
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">{title}</span>
              <span className="block text-xs leading-relaxed text-ink/55">{copy}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
