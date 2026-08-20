import { BusinessInfo, GalleryItem, MenuItem, MealSlot, MenuCategory } from '../types';

// Authentic Uploaded Restaurant Images
import facadeSignboardImg from '../assets/images/uploaded_hero-facade.jpg';
import chefPavBhajiImg from '../assets/images/kanishka_chef_pavbhaji_1787078473991.jpg';
import diningInteriorImg from '../assets/images/uploaded_about-dining.jpg';
import cheeseCherryImg from '../assets/images/kanishka_cheese_cherry_1787078497939.jpg';
import dessertSplitImg from '../assets/images/kanishka_dessert_split_1787078517723.jpg';
import beveragesDuoImg from '../assets/images/kanishka_beverages_duo_1787078529213.jpg';
import familyDiningImg from '../assets/images/uploaded_about-family.jpg';
import strawberryShakeImg from '../assets/images/kanishka_strawberry_shake_1787078556107.jpg';
import heroDiningImg from '../assets/images/uploaded_hero-dining.jpg';
import masalaDosaImg from '../assets/images/uploaded_dish-mysore-masala.jpg';
import heroFeastImg from '../assets/images/uploaded_hero-facade.jpg';
import ambienceImg from '../assets/images/uploaded_about-dining.jpg';
import paneerButterImg from '../assets/images/kanishka_paneer_butter_1786983405080.jpg';
import pavBhajiImg from '../assets/images/kanishka_pav_bhaji_1786983425990.jpg';
import faloodaImg from '../assets/images/kanishka_falooda_1786983447725.jpg';
import noodlesImg from '../assets/images/kanishka_noodles_1786983462088.jpg';
import jainThaliImg from '../assets/images/kanishka_jain_thali_1786983472836.jpg';

// Modular Menu Category Lists
import { SOUTH_INDIAN_ITEMS } from './menu/southIndian';
import { FAST_FOOD_ITEMS } from './menu/fastFood';
import { STARTERS_ITEMS } from './menu/starters';
import { PUNJABI_ITEMS } from './menu/punjabi';
import { CHINESE_THAI_ITEMS } from './menu/chineseThai';
import { BEVERAGES_DESSERTS_ITEMS } from './menu/beveragesDesserts';

export const RESTAURANT_IMAGES = {
  facadeSignboard: facadeSignboardImg,
  chefPavBhaji: chefPavBhajiImg,
  diningInterior: diningInteriorImg,
  cheeseCherry: cheeseCherryImg,
  dessertSplit: dessertSplitImg,
  beveragesDuo: beveragesDuoImg,
  familyDining: familyDiningImg,
  strawberryShake: strawberryShakeImg,
  hero: heroFeastImg,
  ambience: ambienceImg,
  masalaDosa: masalaDosaImg,
  paneerButter: paneerButterImg,
  pavBhaji: pavBhajiImg,
  falooda: faloodaImg,
  noodles: noodlesImg,
  jainThali: jainThaliImg,
};

export const BUSINESS_INFO: BusinessInfo = {
  name: 'KANISHKA VEG. RESTAURANT',
  tagline: 'Where Pure Vegetarian Flavours Meet Modern Indian Elegance',
  businessType: 'Premium Pure Vegetarian & Jain Multi-Cuisine Restaurant',
  primaryPhone: '022 2353 6131',
  mobile: '89282 62135',
  whatsapp: '89282 62135',
  whatsappRaw: '918928262135',
  googleMapsUrl: 'https://maps.google.com/?cid=7508032631053520552',
  addressPrimary: 'Shop No. 5/B, 1st Floor, Tardeo Road, Haji Ali Circle, Opposite Heera Panna Shopping Centre, Mumbai, Maharashtra – 400034',
  addressAlternative: 'Cross Road Building, 3-B, Tardeo Rd, Haji Ali, Arya Nagar, Captain Colony, Tardeo, Mumbai, Maharashtra 400034',
  landmark: 'Opposite Heera Panna Shopping Centre, Haji Ali Circle',
  hours: 'Monday – Sunday: 9:00 AM – 12:00 AM',
  mealTimings: [
    {
      name: 'Breakfast',
      timeRange: '9:00 AM – 11:00 AM',
      description: 'Steaming hot idlis, crispy dosas, fresh juices & filter coffee',
      startHour: 9,
      startMinute: 0,
      endHour: 11,
      endMinute: 0,
    },
    {
      name: 'Lunch',
      timeRange: '11:00 AM – 4:30 PM',
      description: 'Hearty Punjabi curries, Jain thalis, Chinese sizzlers & rice specials',
      startHour: 11,
      startMinute: 0,
      endHour: 16,
      endMinute: 30,
    },
    {
      name: 'Evening Snacks / Light Meals',
      timeRange: '4:30 PM – 7:00 PM',
      description: 'Sizzling Pav Bhaji, grilled sandwiches, shakes, falooda & quick bites',
      startHour: 16,
      startMinute: 30,
      endHour: 19,
      endMinute: 0,
    },
    {
      name: 'Dinner',
      timeRange: '7:00 PM – 12:00 AM',
      description: 'Complete family dining, North Indian feasts, dosas & signature desserts',
      startHour: 19,
      startMinute: 0,
      endHour: 24,
      endMinute: 0,
    },
  ],
};

