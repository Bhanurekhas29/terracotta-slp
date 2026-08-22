import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getCategories, getProducts } from "../api";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

const VISIBLE_ROWS = 1;

// Shown if the Django API isn't reachable yet, so the page still demos well.
const FALLBACK_PRODUCTS = [
  { id: "f1", name: "Panruti Sunburst Necklace", price: 2450, finish: "matte", artisan_village: "Panruti, Tamil Nadu", in_stock: true, category: { slug: "necklaces" }, image: null },
  { id: "f2", name: "Kolam Dot Jhumkas", price: 890, finish: "antique", artisan_village: "Panruti, Tamil Nadu", in_stock: true, category: { slug: "earrings" }, image: null },
  { id: "f3", name: "Temple Arch Choker", price: 3200, finish: "hand_painted", artisan_village: "Pondicherry", in_stock: true, category: { slug: "necklaces" }, image: null },
  { id: "f4", name: "Kaveri Bridal Set", price: 6800, finish: "hand_painted", artisan_village: "Panruti, Tamil Nadu", in_stock: true, category: { slug: "bridal-sets" }, image: null },
  { id: "f5", name: "Marigold Stud Pair", price: 450, finish: "matte", artisan_village: "Athangudi, Tamil Nadu", in_stock: true, category: { slug: "earrings" }, image: null },
  { id: "f6", name: "Meenakshi Drop Earrings", price: 950, finish: "glossy", artisan_village: "Panruti, Tamil Nadu", in_stock: true, category: { slug: "earrings" }, image: null },
];

const FALLBACK_CATEGORIES = [
  { id: "c1", slug: "necklaces", name: "Necklaces" },
  { id: "c2", slug: "earrings", name: "Earrings" },
  { id: "c3", slug: "bangles-cuffs", name: "Bangles & Cuffs" },
  { id: "c4", slug: "bridal-sets", name: "Bridal Sets" },
];

export default function FeaturedCollection() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState(null);
  const [usingFallback, setUsingFallback] = useState(true);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(null);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data.results ?? data);
        setUsingFallback(false);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(activeCategory)
      .then((data) => {
        setProducts(data.results ?? data);
        setUsingFallback(false);
      })
      .catch(() => {
        setProducts(
          activeCategory
            ? FALLBACK_PRODUCTS.filter((p) => p.category.slug === activeCategory)
            : FALLBACK_PRODUCTS
        );
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  // Cap the grid at two rows tall and let it scroll internally for the rest,
  // measuring actual card height so it adapts to the mobile (2-col) / desktop (3-col) grid.
  useLayoutEffect(() => {
    function measure() {
      const el = gridRef.current;
      if (!el || el.children.length === 0) return;
      const items = [...el.children];
      const firstTop = items[0].offsetTop;
      const columns = items.filter((item) => item.offsetTop === firstTop).length;

      if (items.length <= columns * VISIBLE_ROWS) {
        setScrollHeight(null);
        return;
      }

      const cardHeight = items[0].offsetHeight;
      const secondRowItem = items[columns];
      const rowGap = secondRowItem ? secondRowItem.offsetTop - firstTop - cardHeight : 0;
      setScrollHeight(cardHeight * VISIBLE_ROWS + rowGap * (VISIBLE_ROWS - 1));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products, loading]);

  return (
    <section id="collection" className="bg-ivory pb-10 md:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="min-w-0">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-clay mb-4">
              The collection
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-charcoal">
              Pieces from the current kiln batch
            </h2>
          </div>

          <div className="flex flex-nowrap items-center gap-2 mt-5 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "bg-charcoal text-ivory"
                  : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.slug)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                  activeCategory === c.slug
                    ? "bg-charcoal text-ivory"
                    : "bg-charcoal/5 text-charcoal hover:bg-charcoal/10"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </Reveal>

        {usingFallback && (
          <p className="mt-6 font-mono text-xs text-charcoal">
            Showing sample pieces — start the Django API to load the live catalog.
          </p>
        )}

        <div
          ref={gridRef}
          style={scrollHeight ? { maxHeight: scrollHeight, overflowY: "auto" } : undefined}
          className={`mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 transition-opacity ${
            scrollHeight ? "pr-2 [scrollbar-width:thin] [scrollbar-color:var(--color-clay)_transparent]" : ""
          } ${loading ? "opacity-50" : "opacity-100"}`}
        >
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 100} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
