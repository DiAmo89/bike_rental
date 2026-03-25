"use client";

import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/Category";

interface CategoryCardProps extends Category {
  bikesCount?: number;
}

export default function CategoryCard({ id, name, image, bikesCount }: CategoryCardProps) {
 
  const hasBikes = bikesCount && bikesCount > 0;
  
 
  const href = hasBikes 
    ? `/catalog?category=${encodeURIComponent(name)}` 
    : "/catalog";

  return (
    <Link href={href} className="group block text-center relative h-full">
      <div className="flex flex-col items-center h-full p-2 rounded-[2rem] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(230,255,41,0.5)] hover:-translate-y-2">
        
        <div className="relative aspect-square w-full overflow-hidden rounded-[1.8rem] bg-gray-50 border border-gray-100 transition-all duration-300 group-hover:border-transparent group-hover:bg-white">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 50vw, 15vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-3xl">
              🚲
            </div>
          )}
        </div>

        <h3 className="mt-4 text-base md:text-lg font-extrabold text-[#1e40af] leading-tight px-2">
          {name}
        </h3>
        
        <span className="text-[10px] text-gray-400 font-black uppercase mt-2 tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
          {hasBikes ? "Explore" : "All Bikes"}
        </span>

        <div className="w-0 h-1 bg-[#e6ff2a] mt-1.5 rounded-full transition-all duration-300 group-hover:w-8"></div>
      </div>
    </Link>
  );
}