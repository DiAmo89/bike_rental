"use client";

import React from "react";

interface CatalogSortProps {
  onSortChange: (value: string) => void;
  value: string; 
}

export default function CatalogSort({ onSortChange, value }: CatalogSortProps) {
  return (
    <div className="w-full">
      <label className="sr-only">Sort</label>
      <select
        value={value} 
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full bg-white border border-gray-200 text-gray-700 text-[12px] font-medium rounded-lg px-3 h-[38px] md:h-[42px] outline-none appearance-none cursor-pointer"
      >
        <option value="default">Sort: Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  );
}