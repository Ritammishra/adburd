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

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/services?page=${page}&limit=10&search=${debouncedSearch}&status=${statusFilter}`);
      const json = await res.json();
      if (json.success) {
        setServices(json.data);
        setMeta(json.meta);
      }
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, debouncedSearch, statusFilter]);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/services/${itemToDelete._id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Service deleted successfully");
        setServices(services.filter(s => s._id !== itemToDelete._id));
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete service");
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
      accessorKey: "iconName",
      header: "Icon",
      cell: (info: any) => <span className="text-muted text-xs font-mono">{info.getValue()}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: any) => <StatusBadge status={info.getValue()} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-2">
            <Link 
              href={`/admin/dashboard/services/${item._id}`}
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
        title="Services"
        description="Manage your agency's service offerings."
        action={
          <Link
            href="/admin/dashboard/services/create"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> New Service
          </Link>
        }
      />

      <AdminSection>
        <AdminCard noPadding>
          {/* Filters */}
          <div className="p-4 border-b border-border flex flex-wrap gap-4 bg-white">
            <input
              type="text"
              placeholder="Search services..."
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
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={services}
            isLoading={isLoading}
            emptyTitle="No services found"
            emptyDescription="Get started by creating a new service offering."
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
