import Navbar from './Navbar/page';
import Hero from '@/components/Hero';
import About from './about/page';
// import Skills from './Skills';
import Footer from '@/components/footer';

function HomePage() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      {/* <About /> */}
      {/* <Skills /> */}
      <Footer />
    </div>
  );
}

export default HomePage;
