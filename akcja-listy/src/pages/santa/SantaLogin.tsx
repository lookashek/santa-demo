import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSantaByEmail, getLetterByCode, getActiveAction } from '../../data/db-helpers';
import { useSanta } from '../../context/SantaContext';

const DEMO_SANTAS = [
  { id: 'santa-1', label: 'Anna Kowalska', desc: '2 listy (selected)' },
  { id: 'santa-2', label: 'Jan Nowak', desc: '1 selected + 1 confirmed' },
  { id: 'santa-3', label: 'Dobro Sp. z o.o.', desc: 'firma, 1 selected + 1 confirmed' },
  { id: 'santa-5', label: 'Zofia Wróbel', desc: 'tylko archiwum (2024)' },
];

export default function SantaLogin() {
  const navigate = useNavigate();
  const { login } = useSanta();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const activeAction = getActiveAction();

  const handleLogin = () => {
    setError('');
    const santa = getSantaByEmail(email.trim());
    if (!santa) {
      setError('Nieprawidłowy email lub kod listu.');
      return;
    }
    const letter = getLetterByCode(code.trim().toUpperCase());
    if (
      !letter ||
      letter.santaId !== santa.id ||
      letter.actionId !== activeAction?.id
    ) {
      setError('Nieprawidłowy email lub kod listu.');
      return;
    }
    login(santa.id);
    navigate('/mikolaj/panel');
  };

  const handleDemo = (santaId: string) => {
    login(santaId);
    navigate('/mikolaj/panel');
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors';
  const labelCls = 'block text-sm font-medium text-stone-700 mb-1.5';

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🎅</div>
        <h1 className="text-2xl font-bold text-forest-dark">Panel Mikołaja</h1>
        <p className="text-stone-500 text-sm mt-1">
          Zaloguj się swoim adresem e-mail i kodem listu.
        </p>
      </div>

      <div className="bg-warm-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Adres e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              className={inputCls}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div>
            <label className={labelCls}>Kod listu</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="np. WAW005"
              className={inputCls}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-forest hover:bg-forest-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Zaloguj się
          </button>
        </div>
      </div>

      {/* Demo shortcuts */}
      <div className="bg-sand rounded-xl border border-gold-light p-4">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
          ⚡ Szybki dostęp (demo)
        </p>
        <div className="space-y-2">
          {DEMO_SANTAS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleDemo(s.id)}
              className="w-full text-left px-3 py-2 rounded-lg bg-warm-white hover:bg-gold-light border border-stone-200 transition-colors"
            >
              <span className="text-sm font-medium text-forest-dark">{s.label}</span>
              <span className="text-xs text-stone-400 ml-2">— {s.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
