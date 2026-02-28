import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLetterById, getFacilityById, selectLetter } from '../../data/db-helpers';
import type { Santa } from '../../data/models';

type Step = 1 | 2 | 3 | 4;

function StepIndicator({ current }: { current: Step }) {
  const steps = ['Email', 'Dane', 'Zgody', 'Potwierdzenie'];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const num = (i + 1) as Step;
        const done = current > num;
        const active = current === num;
        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                done
                  ? 'bg-forest text-white'
                  : active
                  ? 'bg-gold text-white'
                  : 'bg-stone-200 text-stone-500'
              }`}
            >
              {done ? '✓' : num}
            </div>
            <span
              className={`text-sm hidden sm:block ${
                active ? 'text-forest-dark font-medium' : 'text-stone-400'
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-stone-300 mx-1" />}
          </div>
        );
      })}
    </div>
  );
}

export default function LetterSelectFlow() {
  const { letterId } = useParams<{ letterId: string }>();
  const navigate = useNavigate();

  const letter = getLetterById(letterId ?? '');
  const facility = letter ? getFacilityById(letter.facilityId) : undefined;

  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isCompany, setIsCompany] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [nip, setNip] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [done, setDone] = useState(false);
  const [assignedCode, setAssignedCode] = useState('');

  if (!letter) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-stone-500 mb-4">Nie znaleziono listu.</p>
        <Link to="/listy" className="text-forest hover:text-forest-dark">
          ← Wróć do listów
        </Link>
      </div>
    );
  }

  if (letter.status !== 'available') {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-xl font-semibold text-stone-700 mb-2">Ten list jest już wybrany.</p>
        <p className="text-stone-500 mb-6">Wybierz inny dostępny list.</p>
        <Link
          to="/listy"
          className="bg-forest hover:bg-forest-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          ← Wróć do listów
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🎅</div>
        <h2 className="text-2xl font-bold text-forest-dark mb-2">Dziękujemy!</h2>
        <p className="text-stone-600 mb-6">
          Wybrałeś/aś list <strong>{assignedCode}</strong>. Możesz zalogować się do Panelu
          Mikołaja podając adres e-mail <strong>{email}</strong> i kod listu.
        </p>
        <div className="bg-sand rounded-xl p-4 mb-6 text-left text-sm text-stone-700">
          <p>
            <span className="font-medium">Kod listu:</span> {assignedCode}
          </p>
          <p>
            <span className="font-medium">E-mail:</span> {email}
          </p>
          <p>
            <span className="font-medium">Placówka:</span> {facility?.name}
          </p>
        </div>
        <Link
          to="/mikolaj"
          className="bg-forest hover:bg-forest-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors mr-3 inline-block"
        >
          Panel Mikołaja 🎅
        </Link>
        <Link to="/listy" className="text-forest hover:text-forest-dark text-sm">
          Wróć do listów
        </Link>
      </div>
    );
  }

  const handleConfirm = () => {
    const santa: Santa = {
      id: `santa-${Date.now()}`,
      email,
      firstName,
      lastName,
      isCompany,
      companyName: isCompany ? companyName : undefined,
      nip: isCompany ? nip : undefined,
      companyAddress: isCompany ? companyAddress : undefined,
      marketingConsent,
      createdAt: new Date().toISOString(),
    };
    selectLetter(letter.id, santa);
    setAssignedCode(letter.code);
    setDone(true);
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors';
  const labelCls = 'block text-sm font-medium text-stone-700 mb-1.5';

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="mb-6">
        <Link to="/listy" className="text-forest hover:text-forest-dark text-sm">
          ← Wróć do listów
        </Link>
        <h1 className="text-2xl font-bold text-forest-dark mt-2">Wybierz list</h1>
        <p className="text-sm text-stone-500">
          {letter.code} · {facility?.name} ({facility?.city})
        </p>
      </div>

      <StepIndicator current={step} />

      <div className="bg-warm-white rounded-xl shadow-sm border border-stone-200 p-6">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Podaj adres e-mail</h3>
            <div>
              <label className={labelCls}>Adres e-mail *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.pl"
                className={inputCls}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Dane Mikołaja</h3>
            <div>
              <label className={labelCls}>Imię *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jan"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Nazwisko *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Kowalski"
                className={inputCls}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isCompany}
                onChange={(e) => setIsCompany(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300"
              />
              <span className="text-sm text-stone-700">Wybieram jako firma</span>
            </label>
            {isCompany && (
              <div className="space-y-3 border-l-2 border-gold-light pl-4">
                <div>
                  <label className={labelCls}>NIP</label>
                  <input
                    type="text"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="1234567890"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Nazwa firmy</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Firma Sp. z o.o."
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Adres firmy</label>
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    placeholder="ul. Przykładowa 1, 00-001 Warszawa"
                    className={inputCls}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Zgody</h3>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 mt-0.5"
              />
              <span className="text-sm text-stone-700">
                Wyrażam zgodę na otrzymywanie informacji marketingowych o działaniach
                Fundacji Święty Mikołaj dla Seniora. (opcjonalna)
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 mt-0.5"
              />
              <span className="text-sm text-stone-700">
                Akceptuję{' '}
                <span className="text-forest underline">Regulamin Akcji Listy</span> i
                zobowiązuję się do realizacji wybranego listu w wyznaczonym terminie. *
              </span>
            </label>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Podsumowanie</h3>
            <div className="space-y-2 text-sm text-stone-700 bg-sand rounded-lg p-4 mb-4">
              <p>
                <span className="font-medium">E-mail:</span> {email}
              </p>
              <p>
                <span className="font-medium">Imię i nazwisko:</span> {firstName} {lastName}
              </p>
              {isCompany && (
                <>
                  <p>
                    <span className="font-medium">Firma:</span> {companyName}
                  </p>
                  <p>
                    <span className="font-medium">NIP:</span> {nip}
                  </p>
                </>
              )}
              <p>
                <span className="font-medium">Kod listu:</span> {letter.code}
              </p>
              <p>
                <span className="font-medium">Placówka:</span> {facility?.name} ({facility?.city})
              </p>
              <p>
                <span className="font-medium">Zgoda marketingowa:</span>{' '}
                {marketingConsent ? 'Tak' : 'Nie'}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t border-stone-100">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="bg-sand hover:bg-gold-light text-forest-dark font-medium px-6 py-2.5 rounded-lg border border-stone-200 transition-colors"
            >
              ← Wstecz
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => {
                if (step === 1 && !email) {
                  alert('Podaj adres e-mail.');
                  return;
                }
                if (step === 2 && (!firstName || !lastName)) {
                  alert('Podaj imię i nazwisko.');
                  return;
                }
                if (step === 3 && !termsAccepted) {
                  alert('Akceptacja regulaminu jest wymagana.');
                  return;
                }
                setStep((s) => (s + 1) as Step);
              }}
              className="bg-forest hover:bg-forest-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Dalej →
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="bg-gold hover:bg-yellow-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              ✅ Potwierdź wybór
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
