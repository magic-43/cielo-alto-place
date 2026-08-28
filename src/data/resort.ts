// Cielo Alto Place — Complete Resort Data
// All room rates, policies, activities, and dining from CEO-provided info

export type RoomType = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  basePaxRate: number;       // Fan room rate (base price)
  acSurcharge: number;       // 500 for rooms with AC option, 0 for mini-cabin
  hasAcOption: boolean;      // false for mini-cabin only
  standardGuests: number;
  maxExtraGuests: number;
  extraPaxFee: number;       // always 500
  beds: string;
  hasCR: "private" | "shared";
  crNotes: string;
  hasVeranda: boolean;
  amenities: string[];
  images: string[];
  heroImage: string;
  highlights: string[];
  tag?: string;              // e.g. "Best for couples", "Most popular"
};

export const rooms: RoomType[] = [
  {
    slug: "mini-cabin",
    name: "Mini Cabin",
    shortDescription: "A cozy mountain retreat for two. Fan room. No extra guests — purely private.",
    description:
      "Escape into the highlands in our Mini Cabin — a rustic, intimate hideaway perfect for couples seeking quiet and simplicity. Wake up to crisp mountain air in a comfortable queen-size bed beneath exposed wooden beam ceilings. The Mini Cabin is the most affordable way to experience Cielo Alto's mountain magic. Fan-cooled, shared comfort room.",
    basePaxRate: 3000,
    acSurcharge: 0,
    hasAcOption: false,
    standardGuests: 2,
    maxExtraGuests: 0,
    extraPaxFee: 500,
    beds: "1 Queen-size Bed",
    hasCR: "shared",
    crNotes: "Shared comfort room",
    hasVeranda: false,
    amenities: [
      "1 Queen-size Bed",
      "Fan Room",
      "Shared Comfort Room",
      "Free Breakfast for 2",
      "Free Parking",
    ],
    images: [
      "/images/mini-cabin/photo_1_2026-08-26_10-08-37.jpg",
      "/images/mini-cabin/photo_2_2026-08-26_10-08-37.jpg",
      "/images/mini-cabin/photo_3_2026-08-26_10-08-37.jpg",
      "/images/mini-cabin/photo_4_2026-08-26_10-08-37.jpg",
    ],
    heroImage: "/images/mini-cabin/photo_1_2026-08-26_10-08-37.jpg",
    highlights: [
      "Perfect for couples",
      "Most affordable mountain stay",
      "Free breakfast for 2 included",
      "No extra guests — purely private",
    ],
  },
  {
    slug: "regular-cabin",
    name: "Regular Cabin",
    shortDescription: "Private veranda, overlooking mountain view. Fan or AC. Great for couples.",
    description:
      "The Regular Cabin is the ideal highland getaway for couples and small groups. Step out onto your private veranda and breathe in the panoramic views of Tanay's rolling mountains. With a comfortable queen-size bed, shared comfort room, and the choice of fan or air-conditioned room, this cabin delivers nature and comfort at an unbeatable value.",
    basePaxRate: 4000,
    acSurcharge: 500,
    hasAcOption: true,
    standardGuests: 2,
    maxExtraGuests: 2,
    extraPaxFee: 500,
    beds: "1 Queen-size Bed",
    hasCR: "shared",
    crNotes: "Shared comfort room",
    hasVeranda: true,
    amenities: [
      "1 Queen-size Bed",
      "Fan or AC Room",
      "Own Private Veranda",
      "Overlooking Mountain View",
      "Shared Comfort Room",
      "Free Breakfast for 2",
      "Up to 2 Extra Guests",
      "Free Parking",
    ],
    images: [
      "/images/regular-cabin/photo_1_2026-08-26_10-16-44.jpg",
      "/images/regular-cabin/photo_2_2026-08-26_10-16-44.jpg",
      "/images/regular-cabin/photo_3_2026-08-26_10-16-44.jpg",
      "/images/regular-cabin/photo_4_2026-08-26_10-16-44.jpg",
      "/images/regular-cabin/photo_5_2026-08-26_10-16-44.jpg",
    ],
    heroImage: "/images/regular-cabin/photo_1_2026-08-26_10-16-44.jpg",
    highlights: [
      "Panoramic mountain views from your veranda",
      "Fan or AC — your choice",
      "Perfect for couples",
      "Up to 2 extra guests (₱500/head)",
    ],
    tag: "Perfect for couples",
  },
  {
    slug: "family-cabin",
    name: "Family Cabin",
    shortDescription: "2 queen beds, own private CR, AC option. Best for families and groups.",
    description:
      "The Family Cabin is the go-to choice for families, reunions, and groups of friends. Two queen-size beds, a private comfort room, air-conditioning option, and a veranda with sweeping mountain views make this the most comfortable enclosed space at Cielo Alto Place. Free breakfast is included for all four base guests.",
    basePaxRate: 6000,
    acSurcharge: 500,
    hasAcOption: true,
    standardGuests: 4,
    maxExtraGuests: 2,
    extraPaxFee: 500,
    beds: "2 Queen-size Beds",
    hasCR: "private",
    crNotes: "Own private comfort room",
    hasVeranda: true,
    amenities: [
      "2 Queen-size Beds",
      "Fan or AC Room",
      "Own Private Comfort Room",
      "Overlooking Veranda",
      "Mountain View",
      "Free Breakfast for 4",
      "Up to 2 Extra Guests",
      "Free Parking",
    ],
    images: [
      "/images/family-cabin/photo_1_2026-08-26_10-17-14.jpg",
      "/images/family-cabin/photo_2_2026-08-26_10-17-14.jpg",
      "/images/family-cabin/photo_3_2026-08-26_10-17-14.jpg",
      "/images/family-cabin/photo_4_2026-08-26_10-17-14.jpg",
      "/images/family-cabin/photo_5_2026-08-26_10-17-14.jpg",
    ],
    heroImage: "/images/family-cabin/photo_1_2026-08-26_10-17-14.jpg",
    highlights: [
      "Perfect for families & big groups",
      "Own private comfort room",
      "Fan or AC — your choice",
      "Up to 2 extra guests (₱500/head)",
    ],
    tag: "Best for families",
  },
  {
    slug: "holiday-room-1",
    name: "Holiday Room 1",
    shortDescription: "Own CR with sink, private veranda, overlooking view. Fan or AC.",
    description:
      "Holiday Room 1 offers a hotel-style private room experience in a mountain setting. Your own comfort room with sink, a veranda overlooking the mountain landscape, and a queen-size bed make this an excellent choice for couples who value their own space. Fan room with an AC upgrade available.",
    basePaxRate: 4500,
    acSurcharge: 500,
    hasAcOption: true,
    standardGuests: 2,
    maxExtraGuests: 2,
    extraPaxFee: 500,
    beds: "1 Queen-size Bed",
    hasCR: "private",
    crNotes: "Own comfort room with sink",
    hasVeranda: true,
    amenities: [
      "1 Queen-size Bed",
      "Fan or AC Room",
      "Own Comfort Room (with Sink)",
      "Private Veranda",
      "Overlooking Mountain View",
      "Free Breakfast for 2",
      "Up to 2 Extra Guests",
      "Free Parking",
    ],
    images: [
      "/images/holiday-room-1/photo_1_2026-08-26_10-18-23.jpg",
      "/images/holiday-room-1/photo_2_2026-08-26_10-18-23.jpg",
      "/images/holiday-room-1/photo_3_2026-08-26_10-18-23.jpg",
      "/images/holiday-room-1/photo_4_2026-08-26_10-18-23.jpg",
      "/images/holiday-room-1/photo_5_2026-08-26_10-18-23.jpg",
    ],
    heroImage: "/images/holiday-room-1/photo_1_2026-08-26_10-18-23.jpg",
    highlights: [
      "Private comfort room with sink",
      "Mountain-view veranda",
      "Fan or AC — your choice",
      "Up to 2 extra guests (₱500/head)",
    ],
  },
  {
    slug: "holiday-room-2-3",
    name: "Holiday Room 2-3",
    shortDescription: "Double deck beds, own private CR, veranda view. Fun for friends & siblings.",
    description:
      "Holiday Rooms 2 and 3 are a fun, social setup featuring double-deck bunk beds — perfect for groups of friends, siblings, or families with kids. You still get your own private comfort room and a veranda with gorgeous mountain views. Fan room with AC upgrade available.",
    basePaxRate: 4000,
    acSurcharge: 500,
    hasAcOption: true,
    standardGuests: 2,
    maxExtraGuests: 2,
    extraPaxFee: 500,
    beds: "1 Double Deck (Bunk Bed)",
    hasCR: "private",
    crNotes: "Own private comfort room",
    hasVeranda: true,
    amenities: [
      "1 Double Deck Bunk Bed",
      "Fan or AC Room",
      "Own Private Comfort Room",
      "Overlooking Veranda",
      "Mountain View",
      "Free Breakfast for 2",
      "Up to 2 Extra Guests",
      "Free Parking",
    ],
    images: [
      "/images/holiday-room-2-3/photo_1_2026-08-26_10-19-35.jpg",
      "/images/holiday-room-2-3/photo_2_2026-08-26_10-19-35.jpg",
      "/images/holiday-room-2-3/photo_3_2026-08-26_10-19-35.jpg",
      "/images/holiday-room-2-3/photo_4_2026-08-26_10-19-35.jpg",
      "/images/holiday-room-2-3/photo_5_2026-08-26_10-19-35.jpg",
      "/images/holiday-room-2-3/photo_6_2026-08-26_10-19-35.jpg",
      "/images/holiday-room-2-3/photo_7_2026-08-26_10-19-35.jpg",
    ],
    heroImage: "/images/holiday-room-2-3/photo_1_2026-08-26_10-19-35.jpg",
    highlights: [
      "Fun double deck bunk beds",
      "Own private comfort room",
      "Fan or AC — your choice",
      "Up to 2 extra guests (₱500/head)",
    ],
  },
  {
    slug: "loft-cabin",
    name: "Loft Cabin",
    shortDescription: "3 queen beds + attic loft under iconic A-frame ceiling. Sleeps up to 8.",
    description:
      "The Loft Cabin is the crown jewel of Cielo Alto Place. Three queen-size beds spread across the main floor and an attic loft beneath the iconic A-frame pitched wooden beam ceiling give this cabin a character unlike anything else. With your own private comfort room, a veranda with breathtaking mountain views, and an AC upgrade available, the Loft Cabin is built for large groups, family reunions, and barkada getaways who want the full experience.",
    basePaxRate: 7000,
    acSurcharge: 500,
    hasAcOption: true,
    standardGuests: 4,
    maxExtraGuests: 4,
    extraPaxFee: 500,
    beds: "3 Queen-size Beds + Attic Loft",
    hasCR: "private",
    crNotes: "Own private comfort room",
    hasVeranda: true,
    amenities: [
      "3 Queen-size Beds",
      "Attic Loft Level",
      "Fan or AC Room",
      "Own Private Comfort Room",
      "Private Veranda",
      "Panoramic Mountain View",
      "Free Breakfast for 4",
      "Up to 4 Extra Guests",
      "Iconic A-Frame Architecture",
      "Free Parking",
    ],
    images: [
      "/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg",
      "/images/loft-cabin/photo_2_2026-08-26_10-20-21.jpg",
      "/images/loft-cabin/photo_3_2026-08-26_10-20-21.jpg",
      "/images/loft-cabin/photo_4_2026-08-26_10-20-21.jpg",
      "/images/loft-cabin/photo_5_2026-08-26_10-20-21.jpg",
      "/images/loft-cabin/photo_6_2026-08-26_10-20-21.jpg",
      "/images/loft-cabin/photo_7_2026-08-26_10-20-21.jpg",
    ],
    heroImage: "/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg",
    highlights: [
      "Sleeps up to 8 guests",
      "Iconic A-frame with attic loft",
      "Own private comfort room",
      "Up to 4 extra guests (₱500/head)",
      "Fan or AC — your choice",
    ],
    tag: "Most spacious",
  },
];

