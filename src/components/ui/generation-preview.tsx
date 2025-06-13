
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

interface BusinessData {
  businessName?: string;
  businessType?: string;
  description?: string;
  services?: string[];
  products?: string[];
  targetAudience?: string;
  uniqueValue?: string;
  location?: string;
  phone?: string;
  email?: string;
  certificates?: string[];
  yearsInBusiness?: string;
  additionalInfo?: string;
}

interface GenerationPreviewProps {
  businessData: BusinessData | null;
  isComplete: boolean;
}

export const GenerationPreview = ({ businessData, isComplete }: GenerationPreviewProps) => {
  const requiredFields = [
    { key: 'businessName', label: 'Business Name', value: businessData?.businessName, required: true },
    { key: 'businessType', label: 'Business Type', value: businessData?.businessType, required: true },
    { key: 'description', label: 'Description', value: businessData?.description, required: true },
  ];

  const servicesOrProducts = [
    { 
      key: 'services', 
      label: 'Services', 
      value: businessData?.services?.length ? businessData.services.join(', ') : null,
      count: businessData?.services?.length || 0
    },
    { 
      key: 'products', 
      label: 'Products', 
      value: businessData?.products?.length ? businessData.products.join(', ') : null,
      count: businessData?.products?.length || 0
    },
  ];

  const hasServicesOrProducts = (businessData?.services && businessData.services.length > 0) || 
                               (businessData?.products && businessData.products.length > 0);

  const optionalFields = [
    { key: 'targetAudience', label: 'Target Audience', value: businessData?.targetAudience },
    { key: 'location', label: 'Location', value: businessData?.location },
    { key: 'uniqueValue', label: 'Unique Value', value: businessData?.uniqueValue },
    { key: 'phone', label: 'Phone', value: businessData?.phone },
    { key: 'email', label: 'Email', value: businessData?.email },
    { key: 'certificates', label: 'Certifications', value: businessData?.certificates?.length ? businessData.certificates.join(', ') : null },
  ];

  const sectionsToGenerate = [
    'Hero Section',
    'About Section',
    businessData?.services?.length ? 'Services Section' : null,
    businessData?.products?.length ? 'Products Section' : null,
    'Features Section',
    'Why Choose Us',
    businessData?.certificates?.length ? 'Certifications' : null,
    'Testimonials',
    'Contact Section',
    'Footer'
  ].filter(Boolean);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Website Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Required Information</h4>
          <div className="space-y-2">
            {requiredFields.map((field) => (
              <div key={field.key} className="flex items-center gap-2">
                {field.value ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-400" />
                )}
                <span className={`text-sm ${field.value ? 'text-gray-900' : 'text-gray-500'}`}>
                  {field.label}
                </span>
                {field.value && (
                  <Badge variant="secondary" className="text-xs">
                    ✓
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            Services or Products 
            <span className="text-xs text-gray-500">(Required)</span>
          </h4>
          <div className="space-y-2">
            {servicesOrProducts.map((field) => (
              <div key={field.key} className="flex items-start gap-2">
                {field.count > 0 ? (
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${field.count > 0 ? 'text-gray-900' : 'text-gray-500'}`}>
                      {field.label}
                    </span>
                    {field.count > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {field.count} items
                      </Badge>
                    )}
                  </div>
                  {field.value && (
                    <p className="text-sm text-gray-600 truncate mt-1">{field.value}</p>
                  )}
                </div>
              </div>
            ))}
            {!hasServicesOrProducts && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs">Please specify services or products</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Additional Information</h4>
          <div className="space-y-2">
            {optionalFields.map((field) => (
              field.value && (
                <div key={field.key} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-sm font-medium">{field.label}:</span>
                    <p className="text-sm text-gray-600 truncate">{field.value}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Sections to Generate</h4>
          <div className="flex flex-wrap gap-1">
            {sectionsToGenerate.map((section) => (
              <Badge key={section} variant="outline" className="text-xs">
                {section}
              </Badge>
            ))}
          </div>
        </div>

        {isComplete ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              ✓ Ready to generate your website!
            </p>
          </div>
        ) : (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">
              Continue chatting to provide missing information
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
