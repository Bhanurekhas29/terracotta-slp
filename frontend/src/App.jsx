import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProcessTimeline from "./components/ProcessTimeline";
import KolamDivider from "./components/KolamDivider";
import FeaturedCollection from "./components/FeaturedCollection";
import HowToOrder from "./components/HowToOrder";
import Heritage from "./components/Heritage";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <Hero />
        <KolamDivider tone="clay" />
        <ProcessTimeline />
        <FeaturedCollection />
        <HowToOrder />
        <Heritage />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
