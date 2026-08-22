// Simple hand-drawn-style line icons standing in for product photography,
// keyed by category so each piece still reads as distinct on the shelf.

const stroke = { fill: "none", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

export function NecklaceIcon(props) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <path d="M14 14 C14 34 24 44 32 44 C40 44 50 34 50 14" style={stroke} stroke="currentColor" />
      <circle cx="32" cy="46" r="6" fill="currentColor" />
      <circle cx="20" cy="18" r="2" fill="currentColor" />
      <circle cx="44" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

export function EarringIcon(props) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <path d="M32 12 a4 4 0 1 1 -0.01 0" style={stroke} stroke="currentColor" />
      <path d="M32 18 L32 30" style={stroke} stroke="currentColor" />
      <path d="M24 30 h16 l-4 22 h-8 z" style={stroke} stroke="currentColor" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function BangleIcon(props) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <circle cx="32" cy="32" r="20" style={stroke} stroke="currentColor" />
      <circle cx="32" cy="32" r="13" style={stroke} stroke="currentColor" strokeDasharray="2 4" />
    </svg>
  );
}

export function BridalIcon(props) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <path d="M12 20 C12 36 22 46 32 46 C42 46 52 36 52 20" style={stroke} stroke="currentColor" />
      <circle cx="32" cy="48" r="5" fill="currentColor" />
      <circle cx="20" cy="24" r="2" fill="currentColor" />
      <circle cx="44" cy="24" r="2" fill="currentColor" />
      <path d="M26 10 L32 6 L38 10" style={stroke} stroke="currentColor" />
    </svg>
  );
}

export function HairPinIcon(props) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <path d="M32 10 v30" style={stroke} stroke="currentColor" />
      <path d="M22 44 a10 10 0 0 0 20 0" style={stroke} stroke="currentColor" />
      <circle cx="32" cy="10" r="4" fill="currentColor" />
    </svg>
  );
}

export const CATEGORY_ICON = {
  necklaces: NecklaceIcon,
  earrings: EarringIcon,
  "bangles-cuffs": BangleIcon,
  "bridal-sets": BridalIcon,
  "hair-accessories": HairPinIcon,
};

export function iconForCategory(slug) {
  return CATEGORY_ICON[slug] || NecklaceIcon;
}
