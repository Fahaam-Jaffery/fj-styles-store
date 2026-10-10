import { ProductGrid } from "@/components/product-card";
import { PageIntro, ShellWidth } from "@/components/site";
import {
  audiences,
  categories,
  filterProducts,
  shopTo,
  sorts,
  type Audience,
  type CategoryId,
  type ShopQuery,
  type SortId,
} from "@/data/catalog";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

function isAudience(value: unknown): value is Audience {
  return typeof value === "string" && (audiences as readonly string[]).includes(value);
}

function isCategory(value: unknown): value is CategoryId {
  return typeof value === "string" && categories.some((category) => category.id === value);
}

function isSort(value: unknown): value is SortId {
  return typeof value === "string" && sorts.some((sort) => sort.id === value);
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopQuery =>
    shopTo({
      audience: isAudience(search.audience) ? search.audience : "all",
      category: isCategory(search.category) ? search.category : "all",
      sort: isSort(search.sort) ? search.sort : "new",
      q: typeof search.q === "string" ? search.q.slice(0, 80) : "",
    }),
  head: () => ({
    meta: [
      { title: "Shop — F&J Styles" },
      { name: "description", content: "Filter the F&J Styles floor by women, men, kids, and category." },
    ],
  }),
  component: ShopPage,
});

const audienceChoices: Array<{ id: ShopQuery["audience"]; label: string }> = [
  { id: "all", label: "All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "kids", label: "Kids" },
];

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const list = filterProducts(search);

  function go(partial: Partial<ShopQuery>) {
    void navigate({ to: "/shop", search: { ...search, ...partial } });
  }

  const title =
    search.audience === "women"
      ? "Women"
      : search.audience === "men"
        ? "Men"
        : search.audience === "kids"
          ? "Kids"
          : "The floor";

  return (
    <>
      <PageIntro
        kicker="Shop"
        title={title}
        lede="Filter by who it is for, then by what it is. Colour and size sit on every card."
      />
      <ShellWidth>
        <div className="flex flex-col gap-4 border-y border-line py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="chip-row flex gap-2 overflow-x-auto" role="tablist" aria-label="Who it is for">
              {audienceChoices.map((item) => (
                <FilterChip
                  key={item.id}
                  active={search.audience === item.id}
                  onClick={() => go({ audience: item.id })}
                  label={item.label}
                />
              ))}
            </div>
            <label className="flex items-center gap-3 text-sm text-mute">
              Sort
              <select
                value={search.sort}
                onChange={(event) => go({ sort: event.target.value as SortId })}
                className="h-11 border border-line bg-ink px-3 text-paper"
              >
                {sorts.map((sort) => (
                  <option key={sort.id} value={sort.id}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="chip-row flex gap-2 overflow-x-auto" aria-label="Category">
            <FilterChip active={search.category === "all"} onClick={() => go({ category: "all" })} label="All categories" />
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                active={search.category === category.id}
                onClick={() => go({ category: category.id })}
                label={category.label}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <p className="text-sm text-mute">
            {list.length} {list.length === 1 ? "piece" : "pieces"}
            {search.q ? ` for “${search.q}”` : ""}
          </p>
          {search.audience !== "all" || search.category !== "all" || search.q ? (
            <button type="button" onClick={() => go(shopTo())} className="text-sm text-sand underline-offset-4 hover:underline">
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="mt-8">
          <ProductGrid products={list} />
        </div>
      </ShellWidth>
    </>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-11 shrink-0 border px-4 text-sm",
        active ? "border-paper bg-paper text-ink" : "border-line text-paper",
      )}
    >
      {label}
    </button>
  );
}
