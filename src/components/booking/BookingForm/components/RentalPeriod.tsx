export const RentalPeriod = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const today = new Date().toISOString().split("T")[0];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const getMinEndDate = (start: string) => {
    if (!start) return today;
    const date = new Date(start);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const getMaxEndDate = (start: string) => {
    if (!start) return undefined;
    const date = new Date(start);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  const minEndDate = getMinEndDate(startDate);
  const maxEndDate = getMaxEndDate(startDate);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-950 dark:border-zinc-800 transition-colors">
      <h3 className="text-xl font-semibold mb-6 dark:text-zinc-100">
        Rental Period
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
            Pick-up Date
          </label>
          <input
            type="date"
            placeholder="datetime start"
            min={today}
            value={startDate}
            onKeyDown={handleKeyDown}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e) => (e.target as any).showPicker?.()}
            onChange={(e) => {
              const newStart = e.target.value;
              setStartDate(newStart);

              const nextMinEnd = getMinEndDate(newStart);
              if (endDate && endDate < nextMinEnd) {
                setEndDate("");
              }
            }}
            className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
            Return Date
          </label>
          <input
            type="date"
            placeholder="datetime end"
            min={minEndDate}
            max={maxEndDate}
            value={endDate}
            onKeyDown={handleKeyDown}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e) => (e.target as any).showPicker?.()}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 cursor-pointer"
          />
          {startDate && (
            <p className="text-[10px] text-zinc-400 italic dark:text-zinc-500">
              * Minimum rental is 1 day, maximum 30 days
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// export const RentalPeriod = ({
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// }: any) => {
//   const today = new Date().toISOString().split("T")[0];

//   const getMaxEndDate = (start: string) => {
//     if (!start) return undefined;
//     const date = new Date(start);
//     date.setDate(date.getDate() + 30);
//     return date.toISOString().split("T")[0];
//   };

//   const maxEndDate = getMaxEndDate(startDate);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//   };

//   const getMinEndDate = (start: string) => {
//     if (!start) return today;
//     const date = new Date(start);
//     date.setDate(date.getDate() + 1); // Додаємо рівно один день
//     return date.toISOString().split("T")[0];
//   };

//   const minEndDate = getMinEndDate(startDate);

//   return (
//     <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-950 dark:border-zinc-800 transition-colors">
//       <h3 className="text-xl font-semibold mb-6 dark:text-zinc-100">
//         Rental Period
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
//             Pick-up Date
//           </label>
//           <input
//             type="date"
//             min={today}
//             value={startDate}
//             placeholder="datetime start"
//             onKeyDown={handleKeyDown}
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             onClick={(e) => (e.target as any).showPicker?.()}
//             onChange={(e) => {
//               setStartDate(e.target.value);
//               if (endDate && e.target.value > endDate) setEndDate("");
//             }}
//             className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 cursor-pointer"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-zinc-700 dark:text-zinc-400">
//             Return Date
//           </label>
//           <input
//             type="date"
//             placeholder="datetime end"
//             min={minEndDate}
//             max={maxEndDate}
//             value={endDate}
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             onClick={(e) => (e.target as any).showPicker?.()}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 cursor-pointer"
//           />
//           {startDate && (
//             <p className="text-[10px] text-zinc-400 italic">
//               * Maximum rental period is 30 days
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
