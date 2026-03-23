export const AdditionalOptions = ({
  options,
  setOptions,
  dbAccessories,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const handleOptionChange = (id: string) => {
    setOptions({
      ...options,
      [id]: !options[id],
    });
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Additional Options</h3>

      <div className="relative">
        <div className="grid gap-3 max-h-52 overflow-y-auto pr-1 custom-scrollbar scrollbar-hide">
          {!dbAccessories ? (
            <p className="text-sm text-zinc-400 animate-pulse">
              Loading accessories...
            </p>
          ) : (
            dbAccessories.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (acc: any) => (
                <label
                  key={acc.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 hover:border-zinc-300 cursor-pointer shrink-0"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={options[acc.id] || false}
                      onChange={() => handleOptionChange(acc.id)}
                      className="h-5 w-5 rounded border-zinc-300 accent-[#e6ff2a]"
                    />
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        {acc.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        Professional accessory
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold bg-zinc-100 px-3 py-1 rounded-full text-zinc-700">
                    €{acc.pricePerDay}/day
                  </span>
                </label>
              ),
            )
          )}
        </div>
        {/* shadow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
