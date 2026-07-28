import { Phone, Clock, MapPin, CalendarCheck } from "lucide-react";
import { locations, hoursNote, business } from "../data/site";
import { Reveal } from "../components/Reveal";
import { useInquiry } from "../lib/inquiry";

export default function Visit() {
  const month = new Date().getMonth() + 1;
  const { open } = useInquiry();

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 lg:px-8 lg:pt-32">
      <Reveal>
        <p className="smallcaps text-xs text-gilt">Visit</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-light leading-[1.05] text-ink">
          Two shops, <em className="italic text-gilt">by chance or appointment</em>
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-2">{hoursNote}</p>
      </Reveal>

      <div className="mt-12 space-y-8">
        {locations.map((loc, i) => {
          const isOpen = (loc.months as readonly number[]).includes(month);
          return (
            <Reveal key={loc.id} delay={i * 0.08}>
              <article className="overflow-hidden rounded-3xl border border-ink/10 bg-parchment-2/40 md:flex">
                <div className="md:w-2/5">
                  <img
                    src={loc.image}
                    alt={loc.imageAlt}
                    className="h-56 w-full object-cover md:h-full"
                  />
                </div>

                <div className="flex-1 p-7 lg:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] smallcaps ${
                        isOpen ? "bg-sage text-parchment" : "bg-parchment-3 text-ink-3"
                      }`}
                    >
                      <Clock size={11} />
                      {isOpen ? "Open this season" : "Closed for the season"}
                    </span>
                    <span className="text-[11px] smallcaps text-ink-3">{loc.seasonNote}</span>
                  </div>

                  <h2 className="mt-4 font-display text-3xl font-light text-ink">
                    {loc.city}, {loc.state}
                  </h2>
                  <p className="mt-1.5 flex items-center gap-2 text-sm text-gilt">
                    <CalendarCheck size={15} /> {loc.season}
                  </p>

                  <p className="mt-5 flex gap-2.5 text-[15px] leading-relaxed text-ink-2">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-ink-3" />
                    {loc.directions}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {loc.phones.map((p) => (
                      <a
                        key={p.label}
                        href={`tel:${p.number.replace(/-/g, "")}`}
                        className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm text-ink transition hover:border-gilt hover:bg-gilt/10"
                      >
                        <Phone size={14} className="text-ink-3" />
                        <span className="text-[11px] smallcaps text-ink-3">{p.label}</span>
                        {p.number}
                      </a>
                    ))}
                    <button
                      onClick={() => open("general")}
                      className="rounded-full bg-ink px-5 py-2.5 text-sm text-parchment transition hover:bg-ink-2"
                    >
                      Make an appointment
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-12 rounded-3xl border border-ink/10 px-7 py-9 text-center">
          <p className="mx-auto max-w-xl font-display text-xl font-light leading-relaxed text-ink">
            When traveling, feel free to give us a call. We will gladly open for you.
          </p>
          <a
            href={`tel:${business.cell.replace(/-/g, "")}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm text-ink transition hover:bg-parchment-2"
          >
            <Phone size={15} /> {business.cell}
          </a>
        </div>
      </Reveal>

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
