
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface InfrastructureSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      image: string;
      features: string[];
    }>;
  };
}

export const InfrastructureSection = ({ data }: InfrastructureSectionProps) => {
  if (!data.enabled) return null;

  const gridClasses = getAdaptiveGridClasses(data.items?.length || 0);

  return (
    <section id="infrastructure" className={`${gridClasses.padding} bg-gray-50`}>
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
          {data.items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
