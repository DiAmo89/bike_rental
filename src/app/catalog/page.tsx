"use client";
import React, { useEffect, useState, useMemo } from "react";
import { getBikes } from "@/api/getBikes";
import { Bike } from "@/types/Bike";
import BikeCard from "@/components/catalog/BikeCard/BikeCard";
import CatalogMenu from "@/components/catalog/CatalogMenu/catalogMenu";
import CatalogPagination from "@/components/catalog/CatalogPagination/CatalogPagination";
import CategoryCard from "@/components/catalog/CategoryCard//CategoryCard";
import { Category } from "@/types/Category";

export default function CatalogPage() {
  const [allBikes, setAllBikes] = useState<Bike[]>([]);
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  /****************Карточки категорий для Димы */
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    import("@/api/getCategories").then((m) => {
      m.getCategories().then(setCategories);
    });
  }, []);
  /******************************************* */

  useEffect(() => {
    getBikes().then((data) => {
      setAllBikes(data);
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
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-black mb-10">Catalog</h1>
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

      {/* карточки категорий для Димы */}
      <div className="mb-12">
        <h2 className="text-2xl font-black uppercase mb-6 px-4">
          Category (Example for Home)
        </h2>
        <div className="flex overflow-x-auto pb-4 gap-4 px-4 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
          {" "}
          {categories.map((cat) => (
            <div key={cat.id} className="min-w-[200px] md:min-w-full">
              {" "}
              <CategoryCard {...cat} />{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>
      {/* карточки категорий для Димы */}
    </div>
  );
}
