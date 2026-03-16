import CatalogFilters from "../catalog-filters";
import CatalogSort from "../catalog-sort";

// ДОБАВЛЯЕМ sortBy В ЭТОТ СПИСОК (Interface)
interface CatalogMenuProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeStatus: string;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  sortBy: string; // <-- ОБЯЗАТЕЛЬНО ТУТ
}

export default function CatalogMenu({
  categories,
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
  onSortChange,
  sortBy, // <-- И ТУТ В СКОБКАХ
}: CatalogMenuProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end gap-6">
        <div className="flex-[3]">
          <CatalogFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            activeStatus={activeStatus}
            onStatusChange={onStatusChange}
          />
        </div>
        <div className="flex-1">
          {/* ТЕПЕРЬ ПЕРЕДАЕМ sortBy В value */}
          <CatalogSort onSortChange={onSortChange} value={sortBy} />
        </div>
      </div>
    </div>
  );
}