import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MUSE_ROW_A, MUSE_ROW_B, MUSE_WALL, type Muse } from "../../data/site";
import { buttonVariants } from "../../lib/utils";
import AnimatedHeading from "../ui/AnimatedHeading";
import Marquee from "../ui/Marquee";
import Reveal from "../ui/Reveal";

function MuseTile({ look }: { look: Muse }) {
  return (
    <Link
      to="/shop"
      aria-label={`Shop this look — ${look.alt}`}
      className="group relative mr-4 block w-[62vw] shrink-0 overflow-hidden rounded-2xl bg-parchment sm:w-[248px] md:w-[272px]"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={look.image}
          alt={look.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-night/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute bottom-3 left-3 flex translate-y-2 items-center gap-1.5 rounded-full bg-ivory/92 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.2em] text-ink opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        Shop the look <ArrowUpRight size={12} strokeWidth={2} />
      </span>
    </Link>
  );
}

export default function Muses() {
  return (
    <section id="muses" className="relative overflow-hidden bg-ivory py-20 md:py-28">
      {/* ambient shapes */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-rani/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-marigold/15 blur-3xl"
      />

      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 md:px-8">
        <div>
          <p className="eyebrow flex items-center gap-3 text-madder">
            <span className="inline-block h-px w-10 bg-madder" />
            The muses · #MANSINights
          </p>
          <AnimatedHeading className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.01em]">
            Every flare, worn by someone real
          </AnimatedHeading>
        </div>
        <Reveal delay={0.15}>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Sixty looks from the last two seasons — photographed on dancers in Ahmedabad and Bhuj,
            never on mannequins. Tag @mansi.nights and yours lands on this wall.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-11">
        <Marquee>
          {MUSE_ROW_A.map((look) => (
            <MuseTile key={look.image} look={look} />
          ))}
        </Marquee>
      </Reveal>

      <Reveal delay={0.2} className="mt-4">
        <Marquee reverse>
          {MUSE_ROW_B.map((look) => (
            <MuseTile key={look.image} look={look} />
          ))}
        </Marquee>
      </Reveal>

      <div className="mx-auto mt-5 max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {MUSE_WALL.map((look, i) => (
            <Reveal key={look.image} delay={(i % 4) * 0.07}>
              <Link
                to="/shop"
                aria-label={`Shop this look — ${look.alt}`}
                className="group relative block overflow-hidden rounded-2xl bg-parchment"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-night/65 via-night/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-marigold py-3 text-center text-[0.6rem] uppercase tracking-[0.28em] text-night transition-transform duration-400 ease-out group-hover:translate-y-0">
                  Shop the look
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link to="/shop" className={buttonVariants("primary", "shimmer-btn")}>
            Shop the full drop
          </Link>
          <Link to="/#lookbook" className={buttonVariants("ghost")}>
            Flip through the lookbook
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
