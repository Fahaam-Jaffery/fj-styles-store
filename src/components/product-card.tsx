import { categoryLabel, type Product } from "@/data/catalog";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useBoutique } from "@/stores/boutique";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const [colourId, setColourId] = useState(product.colours[0]?.id ?? "");
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [hint, setHint] = useState(false);
  const add = useBoutique((state) => state.add);
  const colour = product.colours.find((item) => item.id === colourId) ?? product.colours[0];

  if (!colour) return null;

  function onAdd() {
    if (!size) {
      setHint(true);
      return;
    }
    add({
      slug: product.slug,
      title: product.title,
      colour: colour.name,
      colourId: colour.id,
      size,
      price: product.price,
      image: colour.image,
    });
  }

  return (
    <article className="flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="shot shot-portrait block"
      >
        <img
          key={colour.id}
          src={colour.image}
          alt={`${product.title} in ${colour.name}`}
          className="colour-swap"
        />
        {product.discount ? (
          <span className="absolute top-3 left-3 rounded-[var(--radius-btn)] bg-ink px-2 py-1 text-xs tracking-widest text-paper">
            −{product.discount}%
          </span>
        ) : null}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest text-mute uppercase">{categoryLabel(product.category)}</p>
          <h3 className="mt-1 font-serif text-xl leading-tight">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="quiet-link hover:text-sand">
              {product.title}
            </Link>
          </h3>
        </div>
        <p className="text-right text-sm tabular-nums">
          <span>{money(product.price)}</span>
          {product.compareAt ? (
            <span className="mt-0.5 block text-mute line-through">{money(product.compareAt)}</span>
          ) : null}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap" role="radiogroup" aria-label={`${product.title} colour`}>
        {product.colours.map((item) => {
          const selected = item.id === colour.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={item.name}
              onClick={() => setColourId(item.id)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  "h-4 w-4 rounded-full border border-line",
                  selected && "outline-2 outline-offset-2 outline-sand",
                )}
                style={{ backgroundColor: item.hex }}
              />
            </button>
          );
        })}
      </div>

      <div className="chip-row mt-1 flex gap-2 overflow-x-auto" role="radiogroup" aria-label={`${product.title} size`}>
        {product.sizes.map((item) => {
          const selected = item === size;
          return (
            <button
              key={item}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => {
                setSize(item);
                setHint(false);
              }}
              className={cn(
                "size-pill shrink-0 border px-3 text-sm",
                selected ? "border-paper bg-paper text-ink" : "border-line text-paper",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="btn mt-3 h-11 border border-paper text-sm tracking-widest uppercase hover:bg-paper hover:text-ink"
      >
        Add to bag
      </button>
      {hint ? <p className="mt-2 text-sm text-clay">Choose a size first.</p> : null}
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="border border-line px-6 py-16 text-center text-mute" style={{ borderRadius: "var(--radius-frame)" }}>
        Nothing in this edit. Try another filter.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

/** Horizontal arrow-driven carousel for homepage apparel rows */
export function ProductRail({ products, label }: { products: Product[]; label?: string }) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByDir(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.72, 240);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  if (products.length === 0) {
    return (
      <p className="border border-line px-6 py-16 text-center text-mute" style={{ borderRadius: "var(--radius-frame)" }}>
        Nothing in this edit.
      </p>
    );
  }

  return (
    <div className="rail-wrap" aria-label={label ?? "Product carousel"}>
      <div className="rail-fade rail-fade-left hidden sm:block" aria-hidden="true" />
      <div className="rail-fade rail-fade-right hidden sm:block" aria-hidden="true" />
      <button
        type="button"
        className="rail-arrow rail-arrow-left hidden sm:flex"
        aria-label="Scroll products left"
        onClick={() => scrollByDir(-1)}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        className="rail-arrow rail-arrow-right hidden sm:flex"
        aria-label="Scroll products right"
        onClick={() => scrollByDir(1)}
      >
        <ChevronRight className="size-5" />
      </button>
      <div ref={scroller} className="rail-track">
        {products.map((product) => (
          <div key={product.slug}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
