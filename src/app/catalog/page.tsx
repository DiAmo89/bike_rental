"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Bike } from "@/types/Bike";
import BikeCard from "@/components/catalog/bike-card";
import CatalogMenu from "@/components/catalog/catalog-menu";
import CatalogPagination from "@/components/catalog/catalog-pagination";


export default function CatalogPage() {
  const [allBikes, setAllBikes] = useState<Bike[]>([]);
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    fetch("/api/bikes")
      .then((res) => {
        if (!res.ok) throw new Error("Error loading");
        return res.json();
      })
      .then((data) => {
        setAllBikes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredBikes = useMemo(() => {
    let result = [...allBikes];
    if (catFilter !== "all") {
      result = result.filter((b) => b.category.name === catFilter);
    }
    if (statusFilter !== "all") {
      result = result.filter((b) => b.status === statusFilter);
    }
    if (sortBy === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [allBikes, catFilter, statusFilter, sortBy]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(allBikes.map((b) => b.category.name)));
  }, [allBikes]);

  const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);

  const paginatedBikes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBikes.slice(start, start + itemsPerPage);
  }, [filteredBikes, currentPage, itemsPerPage]);

  if (loading)
    return <div className="p-20 text-center font-bold">Loading...</div>;
  const handleItemsPerPageChange = (newAmount: number) => {
    setItemsPerPage(newAmount);
    setCurrentPage(1); // "сброс" на 1-ю страницу
  };

  return (
    <div className="container mx-auto py-10 px-4 mt-5">
      <CatalogMenu
        categories={uniqueCategories}
        activeCategory={catFilter}
        onCategoryChange={setCatFilter}
        activeStatus={statusFilter}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paginatedBikes.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={filteredBikes.length}
        step={3}
      />
    </div>
  );
}
