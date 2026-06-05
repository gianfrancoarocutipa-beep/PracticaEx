import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { orderService } from '../services/orderService';
import ErrorBanner from '../components/ErrorBanner';
import LoadingSpinner from '../components/LoadingSpinner';

const timeSlots = ['mañana 8-12', 'tarde 12-18', 'noche 18-21'];

const SchedulePage = () => {
  const { orders, setOrders, loading, setLoading, error, setError } = useAppContext();
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupSlot, setPickupSlot] = useState(timeSlots[0]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliverySlot, setDeliverySlot] = useState(timeSlots[0]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [message, setMessage] = useState('');

  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  const handlePickup = async () => {
    setError(null);
    setMessage('');
    if (!selectedOrderId || !pickupDate || !pickupAddress) {
      setError('Seleccione un pedido y complete los datos de recojo.');
      return;
    }

    setLoading(true);
    try {
      const updated = await orderService.schedulePickup(selectedOrderId, {
        date: pickupDate,
        timeSlot: pickupSlot,
        address: pickupAddress
      });
      setOrders((current) => current.map((order) => (order.id === updated.id ? updated : order)));
      setMessage('Recojo agendado con éxito.');
    } catch {
      setError('No se pudo agendar el recojo. Revisa el servicio.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelivery = async () => {
    setError(null);
    setMessage('');
    if (!selectedOrderId || !deliveryDate || !deliveryAddress) {
      setError('Seleccione un pedido y complete los datos de entrega.');
      return;
    }

    setLoading(true);
    try {
      const updated = await orderService.scheduleDelivery(selectedOrderId, {
        date: deliveryDate,
        timeSlot: deliverySlot,
        address: deliveryAddress
      });
      setOrders((current) => current.map((order) => (order.id === updated.id ? updated : order)));
      setMessage('Entrega agendada con éxito.');
    } catch {
      setError('No se pudo agendar la entrega. Revisa el servicio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Agenda Recojo y Entrega</h1>
        <p className="mt-2 text-slate-600">Selecciona un pedido existente y programa fechas, franjas y direcciones.</p>
      </div>

      {error && <ErrorBanner message={error} />}
      {message && <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Recojo</h2>
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Pedido</label>
              <select value={selectedOrderId} onChange={(e) => setSelectedOrderId(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                <option value="">Selecciona pedido</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>{`${order.id.slice(-6)} - ${order.status}`}</option>
                ))}
              </select>
            </div>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Fecha</span>
              <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Franja</span>
              <select value={pickupSlot} onChange={(e) => setPickupSlot(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                {timeSlots.map((slot) => (<option key={slot}>{slot}</option>))}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Dirección</span>
              <input value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} placeholder="Calle y número" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </label>
            <button onClick={handlePickup} disabled={loading} className="rounded-3xl bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 disabled:cursor-not-allowed disabled:bg-slate-300">
              Agendar Recojo
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Entrega</h2>
          <div className="mt-5 space-y-4">
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Fecha</span>
              <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Franja</span>
              <select value={deliverySlot} onChange={(e) => setDeliverySlot(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                {timeSlots.map((slot) => (<option key={slot}>{slot}</option>))}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Dirección</span>
              <input value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Calle y número" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </label>
            <button onClick={handleDelivery} disabled={loading} className="rounded-3xl bg-primary px-6 py-3 text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300">
              Agendar Entrega
            </button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-slate-900">Pedido seleccionado</h3>
          <p className="mt-2 text-slate-600">Estado actual: <span className="font-semibold">{selectedOrder.status}</span></p>
          <p className="mt-1 text-slate-600">Items: {selectedOrder.items.join(', ')}</p>
        </div>
      )}

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default SchedulePage;
