import { z } from "zod";

export const seoSchema = z.object({
  metaTitle: z.string().max(60, "Meta title should be under 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description should be under 160 characters").optional(),
  metaKeywords: z.string().optional(), // Comma separated
  ogImage: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

export type SEOInput = z.infer<typeof seoSchema>;
