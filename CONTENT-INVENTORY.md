# Pewter & Wood Antiques — full content extraction

Everything pulled from **pewterandwoodantiques.com** (WordPress) and the linked
**Dig Antiques** dealer profile, on 27 July 2026.

Raw originals are in `raw/` — `pages.json` (WP REST API), `media_1.json`, and
`raw/images/` (all 16 source files, untouched).

---

## 1. Business facts

| Field | Value | Source |
|---|---|---|
| Business | Pewter & Wood Antiques | site |
| Proprietor | Barbara Boardman Johnson | About page |
| Tagline | 18th & 19th Century American Antiques | masthead |
| In business | 36 years | Dig Antiques profile |
| Founded | 1991 (Scottsdale, AZ) | About page |
| Email | info@pewterandwoodantiques.com | Contact page |
| Alt email | barbara.jpw@gmail.com | Dig Antiques profile |
| Cell | 602-677-5686 | Contact page |
| NH shop phone | 603-632-9822 | Contact page |
| Memberships | NHADA, VADA | About page |

**Two seasonal shops**

- **Enfield, New Hampshire** — May–October. Just off Route 4A on Crystal Lake.
- **Cave Creek, Arizona** — November–April. A mile north of the centre of Cave Creek,
  35 minutes north of Phoenix Sky Harbor.
- Both **by chance or appointment**. "When traveling, feel free to give us a call.
  We will gladly open for you."

**Specialties** (verbatim list): country furniture, painted smalls, folk art, textiles,
hooked rugs, braided rugs, samplers, stoneware, toys, game boards, signs, pewter,
decorative accessories. Emphasis throughout on **original first-surface paint**.

---

## 2. Pages captured

All five pages of body copy were extracted in full and now live in
`app/src/data/site.ts`. Nothing was paraphrased.

| Page | Words | Where it went in the new app |
|---|---|---|
| Home | ~130 | Home hero + "What we look for" + seasons |
| About | ~230 | `/about` — full text, plus a milestone timeline |
| Shows | ~45 | `/shows` — presented as a past schedule (see §4) |
| Contact | ~250 | `/contact` — contact blocks + full Terms of Sale |
| Catalog | 7 | *"We will be updating our catalog soon!"* — see §4 |
| Alzheimer's Benefit | 8 | `/contact` — "to be announced" |

---

## 3. Images captured — all 16

Every image on the site was downloaded, then optimised into `app/public/img/`
(WebP for photos, PNG for logos and line art).

**Usable photography (9)**

| File | Original | Used for |
|---|---|---|
| `Pewter-Wood-Header2.png` | 700×212 | **Split into 3 hero plates** (see note) |
| `NH_shop_boxes.jpg` | 720×960 | Gallery — pierced-tin pie safe |
| `NH_shop_dog.jpg` | 649×904 | Home "proprietor" section, gallery |
| `NH-shop-dolls.jpg` | 670×838 | Gallery |
| `nh_shop_chickens.jpg` | 476×912 | NH shop card, About header |
| `pewter-and-wood-show.jpg` | 1000×750 | Shows page header |
| `antique-show.jpg` | 700×525 | Gallery |
| `arizona_cactus.jpg` | 1024×765 | About page, gallery |
| `az-showroom.jpg` | 225×300 | AZ shop card — **low resolution** |

> **The masthead was the single best asset on the site.** It is a triptych of three
> real pieces — a gilded copper running-horse weathervane, a stack of Shaker pantry
> boxes in original sage / oxide / shaker-blue paint, and a carved whitewashed sheep.
> I detected the panel boundaries programmatically (x≈249 and x≈459) and cut it into
> three separate hero images. The whole colour palette of the new site is sampled
> from these three photographs.

**Logos & marks (4)** — `Pewterandwood-pineapple-logo.jpg` (66×106), 
`Pewterandwood-pineapple-fav-sq.jpg` (106×106, now the favicon and site mark), 
`NHADA-logo.gif`, `VADA_logo.jpg`.

**Too small to use (3)** — `newhampshire.jpg` (141×188), `arizona.jpg` (140×186),
`pewterandwood-favicon.gif` (32×32).

---

## 4. Gaps found — things that need the client

These are the honest holes in the source material. Nothing here was invented to
paper over them.

1. **There is no inventory anywhere.** The Catalog page says only *"We will be
   updating our catalog soon!"*, and the linked Dig Antiques shop returns
   *"This shop hasn't listed any items yet."* There are **zero product photographs**
   on the site — every image is a room shot, a logo, or scenery.
   → The new catalogue ships with 14 clearly-badged **sample listings** so the
   search, filtering and inquiry flows can be demonstrated. Replacing them is one
   file: `app/src/data/inventory.ts`.

2. **The Shows page is seven years stale.** Its most recent entry is December 2019.
   → Rather than publish stale dates as if current, `/shows` presents them as
   "most recent schedule" with a visible note, and separately lists the two annual
   fixtures Barbara names on Dig Antiques (NHADA in August, Rhinebeck in May &
   October).

3. **The Alzheimer's Benefit page has no content** beyond "to be announced."
   → Folded into `/contact` with a note-me-when-dates-are-set action.

4. **No street addresses**, only descriptive directions ("just off Route 4A on
   Crystal Lake"). The site says to call for directions.
   → No map is shown, because plotting a guessed pin would be worse than none.

5. **Photography is dated** — EXIF shows an iPad 2 and a Canon PowerShot A95,
   shot 2007–2013. Several are under 300px on a side.
   → New photography is the highest-value thing the client could supply.

6. **Two different email addresses** are published (`info@…` on the site,
   `barbara.jpw@gmail.com` on Dig Antiques). The site address is used throughout;
   worth confirming which she actually reads.

---

## 5. What changed from the reference mockup

The design brief was an antiques shopping app with **Add to Cart / Order now**.
That flow contradicts this dealer's own published terms, so it was replaced:

> *"We accept checks and money orders. Items will be shipped promptly upon
> receiving payment and check clearance."*

There is no card processing, no cart, and the shops are open by appointment. So
item pages offer **Inquire about this piece**, **Request more photographs**, and
**Ask for a hold** — all composing a pre-filled email to Barbara, matching how she
already tells customers to reach her ("contact us for additional photos"). The data
model is structured so real checkout could be added later without a rewrite.
