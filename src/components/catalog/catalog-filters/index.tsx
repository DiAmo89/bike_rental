"use client";

import React, { useRef } from "react";

// Расширяем интерфейс, чтобы TS знал о showPicker и не ругался
interface HTMLPickerElement extends HTMLInputElement {
  showPicker: () => void;
}

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
  const today = new Date().toISOString().split('T')[0];
  
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    const el = inputRef.current as HTMLPickerElement;
    if (el) {
      try {
        if (typeof el.showPicker === 'function') {
          el.showPicker();
        } else {
          el.focus();
        }
      } catch {
        el.focus();
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full">
      
      {/* Селекторы */}
      <div className="flex flex-row gap-1.5 w-full md:w-auto">
        <button
          onClick={onReset}
          className="bg-[#e6ff2a] hover:bg-black hover:text-[#e6ff2a] text-black px-3 h-[38px] md:h-[42px] rounded-lg font-black transition-all uppercase text-[9px] md:text-[10px] shadow-sm whitespace-nowrap active:scale-95"
        >
          All
        </button>

        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex-1 md:w-[140px] bg-white border border-gray-200 rounded-lg px-2 text-[12px] text-black-700 outline-none h-[38px] md:h-[42px] appearance-none cursor-pointer shadow-sm"
        >
          <option value="all">Type</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={activeStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="flex-1 md:w-[130px] bg-white border border-gray-200 rounded-lg px-2 text-[12px] text-black-700 outline-none h-[38px] md:h-[42px] appearance-none cursor-pointer shadow-sm"
        >
          <option value="all">Status</option>
          <option value="Available">Available</option>
          <option value="In Repair">Repair</option>
        </select>
      </div>

      {/* Блок ДАТ: h-[38px] для идеального выравнивания с Type/Status */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-1.5 w-full md:flex-1">
        
        {/* Поле ОТ */}
        <div 
          onClick={() => handleContainerClick(startInputRef)}
          className="relative flex-1 bg-white border border-gray-200 rounded-lg px-3 h-[38px] md:h-[42px] flex items-center justify-between shadow-sm cursor-pointer active:bg-gray-50 transition-colors"
        >
          <span className={`text-[10px] md:text-[11px] truncate ${!startDate ? "text-black-400" : "text-black-700 font-medium"}`}>
            {startDate || "Select date pick up"}
          </span>
          <span className="text-[12px] opacity-40">📅</span>
          
          <input
            ref={startInputRef}
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => onDateChange("start", e.target.value)}
            className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
          />
        </div>

        <span className="hidden md:block text-black-300 font-bold text-[10px]">→</span>

        {/* Поле ДО */}
        <div 
          onClick={() => handleContainerClick(endInputRef)}
          className="relative flex-1 bg-white border border-gray-200 rounded-lg px-3 h-[38px] md:h-[42px] flex items-center justify-between shadow-sm cursor-pointer active:bg-gray-50 transition-colors"
        >
          <span className={`text-[10px] md:text-[11px] truncate ${!endDate ? "text-black-400" : "text-gray-700 font-medium"}`}>
            {endDate || "Select date return"}
          </span>
          <span className="text-[12px] opacity-40">📅</span>
          
          <input
            ref={endInputRef}
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={(e) => onDateChange("end", e.target.value)}
            className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}