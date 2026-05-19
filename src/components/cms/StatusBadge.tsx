import React from "react";
import clsx from "clsx";

interface StatusBadgeProps {
  status: "draft" | "published" | "archived" | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isDraft = status === "draft";
  const isPublished = status === "published";
  const isArchived = status === "archived";

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
        isPublished && "bg-green-100 text-green-800",
        isDraft && "bg-yellow-100 text-yellow-800",
        isArchived && "bg-gray-100 text-gray-800",
        !isPublished && !isDraft && !isArchived && "bg-blue-100 text-blue-800"
      )}
    >
      {status}
    </span>
  );
}
