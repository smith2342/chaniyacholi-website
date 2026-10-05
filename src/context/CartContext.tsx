import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";
import { SITE } from "../data/site";

export type CartLine = {
  key: string;
  slug: string;
  name: string;
  nameGuj: string;
  image: string;
  price: number;
  compareAt?: number;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  add: (product: Product, size: string, color: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  savings: number;
  freeShippingLeft: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const STORAGE_KEY = "abhla-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() =>
    typeof window === "undefined" ? [] : loadLines(),
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [lines]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const add = useCallback((product: Product, size: string, color: string, qty = 1) => {
    const key = `${product.slug}__${size}__${color}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
      }
      return [
        ...prev,
        {
          key,
          slug: product.slug,
          name: product.name,
          nameGuj: product.nameGuj,
          image: product.images[0],
          price: product.price,
          compareAt: product.compareAt,
          size,
          color,
          qty,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 20) } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
    const savings = lines.reduce(
      (n, l) => n + (l.compareAt ? (l.compareAt - l.price) * l.qty : 0),
      0,
    );
    const shipping =
      subtotal === 0 || subtotal >= SITE.freeShippingThreshold ? 0 : 99;
    return {
      lines,
      add,
      remove,
      setQty,
      clear,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      savings,
      freeShippingLeft: Math.max(0, SITE.freeShippingThreshold - subtotal),
      isOpen,
      open,
      close,
    };
  }, [lines, add, remove, setQty, clear, isOpen, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
