import { mockBikes } from "@/mocks/bikes";
import { mockOrders } from "@/mocks/orders";
import type { Bike, Order } from "@/types/admin";

type AdminStats = {
  totalBikes: number;
  activeOrders: number;
  inRepair: number;
};

export function getAdminBikes(): Bike[] {
  return mockBikes;
}

export function getAdminOrders(): Order[] {
  return mockOrders;
}

export function getAdminStats(): AdminStats {
  return {
    totalBikes: mockBikes.length,
    activeOrders: mockOrders.length,
    inRepair: mockBikes.filter((bike) => bike.status === "In Repair").length,
  };
}
