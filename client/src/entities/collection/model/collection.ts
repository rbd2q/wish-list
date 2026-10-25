export enum CollectionIcon {
  FOLDER = 'folder',
  HEART = 'heart',
  STAR = 'star',
  GIFT = 'gift',
  PARTY_POPPER = 'party-popper',
  CAKE = 'cake',
  SHOPPING_BAG = 'shopping-bag',
  LAPTOP = 'laptop',
  SMARTPHONE = 'smartphone',
  TABLET = 'tablet',
  HEADPHONES = 'headphones',
  WATCH = 'watch',
  CAMERA = 'camera',
  GAMEPAD_2 = 'gamepad-2',
  KEYBOARD = 'keyboard',
  MONITOR = 'monitor',
  HOUSE = 'house',
  SOFA = 'sofa',
  BED_DOUBLE = 'bed-double',
  LAMP_DESK = 'lamp-desk',
  COOKING_POT = 'cooking-pot',
  UTENSILS = 'utensils',
  COFFEE = 'coffee',
  BATH = 'bath',
  REFRIGERATOR = 'refrigerator',
  SHIRT = 'shirt',
  FOOTPRINTS = 'footprints',
  GLASSES = 'glasses',
  BACKPACK = 'backpack',
  GEM = 'gem',
  DUMBBELL = 'dumbbell',
  BIKE = 'bike',
  TENT = 'tent',
  MOUNTAIN = 'mountain',
  VOLLEYBALL = 'volleyball',
  PLANE = 'plane',
  TRAIN_FRONT = 'train-front',
  CAR = 'car',
  LUGGAGE = 'luggage',
  MAP_PIN = 'map-pin',
  BOOK_OPEN = 'book-open',
  GRADUATION_CAP = 'graduation-cap',
  MUSIC = 'music',
  GUITAR = 'guitar',
  PALETTE = 'palette',
  BRIEFCASE = 'briefcase',
  FLOWER_2 = 'flower-2',
  LEAF = 'leaf',
  PAW_PRINT = 'paw-print',
  HEART_PULSE = 'heart-pulse',
}

export enum CollectionColor {
  SKY = 'sky',
  EMERALD = 'emerald',
  VIOLET = 'violet',
  ROSE = 'rose',
  AMBER = 'amber',
  RED = 'red',
  TEAL = 'teal',
  INDIGO = 'indigo',
  LIME = 'lime',
  ORANGE = 'orange',
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  icon: CollectionIcon;
  color: CollectionColor;
  wishCount: number;
  previewImages: string[];
  createdAt: string;
  updatedAt: string;
}

export type CollectionValues = Pick<Collection, 'name' | 'description' | 'icon' | 'color'>;
