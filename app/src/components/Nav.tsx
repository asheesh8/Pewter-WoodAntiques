import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Home, LayoutGrid, Search, Heart, MapPin, Menu, X } from "lucide-react";
import { nav, business } from "../data/site";
import { useFavorites } from "../lib/useFavorites";

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-parchment/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 lg:px-8">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/img/pineapple-mark.png"
              alt=""
              className="h-9 w-9 rounded-full object-cover ring-1 ring-ink/15"
            />
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold tracking-tight text-ink">
                Pewter &amp; Wood
              </span>
              <span className="mt-0.5 block text-[10px] smallcaps text-ink-3">
                {business.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-sm transition ${
                    isActive ? "text-ink" : "text-ink-3 hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-parchment-3"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-full border border-ink/15 p-2.5 text-ink transition hover:bg-parchment-3 lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-parchment/97 backdrop-blur-sm lg:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-1">
              {nav.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.045 }}
                >
                  <NavLink
                    to={n.to}
                    end={n.to === "/"}
                    className={({ isActive }) =>
                      `block px-6 py-3 font-display text-3xl transition ${
                        isActive ? "text-gilt" : "text-ink hover:text-gilt"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const tabs = [
  { to: "/", icon: Home, label: "Home", end: true },
  { to: "/collection", icon: LayoutGrid, label: "Browse", end: false },
  { to: "/collection?focus=search", icon: Search, label: "Search", center: true, end: false },
  { to: "/saved", icon: Heart, label: "Saved", end: false },
  { to: "/visit", icon: MapPin, label: "Visit", end: false },
];

/** Mobile tab bar, in the spirit of the reference app design. */
export function TabBar() {
  const { count } = useFavorites();
  const { pathname, search } = useLocation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pb-safe lg:hidden">
      <div className="mx-3 mb-1 flex items-center justify-around rounded-2xl border border-ink/10 bg-parchment/92 px-1.5 py-1.5 shadow-[0_-6px_28px_-12px_rgba(42,32,26,0.35)] backdrop-blur-xl">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = t.center
            ? pathname === "/collection" && search.includes("focus=search")
            : t.end
              ? pathname === t.to
              : pathname.startsWith(t.to) && t.to !== "/";

          if (t.center) {
            return (
              <Link
                key={t.label}
                to={t.to}
                aria-label={t.label}
                className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-parchment shadow-lg ring-4 ring-parchment transition active:scale-95"
              >
                <Icon size={21} />
              </Link>
            );
          }
          return (
            <Link
              key={t.label}
              to={t.to}
              aria-label={t.label}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition ${
                active ? "text-gilt" : "text-ink-3"
              }`}
            >
              <span className="relative">
                <Icon size={20} strokeWidth={active ? 2.3 : 1.8} />
                {t.label === "Saved" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-oxide px-1 text-[10px] font-semibold text-parchment">
                    {count}
                  </span>
                )}
              </span>
              <span className="text-[10px] tracking-wide">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
