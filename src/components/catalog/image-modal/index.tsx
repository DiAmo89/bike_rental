"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react"; 

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
 
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    
    
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
     
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer p-4 md:p-10"
      onClick={onClose} 
    >
    
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-2 rounded-full"
      >
        <X size={32} />
      </button>

     
      <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in"
        />
      </div>
    </div>
  );
}