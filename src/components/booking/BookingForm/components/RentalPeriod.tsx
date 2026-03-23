export const RentalPeriod = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const today = new Date().toISOString().slice(0, 16);

  const getMaxEndDate = (start: string) => {
    if (!start) return undefined;
    const date = new Date(start);
    date.setDate(date.getDate() + 30);
    return date.toISOString().slice(0, 16);
  };

  const maxEndDate = getMaxEndDate(startDate);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Rental Period</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            Pick-up Date & Time
          </label>
          <input
            type="datetime-local"
            placeholder="datetime start"
            min={today}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              if (endDate && e.target.value > endDate) setEndDate("");
            }}
            className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            Return Date & Time
          </label>
          <input
            type="datetime-local"
            placeholder="datetime end"
            min={startDate || today}
            max={maxEndDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 p-3 outline-none focus:ring-2 focus:ring-[#e6ff2a] bg-zinc-50/50"
          />
          {startDate && (
            <p className="text-[10px] text-zinc-400 italic">
              * Maximum rental period is 30 days
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
