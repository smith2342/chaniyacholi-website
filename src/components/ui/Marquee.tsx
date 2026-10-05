import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = {
  children: ReactNode;
  speed?: "normal" | "fast";
  className?: string;
  trackClassName?: string;
  /** Travel right-to-left → left-to-right instead. */
  reverse?: boolean;
};

/** Infinite horizontal marquee — children are rendered twice for a seamless loop. */
export default function Marquee({
  children,
  speed = "normal",
  className,
  trackClassName,
  reverse = false,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee",
          trackClassName,
        )}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
