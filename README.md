# True Sky Astrology

Free 13-sign, 13-house natal charts calculated against the real constellation boundaries of the night sky, with an optional $25 PDF reading.

This site is a rebranded clone of Star Chart 13. The chart engine (planet positions, IAU constellation lookup, 13-house math, wheel drawing, tropical comparison, ecliptic view) is carried over unchanged; only colors, fonts and brand text differ. A side-by-side test of three birth charts produced identical placements, houses and aspects on both sites.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page: hero, birth form, natal wheel, $25 / $7 offers, live ecliptic, constellation table, FAQ |
| `css/base.css` | Original layout rules (colors remapped) |
| `css/true-sky.css` | Observatory theme: midnight + gold palette, shimmering borders, typography, grid background |
| `star-sparkle.js` | Sparse twinkling gold star field |
| `reading-config.js` | **Edit here**: Stripe links, price, fulfillment worker URL, brand block sent with orders |
| `compare.js`, `tropical.js`, `tropical-wheel.js`, `ecliptic-view.js` | Engine helpers (unchanged apart from colors in `compare.js`) |
| `13-sign-astrology.html` | Long-form SEO guide |
| `reading-success.html` | Page Stripe can redirect to after payment |
| `privacy.html`, `manifest.json`, `sw.js`, `robots.txt`, `sitemap.xml`, icons | Supporting files |

## Deploy

**GitHub Pages:** Settings → Pages → Source: *Deploy from a branch* → `main` / root. The site appears at `https://lezkt1811-maker.github.io/True-Sky-Astrology/`.

**Cloudflare Pages:** Create project → connect this repo → framework preset *None*, build command empty, output directory `/`.

All paths are relative, so it works at a sub-path or on a custom domain. If you add a custom domain, update `SITE` URLs in `index.html` (canonical, Open Graph), `robots.txt`, `sitemap.xml` and `reading-config.js`.

## Payments and the PDF reading

Checkout uses the same $25 Stripe Payment Link and the same Cloudflare fulfillment worker as Star Chart 13. Each order now carries `brand: { id: "true-sky" }`, and the worker uses it to title the PDF, the email and the sender name "True Sky Astrology".

Two one-time steps finish the setup:

1. **Merge the worker update** in the StarLight- repo (branch `claude/true-sky-brand`). It adds the brand registry and lets the worker accept requests from this site's origin. Until it's deployed, the "Get my reading" button here can't reach the worker.
2. **Optional: a True Sky redirect.** A Stripe Payment Link has one after-payment URL, currently Star Chart 13's success page. To land True Sky buyers on this site's `reading-success.html`, duplicate the $25 Payment Link in Stripe, set its confirmation page to `https://lezkt1811-maker.github.io/True-Sky-Astrology/reading-success.html?session_id={CHECKOUT_SESSION_ID}`, and paste the new link into `stripePaymentUrl` in `reading-config.js`. The PDF is True Sky–branded either way.
