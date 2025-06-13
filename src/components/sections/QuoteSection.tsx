
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuoteSectionProps {
  data: {
    enabled: boolean;
    title: string;
    subtitle: string;
    fields?: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
      options?: string[];
    }>;
    submitUrl: string;
  };
}

export const QuoteSection = ({ data }: QuoteSectionProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!data.enabled || !data.fields || data.fields.length === 0) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote form submitted:', formData);
    // Handle form submission to data.submitUrl
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (field: any) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'select':
        return (
          <Select value={value} onValueChange={(value) => handleInputChange(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              )) || []}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            rows={4}
          />
        );
      default:
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
          />
        );
    }
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600">
            {data.subtitle}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.fields.map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <Label htmlFor={field.name}>
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
              Request Quote
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
