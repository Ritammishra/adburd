import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { formatSuccessResponse, formatErrorResponse } from "@/utils/api";
import { portfolioSchema } from "@/validators/portfolio";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const portfolio = await Portfolio.findById(resolvedParams.id);
    
    if (!portfolio) {
      return formatErrorResponse("Portfolio not found", 404);
    }

    return formatSuccessResponse(portfolio, "Portfolio fetched successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to fetch portfolio");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const body = await req.json();

    // Validate
    const validationResult = portfolioSchema.safeParse(body);
    if (!validationResult.success) {
      return formatErrorResponse("Validation failed", 400, (validationResult.error as any).errors.map((e: any) => e.message).join(", "));
    }

    // Check slug uniqueness excluding current
    const existingPortfolio = await Portfolio.findOne({ 
      slug: validationResult.data.slug,
      _id: { $ne: resolvedParams.id }
    });
    
    if (existingPortfolio) {
      return formatErrorResponse("A portfolio with this slug already exists", 400);
    }

    const portfolio = await Portfolio.findByIdAndUpdate(
      resolvedParams.id,
      validationResult.data,
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return formatErrorResponse("Portfolio not found", 404);
    }

    return formatSuccessResponse(portfolio, "Portfolio updated successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to update portfolio");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const portfolio = await Portfolio.findByIdAndDelete(resolvedParams.id);

    if (!portfolio) {
      return formatErrorResponse("Portfolio not found", 404);
    }

    return formatSuccessResponse(null, "Portfolio deleted successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to delete portfolio");
  }
}
