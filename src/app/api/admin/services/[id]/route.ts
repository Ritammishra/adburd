import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { formatSuccessResponse, formatErrorResponse } from "@/utils/api";
import { serviceSchema } from "@/validators/service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const service = await Service.findById(resolvedParams.id);
    
    if (!service) {
      return formatErrorResponse("Service not found", 404);
    }

    return formatSuccessResponse(service, "Service fetched successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to fetch service");
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
    const validationResult = serviceSchema.safeParse(body);
    if (!validationResult.success) {
      return formatErrorResponse("Validation failed", 400, (validationResult.error as any).errors.map((e: any) => e.message).join(", "));
    }

    // Check slug uniqueness excluding current
    const existingService = await Service.findOne({ 
      slug: validationResult.data.slug,
      _id: { $ne: resolvedParams.id }
    });
    
    if (existingService) {
      return formatErrorResponse("A service with this slug already exists", 400);
    }

    const service = await Service.findByIdAndUpdate(
      resolvedParams.id,
      validationResult.data,
      { new: true, runValidators: true }
    );

    if (!service) {
      return formatErrorResponse("Service not found", 404);
    }

    return formatSuccessResponse(service, "Service updated successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to update service");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const service = await Service.findByIdAndDelete(resolvedParams.id);

    if (!service) {
      return formatErrorResponse("Service not found", 404);
    }

    return formatSuccessResponse(null, "Service deleted successfully");
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to delete service");
  }
}
