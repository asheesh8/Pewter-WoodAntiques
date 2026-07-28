import type { Motif } from "../data/inventory";

/**
 * A drawn "plate" standing in for a photograph.
 *
 * Sample listings have no photography, and a broken image or a grey box
 * would read as a defect. These engraved-looking plates read as a
 * deliberate placeholder instead — and they disappear the moment a real
 * photograph is added to an item's `images` array.
 *
 * Each motif has two variants so that two pieces in the same category
 * never render an identical picture; `seed` picks between them.
 */

const INK = "var(--color-ink-2)";

/** Cheap deterministic hash so a given item always draws the same way. */
function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type Draw = (v: number) => React.ReactNode;

const S = {
  fill: "none",
  stroke: INK,
  strokeWidth: 1.7,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

const motifs: Record<Motif, { label: string; draw: Draw }> = {
  /* ── Stacked pantry boxes / document box ─────────────── */
  box: {
    label: "Painted smalls",
    draw: (v) =>
      v === 0 ? (
        <g {...S}>
          <ellipse cx="60" cy="88" rx="33" ry="7.5" />
          <path d="M27 88V72M93 88V72" />
          <ellipse cx="60" cy="72" rx="33" ry="7.5" fill="var(--color-oxide)" fillOpacity="0.18" />
          <path d="M33 72V57M87 72V57" />
          <ellipse cx="60" cy="57" rx="27" ry="6.5" fill="var(--color-sage)" fillOpacity="0.2" />
          <path d="M39 57V44M81 57V44" />
          <ellipse cx="60" cy="44" rx="21" ry="5.5" fill="var(--color-shaker)" fillOpacity="0.2" />
          <path d="M45 44V33M75 44V33" />
          <ellipse cx="60" cy="33" rx="15" ry="4.5" fill="var(--color-gilt)" fillOpacity="0.18" />
          <path d="M50 33v-8M70 33v-8" />
          <ellipse cx="60" cy="25" rx="10" ry="3.5" />
        </g>
      ) : (
        <g {...S}>
          {/* dome-top document box */}
          <path d="M24 84V56c0-9 16-14 36-14s36 5 36 14v28z" fill="var(--color-gilt)" fillOpacity="0.13" />
          <path d="M24 84V56c0-9 16-14 36-14s36 5 36 14v28z" fill="none" />
          <path d="M24 62h72" />
          <rect x="52" y="58" width="16" height="10" rx="1.5" fill="var(--color-oxide)" fillOpacity="0.3" />
          <path d="M60 58v-6" />
          <path d="M20 84h80v8H20z" fill={INK} fillOpacity="0.08" />
          <path d="M36 50c6 6 12 6 18 0M66 50c6 6 12 6 18 0" opacity="0.55" />
        </g>
      ),
  },

  /* ── Game boards ─────────────────────────────────────── */
  board: {
    label: "Game board",
    draw: (v) =>
      v === 0 ? (
        <g {...S}>
          <rect x="19" y="19" width="82" height="82" rx="2" />
          <rect x="27" y="27" width="66" height="66" />
          <path d="M60 27v66M27 60h66" />
          <rect x="48" y="48" width="24" height="24" fill="var(--color-oxide)" fillOpacity="0.2" />
          <path d="M27 27l21 21M93 27L72 48M27 93l21-21M93 93L72 72" />
          <circle cx="37" cy="37" r="3.5" fill="var(--color-shaker)" fillOpacity="0.4" />
          <circle cx="83" cy="37" r="3.5" fill="var(--color-sage)" fillOpacity="0.4" />
          <circle cx="37" cy="83" r="3.5" fill="var(--color-sage)" fillOpacity="0.4" />
          <circle cx="83" cy="83" r="3.5" fill="var(--color-shaker)" fillOpacity="0.4" />
        </g>
      ) : (
        <g {...S}>
          {/* checkerboard */}
          <rect x="19" y="19" width="82" height="82" rx="2" />
          <rect x="28" y="28" width="64" height="64" />
          {Array.from({ length: 16 }).map((_, i) => {
            const r = Math.floor(i / 4);
            const c = i % 4;
            return (
              <rect
                key={i}
                x={28 + c * 16 + (r % 2) * 0}
                y={28 + r * 16}
                width="16"
                height="16"
                fill={(r + c) % 2 ? "var(--color-oxide)" : "transparent"}
                fillOpacity="0.22"
                stroke="none"
              />
            );
          })}
          <path d="M28 44h64M28 60h64M28 76h64M44 28v64M60 28v64M76 28v64" strokeWidth="0.9" opacity="0.5" />
        </g>
      ),
  },

  /* ── Stoneware crock / pewter porringer ──────────────── */
  vessel: {
    label: "Stoneware",
    draw: (v) =>
      v === 0 ? (
        <g {...S}>
          <path d="M39 33c-1 0-2 1-2 2 0 6-4 20-4 34 0 12 3 21 3 21h48s3-9 3-21c0-14-4-28-4-34 0-1-1-2-2-2z" fill="var(--color-parchment-3)" fillOpacity="0.5" />
          <ellipse cx="60" cy="33" rx="21" ry="5.5" />
          <path d="M35 48c-5 1-8 4-8 8s3 7 8 8M85 48c5 1 8 4 8 8s-3 7-8 8" />
          {/* slip-trailed cobalt bird on a branch */}
          <g stroke="var(--color-shaker)" strokeWidth="2.4" opacity="0.8">
            <path d="M48 68c4-9 12-12 17-7 3 3 2 7-1 8 4 1 7 3 6 6" />
            <path d="M64 61l7-5" />
            <path d="M44 72c6 2 14 2 20-1" />
          </g>
        </g>
      ) : (
        <g {...S}>
          {/* pewter porringer, seen from above with crown handle */}
          <circle cx="56" cy="60" r="26" fill="var(--color-linen)" fillOpacity="0.28" />
          <circle cx="56" cy="60" r="26" fill="none" />
          <circle cx="56" cy="60" r="19" opacity="0.6" />
          <circle cx="56" cy="60" r="7" opacity="0.35" />
          <path d="M82 60h6c4 0 6-3 6-6s-2-4-4-4M82 60h6c4 0 6 3 6 6s-2 4-4 4" />
          <path d="M88 50c3 0 5 2 5 5s-2 5-5 5" opacity="0.5" />
        </g>
      ),
  },

  /* ── Hooked rug / sampler ────────────────────────────── */
  textile: {
    label: "Textile",
    draw: (v) =>
      v === 0 ? (
        <g {...S}>
          {/* hooked rug with a central figure */}
          <rect x="14" y="30" width="92" height="60" rx="4" fill="var(--color-linen)" fillOpacity="0.25" />
          <rect x="14" y="30" width="92" height="60" rx="4" fill="none" />
          <rect x="22" y="38" width="76" height="44" rx="2" strokeDasharray="4 3" opacity="0.7" />
          <ellipse cx="60" cy="60" rx="25" ry="17" fill="var(--color-oxide)" fillOpacity="0.16" stroke="none" />
          {/* cat */}
          <path d="M50 70c0-8 4-13 10-13s10 5 10 13z" fill="var(--color-ink-2)" fillOpacity="0.25" />
          <path d="M53 57l-2-6 6 3M67 57l2-6-6 3" />
          <circle cx="56" cy="61" r="1.4" fill={INK} stroke="none" />
          <circle cx="64" cy="61" r="1.4" fill={INK} stroke="none" />
          <path d="M70 68c5 1 8 4 8 8" />
        </g>
      ) : (
        <g {...S}>
          {/* sampler: alphabet bands over a house */}
          <rect x="22" y="16" width="76" height="88" rx="2" fill="var(--color-parchment-3)" fillOpacity="0.4" />
          <rect x="22" y="16" width="76" height="88" rx="2" fill="none" />
          <rect x="29" y="23" width="62" height="74" strokeDasharray="3 3" opacity="0.6" />
          <g strokeWidth="2.2" opacity="0.55">
            <path d="M35 34h50M35 42h50M35 50h38" />
          </g>
          <g strokeWidth="1.4" opacity="0.75">
            <path d="M35 60h50" strokeDasharray="2 4" />
          </g>
          {/* house */}
          <path d="M48 88V72l12-9 12 9v16z" fill="var(--color-oxide)" fillOpacity="0.2" />
          <path d="M48 88V72l12-9 12 9v16z" fill="none" />
          <rect x="56" y="79" width="8" height="9" />
          {/* flanking trees */}
          <path d="M38 88v-6M38 82c-4-2-5-6-3-9 2 3 5 3 6 0 2 4 1 8-3 9z" />
          <path d="M82 88v-6M82 82c-4-2-5-6-3-9 2 3 5 3 6 0 2 4 1 8-3 9z" />
        </g>
      ),
  },

  /* ── Carved figures ──────────────────────────────────── */
  figure: {
    label: "Folk carving",
    draw: (v) =>
      v === 0 ? (
        <g {...S}>
          {/* standing sheep */}
          <path
            d="M33 62c-2-11 5-19 16-21 9-1.5 15-1 24 0 11 2 17 10 15 21-1 7-5 11-11 11H44c-6 0-10-4-11-11z"
            fill="var(--color-parchment-3)"
            fillOpacity="0.7"
          />
          <path d="M33 62c-2-11 5-19 16-21 9-1.5 15-1 24 0 11 2 17 10 15 21-1 7-5 11-11 11H44c-6 0-10-4-11-11z" fill="none" />
          <path d="M33 52c-5-4-10-4-12-1s1 7 5 8" />
          <circle cx="24" cy="50" r="1.6" fill={INK} stroke="none" />
          <path d="M28 45c3-3 7-2 7 1s-3 4-5 3" stroke="var(--color-gilt)" strokeWidth="1.5" />
          <path d="M44 73v14M53 73v14M74 73v14M83 73v14" />
          <rect x="36" y="87" width="55" height="9" rx="1" fill="var(--color-linen)" fillOpacity="0.45" />
        </g>
      ) : (
        <g {...S}>
          {/* rocking horse */}
          <path d="M40 52c0-6 6-10 15-10h10c8 0 13 4 13 10v10c0 5-4 8-9 8H49c-5 0-9-3-9-8z" fill="var(--color-linen)" fillOpacity="0.4" />
          <path d="M40 52c0-6 6-10 15-10h10c8 0 13 4 13 10v10c0 5-4 8-9 8H49c-5 0-9-3-9-8z" fill="none" />
          <path d="M74 46l12-10 4 4-9 12" fill="var(--color-linen)" fillOpacity="0.4" />
          <path d="M74 46l12-10 4 4-9 12" fill="none" />
          <path d="M86 36l2-6 4 5" />
          <circle cx="84" cy="43" r="1.5" fill={INK} stroke="none" />
          <path d="M40 52c-6 0-10 4-11 9 4-3 8-3 11-1" />
          <path d="M50 70v12M68 70v12" />
          <path d="M28 88c8-8 22-12 32-12s24 4 32 12" />
        </g>
      ),
  },

  /* ── Country furniture ───────────────────────────────── */
  furniture: {
    label: "Country furniture",
    draw: (v) =>
      v === 0 ? (
        <g {...S}>
          {/* hanging wall cupboard, one door */}
          <path d="M26 16h68v78H26z" fill="var(--color-sage)" fillOpacity="0.18" />
          <path d="M26 16h68v78H26z" fill="none" />
          <path d="M26 16h68" strokeWidth="3.2" />
          <rect x="34" y="26" width="52" height="58" />
          <rect x="40" y="32" width="40" height="46" opacity="0.5" />
          <circle cx="80" cy="55" r="2.2" fill={INK} stroke="none" />
          <path d="M34 34h5M34 76h5" strokeWidth="2.6" />
          <path d="M32 94l-4 10M88 94l4 10" />
        </g>
      ) : (
        <g {...S}>
          {/* pierced-tin pie safe, two doors */}
          <path d="M24 20h72v72H24z" fill="var(--color-linen)" fillOpacity="0.35" />
          <path d="M24 20h72v72H24z" fill="none" />
          <path d="M22 20h76" strokeWidth="3.2" />
          <rect x="32" y="30" width="26" height="52" />
          <rect x="62" y="30" width="26" height="52" />
          {[45, 75].map((cx) =>
            [44, 66].map((cy) => (
              <g key={`${cx}-${cy}`} opacity="0.75">
                <circle cx={cx} cy={cy} r="8" strokeWidth="0.9" />
                <circle cx={cx} cy={cy} r="3" strokeWidth="0.9" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i * Math.PI) / 4;
                  return (
                    <circle
                      key={i}
                      cx={cx + Math.cos(a) * 5.5}
                      cy={cy + Math.sin(a) * 5.5}
                      r="0.9"
                      fill={INK}
                      stroke="none"
                    />
                  );
                })}
              </g>
            )),
          )}
          <circle cx="59" cy="56" r="1.8" fill={INK} stroke="none" />
          <path d="M30 92v10M90 92v10" />
        </g>
      ),
  },

  /* ── Weathervane ─────────────────────────────────────── */
  vane: {
    label: "Weathervane",
    draw: () => (
      <g {...S}>
        {/* running horse silhouette */}
        <path
          d="M34 47c5-5 14-7 23-6 6 .6 11 2 15 4l6-9c2-3 6-6 10-7l6-2 1 5c-.5 3-3 6-6 7-3 1.5-6 4-7 7-1 3-.4 6 .6 9 1.4 4 1 8-1 11l-2 3H40l-3-4c-3-4-4-11-3-18z"
          fill="var(--color-gilt)"
          fillOpacity="0.32"
        />
        <path d="M34 47c5-5 14-7 23-6 6 .6 11 2 15 4l6-9c2-3 6-6 10-7l6-2 1 5c-.5 3-3 6-6 7-3 1.5-6 4-7 7-1 3-.4 6 .6 9 1.4 4 1 8-1 11l-2 3H40l-3-4c-3-4-4-11-3-18z" fill="none" />
        {/* mane */}
        <path d="M70 39c3-2 6-2 8 0M66 42c3-2 6-2 8 0" opacity="0.7" strokeWidth="1.3" />
        {/* eye + muzzle */}
        <circle cx="90" cy="32" r="1.4" fill={INK} stroke="none" />
        <path d="M96 30l4-1" strokeWidth="1.3" />
        {/* flowing tail */}
        <path d="M34 50c-6-3-13-2-18 3 4-1 8-.5 11 1-4 1-8 4-10 8 5-4 10-5 15-4" />
        {/* legs: fore extended, hind driving */}
        <path d="M46 65l-8 18-6 4M56 65l4 17M74 65l6 16M82 64l7 14" />
        {/* rod and plinth */}
        <path d="M60 82v14" strokeWidth="2" />
        <path d="M36 96h48" strokeWidth="3.2" />
      </g>
    ),
  },

  /* ── Trade sign ──────────────────────────────────────── */
  sign: {
    label: "Trade sign",
    draw: () => (
      <g {...S}>
        <path d="M28 40V28M92 40V28" />
        <path d="M22 28h76" strokeWidth="2" />
        <rect x="14" y="40" width="92" height="40" rx="2" fill={INK} fillOpacity="0.85" stroke="none" />
        <rect x="14" y="40" width="92" height="40" rx="2" fill="none" />
        <rect x="20" y="46" width="80" height="28" stroke="var(--color-gilt)" strokeWidth="1.1" opacity="0.8" />
        <g stroke="var(--color-gilt)" strokeWidth="2.1" opacity="0.95">
          <path d="M28 66V54h5a3 3 0 0 1 0 6h-5m0 0h6a3 3 0 0 1 0 6h-6" />
          <path d="M42 66V54h7M42 60h5" />
          <path d="M54 57a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0z" />
          <path d="M66 66V54l5 12 5-12v12" />
          <path d="M82 66V54h5a3 3 0 0 1 0 6h-5m5 0l4 6" />
        </g>
      </g>
    ),
  },
};

export function Plate({
  motif,
  seed = "",
  variant,
  className = "",
  showLabel = false,
}: {
  motif: Motif;
  seed?: string;
  /** Explicit variant wins; otherwise it's derived from the seed. */
  variant?: 0 | 1;
  className?: string;
  showLabel?: boolean;
}) {
  const m = motifs[motif];
  const v = variant ?? (hash(seed || motif) % 2);

  return (
    <div
      className={`relative grain flex h-full w-full items-center justify-center overflow-hidden bg-parchment-2 ${className}`}
    >
      {/* faint ruled ground, like an engraver's plate */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--color-ink) 0 1px, transparent 1px 7px)",
        }}
      />
      <svg
        viewBox="0 0 120 120"
        className="relative aspect-square w-[74%] max-w-sm"
        role="img"
        aria-label={`${m.label} illustration`}
      >
        {m.draw(v)}
      </svg>
      {showLabel && (
        <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] smallcaps text-ink-3/70">
          {m.label}
        </span>
      )}
    </div>
  );
}
