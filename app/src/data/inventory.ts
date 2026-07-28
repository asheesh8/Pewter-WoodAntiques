import type { CategorySlug } from "./site";

/**
 * ─────────────────────────────────────────────────────────────────────
 *  SAMPLE CATALOGUE — NOT REAL INVENTORY
 * ─────────────────────────────────────────────────────────────────────
 *  The live site's catalogue page currently reads "We will be updating
 *  our catalog soon!" and the Dig Antiques shop has no listings, so
 *  there is no real stock or product photography to import.
 *
 *  These records exist so the catalogue, search, filtering and inquiry
 *  flows can be seen working. Every one carries `isSample: true`, which
 *  makes the UI stamp it with a visible "Sample listing" badge.
 *
 *  TO GO LIVE: replace this array with real pieces and set
 *  `isSample: false` (or drop the field). Add `images: ["/img/…"]` and
 *  the card will show the photograph instead of the drawn plate.
 * ─────────────────────────────────────────────────────────────────────
 */

export type ItemStatus = "available" | "hold" | "sold";

export interface Item {
  id: string;
  title: string;
  category: CategorySlug;
  /** Numeric price, or null for "price on request". */
  price: number | null;
  era: string;
  origin: string;
  condition: string;
  dimensions: string;
  surface: string;
  description: string;
  status: ItemStatus;
  /** Real photographs, when they exist. Empty falls back to a drawn plate. */
  images: string[];
  /** Drives the colour + motif of the generated plate. */
  motif: Motif;
  /** Which drawing of that motif to use, so same-motif pieces differ. */
  plate?: 0 | 1;
  featured?: boolean;
  isSample: boolean;
}

export type Motif =
  | "box"
  | "board"
  | "vessel"
  | "textile"
  | "figure"
  | "furniture"
  | "vane"
  | "sign";

