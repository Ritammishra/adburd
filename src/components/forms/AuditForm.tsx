"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditFormSchema, AuditFormData } from "@/validators/lead";
import { toast } from "sonner";
import clsx from "clsx";

export default function AuditForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
  });

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to submit request");
      }

      toast.success("Audit request received! We'll review your site and reach out.");
      setIsSuccess(true);
      reset();
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border text-center py-16">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
        <h3 className="text-2xl font-bold text-dark mb-4">Request Received!</h3>
        <p className="text-muted mb-0">Our team is reviewing your website and will contact you at the email provided to schedule your free audit presentation.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border">
      <h3 className="text-2xl font-bold text-dark mb-6">Request Your Audit</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-dark">First Name</label>
            <input 
              type="text" 
              {...register("firstName")}
              className={clsx(
                "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.firstName ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
              )} 
              placeholder="John" 
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-dark">Last Name</label>
            <input 
              type="text" 
              {...register("lastName")}
              className={clsx(
                "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.lastName ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
              )} 
              placeholder="Doe" 
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Work Email</label>
          <input 
            type="email" 
            {...register("email")}
            className={clsx(
              "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
              errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
            )} 
            placeholder="john@company.com" 
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Website URL</label>
          <input 
            type="text" 
            {...register("website")}
            className={clsx(
              "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
              errors.website ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
            )} 
            placeholder="https://yourcompany.com" 
          />
          {errors.website && <p className="text-xs text-red-500">{errors.website.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-dark">Monthly Marketing Budget</label>
          <select 
            {...register("budget")}
            className={clsx(
              "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none",
              errors.budget ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
            )}
          >
            <option value="">Select a budget...</option>
            <option value="Less than $1,000">Less than $1,000</option>
            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000+">$10,000+</option>
          </select>
          {errors.budget && <p className="text-xs text-red-500">{errors.budget.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-dark hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4"
        >
          {isSubmitting ? "Submitting..." : "Get My Free Audit"}
        </button>
        <p className="text-xs text-muted text-center mt-4">
          By submitting this form, you agree to our Privacy Policy.
        </p>
      </form>
    </div>
  );
}
