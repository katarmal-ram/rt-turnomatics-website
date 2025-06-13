
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Building2, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Leaf, 
  Settings,
  Image as ImageIcon,
  CheckCircle,
  Circle
} from "lucide-react";

interface EnhancedGenerationPreviewProps {
  businessData: any;
  projectName?: string;
  uploadedAssets?: any[];
  selectedSections?: string[];
  isComplete: boolean;
}

export const EnhancedGenerationPreview = ({ 
  businessData, 
  projectName,
  uploadedAssets = [],
  selectedSections = [],
  isComplete 
}: EnhancedGenerationPreviewProps) => {
  const sections = [
    { id: 'hero', name: 'Hero Section', icon: ImageIcon, required: true },
    { id: 'about', name: 'About Us', icon: Building2, required: true },
    { id: 'services', name: 'Services', icon: Settings, required: false },
    { id: 'products', name: 'Products', icon: Building2, required: false },
    { id: 'infrastructure', name: 'Infrastructure', icon: Building2, required: false },
    { id: 'testimonials', name: 'Testimonials', icon: Users, required: false },
    { id: 'gallery', name: 'Gallery', icon: ImageIcon, required: false },
    { id: 'awards', name: 'Awards & Recognition', icon: Award, required: false },
    { id: 'environment', name: 'Environmental', icon: Leaf, required: false },
    { id: 'contact', name: 'Contact', icon: Phone, required: true },
  ];

  const getSectionStatus = (sectionId: string, required: boolean) => {
    if (required) return true;
    return selectedSections.includes(sectionId);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Website Preview
        </CardTitle>
        {projectName && (
          <p className="text-sm text-gray-600">{projectName}</p>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)] px-4">
          <div className="space-y-4">
            {/* Business Information */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Business Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-4 w-4 ${businessData?.businessName ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Business Name: {businessData?.businessName || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-4 w-4 ${businessData?.businessType ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Type: {businessData?.businessType || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-4 w-4 ${businessData?.location ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Location: {businessData?.location || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-4 w-4 ${businessData?.phone ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Phone: {businessData?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={`h-4 w-4 ${businessData?.email ? 'text-green-500' : 'text-gray-300'}`} />
                  <span>Email: {businessData?.email || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Services/Products */}
            {(businessData?.services?.length > 0 || businessData?.products?.length > 0) && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Services & Products</h4>
                <div className="space-y-2">
                  {businessData.services?.map((service: any, index: number) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{service.name}</div>
                      <div className="text-gray-600 text-xs">{service.description}</div>
                    </div>
                  ))}
                  {businessData.products?.map((product: any, index: number) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-gray-600 text-xs">{product.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Assets */}
            {uploadedAssets.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Uploaded Assets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {uploadedAssets.map((asset, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={asset.url} 
                        alt={asset.fileName}
                        className="w-full h-16 object-cover rounded border"
                      />
                      <Badge variant="secondary" className="absolute bottom-1 left-1 text-xs">
                        {asset.assetType}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Website Sections */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Website Sections</h4>
              <div className="space-y-2">
                {sections.map((section) => {
                  const isIncluded = getSectionStatus(section.id, section.required);
                  const Icon = section.icon;
                  
                  return (
                    <div key={section.id} className="flex items-center gap-2 text-sm">
                      {isIncluded ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-300" />
                      )}
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span className={isIncluded ? 'text-gray-900' : 'text-gray-500'}>
                        {section.name}
                      </span>
                      {section.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Generation Status */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-2">
                {isComplete ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-amber-500" />
                )}
                <span className="font-semibold text-sm">
                  {isComplete ? 'Ready to Generate' : 'Collecting Information'}
                </span>
              </div>
              {!isComplete && (
                <p className="text-xs text-gray-600">
                  Please provide business name, type, description, and either services or products to continue.
                </p>
              )}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
