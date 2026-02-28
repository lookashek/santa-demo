import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-forest-dark text-white px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold text-gold">
            Święty Mikołaj dla Seniora
          </NavLink>
          <nav className="flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-gold transition-colors'
              }
            >
              Strona główna
            </NavLink>
            <NavLink
              to="/listy"
              className={({ isActive }) =>
                isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-gold transition-colors'
              }
            >
              Listy
            </NavLink>
            <NavLink
              to="/galeria"
              className={({ isActive }) =>
                isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-gold transition-colors'
              }
            >
              Galeria
            </NavLink>
            <NavLink
              to="/mikolaj"
              className={({ isActive }) =>
                isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-gold transition-colors'
              }
            >
              Moje listy
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-gold transition-colors'
              }
            >
              Admin
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-forest-dark text-white/60 text-sm text-center py-6">
        <p>© {new Date().getFullYear()} Fundacja Święty Mikołaj dla Seniora. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}
