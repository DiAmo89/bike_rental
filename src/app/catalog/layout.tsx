import { Suspense } from "react"; // 1. Импортируем Suspense
import CatalogMenu from "@/components/catalog/catalog-menu-wrapper";

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pt-20">
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md pt-5 pb-2">
        <div className="container mx-auto px-4">
          {/* 2. Оборачиваем меню. fallback — это то, что будет видно доли секунды при загрузке */}
          <Suspense fallback={<div className="h-12 w-full bg-gray-50 animate-pulse rounded-xl" />}>
            <CatalogMenu />
          </Suspense>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}