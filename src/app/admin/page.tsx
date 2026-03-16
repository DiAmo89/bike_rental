"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminActions from "@/components/admin/AdminActions";
import AdminStats from "@/components/admin/AdminStats";
import AdminTabs from "@/components/admin/AdminTabs";
import BikesTable from "@/components/admin/BikesTable";
import OrdersTable from "@/components/admin/OrdersTable";
import LoadingState from "@/components/admin/LoadingState";
import ErrorState from "@/components/admin/ErrorState";
import {
  getAdminBikes,
  getAdminOrders,
  getAdminStats,
} from "@/lib/admin.service";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"bikes" | "orders">("bikes");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const bikes = getAdminBikes();
  const orders = getAdminOrders();
  const stats = getAdminStats();

  const handleAddBike = () => {
    console.log("Add Bike clicked");
  };

  const handleAddAccessory = () => {
    console.log("Add Accessory clicked");
  };

  const handleAddCategory = () => {
    console.log("Add Category clicked");
  };

  const handleRetry = () => {
    console.log("Retry loading data");
    setHasError(false);
    setIsLoading(false);
  };

  return (
    <main className="p-8 space-y-6">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <AdminHeader />

        <AdminActions
          onAddBike={handleAddBike}
          onAddAccessory={handleAddAccessory}
          onAddCategory={handleAddCategory}
        />
      </section>

      <AdminStats
        totalBikes={stats.totalBikes}
        activeOrders={stats.activeOrders}
        inRepair={stats.inRepair}
      />

      <AdminTabs
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        activeOrdersCount={stats.activeOrders}
      />

      {hasError && (
        <ErrorState
          message="Failed to load data. Please try again."
          onRetry={handleRetry}
        />
      )}

      {!hasError && isLoading && <LoadingState />}

      {!hasError && !isLoading && activeTab === "bikes" && (
        <BikesTable bikes={bikes} />
      )}

      {!hasError && !isLoading && activeTab === "orders" && (
        <OrdersTable orders={orders} />
      )}
    </main>
  );
}
