import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useCatalogFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. Извлекаем текущие значения (Memoized)
  const filters = useMemo(() => ({
    category: searchParams.get("category") || "all",
    status: searchParams.get("status") || "all",
    sort: searchParams.get("sort") || "default",
    start: searchParams.get("start") || "",
    end: searchParams.get("end") || "",
  }), [searchParams]);

  // 2. Внутренняя функция применения (Private)
  const apply = useCallback((updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    const queryString = newParams.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(newUrl, { scroll: false });
    sessionStorage.setItem("lastCatalogUrl", newUrl);
  }, [searchParams, pathname, router]);

  // 3. Публичные функции-экшены
  const setCategory = (category: string) => apply({ category });
  const setStatus = (status: string) => apply({ status });
  const setSort = (sort: string) => apply({ sort });
  const setDates = (start: string, end: string) => apply({ start, end });
  
  const reset = () => {
    router.push(pathname);
    sessionStorage.removeItem("lastCatalogUrl");
  };

  return {
    ...filters,
    setCategory,
    setStatus,
    setSort,
    setDates,
    reset
  };
};