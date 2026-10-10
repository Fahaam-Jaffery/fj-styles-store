import { ProductGrid } from "@/components/product-card";
import { articles } from "@/data/journal";
import { byRail, shopTo, type CategoryId, type ShopQuery } from "@/data/catalog";
import { longDate } from "@/lib/format";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "F&J Styles — London clothing house" },
      {
        name: "description",
        content:
          "Outerwear, dresses, denim, and everyday pieces for women, men, and children. Cut in London.",
      },
    ],
  }),
  component: Home,
});

const slides = [
  {
    id: "01",
    kicker: "Outerwear",
    title: "Weather, considered.",
    copy: "A storm-collar mac in matte cotton. Tailored enough for dinner, weatherproof enough for a wet mews.",
    image: "/catalogue/mac-charcoal.jpg",
    alt: "Woman in a charcoal mac standing on wet cobbles",
    cta: "Shop the mac",
    to: "/product/$slug" as const,
    params: { slug: "bermondsey-mac" },
  },
  {
    id: "02",
    kicker: "Weatherproof",
    title: "Rain, without the shine.",
    copy: "The Regent Parka. Taped seams, a high collar, and olive that does not shout. Made for bridges and late trains.",
    image: "/catalogue/parka-olive.jpg",
    alt: "Man in an olive parka in the rain, with Big Ben behind him",
    cta: "Shop the parka",
    to: "/product/$slug" as const,
    params: { slug: "regent-parka" },
  },
];

const promises = [
  {
    icon: Sparkles,
    title: "Premium fabrics",
    copy: "Wool crepe, silk satin, organic denim. The cloth is named on every piece.",
  },
  {
    icon: Truck,
    title: "Quick & safe delivery",
    copy: "UK mainland in two to four days. Free over £120. Packed in Bermondsey.",
  },
  {
    icon: RotateCcw,
    title: "Easy 15-day returns",
    copy: "Change your mind. Exchanges are free in the UK, sale pieces included.",
  },
  {
    icon: ShieldCheck,
    title: "Customer notes",
    copy: "We publish what people write after they have worn the thing. No star widgets.",
  },
];

