import { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminTabs from "./AdminTabs";
import AdminStats from "./AdminStats";
import AdminActions from "./AdminActions";
import BikesTable from "./BikesTable";
import AddBikeModal from "./AddBikeModal";
import { Bike } from "@/types/admin";
import AddAccessoryModal from "./AddAccessoryModal";
import { Category } from "@/types/Category";
// Elimin import server-only

export default function AdminPanel() {
  const [showAddAccessory, setShowAddAccessory] = useState(false);
  const [activeTab, setActiveTab] = useState<"bikes" | "orders">("bikes");
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accessories, setAccessories] = useState([]);
  const [showAddBike, setShowAddBike] = useState(false);

  useEffect(() => {
    fetch("/api/bikes")
      .then((res) => res.json())
      .then((bikes) => setBikes(bikes));
    fetch("/api/getCategories")
      .then((res) => res.json())
      .then((cats) => setCategories(cats));
    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  }, []);

  const handleAddAccessory = () => setShowAddAccessory(true);
  const handleAddAccessorySuccess = () => {
    setShowAddAccessory(false);
    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  };

  const handleAddBike = () => setShowAddBike(true);
  const handleAddBikeSuccess = () => {
    setShowAddBike(false);
    fetch("/api/bikes")
      .then((res) => res.json())
      .then((bikes) => setBikes(bikes));
  };

  return (
    <div className="space-y-6">
      <AdminHeader />
      <AdminTabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        activeOrdersCount={0}
      />
      <AdminStats
        totalBikes={bikes.length}
        activeOrders={0}
        inRepair={0}
        totalAccessories={accessories.length}
      />
      <AdminActions
        onAddBike={handleAddBike}
        onAddAccessory={handleAddAccessory}
        onAddCategory={() => {}}
      />
      {activeTab === "bikes" && <BikesTable bikes={bikes} />}
      <AddBikeModal
        open={showAddBike}
        onClose={() => setShowAddBike(false)}
        onSuccess={handleAddBikeSuccess}
        categories={categories}
      />
      <AddAccessoryModal
        open={showAddAccessory}
        onClose={() => setShowAddAccessory(false)}
        onSuccess={handleAddAccessorySuccess}
      />
    </div>
  );
}