// Consolidated Master Menu Items
export const MENU_ITEMS: MenuItem[] = [
  ...SOUTH_INDIAN_ITEMS,
  ...FAST_FOOD_ITEMS,
  ...STARTERS_ITEMS,
  ...PUNJABI_ITEMS,
  ...CHINESE_THAI_ITEMS,
  ...BEVERAGES_DESSERTS_ITEMS,
];

// Curated Signature Highlights mapped to realistic food photos
export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: 'chef-special-pav-bhaji',
    name: 'Chef’s Special Pav Bhaji',
    category: 'Pav Bhaji & Tawa',
    price: '₹220',
    numericPrice: 220,
    description: 'Slow-simmered spiced vegetable mash cooked on live iron tawa with melting Amul butter, served with hot golden butter pav and lemon wedges.',
    image: chefPavBhajiImg,
    isBestseller: true,
    isVeg: true,
    isJain: true,
    spicyLevel: 2,
  },
  {
    id: 'mysore-masala',
    name: 'Mysore Masala Dosa',
    category: 'Dosa & Creations',
    price: '₹150',
    numericPrice: 150,
    description: 'Crispy golden crepe smeared with spicy red Mysore chutney and filled with seasoned potato masala, served with coconut chutney & piping hot sambar.',
    image: masalaDosaImg,
    isBestseller: true,
    isVeg: true,
    isJain: false,
    spicyLevel: 2,
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    category: 'Punjabi Paneer',
    price: '₹315',
    numericPrice: 315,
    description: 'Fresh cottage cheese simmered in a velvety, mildly spiced makhani gravy enriched with butter, cashew paste, and fresh cream.',
    image: paneerButterImg,
    isBestseller: true,
    isVeg: true,
    isJain: true,
  },
  {
    id: 'cheese-cherry-pineapple',
    name: 'Cheese Cherry Pineapple Skewers',
    category: 'Tandoori & Starters',
    price: '₹210',
    numericPrice: 210,
    description: 'Classic Mumbai club appetiser with skewered Amul cheese cubes, glazed red cherries, and juicy sweet pineapple chilled on crystal ice.',
    image: cheeseCherryImg,
    isBestseller: true,
    isVeg: true,
    isJain: true,
  },
  {
    id: 'royal-banana-split-sundae',
    name: 'Royal Banana Split Sundae',
    category: 'Fresh Creams & Desserts',
    price: '₹260',
    numericPrice: 260,
    description: 'Signature dessert boat with scoops of vanilla ice cream, fresh bananas, candied cherries, roasted cashews, raisins, and rich strawberry drizzle.',
    image: dessertSplitImg,
    isBestseller: true,
    isVeg: true,
    isJain: true,
  },
  {
    id: 'mango-shake-jamun-cooler',
    name: 'Mango & Jamun Cooler Duo',
    category: 'Fresh Juices & Falooda',
    price: '₹240',
    numericPrice: 240,
    description: 'Creamy Alphonso Mango Milkshake paired with refreshing tangy Jamun Pomegranate Mint Mocktail, perfect for South Mumbai afternoons.',
    image: beveragesDuoImg,
    isBestseller: true,
    isVeg: true,
    isJain: true,
  },
];

