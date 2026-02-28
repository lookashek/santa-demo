import { useState } from 'react';
import { getFacilities } from '../../data/db-helpers';
import type { GalleryPhoto } from '../../data/models';

export default function GalleryPage() {
  const facilities = getFacilities();

  // Collect all photos across facilities
  const allPhotos: (GalleryPhoto & { facilityName: string })[] = facilities.flatMap((f) =>
    f.galleryPhotos.map((p) => ({ ...p, facilityName: f.name })),
  );

  const years = Array.from(new Set(allPhotos.map((p) => p.year))).sort((a, b) => b - a);

  const [facilityFilter, setFacilityFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [lightbox, setLightbox] = useState<(GalleryPhoto & { facilityName: string }) | null>(null);

  const filtered = allPhotos.filter(
    (p) =>
      (!facilityFilter || p.facilityId === facilityFilter) &&
      (!yearFilter || String(p.year) === yearFilter),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-forest-dark">📸 Galeria</h1>
        <div className="flex flex-wrap gap-3">
          <select
            value={facilityFilter}
            onChange={(e) => setFacilityFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
          >
            <option value="">Wszystkie placówki</option>
            {facilities.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
          >
            <option value="">Wszystkie lata</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-stone-500 text-center py-16">Brak zdjęć dla wybranych filtrów.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightbox(photo)}
              className="bg-warm-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md hover:border-gold-light transition-all cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.caption ?? photo.facilityName}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="text-sm font-medium text-stone-800 truncate">{photo.facilityName}</p>
                {photo.caption && (
                  <p className="text-xs text-stone-500 truncate">{photo.caption}</p>
                )}
                <p className="text-xs text-stone-400 mt-0.5">{photo.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.caption ?? lightbox.facilityName}
              className="w-full object-cover"
            />
            <div className="p-4 flex justify-between items-start">
              <div>
                <p className="font-semibold text-stone-900">{lightbox.facilityName}</p>
                {lightbox.caption && (
                  <p className="text-sm text-stone-500">{lightbox.caption}</p>
                )}
                <p className="text-xs text-stone-400">{lightbox.year}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-stone-400 hover:text-stone-600 text-2xl leading-none ml-4"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
