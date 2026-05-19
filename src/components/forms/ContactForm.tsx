"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/validators/lead";
import { toast } from "sonner";
import clsx from "clsx";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/forms/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to send message");
      }

      toast.success("Message sent successfully! We'll be in touch soon.");
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
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
        <h3 className="text-2xl font-bold text-dark mb-4">Message Sent!</h3>
        <p className="text-muted mb-8">Thank you for reaching out. One of our strategists will get back to you within 24 hours.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-primary font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-dark">First Name</label>
          <input 
            type="text" 
            {...register("firstName")}
            className={clsx(
              "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none",
              errors.firstName ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
            )} 
            placeholder="John" 
          />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-dark">Last Name</label>
          <input 
            type="text" 
            {...register("lastName")}
            className={clsx(
              "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none",
              errors.lastName ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
            )} 
            placeholder="Doe" 
          />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-dark">Work Email</label>
        <input 
          type="email" 
          {...register("email")}
          className={clsx(
            "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none",
            errors.email ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
          )} 
          placeholder="john@company.com" 
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-dark">Message</label>
        <textarea 
          rows={5} 
          {...register("message")}
          className={clsx(
            "w-full bg-light border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none",
            errors.message ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
          )} 
          placeholder="How can we help you grow?"
        ></textarea>
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
