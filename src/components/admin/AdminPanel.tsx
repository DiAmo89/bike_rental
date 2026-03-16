import { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminTabs from "./AdminTabs";
import AdminStats from "./AdminStats";
import AdminActions from "./AdminActions";
import BikesTable from "./BikesTable";
import AddBikeModal from "./AddBikeModal";
import { Bike } from "@/types/admin";
import { Category } from "@/types/Category";
// Elimin import server-only

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"bikes" | "orders">("bikes");
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddBike, setShowAddBike] = useState(false);

  useEffect(() => {
    setBikes([]); // Populate with bikes from DB
    fetch("/api/getCategories")
      .then((res) => res.json())
      .then((cats) => setCategories(cats));
  }, []);

  const handleAddBike = () => setShowAddBike(true);
  const handleAddBikeSuccess = () => {
    setShowAddBike(false);
    // TODO: Re-fetch bikes from DB/API
  };

  return (
    <div className="space-y-6">
      <AdminHeader />
      <AdminTabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        activeOrdersCount={0}
      />
      <AdminStats totalBikes={bikes.length} activeOrders={0} inRepair={0} />
      <AdminActions
        onAddBike={handleAddBike}
        onAddAccessory={() => {}}
        onAddCategory={() => {}}
      />
      {activeTab === "bikes" && <BikesTable bikes={bikes} />}
      <AddBikeModal
        open={showAddBike}
        onClose={() => setShowAddBike(false)}
        onSuccess={handleAddBikeSuccess}
        categories={categories}
      />
    </div>
  );
}
