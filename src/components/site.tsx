import {
  categories,
  deliveryFee,
  freeDeliveryAt,
  shopTo,
  type ShopQuery,
} from "@/data/catalog";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";
import { bagCount, bagTotal, useBoutique, type Signup } from "@/stores/boutique";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { useStoreReady } from "./use-store-ready";

const ticker =
  "New season  ·  20% off outerwear  ·  Free UK delivery over £120  ·  15-day returns  ·  Women, men and kids  ·  Fig & Cedar just poured";

const floorLinks: Array<{ label: string; search: ShopQuery }> = [
  { label: "New in", search: shopTo({ sort: "new" }) },
  { label: "Women", search: shopTo({ audience: "women" }) },
  { label: "Men", search: shopTo({ audience: "men" }) },
  { label: "Kids", search: shopTo({ audience: "kids" }) },
  ...categories.map((category) => ({
    label: category.label,
    search: shopTo({ category: category.id }),
  })),
];

const fieldClass = "h-12 w-full border border-line bg-ink-soft px-3 text-paper outline-none";

export function Site({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const bagOpen = useBoutique((state) => state.bagOpen);
  const offerOpen = useBoutique((state) => state.offerOpen);
  const setBagOpen = useBoutique((state) => state.setBagOpen);
  const setOfferOpen = useBoutique((state) => state.setOfferOpen);
  const ready = useStoreReady();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
      setBagOpen(false);
      setOfferOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setBagOpen, setOfferOpen]);

  useEffect(() => {
    const locked = menuOpen || bagOpen;
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen, bagOpen]);

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the floor
      </a>
      <Ticker />
      <Header
        ready={ready}
        onMenu={() => {
          setSearchOpen(false);
          setBagOpen(false);
          setOfferOpen(false);
          setMenuOpen(true);
        }}
        onSearch={() => setSearchOpen((open) => !open)}
        onBag={() => {
          setMenuOpen(false);
          setOfferOpen(false);
          setBagOpen(true);
        }}
      />
      {searchOpen ? <SearchBar onDone={() => setSearchOpen(false)} /> : null}
      {menuOpen ? <NavDrawer onClose={() => setMenuOpen(false)} /> : null}
      <main id="main">{children}</main>
      <Footer />
      {bagOpen ? <BagDrawer ready={ready} onClose={() => setBagOpen(false)} /> : null}
      <OfferBell />
      <Notice ready={ready} />
    </div>
  );
}

function Ticker() {
  return (
    <div className="border-b border-line bg-ink-soft text-sand">
      <p className="sr-only">{ticker}</p>
      <div className="overflow-hidden" aria-hidden="true">
        <div className="marquee-track py-2 text-xs tracking-widest uppercase">
          <span className="px-6">{ticker}</span>
          <span className="px-6">{ticker}</span>
        </div>
      </div>
    </div>
  );
}

