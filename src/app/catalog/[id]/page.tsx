import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bikesService } from "@/services/bikes.service";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BikeDetailPage({ params }: PageProps) {
  
  const { id } = await params;

 
  const bike = await bikesService.getBikeById(id);

  
  if (!bike) {
    notFound();
  }

  const displayPrice = Number(bike.pricePerDay);
  const displayStatus = bike.isActive ? "Available" : "Busy";

  return (
    <div className="container mx-auto py-20 px-4">
      
      <Link
        href="/catalog"
        className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-black transition-colors mb-8 group uppercase"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">
          ←
        </span>
        Return to catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-lg">
          {bike.image ? (
            <img
              src={bike.image}
              alt={`${bike.brand} ${bike.model}`}
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 font-bold">
              NO IMAGE
            </div>
          )}
        </div>

        
        <div>
          <h1 className="text-5xl font-black mb-4 uppercase leading-tight">
            {bike.brand} <span className="text-gray-400">{bike.model}</span>
          </h1>

         
          <div className="inline-block bg-[#e6ff2a] text-black px-4 py-1 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
             {displayStatus}
          </div>

          <p className="text-4xl font-black text-gray-900 mb-8">
            {displayPrice.toLocaleString()} ₽ <span className="text-lg text-gray-400">/ day</span>
          </p>

          <div className="space-y-4 mb-10 border-t border-gray-100 pt-6">
            <h3 className="font-bold uppercase tracking-widest text-sm text-gray-400">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {bike.description || "This premium model is ready for your next adventure. Contact us for technical specifications."}
            </p>
          </div>

          <button className="w-full md:w-auto bg-black text-white px-12 py-5 rounded-2xl font-black hover:bg-gray-800 transition-all uppercase tracking-widest shadow-xl active:scale-95">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}