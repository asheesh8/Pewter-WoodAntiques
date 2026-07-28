# Pewter & Wood Antiques

A new site for Barbara Boardman Johnson's shop — 18th & 19th century American
antiques, Enfield NH and Cave Creek AZ.

All copy and photography is carried over from the existing WordPress site. See
[CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) for the full extraction, including
what was missing at the source.

---

## Run it

```bash
cd app && npm install && npm run dev
```

Build for production:

```bash
cd app && npm run build
```

Output lands in `app/dist/` — a static bundle that can go on any host.
Point the host's SPA fallback at `index.html` so deep links like
`/collection/pw-002` resolve.

### Deploying

The app lives in `app/`, not at the repo root, so a default import will
find nothing to build and serve a 404. Two `vercel.json` files cover both
setups — you only need whichever matches your project's **Root Directory**:

| Root Directory setting | File used | What it does |
|---|---|---|
| `.` (default) | `/vercel.json` | builds from `app/`, outputs `app/dist`, adds the SPA rewrite |
| `app` | `/app/vercel.json` | Vercel auto-detects Vite; this just adds the SPA rewrite |

Both are committed, so either works without further configuration. The
rewrite (`/(.*)` → `/index.html`) is what makes deep links resolve;
Vercel checks the filesystem first, so real assets are unaffected.

---

## Stack

| | |
|---|---|
| **Vite 8 + React 19 + TypeScript** | strict typecheck, `npm run build` runs `tsc -b` first |
| **Tailwind v4** | CSS-first theme in `src/index.css` under `@theme` |
| **Motion** (`motion/react`) | scroll reveals, shared-layout nav pill, modal springs |
| **Lucide** | icons |
| **React Router 7** | routing |
| **Sharp** | one-off image pipeline, `app/scripts/prep-images.mjs` |

Fonts are **Fraunces** (display) and **Karla** (UI), loaded from Google Fonts.

---

## Layout of the code

```
app/src/
  data/site.ts        ← every real fact and word from the client's site
  data/inventory.ts   ← the catalogue (currently SAMPLE data — see below)
  components/         ← Nav, ItemCard, Plate, InquiryModal, Footer, Reveal
  pages/              ← Home, Collection, ItemDetail, Gallery, About,
                        Visit, Shows, Contact, Saved
```

`data/site.ts` is the single source of truth for business facts — phone numbers,
seasons, terms of sale, the show list. Change a phone number there and it updates
in the header, footer, contact page, visit page and inquiry modal at once.

---

## Putting real inventory in

**The catalogue is seeded with 14 placeholder pieces**, because the client's site
has no inventory and no product photographs (the Catalog page reads "We will be
updating our catalog soon!"). Every placeholder renders a visible
**Sample listing** badge, and the Collection page carries a banner explaining it.

To go live, edit `app/src/data/inventory.ts`:

```ts
{
  id: "pw-015",
  title: "Salmon-Painted Blanket Chest",
  category: "furniture",        // must match a slug in site.ts → categories
  price: 4200,                  // or null for "Price on request"
  era: "c. 1820",
  origin: "New Hampshire",
  condition: "Original surface throughout",
  dimensions: '38" w × 18" d × 24" h',
  surface: "Original salmon paint",
  description: "…",
  status: "available",          // "available" | "hold" | "sold"
  images: ["/img/chest-01.webp"],   // drop files in app/public/img/
  motif: "furniture",           // only used when images is empty
  isSample: false,              // ← removes the badge
}
```

Two things happen automatically once `isSample: false` is set on every record: the
badges disappear, and the Collection banner should be deleted (it's the block
marked *"Honest notice"* in `pages/Collection.tsx`).

### About the drawn "plates"

Items with an empty `images` array render a hand-drawn engraving instead of a
broken image — a pantry-box stack, a game board, a pie safe, a weathervane and so
on, keyed off the `motif` field. They exist so the sample catalogue doesn't look
defective. **Add a real photograph and the plate disappears on its own.**

---

## Deliberate deviations from the reference design

- **No cart or checkout.** The client's published terms are cheques and money
  orders, and both shops are appointment-only. Item pages instead offer *Inquire*,
  *Request more photographs* and *Ask for a hold*, each opening a pre-filled email.
  This matches what the current site already tells customers to do.
- **The show dates are labelled as past.** The source page hasn't been updated
  since 2019; publishing those as upcoming would have been wrong.
- **No map.** The client publishes descriptive directions, not street addresses.

---

## Still to do

1. **Photograph the inventory.** This is the one thing that would transform the
   site — existing photos are 2007–2013 and several are under 300px.
2. Get this season's show dates.
3. Confirm which email address Barbara actually reads (two are published).
4. Wire the inquiry form to a real form service if a `mailto:` handoff isn't
   wanted — the payload is already assembled in `components/InquiryModal.tsx`.