export const CUISINE_CATEGORIES: {
  title: string;
  description: string;
  image: string;
  itemCount: string;
  category: MenuCategory;
}[] = [
  {
    title: 'South Indian & Dosas',
    description: 'Crisp rava & paper dosas, Mysore masala, steaming idlis, and fluffy wadas with fresh chutneys.',
    image: masalaDosaImg,
    itemCount: '50+ Items',
    category: 'Southern Treat',
  },
  {
    title: 'Mumbai Pav Bhaji & Tawa',
    description: 'Chef Bholu’s live tawa Pav Bhaji, Cheese Pav Bhaji, Jain Pav Bhaji, and sizzling Tawa Pulav.',
    image: chefPavBhajiImg,
    itemCount: '20+ Variations',
    category: 'Pav Bhaji & Tawa',
  },
  {
    title: 'Punjabi & Paneer Delicacies',
    description: 'Paneer Butter Masala, Diwani Handi, Dal Makhani, Kaju Masala & tandoori rotis.',
    image: paneerButterImg,
    itemCount: '70+ Curries & Breads',
    category: 'Punjabi Paneer',
  },
  {
    title: 'Starters & Appetizers',
    description: 'Cheese Cherry Pineapple on ice, Paneer Tikka, Crispy Corn, Spring Rolls & Hara Bhara Kababs.',
    image: cheeseCherryImg,
    itemCount: '35+ Starters',
    category: 'Tandoori & Starters',
  },
  {
    title: 'Indo-Chinese & Thai Wok',
    description: 'Triple Schezwan Rice, Hakka Noodles, Manchurian gravy, Thai curries & crispy starters.',
    image: noodlesImg,
    itemCount: '50+ Delicacies',
    category: 'Chinese Rice & Noodles',
  },
  {
    title: 'Fresh Juices, Shakes & Desserts',
    description: 'Royal Banana Split, Mango Cream, Sitafal Cream, Strawberry Milkshakes & Royal Faloodas.',
    image: dessertSplitImg,
    itemCount: '45+ Shakes & Desserts',
    category: 'Fresh Creams & Desserts',
  },
  {
    title: 'Jain Friendly Specialities',
    description: 'Dedicated delicacies cooked strictly without onion, garlic, or root vegetables.',
    image: jainThaliImg,
    itemCount: '60+ Jain Items',
    category: 'Jain Special',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Kanishka Veg Restaurant Exterior Signboard',
    category: 'Ambience',
    image: facadeSignboardImg,
    description: 'The illuminated grand exterior signboard and dark wood facade at Haji Ali Circle, Tardeo.',
  },
  {
    id: 'gal-2',
    title: 'Chef’s Live Pav Bhaji Cooking on Tawa',
    category: 'Signature',
    image: chefPavBhajiImg,
    description: 'Chef Bholu (SAF) preparing steaming Pav Bhaji on live iron tawa with buttery golden pav.',
  },
  {
    id: 'gal-3',
    title: 'Spacious Modern AC Dining Hall',
    category: 'Ambience',
    image: diningInteriorImg,
    description: 'Warm wood-paneled ceiling, brass globe chandeliers, and comfortable booth seating.',
  },
  {
    id: 'gal-4',
    title: 'Happy Family & Friends Dining Feast',
    category: 'Experiences',
    image: familyDiningImg,
    description: 'Guests and families enjoying wholesome pure vegetarian meals and celebrations together.',
  },
  {
    id: 'gal-5',
    title: 'Cheese Cherry Pineapple on Ice Platter',
    category: 'Starters & Drinks',
    image: cheeseCherryImg,
    description: 'Classic Bombay appetiser skewers nestled on crystal crushed ice with fresh mint leaves.',
  },
  {
    id: 'gal-6',
    title: 'Royal Banana Split Ice Cream Boat',
    category: 'Desserts',
    image: dessertSplitImg,
    description: 'Indulgent banana boat sundae with vanilla scoops, cherries, cashews, raisins, and strawberry syrup.',
  },
  {
    id: 'gal-7',
    title: 'Alphonso Mango Shake & Jamun Mocktail',
    category: 'Starters & Drinks',
    image: beveragesDuoImg,
    description: 'Chilled tropical beverages crafted with fresh fruit pulp and refreshing mint garnish.',
  },
  {
    id: 'gal-8',
    title: 'Fresh Strawberry Milkshake',
    category: 'Starters & Drinks',
    image: strawberryShakeImg,
    description: 'Thick seasonal strawberry milkshake garnished with fresh strawberry slices.',
  },
  {
    id: 'gal-9',
    title: 'Crispy Mysore Masala Dosa',
    category: 'Signature',
    image: masalaDosaImg,
    description: 'Golden crepe with spiced potato filling, coconut chutney, and steaming lentil sambar.',
  },
  {
    id: 'gal-10',
    title: 'Rich Paneer Butter Masala',
    category: 'Signature',
    image: paneerButterImg,
    description: 'Slow-simmered tomato and cashew cream gravy with tender cubes of cottage cheese.',
  },
];

