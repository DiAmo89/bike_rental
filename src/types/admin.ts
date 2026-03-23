export type Bike = {
  id: string;
  name: string;
  type: string;
  price: number;
  status: string;
  image?: string | null;
};

export type Order = {
  id: string;
  customer: string;
  bike: string;
  startDate: string;
  endDate: string;
  status: string;
};
