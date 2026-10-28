import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollReveal';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Our Farm', href: '#our-farm' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Visit', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrolled } = useScrollPosition();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('yar-theme');
    if (stored === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('yar-theme', next ? 'dark' : 'light');
  };

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cream/85 shadow-soft backdrop-blur-xl dark:bg-[#0d1f10]/85'
            : 'bg-transparent',
        ].join(' ')}
      >
        <nav className="container-x flex items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
          <a href="#home" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="YAR Farms Logo" className="h-14 w-auto drop-shadow-md" />
            <span className={[
              'font-display text-xl font-700 tracking-tight transition-colors',
              scrolled ? 'text-forest dark:text-cream' : 'text-white',
            ].join(' ')}>
              <span className="font-300">Farms</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={[
                    'rounded-full px-3.5 py-2 text-sm font-500 transition-colors',
                    scrolled
                      ? 'text-forest/80 hover:bg-leaf/10 hover:text-forest dark:text-cream/80 dark:hover:text-cream'
                      : 'text-white/85 hover:bg-white/15 hover:text-white',
                  ].join(' ')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className={[
                'grid h-10 w-10 place-items-center rounded-full transition-colors',
                scrolled
                  ? 'text-forest hover:bg-leaf/10 dark:text-cream'
                  : 'text-white hover:bg-white/15',
              ].join(' ')}
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a href="#booking" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
              Book Your Visit
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className={[
                'grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden',
                scrolled
                  ? 'text-forest hover:bg-leaf/10 dark:text-cream'
                  : 'text-white hover:bg-white/15',
              ].join(' ')}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        <div
          className={[
            'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setOpen(false)}
        />
        <div
          className={[
            'absolute right-0 top-0 h-full w-72 max-w-[80%] bg-cream p-6 shadow-2xl transition-transform duration-500 dark:bg-[#0d1f10]',
            open ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="mt-16 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-500 text-forest transition-colors hover:bg-leaf/10 dark:text-cream"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4"
            >
              Book Your Visit
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
