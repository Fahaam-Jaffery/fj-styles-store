import { deliveryFee } from "@/data/catalog";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Line = {
  id: string;
  slug: string;
  title: string;
  colour: string;
  colourId: string;
  size: string;
  price: number;
  image: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  lines: Line[];
  total: number;
};

export type Signup = {
  email: string;
  women: boolean;
  men: boolean;
  kids: boolean;
  arrivals: boolean;
};

type AddInput = Omit<Line, "id" | "qty"> & { qty?: number };

type Boutique = {
  lines: Line[];
  orders: Order[];
  signup: Signup | null;
  notice: string | null;
  bagOpen: boolean;
  offerOpen: boolean;
  setBagOpen: (open: boolean) => void;
  setOfferOpen: (open: boolean) => void;
  clearNotice: () => void;
  add: (input: AddInput) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  placeOrder: (details: Omit<Order, "id" | "createdAt" | "lines" | "total">) => string | null;
  joinList: (signup: Signup) => void;
};

function lineId(input: { slug: string; colourId: string; size: string }) {
  return `${input.slug}|${input.colourId}|${input.size}`;
}

export function orderStatus(id: string) {
  const digit = Number(id.replace(/\D/g, "").slice(-1));
  if (digit >= 7) return "With the courier";
  if (digit >= 4) return "Packed in Bermondsey";
  return "Confirmed";
}

export const useBoutique = create<Boutique>()(
  persist(
    (set, get) => ({
      lines: [],
      orders: [],
      signup: null,
      notice: null,
      bagOpen: false,
      offerOpen: false,
      setBagOpen: (bagOpen) => set({ bagOpen }),
      setOfferOpen: (offerOpen) => set({ offerOpen }),
      clearNotice: () => set({ notice: null }),
      add: (input) => {
        const id = lineId(input);
        const qty = input.qty ?? 1;
        const lines = get().lines;
        const existing = lines.find((line) => line.id === id);
        const next = existing
          ? lines.map((line) => (line.id === id ? { ...line, qty: line.qty + qty } : line))
          : [...lines, { ...input, id, qty }];
        const notice = `${input.title} · ${input.colour} · ${input.size} added`;
        set({ lines: next, notice });
        if (typeof window !== "undefined") {
          window.setTimeout(() => {
            if (get().notice === notice) set({ notice: null });
          }, 3400);
        }
      },
      setQty: (id, qty) =>
        set({
          lines:
            qty <= 0
              ? get().lines.filter((line) => line.id !== id)
              : get().lines.map((line) => (line.id === id ? { ...line, qty } : line)),
        }),
      remove: (id) => set({ lines: get().lines.filter((line) => line.id !== id) }),
      placeOrder: (details) => {
        const lines = get().lines;
        if (lines.length === 0) return null;
        const goods = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
        const total = goods + deliveryFee(goods);
        const id = `FJ-${String(Date.now()).slice(-6)}`;
        const order: Order = {
          ...details,
          id,
          createdAt: new Date().toISOString(),
          lines,
          total,
        };
        set({ orders: [order, ...get().orders], lines: [], bagOpen: false });
        return id;
      },
      joinList: (signup) => set({ signup }),
    }),
    {
      name: "fj-styles",
      skipHydration: true,
      partialize: (state) => ({
        lines: state.lines,
        orders: state.orders,
        signup: state.signup,
      }),
    },
  ),
);

export function bagCount(lines: Line[]) {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function bagTotal(lines: Line[]) {
  return lines.reduce((sum, line) => sum + line.price * line.qty, 0);
}
