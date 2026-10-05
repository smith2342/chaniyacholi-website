import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top on route change, or to the hash target when present (retries across page transitions). */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const attempts = [120, 500, 1000];
      const timers = attempts.map((ms, i) =>
        window.setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (i === attempts.length - 1) {
            window.scrollTo({ top: 0 });
          }
        }, ms),
      );
      return () => timers.forEach((t) => window.clearTimeout(t));
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}
