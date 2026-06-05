import { useMemo, useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { Customer } from '../types';
import { customerService } from '../services/customerService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';

const CustomersPage = () => {
  const { customers, setCustomers, selectedCustomer, setSelectedCustomer, loading, setLoading, error, setError } = useAppContext();
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const filtered = useMemo(() => {
    const normalized = search.toLowerCase();
    return customers.filter((customer) => customer.name.toLowerCase().includes(normalized) || customer.email.toLowerCase().includes(normalized));
  }, [customers, search]);

  const handleRegister = async () => {
    setError(null);
    if (!name || !phone || !email) {
      setError('Completa todos los campos del cliente.');
      return;
    }

    setLoading(true);
    try {
      const created = await customerService.create({
        name,
        phone,
        email,
        addresses: [{ street: 'Dirección registrada', city: 'Tacna', region: 'Tacna', country: 'Peru' }]
      });
      setCustomers([created, ...customers]);
      setName('');
      setPhone('');
      setEmail('');
      setSelectedCustomer(created);
    } catch {
      setError('No se pudo registrar el cliente. Revisa la conexión con el backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-semibold text-slate-900">Gestión de Clientes</h1>
        <p className="mt-2 text-slate-600">Registra nuevos clientes, busca por nombre o email y abre perfiles con datos completos.</p>
      </div>

      {error && <ErrorBanner message={error} />}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Registrar Cliente</h2>
          <div className="mt-5 space-y-4">
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Nombre</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Teléfono</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-slate-700">Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3" />
            </label>
            <button onClick={handleRegister} disabled={loading} className="rounded-3xl bg-primary px-6 py-3 text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300">
              Registrar Cliente
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Buscar Clientes</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email"
            className="mt-5 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
          />
          <div className="mt-5 space-y-3">
            {filtered.length === 0 ? (
              <p className="text-slate-500">No hay clientes que coincidan.</p>
            ) : (
              filtered.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
                >
                  <p className="font-semibold text-slate-900">{customer.name}</p>
                  <p className="text-sm text-slate-600">{customer.email}</p>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Perfil de Cliente</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-700">Nombre</p>
              <p className="mt-1 text-slate-900">{selectedCustomer.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Email</p>
              <p className="mt-1 text-slate-900">{selectedCustomer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Teléfono</p>
              <p className="mt-1 text-slate-900">{selectedCustomer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Direcciones</p>
              {selectedCustomer.addresses.map((address, idx) => (
                <p key={idx} className="mt-1 text-slate-900">{address.street}, {address.city}, {address.region}, {address.country}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner />}
    </section>
  );
};

export default CustomersPage;
