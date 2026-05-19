"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { ServiceInput, serviceSchema } from "@/validators/service";
import { AdminPageHeader } from "@/components/cms/AdminPageHeader";
import { AdminSection } from "@/components/cms/AdminSection";
import { AdminCard } from "@/components/cms/AdminCard";
import { FormInput } from "@/components/cms/FormInput";
import { FormTextarea } from "@/components/cms/FormTextarea";
import { FormSelect } from "@/components/cms/FormSelect";
import { FormSlugInput } from "@/components/cms/FormSlugInput";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ImageUploader } from "@/components/cms/ImageUploader";

interface ServiceFormProps {
  initialData?: Partial<ServiceInput> & { _id?: string };
  isEditing?: boolean;
}

export function ServiceForm({ initialData, isEditing }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Parse features properly for react-hook-form's useFieldArray which expects an array of objects
  const defaultFeatures = initialData?.features?.map(f => ({ value: f })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<any>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      shortDescription: initialData?.shortDescription || "",
      content: initialData?.content || "",
      status: initialData?.status || "draft",
      featuredImage: initialData?.featuredImage || "",
      iconName: initialData?.iconName || "Star",
      seoTitle: initialData?.seoTitle || "",
      metaDescription: initialData?.metaDescription || "",
      features: defaultFeatures,
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features"
  });

  const titleValue = watch("title");
  const contentValue = watch("content");
  const featuredImageValue = watch("featuredImage");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const url = isEditing ? `/api/admin/services/${initialData?._id}` : "/api/admin/services";
      const method = isEditing ? "PUT" : "POST";

      // Flatten features back from [{value: 'x'}] to ['x']
      const submitData = { ...data };
      submitData.features = data.features.map((f: any) => f.value).filter(Boolean);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save service");
      }

      toast.success(`Service ${isEditing ? 'updated' : 'created'} successfully`);
      router.push("/admin/dashboard/services");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AdminPageHeader
        title={isEditing ? "Edit Service" : "Create New Service"}
        action={
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-light transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover shadow-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Saving..." : isEditing ? "Update Service" : "Publish Service"}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AdminSection>
            <AdminCard className="space-y-6">
              <FormInput
                label="Service Title"
                placeholder="e.g. Search Engine Optimization"
                required
                {...register("title")}
                error={errors.title?.message as string}
              />
              <FormSlugInput
                label="URL Slug"
                placeholder="search-engine-optimization"
                required
                sourceValue={titleValue}
                onGenerate={(slug) => setValue("slug", slug)}
                {...register("slug")}
                error={errors.slug?.message as string}
              />
              <FormTextarea
                label="Short Description"
                placeholder="Brief summary for the service card..."
                rows={3}
                required
                {...register("shortDescription")}
                error={errors.shortDescription?.message as string}
              />
              <RichTextEditor
                label="Detailed Service Content"
                value={contentValue}
                onChange={(val) => setValue("content", val)}
                error={errors.content?.message as string}
              />
            </AdminCard>
          </AdminSection>

          <AdminSection title="Service Features">
             <AdminCard className="space-y-4">
                {featureFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start">
                     <div className="flex-1">
                       <FormInput
                         label="Feature"
                         placeholder="e.g. On-Page Optimization"
                         {...register(`features.${index}.value` as const)}
                         error={(errors.features as any)?.[index]?.value?.message as string}
                       />
                     </div>
                     <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors mt-1"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendFeature({ value: "" })}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
                >
                   <Plus className="w-4 h-4" /> Add Feature
                </button>
             </AdminCard>
          </AdminSection>
          
          <AdminSection title="SEO Settings">
            <AdminCard className="space-y-6">
              <FormInput
                label="SEO Title"
                placeholder="Custom SEO Title (optional)"
                {...register("seoTitle")}
                error={errors.seoTitle?.message as string}
              />
              <FormTextarea
                label="Meta Description"
                placeholder="Meta description for search engines..."
                rows={3}
                {...register("metaDescription")}
                error={errors.metaDescription?.message as string}
              />
            </AdminCard>
          </AdminSection>
        </div>

        <div className="space-y-8">
          <AdminSection>
            <AdminCard className="space-y-6">
              <FormSelect
                label="Status"
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Published", value: "published" },
                ]}
                {...register("status")}
                error={errors.status?.message as string}
              />
              <FormInput
                label="Icon Name (Lucide React)"
                placeholder="e.g. BarChart3, LineChart, Megaphone"
                {...register("iconName")}
                error={errors.iconName?.message as string}
                helperText="Enter the exact icon name from lucide.dev/icons"
              />
              <ImageUploader
                label="Featured Header Image"
                value={featuredImageValue}
                onChange={(url) => setValue("featuredImage", url)}
                error={errors.featuredImage?.message as string}
              />
            </AdminCard>
          </AdminSection>
        </div>
      </div>
    </form>
  );
}
