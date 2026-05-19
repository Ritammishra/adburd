"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogForm } from "@/modules/blogs/components/BlogForm";
import { LoadingState } from "@/components/cms/LoadingState";
import { EmptyState } from "@/components/cms/EmptyState";

export default function EditBlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${params.id}`);
        const json = await res.json();
        if (json.success) {
          setBlog(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  if (isLoading) {
    return <LoadingState message="Loading blog details..." />;
  }

  if (!blog) {
    return <EmptyState title="Blog Not Found" description="The blog you are trying to edit does not exist or has been deleted." />;
  }

  return <BlogForm initialData={blog} isEditing={true} />;
}
