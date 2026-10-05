import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import ProductCard from "../ProductCard";
import AnimatedHeading from "../ui/AnimatedHeading";
import Reveal from "../ui/Reveal";

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const fillers = PRODUCTS.filter((p) => !p.featured);
  const grid = [...featured, ...fillers].slice(0, 8);

  return (
    <section className="border-y border-ink/10 bg-parchment/50">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-3 text-madder">
              <span className="inline-block h-px w-10 bg-madder" />
              The drop
            </p>
            <AnimatedHeading className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.05]">
              Worn first, argued over later
            </AnimatedHeading>
          </div>
          <Reveal delay={0.15}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:border-marigold hover:text-marigold"
            >
              View all 12 pieces
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {grid.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.07}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
