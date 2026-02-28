import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
  variant?: 'success' | 'info';
}

export function Toast({ message, onDismiss, variant = 'success' }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const cls =
    variant === 'success'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
      : 'bg-sky-50 border-sky-200 text-sky-800';
  const icon = variant === 'success' ? '✅' : 'ℹ️';

  return (
    <div
      className={`fixed top-6 right-6 z-[70] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ${cls}`}
    >
      <span>{icon}</span>
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-1 text-current opacity-50 hover:opacity-100 text-xl leading-none"
      >
        ×
      </button>
    </div>
  );
}
