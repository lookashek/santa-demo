import { useState } from 'react';
import { letters, santas } from '../../data/mock-db';
import {
  getFacilities,
  getActiveAction,
  confirmLetter,
  returnLetter,
  detachSantaFromLetter,
  getSantaById,
  getFacilityById,
} from '../../data/db-helpers';
import type { Letter, LetterStatus } from '../../data/models';

const STATUS_LABELS: Record<LetterStatus, string> = {
  available: 'Dostępny',
  selected: 'Wybrany',
  confirmed: 'Potwierdzony',
  returned: 'Zwrócony',
};

const STATUS_BADGE: Record<LetterStatus, string> = {
  available: 'bg-emerald-100 text-emerald-800',
  selected: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-sky-100 text-sky-800',
  returned: 'bg-stone-100 text-stone-600',
};

function DetailModal({ letter, onClose, onMutate }: { letter: Letter; onClose: () => void; onMutate: () => void }) {
  const facility = getFacilityById(letter.facilityId);
  const santa = letter.santaId ? getSantaById(letter.santaId) : null;

  const handleConfirm = () => {
    confirmLetter(letter.id, 0);
    onMutate();
  };
  const handleReturn = () => {
    if (window.confirm('Wycofać list?')) { returnLetter(letter.id); onMutate(); }
  };
  const handleDetach = () => {
    if (window.confirm('Odpiąć Mikołaja od listu?')) { detachSantaFromLetter(letter.id); onMutate(); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-stone-900">List {letter.code}</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-2xl leading-none">×</button>
        </div>

        <img src={letter.imageUrls[0]} alt={letter.code} className="w-full h-48 object-cover rounded-lg mb-4" />

        <div className="space-y-1.5 text-sm mb-4">
          <p><span className="text-stone-500 w-32 inline-block">Status:</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[letter.status]}`}>
              {STATUS_LABELS[letter.status]}
            </span>
          </p>
          <p><span className="text-stone-500 w-32 inline-block">Placówka:</span> {facility?.name}</p>
          <p><span className="text-stone-500 w-32 inline-block">Tura:</span> {letter.turnId}</p>
          {letter.selectedAt && <p><span className="text-stone-500 w-32 inline-block">Wybrano:</span> {letter.selectedAt.slice(0, 10)}</p>}
          {letter.estimatedValue !== null && <p><span className="text-stone-500 w-32 inline-block">Kwota:</span> {letter.estimatedValue} PLN</p>}
          {letter.deliveryMethod && <p><span className="text-stone-500 w-32 inline-block">Dostawa:</span> {letter.deliveryMethod === 'personal' ? 'Osobiście' : 'Kurier'}</p>}
          {letter.trackingLink && <p><span className="text-stone-500 w-32 inline-block">Tracking:</span> <a href={letter.trackingLink} target="_blank" rel="noreferrer" className="text-forest underline">{letter.trackingLink.slice(0, 30)}…</a></p>}
        </div>

        {santa && (
          <div className="bg-stone-50 rounded-lg p-3 mb-4 text-sm space-y-0.5">
            <p className="font-medium text-stone-700 mb-1">Mikołaj</p>
            <p>{santa.firstName} {santa.lastName}{santa.isCompany ? ` (${santa.companyName})` : ''}</p>
            <p className="text-stone-500">{santa.email}</p>
            {santa.phone && <p className="text-stone-500">{santa.phone}</p>}
          </div>
        )}

        {/* Akcje admina */}
        <div className="flex flex-wrap gap-2">
          {letter.status === 'selected' && (
            <button onClick={handleConfirm} className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
              ✅ Potwierdź
            </button>
          )}
          {(letter.status === 'selected' || letter.status === 'confirmed') && (
            <button onClick={handleReturn} className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
              Wycofaj list
            </button>
          )}
          {letter.santaId && (
            <button onClick={handleDetach} className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">
              Odepnij Mikołaja
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminLetters() {
  const facilities = getFacilities();
  const activeAction = getActiveAction();
  const turns = activeAction?.turns ?? [];

  const [statusFilter, setStatusFilter] = useState<LetterStatus | ''>('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [turnFilter, setTurnFilter] = useState('');
  const [selected, setSelected] = useState<Letter | null>(null);
  const [, forceUpdate] = useState(0);

  const filtered = letters.filter((l) =>
    (!statusFilter || l.status === statusFilter) &&
    (!facilityFilter || l.facilityId === facilityFilter) &&
    (!turnFilter || l.turnId === turnFilter),
  );

  const facilityMap = Object.fromEntries(facilities.map((f) => [f.id, f.name]));
  const santaMap = Object.fromEntries(santas.map((s) => [s.id, `${s.firstName} ${s.lastName}`]));

  const selCls = 'px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest/30';

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-forest-dark">✉️ Listy</h1>
        <button
          onClick={() => alert('Eksport do Excela — funkcja dostępna w pełnej wersji.')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          📥 Eksport do Excela
        </button>
      </div>

      {/* Filtry */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as LetterStatus | '')} className={selCls}>
          <option value="">Wszystkie statusy</option>
          {(Object.keys(STATUS_LABELS) as LetterStatus[]).map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        <select value={facilityFilter} onChange={(e) => setFacilityFilter(e.target.value)} className={selCls}>
          <option value="">Wszystkie placówki</option>
          {facilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        <select value={turnFilter} onChange={(e) => setTurnFilter(e.target.value)} className={selCls}>
          <option value="">Wszystkie tury</option>
          {turns.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <span className="text-sm text-stone-400 self-center">{filtered.length} listów</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {['Kod', 'Placówka', 'Tura', 'Status', 'Mikołaj', 'Wybrano', 'Akcje'].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-stone-50 transition-colors border-b border-stone-100">
                <td className="px-4 py-3 text-sm font-mono font-medium text-stone-900">{l.code}</td>
                <td className="px-4 py-3 text-sm text-stone-700">{facilityMap[l.facilityId]}</td>
                <td className="px-4 py-3 text-sm text-stone-500">{l.turnId.split('-').slice(-1)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[l.status]}`}>
                    {STATUS_LABELS[l.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-stone-600">{l.santaId ? santaMap[l.santaId] : '—'}</td>
                <td className="px-4 py-3 text-sm text-stone-500">{l.selectedAt ? l.selectedAt.slice(0, 10) : '—'}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelected(l)}
                    className="text-forest hover:text-forest-dark text-sm font-medium"
                  >
                    Szczegóły
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <DetailModal
          letter={selected}
          onClose={() => setSelected(null)}
          onMutate={() => { forceUpdate((n) => n + 1); setSelected(null); }}
        />
      )}
    </div>
  );
}
