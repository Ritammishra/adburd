import React from "react";
import { Image as ImageIcon, UploadCloud } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange?: (url: string) => void;
  error?: string;
  helperText?: string;
}

export function ImageUploader({ label, value, onChange, error, helperText }: ImageUploaderProps) {
  // Cloudinary UI Placeholder
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-dark mb-1.5">{label}</label>
      
      <div className={`border-2 border-dashed rounded-xl p-6 transition-colors ${error ? 'border-red-500 bg-red-50' : 'border-border hover:border-primary/50 bg-light'}`}>
        {value ? (
          <div className="relative group rounded-lg overflow-hidden border border-border">
            <img src={value} alt="Uploaded preview" className="w-full h-auto max-h-48 object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button"
                onClick={() => onChange?.("")}
                className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50"
              >
                Remove Image
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center relative cursor-pointer group">
            <input 
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (onChange) onChange(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-dark mb-1 group-hover:text-primary transition-colors">Click to upload image</p>
            <p className="text-xs text-muted mb-4">SVG, PNG, JPG or GIF (Max. 5MB)</p>
            <div className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-muted transition-colors">
              Browse Files
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="text-sm text-red-500 mt-1.5">{error}</p>}
      {helperText && !error && <p className="text-sm text-muted mt-1.5">{helperText}</p>}
    </div>
  );
}
