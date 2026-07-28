import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { inventory } from "../data/inventory";
import { categories } from "../data/site";
import { ItemCard, SampleBadge } from "../components/ItemCard";
import { Reveal } from "../components/Reveal";

type Sort = "recent" | "low" | "high";

export default function Collection() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [showSold, setShowSold] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const active = params.get("c");

  // The tab bar's centre button deep-links here asking for the search field.
  useEffect(() => {
    if (params.get("focus") === "search") {
      searchRef.current?.focus();
      searchRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [params]);

  const setCategory = (slug: string | null) => {
    const next = new URLSearchParams(params);
    next.delete("focus");
    if (slug) next.set("c", slug);
    else next.delete("c");
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = inventory.filter((i) => {
      if (active && i.category !== active) return false;
      if (!showSold && i.status === "sold") return false;
      if (!q) return true;
      return [i.title, i.description, i.era, i.origin, i.surface, i.category]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    if (sort === "low")
      list = [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "high")
      list = [...list].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    return list;
  }, [query, active, sort, showSold]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of inventory) m.set(i.category, (m.get(i.category) ?? 0) + 1);
    return m;
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:px-8 lg:pt-32">
      <Reveal>
        <p className="smallcaps text-xs text-gilt">The collection</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-light leading-tight text-ink">
          Browse the catalogue
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          Inventory changes constantly and not every piece makes it online. If you don't see what
          you're after, ask — there is very often more in the shop.
        </p>
      </Reveal>

      {/* Honest notice: this catalogue is seeded with placeholders. */}
      <Reveal delay={0.05}>
        <div className="mt-7 flex flex-col gap-2 rounded-2xl border border-oxide/25 bg-oxide/[0.06] px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4">
          <SampleBadge className="shrink-0" />
          <p className="text-[13px] leading-relaxed text-ink-2">
            These are placeholder records used to demonstrate the catalogue. Replace them with real
            pieces and photographs before the site goes live.
          </p>
        </div>
      </Reveal>

      {/* ── Controls ─────────────────────────────────────── */}
      <div className="sticky top-[62px] z-30 -mx-5 mt-8 bg-parchment/92 px-5 py-4 backdrop-blur-md lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3"
            />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by piece, period, origin or surface…"
              aria-label="Search the collection"
              className="w-full rounded-full border border-ink/15 bg-parchment py-3 pl-11 pr-10 text-sm outline-none transition focus:border-gilt"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-3 transition hover:bg-parchment-3 hover:text-ink"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="shrink-0 text-ink-3" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort"
              className="rounded-full border border-ink/15 bg-parchment px-4 py-2.5 text-sm text-ink-2 outline-none transition focus:border-gilt"
            >
              <option value="recent">Most recent</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
            <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-ink/15 px-3.5 py-2.5 text-sm text-ink-2 transition hover:border-ink/30">
              <input
                type="checkbox"
                checked={showSold}
                onChange={(e) => setShowSold(e.target.checked)}
                className="accent-gilt"
              />
              Sold
            </label>
          </div>
        </div>

        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 lg:-mx-8 lg:px-8">
          <button
            onClick={() => setCategory(null)}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] transition ${
              !active
                ? "bg-ink text-parchment"
                : "border border-ink/15 text-ink-2 hover:border-ink/35"
            }`}
          >
            All ({inventory.length})
          </button>
          {categories
            .filter((c) => counts.get(c.slug))
            .map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategory(active === c.slug ? null : c.slug)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] transition ${
                  active === c.slug
                    ? "bg-ink text-parchment"
                    : "border border-ink/15 text-ink-2 hover:border-ink/35"
                }`}
              >
                {c.label} ({counts.get(c.slug)})
              </button>
            ))}
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────── */}
      <p className="mt-6 text-xs smallcaps text-ink-3">
        {results.length} {results.length === 1 ? "piece" : "pieces"}
        {active && ` in ${categories.find((c) => c.slug === active)?.label}`}
      </p>

      <AnimatePresence mode="popLayout">
        {results.length > 0 ? (
          <motion.div
            key="grid"
            layout
            className="mt-5 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4"
          >
            {results.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-16 rounded-3xl border border-dashed border-ink/20 py-20 text-center"
          >
            <p className="font-display text-2xl font-light text-ink">Nothing matches</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-3">
              Try a broader search, or clear the filters. We're always happy to look for something
              specific.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory(null);
              }}
              className="mt-6 rounded-full border border-ink/20 px-6 py-2.5 text-sm text-ink transition hover:bg-parchment-2"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
