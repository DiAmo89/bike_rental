"use client";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import CatalogMenuWrapper from "@/components/catalog/catalog-menu-wrapper";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isMainCatalogPage = pathname === "/catalog";

  return (
    <section className="pt-20">
      {isMainCatalogPage && (
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md pt-5 pb-2">
          <div className="container mx-auto px-4">
            <Suspense
              fallback={
                <div className="h-12 w-full bg-gray-50 animate-pulse rounded-xl" />
              }
            >
              <CatalogMenuWrapper />
            </Suspense>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
