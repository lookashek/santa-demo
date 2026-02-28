import { useParams } from 'react-router-dom';

export default function LetterSelectFlow() {
  const { letterId } = useParams();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-forest-dark">✉️ Wybór listu</h1>
      <p className="mt-4 text-base text-stone-700">Placeholder — flow wyboru listu #{letterId}.</p>
    </div>
  );
}
