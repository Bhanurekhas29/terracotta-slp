import { useState } from "react";
import { PHONE_DIGITS, PHONE_DISPLAY, EMAIL } from "../contactInfo";
import { submitContactMessage } from "../api";
import Reveal from "./Reveal";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Panruti,Cuddalore,Tamil+Nadu&output=embed";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedback, setFeedback] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("loading");
    try {
      const res = await submitContactMessage(form);
      setStatus("success");
      setFeedback(res.detail || "Thanks — we'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setFeedback("Couldn't send that — try WhatsApp or email instead.");
    }
  }

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

        <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-2xl">
          <Reveal
            as="a"
            href={`https://wa.me/${PHONE_DIGITS}`}
            target="_blank"
            rel="noopener noreferrer"
            delay={60}
            className="group flex items-center gap-4 rounded-2xl bg-ivory/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.6 6.32A8.86 8.86 0 0 0 11.94 4C7.13 4 3.2 7.93 3.2 12.74c0 1.55.4 3.03 1.18 4.35L3.13 21l4.02-1.23a9.55 9.55 0 0 0 4.79 1.29h.01c4.81 0 8.73-3.93 8.73-8.74a8.7 8.7 0 0 0-3.08-6zm-5.66 13.4h-.01a7.9 7.9 0 0 1-4.03-1.1l-.29-.17-3 .92.92-2.92-.19-.3a7.86 7.86 0 0 1-1.2-4.21c0-4.35 3.55-7.89 7.9-7.89 2.11 0 4.09.82 5.58 2.32a7.82 7.82 0 0 1 2.31 5.58c0 4.35-3.54 7.89-7.9 7.89zm4.33-5.91c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.63-1.18-1.4-1.31-1.64-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.75-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
              </svg>
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-wide text-charcoal">
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
            delay={120}
            className="group flex items-center gap-4 rounded-2xl bg-ivory/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[11px] uppercase tracking-wide text-charcoal">
                Email
              </span>
              <span className="block truncate font-body font-semibold text-charcoal group-hover:text-clay transition-colors">
                {EMAIL}
              </span>
            </span>
          </Reveal>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8 items-stretch">
          <Reveal delay={180} as="form" onSubmit={handleSubmit} className="flex h-full flex-col rounded-2xl bg-ivory/95 p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block font-mono text-[11px] uppercase tracking-wide text-charcoal mb-1.5">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-charcoal/15 bg-white px-3.5 py-2.5 font-body text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-clay"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-mono text-[11px] uppercase tracking-wide text-charcoal mb-1.5">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-charcoal/15 bg-white px-3.5 py-2.5 font-body text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-clay"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-1 flex-col">
              <label htmlFor="contact-message" className="block font-mono text-[11px] uppercase tracking-wide text-charcoal mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full flex-1 min-h-[120px] resize-none rounded-lg border border-charcoal/15 bg-white px-3.5 py-2.5 font-body text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-clay"
                placeholder="Tell us what you're looking for…"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-5 w-full rounded-full bg-clay py-3 font-body text-sm font-semibold text-ivory hover:bg-kiln-deep transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Send message"}
            </button>

            {feedback && (
              <p
                className={`mt-3 font-mono text-xs ${status === "error" ? "text-kiln" : "text-clay"}`}
                role="status"
              >
                {feedback}
              </p>
            )}
          </Reveal>

          <Reveal delay={240} className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-ivory/20">
            <iframe
              title="Mannvasam studio location — Panruti, Tamil Nadu"
              src={MAP_EMBED_SRC}
              className="h-full min-h-[320px] w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
