import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import AnimatedHeading from "../components/ui/AnimatedHeading";
import Reveal from "../components/ui/Reveal";
import { CATEGORIES, PRODUCTS, type Category } from "../data/products";
import { SHOP_STRIP } from "../data/site";
import { cn } from "../lib/utils";

type SortKey = "curated" | "price-asc" | "price-desc" | "rating" | "new";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "curated", label: "Curated" },
  { key: "new", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const activeCategory = (params.get("category") ?? "All") as Category | "All";
  const [sort, setSort] = useState<SortKey>("curated");
  const [query, setQuery] = useState("");

  const setCategory = (category: string) => {
    const next = new URLSearchParams(params);
    if (category === "All") next.delete("category");
    else next.set("category", category);
    setParams(next, { replace: true });
  };

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => activeCategory === "All" || p.category === activeCategory);
    if (q) {
      list = list.filter((p) =>
        [p.name, p.category, p.work, p.fabric, p.description].join(" ").toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "new":
        return [...list];
      default:
        return [...list].sort((a, b) => Number(b.badge === "New") - Number(a.badge === "New"));
    }
  }, [activeCategory, query, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 md:px-8 md:pt-16">
      {/* Header */}
      <div className="border-b border-ink/10 pb-8">
        <p className="eyebrow flex items-center gap-3 text-madder">
          <span className="inline-block h-px w-10 bg-madder" />
          The shop
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <AnimatedHeading
            tag="h1"
            className="text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1] tracking-[-0.01em]"
          >
            {activeCategory === "All" ? "All chaniya choli" : activeCategory}
          </AnimatedHeading>
          <p className="text-sm text-ink/55">
            {items.length} {items.length === 1 ? "piece" : "pieces"} · free shipping over ₹2,999
          </p>
        </div>
      </div>

      {/* Editorial strip — looks from the floor */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {SHOP_STRIP.map((look, i) => (
          <Reveal key={look.image} delay={i * 0.07}>
            <Link
              to={`/shop?category=${look.filter}`}
              aria-label={`Shop ${look.label}`}
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
              <span className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-ivory/92 px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-ink opacity-0 backdrop-blur transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                {look.label}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Controls */}
      <div className="sticky top-[96px] z-30 -mx-5 mt-6 border-b border-ink/10 bg-ivory/90 px-5 py-4 backdrop-blur-md md:top-[104px] md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
            <SlidersHorizontal size={15} className="shrink-0 text-ink/40" />
            {(["All", ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.14em] transition-all duration-300",
                  activeCategory === cat
                    ? "border-night bg-night text-ivory"
                    : "border-ink/15 text-ink/60 hover:border-ink/50 hover:text-ink",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                aria-label="Search the collection"
                className="w-40 rounded-full border border-ink/15 bg-transparent py-1.5 pl-9 pr-4 text-sm placeholder:text-ink/40 focus:border-ink/40 focus:outline-none sm:w-52"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
              className="rounded-full border border-ink/15 bg-transparent px-4 py-1.5 text-xs uppercase tracking-[0.1em] text-ink/70 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {items.length > 0 ? (
        <motion.div
          layout
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-6 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.24) }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-16 flex flex-col items-center py-16 text-center">
          <div className="mirror-dot h-14 w-14 opacity-60" />
          <h2 className="mt-6 font-display text-2xl">Nothing in this circle yet</h2>
          <p className="mt-2 max-w-sm text-sm text-ink/55">
            No pieces match “{query || activeCategory}”. Try another craft — bandhani, mirror
            work, gota patti.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-6 rounded-full border border-ink/25 px-6 py-3 text-xs uppercase tracking-[0.2em] transition-all hover:bg-night hover:text-ivory"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
