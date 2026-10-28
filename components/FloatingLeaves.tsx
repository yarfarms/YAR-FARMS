import { useMemo } from 'react';
import { Leaf } from 'lucide-react';

/** Subtle floating-leaf particles drifting down the page. */
export default function FloatingLeaves() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => ({
        id: i,
        left: `${(i * 11 + 6) % 100}%`,
        size: 14 + ((i * 7) % 18),
        duration: 14 + (i % 6) * 3,
        delay: (i * 2.3) % 10,
        opacity: 0.18 + (i % 3) * 0.07,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((l) => (
        <span
          key={l.id}
          className="leaf-particle text-leaf"
          style={{
            left: l.left,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
            opacity: l.opacity,
          }}
        >
          <Leaf style={{ width: l.size, height: l.size }} />
        </span>
      ))}
    </div>
  );
}
