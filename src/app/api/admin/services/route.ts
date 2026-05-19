import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { formatSuccessResponse, formatErrorResponse } from "@/utils/api";
import { getPaginationParams, generatePaginationMeta } from "@/utils/pagination";
import { serviceSchema } from "@/validators/service";

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
        { shortDescription: { $regex: search, $options: "i" } }
      ];
    }
    
    const status = searchParams.get("status");
    if (status && status !== "all") {
      query.status = status;
    }

    const [services, total] = await Promise.all([
      Service.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content"), // Exclude large content field for listing
      Service.countDocuments(query)
    ]);

    const meta = generatePaginationMeta(total, page, limit);

    return formatSuccessResponse(services, "Services fetched successfully", meta);
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to fetch services");
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate
    const validationResult = serviceSchema.safeParse(body);
    if (!validationResult.success) {
      return formatErrorResponse("Validation failed", 400, (validationResult.error as any).errors.map((e: any) => e.message).join(", "));
    }

    // Check slug uniqueness
    const existingService = await Service.findOne({ slug: validationResult.data.slug });
    if (existingService) {
      return formatErrorResponse("A service with this slug already exists", 400);
    }

    const service = await Service.create(validationResult.data);

    return formatSuccessResponse(service, "Service created successfully", null, 201);
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to create service");
  }
}
