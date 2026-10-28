import { useState, type FormEvent } from 'react';
import { CalendarDays, Mail, Phone, User, Users, MessageSquare, CheckCircle2, Send, Loader2 } from 'lucide-react';

type FormState = {
  name: string;
  phone: string;
  email: string;
  date: string;
  visitors: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const WHATSAPP_NUMBER = '919676752084'; // +91 96767 52084
const OWNER_EMAIL = 'reddyharsha095@gmail.com';

const initial: FormState = { name: '', phone: '', email: '', date: '', visitors: '1', message: '' };

export default function Booking() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your full name.';
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.date) e.date = 'Please choose a visit date.';
    const n = Number(form.visitors);
    if (!n || n < 1 || n > 100) e.visitors = 'Enter 1–100 visitors.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const triggerMailto = () => {
    const mailSubject = encodeURIComponent(`New Farm Visit Booking - ${form.name}`);
    const mailBody = encodeURIComponent(
      `Hello YAR Farms team!\n\nI would like to book a visit to YAR Farms.\n\n` +
      `--- Booking Details ---\n` +
      `Full Name: ${form.name}\n` +
      `Phone Number: ${form.phone}\n` +
      `Email Address: ${form.email}\n` +
      `Visit Date: ${form.date}\n` +
      `Number of Visitors: ${form.visitors}\n` +
      `Message: ${form.message.trim() || 'None'}\n\n` +
      `Sent via YAR Farms Website.`
    );
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Send email silently in background to reddyharsha095@gmail.com
      const res = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New YAR Farms Booking Request: ${form.name}`,
          _template: 'table',
          'Visitor Name': form.name,
          'Phone Number': form.phone,
          'Email Address': form.email,
          'Visit Date': form.date,
          'Number of Visitors': form.visitors,
          'Message / Note': form.message.trim() || 'None',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm(initial);
        setTimeout(() => setSubmitted(false), 7000);
      } else {
        triggerMailto();
        setSubmitted(true);
        setForm(initial);
        setTimeout(() => setSubmitted(false), 7000);
      }
    } catch {
      triggerMailto();
      setSubmitted(true);
      setForm(initial);
      setTimeout(() => setSubmitted(false), 7000);
    } finally {
      setLoading(false);
    }
  };

  const waText = encodeURIComponent(
    `Hello YAR Farms! I'd like to book a visit.\n\nName: ${form.name || '—'}\nPhone: ${form.phone || '—'}\nEmail: ${form.email || '—'}\nDate: ${form.date || '—'}\nVisitors: ${form.visitors || '—'}\nMessage: ${form.message || '—'}`
  );

  const fieldClass = (k: keyof FormState) =>
    [
      'w-full rounded-2xl border bg-white/70 px-4 py-3 pl-11 text-sm text-forest outline-none transition-all placeholder:text-earth/50 focus:bg-white focus:ring-2 focus:ring-leaf/50 dark:bg-[#14281a]/60 dark:text-cream dark:placeholder:text-cream/40',
      errors[k] ? 'border-red-400 focus:ring-red-300' : 'border-forest/15',
    ].join(' ');

  return (
    <section id="booking" className="section-pad relative overflow-hidden bg-gradient-to-br from-forest to-leaf">
      <div aria-hidden className="absolute inset-0">
        <div className="animate-blob absolute -left-10 top-10 h-72 w-72 rounded-full bg-leaf/40 blur-3xl" />
        <div className="animate-blob absolute bottom-0 right-0 h-80 w-80 rounded-full bg-forest/40 blur-3xl" style={{ animationDelay: '5s' }} />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal reveal-left text-white">
            <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-sm font-600 uppercase tracking-widest text-cream">
              <CalendarDays className="h-4 w-4" /> Plan Your Visit
            </span>
            <h2 className="mt-5 font-display text-3xl font-700 leading-tight sm:text-4xl md:text-5xl text-balance">
              Book your day at the farm
            </h2>
            <p className="mt-5 max-w-md text-lg text-cream/85">
              Reserve your visit in just a minute. Tell us when you're coming and how many of you there are — we'll take care of the rest, and have a warm welcome ready.
            </p>
            <ul className="mt-8 space-y-3 text-cream/90">
              {['Instant confirmation by phone or email', 'Group packages for 15+ visitors', 'Free cancellation up to 48 hours before'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cream" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal reveal-right">
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass rounded-[2rem] p-6 shadow-2xl sm:p-8 dark:bg-[#14281a]/70"
            >
              {submitted && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl bg-leaf/15 px-4 py-3 text-forest dark:text-cream">
                  <CheckCircle2 className="h-5 w-5 text-leaf" />
                  <p className="text-sm font-600">Thank you! Your visit request has been received. We'll be in touch shortly.</p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className="mb-1.5 block text-sm font-600 text-forest dark:text-cream">Full Name</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/50" />
                    <input id="bk-name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" className={fieldClass('name')} />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-600 text-forest dark:text-cream">Phone Number</label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/50" />
                    <input id="bk-phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 96767 52084" className={fieldClass('phone')} />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="bk-email" className="mb-1.5 block text-sm font-600 text-forest dark:text-cream">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/50" />
                    <input id="bk-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className={fieldClass('email')} />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="bk-date" className="mb-1.5 block text-sm font-600 text-forest dark:text-cream">Visit Date</label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/50" />
                    <input id="bk-date" type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => update('date', e.target.value)} className={fieldClass('date')} />
                  </div>
                  {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bk-visitors" className="mb-1.5 block text-sm font-600 text-forest dark:text-cream">Number of Visitors</label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-earth/50" />
                    <input id="bk-visitors" type="number" min={1} max={100} value={form.visitors} onChange={(e) => update('visitors', e.target.value)} className={fieldClass('visitors')} />
                  </div>
                  {errors.visitors && <p className="mt-1 text-xs text-red-500">{errors.visitors}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="bk-msg" className="mb-1.5 block text-sm font-600 text-forest dark:text-cream">Message <span className="font-400 text-earth/60">(optional)</span></label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-earth/50" />
                    <textarea id="bk-msg" rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Any special requests or questions?" className={`${fieldClass('message')} pt-3`} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-75">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Book Now
                    </>
                  )}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.041zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z"/></svg>
                  Book on WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
