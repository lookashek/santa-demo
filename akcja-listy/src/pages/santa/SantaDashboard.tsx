import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSanta } from '../../context/SantaContext';
import {
  getLettersBySanta,
  getFacilityById,
  getActiveAction,
  confirmLetter,
  returnLetter,
  updateLetterTracking,
} from '../../data/db-helpers';
import { actions } from '../../data/mock-db';
import type { Letter } from '../../data/models';
import { ConfirmDialog } from '../../components/ConfirmDialog';

function StatusBadge({ status }: { status: Letter['status'] }) {
  const map = {
    selected: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-sky-100 text-sky-800',
    returned: 'bg-stone-100 text-stone-600',
    available: 'bg-emerald-100 text-emerald-800',
  };
  const labels = {
    selected: '⏳ Oczekuje na realizację',
    confirmed: '✅ Zrealizowany',
    returned: '↩️ Zwrócony',
    available: 'Dostępny',
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function LetterCard({ letter, turnDeadline }: { letter: Letter; turnDeadline?: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [showConfirmReturn, setShowConfirmReturn] = useState(false);
  const [amount, setAmount] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'shipping' | 'personal'>('shipping');
  const [trackingLink, setTrackingLink] = useState('');
  const [, forceUpdate] = useState(0);

  const facility = getFacilityById(letter.facilityId);

  const handleConfirm = () => {
    confirmLetter(letter.id, Number(amount) || 0);
    setShowConfirm(false);
    forceUpdate((n) => n + 1);
  };

  const handleReturn = () => {
    returnLetter(letter.id);
    forceUpdate((n) => n + 1);
  };

  const handleTracking = () => {
    updateLetterTracking(letter.id, deliveryMethod === 'shipping' ? trackingLink || null : null, deliveryMethod);
    setShowTracking(false);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="bg-warm-white rounded-xl shadow-sm border border-stone-200 p-5">
      <div className="flex gap-4">
        <img
          src={letter.imageUrls[0]}
          alt={`List ${letter.code}`}
          className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="text-lg font-bold text-stone-900">{letter.code}</p>
              <p className="text-sm text-stone-500">{facility?.name} — {facility?.city}</p>
            </div>
            <StatusBadge status={letter.status} />
          </div>

          {turnDeadline && letter.status === 'selected' && (
            <p className="text-xs text-stone-400 mt-1">
              Termin potwierdzenia: <span className="font-medium">{turnDeadline}</span>
            </p>
          )}

          {/* Szczegóły confirmed */}
          {letter.status === 'confirmed' && (
            <div className="mt-2 text-xs text-stone-500 space-y-0.5">
              {letter.estimatedValue !== null && (
                <p>Szacunkowa kwota: <span className="font-medium">{letter.estimatedValue} PLN</span></p>
              )}
              {letter.deliveryMethod && (
                <p>Dostawa: <span className="font-medium">{letter.deliveryMethod === 'personal' ? 'Osobiście' : 'Kurier/poczta'}</span></p>
              )}
              {letter.trackingLink && (
                <p>
                  Śledzenie:{' '}
                  <a href={letter.trackingLink} target="_blank" rel="noreferrer" className="text-forest underline">
                    link
                  </a>
                </p>
              )}
            </div>
          )}

          {letter.status === 'returned' && (
            <p className="mt-2 text-xs text-stone-400">Ten list wrócił do puli.</p>
          )}
        </div>
      </div>

      {/* Akcje dla selected */}
      {letter.status === 'selected' && (
        <div className="mt-4 space-y-3">
          {/* Potwierdź realizację */}
          {!showConfirm ? (
            <button
              onClick={() => { setShowConfirm(true); setShowTracking(false); }}
              className="bg-forest hover:bg-forest-dark text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
            >
              ✅ Potwierdź realizację
            </button>
          ) : (
            <div className="bg-sand rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium text-stone-700">Szacunkowa kwota paczki (PLN)</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="np. 150"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleConfirm}
                  className="bg-forest hover:bg-forest-dark text-white font-medium px-4 py-1.5 rounded-lg transition-colors text-sm"
                >
                  Potwierdź
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-sand hover:bg-gold-light text-forest-dark font-medium px-4 py-1.5 rounded-lg border border-stone-200 transition-colors text-sm"
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {/* Dodaj śledzenie */}
            <button
              onClick={() => { setShowTracking(!showTracking); setShowConfirm(false); }}
              className="bg-sand hover:bg-gold-light text-forest-dark font-medium px-4 py-2 rounded-lg border border-stone-200 transition-colors text-sm"
            >
              📦 Dodaj śledzenie
            </button>

            {/* Zrezygnuj */}
            <button
              onClick={() => setShowConfirmReturn(true)}
              className="bg-red-50 hover:bg-red-100 text-red-700 font-medium px-4 py-2 rounded-lg border border-red-200 transition-colors text-sm"
            >
              ✕ Zrezygnuj
            </button>
          </div>

          {showConfirmReturn && (
            <ConfirmDialog
              title="Zrezygnować z listu?"
              message="List wróci do puli i będzie ponownie dostępny dla innych Mikołajów."
              confirmLabel="Zrezygnuj"
              onConfirm={() => { setShowConfirmReturn(false); handleReturn(); }}
              onCancel={() => setShowConfirmReturn(false)}
            />
          )}

          {showTracking && (
            <div className="bg-sand rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium text-stone-700">Sposób dostarczenia</p>
              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="radio"
                  checked={deliveryMethod === 'shipping'}
                  onChange={() => setDeliveryMethod('shipping')}
                />
                Wyślę kurierem / pocztą
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  type="radio"
                  checked={deliveryMethod === 'personal'}
                  onChange={() => setDeliveryMethod('personal')}
                />
                Dostarczę osobiście
              </label>
              {deliveryMethod === 'shipping' && (
                <input
                  type="text"
                  value={trackingLink}
                  onChange={(e) => setTrackingLink(e.target.value)}
                  placeholder="Link do śledzenia przesyłki"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest text-sm"
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleTracking}
                  className="bg-forest hover:bg-forest-dark text-white font-medium px-4 py-1.5 rounded-lg transition-colors text-sm"
                >
                  Zapisz
                </button>
                <button
                  onClick={() => setShowTracking(false)}
                  className="bg-sand hover:bg-gold-light text-forest-dark font-medium px-4 py-1.5 rounded-lg border border-stone-200 transition-colors text-sm"
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SantaDashboard() {
  const navigate = useNavigate();
  const { currentSanta, logout } = useSanta();

  if (!currentSanta) {
    navigate('/mikolaj');
    return null;
  }

  const activeAction = getActiveAction();
  const allLetters = getLettersBySanta(currentSanta.id);

  const currentLetters = allLetters.filter((l) => l.actionId === activeAction?.id);
  const archiveLetters = allLetters.filter((l) => l.actionId !== activeAction?.id);

  // Mapa tur → deadline
  const turnDeadlineMap: Record<string, string> = {};
  for (const action of actions) {
    for (const turn of action.turns) {
      turnDeadlineMap[turn.id] = turn.confirmByDate;
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/mikolaj');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Dane Mikołaja */}
      <div className="bg-warm-white rounded-xl shadow-sm border border-stone-200 p-5 mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🎅</span>
            <h2 className="text-xl font-bold text-forest-dark">
              {currentSanta.isCompany
                ? currentSanta.companyName
                : `${currentSanta.firstName} ${currentSanta.lastName}`}
            </h2>
          </div>
          <p className="text-sm text-stone-500">{currentSanta.email}</p>
          {currentSanta.isCompany && currentSanta.nip && (
            <p className="text-xs text-stone-400 mt-0.5">NIP: {currentSanta.nip}</p>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="bg-sand hover:bg-gold-light text-forest-dark font-medium px-4 py-2 rounded-lg border border-stone-200 transition-colors text-sm flex-shrink-0"
        >
          Wyloguj
        </button>
      </div>

      {/* Bieżące listy */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-forest-dark mb-4">
          ✉️ Moje bieżące listy
          {activeAction && (
            <span className="text-base font-normal text-stone-400 ml-2">({activeAction.name})</span>
          )}
        </h2>

        {currentLetters.length === 0 ? (
          <div className="bg-warm-white rounded-xl border border-stone-200 p-8 text-center">
            <p className="text-stone-500">Nie masz jeszcze żadnych listów w bieżącej akcji.</p>
            <a
              href="/listy"
              className="inline-block mt-4 bg-forest hover:bg-forest-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Wybierz list ✉️
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {currentLetters.map((letter) => (
              <LetterCard
                key={letter.id}
                letter={letter}
                turnDeadline={turnDeadlineMap[letter.turnId]}
              />
            ))}
          </div>
        )}
      </section>

      {/* Archiwum */}
      <section>
        <h2 className="text-2xl font-semibold text-forest-dark mb-4">📚 Archiwum</h2>

        {archiveLetters.length === 0 ? (
          <p className="text-stone-400 text-sm">Brak archiwalnych listów.</p>
        ) : (
          <div className="space-y-3">
            {archiveLetters.map((letter) => {
              const facility = getFacilityById(letter.facilityId);
              const actionYear = actions.find((a) => a.id === letter.actionId)?.year;
              return (
                <div
                  key={letter.id}
                  className="bg-warm-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold text-stone-900">{letter.code}</p>
                    <p className="text-sm text-stone-500">
                      {facility?.name} · {actionYear}
                    </p>
                  </div>
                  <StatusBadge status={letter.status} />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
