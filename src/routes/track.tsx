import { PageIntro, ShellWidth } from "@/components/site";
import { money, longDate } from "@/lib/format";
import { orderStatus, useBoutique } from "@/stores/boutique";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useStoreReady } from "@/components/use-store-ready";

export const Route = createFileRoute("/track")({
  validateSearch: (search: Record<string, unknown>) => ({
    order: typeof search.order === "string" ? search.order.slice(0, 20) : "",
  }),
  head: () => ({
    meta: [
      { title: "Track your order — F&J Styles" },
      { name: "description", content: "Look up an F&J Styles house order with its FJ code." },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const search = Route.useSearch();
  const orders = useBoutique((state) => state.orders);
  const ready = useStoreReady();
  const [code, setCode] = useState(search.order);
  const [asked, setAsked] = useState(search.order);

  function submit(event: FormEvent) {
    event.preventDefault();
    setAsked(code.trim().toUpperCase());
  }

  const match = orders.find((order) => order.id.toUpperCase() === asked.toUpperCase());

  return (
    <>
      <PageIntro
        kicker="Support"
        title="Track your order"
        lede="Orders placed here stay on this browser, so you can come back to them. A code from another phone will not show."
      />
      <ShellWidth>
        <form onSubmit={submit} className="flex max-w-xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="order-code">
            Order code
          </label>
          <input
            id="order-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="FJ-000000"
            className="h-12 flex-1 border border-line bg-ink-soft px-3 text-paper uppercase outline-none"
          />
          <button type="submit" className="h-12 bg-paper px-6 text-sm tracking-widest text-ink uppercase">
            Look up
          </button>
        </form>

        {asked && ready && !match ? (
          <p className="mt-8 max-w-xl text-mute">
            No order {asked} on this device. Check the code, or place one from the bag.
          </p>
        ) : null}

        {match ? (
          <article className="mt-10 max-w-2xl border border-line p-6">
            <p className="text-xs tracking-widest text-sand uppercase">{orderStatus(match.id)}</p>
            <h2 className="mt-2 font-serif text-4xl">{match.id}</h2>
            <p className="mt-2 text-sm text-mute">
              Placed {longDate(match.createdAt.slice(0, 10))} · {match.name}
            </p>
            <p className="mt-4 text-sm">
              {match.address}, {match.city}, {match.postcode}
            </p>
            <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-4 text-sm">
              {match.lines.map((line) => (
                <li key={line.id} className="flex justify-between gap-4">
                  <span>
                    {line.title} · {line.colour} · {line.size} × {line.qty}
                  </span>
                  <span className="tabular-nums">{money(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right font-serif text-2xl tabular-nums">{money(match.total)}</p>
          </article>
        ) : null}

        {ready && orders.length > 0 ? (
          <div className="mt-12">
            <h2 className="font-serif text-2xl">On this device</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {orders.map((order) => (
                <li key={order.id}>
                  <button
                    type="button"
                    className="text-sand hover:underline"
                    onClick={() => {
                      setCode(order.id);
                      setAsked(order.id);
                    }}
                  >
                    {order.id} · {money(order.total)} · {orderStatus(order.id)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </ShellWidth>
    </>
  );
}
