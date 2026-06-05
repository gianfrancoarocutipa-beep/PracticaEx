import { OrderStatus } from '../types';

const statuses: OrderStatus[] = ['Registered', 'Picked', 'Processing', 'Ready', 'Shipped', 'Delivered'];

const statusClasses: Record<OrderStatus, string> = {
  Registered: 'bg-slate-200 text-slate-700',
  Picked: 'bg-blue-100 text-blue-800',
  Processing: 'bg-amber-100 text-amber-800',
  Ready: 'bg-emerald-100 text-emerald-800',
  Shipped: 'bg-indigo-100 text-indigo-800',
  Delivered: 'bg-emerald-200 text-emerald-900'
};

const StatusTimeline = ({ status }: { status: OrderStatus }) => (
  <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
    <p className="text-lg font-semibold text-slate-900">Estado del pedido</p>
    <div className="space-y-3">
      {statuses.map((item) => {
        const active = statuses.indexOf(item) <= statuses.indexOf(status);
        return (
          <div key={item} className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                active ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-slate-100 text-slate-500'
              }`}
            >
              {statuses.indexOf(item) + 1}
            </div>
            <div>
              <p className="font-medium text-slate-900">{item}</p>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClasses[item]}`}>{active ? 'Completado' : 'Pendiente'}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default StatusTimeline;
