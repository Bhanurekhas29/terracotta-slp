import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Is terracotta jewelry safe for daily wear?",
    a: "Yes — once fired and sealed, our pieces are lightweight and sturdy enough for regular wear. We'd just avoid heavy impact or submerging them in water for long periods, since it's fired clay, not metal.",
  },
  {
    q: "Will the color or paint fade over time?",
    a: "Matte and antique gold-dust finishes are very stable. Hand-painted pieces may soften slightly with years of wear, the same way any hand-applied finish does — keep them away from perfume and direct sun for the longest life.",
  },
  {
    q: "How long does an order take to ship?",
    a: "Most pieces ship within 2-3 days from Panruti. Bridal sets and custom orders are made to order and can take 6-8 days, matching our actual kiln-to-shelf timeline.",
  },
  {
    q: "Do you make custom or bulk orders for weddings?",
    a: "Yes. Message us on WhatsApp with the design, quantity and date you need it by — we'll confirm timeline and pricing directly with the artisan family.",
  },
  {
    q: "What's your return policy?",
    a: "Unworn pieces in original packaging can be returned within 7 days of delivery. Since every piece is handmade, slight variations in color or shape aren't considered defects.",
  },
  {
    q: "How should I clean and store these pieces?",
    a: "Wipe gently with a dry, soft cloth after wearing. Store in the cotton pouch it arrives in, away from direct sunlight and moisture, the same way the artisans store finished batches before shipping.",
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-ivory py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-clay mb-4">
            Good to know
          </p>
          <h2 className="whitespace-nowrap font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-charcoal">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10 bg-white/40">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-body font-semibold text-charcoal hover:text-clay transition-colors"
                >
                  {item.q}
                  <ChevronIcon open={open} />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-5 pb-4 font-body text-sm leading-relaxed text-charcoal">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
