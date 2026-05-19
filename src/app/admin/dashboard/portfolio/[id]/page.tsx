"use client";

import React, { useEffect, useState, use } from "react";
import { PortfolioForm } from "@/modules/portfolio/components/PortfolioForm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`/api/admin/portfolio/${resolvedParams.id}`);
        const json = await res.json();
        
        if (json.success) {
          // Transform technologies from array to comma-separated string for the form input
          const initialData = { ...json.data };
          if (Array.isArray(initialData.technologies)) {
            initialData.technologies = initialData.technologies.join(", ");
          }
          setData(initialData);
        } else {
          toast.error("Failed to load portfolio project");
        }
      } catch (error) {
        toast.error("Error loading portfolio project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) return null;

  return <PortfolioForm initialData={data} isEditing />;
}
