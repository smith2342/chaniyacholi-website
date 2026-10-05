import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard, { Stars } from "../components/ProductCard";
import { getProduct, relatedProducts } from "../data/products";
import { SIZE_GUIDE } from "../data/site";
import { useCart } from "../context/CartContext";
import { buttonVariants, cn, formatINR } from "../lib/utils";
import NotFound from "./NotFound";

const REVIEWS = [
  {
    name: "Shruti J.",
    meta: "Size M · Verified buyer",
    stars: 5,
    text: "Danced all nine nights and the mirrors are still all there. The flare is exactly like the photos — maybe even bigger.",
  },
  {
    name: "Anjali R.",
    meta: "Size S · Verified buyer",
    stars: 5,
    text: "Sent my measurements on WhatsApp and the blouse fit perfectly. Got asked where it was from at every single party.",
  },
];

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();

  const [size, setSize] = useState(product ? (product.sizes[2] ?? product.sizes[0]) : "");
  const [color, setColor] = useState(product?.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);
  const [guide, setGuide] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>("What's included");

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} — MANSI CHANIYACHOLI`;
    return () => {
      document.title = "MANSI CHANIYACHOLI — Handcrafted Chaniya Choli for Navratri & Weddings";
    };
  }, [product]);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  if (!product) return <NotFound />;

  const related = relatedProducts(product, 4);
  const savePct = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  const accordions: { title: string; body: ReactNode }[] = [
    {
      title: "What's included",
      body: (
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink/65">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Fabric & work",
      body: (
        <div className="space-y-2 text-sm text-ink/65">
          <p>
            <span className="text-ink">Fabric:</span> {product.fabric}
          </p>
          <p>
            <span className="text-ink">Work:</span> {product.work}
          </p>
          <p>
            <span className="text-ink">Flare:</span> {product.flare}
          </p>
        </div>
      ),
    },
    {
      title: "Size & measurements",
      body: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink/15 text-left text-xs uppercase tracking-[0.12em] text-ink/50">
                <th className="py-2 pr-4">Size</th>
                <th className="py-2 pr-4">Bust (in)</th>
                <th className="py-2 pr-4">Waist (in)</th>
                <th className="py-2 pr-4">Hip (in)</th>
                <th className="py-2">Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE.map((row) => (
                <tr
                  key={row.size}
                  className={cn("border-b border-ink/8", row.size === size && "bg-marigold/10")}
                >
                  <td className="py-2 pr-4 font-medium">{row.size}</td>
                  <td className="py-2 pr-4 text-ink/65">{row.bust}</td>
                  <td className="py-2 pr-4 text-ink/65">{row.waist}</td>
                  <td className="py-2 pr-4 text-ink/65">{row.hip}</td>
                  <td className="py-2 text-ink/65">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-ink/50">
            Choli is stitched to your measurements — reply to your order email with bust, waist and
            shoulder. Lehenga length is adjustable up to 2 inches at the waist.
          </p>
        </div>
      ),
    },
    {
      title: "Shipping & exchange",
      body: (
        <div className="space-y-2 text-sm text-ink/65">
          <p>Dispatched within 48 hours from Ahmedabad. Delivery in 2–5 days across India.</p>
          <p>
            Free shipping over ₹2,999. 7-day size exchange — keep the tags on, we arrange the
            pickup.
          </p>
          <p>Cash on delivery available. International shipping on request.</p>
        </div>
      ),
    },
    {
      title: "Care",
      body: <p className="text-sm text-ink/65">{product.care}</p>,
    },
  ];

  const handleAdd = () => {
    add(product, size, color, qty);
    setAdded(true);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-8 md:px-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs text-ink/50" aria-label="Breadcrumb">
        <Link to="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="transition-colors hover:text-ink">
          Shop
        </Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="transition-colors hover:text-ink">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <div className="flex gap-3 lg:flex-col">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all lg:h-24 lg:w-20",
                  activeImg === i
                    ? "border-marigold"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>

          <div className="grain relative aspect-[3/4] flex-1 overflow-hidden rounded-2xl bg-parchment">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-marigold px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-night">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-madder">{product.category} collection</p>
          <h1 className="mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-[1.05] tracking-[-0.01em]">
            {product.name}
          </h1>
          <p className="font-guj mt-1.5 text-lg text-ink/45" lang="gu">
            {product.nameGuj}
          </p>

          <div className="mt-3 flex items-center gap-3 text-sm text-ink/60">
            <Stars rating={product.rating} />
            <span>
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl">{formatINR(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-ink/40 line-through">
                  {formatINR(product.compareAt)}
                </span>
                <span className="rounded-full bg-madder/10 px-3 py-1 text-xs font-medium text-madder">
                  Save {savePct}%
                </span>
              </>
            )}
          </div>

          <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink/65">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mt-7">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/50">
              Colour — <span className="text-ink">{color}</span>
            </p>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={cn(
                    "h-9 w-9 rounded-full border-2 transition-all duration-300",
                    color === c.name
                      ? "scale-110 border-ink shadow-[0_0_0_3px_rgba(26,19,13,0.08)]"
                      : "border-transparent ring-1 ring-ink/20 hover:scale-105",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-ink/50">Size</p>
              <button
                onClick={() => setGuide((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-ink/60 underline-offset-4 transition-colors hover:text-marigold hover:underline"
              >
                <Ruler size={13} /> Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-12 rounded-full border px-4 py-2 text-sm transition-all duration-300",
                    size === s
                      ? "border-night bg-night text-ivory"
                      : "border-ink/15 text-ink/70 hover:border-ink/50",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <AnimatePresence initial={false}>
              {guide && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 rounded-xl border border-ink/10 bg-parchment/50 p-4">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="uppercase tracking-[0.1em] text-ink/45">
                          <th className="pb-2">Size</th>
                          <th className="pb-2">Bust</th>
                          <th className="pb-2">Waist</th>
                          <th className="pb-2">Hip</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_GUIDE.map((r) => (
                          <tr key={r.size} className="border-t border-ink/10 text-ink/70">
                            <td className="py-1.5 font-medium text-ink">{r.size}</td>
                            <td className="py-1.5">{r.bust}"</td>
                            <td className="py-1.5">{r.waist}"</td>
                            <td className="py-1.5">{r.hip}"</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Qty + add */}
          <div className="mt-7 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center rounded-full border border-ink/15">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3.5 text-ink/60 transition-colors hover:text-ink"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-7 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="p-3.5 text-ink/60 transition-colors hover:text-ink"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={cn(
                buttonVariants(added ? "primary" : "accent", "shimmer-btn min-w-52 flex-1"),
              )}
            >
              <ShoppingBag size={16} />
              {added ? "Added to bag ✓" : `Add to bag — ${formatINR(product.price * qty)}`}
            </button>

            <button
              onClick={() => setWish((v) => !v)}
              aria-label="Add to wishlist"
              className={cn(
                "flex h-[52px] w-[52px] items-center justify-center rounded-full border transition-all duration-300",
                wish
                  ? "border-madder bg-madder/10 text-madder"
                  : "border-ink/15 text-ink/60 hover:border-ink/50",
              )}
            >
              <Heart size={18} strokeWidth={1.6} className={wish ? "fill-madder" : ""} />
            </button>
          </div>

          {/* Perks */}
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-ink/10 bg-parchment/40 p-4 text-xs text-ink/65 sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <Truck size={14} className="shrink-0 text-peacock" /> Free over ₹2,999
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw size={14} className="shrink-0 text-peacock" /> 7-day exchange
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="shrink-0 text-peacock" /> Razorpay secure · COD
            </span>
          </div>

          {/* Accordions */}
          <div className="mt-8 border-t border-ink/10">
            {accordions.map((acc) => {
              const open = openAcc === acc.title;
              return (
                <div key={acc.title} className="border-b border-ink/10">
                  <button
                    onClick={() => setOpenAcc(open ? null : acc.title)}
                    className="flex w-full items-center justify-between py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-medium uppercase tracking-[0.14em] text-ink/80">
                      {acc.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "text-ink/50 transition-transform duration-300",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5">{acc.body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Reviews</h2>
              <span className="text-sm text-ink/55">
                {product.rating} ★ · {product.reviews} reviews
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {REVIEWS.map((r) => (
                <div key={r.name} className="rounded-xl border border-ink/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{r.name}</span>
                    <Stars rating={r.stars} />
                  </div>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-ink/45">
                    {r.meta}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-24 border-t border-ink/10 pt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-madder">Pair it with</p>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-light">
              More from the floor
            </h2>
          </div>
          <Link
            to="/shop"
            className="border-b border-ink/30 pb-1 text-xs uppercase tracking-[0.18em] transition-colors hover:border-marigold hover:text-marigold"
          >
            All pieces
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
