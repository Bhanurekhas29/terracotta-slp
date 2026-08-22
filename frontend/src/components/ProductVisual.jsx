import { iconForCategory } from "./JewelryIcons";

const FINISH_GRADIENT = {
  matte: "from-clay to-kiln",
  glossy: "from-clay via-kiln to-kiln-deep",
  antique: "from-turmeric via-clay to-kiln-deep",
  hand_painted: "from-kiln via-clay to-turmeric",
};

// Renders a photo if the product has one, otherwise a stamped clay tile —
// so the shelf still looks intentional before real product photography exists.
export default function ProductVisual({ product, className = "" }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const Icon = iconForCategory(product.category?.slug);
  const gradient = FINISH_GRADIENT[product.finish] || FINISH_GRADIENT.matte;

  return (
    <div
      className={`relative h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}
    >
      <div className="kolam-dots absolute inset-0 text-ivory opacity-10" />
      <Icon className="h-16 w-16 text-ivory relative drop-shadow-sm" />
    </div>
  );
}
