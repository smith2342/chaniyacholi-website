import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Standard CTA styling shared by <button> and <Link> elements. */
export function buttonVariants(
  variant: "primary" | "accent" | "ghost" | "light" = "primary",
  className?: string,
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer select-none";
  const variants = {
    primary:
      "bg-night text-ivory hover:bg-ink shadow-[0_10px_30px_-12px_rgb(15_20_38/0.6)] hover:shadow-[0_16px_40px_-12px_rgb(15_20_38/0.75)] hover:-translate-y-0.5",
    accent:
      "bg-marigold text-night hover:bg-marigold-light shadow-[0_10px_30px_-12px_rgb(240_138_29/0.7)] hover:-translate-y-0.5",
    ghost:
      "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
    light:
      "border border-ivory/30 text-ivory hover:bg-ivory hover:text-night",
  };
  return cn(base, variants[variant], className);
}
