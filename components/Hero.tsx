import { useEffect, useState } from 'react';
import { CalendarDays, Compass, ChevronDown, Star } from 'lucide-react';

const HERO_IMG =
  'https://images.pexels.com/photos/5078745/pexels-photo-5078745.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop';

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY * 0.4));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_IMG}
          className="h-full w-full object-cover"
          style={{ transform: `scale(1.05) translateY(${offset}px)` }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sun-shining-over-a-green-farm-field-42864-large.mp4" type="video/mp4" />
          <img
            src={HERO_IMG}
            alt="Sunrise over a rural farm with orchards and a farmhouse"
            className="h-full w-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-forest/65 via-forest/45 to-forest/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Animated blobs */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob absolute -left-20 top-20 h-72 w-72 rounded-full bg-leaf/30 blur-3xl" />
        <div className="animate-blob absolute right-0 top-40 h-80 w-80 rounded-full bg-forest/40 blur-3xl" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-24 pb-32 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm font-500 text-white">
            <Star className="h-4 w-4 fill-cream text-cream" />
            Premium Eco-Friendly Farm Resort
          </span>

          <h1 className="mt-6 font-display text-4xl font-700 leading-[1.08] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Reconnect With Nature at <span className="bg-gradient-to-r from-cream via-leaf to-cream bg-clip-text text-transparent">YAR Farms</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 text-pretty sm:text-xl">
            Experience authentic farming, fresh air, beautiful orchards, and memorable family moments — all in the heart of the countryside.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#booking" className="btn-primary group">
              <CalendarDays className="h-5 w-5" />
              Book Your Visit
            </a>
            <a href="#experiences" className="btn-secondary group">
              <Compass className="h-5 w-5" />
              Explore Our Farm
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ['3', 'Acres of Greenery'],
              ['100+', 'Happy Visitors'],
              ['25', 'Years of Farming'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-700 text-white">{v}</dt>
                <dd className="text-sm text-white/70">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white"
      >
        <span className="text-xs font-500 uppercase tracking-widest">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border-2 border-white/60 pt-1.5">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <ChevronDown className="h-4 w-4" />
      </a>
    </section>
  );
}
