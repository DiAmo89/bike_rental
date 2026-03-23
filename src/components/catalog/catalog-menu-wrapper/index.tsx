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

  
  const { activeCategory, activeStatus, sortBy } = useMemo(() => {
    const hasUrlParams = searchParams.has("category") || searchParams.has("status") || searchParams.has("sort");

    if (hasUrlParams) {
      return {
        activeCategory: searchParams.get("category") || "all",
        activeStatus: searchParams.get("status") || "all",
        sortBy: searchParams.get("sort") || "default",
      };
    }

    
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
  }, [searchParams]); 

  
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

  
  const updateFilter = (key: string, value: string) => {
   
    const newParams = new URLSearchParams();

  
    const current = { activeCategory, activeStatus, sortBy };

   
    if (key === "category") current.activeCategory = value;
    if (key === "status") current.activeStatus = value;
    if (key === "sort") current.sortBy = value;

    
    if (current.activeCategory !== "all") newParams.set("category", current.activeCategory);
    if (current.activeStatus !== "all") newParams.set("status", current.activeStatus);
    if (current.sortBy !== "default") newParams.set("sort", current.sortBy);

   
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
