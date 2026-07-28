/**
 * Every word and image here is taken from the client's existing site
 * (pewterandwoodantiques.com) and their Dig Antiques dealer profile.
 * Nothing in this file is invented — sample catalogue listings live
 * separately in `inventory.ts` and are badged as samples in the UI.
 */

export const business = {
  name: "Pewter & Wood",
  fullName: "Pewter & Wood Antiques",
  proprietor: "Barbara Boardman Johnson",
  tagline: "18th & 19th Century American Antiques",
  /** From the Dig Antiques dealer profile. */
  established: "In business for 36 years",
  founded: 1991,
  email: "info@pewterandwoodantiques.com",
  /** Second address listed on the Dig Antiques profile. */
  altEmail: "barbara.jpw@gmail.com",
  cell: "602-677-5686",
  website: "https://www.pewterandwoodantiques.com",
} as const;

export const homeIntro = {
  lede: "We specialize in 18th and 19th C. American Antiques with emphasis on original first surface paint.",
  body: "Country furniture, painted smalls, folk art, textiles, hooked rugs, braided rugs, samplers, stoneware, toys, game boards, signs, pewter and decorative accessories are among the items that we love. Inventory is constantly changing. We hope you visit our site often.",
  seasons:
    "We are located in both Enfield, New Hampshire and Cave Creek, Arizona. The New Hampshire shop is open May – October and Arizona is open November – April. Both are by chance or appointment. When traveling, feel free to give us a call. We will gladly open for you.",
} as const;