export const resort = {
  name: "Cielo Alto Place",
  tagline: "Hotel & Restaurant",
  location: "Tanay, Rizal Philippines",
  address: "Km 57 Marcos Highway, Sitio Mayagay, Tanay, Rizal",
  phone: "+63 995 385 5517",
  email: "cieloaltoplaceph@gmail.com",
  facebook: "https://www.facebook.com/share/1V9EEuNgCm/",
  googleMaps: "https://maps.google.com/?q=Cielo+Alto+Place+Tanay+Rizal",
  checkIn: "2:00 PM",
  checkOut: "12:00 Noon",
  extraPaxFee: 500,
  acSurcharge: 500,
  logo: "/images/logo.png",
  heroImage: "/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg",

  activities: [
    { name: "Bump Cars & Go-Kart", icon: "🏁", description: "Race around in bump cars and go-karts — fun for all ages." },
    { name: "Bonfire Nights", icon: "🔥", description: "Gather around a warm bonfire under the stars of Tanay." },
    { name: "Carnival Games", icon: "🎯", description: "Test your aim and win prizes at our fun carnival game stations." },
    { name: "Massage Chairs", icon: "💆", description: "Relax in our massage chairs after a day of mountain adventures." },
    { name: "Grilling Area", icon: "🍖", description: "Fire up the grill for a classic Filipino barbecue with your group." },
    { name: "Restaurant & Mini Mart", icon: "🍽️", description: "Dine at our on-site restaurant or grab snacks at the mini mart." },
    { name: "Scenic Instagram Spots", icon: "📸", description: "Capture stunning mountain views and A-frame cabin shots." },
    { name: "Pet-Friendly", icon: "🐾", description: "Bring your furry friends — Cielo Alto Place welcomes pets!" },
  ],

  dining: {
    tagline: "Eat & chill while enjoying the cold breeze of Tanay, Rizal",
    hours: "Daily, 7:00 AM – 9:00 PM · Walk-ins welcome",
    acousticSchedule: "Live acoustic: 6:00 PM–9:00 PM daily · 12:00 NN–3:00 PM (Sat & Sun)",
    menuImages: [
      "/images/restaurant/menu (1).jpg",
      "/images/restaurant/menu (2).jpg",
    ],
    restaurantImages: [
      "/images/restaurant/live acoustic.jpg",
      "/images/restaurant/721179713_1431535989012462_7642990396059947403_n.jpeg",
      "/images/restaurant/722996775_1679501023268401_8787611284058355617_n.jpeg",
      "/images/restaurant/723480757_984585327685224_6477256754918476011_n.jpeg",
      "/images/restaurant/photo_1_2026-08-26_10-22-58.jpg",
      "/images/restaurant/photo_2_2026-08-26_10-22-58.jpg",
      "/images/restaurant/photo_3_2026-08-26_10-22-58.jpg",
      "/images/restaurant/photo_4_2026-08-26_10-22-58.jpg",
      "/images/restaurant/photo_5_2026-08-26_10-22-58.jpg",
    ],
    menu: [
      {
        category: "Breakfast Meals",
        note: "7AM–10AM, served with bottled water",
        items: [
          { name: "American Breakfast", price: 280 },
          { name: "Tapsilog", price: 280 },
          { name: "Tocilog", price: 280 },
          { name: "Bangsilog", price: 280 },
          { name: "Danggitsilog", price: 280 },
          { name: "Cornsilog", price: 280 },
          { name: "Porksilog", price: 280 },
          { name: "Chicksilog", price: 280 },
          { name: "Hotsilog", price: 280 },
        ],
      },
      {
        category: "Pizza",
        items: [
          { name: "Cielo Alto Special", price: 580 },
          { name: "All Meat", price: 580 },
          { name: "Shawarma Pizza", price: 580 },
          { name: "Supreme Cheese", price: 520 },
          { name: "Pepperoni", price: 520 },
          { name: "Hawaiian", price: 520 },
        ],
      },
      {
        category: "Freshly Grilled",
        note: "Inihaw Solo Meal — with rice, salted egg, soup, veggies & side dish",
        items: [
          { name: "Grilled Chicken", price: 290 },
          { name: "Grilled Pork Liempo", price: 320 },
          { name: "Grilled Jumbo Hotdog", price: 290 },
          { name: "Grilled Hito", price: 350 },
          { name: "Grilled Tilapia", price: 320 },
          { name: "Grilled Boneless Bangus", price: 380 },
          { name: "Grilled Stuffed Squid (Med)", price: 420 },
          { name: "Grilled Stuffed Squid (Lg)", price: 490 },
          { name: "Grilled Tuna Panga (Med)", price: 480 },
          { name: "Grilled Tuna Panga (Lg)", price: 580 },
        ],
      },
      {
        category: "Fiesta Platter",
        note: "Good for 6–8 pax",
        items: [
          { name: "Set 1 — Tilapia, Bangus, Pusit, Liempo, Hotdog, Red Egg, Kamote Tops, 2 Rice", price: 1699 },
          { name: "Set 2 — Tuna Panga, Liempo, Quarterleg Chicken, Hito, Red Egg, Kamote Tops, 2 Rice", price: 1999 },
        ],
      },
      {
        category: "Ala Carte",
        items: [
          { name: "Crispy Pata", price: 1190 },
          { name: "Sizzling Sisig", price: 390 },
        ],
      },
      {
        category: "Dessert",
        items: [
          { name: "Leche Flan", price: 220 },
          { name: "Banana Rhum-A Turon", price: 220 },
        ],
      },
      {
        category: "Coffee & Drinks",
        items: [
          { name: "Espresso Shot", price: 90 },
          { name: "Cappuccino", price: 150 },
          { name: "Americano / Long Black", price: 110 },
          { name: "Latte", price: 150 },
          { name: "Flavored Latte (Mocha, Hazelnut, Spanish, Caramel, Salted Caramel, Vanilla)", price: 170 },
          { name: "Coffee-Based Frappe", price: 205 },
          { name: "Dark / White Choco Toblerone Frappe", price: 220 },
          { name: "Mango Shake", price: 150 },
          { name: "Watermelon Shake", price: 150 },
          { name: "Soda in Can (Coke / Royal / Sprite)", price: 70 },
          { name: "Pineapple Juice", price: 70 },
          { name: "Mango Juice", price: 80 },
          { name: "Green Tea / Red Iced Tea / Blue Lemonade (Glass)", price: 90 },
          { name: "Pitcher (Red Iced Tea / Blue Lemonade)", price: 150 },
          { name: "Bottled Water 500ml", price: 20 },
          { name: "Bottled Water 1L", price: 40 },
        ],
      },
      {
        category: "Beers & Liquors",
        items: [
          { name: "San Mig Apple / Light / Pale Pilsen / Red Horse", price: 100 },
          { name: "Red Wine", price: 1100 },
        ],
      },
    ],
  },

  policy: {
    checkIn: "2:00 PM",
    checkOut: "12:00 Noon (next day)",
    extraPaxFee: 500,
    extraPaxIncludes: "breakfast & bed",
    acSurcharge: 500,
    miniCabinNote: "Mini Cabin does not allow extra guests.",
    breakfastNote: "Free breakfast is included for all base guests in every room.",
    paymentMethods: ["GCash", "Bank Transfer"],
    paymentNote: "Cashless only. Upload proof of payment to complete your booking.",
  },
};

