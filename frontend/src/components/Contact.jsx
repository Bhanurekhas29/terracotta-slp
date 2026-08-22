import { PHONE_DIGITS, PHONE_DISPLAY, EMAIL } from "../contactInfo";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-kiln py-12 md:py-14 overflow-hidden">
      <div className="kolam-dots absolute inset-0 text-turmeric opacity-[0.08]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-turmeric mb-4">
            Get in touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ivory">
            Questions about a piece?
            <br />
            <span className="text-turmeric italic font-light">We reply from Panruti.</span>
          </h2>
          <p className="mt-5 font-body text-lg text-ivory/75 leading-relaxed">
            Sizing, custom orders, bulk requests for weddings — reach us directly,
            no chatbot in between.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-2xl">
          <Reveal
            as="a"
            href={`https://wa.me/${PHONE_DIGITS}`}
            target="_blank"
            rel="noopener noreferrer"
            delay={80}
            className="group flex items-center gap-4 rounded-2xl bg-ivory/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.6 6.32A8.86 8.86 0 0 0 11.94 4C7.13 4 3.2 7.93 3.2 12.74c0 1.55.4 3.03 1.18 4.35L3.13 21l4.02-1.23a9.55 9.55 0 0 0 4.79 1.29h.01c4.81 0 8.73-3.93 8.73-8.74a8.7 8.7 0 0 0-3.08-6zm-5.66 13.4h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3 .92.92-2.92-.19-.3a7.86 7.86 0 0 1-1.2-4.21c0-4.35 3.55-7.89 7.9-7.89 2.11 0 4.09.82 5.58 2.32a7.82 7.82 0 0 1 2.31 5.58c0 4.35-3.54 7.89-7.9 7.89zm4.33-5.91c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.31-1.64-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.75-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
              </svg>
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-wide text-charcoal/50">
                WhatsApp
              </span>
              <span className="block font-body font-semibold text-charcoal group-hover:text-clay transition-colors">
                {PHONE_DISPLAY}
              </span>
            </span>
          </Reveal>

          <Reveal
            as="a"
            href={`mailto:${EMAIL}`}
            delay={160}
            className="group flex items-center gap-4 rounded-2xl bg-ivory/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[11px] uppercase tracking-wide text-charcoal/50">
                Email
              </span>
              <span className="block truncate font-body font-semibold text-charcoal group-hover:text-clay transition-colors">
                {EMAIL}
              </span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
