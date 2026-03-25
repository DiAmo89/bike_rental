"use client";

import { useState, useEffect } from "react";

import AdminHeader from "./AdminHeader";
import AdminStats from "./AdminStats";
import BikesTable from "./BikesTable";
import AddBikeModal from "./AddBikeModal";
import AdminSidebar from "./AdminSidebar";
import { Bike } from "@/types/admin";
import { Category } from "@/types/Category";

type BookingItem = {
  startDate: string;
  endDate: string;
};

const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isActiveBooking = (booking: BookingItem, today: string) =>
  booking.startDate <= today && booking.endDate >= today;

export default function AdminPanel() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accessories, setAccessories] = useState([]);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);
  const [showAddBike, setShowAddBike] = useState(false);

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

  const loadActiveOrders = async () => {
    const res = await fetch("/api/actions-booking?mode=all");
    const data = await res.json();
    const bookings: BookingItem[] = Array.isArray(data) ? data : [];
    const today = toLocalDateString(new Date());

    setActiveOrdersCount(
      bookings.filter((booking) => isActiveBooking(booking, today)).length,
    );
  };

  useEffect(() => {
    loadBikes();
    loadActiveOrders();

    fetch("/api/getCategories")
      .then((res) => res.json())
      .then((cats) => setCategories(cats));

    fetch("/api/actions-accessory")
      .then((res) => res.json())
      .then((accs) => setAccessories(accs));
  }, []);

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
        <AdminHeader onAddBike={handleAddBike} />

        <AdminStats
          totalBikes={bikes.length}
          activeOrders={activeOrdersCount}
          totalAccessories={accessories.length}
        />

        <BikesTable
          bikes={bikes}
          categories={categories}
          onDeleteSuccess={loadBikes}
        />
      </section>

      <AddBikeModal
        open={showAddBike}
        onClose={() => setShowAddBike(false)}
        onSuccess={handleAddBikeSuccess}
        categories={categories}
      />
    </div>
  );
}
