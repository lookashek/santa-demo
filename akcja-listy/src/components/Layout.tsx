import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="text-xl font-black uppercase tracking-wide text-stone-900">
            Święty Mikołaj dla Seniora
          </NavLink>
          <nav className="flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'font-black uppercase text-sm tracking-wide text-stone-900 underline' : 'font-black uppercase text-sm tracking-wide text-stone-900 hover:text-forest transition-colors'
              }
            >
              Strona główna
            </NavLink>
            <NavLink
              to="/listy"
              className={({ isActive }) =>
                isActive ? 'font-black uppercase text-sm tracking-wide text-stone-900 underline' : 'font-black uppercase text-sm tracking-wide text-stone-900 hover:text-forest transition-colors'
              }
            >
              Listy
            </NavLink>
            <NavLink
              to="/galeria"
              className={({ isActive }) =>
                isActive ? 'font-black uppercase text-sm tracking-wide text-stone-900 underline' : 'font-black uppercase text-sm tracking-wide text-stone-900 hover:text-forest transition-colors'
              }
            >
              Galeria
            </NavLink>
            <NavLink
              to="/mikolaj"
              className={({ isActive }) =>
                isActive ? 'font-black uppercase text-sm tracking-wide text-stone-900 underline' : 'font-black uppercase text-sm tracking-wide text-stone-900 hover:text-forest transition-colors'
              }
            >
              Moje listy
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? 'font-black uppercase text-sm tracking-wide text-stone-900 underline' : 'font-black uppercase text-sm tracking-wide text-stone-900 hover:text-forest transition-colors'
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

      <footer className="bg-white border-t border-stone-200 text-stone-400 text-sm text-center py-6">
        <p>© {new Date().getFullYear()} Fundacja Święty Mikołaj dla Seniora. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}
