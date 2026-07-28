import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { business, story, associations, homeIntro } from "../data/site";
import { Reveal } from "../components/Reveal";

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 lg:px-8 lg:pt-32">
      <Reveal>
        <p className="smallcaps text-xs text-gilt">About</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-light leading-[1.05] text-ink">
          A lifetime of <em className="italic text-gilt">backroads</em> and country auctions
        </h1>
      </Reveal>

      <Reveal delay={0.08}>
        <figure className="mt-12 overflow-hidden rounded-3xl ring-1 ring-ink/10">
          <img
            src="/img/nh_shop_chickens.webp"
            alt="Carved chickens and painted country pieces in the Enfield shop"
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="space-y-5">
            {story.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display text-xl leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gilt"
                    : "text-[15px] leading-relaxed text-ink-2"
                }
              >
                {p}
              </p>
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-light text-ink">
            {story.locationsHeading}
          </h2>
          <div className="mt-4 space-y-4">
            {story.locationParagraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-ink/10 pt-7">
            <p className="font-display text-lg text-ink">{business.proprietor}</p>
            <p className="mt-1 text-sm text-ink-3">{business.fullName}</p>
          </div>
        </Reveal>

        {/* ── Timeline ─────────────────────────────────── */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="rounded-3xl border border-ink/10 bg-parchment-2/60 p-7">
            <p className="smallcaps text-xs text-gilt">Milestones</p>
            <ol className="mt-6 space-y-6">
              {story.timeline.map((t) => (
                <li key={t.year} className="relative flex gap-4">
                  <span className="mt-1 w-12 shrink-0 font-display text-sm text-gilt">
                    {t.year}
                  </span>
                  <span className="relative flex-1 border-l border-ink/15 pb-1 pl-5 text-sm leading-relaxed text-ink-2">
                    <span className="absolute -left-[3.5px] top-1.5 h-1.5 w-1.5 rounded-full bg-gilt" />
                    {t.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 rounded-3xl border border-ink/10 p-7">
            <p className="smallcaps text-xs text-gilt">Member of</p>
            <div className="mt-5 space-y-5">
              {associations.map((a) => (
                <div key={a.short} className="flex items-center gap-4">
                  <img src={a.logo} alt="" className="h-12 w-12 shrink-0 object-contain" />
                  <p className="text-sm leading-snug text-ink-2">{a.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-ink/10">
            <img
              src="/img/arizona_cactus.webp"
              alt="Saguaro cactus near the Cave Creek, Arizona shop"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>

      <Reveal>
        <section className="mt-20 rounded-3xl bg-ink px-7 py-12 text-center lg:mt-24 lg:px-12">
          <p className="mx-auto max-w-2xl font-display text-xl font-light leading-relaxed text-parchment lg:text-2xl">
            {homeIntro.seasons}
          </p>
          <Link
            to="/visit"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-parchment px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-parchment-2"
          >
            Plan a visit
            <ArrowRight size={15} className="transition group-hover:translate-x-1" />
          </Link>
        </section>
      </Reveal>

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
