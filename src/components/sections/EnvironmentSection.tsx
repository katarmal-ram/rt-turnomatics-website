
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface EnvironmentSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    commitments: Array<{
      title: string;
      description: string;
      icon: string;
      progress?: number;
      target?: string;
    }>;
  };
}

export const EnvironmentSection = ({ data }: EnvironmentSectionProps) => {
  if (!data.enabled) return null;

  const gridClasses = getAdaptiveGridClasses(data.commitments?.length || 0);

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
          {data.commitments.map((commitment, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:scale-105">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300">{commitment.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {commitment.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {commitment.description}
                </p>
                
                {commitment.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-700 mb-1">
                      <span>Progress</span>
                      <span>{commitment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-500 group-hover:bg-green-700"
                        style={{ width: `${commitment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {commitment.target && (
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">
                      Target: {commitment.target}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
