import { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { CreateOrderPayload, LaundryOrder } from '../types';
import { orderService } from '../services/orderService';
import { customerService } from '../services/customerService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';

const itemOptions = ['camisa', 'pantalón', 'vestido', 'ropa de cama'];
const serviceOptions = ['lavado simple', 'lavado+planchado', 'lavado en seco'];

const OrderFormPage = () => {
  const { customers, setCustomers, setOrders, loading, setLoading, error, setError } = useAppContext();
  const [customerId, setCustomerId] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [item, setItem] = useState(itemOptions[0]);
  const [service, setService] = useState(serviceOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleCreateOrder = async () => {
    setError(null);
    setLoading(true);

    try {
      let customerIdentifier = customerId;
      if (!customerIdentifier && newCustomerName) {
        const created = await customerService.create({
          name: newCustomerName,
          phone: newCustomerPhone,
          email: newCustomerEmail,
          addresses: [{ street: 'Dirección principal', city: 'Tacna', region: 'Tacna', country: 'Peru' }]
        });
        customerIdentifier = created.id;
        setCustomers([...customers, created]);
      }

      if (!customerIdentifier) {
        setError('Debe seleccionar o registrar un cliente antes de crear un pedido.');
        return;
      }

      const payload: CreateOrderPayload = {
        customerId: customerIdentifier,
        items: Array(quantity).fill(`${item} - ${service}`)
      };

      const created = await orderService.create(payload);
      setOrders((current) => [created, ...current]);
      setMessage(`Pedido creado: ${created.id}`);
    } catch (err) {
      setError('No se pudo crear el pedido. Verifica la conexión con el backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Registro de Pedido</h1>
        <p className="mt-2 text-slate-600">Crea un pedido nuevo seleccionando el tipo de prenda, servicio y cliente.</p>
      </div>

      {error && <ErrorBanner message={error} />}
      {message && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">{message}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Datos del Pedido</h2>
          <div className="mt-5 space-y-4">
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Tipo de prenda</span>
              <select value={item} onChange={(e) => setItem(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                {itemOptions.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Servicio</span>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                {serviceOptions.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Cantidad</span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Cliente existente</span>
              <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3">
                <option value="">Seleccionar cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Registro de Cliente</h2>
          <p className="mt-2 text-slate-600">Registra un cliente si aún no existe antes de crear el pedido.</p>
          <div className="mt-5 space-y-4">
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Nombre</span>
              <input
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Teléfono</span>
              <input
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Email</span>
              <input
                value={newCustomerEmail}
                onChange={(e) => setNewCustomerEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <button
          type="button"
          onClick={handleCreateOrder}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? 'Guardando...' : 'Crear Pedido'}
        </button>
      </div>

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default OrderFormPage;
