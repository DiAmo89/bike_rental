"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

export default function BikeImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1); 

  
useEffect(() => {
  if (isOpen) {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
   
      setScale(1); 
    };
  }
}, [isOpen]);

 
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      
      setScale((prev) => Math.min(prev + 0.2, 3));
    } else {
     
      setScale((prev) => Math.max(prev - 0.2, 0.5));
    }
  };

  return (
    <>
    
      <div 
        className="relative w-full h-full overflow-hidden cursor-zoom-in group flex items-center justify-center p-6 bg-white"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors flex items-center justify-center pointer-events-none">
             <span className="opacity-0 group-hover:opacity-100 transition-all bg-white/90 shadow-xl text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
               Click to zoom 🔍
             </span>
        </div>
      </div>

   
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-hidden"
          onWheel={handleWheel} 
          onClick={() => setIsOpen(false)}
        >
        
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold pointer-events-none">
            <ZoomOut size={14} />
            <span>{Math.round(scale * 100)}%</span>
            <ZoomIn size={14} />
          </div>

          <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-all z-[1000]">
            <X size={32} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <img
              src={src}
              alt={alt}
              style={{ transform: `scale(${scale})` }} 
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl transition-transform duration-200 ease-out pointer-events-auto"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </>
  );
}