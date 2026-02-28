interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmVariant?: 'danger' | 'primary';
}

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Potwierdź',
  confirmVariant = 'danger',
}: ConfirmDialogProps) {
  const confirmCls =
    confirmVariant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm'
      : 'bg-forest hover:bg-forest-dark text-white font-medium px-5 py-2 rounded-lg transition-colors text-sm';

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-stone-900 mb-2">{title}</h3>
        <p className="text-sm text-stone-600 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="bg-sand hover:bg-stone-200 text-stone-700 font-medium px-5 py-2 rounded-lg border border-stone-200 transition-colors text-sm"
          >
            Anuluj
          </button>
          <button onClick={onConfirm} className={confirmCls}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
