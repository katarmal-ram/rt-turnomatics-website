
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string, assetType: string, fileName: string) => void;
  assetType: 'logo' | 'hero' | 'service' | 'product' | 'gallery' | 'other';
  chatSessionId?: string;
  multiple?: boolean;
  className?: string;
}

export const ImageUpload = ({ 
  onImageUpload, 
  assetType, 
  chatSessionId, 
  multiple = false,
  className = ""
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`);
          return null;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${supabase.auth.getUser().then(u => u.data.user?.id)}/${assetType}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-assets')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-assets')
          .getPublicUrl(filePath);

        // Store asset metadata in database
        const { error: dbError } = await supabase
          .from('project_assets')
          .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            chat_session_id: chatSessionId,
            asset_type: assetType,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            mime_type: file.type,
            metadata: { originalName: file.name, uploadedAt: new Date().toISOString() }
          });

        if (dbError) throw dbError;

        return { url: publicUrl, fileName: file.name };
      });

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(result => result !== null);

      successfulUploads.forEach(result => {
        if (result) {
          onImageUpload(result.url, assetType, result.fileName);
          setUploadedImages(prev => [...prev, result.url]);
        }
      });

      toast.success(`${successfulUploads.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image(s)');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (imageUrl: string) => {
    setUploadedImages(prev => prev.filter(url => url !== imageUrl));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <Upload className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Upload {assetType === 'logo' ? 'Logo' : assetType === 'hero' ? 'Hero Image' : 'Image'}
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {uploadedImages.map((imageUrl, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-2">
                <img 
                  src={imageUrl} 
                  alt={`Uploaded ${assetType}`}
                  className="w-full h-20 object-cover rounded"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-1 -right-1 h-6 w-6"
                  onClick={() => removeImage(imageUrl)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
