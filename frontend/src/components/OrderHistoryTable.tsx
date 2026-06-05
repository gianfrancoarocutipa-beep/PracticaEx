import { LaundryOrder, OrderStatus } from '../types';

const statusColor: Record<OrderStatus, string> = {
  Registered: 'bg-slate-100 text-slate-800',
  Picked: 'bg-blue-100 text-blue-800',
  Processing: 'bg-amber-100 text-amber-800',
  Ready: 'bg-emerald-100 text-emerald-800',
  Shipped: 'bg-indigo-100 text-indigo-800',
  Delivered: 'bg-emerald-200 text-emerald-900'
};

const OrderHistoryTable = ({ orders, onSelect }: { orders: LaundryOrder[]; onSelect: (order: LaundryOrder) => void }) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
    <table className="min-w-full divide-y divide-slate-200 text-sm">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left font-semibold text-slate-700">Pedido</th>
          <th className="px-6 py-3 text-left font-semibold text-slate-700">Cliente</th>
          <th className="px-6 py-3 text-left font-semibold text-slate-700">Estado</th>
          <th className="px-6 py-3 text-left font-semibold text-slate-700">Creado</th>
          <th className="px-6 py-3 text-right font-semibold text-slate-700">Acción</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-slate-50">
            <td className="px-6 py-4 font-medium text-slate-900">{order.id.slice(-6)}</td>
            <td className="px-6 py-4 text-slate-700">{order.customerId}</td>
            <td className="px-6 py-4">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.status]}`}>
                {order.status}
              </span>
            </td>
            <td className="px-6 py-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4 text-right">
              <button
                type="button"
                onClick={() => onSelect(order)}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Ver Detalle
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderHistoryTable;
