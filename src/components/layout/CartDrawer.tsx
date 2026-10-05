import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { SITE } from "../../data/site";
import { buttonVariants, formatINR } from "../../lib/utils";

export default function CartDrawer() {
  const {
    lines,
    isOpen,
    close,
    setQty,
    remove,
    count,
    subtotal,
    shipping,
    total,
    savings,
    freeShippingLeft,
  } = useCart();

  const progress = Math.min(100, (subtotal / SITE.freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-night/50 backdrop-blur-[3px]"
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory shadow-[-30px_0_60px_-30px_rgb(15_20_38/0.5)]"
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <h2 className="font-display text-xl text-ink">
                  Your bag <span className="text-ink/40">({count})</span>
                </h2>
                <p className="font-guj text-xs text-ink/45">{SITE.nameGuj} · તમારી થેલી</p>
              </div>
              <button
                onClick={close}
                className="rounded-full p-2 transition-colors hover:bg-ink/5"
                aria-label="Close bag"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </header>

            {lines.length > 0 ? (
              <>
                <div className="border-b border-ink/10 bg-parchment/60 px-6 py-4">
                  <p className="text-xs text-ink/70">
                    {freeShippingLeft > 0 ? (
                      <>
                        Add <span className="font-semibold text-ink">{formatINR(freeShippingLeft)}</span> for
                        free India-wide shipping
                      </>
                    ) : (
                      <span className="font-medium text-peacock">Free shipping unlocked ✦</span>
                    )}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-marigold to-gold"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-5">
                    <AnimatePresence initial={false}>
                      {lines.map((line) => (
                        <motion.li
                          key={line.key}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
                          className="flex gap-4"
                        >
                          <img
                            src={line.image}
                            alt={line.name}
                            className="h-28 w-[76px] shrink-0 rounded-lg object-cover"
                            loading="lazy"
                          />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link
                                  to={`/product/${line.slug}`}
                                  onClick={close}
                                  className="block truncate font-display text-[0.95rem] text-ink hover:text-marigold"
                                >
                                  {line.name}
                                </Link>
                                <p className="mt-0.5 text-xs text-ink/50">
                                  {line.color} · Size {line.size}
                                </p>
                              </div>
                              <button
                                onClick={() => remove(line.key)}
                                className="p-1 text-ink/40 transition-colors hover:text-madder"
                                aria-label={`Remove ${line.name}`}
                              >
                                <Trash2 size={15} strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-3">
                              <div className="flex items-center rounded-full border border-ink/15">
                                <button
                                  onClick={() => setQty(line.key, line.qty - 1)}
                                  className="p-2 text-ink/60 transition hover:text-ink"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-6 text-center text-sm">{line.qty}</span>
                                <button
                                  onClick={() => setQty(line.key, line.qty + 1)}
                                  className="p-2 text-ink/60 transition hover:text-ink"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <span className="font-display text-[0.95rem]">
                                {formatINR(line.price * line.qty)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>

                <footer className="border-t border-ink/10 px-6 py-5">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-ink/60">
                      <span>Subtotal</span>
                      <span>{formatINR(subtotal)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-peacock">
                        <span>You save</span>
                        <span>−{formatINR(savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-ink/60">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
                    </div>
                    <div className="flex justify-between border-t border-ink/10 pt-2 font-display text-lg">
                      <span>Total</span>
                      <span>{formatINR(total)}</span>
                    </div>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={close}
                    className={`${buttonVariants("accent", "mt-4 w-full shimmer-btn")} `}
                  >
                    Checkout securely
                  </Link>
                  <button
                    onClick={close}
                    className="mt-2 w-full py-2 text-xs uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink"
                  >
                    Continue shopping
                  </button>
                </footer>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-parchment">
                  <ShoppingBag size={30} strokeWidth={1.2} className="text-ink/40" />
                </div>
                <h3 className="font-display text-xl">Your bag is empty</h3>
                <p className="mt-2 text-sm text-ink/55">
                  The mirrors are waiting. Pick a chaniya and we will wrap it in muslin.
                </p>
                <Link to="/shop" onClick={close} className={buttonVariants("primary", "mt-6")}>
                  Shop the drop
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
