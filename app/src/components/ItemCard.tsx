import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Plate } from "./Plate";
import { formatPrice, type Item } from "../data/inventory";
import { useFavorites } from "../lib/useFavorites";
import { categories } from "../data/site";

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      title="Placeholder record — replace with real inventory before launch"
      className={`inline-flex w-fit shrink-0 items-center gap-1.5 self-start rounded-full border border-oxide/40 bg-oxide/10 px-2 py-0.5 text-[10px] font-medium smallcaps text-oxide ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-oxide" />
      Sample listing
    </span>
  );
}

export function StatusTag({ status }: { status: Item["status"] }) {
  if (status === "available") return null;
  const map = {
    sold: { label: "Sold", cls: "bg-ink text-parchment" },
    hold: { label: "On hold", cls: "bg-sage text-parchment" },
  } as const;
  const s = map[status];
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] smallcaps ${s.cls}`}>
      {s.label}
    </span>
  );
}

export function ItemCard({ item, index = 0 }: { item: Item; index?: number }) {
  const { has, toggle } = useFavorites();
  const saved = has(item.id);
  const cat = categories.find((c) => c.slug === item.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to={`/collection/${item.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-parchment-2 ring-1 ring-ink/8 transition duration-500 group-hover:ring-ink/20">
          {item.images.length > 0 ? (
            <img
              src={item.images[0]}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="h-full w-full transition duration-700 group-hover:scale-[1.03]">
              <Plate motif={item.motif} seed={item.id} variant={item.plate} />
            </div>
          )}

          {item.status !== "available" && (
            <div className="absolute left-3 top-3">
              <StatusTag status={item.status} />
            </div>
          )}
          {item.isSample && (
            <div className="absolute bottom-3 left-3">
              <SampleBadge />
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(item.id);
        }}
        aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
        aria-pressed={saved}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-parchment/90 text-ink shadow-sm backdrop-blur transition hover:scale-105 active:scale-95"
      >
        <Heart
          size={16}
          className={saved ? "fill-oxide text-oxide" : "text-ink-3"}
          strokeWidth={2}
        />
      </button>

      <div className="mt-3 px-0.5">
        <p className="text-[10px] smallcaps text-ink-3">{cat?.label}</p>
        <Link to={`/collection/${item.id}`}>
          <h3 className="mt-1 font-display text-[15px] font-medium leading-snug text-ink transition group-hover:text-gilt">
            {item.title}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <span className="text-sm text-gilt">{formatPrice(item.price)}</span>
          <span className="text-[11px] text-ink-3">{item.era}</span>
        </div>
      </div>
    </motion.article>
  );
}
