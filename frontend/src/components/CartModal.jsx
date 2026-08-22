import { useState } from "react";

function formatINR(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function CartModal({ product, onClose }) {
  const [status, setStatus] = useState("review"); // review | paying | success

  function handlePayNow() {
    setStatus("paying");
    setTimeout(() => setStatus("success"), 700);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 px-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-ivory p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {status !== "success" ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-charcoal">
                Added to cart
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-charcoal hover:text-clay transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-xl border border-charcoal/10 p-3">
              <div>
                <p className="font-body font-semibold text-charcoal">{product.name}</p>
                {product.artisan_village && (
                  <p className="font-mono text-[11px] text-charcoal">{product.artisan_village}</p>
                )}
              </div>
              <p className="ml-auto font-body font-semibold text-clay shrink-0">
                {formatINR(product.price)}
              </p>
            </div>

            <button
              onClick={handlePayNow}
              disabled={status === "paying"}
              className="mt-6 w-full rounded-full bg-clay py-3.5 font-body text-sm font-semibold text-ivory hover:bg-kiln transition-colors disabled:opacity-60"
            >
              {status === "paying" ? "Processing…" : `Pay Now · ${formatINR(product.price)}`}
            </button>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
              Payment successful
            </h3>
            <p className="mt-1 font-body text-sm text-charcoal">
              {product.name} is on its way from Panruti.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-charcoal py-3 font-body text-sm font-semibold text-ivory hover:bg-kiln-deep transition-colors"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
