import { PageIntro, ShellWidth } from "@/components/site";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Retail stores — F&J Styles" },
      { name: "description", content: "F&J Styles stores in Bermondsey and Marylebone." },
    ],
  }),
  component: StoresPage,
});

const stores = [
  {
    name: "Bermondsey Arch",
    hours: "Thursday to Sunday, 11–6",
    address: "Arch 14, Tanner Street, London SE1 3LE",
    note: "The whole floor, including kids and the candle. Fitting rooms at the back, past the rope lamps.",
    image: "/catalogue/store.jpg",
    alt: "Interior of the Bermondsey shop",
  },
  {
    name: "Marylebone",
    hours: "Saturday, 12–5, and by appointment",
    address: "18 Seymour Place, London W1H 5BG",
    note: "Outerwear and dresses only. Smaller, quieter, and better if you already know your size.",
    image: "/catalogue/woman-coat.jpg",
    alt: "Camel wrap coat, the sort of piece held in Marylebone",
  },
];

function StoresPage() {
  return (
    <>
      <PageIntro kicker="Customer support" title="Retail stores" lede="Two rooms in London. Everywhere else, the site." />
      <ShellWidth>
        <div className="grid gap-12">
          {stores.map((store) => (
            <article key={store.name} className="grid gap-6 border-b border-line pb-12 lg:grid-cols-2">
              <div className="shot shot-wide">
                <img src={store.image} alt={store.alt} />
              </div>
              <div>
                <h2 className="font-serif text-4xl">{store.name}</h2>
                <p className="mt-3 text-sand">{store.hours}</p>
                <p className="mt-2">{store.address}</p>
                <p className="mt-4 max-w-md text-mute">{store.note}</p>
              </div>
            </article>
          ))}
        </div>
      </ShellWidth>
    </>
  );
}
