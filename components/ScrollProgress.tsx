import { useScrollPosition } from '@/hooks/useScrollReveal';
import { ChevronUp } from 'lucide-react';

export default function ScrollProgress() {
  const { progress } = useScrollPosition();
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1">
      <div
        className="h-full bg-gradient-to-r from-forest via-leaf to-leaf transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BackToTop() {
  const { progress } = useScrollPosition();
  const show = progress > 15;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={[
        'fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-forest to-leaf text-white shadow-glow transition-all duration-500',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      ].join(' ')}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
