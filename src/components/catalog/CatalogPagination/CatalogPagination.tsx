"use client";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (n: number) => void;
  totalItems: number; // Общее кол-во велосипедов
  step: number; // По сколько будет отображаться карточек на странице
}
export default function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  step,
}: Props) {
  const myOptions: number[] = [];
  if (step < totalItems) myOptions.push(step);
  if (step * 2 < totalItems) myOptions.push(step * 2);
  if (step * 4 < totalItems) myOptions.push(step * 4);
  myOptions.push(totalItems);

  if (totalPages === 0) return null;

  const middle: number[] = [];
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    middle.push(i);
  }

  const finalPages: (number | string)[] = [1];
  if (currentPage > 3) finalPages.push("...");
  finalPages.push(...middle);
  if (currentPage < totalPages - 2) finalPages.push("...");
  if (totalPages > 1) finalPages.push(totalPages);

  return (
    <div className="mt-12 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold uppercase text-gray-500">Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="bg-gray-100 border rounded-lg px-2 py-1 font-bold outline-none"
        >
          {myOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === totalItems ? "Все" : opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl border border-gray-200 disabled:opacity-30 font-bold hover:bg-gray-50 transition-all active:scale-95"
        >
          Back
        </button>

        <div className="flex gap-1">
          {finalPages.map((p, idx) =>
            p === "..." ? (
              <span key={idx} className="px-2 text-gray-400 font-bold">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(Number(p))}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === p ? "bg-black text-white" : "text-gray-400 hover:text-black"}`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-xl border border-gray-200 disabled:opacity-30 font-bold hover:bg-gray-50 transition-all active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
}
