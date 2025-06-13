
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (timing: string) => void;
  initialTiming?: string;
}

export const TimingDialog = ({ open, onOpenChange, onSave, initialTiming = "" }: TimingDialogProps) => {
  const [timing, setTiming] = useState(initialTiming);

  const handleSave = () => {
    onSave(timing);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Business Hours</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="timing">Operating Hours</Label>
            <Input
              id="timing"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              placeholder="e.g., Mon-Fri 9AM-6PM, Sat 10AM-4PM"
              className="mt-2"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Hours
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
