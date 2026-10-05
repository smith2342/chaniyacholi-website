import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { useRef } from "react";
import { LOOKBOOK } from "../../data/site";
import AnimatedHeading from "../ui/AnimatedHeading";
import Reveal from "../ui/Reveal";

export default function Lookbook() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <section id="lookbook" className="relative scroll-mt-24 overflow-hidden bg-night pb-24 pt-4 text-ivory md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ivory/10 pt-16">
          <div>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="inline-block h-px w-10 bg-gold" />
              Lookbook 01
            </p>
            <AnimatedHeading className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05]">
              From the floor, this season
            </AnimatedHeading>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-ivory/45 sm:flex">
              <MoveHorizontal size={14} /> Drag or scroll
            </span>
            <button
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-marigold hover:text-marigold"
              aria-label="Previous looks"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-marigold hover:text-marigold"
              aria-label="Next looks"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8"
        >
          {LOOKBOOK.map((look, i) => (
            <figure
              key={look.image}
              className="group relative w-[76vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-night-2 sm:w-[400px]"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={look.image}
                  alt={look.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-marigold-light">
                    {look.tag}
                  </p>
                  <p className="mt-1 font-display text-lg">{look.caption}</p>
                </div>
                <span className="font-display text-sm text-ivory/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
