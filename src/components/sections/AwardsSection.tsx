
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface AwardsSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    awards: Array<{
      title: string;
      year: string;
      organization: string;
      description: string;
      image?: string;
    }>;
  };
}

export const AwardsSection = ({ data }: AwardsSectionProps) => {
  if (!data.enabled) return null;

  const gridClasses = getAdaptiveGridClasses(data.awards?.length || 0);

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
          {data.awards.map((award, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-200 hover:shadow-lg transition-shadow duration-300">
              {award.image && (
                <div className="mb-4">
                  <img 
                    src={award.image} 
                    alt={award.title}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </div>
              )}
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full mb-3">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {award.title}
                </h3>
                <div className="text-sm text-yellow-700 font-medium mb-1">
                  {award.organization}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {award.year}
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