/** The specialties named on the home page, used as catalogue filters. */
export const categories = [
  { slug: "furniture", label: "Country Furniture", accent: "oxide" },
  { slug: "painted-smalls", label: "Painted Smalls", accent: "sage" },
  { slug: "folk-art", label: "Folk Art", accent: "gilt" },
  { slug: "textiles", label: "Textiles", accent: "shaker" },
  { slug: "hooked-rugs", label: "Hooked & Braided Rugs", accent: "oxide" },
  { slug: "samplers", label: "Samplers", accent: "sage" },
  { slug: "stoneware", label: "Stoneware", accent: "shaker" },
  { slug: "toys", label: "Toys", accent: "gilt" },
  { slug: "game-boards", label: "Game Boards", accent: "oxide" },
  { slug: "signs", label: "Signs", accent: "sage" },
  { slug: "pewter", label: "Pewter", accent: "shaker" },
  { slug: "accessories", label: "Decorative Accessories", accent: "gilt" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const locations = [
  {
    id: "nh",
    city: "Enfield",
    state: "New Hampshire",
    stateShort: "NH",
    season: "May – October",
    seasonNote: "Summer & fall",
    months: [5, 6, 7, 8, 9, 10],
    directions:
      "During summer and fall (May – October), we are just off Route 4A on Crystal Lake in Enfield, New Hampshire.",
    phones: [
      { label: "Shop", number: "603-632-9822" },
      { label: "Cell", number: "602-677-5686" },
    ],
    image: "/img/nh_shop_chickens.webp",
    imageAlt:
      "The New Hampshire shop interior, with painted country furniture and carved chickens on a shelf.",
    accent: "sage",
  },
  {
    id: "az",
    city: "Cave Creek",
    state: "Arizona",
    stateShort: "AZ",
    season: "November – April",
    seasonNote: "Winter & spring",
    months: [11, 12, 1, 2, 3, 4],
    directions:
      "In winter and spring (November – May), we are just over a mile north of the center of Cave Creek, Arizona (35 minutes north of the Phoenix Sky Harbor Airport).",
    phones: [{ label: "Cell", number: "602-677-5686" }],
    image: "/img/az-showroom.webp",
    imageAlt: "The Arizona showroom, stocked with early American country pieces.",
    accent: "oxide",
  },
] as const;

export const hoursNote =
  "Shop hours in both locations are by appointment or by chance. Please call for directions.";

/** Barbara's story, from the About page. */
export const story = {
  paragraphs: [
    "I grew up in Connecticut where my parents introduced me to collecting antiques as a child. We spent many weekends traveling the backroads searching for antiques.",
    "In 1970 I moved to Vermont to go to college and I became very interested in country furniture and accessories. Weekends while teaching, I was drawn to country auctions.",
    "After moving to Arizona in 1982, I opened an antique shop in part of my house and began exhibiting at shows around the southwest. Traveling back to New England several times a year, I brought truckloads of country pieces to Arizona.",
    "In 1991, Pewter & Wood opened in Scottsdale, AZ.",
  ],
  locationsHeading: "Locations in Arizona and New Hampshire",
  locationParagraphs: [
    "In 2001, Pewter & Wood opened a second location in Enfield, New Hampshire. In 2004, the Scottsdale shop moved to Cave Creek, AZ.",
    "Both shops are stocked with 18th and 19th c. American antiques, with emphasis on original, first surface paint. Pewter & Wood continues to exhibit at shows on the East Coast.",
    "We would love to share the desert with you November through April in Cave Creek, Arizona. From May through October please visit us on Crystal Lake, in Enfield, New Hampshire. Contact us for directions.",
  ],
  /** Milestones derived from the dates Barbara gives in her own account. */
  timeline: [
    { year: "1970", text: "Moves to Vermont for college; falls for country furniture." },
    { year: "1982", text: "Moves to Arizona and opens a shop in part of her house." },
    { year: "1991", text: "Pewter & Wood opens in Scottsdale, Arizona." },
    { year: "2001", text: "A second shop opens in Enfield, New Hampshire." },
    { year: "2004", text: "The Scottsdale shop moves to Cave Creek." },
  ],
} as const;

export const associations = [
  {
    name: "New Hampshire Antique Dealers Association",
    short: "NHADA",
    logo: "/img/NHADA-logo.png",
  },
  {
    name: "Vermont Antique Dealers Association",
    short: "VADA",
    logo: "/img/VADA_logo.png",
  },
] as const;

/**
 * The show list exactly as published on the client's Shows page.
 * NOTE: the live site has not been updated since 2019, so these are
 * presented as past appearances rather than upcoming dates.
 */
export const shows = [
  {
    dates: "October 4–5, 2019",
    name: "Okemo Antiques Show",
    venue: "Okemo Mountain Resort",
    place: "Ludlow, VT",
  },
  {
    dates: "October 12–13, 2019",
    name: "Barn Star's Antiques At Rhinebeck",
    venue: "Dutchess County Fairgrounds, 6550 Spring Brook Ave. / Route 9",
    place: "Rhinebeck, NY",
  },
  {
    dates: "November 4, 2019",
    name: "Enfield, NH shop closes",
    venue: "Reopens May 2020",
    place: "Enfield, NH",
  },
  {
    dates: "December 6, 2019",
    name: "Cave Creek, AZ shop opens",
    venue: "",
    place: "Cave Creek, AZ",
  },
] as const;

/** Shows Barbara names as regular fixtures on her Dig Antiques profile. */
export const regularShows = [
  { name: "New Hampshire Antique Dealers Association Show", when: "August" },
  { name: "Rhinebeck Antique Shows", when: "May & October" },
] as const;

export const termsOfSale = {
  guarantee:
    "All items are sold with a full satisfaction guarantee and a 48 hour right to return.",
  items: [
    {
      heading: "Payment",
      body: "We accept checks and money orders. Items will be shipped promptly upon receiving payment and check clearance.",
    },
    {
      heading: "Shipping",
      body: "We ship via Fed Ex, UPS and Priority Mail. All items will be insured for their value. Arrangements for shipping furniture can be made with a mutually agreed upon carrier. All shipping and insurance costs are paid by the buyer.",
    },
    {
      heading: "Refunds",
      body: "Refunds are in full, minus outbound shipping and insurance. Returns are at buyer's expense: shipping and insurance. Also items must be in the same condition as when sold. Refunds will be sent upon receipt of item and inspection.",
    },
    {
      heading: "Damage in transit",
      body: "Should an item arrive damaged, contact us immediately by e-mail at info@pewterandwoodantiques.com.",
    },
  ],
} as const;

export const benefit = {
  title: "Alzheimer's Benefit",
  status: "Plans for Alzheimer's Benefit are to be announced.",
  context:
    "Pewter & Wood has hosted an annual silent auction to benefit Alzheimer's research.",
} as const;

/**
 * Real photographs of pieces and rooms, lifted from the client's site.
 * The three "plate" images are cropped from their own masthead.
 */
export const gallery = [
  {
    src: "/img/hero-weathervane.png",
    title: "Running horse weathervane",
    note: "Gilded copper, mounted on a rod and plinth.",
    tall: false,
  },
  {
    src: "/img/hero-boxes.png",
    title: "Stacked pantry boxes",
    note: "Original paint in sage, shaker blue and oxide red.",
    tall: false,
  },
  {
    src: "/img/hero-sheep.png",
    title: "Carved sheep",
    note: "Whitewashed carving on a painted base.",
    tall: false,
  },
  {
    src: "/img/NH_shop_boxes.webp",
    title: "Pierced-tin pie safe",
    note: "New Hampshire shop, with pantry boxes and a painted firkin.",
    tall: true,
  },
  {
    src: "/img/NH-shop-dolls.webp",
    title: "Dolls & smalls",
    note: "A corner of the Enfield shop.",
    tall: true,
  },
  {
    src: "/img/NH_shop_dog.webp",
    title: "Shop dog",
    note: "Keeping watch in Enfield.",
    tall: true,
  },
  {
    src: "/img/nh_shop_chickens.webp",
    title: "Carved chickens",
    note: "Folk carvings on a painted shelf.",
    tall: true,
  },
  {
    src: "/img/pewter-and-wood-show.webp",
    title: "Pewter & Wood at show",
    note: "A booth set on the East Coast circuit.",
    tall: false,
  },
  {
    src: "/img/antique-show.webp",
    title: "On the show floor",
    note: "Exhibiting in New England.",
    tall: false,
  },
  {
    src: "/img/az-showroom.webp",
    title: "The Arizona showroom",
    note: "Cave Creek, open November through April.",
    tall: true,
  },
  {
    src: "/img/arizona_cactus.webp",
    title: "Cave Creek",
    note: "The desert around the Arizona shop.",
    tall: false,
  },
] as const;

export const nav = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/visit", label: "Visit" },
  { to: "/shows", label: "Shows" },
  { to: "/contact", label: "Contact" },
] as const;
