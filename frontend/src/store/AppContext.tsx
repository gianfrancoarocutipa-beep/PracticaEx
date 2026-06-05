import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Customer, LaundryOrder, OrderStatus } from '../types';

interface AppState {
  customers: Customer[];
  orders: LaundryOrder[];
  loading: boolean;
  error: string | null;
  selectedOrder?: LaundryOrder;
  selectedCustomer?: Customer;
  setCustomers: (customers: Customer[]) => void;
  setOrders: (orders: LaundryOrder[]) => void;
  setSelectedOrder: (order?: LaundryOrder) => void;
  setSelectedCustomer: (customer?: Customer) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<LaundryOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<LaundryOrder | undefined>(undefined);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);

  const value = useMemo(
    () => ({
      customers,
      orders,
      loading,
      error,
      selectedOrder,
      selectedCustomer,
      setCustomers,
      setOrders,
      setSelectedOrder,
      setSelectedCustomer,
      setLoading,
      setError,
      updateOrderStatus: (orderId: string, status: OrderStatus) => {
        setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status });
        }
      }
    }),
    [customers, orders, loading, error, selectedOrder, selectedCustomer]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
