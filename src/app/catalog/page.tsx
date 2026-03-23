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
  
  const catFilter = searchParams.get("category") || "all";
  const statusFilter = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sort") || "default";

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

 
  
  useEffect(() => {
    const savedUrl = sessionStorage.getItem("lastCatalogUrl");
    const currentQuery = window.location.search;

    
    if (!currentQuery && savedUrl && savedUrl.includes('?')) {
      
      router.replace(savedUrl);
    }
  }, []); 

 
  useEffect(() => {
    const currentFullUrl = window.location.pathname + window.location.search;

    if (window.location.pathname === '/catalog') {
      sessionStorage.setItem("lastCatalogUrl", currentFullUrl);
    }
  }, [searchParams]);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/bikes");
        const data: Bike[] = await res.json();
        setAllBikes(data);
      } catch (e) {
        console.error("Load error:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  
  const filteredBikes = useMemo(() => {
    let result = [...allBikes];
    
    if (catFilter !== "all") {
      result = result.filter((b) => 
        b.category?.name?.toLowerCase() === catFilter.toLowerCase()
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
  }, [catFilter, statusFilter, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 font-medium text-gray-500 uppercase font-bold">Loading bikes...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-20 px-4">
      {filteredBikes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
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
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400">
          <p className="text-xl">No bikes found for category &quot;{catFilter}&quot;</p>
          <button 
            onClick={() => router.push('/catalog')}
            className="mt-4 text-blue-500 hover:text-blue-600 font-medium underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      

    </div>
  );
}


export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-gray-400 font-bold uppercase">Preparing Catalog...</div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}