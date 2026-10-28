import { useState, type FormEvent } from 'react';
import { Instagram, MessageCircle, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Our Farm', href: '#our-farm' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book a Visit', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 5000);
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-forest to-[#0d2a12] text-cream">
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob absolute -left-20 -top-20 h-72 w-72 rounded-full bg-leaf/20 blur-3xl" />
        <div className="animate-blob absolute bottom-0 right-0 h-80 w-80 rounded-full bg-leaf/15 blur-3xl" style={{ animationDelay: '6s' }} />
      </div>

      <div className="container-x relative px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="overflow-hidden rounded-xl bg-cream p-1.5 shadow-glow">
                <img src="/logo.png" alt="YAR Farms Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
              </div>
              <span className="font-display text-2xl font-700 tracking-tight text-cream"><span className="font-300">Farms</span></span>
            </a>
            <p className="mt-5 max-w-sm text-cream/75">
              A premium eco-friendly farm resort where families reconnect with nature, fresh food, and the simple joy of rural life.
            </p>

            <form onSubmit={subscribe} className="mt-7 max-w-md">
              <label htmlFor="nl" className="text-sm font-600 text-cream">Join our newsletter</label>
              <div className="mt-2 flex gap-2">
                <input
                  id="nl"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-cream/20 bg-cream/10 px-5 py-3 text-sm text-cream outline-none transition-all placeholder:text-cream/40 focus:bg-cream/15 focus:ring-2 focus:ring-leaf/50"
                />
                <button type="submit" aria-label="Subscribe" className="grid h-11 w-12 shrink-0 place-items-center rounded-full bg-leaf text-white transition-all hover:bg-cream hover:text-forest">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              {done && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-leaf">
                  <CheckCircle2 className="h-4 w-4" /> You're subscribed — welcome to the family!
                </p>
              )}
            </form>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-700 uppercase tracking-widest text-cream/80">Quick Links</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-cream/70 transition-colors hover:text-leaf">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + socials */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-700 uppercase tracking-widest text-cream/80">Reach Us</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/75">
              <li>Madhiredi gari palli, Verraballi mandal, Kadapa District, Andhra Pradesh, 516268</li>
              <li><a href="tel:+919676752084" className="transition-colors hover:text-leaf">+91 96767 52084</a> / <a href="tel:+919550702121" className="transition-colors hover:text-leaf">+91 95507 02121</a></li>
              <li><a href="mailto:reddyharsha095@gmail.com" className="transition-colors hover:text-leaf">reddyharsha095@gmail.com</a></li>
              <li>Open daily · 8:00 AM – 6:00 PM</li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com/yarfarms', label: 'Instagram' },
                { icon: MessageCircle, href: 'https://wa.me/919676752084', label: 'WhatsApp' },
                { icon: Mail, href: 'mailto:reddyharsha095@gmail.com', label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream transition-all hover:-translate-y-0.5 hover:bg-leaf hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-7 text-sm text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} YAR Farms. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-leaf">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-leaf">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
