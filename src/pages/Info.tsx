import { Mail, MapPin, Phone } from "lucide-react";
import { SIZE_GUIDE, SITE } from "../data/site";

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Orders dispatch within 48 hours from Ahmedabad. Most metro cities receive in 2–3 days, the rest of India in 3–5 days. During the last week of Navratri, add a day.",
  },
  {
    q: "Can I get the blouse stitched to my measurements?",
    a: "Yes. After checkout we email you a short measurement sheet — bust, waist, shoulder and sleeve. Reply with it and the choli is cut for you at no extra cost.",
  },
  {
    q: "Do you ship outside India?",
    a: "We do — DHL express, 4–7 days, charged at actuals. Email us your pincode and we will quote before you order.",
  },
  {
    q: "Are the mirrors real glass?",
    a: "On the Kutchi and Navratri collections, yes — real abhla glass, hand-stitched. Kids styles use lightweight reflective PVC mirrors for safety.",
  },
];

export default function Info() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 pb-24 pt-12 md:px-8 md:pt-16">
      <p className="eyebrow flex items-center gap-3 text-madder">
        <span className="inline-block h-px w-10 bg-madder" />
        Care & policies
      </p>
      <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.4rem)] font-light leading-[1.05]">
        Everything before & after the order
      </h1>

      {/* Shipping */}
      <section id="shipping" className="mt-14 scroll-mt-32 border-t border-ink/10 pt-8">
        <h2 className="font-display text-2xl">Shipping & delivery</h2>
        <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink/65">
          <p>
            Free India-wide shipping on orders over ₹2,999. Below that, a flat ₹99. Everything
            ships from our Law Garden studio in Ahmedabad within 48 working hours, with tracking
            sent by SMS and email.
          </p>
          <p>
            Cash on delivery is available across India (₹49 handling, waived over ₹4,999).
            International orders go by DHL express — email us for a quote.
          </p>
        </div>
      </section>

      {/* Exchange */}
      <section id="exchange" className="mt-12 scroll-mt-32 border-t border-ink/10 pt-8">
        <h2 className="font-display text-2xl">Size exchange</h2>
        <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink/65">
          <p>
            Size didn't land? Tell us within 7 days of delivery and we arrange a free pickup —
            keep the tags and the muslin bag on. Exchanges are subject to the piece being unworn,
            unwashed and undamaged.
          </p>
          <p>
            Made-to-measure blouses are stitched for you and can't be exchanged, but we will alter
            them once for free. Returns for genuine defects are always accepted, whenever you
            write.
          </p>
        </div>
      </section>

      {/* Size guide */}
      <section id="size-guide" className="mt-12 scroll-mt-32 border-t border-ink/10 pt-8">
        <h2 className="font-display text-2xl">Size guide</h2>
        <p className="mt-3 text-[0.95rem] text-ink/65">
          Body measurements in inches. The lehenga is adjustable two inches at the drawstring; the
          choli is stitched to the measurements you send us.
        </p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-ink/10">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead className="bg-parchment/70">
              <tr className="text-left text-xs uppercase tracking-[0.12em] text-ink/55">
                <th className="px-5 py-3">Size</th>
                <th className="px-5 py-3">Bust</th>
                <th className="px-5 py-3">Waist</th>
                <th className="px-5 py-3">Hip</th>
                <th className="px-5 py-3">Lehenga length</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE.map((r, i) => (
                <tr key={r.size} className={i % 2 ? "bg-parchment/30" : ""}>
                  <td className="border-t border-ink/8 px-5 py-3 font-medium">{r.size}</td>
                  <td className="border-t border-ink/8 px-5 py-3 text-ink/65">{r.bust}"</td>
                  <td className="border-t border-ink/8 px-5 py-3 text-ink/65">{r.waist}"</td>
                  <td className="border-t border-ink/8 px-5 py-3 text-ink/65">{r.hip}"</td>
                  <td className="border-t border-ink/8 px-5 py-3 text-ink/65">{r.length}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Care */}
      <section id="care" className="mt-12 scroll-mt-32 border-t border-ink/10 pt-8">
        <h2 className="font-display text-2xl">Care instructions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Mirror & gota pieces", "Dry clean only. Never wring — press the water out flat."],
            ["Bandhani & georgette", "First wash: cold hand wash separately. Dry clean after."],
            ["Zari & dabka", "Steam on low from the reverse. No direct iron on the metal work."],
            ["Storage", "Fold in the muslin bag it arrives in, away from direct sunlight."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-xl border border-ink/10 bg-parchment/40 p-5">
              <h3 className="text-sm font-medium uppercase tracking-[0.12em]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 border-t border-ink/10 pt-8">
        <h2 className="font-display text-2xl">Common questions</h2>
        <div className="mt-5 space-y-5">
          {FAQS.map((f) => (
            <div key={f.q} className="border-l-2 border-marigold pl-5">
              <h3 className="font-display text-lg">{f.q}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/65">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-12 scroll-mt-32 rounded-2xl bg-night p-8 text-ivory md:p-10">
        <h2 className="font-display text-2xl">Talk to a human</h2>
        <p className="mt-2 text-sm text-ivory/60">
          WhatsApp for measurements, call for bridal orders — someone from the studio answers,
          not a bot.
        </p>
        <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-ivory/80 transition-colors hover:text-marigold">
            <Mail size={15} className="text-marigold" /> {SITE.email}
          </a>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-ivory/80 transition-colors hover:text-marigold">
            <Phone size={15} className="text-marigold" /> {SITE.phone}
          </a>
          <span className="flex items-start gap-2.5 text-ivory/80">
            <MapPin size={15} className="mt-0.5 text-marigold" /> {SITE.address}
          </span>
        </div>
      </section>
    </div>
  );
}
