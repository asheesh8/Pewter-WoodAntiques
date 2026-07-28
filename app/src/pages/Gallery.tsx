import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "../data/site";
import { Reveal } from "../components/Reveal";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => ((i ?? 0) + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const current = index !== null ? gallery[index] : null;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28 lg:px-8 lg:pt-32">
      <Reveal>
        <p className="smallcaps text-xs text-gilt">Gallery</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-light leading-[1.05] text-ink">
          Pieces &amp; rooms
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          Photographs from both shops and from the show circuit. These are the client's own
          photographs, carried over from the existing site.
        </p>
      </Reveal>

      {/* Masonry via CSS columns — keeps the varied aspect ratios intact. */}
      <div className="mt-12 columns-2 gap-4 lg:columns-3 lg:gap-6 [&>*]:mb-4 lg:[&>*]:mb-6">
        {gallery.map((g, i) => (
          <motion.figure
            key={g.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: Math.min(i * 0.04, 0.3) }}
            className="group relative break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-ink/10"
          >
            <button
              onClick={() => setIndex(i)}
              className="block w-full text-left"
              aria-label={`View ${g.title} larger`}
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className="w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/92 via-ink/50 to-transparent p-4 pt-12 opacity-0 transition duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-sm text-parchment">{g.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-parchment/70">{g.note}</p>
              </figcaption>
            </button>
          </motion.figure>
        ))}
      </div>

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/94 p-4 backdrop-blur-sm"
            onClick={() => setIndex(null)}
          >
            <button
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-3 text-parchment/70 transition hover:bg-parchment/10 hover:text-parchment"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length);
              }}
              aria-label="Previous"
              className="absolute left-2 rounded-full p-3 text-parchment/60 transition hover:bg-parchment/10 hover:text-parchment sm:left-6"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => ((i ?? 0) + 1) % gallery.length);
              }}
              aria-label="Next"
              className="absolute right-2 rounded-full p-3 text-parchment/60 transition hover:bg-parchment/10 hover:text-parchment sm:right-6"
            >
              <ChevronRight size={28} />
            </button>

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.title}
                className="mx-auto max-h-[78vh] w-auto rounded-xl object-contain"
              />
              <figcaption className="mt-4 text-center">
                <p className="font-display text-lg text-parchment">{current.title}</p>
                <p className="mt-1 text-sm text-parchment/60">{current.note}</p>
                <p className="mt-3 text-[11px] smallcaps text-parchment/40">
                  {(index ?? 0) + 1} / {gallery.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
