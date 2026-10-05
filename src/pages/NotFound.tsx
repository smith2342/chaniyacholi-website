import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center md:py-40">
      <p className="font-display text-[clamp(4rem,14vw,8rem)] leading-none text-marigold">404</p>
      <h1 className="mt-4 text-[clamp(1.6rem,4vw,2.4rem)] font-light">
        This page went out for garba
      </h1>
      <p className="mt-3 text-ink/60">
        The circle closed without it. Head back to the floor and pick a chaniya that is actually
        here.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-night px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ink"
        >
          Back home
        </Link>
        <Link
          to="/shop"
          className="rounded-full border border-ink/25 px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-all hover:border-ink hover:bg-ink hover:text-ivory"
        >
          Shop the drop
        </Link>
      </div>
    </div>
  );
}
