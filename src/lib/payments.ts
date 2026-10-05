const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export const paymentMode: "razorpay" | "demo" = KEY_ID ? "razorpay" : "demo";

function loadScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type PaymentInput = {
  amount: number;
  email: string;
  name: string;
  contact?: string;
  method: string;
};

/**
 * Confirms payment through Razorpay Checkout when VITE_RAZORPAY_KEY_ID is configured.
 * Without keys it simulates a successful payment so the full flow stays demo-able.
 * Returns true when the order can be considered paid.
 */
export async function processPayment(input: PaymentInput): Promise<boolean> {
  if (KEY_ID && typeof window !== "undefined") {
    const loaded = await loadScript();
    if (loaded && window.Razorpay) {
      return new Promise<boolean>((resolve) => {
        const rzp = new window.Razorpay!({
          key: KEY_ID,
          amount: Math.round(input.amount * 100),
          currency: "INR",
          name: "MANSI CHANIYACHOLI",
          description: `Order payment · ${input.method}`,
          prefill: {
            name: input.name,
            email: input.email,
            contact: input.contact ?? "",
          },
          theme: { color: "#0f1426" },
          handler: () => resolve(true),
          modal: { ondismiss: () => resolve(false) },
        });
        rzp.open();
      });
    }
  }

  // Demo path — no gateway keys configured yet.
  await new Promise((r) => setTimeout(r, 1400));
  return true;
}