function Header({
  ready,
  onMenu,
  onSearch,
  onBag,
}: {
  ready: boolean;
  onMenu: () => void;
  onSearch: () => void;
  onBag: () => void;
}) {
  const count = useBoutique((state) => bagCount(state.lines));

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink">
      <div className="relative flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <button type="button" onClick={onMenu} className="flex h-11 items-center gap-2 text-sm tracking-widest uppercase">
            <Menu className="size-5" aria-hidden="true" />
            Menu
          </button>
          <nav className="hidden items-center gap-5 text-sm xl:flex" aria-label="Floor">
            <Link to="/shop" search={shopTo({ audience: "women" })} className="hover:text-sand">
              Women
            </Link>
            <Link to="/shop" search={shopTo({ audience: "men" })} className="hover:text-sand">
              Men
            </Link>
            <Link to="/shop" search={shopTo({ audience: "kids" })} className="hover:text-sand">
              Kids
            </Link>
            <Link to="/journal" className="hover:text-sand">
              Journal
            </Link>
          </nav>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-center">
          <span className="block font-serif text-2xl leading-none">F&J</span>
          <span className="wordmark-sub text-sand">Styles</span>
        </Link>

        <div className="flex items-center">
          <button type="button" onClick={onSearch} className="flex h-11 w-11 items-center justify-center" aria-label="Search">
            <Search className="size-5" />
          </button>
          <button type="button" onClick={onBag} className="flex h-11 items-center gap-2 px-2 text-sm" aria-label="Open bag">
            <ShoppingBag className="size-5" aria-hidden="true" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums">{ready && count > 0 ? count : ""}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function SearchBar({ onDone }: { onDone: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    void navigate({ to: "/shop", search: shopTo({ q }) });
    onDone();
  }

  return (
    <form onSubmit={submit} className="border-b border-line bg-ink-soft px-4 py-4 sm:px-6" role="search">
      <label className="block text-xs tracking-widest text-sand uppercase" htmlFor="floor-search">
        Search the floor
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="floor-search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          autoFocus
          placeholder="Mac, denim, kids, fig…"
          className={fieldClass}
        />
        <button type="submit" className="h-12 bg-paper px-5 text-sm tracking-widest text-ink uppercase">
          Go
        </button>
      </div>
    </form>
  );
}

function NavDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex bg-ink text-paper" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="drawer-left flex w-full flex-col overflow-y-auto px-6 py-6 lg:w-1/2 lg:px-14">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-widest text-sand uppercase">The house</p>
          <button type="button" onClick={onClose} className="flex h-12 w-12 items-center justify-center" aria-label="Close menu">
            <X className="size-6" />
          </button>
        </div>
        <nav className="mt-8 flex flex-col" aria-label="Shop">
          {floorLinks.map((item) => (
            <Link
              key={item.label}
              to="/shop"
              search={item.search}
              onClick={onClose}
              className="border-b border-line py-3 font-serif text-3xl hover:text-sand lg:text-4xl"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3 text-sm text-sand">
          <Link to="/journal" onClick={onClose} className="hover:text-paper">
            Journal
          </Link>
          <Link to="/about" onClick={onClose} className="hover:text-paper">
            The house
          </Link>
          <Link to="/stores" onClick={onClose} className="hover:text-paper">
            Retail stores
          </Link>
          <Link to="/track" onClick={onClose} className="hover:text-paper">
            Track your order
          </Link>
          <Link to="/returns" onClick={onClose} className="hover:text-paper">
            Exchange & returns
          </Link>
        </div>
      </div>
      <div className="relative hidden lg:block lg:w-1/2">
        <img
          src="/catalogue/mac-charcoal.jpg"
          alt="Charcoal mac on a wet Bermondsey street at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

function BagDrawer({ ready, onClose }: { ready: boolean; onClose: () => void }) {
  const lines = useBoutique((state) => state.lines);
  const setQty = useBoutique((state) => state.setQty);
  const remove = useBoutique((state) => state.remove);
  const goods = bagTotal(lines);
  const fee = deliveryFee(goods);
  const remain = freeDeliveryAt - goods;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/70 overlay-in" role="presentation" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Bag"
        className="drawer-right flex h-full w-full max-w-md flex-col bg-ink text-paper"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-2xl">Bag</h2>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center" aria-label="Close bag">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {!ready ? (
            <p className="py-16 text-center text-mute">Opening the bag…</p>
          ) : lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl">The bag is empty.</p>
              <Link to="/shop" search={shopTo()} onClick={onClose} className="mt-6 inline-flex h-11 items-center border border-paper px-5 text-sm tracking-widest uppercase">
                Browse the floor
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3 border-b border-line pb-5">
                  <Link to="/product/$slug" params={{ slug: line.slug }} onClick={onClose} className="shot shot-portrait w-20 shrink-0">
                    <img src={line.image} alt="" />
                  </Link>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-serif text-lg leading-tight">{line.title}</p>
                        <p className="mt-1 text-sm text-mute">
                          {line.colour} · {line.size}
                        </p>
                      </div>
                      <p className="text-sm tabular-nums">{money(line.price * line.qty)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button type="button" className="flex h-11 w-11 items-center justify-center" aria-label="Decrease quantity" onClick={() => setQty(line.id, line.qty - 1)}>
                          <Minus className="size-4" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{line.qty}</span>
                        <button type="button" className="flex h-11 w-11 items-center justify-center" aria-label="Increase quantity" onClick={() => setQty(line.id, line.qty + 1)}>
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <button type="button" onClick={() => remove(line.id)} className="text-sm text-sand underline-offset-4 hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {ready && lines.length > 0 ? (
          <div className="border-t border-line px-5 py-5">
            <p className="text-sm text-sand">
              {fee === 0 ? "UK delivery is on the house." : `${money(remain)} away from free UK delivery.`}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-mute">Subtotal</span>
              <span className="tabular-nums">{money(goods)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-mute">Delivery</span>
              <span className="tabular-nums">{fee === 0 ? "Free" : money(fee)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between font-serif text-2xl">
              <span>Total</span>
              <span className="tabular-nums">{money(goods + fee)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="mt-4 flex h-12 items-center justify-center bg-paper text-sm tracking-widest text-ink uppercase"
            >
              Checkout
            </Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export function SubscribeForm({ id, compact = false }: { id: string; compact?: boolean }) {
  const signup = useBoutique((state) => state.signup);
  const joinList = useBoutique((state) => state.joinList);
  const ready = useStoreReady();
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [women, setWomen] = useState(true);
  const [men, setMen] = useState(false);
  const [kids, setKids] = useState(false);
  const [arrivals, setArrivals] = useState(true);
  const [error, setError] = useState("");

  if (ready && signup && !editing) {
    return (
      <div>
        <p className="font-serif text-2xl">You are on the list.</p>
        <p className="mt-2 text-sm text-mute">{signup.email}</p>
        <button type="button" onClick={() => setEditing(true)} className="mt-4 text-sm text-sand underline-offset-4 hover:underline">
          Change what we send
        </button>
      </div>
    );
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
      setError("Enter a proper email address.");
      return;
    }
    const payload: Signup = { email: next, women, men, kids, arrivals };
    joinList(payload);
    setEditing(false);
    setError("");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div>
        <label htmlFor={`${id}-email`} className="text-xs tracking-widest text-sand uppercase">
          Email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn(fieldClass, "mt-2")}
          placeholder="you@domain.co.uk"
        />
      </div>
      <fieldset>
        <legend className="text-xs tracking-widest text-sand uppercase">Send me</legend>
        <div className={cn("mt-2 grid gap-2", compact ? "grid-cols-2" : "sm:grid-cols-2")}>
          <Check id={`${id}-women`} label="Women" checked={women} onChange={setWomen} />
          <Check id={`${id}-men`} label="Men" checked={men} onChange={setMen} />
          <Check id={`${id}-kids`} label="Kids" checked={kids} onChange={setKids} />
          <Check id={`${id}-arrivals`} label="New arrivals" checked={arrivals} onChange={setArrivals} />
        </div>
      </fieldset>
      {error ? <p className="text-sm text-clay">{error}</p> : null}
      <button type="submit" className="h-12 bg-paper text-sm tracking-widest text-ink uppercase">
        Join the list
      </button>
    </form>
  );
}

function Check({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex h-11 items-center gap-3 border border-line px-3 text-sm">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-sand"
      />
      {label}
    </label>
  );
}

function OfferBell() {
  const open = useBoutique((state) => state.offerOpen);
  const setOpen = useBoutique((state) => state.setOfferOpen);
  const titleId = useId();

  return (
    <div className="bell-anchor">
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="offer-panel absolute right-0 bottom-20 border border-line bg-ink-soft p-5 text-paper shadow-none"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs tracking-widest text-sand uppercase">Offers & arrivals</p>
              <h2 id={titleId} className="mt-2 font-serif text-3xl leading-none">
                First look.
              </h2>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center" aria-label="Close offers">
              <X className="size-5" />
            </button>
          </div>
          <p className="mt-3 text-sm text-mute">
            Discounts, drops, and the occasional candle. Nothing else, and never sold on.
          </p>
          <div className="mt-5">
            <SubscribeForm id="bell" compact />
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative flex h-14 w-14 items-center justify-center bg-paper text-ink"
        aria-label="Subscribe for offers and upcoming arrivals"
        aria-expanded={open}
      >
        <span className="bell-ping pointer-events-none absolute inset-0 border border-sand" aria-hidden="true" />
        <Bell className="relative size-6" />
      </button>
    </div>
  );
}

function Notice({ ready }: { ready: boolean }) {
  const notice = useBoutique((state) => state.notice);
  const clear = useBoutique((state) => state.clearNotice);
  const setBagOpen = useBoutique((state) => state.setBagOpen);
  if (!ready || !notice) return null;

  return (
    <div role="status" className="fixed bottom-6 left-4 z-50 max-w-sm border border-line bg-ink-soft px-4 py-3 text-sm">
      <p>{notice}</p>
      <div className="mt-2 flex gap-4">
        <button type="button" className="text-sand" onClick={() => setBagOpen(true)}>
          View bag
        </button>
        <button type="button" className="text-mute" onClick={clear}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="font-serif text-4xl">F&J Styles</p>
          <p className="mt-3 max-w-sm text-sm text-mute">
            A London clothing house. Dresses, denim, outerwear, and the things you actually wear — for women, men, and children.
          </p>
          <div className="mt-8 max-w-md">
            <p className="text-xs tracking-widest text-sand uppercase">Notes from the house</p>
            <div className="mt-4">
              <SubscribeForm id="footer" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          <FooterCol title="Company">
            <Link to="/about" className="hover:text-sand">The house</Link>
            <Link to="/journal" className="hover:text-sand">Journal</Link>
            <Link to="/stores" className="hover:text-sand">Retail stores</Link>
            <Link to="/shop" search={shopTo()} className="hover:text-sand">Shop all</Link>
          </FooterCol>
          <FooterCol title="Customer support">
            <Link to="/track" className="hover:text-sand">Track your order</Link>
            <Link to="/returns" className="hover:text-sand">Exchange & returns</Link>
            <Link to="/stores" className="hover:text-sand">Retail stores</Link>
            <Link to="/about" className="hover:text-sand">Delivery</Link>
          </FooterCol>
          <FooterCol title="The floor">
            <Link to="/shop" search={shopTo({ audience: "women" })} className="hover:text-sand">Women</Link>
            <Link to="/shop" search={shopTo({ audience: "men" })} className="hover:text-sand">Men</Link>
            <Link to="/shop" search={shopTo({ audience: "kids" })} className="hover:text-sand">Kids</Link>
            <Link to="/shop" search={shopTo({ category: "fragrances" })} className="hover:text-sand">Fragrances</Link>
          </FooterCol>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-line px-4 py-6 text-xs tracking-widest text-mute uppercase sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Bermondsey, London · Prices in GBP</p>
        <p>© {new Date().getFullYear()} F&J Styles</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p className="text-xs tracking-widest text-sand uppercase">{title}</p>
      {children}
    </div>
  );
}

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs tracking-widest text-sand uppercase">404</p>
      <h1 className="mt-3 font-serif text-5xl">That page has left the floor.</h1>
      <Link to="/" className="mt-8 inline-flex h-12 items-center bg-paper px-6 text-sm tracking-widest text-ink uppercase">
        Back to the house
      </Link>
    </div>
  );
}

export function PageIntro({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <header className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
      <p className="text-xs tracking-widest text-sand uppercase">{kicker}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-none lg:text-6xl">{title}</h1>
      {lede ? <p className="mt-5 max-w-2xl text-mute">{lede}</p> : null}
    </header>
  );
}

export function ShellWidth({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8", className)}>{children}</div>;
}
