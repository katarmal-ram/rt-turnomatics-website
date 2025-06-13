
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface DownloadCatalogSectionProps {
  data: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    items?: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      fileUrl: string;
      fileSize: string;
      pages: number;
      year: number;
      order: number;
    }>;
    // Legacy support for old data structure
    catalogs?: Array<{
      name: string;
      description: string;
      fileUrl: string;
      fileSize?: string;
      fileType?: string;
      thumbnail?: string;
    }>;
  };
}

export const DownloadCatalogSection = ({ data }: DownloadCatalogSectionProps) => {
  if (!data?.enabled) return null;

  // Support both new 'items' structure and legacy 'catalogs' structure
  const catalogs = data.items || data.catalogs || [];

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const catalogCount = catalogs.length;
  const containerClass = catalogCount <= 3 ? "max-w-5xl" : "max-w-7xl";
  const paddingClass = catalogCount === 0 ? "py-12" : catalogCount <= 2 ? "py-16" : "py-20";

  return (
    <section className={`${paddingClass} bg-gray-50`}>
      <div className={`${containerClass} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title || "Download Our Catalogs"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle || "Explore our product range in detail"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogs.map((catalog, index) => {
            // Handle both new and legacy data structures
            const catalogData = {
              title: catalog.title || catalog.name,
              description: catalog.description,
              fileUrl: catalog.fileUrl,
              fileSize: catalog.fileSize,
              image: catalog.image || catalog.thumbnail,
              pages: catalog.pages,
              year: catalog.year,
              fileType: catalog.fileType
            };

            return (
              <div key={catalog.id || index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {catalogData.image ? (
                      <img 
                        src={catalogData.image} 
                        alt={catalogData.title}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {catalogData.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {catalogData.fileType && (
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs uppercase">
                            {catalogData.fileType}
                          </span>
                        )}
                        {catalogData.fileSize && (
                          <span>{catalogData.fileSize}</span>
                        )}
                        {catalogData.pages && (
                          <span>{catalogData.pages} pages</span>
                        )}
                        {catalogData.year && (
                          <span>{catalogData.year}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {catalogData.description}
                  </p>
                  
                  <Button 
                    onClick={() => handleDownload(catalogData.fileUrl, catalogData.title)}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Catalog
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
