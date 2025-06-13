
interface QualitySectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    certifications: Array<{
      name: string;
      description: string;
      image: string;
      validUntil?: string;
    }>;
    processes: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
}

export const QualitySection = ({ data }: QualitySectionProps) => {
  if (!data.enabled) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>
        
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Our Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.certifications.map((cert, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="w-20 h-20 object-contain mx-auto mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {cert.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {cert.description}
                  </p>
                  {cert.validUntil && (
                    <p className="text-xs text-gray-500">
                      Valid until: {cert.validUntil}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quality Processes */}
        {data.processes.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Quality Processes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.processes.map((process, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    {process.icon && (
                      <span className="text-2xl mr-3">{process.icon}</span>
                    )}
                    <h4 className="text-lg font-semibold text-gray-900">
                      {process.title}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
