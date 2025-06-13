
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface CSRSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    initiatives: Array<{
      title: string;
      description: string;
      icon: string;
      impact: string;
      image?: string;
    }>;
  };
}

export const CSRSection = ({ data }: CSRSectionProps) => {
  if (!data.enabled) return null;

  const gridClasses = getAdaptiveGridClasses(data.initiatives?.length || 0);

  return (
    <section className={`${gridClasses.padding} bg-green-50`}>
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
          {data.initiatives.map((initiative, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {initiative.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{initiative.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {initiative.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {initiative.description}
                </p>
                <div className="bg-green-100 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800">
                    Impact: {initiative.impact}
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
