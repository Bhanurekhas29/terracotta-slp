import { useEffect, useRef, useState } from "react";
import { getTestimonials } from "../api";
import Reveal from "./Reveal";

const FALLBACK = [
  { id: "t1", customer_name: "Divya R.", location: "Chennai", quote: "The Kaveri bridal set matched my saree perfectly — every piece looked like it was fired together.", rating: 5 },
  { id: "t2", customer_name: "Meera K.", location: "Coimbatore", quote: "Lighter than I expected and the kolam etching is stunning up close.", rating: 5 },
  { id: "t3", customer_name: "Priyanka M.", location: "Bengaluru", quote: "Beautiful matte finish, arrived carefully packed in cotton.", rating: 5 },
];

const AUTOPLAY_MS = 6000;
const PER_SLIDE = 3;

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

function chunk(items, size) {
  const groups = [];
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size));
  return groups;
}

export default function Testimonials() {
  const [items, setItems] = useState(FALLBACK);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        const results = data.results ?? data;
        if (results?.length) setItems(results);
      })
      .catch(() => {});
  }, []);

  const groups = chunk(items, PER_SLIDE);
  const count = groups.length;

  function goTo(i) {
    setIndex(((i % count) + count) % count);
  }

  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [count]);

  function pauseAutoplay() {
    clearInterval(timerRef.current);
  }

  function resumeAutoplay() {
    if (count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
  }

  return (
    <section id="reviews" className="bg-ivory py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-clay mb-4">
            From the wearers
          </p>
          <h2 className="whitespace-nowrap font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-charcoal">
            Worn to weddings, temples and Tuesdays.
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          className="relative mt-14"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {groups.map((group, gi) => (
                <div key={gi} className="grid w-full shrink-0 grid-cols-1 sm:grid-cols-3 gap-8">
                  {group.map((t) => (
                    <blockquote
                      key={t.id}
                      className="rounded-2xl border border-charcoal/10 bg-white/40 p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Stars count={t.rating} />
                      <p className="mt-4 font-body text-[15px] leading-relaxed text-charcoal flex-1">
                        “{t.quote}”
                      </p>
                      <footer className="mt-6 font-body text-sm font-semibold text-charcoal">
                        {t.customer_name}
                        <span className="font-mono font-normal text-charcoal">
                          {t.location ? ` · ${t.location}` : ""}
                        </span>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {count > 1 && (
            <>
              <button
                onClick={() => goTo(index - 1)}
                aria-label="Previous testimonials"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 flex h-10 w-10 items-center justify-center rounded-full bg-ivory shadow-md border border-charcoal/10 text-charcoal hover:bg-clay hover:text-ivory transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => goTo(index + 1)}
                aria-label="Next testimonials"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 flex h-10 w-10 items-center justify-center rounded-full bg-ivory shadow-md border border-charcoal/10 text-charcoal hover:bg-clay hover:text-ivory transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <div className="mt-8 flex items-center justify-center gap-2">
                {groups.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonials page ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-clay" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
