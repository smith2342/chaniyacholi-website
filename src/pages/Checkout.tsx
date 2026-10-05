import { motion } from "framer-motion";
import { Check, Lock, ShoppingBag, Truck } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/utils";
import { paymentMode, processPayment } from "../lib/payments";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Credit / Debit card", hint: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Netbanking", hint: "All major banks" },
  { id: "cod", label: "Cash on delivery", hint: "Pay at your door" },
];

type FormState = {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY_FORM: FormState = {
  email: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function Checkout() {
  const { lines, subtotal, shipping, total, savings, count, clear } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const set = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (processing || lines.length === 0) return;
    setProcessing(true);
    const ok = await processPayment({
      amount: total,
      email: form.email,
      name: form.name,
      contact: form.phone,
      method: PAYMENT_METHODS.find((m) => m.id === method)?.label ?? "UPI",
    });
    setProcessing(false);
    if (ok) {
      setOrderId(`ABH-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ---------------- Success ---------------- */
  if (orderId) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center md:py-32">
        <motion.svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          initial="hidden"
          animate="show"
          aria-hidden="true"
        >
          <motion.circle
            cx="44"
            cy="44"
            r="40"
            fill="none"
            stroke="#0d5c4f"
            strokeWidth="3"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            transform="rotate(-90 44 44)"
          />
          <motion.path
            d="M28 45 L40 57 L61 33"
            fill="none"
            stroke="#0d5c4f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          />
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="eyebrow mt-8 text-peacock">Order confirmed</p>
          <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-light">
            Your chaniya is being folded in muslin
          </h1>
          <p className="mt-4 text-ink/60">
            Order <span className="font-medium text-ink">{orderId}</span> · confirmation sent to{" "}
            <span className="font-medium text-ink">{form.email || "your inbox"}</span>
          </p>

          <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
            {[
              { step: "Confirmed", copy: "Payment received, receipt on the way" },
              { step: "Quality check", copy: "Pressed and mirror-counted by hand" },
              { step: "Dispatched", copy: "Within 48 hours, tracking by SMS" },
            ].map((s, i) => (
              <div
                key={s.step}
                className="rounded-xl border border-ink/10 bg-parchment/50 p-4"
                style={{ animationDelay: `${1.2 + i * 0.15}s` }}
              >
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-peacock">
                  <Check size={13} /> {s.step}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/60">{s.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="rounded-full bg-night px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ink"
            >
              Keep shopping
            </Link>
            <Link
              to="/info#exchange"
              className="rounded-full border border-ink/25 px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-all hover:border-ink hover:bg-ink hover:text-ivory"
            >
              Exchange policy
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ---------------- Empty ---------------- */
  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-parchment">
          <ShoppingBag size={30} strokeWidth={1.2} className="text-ink/40" />
        </div>
        <h1 className="mt-6 text-2xl font-light">Nothing to check out yet</h1>
        <p className="mt-2 text-sm text-ink/55">
          Add a chaniya to your bag and the circle will be complete.
        </p>
        <Link
          to="/shop"
          className="mt-7 rounded-full bg-night px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ink"
        >
          Shop the drop
        </Link>
      </div>
    );
  }

  /* ---------------- Checkout form ---------------- */
  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-10 md:px-8 md:pt-14">
      <p className="eyebrow flex items-center gap-3 text-madder">
        <span className="inline-block h-px w-10 bg-madder" />
        Checkout
      </p>
      <h1 className="mt-4 text-[clamp(2rem,4.5vw,3rem)] font-light leading-[1.05]">
        Where should the circle land?
      </h1>

      <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.85fr]">
        {/* Left — details */}
        <div className="space-y-10">
          <section>
            <h2 className="flex items-center justify-between border-b border-ink/10 pb-3 font-display text-lg">
              Contact
              {paymentMode === "demo" && (
                <span className="rounded-full bg-parchment px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-ink/55">
                  Demo mode · no live keys
                </span>
              )}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Email" {...fieldProps(form.email, set("email"), "email", "you@example.com")} />
              <Field label="Phone" {...fieldProps(form.phone, set("phone"), "tel", "98765 43210")} />
            </div>
          </section>

          <section>
            <h2 className="border-b border-ink/10 pb-3 font-display text-lg">Delivery</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                className="sm:col-span-2"
                {...fieldProps(form.name, set("name"), "text", "Kinjal Patel")}
              />
              <Field
                label="Address"
                className="sm:col-span-2"
                {...fieldProps(form.address, set("address"), "text", "Flat / house, street, landmark")}
              />
              <Field label="City" {...fieldProps(form.city, set("city"), "text", "Ahmedabad")} />
              <Field label="State" {...fieldProps(form.state, set("state"), "text", "Gujarat")} />
              <Field
                label="Pincode"
                {...fieldProps(form.pincode, set("pincode"), "text", "380006", "[0-9]{6}")}
              />
              <div className="flex items-end gap-2 pb-1 text-xs text-ink/55">
                <Truck size={14} className="mt-0.5 shrink-0 text-peacock" />
                Dispatch in 48h · 2–5 days pan-India
              </div>
            </div>
          </section>

          <section>
            <h2 className="border-b border-ink/10 pb-3 font-display text-lg">Payment</h2>
            <div className="mt-5 space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${
                    method === m.id
                      ? "border-night bg-parchment/60 shadow-[0_16px_40px_-30px_rgb(15_20_38/0.7)]"
                      : "border-ink/12 hover:border-ink/35"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                      method === m.id ? "border-night" : "border-ink/25"
                    }`}
                  >
                    {method === m.id && <span className="h-2.5 w-2.5 rounded-full bg-marigold" />}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{m.label}</span>
                    <span className="block text-xs text-ink/50">{m.hint}</span>
                  </span>
                  <Lock size={13} className="text-ink/35" />
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink/45">
              Payments processed by Razorpay — PCI-DSS compliant, 3-D Secure on cards.
              {paymentMode === "demo" && " Add your keys to go live."}
            </p>
          </section>
        </div>

        {/* Right — summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-ink/10 bg-parchment/50 p-6">
            <h2 className="font-display text-lg">
              Order summary <span className="text-ink/40">({count})</span>
            </h2>

            <ul className="mt-5 space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3.5">
                  <img
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    className="h-20 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{line.name}</p>
                    <p className="mt-0.5 text-xs text-ink/50">
                      {line.color} · {line.size} · ×{line.qty}
                    </p>
                    <p className="mt-1 text-sm text-ink/70">
                      {formatINR(line.price * line.qty)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
              <Row label="Subtotal" value={formatINR(subtotal)} />
              {savings > 0 && <Row label="You save" value={`−${formatINR(savings)}`} accent />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatINR(shipping)} />
              <Row label="Total" value={formatINR(total)} big />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="shimmer-btn mt-5 w-full rounded-full bg-marigold py-4 text-sm font-medium uppercase tracking-[0.18em] text-night shadow-[0_14px_34px_-14px_rgb(240_138_29/0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-marigold-light disabled:cursor-not-allowed disabled:opacity-70"
            >
              {processing ? "Processing…" : `Place order · ${formatINR(total)}`}
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.68rem] text-ink/45">
              <Lock size={11} /> Encrypted checkout · 7-day size exchange
            </p>

            <p className="mt-4 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/50">
              By placing this order you agree to our exchange policy. Blouse stitching details are
              collected by email right after checkout.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function fieldProps(
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type: string,
  placeholder: string,
  pattern?: string,
) {
  return { value, onChange, type, placeholder, pattern, required: true };
}

function Field({
  label,
  className,
  ...input
}: {
  label: string;
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  pattern?: string;
  required: boolean;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-ink/50">{label}</span>
      <input
        {...input}
        className="w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3 text-sm placeholder:text-ink/35 focus:border-night focus:outline-none"
      />
    </label>
  );
}

function Row({
  label,
  value,
  accent,
  big,
}: {
  label: string;
  value: string;
  accent?: boolean;
  big?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${big ? "border-t border-ink/10 pt-3 font-display text-lg" : ""} ${
        accent ? "text-peacock" : "text-ink/60"
      }`}
    >
      <span>{label}</span>
      <span className={big ? "text-ink" : ""}>{value}</span>
    </div>
  );
}
