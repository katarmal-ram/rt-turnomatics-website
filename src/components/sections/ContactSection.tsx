
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ContactSectionProps {
  data: {
    enabled: boolean;
    title: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    phone: string;
    email: string;
    whatsapp?: string;
    hours?: {
      weekdays: string;
      weekend: string;
    };
    mapEmbed?: string;
  };
}

export const ContactSection = ({ data }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!data?.enabled) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (data.whatsapp) {
      const message = encodeURIComponent('Hello! I would like to get in touch.');
      window.open(`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 relative"
      style={{
        backgroundColor: 'var(--background-color, #f8fafc)',
        color: 'var(--text-color, #1e293b)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-color, #1e293b)' }}
          >
            {data.title || 'Contact Us'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {data.address && (
              <div className="flex items-start space-x-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-color, #3b82f6)' }}
                >
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-color, #1e293b)' }}
                  >
                    Address
                  </h3>
                  <p style={{ color: 'var(--muted-color, #64748b)' }}>
                    {data.address.street}<br />
                    {data.address.city}, {data.address.state} {data.address.zip}<br />
                    {data.address.country}
                  </p>
                </div>
              </div>
            )}
            
            {data.phone && (
              <div className="flex items-start space-x-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-color, #3b82f6)' }}
                >
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-color, #1e293b)' }}
                  >
                    Phone
                  </h3>
                  <p style={{ color: 'var(--muted-color, #64748b)' }}>
                    {data.phone}
                  </p>
                </div>
              </div>
            )}
            
            {data.email && (
              <div className="flex items-start space-x-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-color, #3b82f6)' }}
                >
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-color, #1e293b)' }}
                  >
                    Email
                  </h3>
                  <p style={{ color: 'var(--muted-color, #64748b)' }}>
                    {data.email}
                  </p>
                </div>
              </div>
            )}
            
            {data.hours && (
              <div className="flex items-start space-x-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-color, #3b82f6)' }}
                >
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-color, #1e293b)' }}
                  >
                    Business Hours
                  </h3>
                  <p style={{ color: 'var(--muted-color, #64748b)' }}>
                    {data.hours.weekdays}<br />
                    {data.hours.weekend}
                  </p>
                </div>
              </div>
            )}
            
            {data.whatsapp && (
              <Button
                onClick={handleWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            )}
          </div>
          
          {/* Contact Form */}
          <div 
            className="rounded-lg shadow-lg p-8"
            style={{ 
              backgroundColor: 'var(--card-background, #ffffff)',
              borderColor: 'var(--border-color, #e2e8f0)',
              border: '1px solid var(--border-color, #e2e8f0)'
            }}
          >
            <h3 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-color, #1e293b)' }}
            >
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label 
                  htmlFor="name"
                  style={{ color: 'var(--text-color, #1e293b)' }}
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    backgroundColor: 'var(--input-background, #ffffff)',
                    borderColor: 'var(--border-color, #d1d5db)',
                    color: 'var(--text-color, #1e293b)'
                  }}
                />
              </div>
              <div>
                <Label 
                  htmlFor="email"
                  style={{ color: 'var(--text-color, #1e293b)' }}
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    backgroundColor: 'var(--input-background, #ffffff)',
                    borderColor: 'var(--border-color, #d1d5db)',
                    color: 'var(--text-color, #1e293b)'
                  }}
                />
              </div>
              <div>
                <Label 
                  htmlFor="message"
                  style={{ color: 'var(--text-color, #1e293b)' }}
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  required
                  style={{
                    backgroundColor: 'var(--input-background, #ffffff)',
                    borderColor: 'var(--border-color, #d1d5db)',
                    color: 'var(--text-color, #1e293b)'
                  }}
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--primary-color, #3b82f6)',
                  color: '#ffffff'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Map */}
        {data.mapEmbed && (
          <div className="mt-12">
            <iframe
              src={data.mapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};
