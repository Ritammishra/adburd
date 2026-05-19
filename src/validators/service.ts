import { z } from "zod";
import { slugSchema } from "./core";

export const serviceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(150, "Title is too long"),
  slug: slugSchema,
  shortDescription: z.string().min(10, "Short description is required").max(300, "Short description is too long"),
  content: z.string().optional(),
  iconName: z.string().optional(),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  features: z.array(z.string().min(1, "Feature cannot be empty")).optional(),
  seoTitle: z.string().max(60, "SEO title should be under 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description should be under 160 characters").optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type ServiceInput = z.input<typeof serviceSchema>;
