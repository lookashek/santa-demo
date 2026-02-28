import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { letters } from '../../data/mock-db';
import { getFacilities } from '../../data/db-helpers';
import type { Letter, Facility } from '../../data/models';

function StatusBadge({ status }: { status: Letter['status'] }) {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
        Dostępny
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
      Wybrany
    </span>
  );
}

function LetterModal({
  letter,
  facility,
  onClose,
  onSelect,
}: {
  letter: Letter;
  facility: Facility | undefined;
  onClose: () => void;
  onSelect: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">List {letter.code}</h3>
            <p className="text-sm text-stone-500">{facility?.name} — {facility?.city}</p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-2xl leading-none ml-4"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          {letter.imageUrls.map((url, i) => (
            <img key={i} src={url} alt={`List ${letter.code} str. ${i + 1}`} className="w-full rounded-lg" />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <StatusBadge status={letter.status} />
          {letter.status === 'available' ? (
            <button
              onClick={onSelect}
              className="bg-forest hover:bg-forest-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Wybierz ten list ✉️
            </button>
          ) : (
            <p className="text-sm text-stone-400">Ten list jest już wybrany</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LettersPage() {
  const navigate = useNavigate();
  const facilities = getFacilities();
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [modalLetter, setModalLetter] = useState<Letter | null>(null);

  const filtered = letters.filter(
    (l) => !selectedFacility || l.facilityId === selectedFacility,
  );

  const facilityMap = Object.fromEntries(facilities.map((f) => [f.id, f]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-forest-dark">✉️ Listy seniorów</h1>
        <select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="w-full sm:w-72 px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
        >
          <option value="">Wszystkie placówki</option>
          {facilities.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name} ({f.city})
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-stone-500 text-center py-16">Brak listów dla wybranych filtrów.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((letter) => {
            const facility = facilityMap[letter.facilityId];
            const isAvailable = letter.status === 'available';
            return (
              <div
                key={letter.id}
                onClick={() => setModalLetter(letter)}
                className={`bg-warm-white rounded-xl shadow-sm border border-stone-200 p-4 transition-all cursor-pointer ${
                  isAvailable
                    ? 'hover:shadow-md hover:border-gold-light'
                    : 'opacity-60'
                }`}
              >
                <div className="relative mb-3">
                  <img
                    src={letter.imageUrls[0]}
                    alt={`List ${letter.code}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
                      <span className="text-stone-500 font-medium text-sm">Wybrany</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{letter.code}</p>
                    <p className="text-xs text-stone-500">{facility?.city}</p>
                  </div>
                  <StatusBadge status={letter.status} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalLetter && (
        <LetterModal
          letter={modalLetter}
          facility={facilityMap[modalLetter.facilityId]}
          onClose={() => setModalLetter(null)}
          onSelect={() => {
            setModalLetter(null);
            navigate(`/wybierz/${modalLetter.id}`);
          }}
        />
      )}
    </div>
  );
}
