import { useEffect, useState } from "react";
import { getSiteSettings } from "../api";
import Reveal from "./Reveal";

// Bundled fallback, used until an admin uploads a video via Site Settings in the admin panel.
const FALLBACK_VIDEO = "/videos/hero.mp4";
const FALLBACK_POSTER = "/images/hero-poster.png";

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState(FALLBACK_VIDEO);
  const [posterSrc, setPosterSrc] = useState(FALLBACK_POSTER);

  useEffect(() => {
    getSiteSettings()
      .then((data) => {
        if (data.hero_video) setVideoSrc(data.hero_video);
        if (data.hero_poster) setPosterSrc(data.hero_poster);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-kiln pt-24 pb-10 md:pt-28 md:pb-12"
    >
      <video
        key={videoSrc}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-kiln/70" aria-hidden="true" />
      <div className="kolam-dots absolute inset-0 text-turmeric opacity-[0.08]" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-kiln-deep/60 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-turmeric mb-6">
            Handmade in Panruti, Tamil Nadu
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] text-ivory font-semibold tracking-tight">
            Earth, shaped
            <br />
            <span className="text-turmeric italic font-light">into ornament.</span>
          </h1>
          <p className="mt-7 max-w-md font-body text-lg text-ivory/80 leading-relaxed">
            Every Mannvasam piece is thrown, dried and kiln-fired by hand —
            no two are ever quite the same, and that's the point.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              className="rounded-full bg-turmeric px-7 py-3.5 font-body text-sm font-semibold text-charcoal hover:bg-ivory transition-colors"
            >
              Shop the collection
            </a>
            <a
              href="#process"
              className="rounded-full border border-ivory/30 px-7 py-3.5 font-body text-sm font-semibold text-ivory hover:border-ivory hover:bg-ivory/5 transition-colors"
            >
              See how it's made
            </a>
          </div>

          <div className="mt-14 flex items-center gap-8 font-mono text-xs text-ivory/60">
            <div>
              <div className="text-2xl text-ivory font-body font-semibold">900°C</div>
              firing temperature
            </div>
            <div className="h-8 w-px bg-ivory/20" />
            <div>
              <div className="text-2xl text-ivory font-body font-semibold">6–8 days</div>
              shape to shelf
            </div>
            <div className="h-8 w-px bg-ivory/20" />
            <div>
              <div className="text-2xl text-ivory font-body font-semibold">1 kiln</div>
              per batch, always
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
