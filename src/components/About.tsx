import { Sprout } from 'lucide-react';
import { coreValues } from '@/data/content';

export default function About() {
  return (
    <section id="about" className="section-pad bg-cream bg-grain dark:bg-[#0d1f10]">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Sprout className="h-4 w-4" /> What We Stand For
          </span>
          <h2 className="mt-4 font-display text-3xl font-700 text-forest dark:text-cream sm:text-4xl md:text-5xl text-balance">
            Our Core Values
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((v, i) => (
            <div
              key={v.title}
              className="reveal card-hover rounded-3xl bg-white/70 p-7 text-center shadow-soft dark:bg-[#14281a]/60"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-forest to-leaf text-white">
                <v.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-600 text-forest dark:text-cream">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-earth/85 dark:text-cream/70">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
