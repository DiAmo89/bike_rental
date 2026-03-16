"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CatalogMenu from "../catalog-menu/index"; 
import { Bike } from "@/types/Bike";

export default function CatalogMenuWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
 
  // 1. Получаем текущие значения из URL
  const activeCategory = searchParams.get("category") || "all";
  const activeStatus = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sort") || "default";

  // 2. Загружаем категории прямо из байков (самый надежный способ)
  useEffect(() => {
    fetch("/api/bikes")
      .then((res) => res.json())
      .then((data: Bike[]) => { 
        // Вытаскиваем уникальные имена категорий
        const names = data
          .map((b) => b.category?.name)
          .filter((name): name is string => Boolean(name));
        
        const uniqueNames = Array.from(new Set(names));
        setCategories(uniqueNames);
      })
      .catch((err) => {
        console.error("Ошибка загрузки категорий в меню:", err);
      });
  }, []);

  // 3. Универсальная функция обновления URL
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Если выбрано "все" или "по умолчанию", удаляем параметр из URL
    if (value === "all" || value === "default" || value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    // Всегда перекидываем в /catalog, чтобы фильтры сработали
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <CatalogMenu
      categories={categories}
      activeCategory={activeCategory}
      onCategoryChange={(cat) => updateFilter("category", cat)}
      activeStatus={activeStatus}
      onStatusChange={(status) => updateFilter("status", status)}
      onSortChange={(sort) => updateFilter("sort", sort)}
      sortBy={sortBy} // Передаем sortBy, чтобы убрать ошибку в CatalogMenu
    />
  );
}