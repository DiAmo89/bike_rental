import React from 'react';

interface CatalogFiltersProps {
categories: string[];
activeCategory: string;
onCategoryChange: (category: string) => void;
activeStatus: string;
onStatusChange: (status: string) => void;
}

export default function CatalogFilters({
categories,
activeCategory,
onCategoryChange,
activeStatus,
onStatusChange
}: CatalogFiltersProps) {
return (
<div className="flex flex-col md:flex-row gap-6">
<div className="flex-1">
<label className="block text-xs font-black mb-2 uppercase tracking-widest text-gray-400">Тип велосипеда</label>
<select value={activeCategory} onChange={(e) => onCategoryChange(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg p-2.5">
<option value="all">Все категории</option>
{categories.map((cat) => (
<option key={cat} value={cat}>{cat}</option>
))}
</select>
</div>
<div className="flex-1">
<label className="block text-xs font-black mb-2 uppercase tracking-widest text-gray-400">Статус</label>
<select value={activeStatus} onChange={(e) => onStatusChange(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg p-2.5">
<option value="all">Любой статус</option>
<option value="Available">Доступен</option>
<option value="In Repair">В ремонте</option>
</select>
</div>
</div>
);
}