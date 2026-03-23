"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import CatalogMenu from "@/components/catalog/catalog-menu-wrapper";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Показываем меню фильтров только на главной странице каталога
  // и скрываем его, если пользователь зашел внутрь конкретного байка
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
              <CatalogMenu />
            </Suspense>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
