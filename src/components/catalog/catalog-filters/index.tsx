interface CatalogFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeStatus: string;
  onStatusChange: (status: string) => void;
  startDate: string;
  endDate: string;
  onDateChange: (key: "start" | "end", value: string) => void;
  onReset: () => void;
}

export default function CatalogFilters({
  categories,
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
  startDate,
  endDate,
  onDateChange,
  onReset,
}: CatalogFiltersProps) {
  
  
  const hasFilters = activeCategory !== "all" || 
                     activeStatus !== "all" || 
                     startDate !== "" || 
                     endDate !== "";

  return (
    <div className="flex flex-col md:flex-row gap-6 items-end">
      
        <div className="md:w-auto w-full animate-in fade-in slide-in-from-right-4 duration-300">
          <button
            onClick={onReset}
            className="bg-[#e6ff2a] hover:bg-black hover:text-[#e6ff2a] text-black px-6 h-[42px] rounded-lg font-black transition-all duration-300 uppercase tracking-widest text-[10px] shadow-sm active:scale-95 whitespace-nowrap">
            All
          </button>
        </div>
     
     
      <div className="flex-1 w-full">
        <label className="block text-xs font-black mb-2 uppercase tracking-widest text-gray-400">
          Bike type
        </label>
        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 outline-none shadow-sm cursor-pointer h-[42px]"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      
      <div className="flex-1 w-full">
        <label className="block text-xs font-black mb-2 uppercase tracking-widest text-gray-400">
          Status
        </label>
        <select
          value={activeStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-gray-700 outline-none shadow-sm cursor-pointer h-[42px]"
        >
          <option value="all">Any status</option>
          <option value="Available">Available</option>
          <option value="In Repair">In Repair</option>
        </select>
      </div>

      
      <div className="flex-[2] flex gap-4 w-full">
        <div className="flex-1">
          <label className="block text-xs font-black mb-2 uppercase tracking-widest text-gray-400">
            Pick up
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onDateChange("start", e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm text-gray-700 outline-none shadow-sm h-[42px]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-black mb-2 uppercase tracking-widest text-gray-400">
            Return
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onDateChange("end", e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm text-gray-700 outline-none shadow-sm h-[42px]"
          />
        </div>
      </div>

      
    
    </div>
  );
}