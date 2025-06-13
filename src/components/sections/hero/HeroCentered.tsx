
import { Button } from "@/components/ui/button";

interface HeroCenteredProps {
  data: {
    headline: string;
    subheadline: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
    backgroundImage: string;
  };
}

export const HeroCentered = ({ data }: HeroCenteredProps) => {
  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Provide fallback values for CTAs if they're undefined
  const primaryCTA = data.primaryCTA || { text: 'Get Started', link: '#contact' };
  const secondaryCTA = data.secondaryCTA || { text: 'Learn More', link: '#about' };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed pt-20"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          {data.headline || 'Welcome'}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto animate-fade-in">
          {data.subheadline || 'Your trusted manufacturing partner'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(primaryCTA.link)}
          >
            {primaryCTA.text}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(secondaryCTA.link)}
          >
            {secondaryCTA.text}
          </Button>
        </div>
      </div>
    </section>
  );
};
