"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, LeadData } from "@/validators/lead";
import { FormInput } from "@/components/cms/FormInput";
import { Drawer } from "@/components/cms/Drawer";
import { toast } from "sonner";
import clsx from "clsx";

interface LeadDrawerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LeadDrawerForm({ isOpen, onClose, onSuccess }: LeadDrawerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      status: "new",
      priority: "medium",
      source: "manual"
    }
  });

  const onSubmit = async (data: LeadData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to create lead");
      }

      toast.success("Lead created successfully");
      reset();
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Create Manual Lead" width="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormInput 
            label="First Name" 
            {...register("firstName")} 
            error={errors.firstName?.message} 
            required 
          />
          <FormInput 
            label="Last Name" 
            {...register("lastName")} 
            error={errors.lastName?.message} 
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput 
            label="Email" 
            type="email" 
            {...register("email")} 
            error={errors.email?.message} 
            required 
          />
          <FormInput 
            label="Phone" 
            {...register("phone")} 
            error={errors.phone?.message} 
          />
        </div>

        <FormInput 
          label="Company" 
          {...register("company")} 
          error={errors.company?.message} 
        />

        <FormInput 
          label="Website URL" 
          type="url" 
          {...register("website")} 
          error={errors.website?.message} 
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-dark">Priority</label>
            <select 
              {...register("priority")}
              className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-dark">Status</label>
            <select 
              {...register("status")}
              className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
            </select>
            {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-dark">Internal Message / Notes</label>
          <textarea 
            {...register("message")}
            rows={4}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
            placeholder="Add initial notes here..."
          ></textarea>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-muted hover:text-dark hover:bg-light transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-70 text-white font-medium rounded-xl transition-all shadow-sm"
          >
            {isSubmitting ? "Creating..." : "Create Lead"}
          </button>
        </div>
      </form>
    </Drawer>
  );
}
