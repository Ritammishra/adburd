import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationMeta } from "@/utils/pagination";
import clsx from "clsx";

interface TablePaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function TablePagination({ meta, onPageChange }: TablePaginationProps) {
  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-white">
      <div className="text-sm text-muted">
        Showing <span className="font-medium text-dark">{(meta.page - 1) * meta.limit + 1}</span> to{" "}
        <span className="font-medium text-dark">
          {Math.min(meta.page * meta.limit, meta.total)}
        </span>{" "}
        of <span className="font-medium text-dark">{meta.total}</span> entries
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(meta.page - 1)}
          disabled={!meta.hasPrevPage}
          className={clsx(
            "p-2 rounded-lg border border-border flex items-center justify-center transition-colors",
            !meta.hasPrevPage ? "opacity-50 cursor-not-allowed bg-light" : "hover:bg-light hover:text-primary bg-white text-dark"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(meta.page + 1)}
          disabled={!meta.hasNextPage}
          className={clsx(
            "p-2 rounded-lg border border-border flex items-center justify-center transition-colors",
            !meta.hasNextPage ? "opacity-50 cursor-not-allowed bg-light" : "hover:bg-light hover:text-primary bg-white text-dark"
          )}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
