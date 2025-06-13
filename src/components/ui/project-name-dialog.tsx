
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface ProjectNameDialogProps {
  open: boolean;
  onProjectNameSet: (name: string, description: string) => void;
}

export const ProjectNameDialog = ({ open, onProjectNameSet }: ProjectNameDialogProps) => {
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim()) {
      onProjectNameSet(businessName.trim(), businessDescription.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Create Your Industrial Website
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Let's create a professional website for your metal manufacturing business. Claude AI will help build a website tailored to your industry.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="business-name">Business Name *</Label>
              <Input
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g., ABC Steel Industries, MetalCraft Solutions"
                className="mt-1"
                autoFocus
              />
            </div>

            <div>
              <Label htmlFor="business-description">Business Description</Label>
              <Textarea
                id="business-description"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                placeholder="Describe your manufacturing business - what metals do you work with? (brass, copper, aluminum, steel, stainless steel), what processes? (forging, casting, machining), what products do you make?"
                className="mt-1 min-h-[100px]"
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Help Claude understand your business better for a more tailored website
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!businessName.trim()}
            >
              Start Building My Industrial Website
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
