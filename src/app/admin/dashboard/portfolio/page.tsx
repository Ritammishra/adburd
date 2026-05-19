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

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPortfolios = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/portfolio?page=${page}&limit=10&search=${debouncedSearch}&status=${statusFilter}&category=${categoryFilter}`);
      const json = await res.json();
      if (json.success) {
        setPortfolios(json.data);
        setMeta(json.meta);
      }
    } catch (error) {
      toast.error("Failed to fetch portfolios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [page, debouncedSearch, statusFilter, categoryFilter]);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/portfolio/${itemToDelete._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Portfolio deleted successfully");
        setPortfolios(portfolios.filter(p => p._id !== itemToDelete._id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete portfolio");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: (info: any) => <span className="font-medium">{info.getValue()}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info: any) => <span className="text-muted text-sm">{info.getValue() || "Uncategorized"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => <StatusBadge status={info.getValue()} />,
    },
    {
      accessorKey: "featured",
      header: "Featured",
      cell: (info: any) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${info.getValue() ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
           {info.getValue() ? "Yes" : "No"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link 
              href={`/admin/dashboard/portfolio/${item._id}`}
              className="p-1.5 text-muted hover:text-primary transition-colors bg-light rounded"
            >
              <Edit2 className="w-4 h-4" />
            </Link>
            <button 
              onClick={() => {
                setItemToDelete(item);
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
        title="Portfolio"
        description="Manage your portfolio projects and case studies."
        action={
          <Link
            href="/admin/dashboard/portfolio/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> New Project
          </Link>
        }
      />

      <AdminSection>
        <AdminCard noPadding>
          {/* Filters */}
          <div className="p-4 border-b border-border flex flex-wrap gap-4 bg-white">
            <input
              type="text"
              placeholder="Search projects..."
              className="flex-1 min-w-[200px] max-w-sm px-4 py-2 bg-light border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
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
            </select>
            <select
              className="px-4 py-2 bg-light border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Website Development">Website Development</option>
              <option value="SEO">SEO</option>
              <option value="PPC">PPC</option>
              <option value="Branding">Branding</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={portfolios}
            isLoading={isLoading}
            emptyTitle="No portfolio projects found"
            emptyDescription="Get started by creating a new portfolio case study."
          />

          {/* Pagination */}
          {meta && <TablePagination meta={meta} onPageChange={setPage} />}
        </AdminCard>
      </AdminSection>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={itemToDelete?.title || ""}
        isLoading={isDeleting}
      />
    </>
  );
}
