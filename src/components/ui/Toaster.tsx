import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ToastMessage } from '../../types';

interface ToasterProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const STYLES = {
  success: 'border-emerald-800/50 bg-emerald-950/80 text-emerald-100',
  error: 'border-red-800/50 bg-red-950/80 text-red-100',
  info: 'border-amber-800/50 bg-amber-950/80 text-amber-100',
};

export function Toaster({ toasts, onDismiss }: ToasterProps) {
  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-editorial backdrop-blur-md ${STYLES[toast.type]}`}
              role="status"
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="flex-1 text-sm leading-snug">{toast.message}</p>
              <button
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="rounded-full p-0.5 transition hover:bg-white/10"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
