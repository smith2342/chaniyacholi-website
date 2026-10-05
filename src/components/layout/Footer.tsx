import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE } from "../../data/site";
import InstagramGlyph from "../ui/InstagramGlyph";
import Marquee from "../ui/Marquee";

const shopLinks = [
  { label: "All chaniya choli", to: "/shop" },
  { label: "Navratri drop", to: "/shop?category=Navratri" },
  { label: "Panetar & bridal", to: "/shop?category=Bridal" },
  { label: "Kutchi mirror work", to: "/shop?category=Kutchi" },
  { label: "Bandhani", to: "/shop?category=Bandhani" },
  { label: "Kids & accessories", to: "/shop?category=Kids" },
];

const houseLinks = [
  { label: "The craft", to: "/#craft" },
  { label: "Lookbook", to: "/#lookbook" },
  { label: "Voices", to: "/#voices" },
  { label: "Collections", to: "/#collections" },
];

const helpLinks = [
  { label: "Shipping & delivery", to: "/info#shipping" },
  { label: "Size exchange", to: "/info#exchange" },
  { label: "Size guide", to: "/info#size-guide" },
  { label: "Care instructions", to: "/info#care" },
  { label: "Contact us", to: "/info#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-ivory">
      {/* Giant wordmark marquee */}
      <div className="border-b border-ivory/10 py-6">
        <Marquee>
          {[0, 1].map((i) => (
            <span key={i} className="flex items-center gap-8 px-6">
              <span className="gold-text font-display text-4xl italic md:text-6xl">ચણિયાચોળી</span>
              <span className="mirror-dot h-2.5 w-2.5" />
              <span className="gold-text font-display text-4xl tracking-[0.15em] md:text-6xl">
                {SITE.name}
              </span>
              <span className="mirror-dot h-2.5 w-2.5" />
              <span className="font-display text-4xl italic text-ivory/30 md:text-6xl">
                nine nights
              </span>
              <span className="mirror-dot h-2.5 w-2.5" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl tracking-[0.1em] md:text-2xl">{SITE.name}</span>
            <span className="mirror-dot h-1.5 w-1.5 -translate-y-2.5" />
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-ivory/45">{SITE.tagline}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/65">
            Hand-cut, hand-stitched chaniya choli from Ahmedabad and Bhuj. Fourteen families of
            karigars, one standard: if it will not survive nine nights, it does not leave the floor.
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-ivory/70">
            <p className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-marigold" strokeWidth={1.5} />
              {SITE.address}
            </p>
            <p className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-marigold" strokeWidth={1.5} />
              {SITE.phone}
            </p>
            <p className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-marigold" strokeWidth={1.5} />
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-marigold">
                {SITE.email}
              </a>
            </p>
          </div>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-ivory/25 px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:border-marigold hover:text-marigold"
          >
            <InstagramGlyph size={14} /> @mansi.nights
          </a>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="The house" links={houseLinks} />
        <FooterColumn title="Help" links={helpLinks} />
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ivory/45 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} {SITE.name} — {SITE.tagline}. Made in Gujarat.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <span>UPI</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Razorpay secure checkout</span>
            <span>Cash on delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow text-marigold">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-ivory/70 transition-colors hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
