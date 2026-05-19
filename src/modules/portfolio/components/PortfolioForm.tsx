"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { PortfolioInput, portfolioSchema } from "@/validators/portfolio";
import { AdminPageHeader } from "@/components/cms/AdminPageHeader";
import { AdminSection } from "@/components/cms/AdminSection";
import { AdminCard } from "@/components/cms/AdminCard";
import { FormInput } from "@/components/cms/FormInput";
import { FormTextarea } from "@/components/cms/FormTextarea";
import { FormSelect } from "@/components/cms/FormSelect";
import { FormSlugInput } from "@/components/cms/FormSlugInput";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ImageUploader } from "@/components/cms/ImageUploader";

interface PortfolioFormProps {
  initialData?: Partial<PortfolioInput> & { _id?: string };
  isEditing?: boolean;
}

export function PortfolioForm({ initialData, isEditing }: PortfolioFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<PortfolioInput>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      shortDescription: initialData?.shortDescription || "",
      content: initialData?.content || "",
      status: initialData?.status || "draft",
      featuredImage: initialData?.featuredImage || "",
      category: initialData?.category || null,
      industry: initialData?.industry || "",
      clientName: initialData?.clientName || "",
      projectUrl: initialData?.projectUrl || "",
      technologies: initialData?.technologies || [],
      results: initialData?.results || [],
      featured: initialData?.featured || false,
      seoTitle: initialData?.seoTitle || "",
      metaDescription: initialData?.metaDescription || "",
    },
  });

  const { fields: resultFields, append: appendResult, remove: removeResult } = useFieldArray({
    control,
    name: "results"
  });

  const titleValue = watch("title");
  const contentValue = watch("content");
  const featuredImageValue = watch("featuredImage");
  const featuredValue = watch("featured");

  const onSubmit = async (data: PortfolioInput) => {
    setIsLoading(true);
    try {
      const url = isEditing ? `/api/admin/portfolio/${initialData?._id}` : "/api/admin/portfolio";
      const method = isEditing ? "PUT" : "POST";

      // Split technologies by comma if it's a string from input
      let submitData = { ...data };
      if (typeof data.technologies === 'string') {
          submitData.technologies = (data.technologies as string).split(',').map(t => t.trim()).filter(Boolean);
      } else if (!data.technologies) {
          submitData.technologies = [];
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save portfolio");
      }

      toast.success(`Portfolio ${isEditing ? 'updated' : 'created'} successfully`);
      router.push("/admin/dashboard/portfolio");
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
        title={isEditing ? "Edit Portfolio Item" : "Create New Portfolio Item"}
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
              {isLoading ? "Saving..." : isEditing ? "Update Portfolio" : "Publish Portfolio"}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AdminSection>
            <AdminCard className="space-y-6">
              <FormInput
                label="Project Title"
                placeholder="Enter an engaging title"
                required
                {...register("title")}
                error={errors.title?.message}
              />
              <FormSlugInput
                label="URL Slug"
                placeholder="enter-slug-here"
                required
                sourceValue={titleValue}
                onGenerate={(slug) => setValue("slug", slug)}
                {...register("slug")}
                error={errors.slug?.message}
              />
              <FormTextarea
                label="Short Description"
                placeholder="Brief summary of the project..."
                rows={3}
                required
                {...register("shortDescription")}
                error={errors.shortDescription?.message}
              />
              <RichTextEditor
                label="Project Content/Case Study"
                value={contentValue}
                onChange={(val) => setValue("content", val)}
                error={errors.content?.message}
              />
            </AdminCard>
          </AdminSection>

          <AdminSection title="Project Details">
            <AdminCard className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormInput
                    label="Client Name"
                    placeholder="e.g. Acme Corp"
                    {...register("clientName")}
                    error={errors.clientName?.message}
                 />
                 <FormInput
                    label="Industry"
                    placeholder="e.g. Healthcare"
                    {...register("industry")}
                    error={errors.industry?.message}
                 />
              </div>
              <FormInput
                label="Project URL"
                placeholder="https://..."
                {...register("projectUrl")}
                error={errors.projectUrl?.message}
              />
              <FormInput
                label="Technologies (comma separated)"
                placeholder="React, Next.js, Node.js"
                {...register("technologies")}
                error={errors.technologies?.message}
              />
            </AdminCard>
          </AdminSection>

          <AdminSection title="Key Results">
             <AdminCard className="space-y-4">
                {resultFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start">
                     <div className="flex-1">
                       <FormInput
                         label="Result label"
                         placeholder="Label (e.g. Conversion Rate)"
                         {...register(`results.${index}.label` as const)}
                         error={errors.results?.[index]?.label?.message}
                       />
                     </div>
                     <div className="flex-1">
                       <FormInput
                         label="Result value"
                         placeholder="Value (e.g. +50%)"
                         {...register(`results.${index}.value` as const)}
                         error={errors.results?.[index]?.value?.message}
                       />
                     </div>
                     <button
                        type="button"
                        onClick={() => removeResult(index)}
                        className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors mt-1"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendResult({ label: "", value: "" })}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
                >
                   <Plus className="w-4 h-4" /> Add Result
                </button>
             </AdminCard>
          </AdminSection>
          
          <AdminSection title="SEO Settings">
            <AdminCard className="space-y-6">
              <FormInput
                label="SEO Title"
                placeholder="Custom SEO Title (optional)"
                {...register("seoTitle")}
                error={errors.seoTitle?.message}
              />
              <FormTextarea
                label="Meta Description"
                placeholder="Meta description for search engines..."
                rows={3}
                {...register("metaDescription")}
                error={errors.metaDescription?.message}
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
                error={errors.status?.message}
              />
              <FormSelect
                label="Category"
                options={[
                  { label: "None", value: "" },
                  { label: "Website Development", value: "Website Development" },
                  { label: "SEO", value: "SEO" },
                  { label: "PPC", value: "PPC" },
                  { label: "Branding", value: "Branding" },
                  { label: "Social Media", value: "Social Media" },
                ]}
                {...register("category")}
                error={errors.category?.message}
              />
              <div className="flex items-center gap-3">
                 <input 
                    type="checkbox" 
                    id="featured"
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    {...register("featured")}
                 />
                 <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured Project
                 </label>
              </div>
              <ImageUploader
                label="Featured Image"
                value={featuredImageValue}
                onChange={(url) => setValue("featuredImage", url)}
                error={errors.featuredImage?.message}
              />
            </AdminCard>
          </AdminSection>
        </div>
      </div>
    </form>
  );
}
