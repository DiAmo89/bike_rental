"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CatalogMenu from "../catalog-menu/index"; 
import { Bike } from "@/types/Bike";

export default function CatalogMenuWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [categories, setCategories] = useState<string[]>([]);

  // 1. Вычисляем активные значения. 
  // Если в URL есть параметры — берем их. Если нет (мы в карточке) — берем из sessionStorage.
  const { activeCategory, activeStatus, sortBy } = useMemo(() => {
    const hasUrlParams = searchParams.has("category") || searchParams.has("status") || searchParams.has("sort");

    if (hasUrlParams) {
      return {
        activeCategory: searchParams.get("category") || "all",
        activeStatus: searchParams.get("status") || "all",
        sortBy: searchParams.get("sort") || "default",
      };
    }

    // Если параметров в URL нет, проверяем память
    if (typeof window !== "undefined") {
      const savedUrl = sessionStorage.getItem("lastCatalogUrl");
      if (savedUrl && savedUrl.includes("?")) {
        const savedParams = new URLSearchParams(savedUrl.split("?")[1]);
        return {
          activeCategory: savedParams.get("category") || "all",
          activeStatus: savedParams.get("status") || "all",
          sortBy: savedParams.get("sort") || "default",
        };
      }
    }

    return { activeCategory: "all", activeStatus: "all", sortBy: "default" };
  }, [searchParams]); // Важно: пересчитываем при каждом изменении URL

  // 2. Загрузка списка категорий
  useEffect(() => {
    fetch("/api/bikes")
      .then((res) => res.json())
      .then((data: Bike[]) => { 
        const names = data
          .map((b) => b.category?.name)
          .filter((name): name is string => Boolean(name));
        setCategories(Array.from(new Set(names)));
      })
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  // 3. Универсальная функция обновления
  const updateFilter = (key: string, value: string) => {
    // Создаем новый объект параметров, основываясь на текущих АКТИВНЫХ значениях
    const newParams = new URLSearchParams();

    // Берем текущий срез данных из меню
    const current = { activeCategory, activeStatus, sortBy };

    // Обновляем только то поле, которое изменил пользователь
    if (key === "category") current.activeCategory = value;
    if (key === "status") current.activeStatus = value;
    if (key === "sort") current.sortBy = value;

    // Формируем чистую строку параметров для URL
    if (current.activeCategory !== "all") newParams.set("category", current.activeCategory);
    if (current.activeStatus !== "all") newParams.set("status", current.activeStatus);
    if (current.sortBy !== "default") newParams.set("sort", current.sortBy);

    // Всегда отправляем на /catalog, чтобы сбросить путь карточки, если мы были в ней
    router.push(`/catalog?${newParams.toString()}`, { scroll: false });
  };

  return (
    <CatalogMenu
      categories={categories}
      activeCategory={activeCategory}
      onCategoryChange={(cat) => updateFilter("category", cat)}
      activeStatus={activeStatus}
      onStatusChange={(status) => updateFilter("status", status)}
      onSortChange={(sort) => updateFilter("sort", sort)}
      sortBy={sortBy}
    />
  );
}
