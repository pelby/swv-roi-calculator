import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { CalculatorSection } from './components/calculator/CalculatorSection';
import { MethodologySection } from './components/sections/MethodologySection';
import { CTASection } from './components/sections/CTASection';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CalculatorSection />
        <MethodologySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
