import { ArrowUpRight } from 'lucide-react';
import { experiences } from '@/data/content';

export default function Experiences() {
  return (
    <section id="experiences" className="section-pad bg-gradient-to-b from-cream to-white bg-grain dark:from-[#0d1f10] dark:to-[#0a160c]">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Farm Experiences</span>
          <h2 className="mt-4 font-display text-3xl font-700 text-forest dark:text-cream sm:text-4xl md:text-5xl text-balance">
            Hands-on experiences for every kind of explorer
          </h2>
          <p className="mt-4 text-lg text-earth/85 dark:text-cream/70">
            Whether you want to learn, play, or simply unwind, our farm offers something memorable for everyone.
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <article
              key={exp.title}
              className="reveal group card-hover relative overflow-hidden rounded-3xl bg-white shadow-soft dark:bg-[#14281a]/70"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                {exp.video ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={exp.image}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  >
                    <source src={exp.video} type="video/mp4" />
                    <img src={exp.image} alt={exp.alt} className="h-full w-full object-cover" />
                  </video>
                ) : (
                  <img src={exp.image} alt={exp.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
                <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl glass text-leaf">
                  <exp.icon className="h-6 w-6" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-600 text-forest dark:text-cream">{exp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-earth/85 dark:text-cream/70">{exp.description}</p>
                <a
                  href="#booking"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-leaf transition-colors hover:text-forest"
                >
                  Book this experience
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
