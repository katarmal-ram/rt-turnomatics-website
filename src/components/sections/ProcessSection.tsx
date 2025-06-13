
interface ProcessSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    steps: Array<{
      step: number;
      title: string;
      description: string;
    }>;
  };
}

export const ProcessSection = ({ data }: ProcessSectionProps) => {
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
        
        <div className="relative">
          {/* Process Flow Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number Circle */}
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mx-auto mb-6 relative z-10">
                  {step.step}
                </div>
                
                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connecting Arrow (except for last step) */}
                {index < data.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
