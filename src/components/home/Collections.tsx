import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COLLECTIONS } from "../../data/site";
import AnimatedHeading from "../ui/AnimatedHeading";
import Reveal from "../ui/Reveal";

export default function Collections() {
  return (
    <section id="collections" className="mx-auto max-w-[1400px] scroll-mt-28 px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow flex items-center gap-3 text-madder">
            <span className="inline-block h-px w-10 bg-madder" />
            Collections
          </p>
          <AnimatedHeading className="mt-4 max-w-xl text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.01em]">
            Three circles to dance in
          </AnimatedHeading>
        </div>
        <Reveal delay={0.15}>
          <p className="max-w-xs text-sm leading-relaxed text-ink/60">
            The floor, the wedding, the archive. Each collection is cut differently — flare,
            weight and mirror density all change with where you will wear it.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-5">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.12} className={i === 1 ? "md:mt-14" : ""}>
            <Link
              to={`/shop?category=${c.filter}`}
              className="group relative block overflow-hidden rounded-2xl bg-parchment"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
                <span className="rounded-full bg-ivory/90 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink backdrop-blur">
                  {c.count}
                </span>
                <span className="flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-marigold text-night opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5 text-ivory">
                <p className="font-guj text-sm text-marigold-light" lang="gu">
                  {c.titleGuj}
                </p>
                <h3 className="mt-1 font-display text-2xl leading-tight">{c.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/75 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {c.copy}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
