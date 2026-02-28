import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  ChartBarIcon,
  BuildingOffice2Icon,
  DocumentTextIcon,
  StarIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: ChartBarIcon, end: true },
  { to: '/admin/placowki', label: 'Placówki', icon: BuildingOffice2Icon },
  { to: '/admin/listy', label: 'Listy', icon: DocumentTextIcon },
  { to: '/admin/mikolajowie', label: 'Mikołajowie', icon: StarIcon },
  { to: '/admin/akcje', label: 'Konfiguracja Akcji', icon: Cog6ToothIcon },
  { to: '/admin/maile', label: 'Maile', icon: EnvelopeIcon },
  { to: '/admin/uzytkownicy', label: 'Użytkownicy', icon: UsersIcon },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      {/* Top header */}
      <header className="bg-forest-dark text-white px-6 py-3 flex items-center justify-between shadow-md flex-shrink-0">
        <span className="font-bold text-white">Panel Administratora — Akcja Listy</span>
        <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
          ← Wróć do strony
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-forest-dark text-white w-56 flex-shrink-0 p-4 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 bg-forest text-white rounded-lg px-4 py-2.5 font-medium text-base'
                  : 'flex items-center gap-3 text-white/70 hover:bg-forest hover:text-white rounded-lg px-4 py-2.5 transition-colors text-base'
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
