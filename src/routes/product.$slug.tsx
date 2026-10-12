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
  head: ({ params }) => {
    const product = getProduct(params.slug);
    return {
      meta: [
        { title: product ? `${product.title} — F&J Styles` : "Piece not found — F&J Styles" },
        {
          name: "description",
          content: product?.description ?? "This piece is no longer on the floor.",
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) {
    return (
      <ShellWidth className="py-24 text-center">
        <p className="text-xs tracking-widest text-sand uppercase">404</p>
        <h1 className="mt-3 font-serif text-5xl">That piece has left the floor.</h1>
        <Link to="/shop" search={shopTo()} className="mt-8 inline-flex h-12 items-center bg-paper px-6 text-sm tracking-widest text-ink uppercase">
          Back to the shop
        </Link>
      </ShellWidth>
    );
  }
  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const [colourId, setColourId] = useState(product.colours[0]?.id ?? "");
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [hint, setHint] = useState(false);
  const add = useBoutique((state) => state.add);
  const colour = product.colours.find((item) => item.id === colourId) ?? product.colours[0];
  const related = relatedProducts(product);

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
  }

  return (
    <>
      <ShellWidth className="pt-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="shot shot-wide">
            {colour ? (
              <img
                key={colour.id}
                src={colour.image}
                alt={`${product.title} in ${colour.name}`}
                className="colour-swap"
              />
            ) : null}
          </div>

          <div>
            <p className="text-xs tracking-widest text-sand uppercase">
              {audienceLabel(product.audience)} · {categoryLabel(product.category)}
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-none lg:text-6xl">{product.title}</h1>
            <p className="mt-4 text-lg tabular-nums">
              {money(product.price)}
              {product.compareAt ? (
                <span className="ml-3 text-mute line-through">{money(product.compareAt)}</span>
              ) : null}
            </p>
            <p className="mt-6 text-mute">{product.description}</p>

            <div className="mt-8">
              <p className="text-xs tracking-widest text-mute uppercase">Colour</p>
              <div className="mt-3 flex flex-wrap" role="radiogroup" aria-label="Colour">
                {product.colours.map((item) => {
                  const selected = item.id === colour?.id;
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
              {colour ? <p className="mt-2 text-sm text-mute">{colour.name}</p> : null}
            </div>

            <div className="mt-8">
              <p className="text-xs tracking-widest text-mute uppercase">
                {product.category === "footwear" ? "UK size" : "Size"}
              </p>
              <p className="mt-1 text-sm text-mute">
                Cut true to size. If you are between sizes, take the larger one — the hem is the point.
              </p>
              <div className="chip-row mt-3 flex gap-2 overflow-x-auto" role="radiogroup" aria-label="Size">
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
                        "size-pill border px-4 text-sm",
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
              className="btn mt-8 h-14 w-full bg-paper text-sm tracking-widest text-ink uppercase"
            >
              Add to bag · {money(product.price)}
            </button>
            <p className="mt-3 text-sm text-mute">Free UK delivery over £120. Easy returns within 15 days.</p>

            <dl className="mt-10 grid gap-6 border-t border-line pt-8">
              <div>
                <dt className="text-xs tracking-widest text-sand uppercase">Fabric</dt>
                <dd className="mt-2 text-sm text-mute">{product.fabric ?? "Cotton and care, finished in London."}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-sand uppercase">Care</dt>
                <dd className="mt-2 text-sm text-mute">{product.care ?? "Wash cold. Hang to dry. Press on a low heat."}</dd>
              </div>
            </dl>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20 border-t border-line pt-12">
            <p className="text-xs tracking-widest text-sand uppercase">Worn with</p>
            <h2 className="mt-2 font-serif text-4xl">More from the floor</h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </section>
        ) : null}
      </ShellWidth>
    </>
  );
}
