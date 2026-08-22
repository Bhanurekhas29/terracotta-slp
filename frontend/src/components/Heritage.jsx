import { useEffect, useState } from "react";
import { getSiteSettings } from "../api";
import Reveal from "./Reveal";

// Bundled fallback, used until an admin uploads a video via Site Settings in the admin panel.
const FALLBACK_VIDEO = "/videos/heritage.mp4";
const FALLBACK_POSTER = "/images/heritage-poster.png";

export default function Heritage() {
  const [videoSrc, setVideoSrc] = useState(FALLBACK_VIDEO);
  const [posterSrc, setPosterSrc] = useState(FALLBACK_POSTER);

  useEffect(() => {
    getSiteSettings()
      .then((data) => {
        if (data.heritage_video) setVideoSrc(data.heritage_video);
        if (data.heritage_poster) setPosterSrc(data.heritage_poster);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="heritage" className="relative bg-indigo py-12 md:py-14 overflow-hidden">
      <div className="kolam-dots absolute inset-0 text-turmeric opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-16 md:items-stretch">
        <Reveal className="order-2 md:order-1">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-turmeric mb-4">
            Our heritage
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ivory">
            Panruti has shaped clay
            <br />
            <span className="text-turmeric italic font-light">for three generations.</span>
          </h2>
          <p className="mt-6 font-body text-lg text-ivory/75 leading-relaxed max-w-lg">
            Mannvasam works with a family of potters outside Panruti, Tamil Nadu,
            whose terracotta jewelry has dressed brides and temple deities alike
            since the 1970s. We buy each finished batch directly — no middlemen,
            no factory moulds, just the same wheel the family has always used.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="font-display text-3xl text-ivory font-semibold">3</div>
              <div className="font-mono text-[11px] text-ivory/50 mt-1">generations of potters</div>
            </div>
            <div>
              <div className="font-display text-3xl text-ivory font-semibold">40+</div>
              <div className="font-mono text-[11px] text-ivory/50 mt-1">artisan families</div>
            </div>
            <div>
              <div className="font-display text-3xl text-ivory font-semibold">100%</div>
              <div className="font-mono text-[11px] text-ivory/50 mt-1">local Cauvery-belt clay</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="order-1 md:order-2 relative h-full">
          <div className="relative h-full min-h-[420px] aspect-[4/5] md:aspect-auto rounded-3xl overflow-hidden bg-gradient-to-br from-clay via-kiln to-kiln-deep">
            <div className="kolam-dots absolute inset-0 text-ivory opacity-10" aria-hidden="true" />
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
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-ivory px-5 py-4 shadow-xl max-w-[200px]">
            <p className="font-mono text-[10px] uppercase tracking-wide text-clay">Village</p>
            <p className="font-display text-lg font-semibold text-charcoal mt-0.5">Panruti, TN</p>
            <p className="font-body text-xs text-charcoal mt-1">Cuddalore district, Tamil Nadu</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
