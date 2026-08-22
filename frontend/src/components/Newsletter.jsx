import { useState } from "react";
import { subscribeToNewsletter } from "../api";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await subscribeToNewsletter(email.trim());
      setStatus("success");
      setMessage(res.detail || "You're on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Couldn't reach the server — try again in a moment.");
    }
  }

  return (
    <section className="relative bg-clay py-10 md:py-12 overflow-hidden">
      <div className="kolam-dots absolute inset-0 text-ivory opacity-10" aria-hidden="true" />
      <Reveal as="div" className="relative mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ivory tracking-tight">
          Know when a new batch fires.
        </h2>
        <p className="mt-3 font-body text-ivory/80">
          One email a month, when the kiln opens. No spam, ever.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-full bg-ivory px-5 py-3 font-body text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-charcoal px-6 py-3 font-body text-sm font-semibold text-ivory hover:bg-kiln-deep transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Notify me"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 font-mono text-xs ${status === "error" ? "text-charcoal" : "text-ivory"}`}
            role="status"
          >
            {message}
          </p>
        )}
      </Reveal>
    </section>
  );
}
