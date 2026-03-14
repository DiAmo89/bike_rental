type AdminTabsProps = {
  activeTab: "bikes" | "orders";
  onChangeTab: (tab: "bikes" | "orders") => void;
  activeOrdersCount: number;
};

export default function AdminTabs({
  activeTab,
  onChangeTab,
  activeOrdersCount,
}: AdminTabsProps) {
  return (
    <section className="border-b border-gray-200">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={() => onChangeTab("bikes")}
          className={`border-b-2 pb-3 text-base font-medium transition ${
            activeTab === "bikes"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          All Bikes
        </button>

        <button
          type="button"
          onClick={() => onChangeTab("orders")}
          className={`flex items-center gap-2 border-b-2 pb-3 text-base font-medium transition ${
            activeTab === "orders"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <span>Active Orders</span>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-gray-200 px-2 text-xs text-gray-700">
            {activeOrdersCount}
          </span>
        </button>
      </div>
    </section>
  );
}
