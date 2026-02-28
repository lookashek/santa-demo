import { useState } from 'react';
import { santas, letters, actions } from '../../data/mock-db';
import { getFacilityById } from '../../data/db-helpers';
import type { Santa } from '../../data/models';

const STATUS_BADGE: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-800',
  selected: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-sky-100 text-sky-800',
  returned: 'bg-stone-100 text-stone-600',
};
const STATUS_LABELS: Record<string, string> = {
  available: 'Dostępny', selected: 'Wybrany', confirmed: 'Potwierdzony', returned: 'Zwrócony',
};

function DetailPanel({ santa, onClose }: { santa: Santa; onClose: () => void }) {
  const santaLetters = letters.filter((l) => l.santaId === santa.id);
  const yearMap = Object.fromEntries(actions.map((a) => [a.id, a.year]));

  return (
    <div className="mt-4 bg-white rounded-xl border border-stone-200 shadow-sm p-5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900">
            {santa.isCompany ? santa.companyName : `${santa.firstName} ${santa.lastName}`}
          </h3>
          <p className="text-sm text-stone-500">{santa.email}</p>
          {santa.phone && <p className="text-sm text-stone-500">{santa.phone}</p>}
          {santa.isCompany && santa.nip && <p className="text-xs text-stone-400">NIP: {santa.nip}</p>}
          <p className="text-xs text-stone-400 mt-1">
            Zgoda marketingowa: {santa.marketingConsent ? 'Tak' : 'Nie'}
          </p>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-2xl leading-none">×</button>
      </div>

      <p className="text-sm font-medium text-stone-600 mb-2">Listy Mikołaja ({santaLetters.length})</p>
      {santaLetters.length === 0 ? (
        <p className="text-sm text-stone-400">Brak listów.</p>
      ) : (
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              {['Kod', 'Placówka', 'Rok', 'Status'].map((h) => (
                <th key={h} className="px-3 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {santaLetters.map((l) => {
              const facility = getFacilityById(l.facilityId);
              return (
                <tr key={l.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-3 py-2 font-mono">{l.code}</td>
                  <td className="px-3 py-2 text-stone-600">{facility?.name}</td>
                  <td className="px-3 py-2 text-stone-500">{yearMap[l.actionId]}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[l.status]}`}>
                      {STATUS_LABELS[l.status]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function AdminSantas() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Santa | null>(null);

  const letterCount = (santaId: string) => letters.filter((l) => l.santaId === santaId).length;

  const filtered = santas.filter(
    (s) =>
      !search ||
      `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-forest-dark">🎅 Mikołajowie</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj po imieniu / emailu…"
          className="px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 w-64"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {['Imię i nazwisko', 'Email', 'Firma', 'Listy', 'Zgoda mktg', 'Akcje'].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-stone-50 transition-colors border-b border-stone-100">
                <td className="px-4 py-3 text-sm font-medium text-stone-900">{s.firstName} {s.lastName}</td>
                <td className="px-4 py-3 text-sm text-stone-600">{s.email}</td>
                <td className="px-4 py-3 text-sm text-stone-500">{s.isCompany ? s.companyName ?? '—' : '—'}</td>
                <td className="px-4 py-3 text-sm text-stone-700">{letterCount(s.id)}</td>
                <td className="px-4 py-3 text-sm">{s.marketingConsent ? '✅' : '—'}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelected(selected?.id === s.id ? null : s)}
                    className="text-forest hover:text-forest-dark text-sm font-medium"
                  >
                    {selected?.id === s.id ? 'Zwiń' : 'Szczegóły'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <DetailPanel santa={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
