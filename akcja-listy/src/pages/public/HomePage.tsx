import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableLetters } from '../../data/db-helpers';

const FAQ_ITEMS = [
  {
    question: 'Jak wybrać list?',
    answer:
      'Przejdź do zakładki "Listy", wybierz list seniora, który chcesz zrealizować, i kliknij "Wybierz ten list". Zostaniesz poprowadzony przez prosty formularz.',
  },
  {
    question: 'Jak długo mam na realizację?',
    answer:
      'Masz czas do końca swojej tury (zazwyczaj ok. 2 tygodnie). Po wybraniu listu dostaniesz szczegółowe informacje o terminie. Jeśli nie potwierdzisz realizacji, list wróci do puli.',
  },
  {
    question: 'Czy mogę wybrać więcej niż jeden list?',
    answer:
      'Tak! Jeśli chcesz obdarować więcej seniorów, możesz wybrać kolejne listy używając tego samego adresu e-mail. Wszystkie swoje listy znajdziesz w Panelu Mikołaja.',
  },
  {
    question: 'Co jeśli chcę dostarczyć paczkę osobiście?',
    answer:
      'Jak najbardziej — przy potwierdzeniu realizacji możesz wybrać opcję "Dostarczę osobiście". Fundacja skontaktuje się z placówką i poda Ci szczegóły.',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const availableCount = getAvailableLetters().length;

  return (
    <div>
      {/* Hero */}
      <section className="bg-forest-dark text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Akcja Listy 2025
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-4">
            Seniorzy z domów opieki napisali listy do Świętego Mikołaja. Pomóż spełnić ich
            marzenia — wybierz list i przygotuj paczkę!
          </p>
          <p className="text-white/70 mb-10">
            Każdy może zostać Mikołajem. To prostsze niż myślisz.
          </p>
          <Link
            to="/listy"
            className="bg-gold hover:bg-yellow-600 text-white font-medium px-8 py-3 rounded-lg transition-colors text-lg inline-block"
          >
            Zobacz listy
          </Link>
        </div>
      </section>

      {/* Licznik */}
      <section className="bg-sand py-12 px-4 text-center">
        {availableCount > 0 ? (
          <div>
            <p className="text-stone-600 text-lg mb-2">Czeka na Ciebie</p>
            <p className="text-6xl font-bold text-forest mb-2">{availableCount}</p>
            <p className="text-2xl font-semibold text-forest-dark">
              listów do realizacji
            </p>
          </div>
        ) : (
          <p className="text-2xl font-semibold text-forest-dark">
            ✅ Wszystkie listy zostały wybrane! Dziękujemy!
          </p>
        )}
      </section>

      {/* Jak to działa */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-forest-dark text-center mb-10">
            Jak to działa?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Wybierz list seniora', desc: 'Przeglądaj listy i znajdź tego, komu chcesz pomóc.' },
              { step: '2', title: 'Przygotuj paczkę', desc: 'Skompletuj prezenty zgodnie z życzeniami seniora.' },
              { step: '3', title: 'Wyślij lub dostarcz', desc: 'Wyślij kurierem lub dostarcz osobiście do placówki.' },
              { step: '4', title: 'Podaruj radość!', desc: 'Senior otrzyma paczkę i poczuje się wyjątkowo.' },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-warm-white rounded-xl shadow-sm border border-stone-200 p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-forest text-white text-lg font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-base text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-forest-dark text-center mb-10">
            Często zadawane pytania
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-stone-200 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 font-medium text-stone-900 hover:bg-sand transition-colors flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className="text-forest ml-4 text-xl leading-none">
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-stone-600 text-sm border-t border-stone-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorzy */}
      <section className="py-16 px-4 bg-sand">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-forest-dark text-center mb-10">
            Nasi sponsorzy
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-stone-200 rounded-xl h-20 flex items-center justify-center text-stone-400 text-xs font-medium"
              >
                Logo sponsora
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
