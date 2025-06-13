
import { Button } from "@/components/ui/button";

interface HeroSplitProps {
  data: {
    headline: string;
    subheadline: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
    backgroundImage: string;
    imagePosition?: 'left' | 'right';
  };
}

export const HeroSplit = ({ data }: HeroSplitProps) => {
  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const imagePosition = data.imagePosition || 'right';

  return (
    <section className="relative min-h-screen flex items-center pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={`animate-fade-in ${imagePosition === 'left' ? 'lg:col-start-2' : ''}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {data.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {data.primaryCTA && (
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => scrollToSection(data.primaryCTA.link)}
                >
                  {data.primaryCTA.text}
                </Button>
              )}
              {data.secondaryCTA && (
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => scrollToSection(data.secondaryCTA.link)}
                >
                  {data.secondaryCTA.text}
                </Button>
              )}
            </div>
          </div>
          <div className={`animate-fade-in ${imagePosition === 'left' ? 'lg:col-start-1' : ''}`}>
            <img 
              src={data.backgroundImage} 
              alt="Hero"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
