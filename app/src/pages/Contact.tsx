import { Mail, Phone, ShieldCheck, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { business, termsOfSale, locations, hoursNote, benefit } from "../data/site";
import { Reveal } from "../components/Reveal";
import { useInquiry } from "../lib/inquiry";

export default function Contact() {
  const { open } = useInquiry();

  return (
    <div className="mx-auto max-w-4xl px-5 pt-28 lg:px-8 lg:pt-32">
      <Reveal>
        <p className="smallcaps text-xs text-gilt">Contact</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.75rem)] font-light leading-[1.05] text-ink">
          Get in touch
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          Please feel free to contact us for additional photos or for information.
        </p>
      </Reveal>

      {/* ── Direct lines ─────────────────────────────────── */}
      <Reveal delay={0.06}>
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${business.email}`}
            className="group rounded-2xl border border-ink/10 bg-parchment-2/50 p-6 transition hover:border-gilt/50"
          >
            <Mail size={19} className="text-gilt" />
            <p className="mt-3 text-[10px] smallcaps text-ink-3">Email</p>
            <p className="mt-1 break-all font-display text-lg leading-snug text-ink transition group-hover:text-gilt">
              {business.email}
            </p>
          </a>
          <a
            href={`tel:${business.cell.replace(/-/g, "")}`}
            className="group rounded-2xl border border-ink/10 bg-parchment-2/50 p-6 transition hover:border-gilt/50"
          >
            <Phone size={19} className="text-gilt" />
            <p className="mt-3 text-[10px] smallcaps text-ink-3">Call or text</p>
            <p className="mt-1 font-display text-lg text-ink transition group-hover:text-gilt">
              {business.cell}
            </p>
          </a>
        </div>

        <button
          onClick={() => open("general")}
          className="mt-4 w-full rounded-full bg-ink px-6 py-4 text-sm font-medium text-parchment transition hover:bg-ink-2"
        >
          Write us a message
        </button>
      </Reveal>

      {/* ── Shop lines ───────────────────────────────────── */}
      <Reveal delay={0.1}>
        <section className="mt-14">
          <h2 className="font-display text-2xl font-light text-ink">The shops</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-3">{hoursNote}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {locations.map((loc) => (
              <div key={loc.id} className="rounded-2xl border border-ink/10 p-6">
                <p className="font-display text-lg text-ink">
                  {loc.city}, {loc.stateShort}
                </p>
                <p className="mt-1 text-[11px] smallcaps text-gilt">{loc.season}</p>
                <div className="mt-4 space-y-1.5">
                  {loc.phones.map((p) => (
                    <a
                      key={p.label}
                      href={`tel:${p.number.replace(/-/g, "")}`}
                      className="flex items-center gap-2 text-sm text-ink-2 transition hover:text-gilt"
                    >
                      <span className="w-10 text-[10px] smallcaps text-ink-3">{p.label}</span>
                      {p.number}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Terms of sale ────────────────────────────────── */}
      <Reveal delay={0.14}>
        <section id="terms" className="mt-14 scroll-mt-28">
          <h2 className="flex items-center gap-2.5 font-display text-2xl font-light text-ink">
            <ShieldCheck size={20} className="text-gilt" /> Terms of sale
          </h2>

          <div className="mt-5 rounded-2xl border border-sage/35 bg-sage/[0.07] px-5 py-4">
            <p className="text-[15px] leading-relaxed text-ink-2">{termsOfSale.guarantee}</p>
          </div>

          <dl className="mt-6 space-y-px overflow-hidden rounded-2xl border border-ink/10">
            {termsOfSale.items.map((t) => (
              <div key={t.heading} className="bg-parchment-2/40 px-6 py-5">
                <dt className="text-[11px] smallcaps text-gilt">{t.heading}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{t.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      {/* ── Benefit ──────────────────────────────────────── */}
      <Reveal delay={0.18}>
        <section className="mt-14 rounded-3xl border border-ink/10 bg-parchment-2/50 p-7 lg:p-9">
          <h2 className="flex items-center gap-2.5 font-display text-2xl font-light text-ink">
            <Heart size={19} className="text-oxide" /> {benefit.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{benefit.context}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-3">{benefit.status}</p>
          <Link
            to="/contact"
            onClick={(e) => {
              e.preventDefault();
              open("general");
            }}
            className="mt-5 inline-block rounded-full border border-ink/20 px-6 py-3 text-sm text-ink transition hover:bg-parchment-3"
          >
            Ask to be told when dates are set
          </Link>
        </section>
      </Reveal>

      <div className="mb-tabbar lg:mb-24" />
    </div>
  );
}
