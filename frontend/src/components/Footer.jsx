import Reveal from "./Reveal";
import logo from "../assets/vhw-logoimage.png";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-8">
      <Reveal as="div" className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Vetri Handworks" className="h-24 w-24 rounded-full object-cover" />
              <span className="font-display leading-none uppercase font-bold text-turmeric">
                <span className="block text-3xl tracking-wide">Vetri</span>
                <span className="block text-xl tracking-[0.2em]">Handworks</span>
              </span>
            </div>
            <p className="mt-4 font-body text-sm text-ivory/60 max-w-sm leading-relaxed">
              Handmade terracotta jewelry, kiln-fired by artisan families in
              Panruti, Tamil Nadu.
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
          <p>© 2023 Vetri Handworks Terracotta Jewelry. Panruti, Tamil Nadu.</p>
          <p>Every piece handmade — no two batches are identical.</p>
        </div>
      </Reveal>
    </footer>
  );
}
