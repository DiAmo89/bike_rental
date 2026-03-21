"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminHeader from "./AdminHeader";
import AdminTabs from "./AdminTabs";
import AdminStats from "./AdminStats";
import BikesTable from "./BikesTable";
import AddBikeModal from "./AddBikeModal";
import AddAccessoryModal from "./AddAccessoryModal";
import AdminSidebar from "./AdminSidebar";
import { Bike } from "@/types/admin";
import { Category } from "@/types/Category";

export default function AdminPanel() {
  const [showAddAccessory, setShowAddAccessory] = useState(false);
  const [activeTab, setActiveTab] = useState<"bikes" | "orders">("bikes");
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accessories, setAccessories] = useState([]);
  const [showAddBike, setShowAddBike] = useState(false);
  const router = useRouter();

  const loadBikes = async () => {
    const res = await fetch("/api/bikes");
    const data = await res.json();

    const adminBikes = data.map((bike: any) => ({
      id: bike.id,
      name: `${bike.brand ?? ""} ${bike.model ?? ""}`.trim(),
      type: bike.category?.name || "No Category",
      price: Number(bike.pricePerDay),
      status: bike.isActive ? "available" : "busy",
      image: bike.image ?? null,
    }));

    setBikes(adminBikes);
  };

  useEffect(() => {
    loadBikes();

    fetch("/api/getCategories")
      .then((res) => res.json())
      .then((cats) => setCategories(cats));

    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  }, []);

  const handleAddAccessory = () => setShowAddAccessory(true);

  const handleAddCategory = () => {
    router.push("/admin/categories/new");
  };

  const handleAddAccessorySuccess = () => {
    setShowAddAccessory(false);
    fetch("/api/actions-accessory/read-all-accessories")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  };

  const handleAddBike = () => setShowAddBike(true);

  const handleAddBikeSuccess = async () => {
    setShowAddBike(false);
    await loadBikes();
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[210px_1fr] items-start">
      <div className="self-start">
        <AdminSidebar />
      </div>

      <section className="space-y-6">
        <AdminHeader
          onAddBike={handleAddBike}
          onAddAccessory={handleAddAccessory}
        />

        <AdminTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          activeOrdersCount={0}
        />

        <AdminStats
          totalBikes={bikes.length}
          activeOrders={0}
          totalAccessories={accessories.length}
        />

        {activeTab === "bikes" && (
          <BikesTable
            bikes={bikes}
            categories={categories}
            onDeleteSuccess={loadBikes}
          />
        )}
      </section>

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
