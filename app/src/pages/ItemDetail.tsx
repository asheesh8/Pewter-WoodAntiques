import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Heart, Share2, Camera, BookmarkPlus, Check } from "lucide-react";
import { useState } from "react";
import { bySlug, formatPrice, inventory } from "../data/inventory";
import { categories, termsOfSale } from "../data/site";
import { Plate } from "../components/Plate";
import { ItemCard, SampleBadge, StatusTag } from "../components/ItemCard";
import { useFavorites } from "../lib/useFavorites";
import { useInquiry } from "../lib/inquiry";

export default function ItemDetail() {
  const { id = "" } = useParams();
  const item = bySlug(id);
  const { has, toggle } = useFavorites();
  const { open } = useInquiry();
  const [shared, setShared] = useState(false);

  if (!item) return <Navigate to="/collection" replace />;

  const saved = has(item.id);
  const cat = categories.find((c) => c.slug === item.category);
  const related = inventory
    .filter((i) => i.id !== item.id && i.category === item.category)
    .slice(0, 4);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, url });
        return;
      } catch {
        /* user dismissed the sheet — fall through to copying */
      }
    }
    navigator.clipboard?.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 1800);
  };

  const specs = [
    { label: "Period", value: item.era },
    { label: "Origin", value: item.origin },
    { label: "Dimensions", value: item.dimensions },
    { label: "Surface", value: item.surface },
    { label: "Condition", value: item.condition },
    { label: "Reference", value: item.id.toUpperCase() },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pt-24 lg:px-8 lg:pt-28">
      <Link
        to="/collection"
        className="group inline-flex items-center gap-2 text-sm text-ink-3 transition hover:text-ink"
      >
        <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
        Back to the collection
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── Image ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-ink/10">
            {item.images.length > 0 ? (
              <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
            ) : (
              <Plate motif={item.motif} seed={item.id} variant={item.plate} />
            )}
            {item.status !== "available" && (
              <div className="absolute left-4 top-4">
                <StatusTag status={item.status} />
              </div>
            )}
          </div>

          {item.images.length === 0 && (
            <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-3">
              Drawn placeholder — no photograph on file for this piece yet.
            </p>
          )}
        </motion.div>

        {/* ── Detail ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/collection?c=${item.category}`}
              className="text-[11px] smallcaps text-gilt transition hover:text-ink"
            >
              {cat?.label}
            </Link>
            {item.isSample && <SampleBadge />}
          </div>

          <h1 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,2.85rem)] font-light leading-tight text-ink">
            {item.title}
          </h1>

          <div className="mt-5 flex items-center gap-4">
            <span className="font-display text-3xl text-gilt">{formatPrice(item.price)}</span>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => toggle(item.id)}
                aria-label={saved ? "Remove from saved" : "Save this piece"}
                aria-pressed={saved}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition hover:border-ink/35"
              >
                <Heart
                  size={17}
                  className={saved ? "fill-oxide text-oxide" : "text-ink-2"}
                />
              </button>
              <button
                onClick={share}
                aria-label="Share this piece"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition hover:border-ink/35"
              >
                {shared ? (
                  <Check size={17} className="text-sage" />
                ) : (
                  <Share2 size={17} className="text-ink-2" />
                )}
              </button>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-ink-2">{item.description}</p>

          {/* Specs */}
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-7">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="text-[10px] smallcaps text-ink-3">{s.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          {/* Actions — inquiry, not checkout: this dealer sells by
              cheque and money order, with shops open by appointment. */}
          <div className="mt-9 space-y-3">
            {item.status === "sold" ? (
              <div className="rounded-2xl border border-ink/15 bg-parchment-2 px-5 py-4 text-sm leading-relaxed text-ink-2">
                This piece has sold. Tell us what you're looking for and we'll watch for
                something similar.
                <button
                  onClick={() => open("general", item)}
                  className="mt-3 block rounded-full bg-ink px-6 py-2.5 text-sm text-parchment transition hover:bg-ink-2"
                >
                  Ask about similar pieces
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => open("inquire", item)}
                  className="w-full rounded-full bg-ink px-6 py-4 text-sm font-medium text-parchment transition hover:bg-ink-2"
                >
                  Inquire about this piece
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => open("photos", item)}
                    className="flex items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-3.5 text-sm text-ink transition hover:bg-parchment-2"
                  >
                    <Camera size={15} /> More photos
                  </button>
                  <button
                    onClick={() => open("hold", item)}
                    disabled={item.status === "hold"}
                    className="flex items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-3.5 text-sm text-ink transition hover:bg-parchment-2 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <BookmarkPlus size={15} />
                    {item.status === "hold" ? "On hold" : "Ask for a hold"}
                  </button>
                </div>
              </>
            )}
          </div>

          <p className="mt-6 border-t border-ink/10 pt-5 text-[13px] leading-relaxed text-ink-3">
            {termsOfSale.guarantee}{" "}
            <Link to="/contact#terms" className="text-gilt underline-offset-4 hover:underline">
              Full terms of sale
            </Link>
          </p>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-ink/10 pt-12 lg:mt-28">
          <h2 className="font-display text-2xl font-light text-ink">More in {cat?.label}</h2>
          <div className="mt-7 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
            {related.map((r, i) => (
              <ItemCard key={r.id} item={r} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
