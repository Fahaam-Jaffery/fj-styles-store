import { PageIntro, ShellWidth } from "@/components/site";
import { createFileRoute, Link } from "@tanstack/react-router";
import { shopTo } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The house — F&J Styles" },
      { name: "description", content: "F&J Styles is a London clothing house working from Bermondsey." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageIntro
        kicker="Company"
        title="A house, not a drop."
        lede="F&J Styles cuts clothes in London for women, men, and children. The edit stays small on purpose."
      />
      <ShellWidth>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="shot shot-portrait">
            <img src="/catalogue/store.jpg" alt="The Bermondsey shop floor, rails of clothes under rope-hung lamps" />
          </div>
          <div className="flex flex-col gap-5 text-lg">
            <p>
              We work from a railway arch in Bermondsey. The floor holds dresses, denim, outerwear, footwear, and a short list of things that are not clothes: a scarf, a pair of glasses, a candle.
            </p>
            <p>
              Discounts are written as a percentage on the piece, not as a mood. Fabrics are named. If a mac is twenty percent off while the first cartons are still in the arch, the badge says so.
            </p>
            <p>
              UK mainland delivery takes two to four days and is free over £120. The islands take longer. Returns run for fifteen days, worn or not — unworn, with the tags, if you want the refund.
            </p>
            <p>
              <Link to="/stores" className="text-sand hover:underline">Visit the stores</Link>
              {" · "}
              <Link to="/shop" search={shopTo()} className="text-sand hover:underline">Shop the floor</Link>
            </p>
          </div>
        </div>
      </ShellWidth>
    </>
  );
}
