import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ANNOUNCEMENTS, NAV_LINKS, SITE } from "../../data/site";
import { cn } from "../../lib/utils";
import Marquee from "../ui/Marquee";

export default function Navbar() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement strip */}
      <div className="flex h-8 items-center border-b border-ivory/10 bg-night text-ivory">
        <Marquee speed="fast">
          {ANNOUNCEMENTS.map((a) => (
            <span
              key={a}
              className="flex items-center gap-4 px-5 text-[0.62rem] uppercase tracking-[0.28em] text-ivory/75"
            >
              {a}
              <span className="mirror-dot h-1.5 w-1.5" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>

      <nav
        className={cn(
          "border-b transition-all duration-500",
          scrolled || menuOpen
            ? "border-ink/10 bg-ivory/95 shadow-[0_10px_40px_-24px_rgb(15_20_38/0.5)] backdrop-blur-xl"
            : "border-transparent bg-ivory/40 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[72px] md:px-8">
          {/* Wordmark */}
          <Link to="/" className="group flex items-center gap-1.5" aria-label={`${SITE.name} home`}>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold tracking-[0.18em] text-ink md:text-2xl">
                {SITE.shortName}
              </span>
              <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.34em] text-ink/50 md:text-[0.55rem]">
                Chaniyacholi
              </span>
            </span>
            <span className="mirror-dot h-1.5 w-1.5 self-start transition-transform duration-300 group-hover:scale-150" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "group relative text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink/70 transition-colors hover:text-ink",
                    isActive && link.to === "/shop" && "text-ink",
                  )
                }
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-marigold transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to="/shop"
              className="hidden rounded-full border border-ink/20 px-5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:border-night hover:bg-night hover:text-ivory sm:block"
            >
              Shop the drop
            </Link>
            <button
              onClick={open}
              className="relative rounded-full p-2.5 transition-colors hover:bg-ink/5"
              aria-label={`Open bag, ${count} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 24 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-marigold px-1 text-[0.62rem] font-semibold text-night"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-2.5 transition-colors hover:bg-ink/5 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ivory px-6 pb-10 pt-32 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-ink/10 py-4 font-display text-3xl text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 space-y-2 text-sm text-ink/60">
              <p className="eyebrow text-ink/40">The house</p>
              <p>{SITE.address}</p>
              <p>{SITE.email}</p>
              <p>{SITE.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
