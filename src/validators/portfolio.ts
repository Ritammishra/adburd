import { z } from "zod";
import { slugSchema } from "./core";

export const portfolioSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(150, "Title is too long"),
  slug: slugSchema,
  shortDescription: z.string().min(10, "Short description is required").max(500, "Short description is too long"),
  content: z.string().optional(),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  gallery: z.array(z.string().url("Must be a valid URL").or(z.literal(''))).optional(),
  category: z.enum([
    "Website Development",
    "SEO",
    "PPC",
    "Branding",
    "Social Media",
  ]).optional().nullable(),
  industry: z.string().optional(),
  clientName: z.string().optional(),
  projectUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  technologies: z.array(z.string()).optional(),
  results: z.array(
    z.object({
      label: z.string().min(1, "Label is required"),
      value: z.string().min(1, "Value is required"),
    })
  ).optional(),
  featured: z.boolean().default(false),
  seoTitle: z.string().max(60, "SEO title should be under 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description should be under 160 characters").optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type PortfolioInput = z.input<typeof portfolioSchema>;
