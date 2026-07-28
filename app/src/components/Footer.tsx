import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { business, nav, locations, associations } from "../data/site";

export function Footer() {
  return (
    <footer className="grain relative border-t border-ink/10 bg-parchment-2/60">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/img/pineapple-mark.png"
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-1 ring-ink/15"
              />
              <span>
                <span className="block font-display text-lg font-semibold text-ink">
                  {business.fullName}
                </span>
                <span className="mt-0.5 block text-[10px] smallcaps text-ink-3">
                  {business.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-3">
              {business.proprietor} · {business.established.toLowerCase()}. Early American antiques
              with emphasis on original, first-surface paint.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-sm text-ink-2 transition hover:text-gilt"
              >
                <Mail size={15} /> {business.email}
              </a>
              <a
                href={`tel:${business.cell.replace(/-/g, "")}`}
                className="flex items-center gap-2 text-sm text-ink-2 transition hover:text-gilt"
              >
                <Phone size={15} /> {business.cell}
              </a>
            </div>
          </div>

          <nav>
            <p className="text-[11px] smallcaps text-gilt">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-sm text-ink-2 transition hover:text-gilt"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/saved" className="text-sm text-ink-2 transition hover:text-gilt">
                  Saved
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[11px] smallcaps text-gilt">Shops</p>
            <ul className="mt-4 space-y-4">
              {locations.map((l) => (
                <li key={l.id}>
                  <p className="text-sm text-ink">
                    {l.city}, {l.stateShort}
                  </p>
                  <p className="mt-0.5 text-[13px] text-ink-3">{l.season}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              {associations.map((a) => (
                <img
                  key={a.short}
                  src={a.logo}
                  alt={a.name}
                  title={a.name}
                  className="h-10 w-10 object-contain opacity-60 transition hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink/10 pt-6 text-[12px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.fullName}. All rights reserved.
          </p>
          <p>By chance or appointment · Enfield, NH &amp; Cave Creek, AZ</p>
        </div>
      </div>
    </footer>
  );
}
