"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBikes } from "@/api/getBikes";
import { Bike } from "@/types/Bike";
import Link from "next/link";

export default function BikeDetailPage() {
  const { id } = useParams();
  const [bike, setBike] = useState<Bike | null>(null);

  useEffect(() => {
    getBikes().then((data) => {
      const found = data.find((b) => b.id.toString() === id);
      setBike(found || null);
    });
  }, [id]);

  if (!bike)
    return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className="container mx-auto py-20 px-4">
      <Link
        href="/catalog"
        className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-black transition-colors mb-8 group"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">
          ←
        </span>
        RETURN TO CATALOG
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-96 w-full overflow-hidden rounded-3xl bg-gray-100 shadow-lg">
          {bike.image ? (
            <img
              src={bike.image}
              alt={bike.model}
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-5xl font-black mb-4 uppercase">{bike.model}</h1>
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
            {bike.category.name}
          </div>
          <p className="text-3xl font-black text-gray-900 mb-8">
            {bike.price} ₽ / час
          </p>

          <div className="space-y-4 mb-10">
            <p className="text-gray-500 leading-relaxed">{bike.description}</p>
            <div className="flex gap-4">
              <span className="bg-gray-100 p-2 rounded text-sm">
                🛠 Available: {bike.status}
              </span>
            </div>
          </div>

          <button className="w-full md:w-auto bg-black text-white px-12 py-5 rounded-2xl font-black hover:scale-105 transition-transform uppercase tracking-widest shadow-xl">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