export function getRoomBySlug(slug: string): RoomType | undefined {
  return rooms.find((r) => r.slug === slug);
}

export const featuredRooms = rooms.filter((r) =>
  ["loft-cabin", "family-cabin", "regular-cabin"].includes(r.slug)
);

export const activityImages = [
  "/images/activities/cover.jpg",
  "/images/activities/468434857_918210953604112_8734516923771420951_n.jpg",
  "/images/activities/468435831_918210900270784_7158166831862479757_n.jpg",
  "/images/activities/468482510_918210906937450_3873911303095158899_n.jpg",
  "/images/activities/468529811_918210996937441_8060064480368368969_n.jpg",
  "/images/activities/491735402_1177194257750806_2669294754168585564_n.jpg",
  "/images/activities/577056348_1355285993274964_1974349196918093341_n.jpg",
  "/images/activities/577148230_1355284846608412_5698591016020198075_n.jpg",
  "/images/activities/600312928_1391629162973980_8418289452270346111_n.jpg",
  "/images/activities/633030675_1440996134703949_3131819040525978174_n.jpg",
  "/images/activities/665830522_1483732633763632_8675381043862118360_n.jpg",
  "/images/activities/photo_1_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_2_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_3_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_4_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_5_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_6_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_7_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_8_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_9_2026-08-26_10-21-07.jpg",
  "/images/activities/photo_10_2026-08-26_10-21-07.jpg",
];
