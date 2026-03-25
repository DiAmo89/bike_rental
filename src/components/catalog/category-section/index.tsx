"use client";

import { useEffect, useState } from "react";
import { bikesService } from "@/services/bikes.service";
import CategoryCard from "@/components/catalog/category-card";
import { Category } from "@/types/Category";

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
   
    const load = async () => {
      const data = await bikesService.getAllCategories();
      
      const safeData = data.map(c => ({
        ...c,
        image: c.image ?? ""
      }));
      setCategories(safeData);
    };
    load();
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="space-y-12 mt-20">
      <div className="text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2">
          Our Fleet Categories
        </h2>
        <div className="w-8 h-[2px] bg-[#e6ff2a] mx-auto"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-16">
        {categories.map((cat) => (
          <CategoryCard 
            key={cat.id}
            id={cat.id}
            name={cat.name}
            image={cat.image}
          />
        ))}
      </div>
    </div>
  );
}