export function getRestaurantStatus(now: Date = new Date()): {
  isOpen: boolean;
  statusText: string;
  currentMealSlot: MealSlot | null;
  nextSlotText: string;
} {
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTimeVal = hour * 60 + minute;

  const openTimeVal = 9 * 60; // 9:00 AM
  const closeTimeVal = 24 * 60; // 12:00 AM midnight

  const isOpen = currentTimeVal >= openTimeVal && currentTimeVal < closeTimeVal;

  let currentMealSlot: MealSlot | null = null;
  for (const slot of BUSINESS_INFO.mealTimings) {
    const slotStart = slot.startHour * 60 + slot.startMinute;
    const slotEnd = slot.endHour * 60 + slot.endMinute;
    if (currentTimeVal >= slotStart && currentTimeVal < slotEnd) {
      currentMealSlot = slot;
      break;
    }
  }

  let statusText = 'Open Now';
  let nextSlotText = '';

  if (isOpen) {
    if (currentMealSlot) {
      statusText = `Open Now • Serving ${currentMealSlot.name}`;
      nextSlotText = `Available until ${currentMealSlot.timeRange.split('–')[1]?.trim() || 'midnight'}`;
    } else {
      statusText = 'Open Now (9:00 AM – 12:00 AM)';
    }
  } else {
    statusText = 'Currently Closed (Opens at 9:00 AM)';
    nextSlotText = 'Open today from 9:00 AM – 12:00 AM';
  }

  return {
    isOpen,
    statusText,
    currentMealSlot,
    nextSlotText,
  };
}

export function buildWhatsAppOrderLink(
  items: { name: string; quantity: number; price: string }[] = [],
  customerNotes: string = '',
  deliveryDetails?: {
    name?: string;
    phone?: string;
    address?: string;
    gpsLink?: string;
  }
): string {
  const baseNumber = BUSINESS_INFO.whatsappRaw;
  if (items.length === 0) {
    const defaultMsg = encodeURIComponent(
      'Hello KANISHKA VEG. RESTAURANT, I would like to place an order from your complete menu. Please share details.'
    );
    return `https://wa.me/${baseNumber}?text=${defaultMsg}`;
  }

  let message = `*KANISHKA VEG. RESTAURANT - ORDER DRAFT*\n\n`;
  message += `🛒 *ORDERED ITEMS:*\n`;
  items.forEach((item, idx) => {
    message += `${idx + 1}. ${item.name} x ${item.quantity} (${item.price})\n`;
  });

  if (deliveryDetails?.name || deliveryDetails?.phone || deliveryDetails?.address || deliveryDetails?.gpsLink) {
    message += `\n📍 *DELIVERY DETAILS:*\n`;
    if (deliveryDetails.name?.trim()) {
      message += `👤 *Customer Name:* ${deliveryDetails.name.trim()}\n`;
    }
    if (deliveryDetails.phone?.trim()) {
      message += `📞 *Contact Number:* ${deliveryDetails.phone.trim()}\n`;
    }
    if (deliveryDetails.address?.trim()) {
      message += `🏠 *Delivery Address:* ${deliveryDetails.address.trim()}\n`;
    }
    if (deliveryDetails.gpsLink?.trim()) {
      message += `🗺️ *Live Google Maps Pin:*\n${deliveryDetails.gpsLink.trim()}\n`;
    }
  }

  if (customerNotes.trim()) {
    message += `\n📝 *Special Instructions / Dietary:* ${customerNotes.trim()}\n`;
  }

  message += `\nPlease confirm order acceptance and estimated delivery time. Thank you!`;
  return `https://wa.me/${baseNumber}?text=${encodeURIComponent(message)}`;
}