export const inventory: Item[] = [
  {
    id: "pw-001",
    title: "Stacked Shaker Pantry Boxes, Set of Five",
    category: "painted-smalls",
    price: 3850,
    era: "Early 19th century",
    origin: "New England",
    condition: "Excellent, original surface",
    dimensions: 'Largest 11" dia. × 4½" h; smallest 4" dia.',
    surface: "Original first-surface paint — sage, oxide red, shaker blue",
    description:
      "A graduated nest of five bentwood pantry boxes retaining their original dry paint. Copper tacks throughout, swallowtail fingers pointing clockwise. The kind of stack that anchors a cupboard top.",
    status: "available",
    images: [],
    motif: "box",
    plate: 0,
    featured: true,
    isSample: true,
  },
  {
    id: "pw-002",
    title: "Parcheesi Game Board in Old Blue & Salmon",
    category: "game-boards",
    price: 4200,
    era: "Late 19th century",
    origin: "Pennsylvania",
    condition: "Very good, expected wear to playing surface",
    dimensions: '18¼" × 18¼"',
    surface: "Original painted surface, untouched",
    description:
      "A folk-painted parcheesi board with applied moulded edge, worked in old blue, salmon and cream over a pine ground. Honest wear at the centre where the pieces travelled.",
    status: "available",
    images: [],
    motif: "board",
    plate: 0,
    featured: true,
    isSample: true,
  },
  {
    id: "pw-003",
    title: "Running Horse Weathervane",
    category: "folk-art",
    price: null,
    era: "19th century",
    origin: "American",
    condition: "Fine gilt surface with weathered patina",
    dimensions: '26" l × 18" h on stand',
    surface: "Original gilding over copper",
    description:
      "Full-bodied copper running horse retaining old gilt, mounted on a black iron rod and plinth. Sculptural from every angle.",
    status: "available",
    images: [],
    motif: "vane",
    featured: true,
    isSample: true,
  },
  {
    id: "pw-004",
    title: "Salt-Glazed Stoneware Crock with Cobalt Bird",
    category: "stoneware",
    price: 1650,
    era: "c. 1860",
    origin: "New York State",
    condition: "Good; tight hairline to base",
    dimensions: '12" h × 9" dia.',
    surface: "Salt glaze with slip-trailed cobalt decoration",
    description:
      "Two-gallon crock with a lively cobalt bird perched on a branch, applied ear handles and an impressed capacity mark.",
    status: "available",
    images: [],
    motif: "vessel",
    plate: 0,
    isSample: true,
  },
  {
    id: "pw-005",
    title: "Hooked Rug with Spotted Cat",
    category: "hooked-rugs",
    price: 2400,
    era: "Early 20th century",
    origin: "New England",
    condition: "Very good, mounted for hanging",
    dimensions: '34" × 20"',
    surface: "Wool and cotton on burlap",
    description:
      "A wide-eyed cat sits square in a field of mottled grey, framed by a scalloped border. Strong graphic presence and good clear colour.",
    status: "hold",
    images: [],
    motif: "textile",
    plate: 0,
    isSample: true,
  },
  {
    id: "pw-006",
    title: "Silk-on-Linen Sampler, Wrought by Hannah",
    category: "samplers",
    price: 5600,
    era: "Dated 1823",
    origin: "Essex County, Massachusetts",
    condition: "Excellent, conservation framed",
    dimensions: '17" × 16" sight',
    surface: "Silk on linen ground",
    description:
      "Alphabets over a verse, surmounting a brick house flanked by trees and facing pairs of birds. Signed and dated in the lower register, with strong unfaded colour.",
    status: "available",
    images: [],
    motif: "textile",
    plate: 1,
    featured: true,
    isSample: true,
  },
  {
    id: "pw-007",
    title: "Pine Wall Cupboard in Original Grey-Green",
    category: "furniture",
    price: 7800,
    era: "Late 18th century",
    origin: "New Hampshire",
    condition: "Excellent; replaced thumb latch",
    dimensions: '48" h × 34" w × 14" d',
    surface: "Original grey-green paint, dry and untouched",
    description:
      "A one-door hanging cupboard of great simplicity, with cut-out feet, original H-hinges and a scrubbed interior showing two shelves. The paint is the whole story here.",
    status: "available",
    images: [],
    motif: "furniture",
    plate: 0,
    featured: true,
    isSample: true,
  },
  {
    id: "pw-008",
    title: "Pierced-Tin Pie Safe",
    category: "furniture",
    price: 4950,
    era: "Mid 19th century",
    origin: "Mid-Atlantic",
    condition: "Very good, sound and original",
    dimensions: '42" h × 32" w × 17" d',
    surface: "Old putty-coloured paint",
    description:
      "Two doors and side panels of punched tin worked in a radiating pinwheel pattern, over a single-board top. Retains an old dry surface throughout.",
    status: "available",
    images: [],
    motif: "furniture",
    plate: 1,
    isSample: true,
  },
  {
    id: "pw-009",
    title: "Queen Anne Pewter Porringer",
    category: "pewter",
    price: 890,
    era: "c. 1780",
    origin: "American",
    condition: "Good, light pitting to underside",
    dimensions: '5¼" dia. bowl',
    surface: "Soft grey pewter with old polish",
    description:
      "Cast crown handle on a bellied bowl, with touch marks to the reverse. A good honest example with the soft grey colour that only comes with age.",
    status: "sold",
    images: [],
    motif: "vessel",
    plate: 1,
    isSample: true,
  },
  {
    id: "pw-010",
    title: 'Trade Sign — "BOOTS & SHOES"',
    category: "signs",
    price: 3300,
    era: "Late 19th century",
    origin: "New England",
    condition: "Very good, weathered as found",
    dimensions: '48" × 12"',
    surface: "Original black ground with gilt lettering",
    description:
      "Double-sided pine trade sign with shaded gilt lettering on a black ground, framed by a moulded edge. Weathered evenly on both faces.",
    status: "available",
    images: [],
    motif: "sign",
    isSample: true,
  },
  {
    id: "pw-011",
    title: "Carved & Whitewashed Sheep on Base",
    category: "folk-art",
    price: 2750,
    era: "19th century",
    origin: "American",
    condition: "Excellent",
    dimensions: '14" l × 12" h',
    surface: "Whitewashed carved wood, iron legs",
    description:
      "A stylised standing sheep with a spiral-carved horn, raised on iron legs above a painted rectangular plinth. Wonderful silhouette.",
    status: "available",
    images: [],
    motif: "figure",
    plate: 0,
    isSample: true,
  },
  {
    id: "pw-012",
    title: "Painted Rocking Horse",
    category: "toys",
    price: 1950,
    era: "c. 1880",
    origin: "American",
    condition: "Good, old repair to one rocker",
    dimensions: '32" l × 26" h',
    surface: "Original dapple-grey paint with horsehair tail",
    description:
      "A child's rocking horse retaining its original dapple paint, leather tack and horsehair tail. Worn just where small hands held on.",
    status: "available",
    images: [],
    motif: "figure",
    plate: 1,
    isSample: true,
  },
  {
    id: "pw-013",
    title: "Braided Wool Rug, Oval",
    category: "hooked-rugs",
    price: 1200,
    era: "Early 20th century",
    origin: "New England",
    condition: "Very good, clean",
    dimensions: '72" × 48"',
    surface: "Braided wool in muted naturals",
    description:
      "A generously sized oval braid worked in greys, oxide reds and cream. Soft underfoot and the right scale for a keeping room.",
    status: "available",
    images: [],
    motif: "textile",
    plate: 0,
    isSample: true,
  },
  {
    id: "pw-014",
    title: "Document Box in Original Vinegar Graining",
    category: "painted-smalls",
    price: 1450,
    era: "c. 1830",
    origin: "New England",
    condition: "Excellent, original hardware",
    dimensions: '12" w × 7" d × 6" h',
    surface: "Vinegar-grained decoration over yellow ground",
    description:
      "A dome-top document box with bold vinegar graining laid on in swirls, retaining its original hasp, hinges and wallpaper-lined interior.",
    status: "available",
    images: [],
    motif: "box",
    plate: 1,
    isSample: true,
  },
];

export const bySlug = (id: string) => inventory.find((i) => i.id === id);

export const formatPrice = (price: number | null) =>
  price === null
    ? "Price on request"
    : price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
