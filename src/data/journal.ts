export type Article = {
  slug: string;
  title: string;
  tag: "Style Guide" | "Fashion Tips";
  minutes: number;
  date: string;
  image: string;
  standfirst: string;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "the-mac-after-rain",
    title: "The mac, after rain",
    tag: "Style Guide",
    minutes: 6,
    date: "2026-10-02",
    image: "/catalogue/mac-charcoal.jpg",
    standfirst:
      "A coat should still look like a coat when the street is shining. Notes from a wet week in Bermondsey.",
    paragraphs: [
      "The Bermondsey Mac was cut after three Novembers of watching good wool collapse at the first serious rain. We wanted the silhouette of a tailor's coat and the manners of something you can hose down.",
      "Charcoal is the only colour this season. Camel reads beautifully in dry cold and slightly apologetic in a downpour. Charcoal just gets on with it. Belt it if you are in a dress. Leave it open over the Soho Straight.",
      "Hang it by the loop, not the collar, and let the gabardine dry before it goes near a radiator. Once a season, reproof the cloth. That is the whole ritual.",
      "If you only buy one outer layer before the clocks change, make it this. The twenty percent comes off while the first containers are still in the arch.",
    ],
  },
  {
    slug: "two-washes",
    title: "Two washes, one jean",
    tag: "Style Guide",
    minutes: 4,
    date: "2026-10-06",
    image: "/catalogue/jean-indigo.jpg",
    standfirst: "Indigo for the days you want structure. Stone for the days you do not. The Soho Straight, explained.",
    paragraphs: [
      "We do not believe in a jean with a story printed on the pocket. The Soho Straight is a high rise, a clean leg, and a hem you can turn once.",
      "Indigo is rigid. It will feel opinionated for a fortnight and then it will be yours. Stone is the same pattern, enzyme-washed until it moves like a trouser.",
      "Wear either with the Thames Tee, the Mayfair crew, or the Clerkenwell Column and a boot. The sherpa jacket is the layer if the evening turns.",
      "Wash them rarely, inside out, and never in the same load as the marigold crew. Some lessons are older than the house.",
    ],
  },
  {
    slug: "small-coats",
    title: "Small coats for serious weather",
    tag: "Fashion Tips",
    minutes: 5,
    date: "2026-09-28",
    image: "/catalogue/kid-yellow.jpg",
    standfirst: "Children do not need miniature fashion. They need a coat you can see from the other side of the playground.",
    paragraphs: [
      "The Primrose Mac is saffron on purpose. London in October is the colour of wet slate, and a navy hood disappears into it. Saffron does not.",
      "Sizes run 3–4 through 9–10. If they are between, take the larger one. The cuff is meant to be turned back this year and let down the next.",
      "Under it, the Saturday Cardigan. Navy, cotton, buttons that survive a term. We kept the kids' edit short: one coat, one knit, both made to be worn hard.",
      "Returns are fifteen days, same as the adult floor. School uniform weeks have a way of changing minds.",
    ],
  },
  {
    slug: "a-room-should-smell",
    title: "What a room should smell like",
    tag: "Fashion Tips",
    minutes: 3,
    date: "2026-09-16",
    image: "/catalogue/candle.jpg",
    standfirst: "Fig, cedar, and a little smoke. The only fragrance on the floor this season is a candle, and that is deliberate.",
    paragraphs: [
      "We were going to bottle something. Then we spent a week in the arch with fabric, steam, and wet wool, and a bottle felt like the wrong object. A candle is a room agreeing with the clothes.",
      "Fig & Cedar is green fruit, pencil shavings, and the faint smoke of a wick that has already been lit once in the studio. Fifty hours, give or take how draughty your windows are.",
      "Burn it the first time until the whole surface is liquid, or it will remember the shortcut. Trim the wick. The glass is yours after.",
      "If you want first notice when a bottled scent does arrive, the bell at the corner of the site is the list. We will not email you about anything else unless you ask.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
