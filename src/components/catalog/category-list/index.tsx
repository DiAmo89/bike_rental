"use client";
import React, { useEffect, useState } from 'react';
import CategoryCard from '../category-card';
import { Category } from '@/types/Category';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchBikes() {
      try {
        const res = await fetch('/api/bikes');
        const bikes = await res.json();
        const activeCategoriesMap = new Map();

        bikes.forEach((bike: any) => {
          if (bike.category && !activeCategoriesMap.has(bike.category.id)) {
            activeCategoriesMap.set(bike.category.id, {
              ...bike.category,
              bikesCount: 1 
            });
          } else if (bike.category) {
            const cat = activeCategoriesMap.get(bike.category.id);
            cat.bikesCount += 1;
          }
        });

        setCategories(Array.from(activeCategoriesMap.values()));
      } catch (e) {
        console.error("Error loading categories:", e);
      }
    }
    fetchBikes();
  }, []);

  // ЛОГИКА ОПРЕДЕЛЕНИЯ ШИРИНЫ (Кол-во в ряд)
  const total = categories.length;
  
  // Если категорий <= 10, делаем по 5 в ряд (базис 20%)
  // Если больше 10, делаем по 7 в ряд (базис ~14.28%)
  const itemBasis = total <= 10 
    ? "flex-[0_0_calc(50%-1rem)] sm:flex-[0_0_calc(33.33%-1rem)] lg:flex-[0_0_calc(20%-1.5rem)]" 
    : "flex-[0_0_calc(50%-1rem)] sm:flex-[0_0_calc(25%-1rem)] lg:flex-[0_0_calc(14.28%-1.5rem)]";

  return (
    <div className="w-full px-4">
      {/* flex-wrap: позволяет переносить на новый ряд
        justify-center: центрирует карточки, если в последнем ряду их меньше 
      */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className={itemBasis}>
            <CategoryCard {...cat} />
          </div>
        ))}
      </div>
    </div>
  );
}