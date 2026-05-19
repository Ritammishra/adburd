"use client";

import React, { useEffect, useState, use } from "react";
import { ServiceForm } from "@/modules/services/components/ServiceForm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/admin/services/${resolvedParams.id}`);
        const json = await res.json();
        
        if (json.success) {
          setData(json.data);
        } else {
          toast.error("Failed to load service");
        }
      } catch (error) {
        toast.error("Error loading service");
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) return null;

  return <ServiceForm initialData={data} isEditing />;
}
