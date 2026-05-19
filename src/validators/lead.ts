import { z } from "zod";

// Shared Enums
export const LeadStatusEnum = z.enum(["new", "contacted", "qualified", "proposal_sent", "converted", "lost"]);
export const LeadPriorityEnum = z.enum(["low", "medium", "high"]);
export const LeadSourceEnum = z.enum(["contact_form", "audit_form", "manual", "other"]);

// Schema for Public Contact Form
export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

// Schema for Public Audit Form
export const auditFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().url("Please enter a valid website URL"),
  budget: z.string().min(1, "Please select a budget"),
});

// Schema for Internal Lead Creation/Editing
export const leadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")).nullable(),
  country: z.string().optional().nullable(),
  businessType: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  servicesInterested: z.array(z.string()).optional(),
  message: z.string().optional().nullable(),
  status: LeadStatusEnum.default("new"),
  priority: LeadPriorityEnum.default("medium"),
  source: LeadSourceEnum.default("manual"),
  assignedTo: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID").optional().nullable(),
});

// Schema for Lead Notes
export const leadNoteSchema = z.object({
  content: z.string().min(1, "Note content cannot be empty"),
});

// TypeScript Types
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AuditFormData = z.infer<typeof auditFormSchema>;
export type LeadData = z.input<typeof leadSchema>;
export type LeadNoteData = z.infer<typeof leadNoteSchema>;
