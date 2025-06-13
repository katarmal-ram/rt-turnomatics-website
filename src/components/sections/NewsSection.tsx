
import { getAdaptiveGridClasses } from "@/utils/adaptiveGrid";

interface NewsSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle?: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      date: string;
      author?: string;
      category?: string;
      readTime?: string;
      link?: string;
    }>;
  };
}

export const NewsSection = ({ data }: NewsSectionProps) => {
  if (!data.enabled) return null;

  const gridClasses = getAdaptiveGridClasses(data.items?.length || 0);

  return (
    <section className={`${gridClasses.padding} bg-gray-50`}>
      <div className={`${gridClasses.container} px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>
        
        <div className={`grid ${gridClasses.grid} ${gridClasses.spacing}`}>
          {data.items.map((item, index) => (
            <article key={item.id || index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{item.date}</span>
                  {item.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {item.category}
                      </span>
                    </>
                  )}
                  {item.readTime && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{item.readTime}</span>
                    </>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                {item.author && (
                  <div className="flex items-center text-sm text-gray-500">
                    <span>By {item.author}</span>
                  </div>
                )}
                {item.link && (
                  <a 
                    href={item.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-3"
                  >
                    Read More →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
