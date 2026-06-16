import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";

export function BrandingAdmin() {
  const { data: branding, isLoading } = trpc.branding.get.useQuery();
  const updateBranding = trpc.branding.update.useMutation();
  
  const [primaryColor, setPrimaryColor] = useState(branding?.primaryColor || "#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState(branding?.secondaryColor || "#1e40af");
  const [accentColor, setAccentColor] = useState(branding?.accentColor || "#0ea5e9");
  const [logoUrl, setLogoUrl] = useState(branding?.logoUrl || "");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Convert file to base64 for preview
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        setLogoUrl(base64);
        toast.success("Logo uploaded successfully");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to upload logo");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleSave = async () => {
    try {
      await updateBranding.mutateAsync({
        primaryColor,
        secondaryColor,
        accentColor,
        logoUrl,
      });
      toast.success("Branding updated successfully");
    } catch (error) {
      toast.error("Failed to update branding");
    }
  };

  const clearLogo = () => {
    setLogoUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand Customization</CardTitle>
        <CardDescription>
          Customize the colors and logo for your organization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo Upload */}
        <div className="space-y-3">
          <Label>Logo</Label>
          
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isUploading}
            />

            {logoUrl ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-12 w-12 object-contain"
                  />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Logo uploaded</p>
                    <p className="text-xs">Click to replace or drag new file</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearLogo();
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                {isUploading ? (
                  <>
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                    <p className="text-sm text-gray-600">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Drag and drop your logo here
                      </p>
                      <p className="text-xs text-gray-500">
                        or click to browse (PNG, JPG, SVG - max 5MB)
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primary"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-14 cursor-pointer"
              />
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1"
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondary"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-10 w-14 cursor-pointer"
              />
              <Input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1"
                placeholder="#1e40af"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accent">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="accent"
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-10 w-14 cursor-pointer"
              />
              <Input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="flex-1"
                placeholder="#0ea5e9"
              />
            </div>
          </div>
        </div>

        {/* Color Preview */}
        <div className="space-y-2">
          <Label>Color Preview</Label>
          <div className="flex gap-4">
            <div
              className="h-20 w-20 rounded border"
              style={{ backgroundColor: primaryColor }}
              title="Primary"
            />
            <div
              className="h-20 w-20 rounded border"
              style={{ backgroundColor: secondaryColor }}
              title="Secondary"
            />
            <div
              className="h-20 w-20 rounded border"
              style={{ backgroundColor: accentColor }}
              title="Accent"
            />
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={updateBranding.isPending}
          className="w-full"
        >
          {updateBranding.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Branding"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
