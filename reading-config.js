// True Sky Astrology — reading sales configuration
// This is the ONLY place these values should be edited. index.html and
// reading-success.html both load this file.

// Brand block sent with every reading order. The fulfillment worker reads it
// to title the PDF, the email subject and the sender name, so customers who
// buy here receive a True Sky Astrology reading, not a Star Chart 13 one.
const TRUE_SKY_BRAND = {
  id: "true-sky",
  name: "True Sky Astrology",
  readingTitle: "True Sky Natal Reading",
  tagline: "13 Constellations • 13 Houses • Measured Against the Real Sky",
  siteUrl: "https://lezkt1811-maker.github.io/True-Sky-Astrology/",
  pdfFilename: "True-Sky-Astrology-Natal-Reading.pdf",
  miniPdfFilename: "True-Sky-Astrology-Lilith-and-Eve-Reading.pdf",
  // PDF accent color, as 0–1 RGB (deep observatory gold)
  accentRGB: [0.62, 0.48, 0.12]
};

const READING_SALES_CONFIG = {
  price: 25,
  priceDisplay: "$25",

  // Stripe Payment Link for the $25 PDF reading (same link as the original app).
  // Every "Get my reading" button routes here, with the order id appended as
  // client_reference_id so the worker can match the payment to the chart.
  stripePaymentUrl: "https://buy.stripe.com/bJedRb8Yk78ycSsgWOgjC00",

  // $7 Lilith & Eve Placement Reading.
  miniReadingPrice: 7,
  miniReadingPriceDisplay: "$7",
  miniReadingStripeUrl: "https://buy.stripe.com/fZu3cx4I4akK2dO8qigjC01",

  // Cloudflare Worker that stores the chart before checkout and emails the PDF
  // after Stripe confirms payment. Shared with Star Chart 13; it must list this
  // site's origin in ALLOWED_ORIGIN (see README).
  fulfillmentApiBase: "https://starchart13-fulfillment.lezkt1811.workers.dev",

  cashAppCashtag: "$StarFort13",
  cashAppPaymentUrl: "https://cash.app/pay/link/au85j9vj",
  formEndpoint: "https://formspree.io/f/mqedqbqa",
  contactEmail: "katythomas96@yahoo.com",
  affiliateApplicationUrl: "REPLACE_WITH_AFFILIATE_APPLICATION_URL",

  referralStorageKey: "truesky_referral",
  referralDurationDays: 30
};
