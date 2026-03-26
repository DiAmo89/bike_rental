"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Bike } from "@/types/Bike";
import BikeCard from "@/components/catalog/bike-card";
import CatalogPagination from "@/components/catalog/catalog-pagination";

function CatalogContent() {
  const [allBikes, setAllBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

 
  const currentQueryParams = searchParams.toString();

  const catFilter = searchParams.get("category") || "all";
  const statusFilter = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sort") || "default";
  const startDate = searchParams.get("start") || ""; 
  const endDate = searchParams.get("end") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const currentFullUrl = window.location.pathname + window.location.search;
    if (window.location.pathname === '/catalog') {
      sessionStorage.setItem("lastCatalogUrl", currentFullUrl);
    }
  }, [searchParams]);

  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); 
      try {
        const query = new URLSearchParams();
        if (startDate) query.set("start", startDate);
        if (endDate) query.set("end", endDate);

        const res = await fetch(`/api/bikes?${query.toString()}`);
        const data: Bike[] = await res.json();
        setAllBikes(data);
      } catch (e) {
        console.error("Load error:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [startDate, endDate]); 

  
  const filteredBikes = useMemo(() => {
    let result = [...allBikes];

    if (catFilter !== "all") {
      result = result.filter(
        (b) => b.category?.name?.toLowerCase() === catFilter.toLowerCase()
      );
    }

    if (statusFilter !== "all") {
      const isAvail = statusFilter === "Available";
      result = result.filter((b) => b.isActive === isAvail);
    }

    if (sortBy === "low") {
      result.sort((a, b) => Number(a.pricePerDay) - Number(b.pricePerDay));
    } else if (sortBy === "high") {
      result.sort((a, b) => Number(b.pricePerDay) - Number(a.pricePerDay));
    }

    return result;
  }, [allBikes, catFilter, statusFilter, sortBy]);

  
  const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);
  const safePage = currentPage > totalPages && totalPages > 0 ? 1 : currentPage;
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedBikes = filteredBikes.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [catFilter, statusFilter, sortBy, startDate, endDate]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        <span className="mt-4 font-black uppercase tracking-widest text-xs text-gray-500">
          Checking availability...
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-20">
      {filteredBikes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBikes.map((bike) => (
              <BikeCard 
                key={bike.id} 
                bike={bike} 
              
                searchParams={currentQueryParams} 
              />
            ))}
          </div>
          <div className="mt-12">
            <CatalogPagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(n) => {
                setItemsPerPage(n);
                setCurrentPage(1);
              }}
              totalItems={filteredBikes.length}
              step={3}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-[3rem] text-gray-400">
          <p className="font-black uppercase tracking-widest text-sm">
            No bikes found for these dates or filters
          </p>
          <button
            onClick={() => router.push("/catalog")}
            className="mt-6 text-xs font-black uppercase tracking-widest border-b-2 border-black text-black hover:opacity-60 transition-opacity"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[400px] flex items-center justify-center font-black uppercase tracking-widest text-xs">
        Loading Catalog...
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}