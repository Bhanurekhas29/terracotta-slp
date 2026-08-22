import { useState } from "react";
import ProductVisual from "./ProductVisual";
import CartModal from "./CartModal";

const FINISH_LABEL = {
  matte: "Matte",
  glossy: "Glossy",
  antique: "Antique gold-dust",
  hand_painted: "Hand-painted",
};

function formatINR(value) {
  const n = Number(value);
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }) {
  const [showCart, setShowCart] = useState(false);
  const [blocked, setBlocked] = useState(false);

  function handleAddToCart() {
    if (!product.in_stock) {
      setBlocked(true);
      return;
    }
    setBlocked(false);
    setShowCart(true);
  }

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-charcoal/10">
        <ProductVisual product={product} className="transition-transform duration-500 group-hover:scale-105" />
        {!product.in_stock && (
          <span className="absolute top-3 left-3 rounded-full bg-charcoal/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ivory">
            Sold out
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-ivory/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-charcoal">
          {FINISH_LABEL[product.finish] || product.finish}
        </span>
      </div>
      <div className="mt-3 flex flex-1 items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-lg font-semibold text-charcoal leading-snug">
            {product.name}
          </h3>
          {product.artisan_village && (
            <p className="mt-0.5 font-mono text-[11px] text-charcoal">
              {product.artisan_village}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <div className="font-body font-semibold text-clay">{formatINR(product.price)}</div>
          {product.compare_at_price && (
            <div className="font-mono text-xs text-charcoal line-through">
              {formatINR(product.compare_at_price)}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!product.in_stock}
        className="mt-3 w-full rounded-full border border-clay/40 py-2.5 font-body text-sm font-semibold text-clay transition-colors hover:bg-clay hover:text-ivory disabled:cursor-not-allowed disabled:border-charcoal/15 disabled:text-charcoal/30 disabled:hover:bg-transparent disabled:hover:text-charcoal/30"
      >
        {product.in_stock ? "Add to cart" : "Sold out"}
      </button>
      {blocked && (
        <p className="mt-1.5 font-mono text-[11px] text-kiln">
          This piece is out of stock right now.
        </p>
      )}

      {showCart && <CartModal product={product} onClose={() => setShowCart(false)} />}
    </article>
  );
}
