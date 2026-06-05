import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Pedido', path: '/order' },
  { name: 'Agenda', path: '/schedule' },
  { name: 'Tracking', path: '/tracking' },
  { name: 'Historial', path: '/history' },
  { name: 'Clientes', path: '/customers' }
];

const NavBar = () => (
  <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <p className="text-lg font-semibold text-slate-900">Laundry Control</p>
        <p className="text-sm text-slate-500">React + TypeScript + Tailwind</p>
      </div>
      <nav className="flex gap-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-primary text-white shadow-soft' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);

export default NavBar;
