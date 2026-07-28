import { CalendarDays, AlertCircle, Repeat } from "lucide-react";
import { shows, regularShows } from "../data/site";
import { Reveal } from "../components/Reveal";
import { useInquiry } from "../lib/inquiry";

export default function Shows() {
  const { open } = useInquiry();

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 lg:px-8 lg:pt-32">
      <Reveal>
        <p className="smallcaps text-xs text-gilt">Shows</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-light leading-[1.05] text-ink">
          On the road
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          Pewter &amp; Wood exhibits at shows through New England and the Hudson Valley. Come find
          the booth — there is always more on the floor than online.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <figure className="mt-10 overflow-hidden rounded-3xl ring-1 ring-ink/10">
          <img
            src="/img/pewter-and-wood-show.webp"
            alt="The Pewter & Wood booth set up at an antiques show"
            className="aspect-[16/9] w-full object-cover"
          />
        </figure>
      </Reveal>

      {/* ── Annual fixtures ──────────────────────────────── */}
      <Reveal delay={0.1}>
        <section className="mt-14">
          <h2 className="flex items-center gap-2.5 font-display text-2xl font-light text-ink">
            <Repeat size={19} className="text-gilt" /> Annual fixtures
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {regularShows.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-ink/10 bg-parchment-2/50 p-6"
              >
                <p className="smallcaps text-xs text-gilt">{s.when}</p>
                <p className="mt-2 font-display text-lg leading-snug text-ink">{s.name}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Archive ──────────────────────────────────────── */}
      <Reveal delay={0.14}>
        <section className="mt-14">
          <h2 className="flex items-center gap-2.5 font-display text-2xl font-light text-ink">
            <CalendarDays size={19} className="text-gilt" /> Most recent schedule
          </h2>

          <div className="mt-5 flex gap-3 rounded-2xl border border-oxide/25 bg-oxide/[0.06] px-4 py-3.5">
            <AlertCircle size={17} className="mt-0.5 shrink-0 text-oxide" />
            <p className="text-[13px] leading-relaxed text-ink-2">
              These are the dates carried over from the current website, which was last updated in
              2019. They're shown as a past schedule — send us this season's dates and we'll put
              them up.
            </p>
          </div>

          <ol className="mt-7 space-y-px overflow-hidden rounded-2xl border border-ink/10">
            {shows.map((s) => (
              <li
                key={s.dates + s.name}
                className="flex flex-col gap-1 bg-parchment-2/40 px-6 py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="w-44 shrink-0 font-display text-sm text-gilt">{s.dates}</span>
                <span className="flex-1">
                  <span className="block font-display text-lg leading-snug text-ink">
                    {s.name}
                  </span>
                  {s.venue && (
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-3">
                      {s.venue}
                    </span>
                  )}
                  {s.place && (
                    <span className="mt-0.5 block text-[13px] smallcaps text-ink-3">
                      {s.place}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <div className="mt-14 rounded-3xl bg-ink px-7 py-11 text-center">
          <p className="mx-auto max-w-lg font-display text-xl font-light leading-relaxed text-parchment">
            Want to know where we'll be next?
          </p>
          <button
            onClick={() => open("general")}
            className="mt-6 rounded-full bg-parchment px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-parchment-2"
          >
            Ask about upcoming shows
          </button>
        </div>
      </Reveal>

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
