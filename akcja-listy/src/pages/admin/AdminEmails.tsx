import { useState } from 'react';
import { getEmailTemplates, updateEmailTemplate } from '../../data/db-helpers';
import { santas, letters } from '../../data/mock-db';
import type { EmailTemplate } from '../../data/models';

function EditModal({ tpl, onClose }: { tpl: EmailTemplate; onClose: () => void }) {
  const [form, setForm] = useState({ name: tpl.name, subject: tpl.subject, body: tpl.body });

  const handleSave = () => {
    updateEmailTemplate(tpl.id, form);
    alert('Szablon zapisany.');
    onClose();
  };

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-stone-900">Edycja szablonu</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-2xl leading-none">×</button>
        </div>

        <p className="text-xs text-stone-400 mb-3">Typ: <span className="font-mono">{tpl.type}</span></p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Nazwa szablonu</label>
            <input className={inputCls} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Temat maila</label>
            <input className={inputCls} value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Treść (HTML)</label>
            <textarea
              rows={8}
              className={inputCls}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            />
          </div>
        </div>

        {/* Dostępne parametry */}
        <div className="mt-3 bg-stone-50 rounded-lg p-3">
          <p className="text-xs font-medium text-stone-500 mb-2">Dostępne parametry:</p>
          <div className="flex flex-wrap gap-1.5">
            {tpl.availableParams.map((p) => (
              <span key={p} className="font-mono text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded cursor-pointer hover:bg-gold-light"
                onClick={() => setForm((f) => ({ ...f, body: f.body + `{${p}}` }))}>
                {`{${p}}`}
              </span>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-1">Kliknij parametr, żeby go wstawić na koniec treści.</p>
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={handleSave} className="bg-forest hover:bg-forest-dark text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm">
            Zapisz
          </button>
          <button onClick={onClose} className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium px-5 py-2 rounded-lg transition-colors text-sm">
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}

function SendModal({ tpl, onClose }: { tpl: EmailTemplate; onClose: () => void }) {
  const [santaId, setSantaId] = useState('');
  const [letterId, setLetterId] = useState('');

  const santaLetters = santaId ? letters.filter((l) => l.santaId === santaId) : [];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-stone-900">Wyślij: {tpl.name}</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-2xl leading-none">×</button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">Mikołaj</label>
            <select
              value={santaId}
              onChange={(e) => { setSantaId(e.target.value); setLetterId(''); }}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
            >
              <option value="">Wybierz Mikołaja…</option>
              {santas.map((s) => (
                <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.email})</option>
              ))}
            </select>
          </div>

          {santaLetters.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">List</label>
              <select
                value={letterId}
                onChange={(e) => setLetterId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
              >
                <option value="">Wybierz list…</option>
                {santaLetters.map((l) => (
                  <option key={l.id} value={l.id}>{l.code} ({l.status})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => { alert('Wiadomość wysłana (symulacja) ✉️'); onClose(); }}
            disabled={!santaId}
            className="bg-forest hover:bg-forest-dark disabled:opacity-50 text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm"
          >
            Wyślij
          </button>
          <button onClick={onClose} className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium px-5 py-2 rounded-lg transition-colors text-sm">
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminEmails() {
  const templates = getEmailTemplates();
  const [editing, setEditing] = useState<EmailTemplate | null>(null);
  const [sending, setSending] = useState<EmailTemplate | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-bold text-forest-dark mb-4">📧 Maile</h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              {['Typ', 'Nazwa', 'Temat', 'Akcje'].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr key={tpl.id} className="hover:bg-stone-50 transition-colors border-b border-stone-100">
                <td className="px-4 py-3 text-xs font-mono text-stone-500">{tpl.type}</td>
                <td className="px-4 py-3 text-sm font-medium text-stone-900">{tpl.name}</td>
                <td className="px-4 py-3 text-sm text-stone-600 max-w-xs truncate">{tpl.subject}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => setEditing(tpl)} className="text-forest hover:text-forest-dark text-sm font-medium">
                      Edytuj
                    </button>
                    <button onClick={() => setSending(tpl)} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                      Wyślij testowo
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && <EditModal tpl={editing} onClose={() => setEditing(null)} />}
      {sending && <SendModal tpl={sending} onClose={() => setSending(null)} />}
    </div>
  );
}
