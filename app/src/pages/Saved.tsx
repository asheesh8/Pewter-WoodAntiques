import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { useFavorites } from "../lib/useFavorites";
import { inventory } from "../data/inventory";
import { ItemCard } from "../components/ItemCard";
import { Reveal } from "../components/Reveal";
import { useInquiry } from "../lib/inquiry";

export default function Saved() {
  const { ids } = useFavorites();
  const saved = inventory.filter((i) => ids.includes(i.id));
  const { open } = useInquiry();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:px-8 lg:pt-32">
      <Reveal>
        <p className="smallcaps text-xs text-gilt">Saved</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-light leading-tight text-ink">
          Your list
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
          Pieces you've marked, kept on this device. Send the list over and we'll tell you what's
          still available.
        </p>
      </Reveal>

      {saved.length > 0 ? (
        <>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
            {saved.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <button
            onClick={() => open("general")}
            className="mt-10 w-full rounded-full bg-ink px-6 py-4 text-sm font-medium text-parchment transition hover:bg-ink-2 sm:w-auto sm:px-10"
          >
            Ask about these {saved.length} {saved.length === 1 ? "piece" : "pieces"}
          </button>
        </>
      ) : (
        <div className="mt-12 rounded-3xl border border-dashed border-ink/20 py-20 text-center">
          <Heart size={30} className="mx-auto text-ink-3/50" />
          <p className="mt-5 font-display text-2xl font-light text-ink">Nothing saved yet</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-3">
            Tap the heart on any piece to keep it here while you think it over.
          </p>
          <Link
            to="/collection"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm text-parchment transition hover:bg-ink-2"
          >
            Browse the collection
            <ArrowRight size={15} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
