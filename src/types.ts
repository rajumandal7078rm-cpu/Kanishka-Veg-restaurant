export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: string;
  numericPrice?: number;
  description: string;
  image: string;
  isBestseller?: boolean;
  isJain?: boolean;
  isVeg: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  portionNote?: string;
}

export type MenuCategory =
  | 'All'
  | 'Southern Treat'
  | 'Dosa & Creations'
  | 'For Fasting'
  | 'Sandwiches'
  | 'Pizza & Pasta'
  | 'Pav Bhaji & Tawa'
  | 'Lite Bites & Soups'
  | 'Tandoori & Starters'
  | 'Chinese Starters'
  | 'Punjabi Paneer'
  | 'Punjabi Specialities'
  | 'Dal & Basmati Khazana'
  | 'Roti Ki Tokri'
  | 'Chinese Rice & Noodles'
  | 'Chinese & Thai Mains'
  | 'Fresh Juices & Falooda'
  | 'Milk Shakes'
  | 'Fresh Creams & Desserts'
  | 'Mocktails & Mojitos'
  | 'Lassi, Coolers & Beverages'
  | 'Jain Special';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Ambience' | 'Signature' | 'South Indian' | 'Punjabi' | 'Desserts' | 'Starters & Drinks' | 'Experiences';
  image: string;
  description: string;
}

export interface MealSlot {
  name: string;
  timeRange: string;
  description: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  businessType: string;
  primaryPhone: string;
  mobile: string;
  whatsapp: string;
  whatsappRaw: string;
  googleMapsUrl: string;
  addressPrimary: string;
  addressAlternative: string;
  landmark: string;
  hours: string;
  mealTimings: MealSlot[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}
