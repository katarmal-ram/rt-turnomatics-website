
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HeroStyle {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
  bestFor: string[];
}

interface HeroStyleSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStyleSelect: (styleId: string) => void;
  onGenerate: (selectedStyle: string) => void;
}

const heroStyles: HeroStyle[] = [
  {
    id: 'centered',
    name: 'Centered Hero',
    description: 'Clean and professional centered layout with strong call-to-action',
    preview: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop',
    features: ['Centered content', 'Prominent CTA buttons', 'Professional look'],
    bestFor: ['Corporate websites', 'Professional services', 'Clean branding']
  },
  {
    id: 'split',
    name: 'Split Layout',
    description: 'Content on one side, compelling image on the other',
    preview: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
    features: ['Side-by-side layout', 'Image showcase', 'Balanced design'],
    bestFor: ['Product showcases', 'Service explanations', 'Feature highlights']
  },
  {
    id: 'minimal',
    name: 'Minimal Hero',
    description: 'Simple and clean with focus on typography and content',
    preview: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=200&fit=crop',
    features: ['Lots of whitespace', 'Typography focus', 'Distraction-free'],
    bestFor: ['Modern brands', 'Text-heavy content', 'Elegant designs']
  },
  {
    id: 'gradient',
    name: 'Gradient Hero',
    description: 'Dynamic gradient backgrounds with modern appeal',
    preview: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop',
    features: ['Dynamic backgrounds', 'Color variety', 'Modern appeal'],
    bestFor: ['Creative agencies', 'Tech companies', 'Young brands']
  },
  {
    id: 'carousel',
    name: 'Image Carousel',
    description: 'Multiple images rotating to showcase different aspects',
    preview: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop',
    features: ['Multiple images', 'Auto-rotation', 'Dynamic content'],
    bestFor: ['Portfolios', 'Product galleries', 'Multiple services']
  },
  {
    id: 'video',
    name: 'Video Background',
    description: 'Engaging video background with overlay content',
    preview: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=200&fit=crop',
    features: ['Video backgrounds', 'Motion appeal', 'High engagement'],
    bestFor: ['Entertainment', 'Dynamic brands', 'Event companies']
  }
];

export const HeroStyleSelector = ({ open, onOpenChange, onStyleSelect, onGenerate }: HeroStyleSelectorProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('centered');

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    onStyleSelect(styleId);
  };

  const handleGenerate = () => {
    onGenerate(selectedStyle);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Your Hero Style</DialogTitle>
          <p className="text-gray-600">Select the hero section style that best represents your business</p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {heroStyles.map((style) => (
            <Card 
              key={style.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedStyle === style.id 
                  ? 'ring-2 ring-blue-600 shadow-lg' 
                  : 'hover:ring-1 hover:ring-gray-300'
              }`}
              onClick={() => handleStyleSelect(style.id)}
            >
              <div className="relative">
                <img 
                  src={style.preview} 
                  alt={style.name}
                  className="w-full h-24 object-cover rounded-t-lg"
                />
                {selectedStyle === style.id && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-600">Selected</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{style.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{style.description}</p>
                
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {style.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Best for: {style.bestFor.slice(0, 2).join(', ')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} className="bg-green-600 hover:bg-green-700">
            Generate Website with {heroStyles.find(s => s.id === selectedStyle)?.name}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
