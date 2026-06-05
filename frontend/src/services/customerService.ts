import { api } from './api';
import { Customer } from '../types';

export const customerService = {
  list: async (): Promise<Customer[]> => {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
  },
  create: async (payload: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await api.post<Customer>('/customers', payload);
    return response.data;
  }
};
