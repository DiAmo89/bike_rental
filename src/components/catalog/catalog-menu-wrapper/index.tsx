"use client";

import React, { useEffect, useState } from "react";
import CatalogMenu from "../catalog-menu/index"; 
import { useCatalogFilters } from "@/hooks/use-catalog-filters";
import { Bike } from "@/types/Bike";

export default function CatalogMenuWrapper() {
  const [categories, setCategories] = useState<string[]>([]);
  
    const f = useCatalogFilters();

  useEffect(() => {
    fetch("/api/bikes")
      .then((res) => res.json())
      .then((data: Bike[]) => { 
        const names = data
          .map((b) => b.category?.name)
          .filter((name): name is string => Boolean(name));
        setCategories(Array.from(new Set(names)));
      })
      .catch(err => console.error(err));
  }, []);

  
  const handleDateChange = (key: "start" | "end", value: string) => {
    if (key === "start") {
      f.setDates(value, f.end); 
    } else {
      f.setDates(f.start, value);
    }
  };

  return (
    <CatalogMenu
     
      categories={categories}
      activeCategory={f.category}
      activeStatus={f.status}
      sortBy={f.sort}
      startDate={f.start}
      endDate={f.end}
      
      
      onCategoryChange={f.setCategory}
      onStatusChange={f.setStatus}
      onSortChange={f.setSort}
      onReset={f.reset} 
      
     
      onDateChange={handleDateChange} 
    />
  );
}