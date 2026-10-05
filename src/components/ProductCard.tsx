import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { cn, formatINR } from "../lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          strokeWidth={1.5}
          className={n <= Math.round(rating) ? "fill-marigold text-marigold" : "text-ink/25"}
        />
      ))}
    </span>
  );
}

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const hoverImage = product.images[1];
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-parchment">
        <img
          src={product.images[0]}
          alt={product.name}
          loading={index < 4 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        {hoverImage ? (
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-marigold px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-night">
            {product.badge}
          </span>
        ) : null}
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-night/90 py-3 text-center text-[0.68rem] uppercase tracking-[0.3em] text-ivory backdrop-blur transition-transform duration-400 ease-out group-hover:translate-y-0">
          View piece
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[1.05rem] leading-snug text-ink">{product.name}</h3>
          <p className="font-guj mt-0.5 text-xs text-ink/50">{product.nameGuj}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-[1.05rem] text-ink">{formatINR(product.price)}</div>
          {product.compareAt ? (
            <div className="text-xs text-ink/40 line-through">{formatINR(product.compareAt)}</div>
          ) : null}
        </div>
      </div>

      <div className="mt-1.5 flex items-center gap-2 text-xs text-ink/55">
        <Stars rating={product.rating} />
        <span>
          {product.rating} · {product.reviews} reviews
        </span>
        <span className="ml-auto uppercase tracking-[0.16em] text-ink/40">{product.category}</span>
      </div>
    </Link>
  );
}
