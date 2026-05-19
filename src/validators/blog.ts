import { z } from "zod";
import { seoSchema } from "./seo";
import { statusSchema, slugSchema, objectIdSchema } from "./core";

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150, "Title is too long"),
  slug: slugSchema,
  content: z.string().min(20, "Content must be at least 20 characters"),
  excerpt: z.string().max(300, "Excerpt must be under 300 characters").optional(),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  status: statusSchema.default("draft"),
  categories: z.array(objectIdSchema).optional(),
  seo: seoSchema.optional(),
});

export type BlogInput = z.input<typeof blogSchema>;
