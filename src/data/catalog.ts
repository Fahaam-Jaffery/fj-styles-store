export const audiences = ["women", "men", "kids"] as const;
export type Audience = (typeof audiences)[number];

export const categories = [
  { id: "dresses", label: "Dresses" },
  { id: "sweats", label: "Sweats" },
  { id: "denim", label: "Denim" },
  { id: "outerwear", label: "Outerwear" },
  { id: "footwear", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
  { id: "fragrances", label: "Fragrances" },
  { id: "essentials", label: "Essentials" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Colourway = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export type Product = {
  slug: string;
  title: string;
  audience: Audience[];
  category: CategoryId;
  price: number;
  compareAt?: number;
  discount?: number;
  colours: Colourway[];
  sizes: string[];
  description: string;
  fabric: string;
  care: string;
  droppedAt: string;
  rails: Array<"dropped" | "picks" | "denim">;
};

const dress = ["XS", "S", "M", "L", "XL"];
const shoe = ["6", "7", "8", "9", "10", "11"];
const child = ["3–4", "5–6", "7–8", "9–10"];

export const products: Product[] = [
  {
    slug: "hampstead-slip",
    title: "Hampstead Slip",
    audience: ["women"],
    category: "dresses",
    price: 148,
    compareAt: 185,
    discount: 20,
    colours: [
      { id: "ivory", name: "Ivory", hex: "#f3eadb", image: "/catalogue/slip-ivory.jpg" },
      { id: "ink", name: "Ink", hex: "#161616", image: "/catalogue/slip-ink.jpg" },
      { id: "clay", name: "Clay", hex: "#c56a4a", image: "/catalogue/slip-clay.jpg" },
    ],
    sizes: dress,
    description:
      "A bias-cut silk slip with a low back and a hem that pools. Cut for evenings that start on the South Bank and end in a cab.",
    fabric: "Silk satin, 92% silk, 8% elastane. Lined through the bodice.",
    care: "Dry clean only. Steam, never iron the face of the cloth.",
    droppedAt: "2026-10-02",
    rails: ["dropped"],
  },
  {
    slug: "clerkenwell-column",
    title: "Clerkenwell Column",
    audience: ["women"],
    category: "dresses",
    price: 220,
    colours: [
      { id: "sand", name: "Sand", hex: "#cbb892", image: "/catalogue/column-sand.jpg" },
      { id: "forest", name: "Forest", hex: "#1e3a2f", image: "/catalogue/column-forest.jpg" },
    ],
    sizes: dress,
    description:
      "A sleeveless column with a boat neck and seaming that does the tailoring. Sand is cut to the mid-calf. Forest falls to the floor.",
    fabric: "Wool crepe, 100% wool, fully lined.",
    care: "Dry clean. Hang on a wide shoulder after wearing.",
    droppedAt: "2026-09-18",
    rails: ["picks"],
  },
  {
    slug: "soho-straight",
    title: "Soho Straight",
    audience: ["women"],
    category: "denim",
    price: 118,
    colours: [
      { id: "indigo", name: "Indigo", hex: "#1d2a44", image: "/catalogue/jean-indigo.jpg" },
      {
        id: "stone",
        name: "Stone",
        hex: "#cfc6b8",
        image: "/catalogue/jean-stone.jpg",
      },
    ],
    sizes: dress,
    description:
      "A high-rise straight leg with a clean front and no branding. Indigo is rigid for the first fortnight. Stone is the same cut, washed soft.",
    fabric: "Organic cotton denim, 12.5oz. Stone wash is enzyme-finished.",
    care: "Wash inside out, cold, rarely. Hang dry. The indigo will settle to you.",
    droppedAt: "2026-10-06",
    rails: ["denim"],
  },
  {
    slug: "mayfair-set",
    title: "Mayfair Set",
    audience: ["women"],
    category: "sweats",
    price: 110,
    colours: [{ id: "oat", name: "Oat", hex: "#d9d0c3", image: "/catalogue/crew-oat.jpg" }],
    sizes: dress,
    description:
      "An oversized crew and a straight trouser in the same brushed knit. For Sundays, delayed trains, and working from the kitchen table.",
    fabric: "Wool-cotton loopback, 55% cotton, 45% wool.",
    care: "Cold machine wash, low spin. Dry flat so the cuffs stay honest.",
    droppedAt: "2026-09-04",
    rails: ["picks"],
  },
  {
    slug: "columbia-road-crew",
    title: "Columbia Road Crew",
    audience: ["women"],
    category: "sweats",
    price: 78,
    compareAt: 98,
    discount: 20,
    colours: [
      { id: "marigold", name: "Marigold", hex: "#e36b1e", image: "/catalogue/hoodie-sand.jpg" },
    ],
    sizes: dress,
    description:
      "A heavy crew in a flower-market marigold. One loud colour in an otherwise quiet wardrobe, which is the point.",
    fabric: "Brushed cotton fleece, 100% cotton, 420gsm.",
    care: "Wash cold with similar colours. The marigold is dyed to stay.",
    droppedAt: "2026-10-01",
    rails: ["dropped"],
  },
  {
    slug: "bermondsey-mac",
    title: "Bermondsey Mac",
    audience: ["women"],
    category: "outerwear",
    price: 340,
    compareAt: 425,
    discount: 20,
    colours: [
      { id: "charcoal", name: "Charcoal", hex: "#2a2826", image: "/catalogue/mac-charcoal.jpg" },
    ],
    sizes: dress,
    description:
      "A storm-collar mac in matte cotton with a self belt and a back vent. Weatherproof enough for a wet mews, tailored enough for a dinner booking.",
    fabric: "Technical cotton gabardine with a breathable membrane. Fully taped seams.",
    care: "Wipe clean. Reproof once a season. Do not dry clean the membrane.",
    droppedAt: "2026-10-08",
    rails: ["dropped"],
  },
  {
    slug: "borough-wrap",
    title: "Borough Wrap",
    audience: ["women"],
    category: "outerwear",
    price: 280,
    colours: [{ id: "camel", name: "Camel", hex: "#c6a36a", image: "/catalogue/woman-coat.jpg" }],
    sizes: dress,
    description:
      "A wool wrap coat with a wide lapel and a tie belt. Camel, because London light is kindest to it between October and March.",
    fabric: "Double-faced wool, 90% wool, 10% cashmere.",
    care: "Brush with a clothes brush. Dry clean at the end of the season.",
    droppedAt: "2026-09-22",
    rails: ["picks"],
  },
  {
    slug: "regent-parka",
    title: "Regent Parka",
    audience: ["men"],
    category: "outerwear",
    price: 295,
    compareAt: 370,
    discount: 20,
    colours: [{ id: "olive", name: "Olive", hex: "#4d5533", image: "/catalogue/parka-olive.jpg" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A technical parka with a high collar, taped seams, and pockets you can actually use on a bridge in the rain. Olive, cut close through the shoulder.",
    fabric: "Matte nylon with a recycled insulation layer. Water repellent, not plastic-shiny.",
    care: "Wipe down. Machine wash cold on a gentle cycle, hang dry.",
    droppedAt: "2026-10-09",
    rails: ["dropped"],
  },
  {
    slug: "rotherhithe-jacket",
    title: "Rotherhithe Jacket",
    audience: ["men"],
    category: "outerwear",
    price: 320,
    colours: [{ id: "tan", name: "Tan", hex: "#8d5a32", image: "/catalogue/oxford.jpg" }],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A leather jacket with a standing collar and a lining you will not want to take off in March. Vegetable-tanned hide, no logo hardware.",
    fabric: "Full-grain cowhide, 1.2mm. Viscose lining.",
    care: "Condition twice a year. Keep it out of radiators.",
    droppedAt: "2026-08-28",
    rails: [],
  },
  {
    slug: "thames-tee",
    title: "Thames Tee",
    audience: ["men"],
    category: "essentials",
    price: 38,
    colours: [{ id: "white", name: "White", hex: "#f4f4f2", image: "/catalogue/tee-white.jpg" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A heavy white tee with a proper collar rib and a length that stays tucked, or doesn't, without looking accidental.",
    fabric: "Supima cotton jersey, 220gsm.",
    care: "Wash cold. It will soften. It should not twist.",
    droppedAt: "2026-07-12",
    rails: ["picks"],
  },
  {
    slug: "sherpa-denim",
    title: "Sherpa Denim",
    audience: ["women", "men"],
    category: "denim",
    price: 158,
    colours: [
      { id: "light", name: "Light wash", hex: "#b7c4d4", image: "/catalogue/denim-jacket.jpg" },
    ],
    sizes: dress,
    description:
      "A trucker jacket with a cream sherpa collar, washed pale. The denim drop's outer layer — worn over the Soho Straight or the Thames Tee.",
    fabric: "Cotton denim with a recycled sherpa collar.",
    care: "Wipe the sherpa. Wash the shell sparingly, inside out.",
    droppedAt: "2026-10-06",
    rails: ["denim"],
  },
  {
    slug: "spitalfields-boot",
    title: "Spitalfields Boot",
    audience: ["men"],
    category: "footwear",
    price: 195,
    colours: [{ id: "cigar", name: "Cigar", hex: "#4a3428", image: "/catalogue/boot-black.jpg" }],
    sizes: shoe,
    description:
      "A cap-toe boot in cigar leather with a leather sole and a storm welt. Sized in UK men's. Women who know their UK size order it too.",
    fabric: "Calf leather upper. Leather sole with a rubber heel insert.",
    care: "Cedar trees when you are not wearing them. Polish, don't soak.",
    droppedAt: "2026-09-11",
    rails: [],
  },
  {
    slug: "monk-strap",
    title: "Monk Strap",
    audience: ["men"],
    category: "footwear",
    price: 175,
    colours: [{ id: "chestnut", name: "Chestnut", hex: "#7a4b2e", image: "/catalogue/loafer.jpg" }],
    sizes: shoe,
    description:
      "A double monk in chestnut leather. Less formal than an oxford, more considered than a trainer. UK sizing.",
    fabric: "Polished calf. Leather sole.",
    care: "Shoe trees. A horsehair brush after wet pavements.",
    droppedAt: "2026-08-19",
    rails: ["picks"],
  },
  {
    slug: "round-sun",
    title: "Round Sun",
    audience: ["women", "men"],
    category: "accessories",
    price: 95,
    colours: [{ id: "gold", name: "Gold", hex: "#c4b09a", image: "/catalogue/sunglasses.jpg" }],
    sizes: ["One"],
    description:
      "A round metal frame with a green lens, light enough to forget in a coat pocket. UV400. No logo on the temple.",
    fabric: "Gold-tone metal. CR-39 lenses.",
    care: "Rinse under a tap if they meet the sea. Case included.",
    droppedAt: "2026-06-02",
    rails: ["picks"],
  },
  {
    slug: "mill-scarf",
    title: "Mill Scarf",
    audience: ["women", "men"],
    category: "accessories",
    price: 58,
    colours: [{ id: "moss", name: "Moss", hex: "#8a9a3a", image: "/catalogue/knit-scarf2.jpg" }],
    sizes: ["One"],
    description:
      "A ribbed wool scarf with a fringe, knitted in a Yorkshire mill. Moss is the colour we kept; the stack in the photograph is the mill's working shade card.",
    fabric: "Lambswool, 100%.",
    care: "Hand wash cold. Dry flat. The fringe will soften.",
    droppedAt: "2026-09-30",
    rails: [],
  },
  {
    slug: "fig-cedar",
    title: "Fig & Cedar",
    audience: ["women", "men"],
    category: "fragrances",
    price: 42,
    colours: [{ id: "cream", name: "Cream", hex: "#efe6d6", image: "/catalogue/candle.jpg" }],
    sizes: ["Maison"],
    description:
      "A house candle: green fig, cedar shavings, a little smoke. Poured in the same London postcode as the macs. 280g, about fifty hours.",
    fabric: "Soy and beeswax blend. Cotton wick. Glass that can be reused.",
    care: "Trim the wick to 5mm. Burn until the surface is liquid the first time.",
    droppedAt: "2026-09-14",
    rails: ["picks"],
  },
  {
    slug: "primrose-mac",
    title: "Primrose Mac",
    audience: ["kids"],
    category: "outerwear",
    price: 68,
    colours: [{ id: "saffron", name: "Saffron", hex: "#e2a317", image: "/catalogue/kid-yellow.jpg" }],
    sizes: child,
    description:
      "A hooded rain mac for school runs and serious puddles. Saffron so you can see them at the gate. Fleece-lined hood, taped seams.",
    fabric: "Waterproof cotton-recycled blend. Fleece-lined hood.",
    care: "Wipe clean. Machine wash cold if the playground insists.",
    droppedAt: "2026-09-25",
    rails: ["dropped"],
  },
  {
    slug: "saturday-cardigan",
    title: "Saturday Cardigan",
    audience: ["kids"],
    category: "essentials",
    price: 46,
    colours: [{ id: "navy", name: "Navy", hex: "#1d3d86", image: "/catalogue/kid-navy.jpg" }],
    sizes: child,
    description:
      "A navy cotton cardigan with a proper button band. For weekends that still involve a relative who notices clothes.",
    fabric: "Organic cotton knit.",
    care: "Machine wash cold. Dry flat. Buttons are sewn to stay.",
    droppedAt: "2026-08-08",
    rails: ["picks"],
  },
];

export const sorts = [
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "discount", label: "Biggest discount" },
] as const;

export type SortId = (typeof sorts)[number]["id"];

export type ShopQuery = {
  audience: "all" | Audience;
  category: "all" | CategoryId;
  sort: SortId;
  q: string;
};

export function shopTo(partial: Partial<ShopQuery> = {}): ShopQuery {
  return {
    audience: "all",
    category: "all",
    sort: "new",
    q: "",
    ...partial,
  };
}

export function categoryLabel(id: CategoryId) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function audienceLabel(list: Audience[]) {
  const map = { women: "Women", men: "Men", kids: "Kids" };
  return list.map((item) => map[item]).join(" · ");
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function filterProducts(query: ShopQuery) {
  const q = query.q.trim().toLowerCase();
  const list = products.filter((product) => {
    if (query.audience !== "all" && !product.audience.includes(query.audience)) return false;
    if (query.category !== "all" && product.category !== query.category) return false;
    if (!q) return true;
    const haystack = [
      product.title,
      product.description,
      product.category,
      categoryLabel(product.category),
      ...product.audience,
      ...product.colours.map((colour) => colour.name),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  const sorted = [...list];
  if (query.sort === "new") sorted.sort((a, b) => b.droppedAt.localeCompare(a.droppedAt));
  if (query.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (query.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (query.sort === "discount") sorted.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
  return sorted;
}

export function relatedProducts(slug: string) {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter(
      (product) =>
        product.slug !== slug &&
        (product.category === current.category ||
          product.audience.some((item) => current.audience.includes(item))),
    )
    .slice(0, 4);
}

export function byRail(rail: Product["rails"][number]) {
  return products.filter((product) => product.rails.includes(rail));
}

export const freeDeliveryAt = 120;
export const deliveryFlat = 6;

export function deliveryFee(goods: number) {
  if (goods <= 0 || goods >= freeDeliveryAt) return 0;
  return deliveryFlat;
}

