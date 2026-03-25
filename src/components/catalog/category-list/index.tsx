"use client";

import React, { useEffect, useState } from 'react';
import CategoryCard from '../category-card';
import { Category } from '@/types/Category';


interface BikeWithCategory {
  id: string;
  name: string;
  category: Category | null;
}


interface CategoryWithCount extends Category {
  bikesCount: number;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveCategories() {
      try {
        const res = await fetch('/api/bikes');
        if (!res.ok) throw new Error("Failed to fetch bikes");
        
        const bikes: BikeWithCategory[] = await res.json();

       
        const activeCategoriesMap = new Map<string, CategoryWithCount>();

        bikes.forEach((bike) => {
          if (bike.category && bike.category.id) {
            const categoryId = bike.category.id;
            
            if (!activeCategoriesMap.has(categoryId)) {
              activeCategoriesMap.set(categoryId, {
                ...bike.category,
                bikesCount: 1
              });
            } else {
              const existing = activeCategoriesMap.get(categoryId);
              if (existing) {
                existing.bikesCount += 1;
              }
            }
          }
        });

        setCategories(Array.from(activeCategoriesMap.values()));
      } catch (e) {
        console.error("Error loading categories from bikes:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveCategories();
  }, []);

  if (loading) return <div className="w-full text-center py-10">Loading categories...</div>;
  if (categories.length === 0) return null;

  
  const total = categories.length;
  const itemBasis = total <= 10 
    ? "flex-[0_0_calc(50%-1rem)] sm:flex-[0_0_calc(33.33%-1rem)] lg:flex-[0_0_calc(20%-1.5rem)]" 
    : "flex-[0_0_calc(50%-1rem)] sm:flex-[0_0_calc(25%-1rem)] lg:flex-[0_0_calc(14.28%-1.5rem)]";

  return (
    <div className="w-full px-4">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className={itemBasis}>
            <CategoryCard 
              id={cat.id}
              name={cat.name}
              image={cat.image}
              bikesCount={cat.bikesCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
}