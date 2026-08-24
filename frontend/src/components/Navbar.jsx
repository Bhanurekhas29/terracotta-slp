import { useEffect, useState } from "react";
import logo from "../assets/vhw-logoimage.png";

const LINKS = [
  { href: "#collection", label: "Collection" },
  { href: "#process", label: "Our Craft" },
  { href: "#heritage", label: "Heritage" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ivory/95 backdrop-blur border-b border-charcoal/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 min-h-28 flex items-center justify-between py-3 md:grid md:grid-cols-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Vetri Handworks" className="h-24 w-24 rounded-full object-cover" />
          <span className="font-display leading-none uppercase font-bold text-turmeric">
            <span className="block text-3xl tracking-wide">Vetri</span>
            <span className="block text-xl tracking-[0.2em]">Handworks</span>
          </span>
        </a>

        <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`shrink-0 whitespace-nowrap font-body text-base font-medium tracking-wide hover:opacity-70 transition-opacity ${
                scrolled ? "text-charcoal" : "text-ivory"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-end">
          <a
            href="#collection"
            className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-ivory hover:bg-kiln transition-colors"
          >
            Shop the collection
          </a>
        </div>

        <button
          className={`md:hidden p-2 ${scrolled ? "text-charcoal" : "text-ivory"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ivory border-t border-charcoal/10 px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-charcoal font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#collection"
            className="rounded-full bg-clay px-5 py-2 text-center text-sm font-semibold text-ivory"
            onClick={() => setOpen(false)}
          >
            Shop the collection
          </a>
        </div>
      )}
    </header>
  );
}
