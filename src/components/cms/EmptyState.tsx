import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-border rounded-xl bg-light">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 text-muted shadow-sm">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-medium text-dark mb-2">{title}</h3>
      {description && <p className="text-sm text-muted mb-6 max-w-sm mx-auto">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
