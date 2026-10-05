export const SITE = {
  name: "MANSI CHANIYACHOLI",
  shortName: "MANSI",
  nameGuj: "માનસી ચણિયાચોળી",
  tagline: "The Chaniya Choli House",
  email: "hello@mansichaniyacholi.in",
  phone: "+91 79 4000 1234",
  address: "12, Lane 3, Law Garden, Ahmedabad 380006",
  freeShippingThreshold: 2999,
};

export const ANNOUNCEMENTS = [
  "Navratri Drop 01 — live now",
  "Free India-wide shipping over ₹2,999",
  "Hand-finished in Bhuj, Kutch",
  "7-day size exchange, no questions",
  "COD available across India",
];

export const NAV_LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/#collections" },
  { label: "The Craft", to: "/#craft" },
  { label: "Lookbook", to: "/#lookbook" },
  { label: "Voices", to: "/#voices" },
];

/** Pexels CDN helper — every id in this file was verified to return HTTP 200. */
const px = (id: number, w = 900, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${
    h ? `&h=${h}&fit=crop` : ""
  }`;

export const COLLECTIONS = [
  {
    title: "The Garba Floor",
    titleGuj: "ગરબા",
    copy: "Twelve-metre flares, real mirrors, cotton that breathes. Built for nine nights of clapping.",
    image: px(16651964, 1000, 1250),
    filter: "Navratri",
    count: "42 pieces",
  },
  {
    title: "Panetar & Bridal",
    titleGuj: "પાણેટર",
    copy: "Red gajji, zari grids and resham vines for the weddings that start at sunrise.",
    image: px(39538071, 1000, 1250),
    filter: "Bridal",
    count: "18 pieces",
  },
  {
    title: "Kutchi Abhla",
    titleGuj: "કચ્છી ભરત",
    copy: "Three hundred mirrors a chaniya, laid by hands that have done it for decades.",
    image: px(36634905, 1000, 1250),
    filter: "Kutchi",
    count: "26 pieces",
  },
];

export const STATS = [
  { value: 42, suffix: "", label: "Karigars on the floor" },
  { value: 312, suffix: "+", label: "Mirrors per chaniya" },
  { value: 12, suffix: "m", label: "Flare, edge to edge" },
  { value: 9, suffix: "", label: "Nights, one wardrobe" },
];

export const PROCESS = [
  {
    step: "01",
    title: "Cloth first",
    copy: "Gajji, mashru and handloom cotton bought from the same three mills in Surat since 2016.",
  },
  {
    step: "02",
    title: "Hands next",
    copy: "Mirrors laid, gota cut and bandhani tied by karigars in Bhuj and Ahmedabad — paid per piece, never per hour.",
  },
  {
    step: "03",
    title: "Then you",
    copy: "Checked, pressed and dispatched within 48 hours, with your blouse stitched to the measurements you send us.",
  },
];

export const LOOKBOOK = [
  { image: px(35441226, 1100, 1400), caption: "Second fitting, studio 2", tag: "Editorial" },
  { image: px(28867973, 1100, 1400), caption: "Gold hour, lakeside", tag: "Editorial" },
  { image: px(13156196, 1100, 1400), caption: "Between rounds, off duty", tag: "Navratri" },
  { image: px(13156202, 1100, 1400), caption: "Last light, old walls", tag: "Editorial" },
  { image: px(13031909, 1100, 1400), caption: "Fittings, side by side", tag: "Bridal" },
  { image: px(35441227, 1100, 1400), caption: "Mirror hour", tag: "Editorial" },
  { image: px(13661847, 1100, 1400), caption: "Jewels on, dupatta up", tag: "Accessories" },
  { image: px(34345410, 1100, 1400), caption: "The morning of", tag: "Bridal" },
  { image: px(12747874, 1100, 1400), caption: "Red, head to toe", tag: "Bridal" },
  { image: px(19764053, 1100, 1400), caption: "Quiet before the circle", tag: "Bandhani" },
  { image: px(13584939, 1100, 1400), caption: "Studio red", tag: "Bandhani" },
  { image: px(34010355, 1100, 1400), caption: "Colour outdoors", tag: "Kutchi" },
  { image: px(5814060, 1100, 1400), caption: "Ornament hour", tag: "Editorial" },
  { image: px(30780472, 1100, 1400), caption: "Bridal, hour one", tag: "Bridal" },
  { image: px(30809484, 1100, 1400), caption: "Red and gold, close", tag: "Bridal" },
  { image: px(13031904, 1100, 1400), caption: "Veil, then the floor", tag: "Editorial" },
  { image: px(35273891, 1100, 1400), caption: "Embroidery at dusk", tag: "Bridal" },
  { image: px(35274725, 1100, 1400), caption: "Shimmer at last light", tag: "Editorial" },
  { image: px(35441229, 1100, 1400), caption: "Studio 4, Lucknow", tag: "Editorial" },
  { image: px(35273897, 1100, 1400), caption: "Garden, off duty", tag: "Kutchi" },
];

export type Muse = { image: string; alt: string };

const muse = (id: number, alt: string, w = 640, h = 800): Muse => ({
  image: px(id, w, h),
  alt,
});

/** Front-page photo wall — two scrolling rows of looks. */
export const MUSE_ROW_A: Muse[] = [
  muse(38220477, "Woman posing in vibrant traditional Indian attire"),
  muse(38526708, "Woman in traditional Indian dress against a rustic wall"),
  muse(38526710, "Woman in elaborate traditional dress posing outdoors"),
  muse(39943165, "Woman in traditional attire at a heritage site"),
  muse(33363057, "Portrait of a woman in traditional Indian dress indoors"),
  muse(38526714, "Woman posing elegantly outside in traditional clothing"),
  muse(38876952, "Woman in traditional Indian dress with an elaborate hairstyle"),
  muse(39767526, "Young woman posing outdoors in traditional Indian attire"),
  muse(38158805, "Bride in a red bridal lehenga with traditional jewellery"),
  muse(35395103, "Woman posing with traditional jewellery in soft light"),
  muse(17499714, "Portrait of a young Indian woman in traditional attire and jewellery"),
  muse(7791457, "Bride in traditional Indian attire with intricate jewellery"),
  muse(33088110, "Bride in a vibrant lehenga posing gracefully indoors"),
  muse(13031895, "Portrait of a woman in traditional Indian attire with intricate patterns"),
];

export const MUSE_ROW_B: Muse[] = [
  muse(29873544, "Portrait of a woman in a vibrant Indian lehenga with a black dupatta"),
  muse(35531042, "Studio portrait of a woman in traditional attire"),
  muse(19664441, "Woman in a traditional saree modelling outdoors"),
  muse(33787504, "Woman posing by an outdoor mural in traditional attire"),
  muse(34653639, "Woman posing outdoors in traditional Indian attire"),
  muse(33963762, "Woman in traditional jewellery and attire outdoors"),
  muse(33959038, "Woman in vibrant traditional costume in a village setting"),
  muse(30677852, "Woman in traditional attire holding a dance pose"),
  muse(17209255, "Smiling woman in traditional clothing among tall grasses"),
  muse(20265608, "Woman in colourful traditional dress at an outdoor celebration"),
  muse(28144269, "Bride in orange traditional attire gazing into a mirror"),
  muse(17040964, "Portrait of an Indian woman in a traditional saree seated outdoors"),
  muse(7686292, "Woman in traditional attire holding a glowing sparkler at night"),
];

/** Front-page photo wall — the static grid beneath the rows. */
export const MUSE_WALL: Muse[] = [
  muse(12725950, "Full-length portrait of a woman in a lehenga", 900, 1125),
  muse(13562538, "Confident woman in a vibrant yellow traditional dress outdoors", 900, 1125),
  muse(15221867, "Bride in a red lehenga, photographed from above", 900, 1125),
  muse(9859645, "Woman in a green saree with statement jewellery", 900, 1125),
  muse(9418856, "Woman in a lehenga set with layered traditional jewellery", 900, 1125),
  muse(17542451, "Side profile of a bride in traditional jewellery", 900, 1125),
  muse(20762225, "Studio portrait of a woman in traditional attire", 900, 1125),
  muse(18682278, "Bride with henna and traditional jewellery", 900, 1125),
  muse(20382111, "Woman in pink traditional attire posing with floral accents", 900, 1125),
  muse(20516283, "Portrait of a woman in a pink traditional dress indoors", 900, 1125),
  muse(14581416, "Woman in vibrant traditional clothing reflected in a mirror", 900, 1125),
  muse(1934780, "Bride in traditional attire reflected in an ornate mirror", 900, 1125),
];

export const TESTIMONIALS = [
  {
    quote:
      "Wore the Rās Lehar for all nine nights in Ahmedabad and it did not lose a single mirror. The flare is ridiculous — in the best way.",
    name: "Kinjal P.",
    meta: "Navratri × 3 · Ahmedabad",
    initials: "KP",
    avatar: px(7123306, 120, 120),
  },
  {
    quote:
      "Ordered my panetar from New Jersey three weeks before the wedding. They took my measurements over WhatsApp and it fit like it was stitched here.",
    name: "Disha S.",
    meta: "Bridal · Newark, NJ",
    initials: "DS",
    avatar: px(12151670, 120, 120),
  },
  {
    quote:
      "I have bought chaniya from every big label in Gujarat. This is the first one where you can see a person's hand in it.",
    name: "Riddhi M.",
    meta: "Kutchi Abhla · Rajkot",
    initials: "RM",
    avatar: px(28144267, 120, 120),
  },
];

export const INSTAGRAM = [
  px(38796461, 600, 600),
  px(39305415, 600, 600),
  px(38281674, 600, 600),
  px(38998845, 600, 600),
  px(39002910, 600, 600),
  px(39342599, 600, 600),
  px(34265189, 600, 600),
  px(12747892, 600, 600),
  px(16803164, 600, 600),
  px(13584946, 600, 600),
  px(38961849, 600, 600),
  px(13280054, 600, 600),
  px(28943669, 600, 600),
  px(9596225, 600, 600),
  px(17499713, 600, 600),
  px(5721528, 600, 600),
  px(802457, 600, 600),
  px(19664447, 600, 600),
];

/** Shop page editorial strip — the look photos shown above the product grid. */
export const SHOP_STRIP = [
  {
    image: px(19414524, 700, 900),
    alt: "Portrait of a woman in ornate traditional Indian clothing and jewellery",
    label: "Navratri",
    filter: "Navratri",
  },
  {
    image: px(18717209, 700, 900),
    alt: "Smiling woman posing in traditional clothing at sunset",
    label: "Bandhani",
    filter: "Bandhani",
  },
  {
    image: px(17185632, 700, 900),
    alt: "Young woman in traditional Indian attire posing outdoors",
    label: "Bridal",
    filter: "Bridal",
  },
  {
    image: px(12725952, 700, 900),
    alt: "Full-length portrait of a woman in a colourful traditional lehenga",
    label: "Kutchi",
    filter: "Kutchi",
  },
];

export const SIZE_GUIDE = [
  { size: "XS", bust: 32, waist: 26, hip: 35, length: 40 },
  { size: "S", bust: 34, waist: 28, hip: 37, length: 41 },
  { size: "M", bust: 36, waist: 30, hip: 39, length: 42 },
  { size: "L", bust: 38, waist: 32, hip: 41, length: 42 },
  { size: "XL", bust: 40, waist: 34, hip: 43, length: 43 },
  { size: "XXL", bust: 42, waist: 36, hip: 45, length: 43 },
];
