import React from "react";

interface CatalogSortProps {
  onSortChange: (value: string) => void;
}

export default function CatalogSort({ onSortChange }: CatalogSortProps) {
  return (
    <div className="w-full">
      <label className="block text-xs font-black mb-2 uppercase tracking-widest text-gray-400">
        Price
      </label>
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 shadow-sm"
      >
        <option value="default">By default</option>
        <option value="low">Cheap first</option>
        <option value="high">Expensive first</option>
      </select>
    </div>
  );
}
