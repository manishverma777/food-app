export interface Product {
  id: string;
  name: string;
  unit: string;
  price: string;
  category: string;
  image: string;
  favorite?: boolean;
  description: string;
  quality: string;
  origin: string;
  storage: string;
  delivery: string;
  nutrition: string[];
}

export type CartItems = Record<string, number>;
