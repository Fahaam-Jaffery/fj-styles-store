import { PageIntro, ShellWidth } from "@/components/site";
import { deliveryFee } from "@/data/catalog";
import { money } from "@/lib/format";
import { bagTotal, useBoutique } from "@/stores/boutique";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — F&J Styles" },
      { name: "description", content: "Place a house order with F&J Styles. UK delivery." },
    ],
  }),
  component: CheckoutPage,
});

const field = "h-12 w-full border border-line bg-ink-soft px-3 text-paper outline-none";

function CheckoutPage() {
  const lines = useBoutique((state) => state.lines);
  const placeOrder = useBoutique((state) => state.placeOrder);
  const navigate = useNavigate();
  const goods = bagTotal(lines);
  const fee = deliveryFee(goods);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (lines.length === 0) {
      setError("The bag is empty.");
      return;
    }
    if (form.name.trim().length < 2) return setError("Add the name for the parcel.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("Add a proper email.");
    if (form.phone.replace(/\D/g, "").length < 10) return setError("Add a UK phone number.");
    if (form.address.trim().length < 4 || form.city.trim().length < 2) return setError("Add the delivery address.");
    if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(form.postcode.trim())) {
      return setError("That postcode does not look like a UK one.");
    }
    const id = placeOrder({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      postcode: form.postcode.trim().toUpperCase(),
    });
    if (!id) {
      setError("The bag is empty.");
      return;
    }
    void navigate({ to: "/track", search: { order: id } });
  }

  return (
    <>
      <PageIntro kicker="Checkout" title="Where shall we send it?" lede="Nothing is charged. This places a house order you can track on this device." />
      <ShellWidth>
        {lines.length === 0 ? (
          <div className="border border-line px-6 py-16 text-center">
            <p className="font-serif text-3xl">Nothing to send.</p>
            <Link to="/shop" search={{ audience: "all", category: "all", sort: "new", q: "" }} className="mt-6 inline-flex h-12 items-center bg-paper px-6 text-sm tracking-widest text-ink uppercase">
              Return to the floor
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4">
              <Field label="Full name" value={form.name} onChange={(value) => set("name", value)} autoComplete="name" />
              <Field label="Email" value={form.email} onChange={(value) => set("email", value)} type="email" autoComplete="email" />
              <Field label="Phone" value={form.phone} onChange={(value) => set("phone", value)} type="tel" autoComplete="tel" />
              <Field label="Address" value={form.address} onChange={(value) => set("address", value)} autoComplete="street-address" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" value={form.city} onChange={(value) => set("city", value)} autoComplete="address-level2" />
                <Field label="Postcode" value={form.postcode} onChange={(value) => set("postcode", value)} autoComplete="postal-code" />
              </div>
              {error ? <p className="text-sm text-clay">{error}</p> : null}
              <button type="submit" className="h-14 bg-paper text-sm tracking-widest text-ink uppercase">
                Place order · {money(goods + fee)}
              </button>
            </div>
            <aside className="h-fit border border-line p-5">
              <h2 className="font-serif text-2xl">Your order</h2>
              <ul className="mt-4 flex flex-col gap-4">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-3 text-sm">
                    <img src={line.image} alt="" className="h-20 w-16 object-cover" />
                    <div className="flex-1">
                      <p>{line.title}</p>
                      <p className="text-mute">
                        {line.colour} · {line.size} · {line.qty}
                      </p>
                    </div>
                    <p className="tabular-nums">{money(line.price * line.qty)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-line pt-4 text-sm">
                <Row label="Subtotal" value={money(goods)} />
                <Row label="Delivery" value={fee === 0 ? "Free" : money(fee)} />
                <div className="mt-2 flex justify-between font-serif text-2xl">
                  <span>Total</span>
                  <span className="tabular-nums">{money(goods + fee)}</span>
                </div>
              </div>
            </aside>
          </form>
        )}
      </ShellWidth>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const id = label.toLowerCase().replace(/\s/g, "-");
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs tracking-widest text-sand uppercase">{label}</span>
      <input id={id} className={field} type={type} value={value} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-mute">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
