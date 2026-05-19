"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { AdminPageHeader } from "@/components/cms/AdminPageHeader";
import { AdminSection } from "@/components/cms/AdminSection";
import { AdminCard } from "@/components/cms/AdminCard";
import { DataTable } from "@/components/cms/DataTable";
import { TablePagination } from "@/components/cms/TablePagination";
import { StatusBadge } from "@/components/cms/StatusBadge";
import { DeleteModal } from "@/components/cms/DeleteModal";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs?page=${page}&limit=10&search=${debouncedSearch}&status=${statusFilter}`);
      const json = await res.json();
      if (json.success) {
        setBlogs(json.data);
        setMeta(json.meta);
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, debouncedSearch, statusFilter]);

  const handleDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${blogToDelete._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog deleted successfully");
        setBlogs(blogs.filter(b => b._id !== blogToDelete._id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setBlogToDelete(null);
    }
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: (info: any) => <span className="font-medium">{info.getValue()}</span>,
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: (info: any) => <span className="text-muted text-xs font-mono">{info.getValue()}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => <StatusBadge status={info.getValue()} />,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const blog = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link 
              href={`/admin/dashboard/blogs/${blog._id}/edit`}
              className="p-1.5 text-muted hover:text-primary transition-colors bg-light rounded"
            >
              <Edit2 className="w-4 h-4" />
            </Link>
            <button 
              onClick={() => {
                setBlogToDelete(blog);
                setIsDeleteModalOpen(true);
              }}
              className="p-1.5 text-muted hover:text-red-600 transition-colors bg-light rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Blogs"
        description="Manage your blog posts and articles."
        action={
          <Link
            href="/admin/dashboard/blogs/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> New Blog
          </Link>
        }
      />

      <AdminSection>
        <AdminCard noPadding>
          {/* Filters */}
          <div className="p-4 border-b border-border flex gap-4 bg-white">
            <input
              type="text"
              placeholder="Search blogs..."
              className="flex-1 max-w-sm px-4 py-2 bg-light border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 bg-light border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={blogs}
            isLoading={isLoading}
            emptyTitle="No blogs found"
            emptyDescription="Get started by creating a new blog post."
          />

          {/* Pagination */}
          {meta && <TablePagination meta={meta} onPageChange={setPage} />}
        </AdminCard>
      </AdminSection>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={blogToDelete?.title || ""}
        isLoading={isDeleting}
      />
    </>
  );
}
