import { features } from '@/data/content';
import { Sparkles } from 'lucide-react';

export default function WhyChoose() {
  return (
    <section id="why-choose" className="section-pad bg-gradient-to-b from-white to-cream bg-grain dark:from-[#0a160c] dark:to-[#0d1f10]">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow"><Sparkles className="h-4 w-4" /> Why Choose Us</span>
          <h2 className="mt-4 font-display text-3xl font-700 text-forest dark:text-cream sm:text-4xl md:text-5xl text-balance">
            Why families keep coming back to YAR Farms
          </h2>
          <p className="mt-4 text-lg text-earth/85 dark:text-cream/70">
            Eight reasons our visitors leave happier, healthier, and already planning their return.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal group relative overflow-hidden rounded-3xl bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-glow dark:bg-[#14281a]/70"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-leaf/10 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-forest to-leaf text-white shadow-glow">
                <f.icon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-5 font-display text-lg font-600 text-forest dark:text-cream">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-earth/85 dark:text-cream/70">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
