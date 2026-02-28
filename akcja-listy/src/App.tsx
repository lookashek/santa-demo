import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/public/HomePage';
import LettersPage from './pages/public/LettersPage';
import GalleryPage from './pages/public/GalleryPage';
import LetterSelectFlow from './pages/public/LetterSelectFlow';
import SantaLogin from './pages/santa/SantaLogin';
import SantaDashboard from './pages/santa/SantaDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFacilities from './pages/admin/AdminFacilities';
import AdminLetters from './pages/admin/AdminLetters';
import AdminSantas from './pages/admin/AdminSantas';
import AdminActions from './pages/admin/AdminActions';
import AdminEmails from './pages/admin/AdminEmails';
import AdminUsers from './pages/admin/AdminUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Strona publiczna */}
          <Route path="/" element={<HomePage />} />
          <Route path="/listy" element={<LettersPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/wybierz/:letterId" element={<LetterSelectFlow />} />

          {/* Panel Mikołaja */}
          <Route path="/mikolaj" element={<SantaLogin />} />
          <Route path="/mikolaj/panel" element={<SantaDashboard />} />

          {/* Panel Administratora */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/placowki" element={<AdminFacilities />} />
          <Route path="/admin/listy" element={<AdminLetters />} />
          <Route path="/admin/mikolajowie" element={<AdminSantas />} />
          <Route path="/admin/akcje" element={<AdminActions />} />
          <Route path="/admin/maile" element={<AdminEmails />} />
          <Route path="/admin/uzytkownicy" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
