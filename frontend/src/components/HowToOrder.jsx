import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Browse the batch",
    desc: "Filter by category and pick the piece that fits your occasion.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Add to cart",
    desc: "Tap \"Add to cart\" on any in-stock piece — no account needed.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    title: "Pay Now",
    desc: "Confirm your order and pay securely in the checkout popup.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    title: "It ships from Panruti",
    desc: "Packed in cotton and on its way — most orders leave within 2–3 days.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 3h-1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h1M8 3h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8" />
        <path d="M2 12h4M18 12h4M12 3v18" />
      </svg>
    ),
  },
];

export default function HowToOrder() {
  return (
    <section className="bg-ivory pb-12 md:pb-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-clay mb-4">
            How to order
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-charcoal">
            From browsing to your doorstep.
          </h2>
        </Reveal>

        <div className="mt-14 relative">
          <div
            className="hidden md:block absolute top-7 left-0 right-0 h-px bg-charcoal/10"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-4 gap-x-6 gap-y-10">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 200}
                duration={900}
                className="group relative rounded-2xl p-4 -m-4 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/60 hover:shadow-lg"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-clay bg-ivory text-clay shadow-sm transition-colors duration-300 group-hover:bg-clay group-hover:text-ivory">
                  {s.icon}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
