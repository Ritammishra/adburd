import React from "react";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { ImageUploader } from "./ImageUploader";

export interface SEOFieldsProps {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
  prefix?: string; // e.g., 'seo.' if the fields are nested in an object
}

export function SEOFields({ register, errors, setValue, watch, prefix = "seo." }: SEOFieldsProps) {
  const ogImageValue = watch(`${prefix}ogImage`);

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-primary pl-4 py-1">
        <h3 className="text-lg font-semibold text-dark">Search Engine Optimization</h3>
        <p className="text-sm text-muted mt-1">Enhance your content's visibility in search results.</p>
      </div>

      <div className="space-y-4">
        <FormInput
          label="Meta Title"
          placeholder="Max 60 characters..."
          {...register(`${prefix}metaTitle`)}
          error={errors.seo?.metaTitle?.message}
          helperText="Leave blank to use the main title."
        />

        <FormTextarea
          label="Meta Description"
          placeholder="Max 160 characters..."
          rows={3}
          {...register(`${prefix}metaDescription`)}
          error={errors.seo?.metaDescription?.message}
          helperText="A brief summary of the page for search results."
        />

        <FormInput
          label="Meta Keywords"
          placeholder="e.g. digital marketing, seo, agency"
          {...register(`${prefix}metaKeywords`)}
          error={errors.seo?.metaKeywords?.message}
          helperText="Comma separated keywords."
        />

        <ImageUploader
          label="Social Sharing Image (OG Image)"
          value={ogImageValue}
          onChange={(url) => setValue(`${prefix}ogImage`, url)}
          error={errors.seo?.ogImage?.message}
          helperText="Recommended size: 1200x630px. Used for Facebook, Twitter, LinkedIn previews."
        />
      </div>
    </div>
  );
}
