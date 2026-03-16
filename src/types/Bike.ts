import { Category } from "./Category";

export interface Bike {
  id: string;
  brand: string;
  model: string;
  pricePerDay: number; 
  category: Category;
  image: string | null;
  description: string | null;
  isActive: boolean;
}