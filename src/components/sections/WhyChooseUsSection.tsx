
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface WhyChooseUsSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    points?: Array<{
      title: string;
      description: string;
      image: string;
    }>;
  };
}

export const WhyChooseUsSection = ({ data }: WhyChooseUsSectionProps) => {
  if (!data || !data.enabled || !data.points || data.points.length === 0) return null;

  const gridClasses = getAdaptiveGridClasses(data.points.length);

  return (
    <section className={`${gridClasses.padding} bg-white`}>
      <div className={`${gridClasses.container} px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>
        
        <div className={`grid ${gridClasses.grid} ${gridClasses.spacing}`}>
          {data.points.map((point, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="aspect-w-16 aspect-h-10">
                  <img 
                    src={point.image} 
                    alt={point.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-3 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    {point.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed opacity-90">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
