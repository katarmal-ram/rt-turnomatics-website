
import { Button } from "@/components/ui/button";

interface HeroGradientProps {
  data: {
    headline: string;
    subheadline: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
    gradient?: string;
  };
}

export const HeroGradient = ({ data }: HeroGradientProps) => {
  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const gradientStyle = data.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20"
      style={{ background: gradientStyle }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
          {data.headline}
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto animate-fade-in">
          {data.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(data.primaryCTA.link)}
          >
            {data.primaryCTA.text}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(data.secondaryCTA.link)}
          >
            {data.secondaryCTA.text}
          </Button>
        </div>
      </div>
    </section>
  );
};
