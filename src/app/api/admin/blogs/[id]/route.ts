import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { formatSuccessResponse, formatErrorResponse } from "@/utils/api";
import { blogSchema } from "@/validators/blog";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return formatErrorResponse("Blog not found", 404);
    }

    return formatSuccessResponse(blog, "Blog fetched successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to fetch blog");
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // Validate
    const validationResult = blogSchema.safeParse(body);
    if (!validationResult.success) {
      return formatErrorResponse("Validation failed", 400, (validationResult.error as any).errors.map((e: any) => e.message).join(", "));
    }

    // Check slug uniqueness (excluding current blog)
    const existingBlog = await Blog.findOne({ 
      slug: validationResult.data.slug,
      _id: { $ne: id } 
    });
    
    if (existingBlog) {
      return formatErrorResponse("A blog with this slug already exists", 400);
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: validationResult.data },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return formatErrorResponse("Blog not found", 404);
    }

    return formatSuccessResponse(blog, "Blog updated successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to update blog");
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return formatErrorResponse("Blog not found", 404);
    }

    return formatSuccessResponse(null, "Blog deleted successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to delete blog");
  }
}
