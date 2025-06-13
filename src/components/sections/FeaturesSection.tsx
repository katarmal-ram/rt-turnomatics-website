
import { Check, Clock, Shield, Users } from "lucide-react";
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

const iconMap = {
  check: Check,
  clock: Clock,
  shield: Shield,
  users: Users,
};

interface FeaturesSectionProps {
  data: {
    enabled: boolean;
    title: string;
    items?: Array<{
      icon: keyof typeof iconMap;
      title: string;
      description: string;
    }>;
  };
}

export const FeaturesSection = ({ data }: FeaturesSectionProps) => {
  if (!data.enabled || !data.items || data.items.length === 0) return null;

  const gridClasses = getAdaptiveGridClasses(data.items.length);

  return (
    <section className={`${gridClasses.padding} bg-white`}>
      <div className={`${gridClasses.container} px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
        </div>
        
        <div className={`grid ${gridClasses.grid} ${gridClasses.spacing}`}>
          {data.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Check;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
