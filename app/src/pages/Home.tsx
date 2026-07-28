import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import {
  business,
  homeIntro,
  categories,
  locations,
  associations,
  gallery,
  story,
} from "../data/site";
import { inventory } from "../data/inventory";
import { ItemCard } from "../components/ItemCard";
import { Reveal } from "../components/Reveal";
import { useInquiry } from "../lib/inquiry";

/** Which shop is open today, from the seasons the client publishes. */
function useOpenShop() {
  const month = new Date().getMonth() + 1;
  return locations.find((l) => (l.months as readonly number[]).includes(month)) ?? locations[0];
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const open = useOpenShop();

  return (
    <section ref={ref} className="relative grain min-h-[100svh] overflow-hidden pt-24">
      {/* warm ground wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #fdfaf4 0%, var(--color-parchment) 45%, var(--color-parchment-2) 100%)",
        }}
      />

      <motion.div style={{ y, opacity: fade }} className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="smallcaps text-xs text-gilt"
          >
            {business.established} · Est. {business.founded}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-4xl font-display text-[clamp(2.7rem,9vw,5.75rem)] font-light leading-[0.95] text-ink"
          >
            Early American pieces,
            <br />
            <em className="font-normal italic text-gilt">in their first paint.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-2 sm:text-base"
          >
            {homeIntro.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/collection"
              className="group flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-parchment transition hover:bg-ink-2"
            >
              View the collection
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/visit"
              className="rounded-full border border-ink/20 px-7 py-3.5 text-sm text-ink transition hover:border-ink/50 hover:bg-parchment-2"
            >
              Plan a visit
            </Link>
          </motion.div>

          {/* live seasonal status — derived from their published seasons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-7 flex items-center gap-2 rounded-full border border-ink/10 bg-parchment/70 px-4 py-2 text-xs text-ink-2 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
            </span>
            In season now — {open.city}, {open.stateShort} · {open.season}
          </motion.div>
        </div>

        {/* the three masthead plates, arranged as a triptych */}
        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6">
          {[
            { src: "/img/hero-weathervane.png", alt: "Gilded copper running horse weathervane", d: 0.5 },
            { src: "/img/hero-boxes.png", alt: "Stacked Shaker pantry boxes in original paint", d: 0.62 },
            { src: "/img/hero-sheep.png", alt: "Carved and whitewashed sheep on a painted base", d: 0.74 },
          ].map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: p.d, ease: [0.22, 1, 0.36, 1] }}
              className={`overflow-hidden rounded-xl ring-1 ring-ink/10 sm:rounded-2xl ${
                i === 1 ? "sm:translate-y-5" : ""
              }`}
            >
              <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const row = [...categories, ...categories];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-ink py-3.5">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-8 text-xs smallcaps text-parchment/75">
            {c.label}
            <span className="text-gilt">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const featured = inventory.filter((i) => i.featured).slice(0, 4);
  const { open } = useInquiry();
  const openShop = useOpenShop();

  return (
    <>
      <Hero />
      <Marquee />

      {/* ── What we look for ─────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="smallcaps text-xs text-gilt">What we look for</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-ink">
              Original surface, <em className="italic text-gilt">above all</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-2">{homeIntro.body}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/collection?c=${c.slug}`}
                  className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] text-ink-2 transition hover:border-gilt hover:bg-gilt/10 hover:text-ink"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured ─────────────────────────────────────── */}
      <section className="border-t border-ink/10 bg-parchment-2/50">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
          <Reveal className="flex items-end justify-between gap-6">
            <div>
              <p className="smallcaps text-xs text-gilt">Recently catalogued</p>
              <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.5rem)] font-light text-ink">
                A few current pieces
              </h2>
            </div>
            <Link
              to="/collection"
              className="group hidden shrink-0 items-center gap-2 text-sm text-ink-2 transition hover:text-gilt sm:flex"
            >
              See all
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
            {featured.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>

          <Link
            to="/collection"
            className="mt-10 flex items-center justify-center gap-2 rounded-full border border-ink/20 py-3.5 text-sm text-ink transition hover:bg-parchment-3 sm:hidden"
          >
            See the whole collection <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Two shops ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="smallcaps text-xs text-gilt">Two shops, two seasons</p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-ink">
            We follow the weather — New Hampshire in summer, Arizona in winter
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {locations.map((loc, i) => {
            const isOpen = loc.id === openShop.id;
            return (
              <Reveal key={loc.id} delay={i * 0.1}>
                <Link
                  to="/visit"
                  className="group relative block overflow-hidden rounded-3xl ring-1 ring-ink/10 transition hover:ring-ink/25"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={loc.image}
                      alt={loc.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/92 via-ink/55 to-transparent p-6 pt-16">
                    {isOpen && (
                      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-sage px-2.5 py-1 text-[10px] smallcaps text-parchment">
                        <Clock size={11} /> Open this season
                      </span>
                    )}
                    <h3 className="font-display text-2xl text-parchment">
                      {loc.city}, {loc.stateShort}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-parchment/80">
                      <MapPin size={14} /> {loc.season} · by chance or appointment
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-ink-2">
            {homeIntro.seasons}
          </p>
        </Reveal>
      </section>

      {/* ── Gallery strip ────────────────────────────────── */}
      <section className="overflow-hidden border-y border-ink/10 bg-parchment-2/50 py-16 lg:py-20">
        <Reveal className="mx-auto mb-8 max-w-6xl px-5 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="smallcaps text-xs text-gilt">From the shops</p>
              <h2 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.5rem)] font-light text-ink">
                Photographs
              </h2>
            </div>
            <Link
              to="/gallery"
              className="group flex shrink-0 items-center gap-2 text-sm text-ink-2 transition hover:text-gilt"
            >
              Full gallery
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-2 lg:px-8">
          {gallery.slice(3, 10).map((g) => (
            <figure
              key={g.src}
              className="group relative w-56 shrink-0 overflow-hidden rounded-2xl ring-1 ring-ink/10 sm:w-64"
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10 text-xs text-parchment">
                {g.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Barbara ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl ring-1 ring-ink/10">
              <img
                src="/img/NH_shop_dog.webp"
                alt="Inside the Enfield, New Hampshire shop"
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="smallcaps text-xs text-gilt">The proprietor</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-light leading-tight text-ink">
              {business.proprietor}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">{story.paragraphs[0]}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-3">{story.paragraphs[2]}</p>
            <Link
              to="/about"
              className="group mt-7 inline-flex items-center gap-2 border-b border-gilt/40 pb-1 text-sm text-ink transition hover:border-gilt"
            >
              Read the full story
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink px-5 py-20 lg:py-28">
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <img
              src="/img/pineapple-mark.png"
              alt=""
              className="mx-auto h-14 w-14 rounded-full object-cover opacity-90 ring-1 ring-parchment/25"
            />
            <h2 className="mt-7 font-display text-[clamp(1.9rem,5vw,3.25rem)] font-light leading-tight text-parchment">
              Looking for something particular?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-parchment/70">
              Inventory turns over constantly and not everything reaches the website. Tell us what
              you collect and we'll keep an eye out.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => open("general")}
                className="rounded-full bg-parchment px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-parchment-2"
              >
                Send us a note
              </button>
              <a
                href={`tel:${business.cell.replace(/-/g, "")}`}
                className="flex items-center gap-2 rounded-full border border-parchment/25 px-7 py-3.5 text-sm text-parchment transition hover:bg-parchment/10"
              >
                <Phone size={15} /> {business.cell}
              </a>
            </div>

            <div className="mt-14 flex items-center justify-center gap-8 border-t border-parchment/15 pt-9">
              {associations.map((a) => (
                <div key={a.short} className="text-center">
                  <img
                    src={a.logo}
                    alt={a.name}
                    className="mx-auto h-12 w-auto opacity-70 mix-blend-luminosity"
                  />
                  <p className="mt-2 text-[10px] smallcaps text-parchment/50">{a.short}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
