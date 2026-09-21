import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Paracetamol 650mg",
    variant: "Tablet",
    price: 2.5,
    originalPrice: 3.2,
    image:
      "https://images.pexels.com/photos/16051960/pexels-photo-16051960.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/16051960/pexels-photo-16051960.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/11361813/pexels-photo-11361813.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "medicines",
    brand: "Cipla",
    rating: 4.6,
    reviewCount: 218,
    packSizes: ["10 Tablets", "20 Tablets", "50 Tablets"],
    description:
      "Paracetamol 650mg is used for fast, effective relief from fever and mild to moderate pain including headache, body ache, and toothache.",
    ingredients: "Each tablet contains Paracetamol IP 650mg. Excipients: q.s.",
    howToUse:
      "Take one tablet every 4-6 hours as needed. Do not exceed 4 tablets in 24 hours unless directed by a physician.",
  },
  {
    name: "Vitamin C 1000mg",
    variant: "Tablet",
    price: 7.5,
    originalPrice: 9.5,
    image:
      "https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "medicines",
    brand: "Sun Pharma",
    rating: 4.8,
    reviewCount: 342,
    packSizes: ["30 Tablets", "60 Tablets"],
    description:
      "A high-strength Vitamin C supplement that supports immune health, skin health, and antioxidant protection.",
    ingredients: "Each tablet contains Ascorbic Acid 1000mg.",
    howToUse:
      "Take one tablet daily with food, or as directed by your healthcare provider.",
  },
  {
    name: "Ibuprofen 400mg",
    variant: "Tablet",
    price: 3.75,
    originalPrice: 4.8,
    image: "https://picsum.photos/seed/med13/400/400",
    images: ["https://picsum.photos/seed/med13/600/600"],
    category: "medicines",
    brand: "Zydus",
    rating: 4.5,
    reviewCount: 189,
    packSizes: ["10 Tablets", "20 Tablets"],
    description:
      "Ibuprofen 400mg provides effective relief from pain, inflammation, and fever, including headaches, muscle aches, and menstrual cramps.",
    ingredients: "Each tablet contains Ibuprofen 400mg.",
    howToUse:
      "Take one tablet every 6-8 hours with food. Do not exceed 3 tablets in 24 hours.",
  },
  {
    name: "Cough & Cold Syrup",
    variant: "Syrup",
    price: 6.5,
    originalPrice: 8.0,
    image:
      "https://images.pexels.com/photos/5858861/pexels-photo-5858861.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/5858861/pexels-photo-5858861.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "medicines",
    brand: "Dr. Reddy's",
    rating: 4.4,
    reviewCount: 112,
    packSizes: ["100ml", "200ml"],
    description:
      "A soothing syrup that relieves cough, congestion, and cold symptoms, safe for adults and children over 6.",
    ingredients:
      "Dextromethorphan HBr, Chlorpheniramine Maleate, Phenylephrine HCl.",
    howToUse: "Take 10ml every 4-6 hours, or as directed by a physician.",
  },
  {
    name: "Cetirizine 10mg",
    variant: "Tablet",
    price: 3.2,
    originalPrice: 4.2,
    image:
      "https://images.pexels.com/photos/9155926/pexels-photo-9155926.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/9155926/pexels-photo-9155926.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "medicines",
    brand: "Zydus",
    rating: 4.3,
    reviewCount: 174,
    packSizes: ["10 Tablets", "30 Tablets"],
    description:
      "An antihistamine that relieves allergy symptoms such as sneezing, runny nose, and itchy eyes.",
    ingredients: "Each tablet contains Cetirizine Hydrochloride 10mg.",
    howToUse: "Take one tablet daily, or as directed by your physician.",
  },
  {
    name: "Digital Thermometer",
    variant: "1 Unit",
    price: 6.99,
    originalPrice: 8.99,
    image:
      "https://images.pexels.com/photos/11137526/pexels-photo-11137526.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/11137526/pexels-photo-11137526.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "health-care",
    brand: "Abbott",
    rating: 4.5,
    reviewCount: 97,
    packSizes: ["1 Unit"],
    description:
      "A fast, accurate digital thermometer with a flexible tip for comfortable use, suitable for all ages.",
    ingredients: null,
    howToUse:
      "Place under the tongue or arm and wait for the beep. Clean the tip before and after each use.",
  },
  {
    name: "N95 Face Masks (10 Pack)",
    variant: "10 Count",
    price: 11.5,
    originalPrice: 14.0,
    image:
      "https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "health-care",
    brand: "Cipla",
    rating: 4.7,
    reviewCount: 305,
    packSizes: ["10 Count", "25 Count"],
    description:
      "High-filtration N95 face masks providing protection against airborne particles, individually sealed.",
    ingredients: null,
    howToUse:
      "Fit snugly over nose and mouth, ensuring a secure seal. Discard after single use.",
  },
  {
    name: "Aloe Vera Gel",
    variant: "150ml",
    price: 5.5,
    originalPrice: 7.0,
    image:
      "https://images.pexels.com/photos/18739319/pexels-photo-18739319.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/18739319/pexels-photo-18739319.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "personal-care",
    brand: "Cipla",
    rating: 4.4,
    reviewCount: 201,
    packSizes: ["150ml", "300ml"],
    description:
      "A soothing, lightweight gel that hydrates and calms skin, ideal for daily moisturizing or after sun exposure.",
    ingredients: "Aloe Barbadensis Leaf Extract, Glycerin, Purified Water.",
    howToUse: "Apply a thin layer to clean skin as needed.",
  },
  {
    name: "Hand Sanitizer Gel",
    variant: "250ml",
    price: 4.25,
    originalPrice: null,
    image:
      "https://images.pexels.com/photos/8266821/pexels-photo-8266821.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/8266821/pexels-photo-8266821.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "personal-care",
    brand: "Sanofi",
    rating: 4.4,
    reviewCount: 143,
    packSizes: ["250ml", "500ml"],
    description:
      "A fast-drying 70% alcohol hand sanitizer gel that kills 99.9% of germs without drying out skin.",
    ingredients: "Ethyl Alcohol 70%, Aloe Vera Extract, Glycerin.",
    howToUse:
      "Apply a small amount to hands and rub until dry. No water needed.",
  },
  {
    name: "Sunscreen SPF 50",
    variant: "100ml",
    price: 9.5,
    originalPrice: 12.0,
    image: "https://picsum.photos/seed/med16/400/400",
    images: ["https://picsum.photos/seed/med16/600/600"],
    category: "personal-care",
    brand: "Cipla",
    rating: 4.6,
    reviewCount: 203,
    packSizes: ["100ml", "150ml"],
    description:
      "Broad-spectrum SPF 50 sunscreen that protects against UVA/UVB rays, lightweight and non-greasy.",
    ingredients: "Zinc Oxide, Titanium Dioxide, Aloe Vera Extract.",
    howToUse:
      "Apply generously 15 minutes before sun exposure and reapply every 2 hours.",
  },
  {
    name: "Baby Moisturizing Lotion",
    variant: "200ml",
    price: 8.0,
    originalPrice: 10.0,
    image: "https://picsum.photos/seed/med7/400/400",
    images: ["https://picsum.photos/seed/med7/600/600"],
    category: "baby-care",
    brand: "Sanofi",
    rating: 4.9,
    reviewCount: 267,
    packSizes: ["200ml", "400ml"],
    description:
      "A gentle, hypoallergenic lotion formulated for delicate baby skin, free from parabens and dyes.",
    ingredients: "Water, Glycerin, Shea Butter, Chamomile Extract.",
    howToUse: "Massage gently onto skin after bath time.",
  },
  {
    name: "Baby Diapers (Pack of 40)",
    variant: "Size M",
    price: 14.99,
    originalPrice: 18.99,
    image:
      "https://images.pexels.com/photos/28846860/pexels-photo-28846860.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/28846860/pexels-photo-28846860.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "baby-care",
    brand: "Sanofi",
    rating: 4.8,
    reviewCount: 421,
    packSizes: ["Size S (44 pack)", "Size M (40 pack)", "Size L (36 pack)"],
    description:
      "Ultra-soft, highly absorbent diapers with a snug fit to keep babies comfortable and dry for up to 12 hours.",
    ingredients: null,
    howToUse:
      "Select the correct size for your baby's weight and change every 3-4 hours or when wet.",
  },
  {
    name: "Baby No-Tears Shampoo",
    variant: "200ml",
    price: 6.99,
    originalPrice: null,
    image: "https://picsum.photos/seed/med14/400/400",
    images: ["https://picsum.photos/seed/med14/600/600"],
    category: "baby-care",
    brand: "Sanofi",
    rating: 4.7,
    reviewCount: 158,
    packSizes: ["200ml", "400ml"],
    description:
      "A gentle, tear-free shampoo formulated for baby's delicate scalp and hair, free from sulfates and parabens.",
    ingredients: "Water, Cocamidopropyl Betaine, Chamomile Extract, Glycerin.",
    howToUse:
      "Massage into wet hair, lather gently, and rinse thoroughly avoiding eyes.",
  },
  {
    name: "Digital BP Monitor",
    variant: "1 Unit",
    price: 25.0,
    originalPrice: 30.0,
    image:
      "https://images.pexels.com/photos/8088866/pexels-photo-8088866.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/8088866/pexels-photo-8088866.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "devices",
    inStock: false,
    brand: "Abbott",
    rating: 4.7,
    reviewCount: 89,
    packSizes: ["1 Unit"],
    description:
      "An easy-to-use digital blood pressure monitor with a large display and automatic irregular heartbeat detection.",
    ingredients: null,
    howToUse:
      "Wrap the cuff around your upper arm and press start. Sit still and breathe normally during measurement.",
  },
  {
    name: "Pulse Oximeter",
    variant: "1 Unit",
    price: 18.0,
    originalPrice: 22.0,
    image:
      "https://images.pexels.com/photos/7580256/pexels-photo-7580256.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/7580256/pexels-photo-7580256.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "devices",
    brand: "Dr. Reddy's",
    rating: 4.6,
    reviewCount: 76,
    packSizes: ["1 Unit"],
    description:
      "A compact fingertip pulse oximeter that measures blood oxygen saturation (SpO2) and pulse rate in seconds.",
    ingredients: null,
    howToUse:
      "Clip onto a fingertip and hold still for 5-10 seconds until the reading stabilizes.",
  },
  {
    name: "Digital Weighing Scale",
    variant: "1 Unit",
    price: 16.0,
    originalPrice: 20.0,
    image:
      "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/4474052/pexels-photo-4474052.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "devices",
    brand: "Abbott",
    rating: 4.4,
    reviewCount: 67,
    packSizes: ["1 Unit"],
    description:
      "A precise digital bathroom scale with a large LED display, ideal for tracking weight as part of a wellness routine.",
    ingredients: null,
    howToUse:
      "Place on a hard, flat surface and step on barefoot for an accurate reading.",
  },
  {
    name: "Omega 3 Fish Oil",
    variant: "Capsule",
    price: 12.5,
    originalPrice: 15.5,
    image:
      "https://images.pexels.com/photos/13787566/pexels-photo-13787566.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/13787566/pexels-photo-13787566.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "wellness",
    brand: "Dr. Reddy's",
    rating: 4.5,
    reviewCount: 156,
    packSizes: ["60 Capsules", "90 Capsules"],
    description:
      "Supports heart and brain health with a concentrated source of EPA and DHA omega-3 fatty acids.",
    ingredients:
      "Fish Oil Concentrate providing EPA 180mg, DHA 120mg per capsule.",
    howToUse: "Take one capsule daily with a meal.",
  },
  {
    name: "Multivitamin Gummies",
    variant: "60 Count",
    price: 9.99,
    originalPrice: null,
    image:
      "https://images.pexels.com/photos/3850681/pexels-photo-3850681.jpeg?auto=compress&cs=tinysrgb&w=400",
    images: [
      "https://images.pexels.com/photos/3850681/pexels-photo-3850681.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    category: "wellness",
    brand: "Mankind",
    rating: 4.6,
    reviewCount: 132,
    packSizes: ["60 Count", "120 Count"],
    description:
      "Delicious daily gummies packed with essential vitamins A, C, D, and E to support overall wellness.",
    ingredients:
      "Vitamin A, Vitamin C, Vitamin D3, Vitamin E, Pectin, Natural Fruit Flavors.",
    howToUse: "Chew two gummies daily.",
  },
  {
    name: "Zinc Supplement 50mg",
    variant: "Tablet",
    price: 8.25,
    originalPrice: 10.5,
    image: "https://picsum.photos/seed/med15/400/400",
    images: ["https://picsum.photos/seed/med15/600/600"],
    category: "wellness",
    brand: "Mankind",
    rating: 4.5,
    reviewCount: 94,
    packSizes: ["60 Tablets", "90 Tablets"],
    description:
      "Supports immune function, skin health, and wound healing with a high-potency zinc supplement.",
    ingredients: "Zinc Gluconate 50mg per tablet.",
    howToUse:
      "Take one tablet daily with food, or as directed by your healthcare provider.",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    await mongoose.disconnect();
    console.log("Done — disconnected");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedDatabase();
