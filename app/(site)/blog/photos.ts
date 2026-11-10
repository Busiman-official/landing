// Stock photos for blog cards and post heroes. The markdown posts carry no image of their own, so
// each known slug gets one; any new slug falls back to the default photo.
type BlogPhoto = { src: string; alt: string; pos?: string };

const DEFAULT: BlogPhoto = { src: "/img/ledger-desk.jpg", alt: "A man at home with a calculator and a notebook" };

const BY_SLUG: Record<string, BlogPhoto> = {
  "accounting-vs-cash-flow-why-business-owners-should-know-the-difference": DEFAULT,
  "how-to-manage-a-small-business-effectively-india-2026": {
    src: "/img/shopkeeper-standing.jpg",
    alt: "A shopkeeper standing in his shop",
  },
  "how-to-manage-inventory-effectively-small-business-guide": {
    src: "/img/warehouse-shelves.jpg",
    alt: "Warehouse aisles with boxes on shelves",
  },
};

export function blogPhoto(slug: string, image?: string | null): BlogPhoto {
  if (image) return { src: image, alt: "" };
  return BY_SLUG[slug] ?? DEFAULT;
}
