import { NavLink, Outlet, Link } from 'react-router-dom';

const NAV = [
  { to: '/admin', label: '📊 Dashboard', end: true },
  { to: '/admin/placowki', label: '🏥 Placówki' },
  { to: '/admin/listy', label: '✉️ Listy' },
  { to: '/admin/mikolajowie', label: '🎅 Mikołajowie' },
  { to: '/admin/akcje', label: '⚙️ Konfiguracja Akcji' },
  { to: '/admin/maile', label: '📧 Maile' },
  { to: '/admin/uzytkownicy', label: '👤 Użytkownicy' },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      {/* Top header */}
      <header className="bg-forest-dark text-white px-6 py-3 flex items-center justify-between shadow-md flex-shrink-0">
        <span className="font-bold text-gold">Panel Administratora — Akcja Listy</span>
        <Link to="/" className="text-white/70 hover:text-gold text-sm transition-colors">
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
                  ? 'block bg-forest text-gold-light rounded-lg px-4 py-2.5 font-medium text-sm'
                  : 'block text-white/70 hover:bg-forest hover:text-white rounded-lg px-4 py-2.5 transition-colors text-sm'
              }
            >
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
