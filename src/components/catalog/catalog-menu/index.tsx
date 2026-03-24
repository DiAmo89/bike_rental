"use client";

import CatalogFilters from "../catalog-filters";
import CatalogSort from "../catalog-sort";

interface CatalogMenuProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeStatus: string;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  sortBy: string;
  startDate: string;
  endDate: string;
  onDateChange: (key: "start" | "end", value: string) => void;
  onReset: () => void;
}

export default function CatalogMenu(props: CatalogMenuProps) {
  return (
    <div className="bg-gray-100/50 p-2 md:p-3 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full">
        <div className="flex-1">
          <CatalogFilters {...props} />
        </div>
        <div className="w-full md:w-[180px] border-t md:border-t-0 border-gray-200 pt-2 md:pt-0">
          <CatalogSort onSortChange={props.onSortChange} value={props.sortBy} />
        </div>
      </div>
    </div>
  );
}