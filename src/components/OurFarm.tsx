import { dailyProduce, seasonalProduce, type Produce } from '@/data/content';
import { Calendar, Sunrise } from 'lucide-react';

function ProduceCard({ p, i }: { p: Produce; i: number }) {
  const tone =
    p.badgeTone === 'seasonal'
      ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
      : 'bg-leaf/15 text-forest dark:bg-leaf/20 dark:text-leaf';
  return (
    <article
      className="reveal group card-hover overflow-hidden rounded-3xl bg-white shadow-soft dark:bg-[#14281a]/70"
      style={{ transitionDelay: `${i * 80}ms` }}
    >
      <div className="img-zoom relative h-52 overflow-hidden">
        <img src={p.image} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
        <span className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-600 ${tone}`}>
          {p.badgeTone === 'seasonal' ? <Calendar className="h-3.5 w-3.5" /> : <Sunrise className="h-3.5 w-3.5" />}
          {p.badge}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf/12 text-leaf">
            <p.icon className="h-5 w-5" />
          </span>
          <h3 className="font-display text-xl font-600 text-forest dark:text-cream">{p.name}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-earth/85 dark:text-cream/70">{p.description}</p>
      </div>
    </article>
  );
}

export default function OurFarm() {
  return (
    <section id="our-farm" className="section-pad bg-white bg-grain dark:bg-[#0a160c]">
      <div className="container-x">
        {/* Seasonal */}
        <div className="reveal max-w-2xl">
          <span className="eyebrow"><Calendar className="h-4 w-4" /> Seasonal Produce</span>
          <h2 className="mt-4 font-display text-3xl font-700 text-forest dark:text-cream sm:text-4xl md:text-5xl text-balance">
            Harvests that arrive with the seasons
          </h2>
          <p className="mt-4 text-lg text-earth/85 dark:text-cream/70">
            Our seasonal crops are grown the traditional way and available only at their natural best — plan your visit around the harvest.
          </p>
        </div>
        <div className="mt-10 grid gap-7 sm:grid-cols-2">
          {seasonalProduce.map((p, i) => (
            <ProduceCard key={p.name} p={p} i={i} />
          ))}
        </div>

        {/* Daily */}
        <div className="mt-20 reveal max-w-2xl">
          <span className="eyebrow"><Sunrise className="h-4 w-4" /> Daily Farm Products</span>
          <h2 className="mt-4 font-display text-3xl font-700 text-forest dark:text-cream sm:text-4xl md:text-5xl text-balance">
            Fresh from the farm, every single day
          </h2>
          <p className="mt-4 text-lg text-earth/85 dark:text-cream/70">
            Our animals and dairy are raised with care and available year-round for visitors and local customers alike.
          </p>
        </div>
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {dailyProduce.map((p, i) => (
            <ProduceCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
