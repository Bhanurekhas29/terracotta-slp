// Small kolam/rangoli dot-flower — the brand mark, echoing the kolam-dots motif used site-wide.
export default function LogoMark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2.1" />
      <circle cx="19" cy="12" r="1.6" />
      <circle cx="15.5" cy="6.06" r="1.6" />
      <circle cx="8.5" cy="6.06" r="1.6" />
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="8.5" cy="17.94" r="1.6" />
      <circle cx="15.5" cy="17.94" r="1.6" />
    </svg>
  );
}
