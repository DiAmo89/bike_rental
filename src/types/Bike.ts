import { Category } from "./Category";

export interface Bike {
  id: string;
  model: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  status: "Available" | "In Repair";
}
