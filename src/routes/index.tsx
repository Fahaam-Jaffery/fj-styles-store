import { ProductGrid, ProductRail } from "@/components/product-card";
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
    title: "Cut in London",
    copy: "Small runs, careful finishing. We would rather make less and make it well.",
  },
  {
    icon: Truck,
    title: "Free over £120",
    copy: "UK delivery is free once the bag clears one-twenty. Under that, a flat £4.50.",
  },
  {
    icon: RotateCcw,
    title: "Fifteen-day returns",
    copy: "Unworn, with tags. Exchanges are free in the UK.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    copy: "Card, Apple Pay, and Google Pay. Orders track with an FJ code.",
  },
];

const collections: Array<{ title: string; lede: string; image: string; alt: string; search: ShopQuery }> = [
  {
    title: "Women",
    lede: "Outerwear, dresses, denim, and the soft pieces between.",
    image: "/catalogue/woman-coat.jpg",
    alt: "Woman in a long coat on a London street",
    search: shopTo({ audience: "women" }),
  },
  {
    title: "Men",
    lede: "Parkas, knits, and jeans that hold a crease.",
    image: "/catalogue/parka-olive.jpg",
    alt: "Man in an olive parka",
    search: shopTo({ audience: "men" }),
  },
  {
    title: "Kids",
    lede: "Tough enough for the park, soft enough for the sofa.",
    image: "/catalogue/kid-navy.jpg",
    alt: "Child in a navy knit",
    search: shopTo({ audience: "kids" }),
  },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const active = slides[slide] ?? slides[0];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <p className="text-xs tracking-widest text-sand uppercase">{active.kicker} · {active.id}</p>
            <h1 className="mt-4 max-w-xl font-serif text-5xl leading-none lg:text-7xl">{active.title}</h1>
            <p className="mt-6 max-w-md text-mute">{active.copy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={active.to}
                params={active.params}
                className="btn inline-flex h-12 items-center bg-paper px-6 text-sm tracking-widest text-ink uppercase"
              >
                {active.cta}
              </Link>
              <Link
                to="/shop"
                search={shopTo({ sort: "new" })}
                className="btn inline-flex h-12 items-center border border-paper px-6 text-sm tracking-widest uppercase"
              >
                New in
              </Link>
            </div>
            <div className="mt-10 flex gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSlide(index)}
                  className={index === slide ? "h-1 w-8 bg-paper" : "h-1 w-8 bg-line"}
                  aria-label={`Show slide ${item.id}`}
                />
              ))}
            </div>
          </div>
          <div className="hero-shot m-4 lg:m-6">
            <img key={active.id} src={active.image} alt={active.alt} className="colour-swap" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHead kicker="Just dropped" title="On the rail this week" href="/shop" search={shopTo({ sort: "new" })} />
        <ProductRail products={byRail("dropped")} label="Just dropped" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
        {collections.slice(0, 2).map((item) => (
          <Link key={item.title} to="/shop" search={item.search} className="group relative block overflow-hidden">
            <div className="shot shot-wide">
              <img src={item.image} alt={item.alt} />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 to-transparent p-6">
              <p className="text-xs tracking-widest text-sand uppercase">{item.title}</p>
              <p className="mt-2 font-serif text-3xl group-hover:text-sand">{item.lede}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHead kicker="Top picks" title="Everyday essentials" href="/shop" search={shopTo({ category: "essentials" })} />
        <ProductRail products={byRail("picks")} label="Top picks" />
      </section>

      <section className="bg-ink-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHead kicker="New denim drop" title="Two washes. One jean." href="/shop" search={shopTo({ category: "denim" })} />
          <ProductRail products={byRail("denim")} label="Denim" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHead kicker="Journal" title="Notes from the house" href="/journal" />
        <JournalStrip />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {promises.map((item) => (
            <div key={item.title}>
              <item.icon className="size-6 text-sand" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
              <p className="mt-2 text-sm text-mute">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
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
  href: string;
  search?: ShopQuery;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs tracking-widest text-sand uppercase">{kicker}</p>
        <h2 className="mt-2 font-serif text-4xl">{title}</h2>
      </div>
      {href === "/journal" ? (
        <Link to="/journal" className="text-sm tracking-widest text-mute uppercase underline-offset-4 hover:underline">
          View all
        </Link>
      ) : (
        <Link to="/shop" search={search} className="text-sm tracking-widest text-mute uppercase underline-offset-4 hover:underline">
          View all
        </Link>
      )}
    </div>
  );
}

function JournalStrip() {
  const posts = articles.slice(0, 3);
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.slug} to="/journal/$slug" params={{ slug: post.slug }} className="group">
          <div className="shot shot-wide">
            <img src={post.image} alt="" />
          </div>
          <p className="mt-4 text-xs tracking-widest text-mute uppercase">{longDate(post.date)}</p>
          <h3 className="mt-2 font-serif text-2xl group-hover:text-sand">{post.title}</h3>
          <p className="mt-2 text-sm text-mute">{post.excerpt}</p>
        </Link>
      ))}
      {posts.length === 0 ? (
        <Link to="/journal" className="text-sm tracking-widest text-mute uppercase underline-offset-4 hover:underline">
          All stories
        </Link>
      ) : null}
    </div>
  );
}
