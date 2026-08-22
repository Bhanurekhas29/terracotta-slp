import Reveal from "./Reveal";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-8">
      <Reveal as="div" className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-xl font-semibold">
              <LogoMark className="h-5 w-5 text-turmeric" />
              Mannvasam
            </div>
            <p className="mt-4 font-body text-sm text-ivory/60 max-w-sm leading-relaxed">
              Handmade terracotta jewelry, kiln-fired by artisan families in
              Panruti, Tamil Nadu. Mannvasam means "the scent of earth."
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ivory/40 mb-4">Shop</p>
            <ul className="space-y-2 font-body text-sm text-ivory/70">
              <li><a href="#collection" className="hover:text-turmeric">Necklaces</a></li>
              <li><a href="#collection" className="hover:text-turmeric">Earrings</a></li>
              <li><a href="#collection" className="hover:text-turmeric">Bangles & Cuffs</a></li>
              <li><a href="#collection" className="hover:text-turmeric">Bridal Sets</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ivory/40 mb-4">Studio</p>
            <ul className="space-y-2 font-body text-sm text-ivory/70">
              <li><a href="#process" className="hover:text-turmeric">Our Craft</a></li>
              <li><a href="#heritage" className="hover:text-turmeric">Heritage</a></li>
              <li><a href="#reviews" className="hover:text-turmeric">Reviews</a></li>
              <li><a href="#contact" className="hover:text-turmeric">Contact</a></li>
              <li><a href="#faq" className="hover:text-turmeric">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row justify-between gap-4 font-mono text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Mannvasam Terracotta Jewelry. Panruti, Tamil Nadu.</p>
          <p>Every piece handmade — no two batches are identical.</p>
        </div>
      </Reveal>
    </footer>
  );
}