function Home() {
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];

  return (
    <>
      <section className="grid lg:grid-cols-2">
        <div className="hero-shot">
          <img key={slide.image} src={slide.image} alt={slide.alt} className="colour-swap" fetchPriority="high" />
        </div>
        <div className="flex flex-col justify-between bg-paper px-6 py-10 text-ink sm:px-10 lg:px-14 lg:py-16">
          <p className="text-xs tracking-widest text-sand-deep uppercase">{slide.kicker}</p>
          <div className="my-10">
            <h1 className="font-serif text-5xl leading-none lg:text-6xl">{slide.title}</h1>
            <p className="mt-5 max-w-md text-lg">{slide.copy}</p>
            <Link
              to={slide.to}
              params={slide.params}
              className="mt-8 inline-flex h-12 items-center bg-ink px-6 text-sm tracking-widest text-paper uppercase"
            >
              {slide.cta}
            </Link>
          </div>
          <div className="flex gap-6" role="tablist" aria-label="Hero stories">
            {slides.map((item, itemIndex) => {
              const active = itemIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setIndex(itemIndex)}
                  className={active ? "font-serif text-3xl" : "font-serif text-3xl text-sand-deep"}
                >
                  {item.id}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid border border-line sm:grid-cols-3">
          <AudienceTile label="Women" image="/catalogue/slip-ivory.jpg" alt="Ivory silk slip dress" search={shopTo({ audience: "women" })} />
          <AudienceTile label="Men" image="/catalogue/parka-olive.jpg" alt="Olive parka" search={shopTo({ audience: "men" })} />
          <AudienceTile label="Kids" image="/catalogue/kid-yellow.jpg" alt="Child in a saffron raincoat" search={shopTo({ audience: "kids" })} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHead kicker="Just dropped" title="On the rail this week" href="/shop" search={shopTo({ sort: "new" })} />
        <ProductGrid products={byRail("dropped")} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        <CollectionCard
          image="/catalogue/column-sand.jpg"
          alt="Sand wool column dress"
          kicker="Made for every day"
          title="The quiet uniform."
          copy="Column dresses, heavy tees, a jean with no story on the pocket."
          tags={[
            { label: "Dresses", search: shopTo({ category: "dresses" }) },
            { label: "Essentials", search: shopTo({ category: "essentials" }) },
            { label: "Women", search: shopTo({ audience: "women" }) },
          ]}
        />
        <CollectionCard
          image="/catalogue/hoodie-sand.jpg"
          alt="Marigold cotton crew"
          kicker="Comfort for every day"
          title="Soft, on purpose."
          copy="Brushed crews, wool-cotton sets, and a kids' knit that survives a term."
          tags={[
            { label: "Sweats", search: shopTo({ category: "sweats" }) },
            { label: "Kids", search: shopTo({ audience: "kids" }) },
            { label: "Men", search: shopTo({ audience: "men" }) },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHead kicker="Top picks" title="Everyday essentials" href="/shop" search={shopTo({ category: "essentials" })} />
        <ProductGrid products={byRail("picks")} />
      </section>

      <section className="bg-ink-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHead kicker="New denim drop" title="Two washes. One jean." href="/shop" search={shopTo({ category: "denim" })} />
          <ProductGrid products={byRail("denim")} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHead kicker="Also on the floor" title="Accessories, scent, essentials" />
        <div className="grid gap-4 md:grid-cols-3">
          <Dept image="/catalogue/sunglasses.jpg" alt="Round gold sunglasses" title="Accessories" category="accessories" />
          <Dept image="/catalogue/candle.jpg" alt="Lit fig and cedar candle" title="Fragrances" category="fragrances" />
          <Dept image="/catalogue/tee-white.jpg" alt="Heavy white tee" title="Essentials" category="essentials" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHead kicker="Journal" title="Style guides" href="/journal" />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <Link key={article.slug} to="/journal/$slug" params={{ slug: article.slug }} className="group">
              <div className="shot shot-portrait">
                <img src={article.image} alt="" className="transition duration-300 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-xs tracking-widest text-sand uppercase">{article.tag}</p>
              <h3 className="mt-1 font-serif text-2xl group-hover:text-sand">{article.title}</h3>
              <p className="mt-2 text-sm text-mute">
                {longDate(article.date)} · {article.minutes} min
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-paper text-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {promises.map((item) => (
            <div key={item.title}>
              <item.icon className="size-6" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-2xl">{item.title}</h2>
              <p className="mt-2 text-sm">{item.copy}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-rule px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
          <blockquote>
            <p className="font-serif text-2xl">“The mac survived a week of Bermondsey rain and still looked like I meant to wear it.”</p>
            <footer className="mt-3 text-sm text-sand-deep">Amira, SE16</footer>
          </blockquote>
          <blockquote>
            <p className="font-serif text-2xl">“Ordered the stone jean and the indigo. Kept both. That was not the plan.”</p>
            <footer className="mt-3 text-sm text-sand-deep">Jonah, Manchester</footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}

function AudienceTile({
  label,
  image,
  alt,
  search,
}: {
  label: string;
  image: string;
  alt: string;
  search: ShopQuery;
}) {
  return (
    <Link to="/shop" search={search} className="group relative block min-h-64 overflow-hidden border-line sm:border-l sm:first:border-l-0">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      <span className="absolute bottom-0 left-0 bg-ink px-4 py-3 font-serif text-3xl text-paper">{label}</span>
    </Link>
  );
}

function CollectionCard({
  image,
  alt,
  kicker,
  title,
  copy,
  tags,
}: {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  copy: string;
  tags: Array<{ label: string; search: ShopQuery }>;
}) {
  return (
    <article className="border border-line">
      <div className="shot shot-wide">
        <img src={image} alt={alt} />
      </div>
      <div className="p-6">
        <p className="text-xs tracking-widest text-sand uppercase">{kicker}</p>
        <h2 className="mt-2 font-serif text-4xl">{title}</h2>
        <p className="mt-3 max-w-md text-mute">{copy}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.label}
              to="/shop"
              search={tag.search}
              className="inline-flex h-11 items-center border border-line px-4 text-sm hover:border-paper"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

function Dept({
  image,
  alt,
  title,
  category,
}: {
  image: string;
  alt: string;
  title: string;
  category: CategoryId;
}) {
  return (
    <Link to="/shop" search={shopTo({ category })} className="group block">
      <div className="shot shot-portrait">
        <img src={image} alt={alt} className="transition duration-300 group-hover:scale-105" />
      </div>
      <h3 className="mt-3 font-serif text-3xl group-hover:text-sand">{title}</h3>
    </Link>
  );
}

function SectionHead({
  kicker,
  title,
  href,
  search,
}: {
  kicker: string;
  title: string;
  href?: "/shop" | "/journal";
  search?: ShopQuery;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs tracking-widest text-sand uppercase">{kicker}</p>
        <h2 className="mt-2 font-serif text-4xl lg:text-5xl">{title}</h2>
      </div>
      {href === "/shop" && search ? (
        <Link to="/shop" search={search} className="shrink-0 text-sm text-sand underline-offset-4 hover:underline">
          View all
        </Link>
      ) : null}
      {href === "/journal" ? (
        <Link to="/journal" className="shrink-0 text-sm text-sand underline-offset-4 hover:underline">
          All stories
        </Link>
      ) : null}
    </div>
  );
}
