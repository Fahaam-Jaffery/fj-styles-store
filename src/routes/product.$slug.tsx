import { ProductGrid } from "@/components/product-card";
import { ShellWidth } from "@/components/site";
import {
  audienceLabel,
  categoryLabel,
  getProduct,
  relatedProducts,
  shopTo,
  type Product,
} from "@/data/catalog";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useBoutique } from "@/stores/boutique";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => getProduct(params.slug) ?? null,
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — F&J Styles` : "Piece not found — F&J Styles" },
      {
        name: "description",
        content: loaderData?.description ?? "This piece is no longer on the floor.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  if (!product) {
    return (
      <ShellWidth className="py-24 text-center">
        <h1 className="font-serif text-5xl">This piece has left the floor.</h1>
        <Link to="/shop" search={shopTo()} className="mt-8 inline-flex h-12 items-center bg-paper px-6 text-sm tracking-widest text-ink uppercase">
          Back to the shop
        </Link>
      </ShellWidth>
    );
  }
  return <Detail product={product} />;
}

function Detail({ product }: { product: Product }) {
  const [colourId, setColourId] = useState(product.colours[0]?.id ?? "");
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [hint, setHint] = useState(false);
  const add = useBoutique((state) => state.add);
  const setBagOpen = useBoutique((state) => state.setBagOpen);
  const colour = product.colours.find((item) => item.id === colourId) ?? product.colours[0];
  const related = relatedProducts(product.slug);
  const audience = product.audience[0] ?? "women";

  if (!colour) return null;

  function onAdd() {
    if (!size || !colour) {
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
    setBagOpen(true);
  }

  return (
    <ShellWidth className="pt-8">
      <p className="text-sm text-mute">
        <Link to="/" className="hover:text-sand">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/shop" search={shopTo({ audience })} className="hover:text-sand">
          {audienceLabel([audience])}
        </Link>
        <span aria-hidden="true"> / </span>
        <Link to="/shop" search={shopTo({ category: product.category })} className="hover:text-sand">
          {categoryLabel(product.category)}
        </Link>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="shot shot-portrait">
            <img key={colour.id} src={colour.image} alt={`${product.title} in ${colour.name}`} className="colour-swap" />
            {product.discount ? (
              <span className="absolute top-4 left-4 bg-ink px-3 py-2 text-sm tracking-widest text-paper">
                −{product.discount}%
              </span>
            ) : null}
          </div>
          {product.colours.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.colours.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setColourId(item.id)}
                  aria-label={`Show ${item.name}`}
                  className={cn("shot shot-portrait", item.id === colour.id ? "outline-2 outline-sand" : "opacity-80")}
                >
                  <img src={item.image} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-xs tracking-widest text-sand uppercase">{audienceLabel(product.audience)}</p>
          <h1 className="mt-2 font-serif text-5xl leading-none">{product.title}</h1>
          <p className="mt-4 text-lg tabular-nums">
            {money(product.price)}
            {product.compareAt ? (
              <span className="ml-3 text-base text-mute line-through">{money(product.compareAt)}</span>
            ) : null}
          </p>
          <p className="mt-6 max-w-lg text-mute">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs tracking-widest text-sand uppercase">Colour · {colour.name}</p>
            <div className="mt-2 flex" role="radiogroup" aria-label="Colour">
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
                        "h-5 w-5 rounded-full border border-line",
                        selected && "outline-2 outline-offset-2 outline-sand",
                      )}
                      style={{ backgroundColor: item.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs tracking-widest text-sand uppercase">
              {product.category === "footwear" ? "UK size" : "Size"}
            </p>
            {product.category === "dresses" ? (
              <p className="mt-2 max-w-md text-sm text-mute">
                Cut true to size. If you are between sizes, take the larger one — the hem is the point.
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
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
                      "h-12 min-w-12 border px-4 text-sm",
                      selected ? "border-paper bg-paper text-ink" : "border-line",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            {hint ? <p className="mt-2 text-sm text-clay">Choose a size first.</p> : null}
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="mt-8 h-14 w-full bg-paper text-sm tracking-widest text-ink uppercase"
          >
            Add to bag · {money(product.price)}
          </button>
          <p className="mt-3 text-sm text-mute">Free UK delivery over £120. Easy returns within 15 days.</p>

          <dl className="mt-10 grid gap-6 border-t border-line pt-8">
            <div>
              <dt className="text-xs tracking-widest text-sand uppercase">Fabric</dt>
              <dd className="mt-2 text-sm">{product.fabric}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-widest text-sand uppercase">Care</dt>
              <dd className="mt-2 text-sm">{product.care}</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mt-20">
          <h2 className="mb-8 font-serif text-4xl">Worn with</h2>
          <ProductGrid products={related} />
        </div>
      ) : null}
    </ShellWidth>
  );
}
