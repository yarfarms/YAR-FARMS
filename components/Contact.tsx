import { MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';

const cards = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Madhiredi gari palli, Verraballi mandal, Kadapa District, Andhra Pradesh, 516268',
    href: 'https://maps.google.com/?q=Madhiredi+gari+palli,+Verraballi+mandal,+Kadapa+District,+Andhra+Pradesh,+516268',
    accent: 'from-forest to-leaf',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 96767 52084 / +91 95507 02121',
    href: 'tel:+919676752084',
    accent: 'from-leaf to-forest',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'reddyharsha095@gmail.com',
    href: 'mailto:reddyharsha095@gmail.com',
    accent: 'from-earth to-forest',
  },
  {
    icon: Instagram,
    label: 'Follow Us',
    value: '@yarfarms',
    href: 'https://instagram.com/yarfarms',
    accent: 'from-leaf to-earth',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-white bg-grain dark:bg-[#0a160c]">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="mt-4 font-display text-3xl font-700 text-forest dark:text-cream sm:text-4xl md:text-5xl text-balance">
            We'd love to hear from you
          </h2>
          <p className="mt-4 text-lg text-earth/85 dark:text-cream/70">
            Questions, group bookings, or just want to say hello — reach out any way you like.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="reveal group card-hover rounded-3xl bg-cream p-7 text-center shadow-soft dark:bg-[#14281a]/70"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.accent} text-white shadow-glow`}>
                <c.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-base font-600 text-forest dark:text-cream">{c.label}</h3>
              <p className="mt-1 text-sm text-earth/85 dark:text-cream/70">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="reveal mt-12 overflow-hidden rounded-[2rem] shadow-soft">
          <iframe
            title="YAR Farms location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.6388026792806!2d78.89449230988868!3d14.100189189076751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb31d00238492a5%3A0xa1ae9a8e1da16c0f!2sYAR%20FARMS!5e1!3m2!1sen!2sin!4v1786558417799!5m2!1sen!2sin"
            className="h-[400px] w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://wa.me/919676752084"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
