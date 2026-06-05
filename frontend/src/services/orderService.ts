import { api } from './api';
import { CreateOrderPayload, LaundryOrder, OrderStatus } from '../types';

interface SchedulePayload {
  date: string;
  timeSlot: string;
  street: string;
  city?: string;
  region?: string;
  country?: string;
}

export const orderService = {
  create: async (payload: CreateOrderPayload): Promise<LaundryOrder> => {
    const response = await api.post<LaundryOrder>('/laundry-orders', payload);
    return response.data;
  },
  getById: async (orderId: string): Promise<LaundryOrder> => {
    const response = await api.get<LaundryOrder>(`/laundry-orders/${orderId}`);
    return response.data;
  },
  listByCustomer: async (customerId: string): Promise<LaundryOrder[]> => {
    const response = await api.get<LaundryOrder[]>(`/customers/${customerId}/laundry-orders`);
    return response.data;
  },
  schedulePickup: async (orderId: string, payload: SchedulePayload): Promise<LaundryOrder> => {
    const response = await api.post<LaundryOrder>(`/laundry-orders/${orderId}/pickup`, {
      schedule: {
        date: payload.date,
        timeSlot: payload.timeSlot,
        address: {
          street: payload.street,
          city: payload.city ?? 'Tacna',
          region: payload.region ?? 'Tacna',
          country: payload.country ?? 'Peru'
        }
      }
    });
    return response.data;
  },
  scheduleDelivery: async (orderId: string, payload: SchedulePayload): Promise<LaundryOrder> => {
    const response = await api.post<LaundryOrder>(`/laundry-orders/${orderId}/delivery`, {
      schedule: {
        date: payload.date,
        timeSlot: payload.timeSlot,
        address: {
          street: payload.street,
          city: payload.city ?? 'Tacna',
          region: payload.region ?? 'Tacna',
          country: payload.country ?? 'Peru'
        }
      }
    });
    return response.data;
  },
  updateStatus: async (orderId: string, status: OrderStatus): Promise<LaundryOrder> => {
    const response = await api.post<LaundryOrder>(`/laundry-orders/${orderId}/status`, { status });
    return response.data;
  }
};
