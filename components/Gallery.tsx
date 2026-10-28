import { useEffect, useState } from 'react';
import { galleryImages, type GalleryImage } from '@/data/content';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((a) => (a === null ? a : (a + 1) % galleryImages.length));
      if (e.key === 'ArrowLeft') setActive((a) => (a === null ? a : (a - 1 + galleryImages.length) % galleryImages.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const current: GalleryImage | null = active === null ? null : galleryImages[active];

  return (
    <section id="gallery" className="section-pad bg-cream bg-grain dark:bg-[#0d1f10]">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Photo Gallery</span>
          <h2 className="mt-4 font-display text-3xl font-700 text-forest dark:text-cream sm:text-4xl md:text-5xl text-balance">
            Moments from around the farm
          </h2>
          <p className="mt-4 text-lg text-earth/85 dark:text-cream/70">
            A glimpse of the views, animals, and happy faces that make a day at YAR Farms unforgettable.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              className={[
                'reveal group relative overflow-hidden rounded-3xl shadow-soft focus:outline-none focus:ring-4 focus:ring-leaf/40',
                img.span ? 'row-span-2' : '',
              ].join(' ')}
              style={{ transitionDelay: `${i * 60}ms` }}
              aria-label={`Open image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-left">
                  <p className="text-xs font-600 uppercase tracking-wider text-cream/80">{img.category}</p>
                  <p className="text-sm font-500 text-white">{img.alt}</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full glass text-white">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full glass text-white transition-colors hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full glass text-white transition-colors hover:bg-white/20 sm:left-8"
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a - 1 + galleryImages.length) % galleryImages.length)); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <figure className="max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl" />
            <figcaption className="mt-4 text-center">
              <p className="text-xs font-600 uppercase tracking-widest text-leaf">{current.category}</p>
              <p className="text-sm text-white/85">{current.alt}</p>
            </figcaption>
          </figure>
          <button
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full glass text-white transition-colors hover:bg-white/20 sm:right-8"
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a === null ? a : (a + 1) % galleryImages.length)); }}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
