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
        <div className="flex items-center justify-center gap-4 mb-3">
          <a href="#" aria-label="Facebook" className="text-stone-300 hover:text-stone-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-stone-300 hover:text-stone-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="text-stone-300 hover:text-stone-500 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Fundacja Święty Mikołaj dla Seniora. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}
