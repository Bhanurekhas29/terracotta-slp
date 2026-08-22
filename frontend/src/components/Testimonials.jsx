import { useEffect, useState } from "react";
import { getTestimonials } from "../api";
import Reveal from "./Reveal";

const FALLBACK = [
  { id: "t1", customer_name: "Divya R.", location: "Chennai", quote: "The Kaveri bridal set matched my saree perfectly — every piece looked like it was fired together.", rating: 5 },
  { id: "t2", customer_name: "Meera K.", location: "Coimbatore", quote: "Lighter than I expected and the kolam etching is stunning up close.", rating: 5 },
  { id: "t3", customer_name: "Priyanka M.", location: "Bengaluru", quote: "Beautiful matte finish, arrived carefully packed in cotton.", rating: 5 },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-turmeric" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
          <path d="M10 1.5l2.6 5.5 6 0.8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-0.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [items, setItems] = useState(FALLBACK);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        const results = data.results ?? data;
        if (results?.length) setItems(results);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="reviews" className="bg-ivory py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-clay mb-4">
            From the wearers
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-charcoal max-w-xl">
            Worn to weddings, temples and Tuesdays.
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {items.slice(0, 6).map((t, i) => (
            <Reveal
              key={t.id}
              as="blockquote"
              delay={i * 120}
              className="rounded-2xl border border-charcoal/10 bg-white/40 p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Stars count={t.rating} />
              <p className="mt-4 font-body text-[15px] leading-relaxed text-charcoal/80 flex-1">
                “{t.quote}”
              </p>
              <footer className="mt-6 font-body text-sm font-semibold text-charcoal">
                {t.customer_name}
                <span className="font-mono font-normal text-charcoal/40">
                  {t.location ? ` · ${t.location}` : ""}
                </span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
