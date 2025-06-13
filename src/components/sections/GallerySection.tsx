
import { useState } from "react";

interface GallerySectionProps {
  data: {
    enabled: boolean;
    title: string;
    images: Array<{
      url: string;
      alt: string;
      caption: string;
    }>;
  };
}

export const GallerySection = ({ data }: GallerySectionProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!data || !data.enabled) return null;

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.images?.map((image, index) => (
            <div 
              key={index} 
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-medium">{image.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-full">
              <img 
                src={data.images[selectedImage].url} 
                alt={data.images[selectedImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              <p className="text-white text-center mt-4 text-lg">
                {data.images[selectedImage].caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
