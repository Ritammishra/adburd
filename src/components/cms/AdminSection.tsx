import React from "react";
import clsx from "clsx";

interface AdminSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function AdminSection({ title, description, children, className }: AdminSectionProps) {
  return (
    <section className={clsx("mb-8", className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-lg font-semibold text-dark">{title}</h2>}
          {description && <p className="text-sm text-muted mt-1">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
