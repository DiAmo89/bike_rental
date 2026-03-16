"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BikeImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  return (
    <>
      
      <div 
        className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-lg cursor-zoom-in group"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
             <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Click to zoom</span>
        </div>
      </div>

   
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X size={40} />
          </button>
          
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
}