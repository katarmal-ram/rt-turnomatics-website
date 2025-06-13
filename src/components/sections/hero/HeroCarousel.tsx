
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  data: {
    enabled: boolean;
    headline: string;
    subheadline: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
    images: string[];
    autoPlay?: boolean;
    interval?: number;
  };
}

export const HeroCarousel = ({ data }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = data.images || [];

  useEffect(() => {
    if (data.autoPlay && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, data.interval || 5000);
      return () => clearInterval(timer);
    }
  }, [data.autoPlay, data.interval, images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!data.enabled) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          {data.headline}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto animate-fade-in">
          {data.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(data.primaryCTA.link)}
          >
            {data.primaryCTA.text}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(data.secondaryCTA.link)}
          >
            {data.secondaryCTA.text}
          </Button>
        </div>
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
