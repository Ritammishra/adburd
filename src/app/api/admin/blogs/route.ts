import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { formatSuccessResponse, formatErrorResponse } from "@/utils/api";
import { getPaginationParams, generatePaginationMeta } from "@/utils/pagination";
import { blogSchema } from "@/validators/blog";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const { page, limit, skip } = getPaginationParams(searchParams);
    
    // Search & Filter
    const query: any = {};
    const search = searchParams.get("search");
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }
    
    const status = searchParams.get("status");
    if (status && status !== "all") {
      query.status = status;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content"), // Exclude large content field for listing
      Blog.countDocuments(query)
    ]);

    const meta = generatePaginationMeta(total, page, limit);

    return formatSuccessResponse(blogs, "Blogs fetched successfully", meta);
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to fetch blogs");
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate
    const validationResult = blogSchema.safeParse(body);
    if (!validationResult.success) {
      return formatErrorResponse("Validation failed", 400, (validationResult.error as any).errors.map((e: any) => e.message).join(", "));
    }

    // Check slug uniqueness
    const existingBlog = await Blog.findOne({ slug: validationResult.data.slug });
    if (existingBlog) {
      return formatErrorResponse("A blog with this slug already exists", 400);
    }

    const blog = await Blog.create(validationResult.data);

    return formatSuccessResponse(blog, "Blog created successfully", null, 201);
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to create blog");
  }
}
