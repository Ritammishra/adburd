import React from "react";
import clsx from "clsx";

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function AdminCard({ children, className, noPadding = false }: AdminCardProps) {
  return (
    <div
      className={clsx(
        "bg-white border border-border rounded-xl shadow-sm overflow-hidden",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
