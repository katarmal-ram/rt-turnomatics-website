
import { Button } from "@/components/ui/button";

interface HeroMinimalProps {
  data: {
    headline: string;
    subheadline: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
  };
}

export const HeroMinimal = ({ data }: HeroMinimalProps) => {
  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            {data.headline}
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl">
            {data.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium"
              onClick={() => scrollToSection(data.primaryCTA.link)}
            >
              {data.primaryCTA.text}
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium"
              onClick={() => scrollToSection(data.secondaryCTA.link)}
            >
              {data.secondaryCTA.text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
