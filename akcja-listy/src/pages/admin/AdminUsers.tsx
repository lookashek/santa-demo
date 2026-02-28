import { useState } from 'react';
import { adminUsers } from '../../data/mock-db';
import { getFacilities } from '../../data/db-helpers';
import type { AdminUser, AdminRole } from '../../data/models';
import { Toast } from '../../components/Toast';

function EditModal({ user, onClose }: { user: AdminUser; onClose: (msg?: string) => void }) {
  const facilities = getFacilities();
  const [form, setForm] = useState({ name: user.name, email: user.email, role: user.role, facilityIds: [...user.facilityIds] });

  const toggleFacility = (id: string) => {
    setForm((f) => ({
      ...f,
      facilityIds: f.facilityIds.includes(id)
        ? f.facilityIds.filter((x) => x !== id)
        : [...f.facilityIds, id],
    }));
  };

  const handleSave = () => {
    const orig = adminUsers.find((u) => u.id === user.id);
    if (orig) Object.assign(orig, form);
    onClose('Użytkownik zaktualizowany.');
  };

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm';
  const labelCls = 'block text-xs font-medium text-stone-600 mb-1';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => onClose()}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-stone-900">Edycja: {user.name}</h3>
          <button onClick={() => onClose()} className="text-stone-400 hover:text-stone-600 text-2xl leading-none">×</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className={labelCls}>Imię i nazwisko</label>
            <input className={inputCls} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input className={inputCls} type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Rola</label>
            <select
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as AdminRole }))}
              className={inputCls}
            >
              <option value="admin">Admin</option>
              <option value="volunteer">Wolontariusz</option>
            </select>
          </div>

          {form.role === 'volunteer' && (
            <div>
              <label className={labelCls}>Powiązane placówki (puste = wszystkie)</label>
              <div className="space-y-1.5 mt-1">
                {facilities.map((f) => (
                  <label key={f.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.facilityIds.includes(f.id)}
                      onChange={() => toggleFacility(f.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-stone-700">{f.name} ({f.city})</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

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

export default function AdminUsers() {
  const facilities = getFacilities();
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [, forceUpdate] = useState(0);
  const [toast, setToast] = useState('');

  const facilityNames = (ids: string[]) =>
    ids.length === 0 ? 'Wszystkie' : ids.map((id) => facilities.find((f) => f.id === id)?.name ?? id).join(', ');

  return (
    <div>
      <h1 className="text-2xl font-bold text-forest-dark mb-4">👤 Użytkownicy admina</h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {['Imię i nazwisko', 'Email', 'Rola', 'Placówki', 'Akcje'].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((u) => (
              <tr key={u.id} className="hover:bg-stone-50 transition-colors border-b border-stone-100">
                <td className="px-4 py-3 text-sm font-medium text-stone-900">{u.name}</td>
                <td className="px-4 py-3 text-sm text-stone-600">{u.email}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    u.role === 'admin' ? 'bg-forest text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {u.role === 'admin' ? 'Admin' : 'Wolontariusz'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-stone-500 max-w-xs truncate">{facilityNames(u.facilityIds)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditing(u)}
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
          user={editing}
          onClose={(msg) => { setEditing(null); forceUpdate((n) => n + 1); if (msg) setToast(msg); }}
        />
      )}

      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </div>
  );
}
