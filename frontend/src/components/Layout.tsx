import { ReactNode } from 'react';
import NavBar from './NavBar';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <NavBar />
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

export default Layout;
