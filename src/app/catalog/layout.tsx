"use client";

import { Suspense, useState, useEffect } from "react"; 
import CatalogMenu from "@/components/catalog/catalog-menu-wrapper";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
     
      else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section className="pt-0">
      
      <div className={`
        sticky top-15 z-30 bg-white/95 backdrop-blur-md pt-5 pb-1
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}>
        <div className="container mx-auto px-1">
          <Suspense
            fallback={
              <div className="h-5 w-full bg-gray-50 animate-pulse rounded-xl" />
            }
          >
            <CatalogMenu />
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-1 pt-20">{children}</div>
    </section>
  );
}