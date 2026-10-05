import { INSTAGRAM, TESTIMONIALS } from "../../data/site";
import InstagramGlyph from "../ui/InstagramGlyph";
import AnimatedHeading from "../ui/AnimatedHeading";
import Reveal from "../ui/Reveal";

export default function Voices() {
  return (
    <section id="voices" className="scroll-mt-24 bg-ivory">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <p className="eyebrow text-madder">Voices from the circle</p>
          <AnimatedHeading className="mx-auto mt-4 max-w-2xl justify-center text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05]">
            Nine nights, reviewed
          </AnimatedHeading>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-parchment/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-marigold/50 hover:shadow-[0_30px_60px_-40px_rgb(15_20_38/0.6)]">
                <div className="text-marigold" aria-label="5 star review">
                  ★★★★★
                </div>
                <blockquote className="mt-4 flex-1 font-display text-[1.05rem] italic leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-marigold/50"
                    />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-night text-xs font-medium tracking-wider text-gold">
                      {t.initials}
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-medium text-ink">{t.name}</span>
                    <span className="block text-xs text-ink/50">{t.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Instagram strip */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-10">
          <div>
            <p className="eyebrow text-ink/45">Tag us</p>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-display text-2xl text-ink transition-colors hover:text-marigold"
            >
              <InstagramGlyph size={20} /> @mansi.nights
            </a>
          </div>
          <p className="max-w-sm text-sm text-ink/55">
            Best twirl of the season gets featured here — and ₹2,000 off your next chaniya.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">
          {INSTAGRAM.map((src, i) => (
            <Reveal key={src} delay={i * 0.05}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg bg-parchment"
              >
                <img
                  src={src}
                  alt="BTS from the MANSI floor"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-night/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <InstagramGlyph size={20} className="text-ivory" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
