"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/cms/AdminPageHeader";
import { DataTable } from "@/components/cms/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce"; // Ensure this exists, we used it in blogs
import Link from "next/link";
import { LeadDrawerForm } from "./LeadDrawerForm";
import clsx from "clsx";

export function LeadsList() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [meta, setMeta] = useState<any>(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?page=${page}&limit=10&search=${debouncedSearch}&status=${statusFilter}`);
      const json = await res.json();
      if (json.success) {
        setLeads(json.data);
        setMeta(json.meta);
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Failed to fetch leads");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, debouncedSearch, statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        toast.success("Lead deleted");
        fetchLeads();
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const statusColors: any = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    qualified: "bg-purple-100 text-purple-700",
    proposal_sent: "bg-indigo-100 text-indigo-700",
    converted: "bg-green-100 text-green-700",
    lost: "bg-red-100 text-red-700",
  };

  const priorityColors: any = {
    low: "text-gray-500",
    medium: "text-yellow-600",
    high: "text-red-600 font-bold",
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-dark">{row.original.firstName} {row.original.lastName}</span>
          {row.original.company && <span className="text-xs text-muted mt-0.5">{row.original.company}</span>}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "CONTACT",
      cell: ({ row }) => (
        <div className="flex flex-col text-sm text-muted">
          <span>{row.original.email}</span>
          {row.original.phone && <span>{row.original.phone}</span>}
        </div>
      ),
    },
    {
      accessorKey: "source",
      header: "SOURCE",
      cell: ({ row }) => {
        const src = row.original.source.replace("_", " ");
        return <span className="capitalize text-sm font-medium">{src}</span>;
      }
    },
    {
      accessorKey: "priority",
      header: "PRIORITY",
      cell: ({ row }) => (
        <span className={clsx("capitalize text-sm", priorityColors[row.original.priority] || "")}>
          {row.original.priority}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <span className={clsx("px-2.5 py-1 text-xs font-bold rounded-full capitalize", statusColors[row.original.status] || "bg-gray-100 text-gray-700")}>
          {row.original.status.replace("_", " ")}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "DATE",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/dashboard/leads/${row.original._id}`} className="p-2 text-muted hover:text-primary transition-colors bg-light rounded-lg">
            <Eye className="w-4 h-4" />
          </Link>
          <button onClick={() => handleDelete(row.original._id)} className="p-2 text-muted hover:text-red-500 transition-colors bg-light rounded-lg">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <AdminPageHeader 
        title="Leads CRM" 
        description="Manage your incoming leads, audits, and inquiries."
        action={
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover shadow-sm transition-colors"
          >
            New Lead
          </button>
        }
      />

      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-sm bg-light border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-light border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <DataTable 
          columns={columns} 
          data={leads} 
          isLoading={isLoading} 
          emptyTitle="No leads found"
          emptyDescription="There are no leads matching your current filters."
        />

        {/* Basic Pagination */}
        {!isLoading && meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted">
              Showing page {meta.page} of {meta.totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button 
                disabled={!meta.hasPrevPage}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 rounded-lg bg-light border border-border text-sm font-medium text-dark disabled:opacity-50 transition-colors hover:bg-gray-100"
              >
                Previous
              </button>
              <button 
                disabled={!meta.hasNextPage}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 rounded-lg bg-light border border-border text-sm font-medium text-dark disabled:opacity-50 transition-colors hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <LeadDrawerForm 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSuccess={() => fetchLeads()} 
      />
    </div>
  );
}
