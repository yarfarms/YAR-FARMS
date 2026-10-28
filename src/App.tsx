import { useGlobalReveal } from '@/hooks/useScrollReveal';
import Navbar from '@/components/Navbar';
import ScrollProgress, { BackToTop } from '@/components/ScrollProgress';
import FloatingLeaves from '@/components/FloatingLeaves';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Experiences from '@/components/Experiences';
import OurFarm from '@/components/OurFarm';
import WhyChoose from '@/components/WhyChoose';
import Gallery from '@/components/Gallery';
import Booking from '@/components/Booking';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  useGlobalReveal();

  return (
    <div className="relative min-h-screen bg-cream text-forest dark:bg-[#0d1f10] dark:text-cream">
      <FloatingLeaves />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Gallery />
        <Experiences />
        <OurFarm />
        <WhyChoose />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
