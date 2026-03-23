"use client";

import React, { useEffect, useState } from "react";
import CatalogMenu from "../catalog-menu/index";
import { useCatalogFilters } from "@/hooks/use-catalog-filters";
import { Bike } from "@/types/Bike";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CatalogMenuWrapper() {
  const [categories, setCategories] = useState<string[]>([]);
  const f = useCatalogFilters();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/api/bikes")
      .then((res) => res.json())
      .then((data: Bike[]) => {
        const names = data
          .map((b) => b.category?.name)
          .filter((name): name is string => Boolean(name));
        setCategories(Array.from(new Set(names)));
      })
      .catch((err) => console.error("Fetch categories error:", err));
  }, []);

  const navigateWithFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <CatalogMenu
      categories={categories}
      activeCategory={f.category}
      activeStatus={f.status}
      sortBy={f.sort}
      startDate={f.start}
      endDate={f.end}
      onCategoryChange={(cat) => {
        f.setCategory(cat);
        navigateWithFilter("category", cat);
      }}
      onStatusChange={(status) => {
        f.setStatus(status);
        navigateWithFilter("status", status);
      }}
      onSortChange={(sort) => {
        f.setSort(sort);
        navigateWithFilter("sort", sort);
      }}
      onDateChange={(key, value) => {
        if (key === "start") {
          const newEndDate = f.end && value > f.end ? value : f.end;
          f.setDates(value, newEndDate);
          navigateWithFilter("start", value);
          if (newEndDate) navigateWithFilter("end", newEndDate);
        } else {
          f.setDates(f.start, value);
          navigateWithFilter("end", value);
        }
      }}
      onReset={() => {
        f.reset();
        router.push("/catalog");
      }}
    />
  );
}
