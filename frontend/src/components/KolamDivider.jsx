// A thin recurring kolam dot-grid band used between sections — the site's signature motif.
export default function KolamDivider({ tone = "kiln" }) {
  const colorClass = tone === "kiln" ? "text-kiln" : tone === "indigo" ? "text-indigo" : "text-clay";
  return (
    <div className="relative h-4 overflow-hidden" aria-hidden="true">
      <div className={`kolam-dots kolam-scroll absolute inset-0 opacity-20 ${colorClass}`} />
    </div>
  );
}
