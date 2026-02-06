// ============================================================
// HERB DATA — Placeholder product data for Secret Sage
// Real product images, nutritional info, and descriptions
// will be provided and should replace these placeholders.
// ============================================================

export interface HerbEnvironment {
  /** Primary color for background gradient */
  primary: string;
  /** Secondary color for background gradient */
  secondary: string;
  /** Accent color for UI elements */
  accent: string;
  /** Particle / mist color */
  particleColor: string;
  /** Animation mood descriptor */
  mood: string;
  /** Type of ambient animation */
  animationType: "mist" | "leafSway" | "particles" | "verticalDrift";
}

export interface HerbProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  /** Placeholder — replace with real punnet image path */
  image: string;
  nutrition: {
    calories: string;
    vitaminC: string;
    iron: string;
    fiber: string;
  };
  usage: string[];
  environment: HerbEnvironment;
}

export const herbs: HerbProduct[] = [
  {
    id: "mint-001",
    slug: "mint",
    name: "Mint",
    tagline: "A breath of cool clarity",
    description:
      "Fresh, vibrant mint leaves picked at their peak. Perfect for teas, salads, and garnishes that awaken the senses.",
    price: 2.49,
    currency: "GBP",
    image: "/herbs/mint-punnet.png",
    nutrition: {
      calories: "70 kcal / 100g",
      vitaminC: "31.8 mg",
      iron: "5.08 mg",
      fiber: "8g",
    },
    usage: [
      "Fresh in teas and cocktails",
      "Chopped into salads and tabbouleh",
      "Infused in water for a cooling drink",
      "Paired with lamb and yoghurt sauces",
    ],
    environment: {
      primary: "#0b2e1a",
      secondary: "#1a4d3a",
      accent: "#6ee7b7",
      particleColor: "rgba(110, 231, 183, 0.15)",
      mood: "Cool, fresh",
      animationType: "mist",
    },
  },
  {
    id: "basil-001",
    slug: "basil",
    name: "Basil",
    tagline: "Warmth from the earth",
    description:
      "Aromatic Italian basil with deep green leaves and a peppery-sweet fragrance. The soul of Mediterranean cooking.",
    price: 2.29,
    currency: "GBP",
    image: "/herbs/basil-punnet.png",
    nutrition: {
      calories: "23 kcal / 100g",
      vitaminC: "18 mg",
      iron: "3.17 mg",
      fiber: "1.6g",
    },
    usage: [
      "Torn over fresh pizza and pasta",
      "Blended into pesto",
      "Layered in caprese salads",
      "Infused in olive oil",
    ],
    environment: {
      primary: "#2d1a0b",
      secondary: "#4a3520",
      accent: "#d4a574",
      particleColor: "rgba(212, 165, 116, 0.12)",
      mood: "Warm, earthy",
      animationType: "leafSway",
    },
  },
  {
    id: "coriander-001",
    slug: "coriander",
    name: "Coriander",
    tagline: "Light as scattered seeds",
    description:
      "Bright, citrusy coriander with delicate leaves that bring life to any dish. Essential in Asian, Latin, and Middle Eastern cuisines.",
    price: 1.99,
    currency: "GBP",
    image: "/herbs/coriander-punnet.png",
    nutrition: {
      calories: "23 kcal / 100g",
      vitaminC: "27 mg",
      iron: "1.77 mg",
      fiber: "2.8g",
    },
    usage: [
      "Garnish for curries and soups",
      "Mixed into salsas and guacamole",
      "Added to stir-fries at the last moment",
      "Blended into chutneys",
    ],
    environment: {
      primary: "#1a1a0b",
      secondary: "#3d3a20",
      accent: "#d4d474",
      particleColor: "rgba(212, 212, 116, 0.1)",
      mood: "Light, grainy",
      animationType: "particles",
    },
  },
  {
    id: "rosemary-001",
    slug: "rosemary",
    name: "Rosemary",
    tagline: "Deep roots, sharp clarity",
    description:
      "Woody, aromatic rosemary with needle-like leaves and a bold, piney fragrance. A staple of roasts and rustic cooking.",
    price: 2.69,
    currency: "GBP",
    image: "/herbs/rosemary-punnet.png",
    nutrition: {
      calories: "131 kcal / 100g",
      vitaminC: "21.8 mg",
      iron: "6.65 mg",
      fiber: "14.1g",
    },
    usage: [
      "Roasted with potatoes and lamb",
      "Infused in bread doughs",
      "Steeped in olive oil or butter",
      "Added to hearty soups and stews",
    ],
    environment: {
      primary: "#0b1a2d",
      secondary: "#1a2d4a",
      accent: "#7ba7d4",
      particleColor: "rgba(123, 167, 212, 0.12)",
      mood: "Deep, sharp",
      animationType: "verticalDrift",
    },
  },
  {
    id: "thyme-001",
    slug: "thyme",
    name: "Thyme",
    tagline: "Whispers of the hillside",
    description:
      "Fragrant thyme with tiny, potent leaves that release their oils slowly. A subtle but essential flavour in French and Italian cuisine.",
    price: 2.39,
    currency: "GBP",
    image: "/herbs/thyme-punnet.png",
    nutrition: {
      calories: "101 kcal / 100g",
      vitaminC: "160 mg",
      iron: "17.45 mg",
      fiber: "14g",
    },
    usage: [
      "Slow-cooked in casseroles and braises",
      "Paired with mushrooms and garlic",
      "Added to bouquet garni",
      "Infused in honey",
    ],
    environment: {
      primary: "#1a0b2d",
      secondary: "#2d1a4a",
      accent: "#b47bd4",
      particleColor: "rgba(180, 123, 212, 0.1)",
      mood: "Subtle, herbal",
      animationType: "mist",
    },
  },
  {
    id: "parsley-001",
    slug: "parsley",
    name: "Parsley",
    tagline: "Clean and bright",
    description:
      "Crisp, fresh flat-leaf parsley with a clean, peppery taste. The universal garnish that elevates every plate.",
    price: 1.89,
    currency: "GBP",
    image: "/herbs/parsley-punnet.png",
    nutrition: {
      calories: "36 kcal / 100g",
      vitaminC: "133 mg",
      iron: "6.2 mg",
      fiber: "3.3g",
    },
    usage: [
      "Chopped into tabbouleh and salads",
      "Stirred into chimichurri",
      "Sprinkled over finished dishes",
      "Mixed into compound butter",
    ],
    environment: {
      primary: "#0b2d15",
      secondary: "#1a4d2a",
      accent: "#74d48a",
      particleColor: "rgba(116, 212, 138, 0.12)",
      mood: "Clean, bright",
      animationType: "leafSway",
    },
  },
];

export function getHerbBySlug(slug: string): HerbProduct | undefined {
  return herbs.find((h) => h.slug === slug);
}
