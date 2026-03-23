import CatalogFilters from "../catalog-filters";
import CatalogSort from "../catalog-sort";


interface CatalogMenuProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeStatus: string;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
  sortBy: string; 
  startDate: string;
  endDate: string;
  onDateChange: (key: "start" | "end", value: string) => void;
  onReset: () => void;
}

export default function CatalogMenu({
  categories,
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
  onSortChange,
  sortBy, 
  startDate,
  endDate,
  onDateChange,
  onReset,
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
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
            onReset={onReset}
          />
        </div>
        <div className="flex-1">
        
          <CatalogSort onSortChange={onSortChange} value={sortBy} />
        </div>
      </div>
    </div>
  );
}