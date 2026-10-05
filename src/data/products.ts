export type Category =
  | "Navratri"
  | "Bridal"
  | "Kutchi"
  | "Bandhani"
  | "Kids"
  | "Accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameGuj: string;
  category: Category;
  price: number;
  compareAt?: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: string;
  fabric: string;
  work: string;
  flare: string;
  rating: number;
  reviews: number;
  description: string;
  details: string[];
  care: string;
  featured?: boolean;
};

/** Pexels CDN helper — every id below was verified to return HTTP 200. */
const px = (id: number, w = 900, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${
    h ? `&h=${h}&fit=crop` : ""
  }`;

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const CATEGORIES: Category[] = [
  "Navratri",
  "Bridal",
  "Kutchi",
  "Bandhani",
  "Kids",
  "Accessories",
];

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "ras-lehar-mirror-chaniya",
    name: "Rās Lehar Mirror Chaniya",
    nameGuj: "રાસ લહેર",
    category: "Navratri",
    price: 4890,
    compareAt: 6299,
    images: [px(38103711, 900, 1200), px(29873545, 900, 1200), px(17657560, 900, 1200), px(14088974, 900, 1200)],
    colors: [
      { name: "Marigold", hex: "#f08a1d" },
      { name: "Vermilion", hex: "#c2312a" },
      { name: "Indigo", hex: "#1e2a5a" },
    ],
    sizes: APPAREL_SIZES,
    badge: "Bestseller",
    fabric: "Heavy cotton silk with cotton lining",
    work: "Hand-stitched abhla mirror work, chain-stitch borders",
    flare: "12 metre flare",
    rating: 4.9,
    reviews: 312,
    description:
      "The chaniya our whole Navratri rack is built around. Twelve metres of cotton silk cut in panels so the flare opens like a full circle on every clap, then finished with real glass abhla mirrors sewn by hand in Bhuj.",
    details: [
      "12-metre flare with soft can-can lining",
      "Real glass mirror (abhla) hand-stitched across the panels",
      "Matching choli and bandhani dupatta included",
      "Drawstring waist with gota tie, fits XS–XXL",
    ],
    care: "Dry clean only. Store folded in muslin, away from direct sun.",
    featured: true,
  },
  {
    id: "p02",
    slug: "panetar-resham-bridal-set",
    name: "Panetar Resham Bridal Set",
    nameGuj: "પાણેટર",
    category: "Bridal",
    price: 12990,
    compareAt: 15999,
    images: [px(39538072, 900, 1200), px(36489477, 900, 1200), px(6145287, 900, 1200), px(7123307, 900, 1200)],
    colors: [
      { name: "Panetar Red", hex: "#b3211f" },
      { name: "Ivory White", hex: "#f3ead9" },
    ],
    sizes: APPAREL_SIZES,
    badge: "Bridal",
    fabric: "Pure raw silk, silk lining",
    work: "Zari resham embroidery, kundan appliqué",
    flare: "14 metre flare",
    rating: 4.9,
    reviews: 84,
    description:
      "The red-and-white panetar every Gujarati bride comes home in. We hand-draw the resham vines before the zari goes on, so no two sets carry the exact same flourish — yours is signed by the karigar who stitched it.",
    details: [
      "14-metre flare with structured can-can",
      "Zari resham vines with kundan appliqué on the border",
      "Nine-yard drape styled as a seedha pallu dupatta",
      "Blouse stitched to your measurements — send them after ordering",
    ],
    care: "Dry clean only. Wrap in muslin between wears.",
    featured: true,
  },
  {
    id: "p03",
    slug: "kutchi-abhla-chaniya",
    name: "Kutchi Abhla Bharat Chaniya",
    nameGuj: "કચ્છી અભ્લા ભરત",
    category: "Kutchi",
    price: 5450,
    images: [px(17185630, 900, 1200), px(17040982, 900, 1200), px(35704995, 900, 1200), px(16544380, 900, 1200)],
    colors: [
      { name: "Rani Pink", hex: "#d31e5c" },
      { name: "Peacock", hex: "#0d5c4f" },
      { name: "Marigold", hex: "#f08a1d" },
    ],
    sizes: APPAREL_SIZES,
    badge: "New",
    fabric: "Handloom cotton with cotton lining",
    work: "Abhla bharat, pakko embroidery, cowrie edging",
    flare: "10 metre flare",
    rating: 4.8,
    reviews: 126,
    description:
      "A love letter to Kutch. Our karigars lay three hundred mirrors in geometric fields, then lock each one down with pakko stitches so they survive a full season of garba floor friction — mirrors down, hands up.",
    details: [
      "300+ real mirrors laid by hand",
      "Cowrie shell edging on the border",
      "Handloom cotton that breathes through nine nights",
      "Matching choli and odhani included",
    ],
    care: "Gentle dry clean. Do not wring the mirror work.",
    featured: true,
  },
  {
    id: "p04",
    slug: "gharchola-zari-silk",
    name: "Gharchola Zari Silk Chaniya",
    nameGuj: "ઘાંચિલા ઝરી",
    category: "Bridal",
    price: 9750,
    images: [px(36721897, 900, 1200), px(33101418, 900, 1200), px(35533303, 900, 1200), px(19345932, 900, 1200)],
    colors: [
      { name: "Bridal Red", hex: "#a51f24" },
      { name: "Maroon", hex: "#5e1220" },
    ],
    sizes: APPAREL_SIZES,
    fabric: "Gajji silk with silk blend lining",
    work: "Zari grid, dabka and mirror panels",
    flare: "12 metre flare",
    rating: 4.8,
    reviews: 97,
    description:
      "The classic gharchola grid — ten squares of zari woven across red gajji silk, each one holding a motif borrowed from a wedding sari. Heavy enough for the pheras, light enough to dance in after.",
    details: [
      "Traditional ten-square zari grid",
      "Dabka and mirror panels on the border",
      "Semi-stitched blouse with margin for alterations",
      "Can-can lining for a structured fall",
    ],
    care: "Dry clean only. Steam on low, never iron directly on zari.",
    featured: true,
  },
  {
    id: "p05",
    slug: "bandhani-leheriya-twirl",
    name: "Bandhani Leheriya Twirl",
    nameGuj: "બાંધણી લહેરિયા",
    category: "Bandhani",
    price: 3990,
    compareAt: 4999,
    images: [px(16803130, 900, 1200), px(34107818, 900, 1200), px(38563366, 900, 1200), px(13031908, 900, 1200)],
    colors: [
      { name: "Rani Pink", hex: "#d31e5c" },
      { name: "Sunset Orange", hex: "#e0651c" },
      { name: "Indigo", hex: "#1e2a5a" },
    ],
    sizes: APPAREL_SIZES,
    badge: "Bestseller",
    fabric: "Georgette with satin lining",
    work: "Hand-tied bandhani, leheriya wave tie",
    flare: "10 metre flare",
    rating: 4.7,
    reviews: 241,
    description:
      "Tied in thousands of knots by hand, then dipped so the white dots bloom out of the colour. The leheriya wave runs diagonally across the flare so it ripples when you turn — the whole point of a twirl.",
    details: [
      "Hand-tied bandhani — every dot is a knot",
      "Diagonal leheriya wave across the flare",
      "Featherweight georgette, easy to dance in",
      "Matching choli and tie-dye dupatta",
    ],
    care: "First wash: cold hand wash separately. Then dry clean.",
    featured: true,
  },
  {
    id: "p06",
    slug: "gota-patti-haldi-chaniya",
    name: "Gota Patti Haldi Chaniya",
    nameGuj: "ગોટા પત્તી",
    category: "Navratri",
    price: 4250,
    images: [px(36818407, 900, 1200), px(33959035, 900, 1200), px(37903241, 900, 1200), px(13238145, 900, 1200)],
    colors: [
      { name: "Haldi Yellow", hex: "#e8b63a" },
      { name: "Leaf Green", hex: "#3c7a4a" },
    ],
    sizes: APPAREL_SIZES,
    fabric: "Mashru cotton with cotton lining",
    work: "Hand-cut gota patti flowers, kinari border",
    flare: "11 metre flare",
    rating: 4.7,
    reviews: 158,
    description:
      "Gota ribbons cut into petals and laid down one at a time — a Rajasthani trick that catches torchlight like nothing else. Built for the haldi, the day functions and the last night of Navratri.",
    details: [
      "Hand-cut gota patti florals",
      "Kinari border along the full flare",
      "Mashru cotton — silk touch, cotton back",
      "Matching choli and gota-edged dupatta",
    ],
    care: "Dry clean only. Hang on a padded hanger.",
    featured: true,
  },
  {
    id: "p07",
    slug: "morni-motif-chaniya",
    name: "Morni Motif Chaniya",
    nameGuj: "મોરની ચોળી",
    category: "Kutchi",
    price: 6150,
    images: [px(33959042, 900, 1200), px(33959037, 900, 1200), px(39812195, 900, 1200), px(31446115, 900, 1200)],
    colors: [
      { name: "Peacock", hex: "#0d5c4f" },
      { name: "Rani Pink", hex: "#d31e5c" },
    ],
    sizes: APPAREL_SIZES,
    fabric: "Viscose rayon with cotton lining",
    work: "Morni (peacock) patch panels, mirror scatter",
    flare: "12 metre flare",
    rating: 4.8,
    reviews: 73,
    description:
      "The morni has been stitched into Gujarati chaniya for two hundred years — tail curled, crest raised. Ours runs the motif along the border in patch panels with a scatter of mirrors above it.",
    details: [
      "Traditional morni patch panels",
      "Mirror scatter across the kalidar panels",
      "Heavy viscose rayon with a clean fall",
      "Matching choli and dupatta included",
    ],
    care: "Gentle dry clean.",
  },
  {
    id: "p08",
    slug: "mehendi-resham-chaniya",
    name: "Mehendi Resham Chaniya",
    nameGuj: "મેહંદી રેસમ",
    category: "Navratri",
    price: 5850,
    images: [px(14048788, 900, 1200), px(38761340, 900, 1200), px(31135690, 900, 1200), px(15123420, 900, 1200)],
    colors: [
      { name: "Mehendi Maroon", hex: "#6d1f2b" },
      { name: "Wine", hex: "#4a1225" },
    ],
    sizes: APPAREL_SIZES,
    badge: "Only 4 left",
    fabric: "Butter silk with crepe lining",
    work: "Resham threadwork, sequin trail",
    flare: "11 metre flare",
    rating: 4.6,
    reviews: 64,
    description:
      "Deep maroon butter silk with resham vines climbing the panels — the colour of mehendi two days after the wedding. Our most photographed chaniya two seasons running.",
    details: [
      "Resham threadwork with a sequin trail",
      "Butter silk that holds the flare shape",
      "Concealed side zip with drawstring backup",
      "Matching choli and dupatta",
    ],
    care: "Dry clean only.",
  },
  {
    id: "p09",
    slug: "chandni-raat-chaniya",
    name: "Chandni Raat Chaniya",
    nameGuj: "ચાંદની રાત",
    category: "Bandhani",
    price: 6150,
    images: [px(35635695, 900, 1200), px(37396070, 900, 1200), px(17611651, 900, 1200), px(16651974, 900, 1200)],
    colors: [
      { name: "Moonlight Ivory", hex: "#efe7d6" },
      { name: "Silver Grey", hex: "#9aa0a6" },
    ],
    sizes: APPAREL_SIZES,
    badge: "New",
    fabric: "Organza with satin lining",
    work: "Silver dabka, pearl scatter, thread bandhani",
    flare: "12 metre flare",
    rating: 4.8,
    reviews: 41,
    description:
      "Organza washed until it falls soft, then dusted with silver dabka and pearls so it reads like moonlight on the floor. For the nights you want to be the quietest, brightest person in the circle.",
    details: [
      "Silver dabka and pearl scatter",
      "Sheer organza over satin — no sheerness at the flare",
      "12-metre flare with can-can",
      "Matching choli and pearl-edged dupatta",
    ],
    care: "Dry clean only. Store flat.",
  },
  {
    id: "p10",
    slug: "little-garbani-kids-set",
    name: "Little Garba'ni Kids Set",
    nameGuj: "નાની ગરબાની",
    category: "Kids",
    price: 1899,
    compareAt: 2499,
    images: [px(18983062, 900, 1200), px(18983060, 900, 1200), px(18983063, 900, 1200), px(18983041, 900, 1200)],
    colors: [
      { name: "Marigold", hex: "#f08a1d" },
      { name: "Parrot Green", hex: "#6fae43" },
    ],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    badge: "New",
    fabric: "Soft cotton with cotton lining",
    work: "Light mirror work, pom-pom border",
    flare: "6 metre flare",
    rating: 4.9,
    reviews: 58,
    description:
      "Same twelve-panel construction as ours, sized for a four-year-old who will not stop twirling. Soft cotton, light mirrors, pom-pom border — and it survives the washing machine.",
    details: [
      "6-metre flare sized for kids",
      "Lightweight mirrors — no scratchy edges",
      "Soft cotton throughout, no lining itch",
      "Elastic waist with drawstring",
    ],
    care: "Machine wash cold, gentle cycle. Line dry.",
  },
  {
    id: "p11",
    slug: "oxidised-jhumka",
    name: "Oxidised Chaand Jhumka",
    nameGuj: "ચાંદ ઝુમકા",
    category: "Accessories",
    price: 1299,
    images: [px(13645597, 900, 1200), px(18285407, 900, 1200), px(37601638, 900, 1200)],
    colors: [{ name: "Oxidised Silver", hex: "#8f8f96" }],
    sizes: ["One size"],
    fabric: "Oxidised brass",
    work: "Hand-set mirror drops, filigree dome",
    flare: "—",
    rating: 4.7,
    reviews: 189,
    description:
      "Oxidised brass jhumkas big enough to hear across the garba ground, with mirror drops that swing with every clap. Light on the ear despite the size.",
    details: [
      "Oxidised brass, anti-tarnish coat",
      "Mirror drops with silicone backings",
      "Weight: 22 g per pair",
      "Comes in a cloth box",
    ],
    care: "Keep dry. Wipe with a soft cloth after wear.",
  },
  {
    id: "p12",
    slug: "kutchi-heer-necklace",
    name: "Kutchi Heer Necklace Set",
    nameGuj: "કચ્છી હીર",
    category: "Accessories",
    price: 2150,
    images: [px(6924038, 900, 1200), px(29415954, 900, 1200), px(37601639, 900, 1200)],
    colors: [
      { name: "Antique Gold", hex: "#b8912f" },
      { name: "Oxidised Silver", hex: "#8f8f96" },
    ],
    sizes: ["One size"],
    fabric: "Gold-plated brass with semi-precious stones",
    work: "Mirror inlay, kundan setting",
    flare: "—",
    rating: 4.8,
    reviews: 77,
    description:
      "A bib-style heer set with mirror inlay and kundan setting — the kind of piece that turns a plain choli into a bridal look. Adjustable back chain included.",
    details: [
      "Necklace + earring set",
      "Mirror inlay with kundan setting",
      "Adjustable 2-inch back chain",
      "Anti-allergy plating",
    ],
    care: "Store in the pouch provided. Avoid perfume contact.",
  },
];

export function getProduct(slug?: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 4) {
  const sameCat = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const rest = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCat, ...rest].slice(0, limit);
}
