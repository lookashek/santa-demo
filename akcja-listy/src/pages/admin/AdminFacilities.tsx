import { useState } from 'react';
import { getFacilities, updateFacility } from '../../data/db-helpers';
import type { Facility } from '../../data/models';
import { Toast } from '../../components/Toast';

function EditModal({ facility, onClose }: { facility: Facility; onClose: (msg?: string) => void }) {
  const [form, setForm] = useState({ ...facility });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSave = () => {
    updateFacility(facility.id, form);
    onClose('Placówka zaktualizowana.');
  };

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest text-sm';
  const labelCls = 'block text-xs font-medium text-stone-600 mb-1';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => onClose()}>
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-stone-900">Edycja: {facility.name}</h3>
          <button onClick={() => onClose()} className="text-stone-400 hover:text-stone-600 text-2xl leading-none">×</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Nazwa</label>
            <input className={inputCls} value={form.name} onChange={set('name')} />
          </div>
          <div>
            <label className={labelCls}>Kod</label>
            <input className={inputCls} value={form.code} onChange={set('code')} />
          </div>
          <div>
            <label className={labelCls}>Miasto</label>
            <input className={inputCls} value={form.city} onChange={set('city')} />
          </div>
          <div>
            <label className={labelCls}>Kod pocztowy</label>
            <input className={inputCls} value={form.postalCode} onChange={set('postalCode')} />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Adres</label>
            <input className={inputCls} value={form.address} onChange={set('address')} />
          </div>
          <div>
            <label className={labelCls}>Telefon</label>
            <input className={inputCls} value={form.phone} onChange={set('phone')} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input className={inputCls} value={form.email} onChange={set('email')} />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Osoba kontaktowa</label>
            <input className={inputCls} value={form.contactPerson} onChange={set('contactPerson')} />
          </div>
          <div className="col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isExcluded} onChange={set('isExcluded')} className="w-4 h-4" />
              <span className="text-sm text-stone-700">Wyklucz z bieżącej akcji</span>
            </label>
          </div>
        </div>

        {/* Galeria — podgląd */}
        {facility.galleryPhotos.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-stone-600 mb-2">Galeria zdjęć</p>
            <div className="grid grid-cols-3 gap-2">
              {facility.galleryPhotos.map((p) => (
                <img key={p.id} src={p.url} alt={p.caption} className="w-full h-20 object-cover rounded-lg" />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-5">
          <button onClick={handleSave} className="bg-forest hover:bg-forest-dark text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm">
            Zapisz
          </button>
          <button onClick={() => onClose()} className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium px-5 py-2 rounded-lg transition-colors text-sm">
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFacilities() {
  const [facilities, setFacilities] = useState(() => getFacilities());
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Facility | null>(null);
  const [sortKey, setSortKey] = useState<'name' | 'city'>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [toast, setToast] = useState('');

  const handleSort = (key: 'name' | 'city') => {
    if (sortKey === key) setSortAsc((a) => !a);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = [...facilities]
    .filter((f) =>
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.city.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const v = a[sortKey].localeCompare(b[sortKey], 'pl');
      return sortAsc ? v : -v;
    });

  const SortIcon = ({ k }: { k: string }) =>
    sortKey === k ? <span>{sortAsc ? ' ↑' : ' ↓'}</span> : null;

  const thCls = 'px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider text-left cursor-pointer select-none';

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-forest-dark">🏥 Placówki</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj po nazwie / mieście…"
          className="px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 w-60"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className={thCls}>Kod</th>
              <th className={thCls} onClick={() => handleSort('name')}>Nazwa <SortIcon k="name" /></th>
              <th className={thCls} onClick={() => handleSort('city')}>Miasto <SortIcon k="city" /></th>
              <th className={thCls}>Telefon</th>
              <th className={thCls}>Wykluczona</th>
              <th className={thCls}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-stone-50 transition-colors border-b border-stone-100">
                <td className="px-4 py-3 text-sm text-stone-500 font-mono">{f.code}</td>
                <td className="px-4 py-3 text-sm text-stone-900 font-medium">{f.name}</td>
                <td className="px-4 py-3 text-sm text-stone-700">{f.city}</td>
                <td className="px-4 py-3 text-sm text-stone-500">{f.phone}</td>
                <td className="px-4 py-3 text-sm">
                  {f.isExcluded ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Tak</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Nie</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => { setEditing(f); setFacilities(getFacilities()); }}
                    className="text-forest hover:text-forest-dark text-sm font-medium"
                  >
                    Edytuj
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditModal
          facility={editing}
          onClose={(msg) => { setEditing(null); setFacilities(getFacilities()); if (msg) setToast(msg); }}
        />
      )}

      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </div>
  );
}
