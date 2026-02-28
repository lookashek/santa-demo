import { useState } from 'react';
import { actions } from '../../data/mock-db';
import type { Action } from '../../data/models';
import { Toast } from '../../components/Toast';

function EditForm({ action, onClose }: { action: Action; onClose: (msg?: string) => void }) {
  const [form, setForm] = useState({ ...action });
  const [turns, setTurns] = useState(action.turns.map((t) => ({ ...t })));

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const setTurn = (i: number, k: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTurns((ts) => ts.map((t, idx) => idx === i ? { ...t, [k]: e.target.value } : t));
  };

  const handleSave = () => {
    // Mutuj w pamięci
    const orig = actions.find((a) => a.id === action.id);
    if (orig) Object.assign(orig, { ...form, turns });
    onClose('Akcja zapisana.');
  };

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm';
  const labelCls = 'block text-xs font-medium text-stone-600 mb-1';

  return (
    <div className="mt-4 bg-white rounded-xl border border-stone-200 shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-stone-900">Edycja: {action.name}</h3>
        <button onClick={() => onClose()} className="text-stone-400 hover:text-stone-600 text-2xl leading-none">×</button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="col-span-2">
          <label className={labelCls}>Nazwa</label>
          <input className={inputCls} value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className={labelCls}>Rok</label>
          <input className={inputCls} type="number" value={form.year} onChange={set('year')} />
        </div>
        <div>
          <label className={labelCls}>&nbsp;</label>
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={set('isActive')} className="w-4 h-4" />
            <span className="text-sm text-stone-700">Aktywna akcja</span>
          </label>
        </div>
        <div>
          <label className={labelCls}>Data rozpoczęcia</label>
          <input className={inputCls} type="date" value={form.startDate} onChange={set('startDate')} />
        </div>
        <div>
          <label className={labelCls}>Data zakończenia</label>
          <input className={inputCls} type="date" value={form.endDate} onChange={set('endDate')} />
        </div>
      </div>

      <p className="text-sm font-medium text-stone-600 mb-2">Tury</p>
      {turns.map((turn, i) => (
        <div key={turn.id} className="grid grid-cols-3 gap-2 mb-2 bg-stone-50 rounded-lg p-3">
          <div>
            <label className={labelCls}>Nazwa</label>
            <input className={inputCls} value={turn.name} onChange={setTurn(i, 'name')} />
          </div>
          <div>
            <label className={labelCls}>Start</label>
            <input className={inputCls} type="date" value={turn.startDate} onChange={setTurn(i, 'startDate')} />
          </div>
          <div>
            <label className={labelCls}>Termin potwierdzenia</label>
            <input className={inputCls} type="date" value={turn.confirmByDate} onChange={setTurn(i, 'confirmByDate')} />
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button onClick={handleSave} className="bg-forest hover:bg-forest-dark text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm">
          Zapisz
        </button>
        <button onClick={() => onClose()} className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium px-5 py-2 rounded-lg transition-colors text-sm">
          Anuluj
        </button>
      </div>
    </div>
  );
}

export default function AdminActions() {
  const [editing, setEditing] = useState<Action | null>(null);
  const [toast, setToast] = useState('');

  return (
    <div>
      <h1 className="text-2xl font-bold text-forest-dark mb-4">⚙️ Konfiguracja Akcji</h1>

      <div className="space-y-3">
        {actions.map((action) => (
          <div key={action.id} className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-stone-900 text-lg">{action.name}</p>
                  {action.isActive && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Aktywna
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-500">
                  {action.startDate} — {action.endDate} · {action.turns.length} tury
                </p>
                <div className="flex gap-3 mt-2">
                  {action.turns.map((t) => (
                    <span key={t.id} className="text-xs text-stone-400 bg-stone-50 border border-stone-200 rounded px-2 py-0.5">
                      {t.name}: do {t.confirmByDate}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setEditing(editing?.id === action.id ? null : action)}
                className="bg-sand hover:bg-stone-200 text-stone-700 font-medium px-4 py-2 rounded-lg border border-stone-200 transition-colors text-sm flex-shrink-0"
              >
                {editing?.id === action.id ? 'Zwiń' : 'Edytuj'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && <EditForm action={editing} onClose={(msg) => { setEditing(null); if (msg) setToast(msg); }} />}

      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </div>
  );
}
