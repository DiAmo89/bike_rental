export type BookingStatus = "upcoming" | "active" | "completed";

export type BookingListItemBase = {
  id: string;
  title: string;
  subtitle: string;
  image: string | null;
  startDate: string;
  endDate: string;
  totalPrice: number;
};

export type BookingListItem = BookingListItemBase & {
  status: BookingStatus;
};

export type BookingSummary = {
  total: number;
  active: number;
  upcoming: number;
  completed: number;
  totalSpent: number;
};

export type BookingsPageData = {
  currentBookings: BookingListItem[];
  pastBookings: BookingListItem[];
  summary: BookingSummary;
};


export type BookingAccessoryItem = {
  id: string;
  name: string;
  pricePerDay: number;
};

export type BookingDetailsItem = BookingListItem & {
  bikePricePerDay: number;
  bikeDescription: string | null;
  accessories: BookingAccessoryItem[];
};
