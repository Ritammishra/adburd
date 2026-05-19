"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BlogInput, blogSchema } from "@/validators/blog";
import { AdminPageHeader } from "@/components/cms/AdminPageHeader";
import { AdminSection } from "@/components/cms/AdminSection";
import { AdminCard } from "@/components/cms/AdminCard";
import { FormInput } from "@/components/cms/FormInput";
import { FormTextarea } from "@/components/cms/FormTextarea";
import { FormSelect } from "@/components/cms/FormSelect";
import { FormSlugInput } from "@/components/cms/FormSlugInput";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { ImageUploader } from "@/components/cms/ImageUploader";
import { SEOFields } from "@/components/cms/SEOFields";

interface BlogFormProps {
  initialData?: Partial<BlogInput> & { _id?: string };
  isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogInput>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      status: initialData?.status || "draft",
      featuredImage: initialData?.featuredImage || "",
      seo: initialData?.seo || {},
    },
  });

  const titleValue = watch("title");
  const contentValue = watch("content");
  const featuredImageValue = watch("featuredImage");

  const onSubmit = async (data: BlogInput) => {
    setIsLoading(true);
    try {
      const url = isEditing ? `/api/admin/blogs/${initialData?._id}` : "/api/admin/blogs";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save blog");
      }

      toast.success(`Blog ${isEditing ? 'updated' : 'created'} successfully`);
      router.push("/admin/dashboard/blogs");
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
        title={isEditing ? "Edit Blog Post" : "Create New Blog"}
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
              {isLoading ? "Saving..." : isEditing ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AdminSection>
            <AdminCard className="space-y-6">
              <FormInput
                label="Post Title"
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
                label="Excerpt"
                placeholder="Brief summary of the post..."
                rows={3}
                {...register("excerpt")}
                error={errors.excerpt?.message}
              />
              <RichTextEditor
                label="Post Content"
                required
                value={contentValue}
                onChange={(val) => setValue("content", val)}
                error={errors.content?.message}
              />
            </AdminCard>
          </AdminSection>

          <AdminSection>
            <AdminCard>
              <SEOFields
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
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
                  { label: "Archived", value: "archived" },
                ]}
                {...register("status")}
                error={errors.status?.message}
              />
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
