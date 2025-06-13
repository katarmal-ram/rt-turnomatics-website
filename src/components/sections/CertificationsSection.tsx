
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface CertificationsSectionProps {
  data: {
    enabled: boolean;
    title: string;
    items: Array<{
      name: string;
      description: string;
      image: string;
    }>;
  };
}

export const CertificationsSection = ({ data }: CertificationsSectionProps) => {
  if (!data.enabled) return null;

  const gridClasses = getAdaptiveGridClasses(data.items?.length || 0);

  return (
    <section className={`${gridClasses.padding} bg-white`}>
      <div className={`${gridClasses.container} px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
        </div>
        
        <div className={`grid ${gridClasses.grid} ${gridClasses.spacing}`}>
          {data.items.map((cert, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="mb-6">
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="w-20 h-20 mx-auto object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
