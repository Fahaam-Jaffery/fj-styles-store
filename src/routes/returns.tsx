import { PageIntro, ShellWidth } from "@/components/site";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Exchange & returns — F&J Styles" },
      { name: "description", content: "Fifteen-day exchanges and returns at F&J Styles." },
    ],
  }),
  component: ReturnsPage,
});

const points = [
  {
    title: "Fifteen days",
    copy: "From the day the parcel arrives. The same window for women, men, kids, and the candle — if the candle is unburned.",
  },
  {
    title: "Exchanges",
    copy: "Free in the UK. Tell us the order code and the size or colour you want instead. We send the new piece once the first is on its way back.",
  },
  {
    title: "Refunds",
    copy: "Unworn, with tags, in a condition we can sell again. Sale pieces are included unless the page says final. Refunds return to the original method.",
  },
  {
    title: "How to start",
    copy: "Look up the order so you have the FJ code, then bring the piece to Bermondsey or Marylebone, or send it back with that code on the outside.",
  },
];

function ReturnsPage() {
  return (
    <>
      <PageIntro kicker="Customer support" title="Exchange & returns" lede="A fortnight is enough time to decide. We would rather you send it back than keep a coat you do not wear." />
      <ShellWidth>
        <div className="grid gap-8 md:grid-cols-2">
          {points.map((point) => (
            <article key={point.title} className="border border-line p-6">
              <h2 className="font-serif text-3xl">{point.title}</h2>
              <p className="mt-3 text-mute">{point.copy}</p>
            </article>
          ))}
        </div>
        <Link to="/track" search={{ order: "" }} className="btn mt-10 inline-flex h-12 items-center bg-paper px-6 text-sm tracking-widest text-ink uppercase">
          Track your order
        </Link>
      </ShellWidth>
    </>
  );
}
