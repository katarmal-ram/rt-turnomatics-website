
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface AboutSectionProps {
  data: {
    enabled: boolean;
    title: string;
    description: string;
    stats?: Array<{
      number: string;
      label: string;
    }>;
  };
}

export const AboutSection = ({ data }: AboutSectionProps) => {
  if (!data.enabled) return null;

  // Ensure stats exists and is an array
  const stats = data.stats || [];
  const statsGridClasses = getAdaptiveGridClasses(stats.length);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            {data.description}
          </p>
        </div>
        
        {stats.length > 0 && (
          <div className={`${statsGridClasses.container} mx-auto`}>
            <div className={`grid ${statsGridClasses.grid} ${statsGridClasses.spacing}`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-4 group-hover:text-blue-700 transition-colors">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium text-lg">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
