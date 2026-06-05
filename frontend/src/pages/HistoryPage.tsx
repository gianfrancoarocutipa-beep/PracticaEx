import { useMemo, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useAppContext } from '../store/AppContext';
import { OrderStatus } from '../types';
import OrderHistoryTable from '../components/OrderHistoryTable';
import ErrorBanner from '../components/ErrorBanner';
import LoadingSpinner from '../components/LoadingSpinner';

const statusOptions: Array<OrderStatus | 'All'> = ['All', 'Registered', 'Picked', 'Processing', 'Ready', 'Shipped', 'Delivered'];

const HistoryPage = () => {
  const { orders, loading, error, setError, selectedOrder, setSelectedOrder } = useAppContext();
  const [status, setStatus] = useState<OrderStatus | 'All'>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const exportRef = useRef<HTMLDivElement>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus = status === 'All' || order.status === status;
      const created = new Date(order.createdAt).toISOString().slice(0, 10);
      const afterFrom = !dateFrom || created >= dateFrom;
      const beforeTo = !dateTo || created <= dateTo;
      return matchStatus && afterFrom && beforeTo;
    });
  }, [orders, status, dateFrom, dateTo]);

  const handleExport = async () => {
    if (!exportRef.current) return;
    setError(null);
    try {
      const canvas = await html2canvas(exportRef.current, { scale: 2 });
      const image = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
      pdf.addImage(image, 'PNG', 20, 20, 560, (canvas.height * 560) / canvas.width);
      pdf.save('historial-pedidos.pdf');
    } catch {
      setError('No se pudo exportar el comprobante PDF. Intenta nuevamente.');
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Historial de Pedidos</h1>
        <p className="mt-2 text-slate-600">Filtra y accede a la trazabilidad completa de cada pedido.</p>
      </div>

      {error && <ErrorBanner message={error} />}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Estado</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus | 'All')} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
              {statusOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Desde</span>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Hasta</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
          </label>
          <button onClick={handleExport} className="rounded-3xl bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90">Exportar PDF</button>
        </div>
      </div>

      <div ref={exportRef}>
        <OrderHistoryTable orders={filteredOrders} onSelect={setSelectedOrder} />
      </div>

      {selectedOrder && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Detalle del Pedido</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="font-medium text-slate-700">Pedido</p>
              <p className="mt-1 text-slate-900">{selectedOrder.id}</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Estado</p>
              <p className="mt-1 text-slate-900">{selectedOrder.status}</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Creado</p>
              <p className="mt-1 text-slate-900">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-slate-700">Items</p>
              <p className="mt-1 text-slate-900">{selectedOrder.items.join(', ')}</p>
            </div>
          </div>
          {selectedOrder.pickupSchedule && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Recojo</p>
              <p className="mt-2 text-slate-700">{selectedOrder.pickupSchedule.date} · {selectedOrder.pickupSchedule.timeSlot}</p>
              <p className="text-slate-700">{selectedOrder.pickupSchedule.address}</p>
            </div>
          )}
          {selectedOrder.deliverySchedule && (
            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Entrega</p>
              <p className="mt-2 text-slate-700">{selectedOrder.deliverySchedule.date} · {selectedOrder.deliverySchedule.timeSlot}</p>
              <p className="text-slate-700">{selectedOrder.deliverySchedule.address}</p>
            </div>
          )}
        </div>
      )}

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default HistoryPage;
