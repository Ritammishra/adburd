import { z } from "zod";

export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Object ID");

export const statusSchema = z.enum(["draft", "published", "archived"]);

export const slugSchema = z
  .string()
  .min(3, "Slug must be at least 3 characters")
  .max(100, "Slug cannot exceed 100 characters")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens");
