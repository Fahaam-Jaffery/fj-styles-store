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
