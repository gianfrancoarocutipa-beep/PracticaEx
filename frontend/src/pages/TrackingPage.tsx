import { useEffect, useState } from 'react';
import { OrderStatus } from '../types';
import { useAppContext } from '../store/AppContext';
import { orderService } from '../services/orderService';
import { usePolling } from '../hooks/usePolling';
import StatusTimeline from '../components/StatusTimeline';
import ErrorBanner from '../components/ErrorBanner';
import LoadingSpinner from '../components/LoadingSpinner';

const TrackingPage = () => {
  const { orders, setOrders, loading, setLoading, error, setError } = useAppContext();
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('Registered');
  const [coldStart, setColdStart] = useState(false);

  const loadOrder = async () => {
    if (!orderId) {
      return;
    }
    try {
      const result = await orderService.getById(orderId);
      setOrderStatus(result.status);
      setOrders((current) => current.map((order) => (order.id === result.id ? result : order)));
      setColdStart(false);
    } catch {
      setColdStart(true);
      setError('Render puede tardar en iniciar la API. Intenta de nuevo en unos segundos.');
    }
  };

  usePolling(loadOrder, 30000);

  useEffect(() => {
    if (orders.length && !orderId) {
      setOrderId(orders[0].id);
    }
  }, [orders, orderId]);

  const handleFetch = async () => {
    setError(null);
    setLoading(true);
    setColdStart(false);
    await loadOrder();
    setLoading(false);
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Seguimiento en Tiempo Real</h1>
        <p className="mt-2 text-slate-600">Consulta el progreso del pedido y visualiza la cadena de estados.</p>
      </div>

      {error && <ErrorBanner message={error} />}
      {coldStart && <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-900">Render está en cold start. Espera unos segundos y actualiza el seguimiento.</div>}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
          <label className="space-y-2">
            <span className="font-medium text-slate-700">Pedido</span>
            <select value={orderId} onChange={(e) => setOrderId(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
              <option value="">Selecciona pedido</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>{`${order.id.slice(-6)} - ${order.status}`}</option>
              ))}
            </select>
          </label>
          <button onClick={handleFetch} className="rounded-3xl bg-primary px-6 py-3 text-white transition hover:bg-primary/90">Actualizar</button>
        </div>
      </div>

      <StatusTimeline status={orderStatus as any} />

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default TrackingPage;
