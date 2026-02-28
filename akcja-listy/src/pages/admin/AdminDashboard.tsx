import { letters, santas } from '../../data/mock-db';
import { getActiveAction, getActiveFacilities } from '../../data/db-helpers';

export default function AdminDashboard() {
  const action = getActiveAction();
  const activeFacilities = getActiveFacilities();

  const actionLetters = letters.filter((l) => l.actionId === action?.id);
  const byStatus = {
    available: actionLetters.filter((l) => l.status === 'available').length,
    selected: actionLetters.filter((l) => l.status === 'selected').length,
    confirmed: actionLetters.filter((l) => l.status === 'confirmed').length,
    returned: actionLetters.filter((l) => l.status === 'returned').length,
  };
  const activeActionSantas = new Set(
    actionLetters.filter((l) => l.santaId).map((l) => l.santaId),
  ).size;

  const tiles = [
    { label: 'Dostępne', value: byStatus.available, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { label: 'Wybrane', value: byStatus.selected, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { label: 'Potwierdzone', value: byStatus.confirmed, color: 'bg-sky-100 text-sky-800 border-sky-200' },
    { label: 'Zwrócone', value: byStatus.returned, color: 'bg-stone-100 text-stone-600 border-stone-200' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-forest-dark mb-6">📊 Dashboard</h1>

      {/* Aktywna akcja */}
      {action && (
        <div className="bg-white rounded-xl border-l-4 border-l-forest shadow-sm p-5 mb-6">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Aktywna akcja</p>
          <p className="text-xl font-bold text-stone-900">{action.name}</p>
          <p className="text-sm text-stone-500 mt-0.5">
            {action.startDate} — {action.endDate} · {action.turns.length} tury
          </p>
        </div>
      )}

      {/* Kafelki statusów */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {tiles.map((t) => (
          <div key={t.label} className={`rounded-xl border p-5 ${t.color}`}>
            <p className="text-3xl font-bold">{t.value}</p>
            <p className="text-sm font-medium mt-1">{t.label}</p>
          </div>
        ))}
      </div>

      {/* Dodatkowe statystyki */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
          <p className="text-3xl font-bold text-forest">{actionLetters.length}</p>
          <p className="text-sm text-stone-500 mt-1">Łącznie listów w akcji</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
          <p className="text-3xl font-bold text-forest">{activeFacilities.length}</p>
          <p className="text-sm text-stone-500 mt-1">Aktywnych placówek</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
          <p className="text-3xl font-bold text-forest">{activeActionSantas}</p>
          <p className="text-sm text-stone-500 mt-1">Mikołajów w akcji</p>
        </div>
      </div>
    </div>
  );
}
