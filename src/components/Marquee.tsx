const items = [
  'Organic Farming',
  'Fresh Cow Milk',
  'Mango Orchard',
  'Family Activities',
  'Guided Tours',
  'Eco-Friendly',
  'Animal Feeding',
  'Groundnut Fields',
];

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-forest/10 bg-gradient-to-r from-forest to-leaf py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center gap-10 px-5" aria-hidden={dup === 1}>
            {items.map((it) => (
              <li key={it} className="flex items-center gap-10">
                <span className="font-display text-lg font-600 tracking-wide text-cream">{it}</span>
                <span className="text-cream/60">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
