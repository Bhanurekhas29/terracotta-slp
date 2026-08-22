import { useEffect, useState } from "react";
import { getProcessSteps } from "../api";
import Reveal from "./Reveal";

// Shown until an admin adds ProcessStep rows (with images) via the Django admin.
const FALLBACK_STAGES = [
  {
    stage: "Shape",
    days: "Day 1–2",
    desc: "Local clay is wedged by hand and thrown or moulded into form on a stone wheel.",
    image: null,
  },
  {
    stage: "Dry",
    days: "Day 2–4",
    desc: "Pieces rest in shade for up to two days so they don't crack in the kiln.",
    image: null,
  },
  {
    stage: "Bisque fire",
    days: "Day 5",
    desc: "Fired at 900°C in a wood-fed kiln — the step that turns clay to terracotta.",
    image: null,
  },
  {
    stage: "Paint & glaze",
    days: "Day 6–7",
    desc: "Oxide, turmeric and gold-dust finishes are hand-painted, then set with a second low firing.",
    image: null,
  },
  {
    stage: "Wear",
    days: "Day 8",
    desc: "Strung, packed in cotton, and shipped from Panruti to your door.",
    image: null,
  },
];

export default function ProcessTimeline() {
  const [stages, setStages] = useState(FALLBACK_STAGES);

  useEffect(() => {
    getProcessSteps()
      .then((data) => {
        const results = data.results ?? data;
        if (results?.length) {
          setStages(
            results.map((s) => ({
              stage: s.stage,
              days: s.days,
              desc: s.description,
              image: s.image,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="process" className="bg-ivory py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-clay mb-4">
            The firing process
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-charcoal">
            Eight days, one kiln,
            <br />
            <span className="text-clay italic font-light">a piece that's yours alone.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-5 gap-x-6 gap-y-12">
          {stages.map((s, i) => (
            <Reveal
              key={s.stage}
              delay={i * 700}
              duration={2200}
              className="group relative rounded-2xl p-4 -m-4 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/60 hover:shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-clay/10">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.stage}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-clay/30">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M4 16.5 8.5 11l3.5 4 3-3.5L20 16.5" />
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="8" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-clay bg-ivory font-display text-sm font-semibold text-clay shadow-sm transition-colors duration-300 group-hover:bg-clay group-hover:text-ivory">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-mono text-xs text-clay/70">{s.days}</div>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-charcoal">
                {s.stage}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/70">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
