'use client';
import React, { useEffect, useState, useMemo } from "react";
import { getBikes } from "@/api/getBikes";
import { Bike } from "@/types/bike";
import BikeCard from "@/components/catalog/BikeCard/BikeCard";
import CatalogMenu from "@/components/catalog/CatalogMenu/catalogMenu";

export default function CatalogPage() {
const [allBikes, setAllBikes] = useState<Bike[]>([]);
const [catFilter, setCatFilter] = useState('all');
const [statusFilter, setStatusFilter] = useState('all');
const [loading, setLoading] = useState(true);
const [sortBy, setSortBy] = useState('default');

useEffect(() => {
getBikes().then(data => {
setAllBikes(data);
setLoading(false);
});
}, []);

const filteredBikes = useMemo(() => {
let result = [...allBikes];
if (catFilter !== 'all') {
result = result.filter(b => b.category.name === catFilter);
}
if (statusFilter !== 'all') {
result = result.filter(b => b.status === statusFilter);
}
if (sortBy === "low") {
result.sort((a, b) => a.price - b.price);
} 
else if (sortBy === 'high') {
result.sort((a, b) => b.price - a.price);
}
return result;
}, [allBikes, catFilter, statusFilter,sortBy]);

const uniqueCategories = useMemo(() => {
return Array.from(new Set(allBikes.map(b => b.category.name)));
}, [allBikes]);

if (loading) return <div className="p-20 text-center font-bold">Загрузка...</div>;

return (

<div className="container mx-auto py-10 px-4">
<h1 className="text-4xl font-black mb-10">Каталог</h1>
<CatalogMenu
categories={uniqueCategories}
activeCategory={catFilter}
onCategoryChange={setCatFilter}
activeStatus={statusFilter}
onStatusChange={setStatusFilter}
onSortChange={setSortBy}
/>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{filteredBikes.map(bike => (
<BikeCard key={bike.id} bike={bike} />
))}
</div>
</div>
);
}