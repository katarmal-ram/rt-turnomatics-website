
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface TestimonialsSectionProps {
  data: {
    enabled: boolean;
    title: string;
    items: Array<{
      text: string;
      author: string;
      position: string;
      company: string;
      avatar: string;
    }>;
  };
}

export const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  if (!data.enabled) return null;

  const gridClasses = getAdaptiveGridClasses(data.items?.length || 0);

  return (
    <section className={`${gridClasses.padding} bg-gradient-to-br from-gray-50 to-blue-50`}>
      <div className={`${gridClasses.container} px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
        </div>
        
        <div className={`grid ${gridClasses.grid} ${gridClasses.spacing}`}>
          {data.items.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:scale-105">
                <div className="mb-6">
                  <div className="text-4xl text-blue-200 mb-4">"</div>
                  <p className="text-gray-700 italic leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.position}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
