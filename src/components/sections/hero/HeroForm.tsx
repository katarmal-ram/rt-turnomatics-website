
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from 'react';

interface HeroFormProps {
  data: {
    enabled: boolean;
    headline: string;
    subheadline: string;
    backgroundImage?: string;
    formTitle: string;
    formFields: Array<{
      type: 'email' | 'text' | 'textarea' | 'phone';
      placeholder: string;
      required?: boolean;
    }>;
    submitText: string;
  };
}

export const HeroForm = ({ data }: HeroFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (index: number, value: string) => {
    setFormData(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  if (!data.enabled) return null;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-20"
      style={{ backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : 'none' }}
    >
      {data.backgroundImage && <div className="absolute inset-0 bg-black/60" />}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              {data.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in">
              {data.subheadline}
            </p>
          </div>

          {/* Right Side - Form */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl animate-scale-in">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {data.formTitle}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {data.formFields?.map((field, index) => (
                  <div key={index}>
                    {field.type === 'textarea' ? (
                      <Textarea
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[index] || ''}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[index] || ''}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {data.submitText}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
