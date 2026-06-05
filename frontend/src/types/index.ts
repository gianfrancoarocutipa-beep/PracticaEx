export type OrderStatus =
  | 'Registered'
  | 'Picked'
  | 'Processing'
  | 'Ready'
  | 'Shipped'
  | 'Delivered';

export interface Address {
  street: string;
  city: string;
  region: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  addresses: Address[];
}

export interface PickupSchedule {
  date: string;
  timeSlot: string;
  address: Address;
}

export interface DeliverySchedule {
  date: string;
  timeSlot: string;
  address: Address;
}

export interface LaundryOrder {
  id: string;
  customerId: string;
  items: string[];
  pickupSchedule?: PickupSchedule;
  deliverySchedule?: DeliverySchedule;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderPayload {
  customerId: string;
  items: string[];
  pickupSchedule?: PickupSchedule;
  deliverySchedule?: DeliverySchedule;
}

export interface UpdateStatusPayload {
  status: OrderStatus;
}
