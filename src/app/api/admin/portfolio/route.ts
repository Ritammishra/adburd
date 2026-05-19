import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { formatSuccessResponse, formatErrorResponse } from "@/utils/api";
import { getPaginationParams, generatePaginationMeta } from "@/utils/pagination";
import { portfolioSchema } from "@/validators/portfolio";

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
    
    const category = searchParams.get("category");
    if (category && category !== "all") {
      query.category = category;
    }

    const [portfolios, total] = await Promise.all([
      Portfolio.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content"), // Exclude large content field for listing
      Portfolio.countDocuments(query)
    ]);

    const meta = generatePaginationMeta(total, page, limit);

    return formatSuccessResponse(portfolios, "Portfolios fetched successfully", meta);
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to fetch portfolios");
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate
    const validationResult = portfolioSchema.safeParse(body);
    if (!validationResult.success) {
      return formatErrorResponse("Validation failed", 400, (validationResult.error as any).errors.map((e: any) => e.message).join(", "));
    }

    // Check slug uniqueness
    const existingPortfolio = await Portfolio.findOne({ slug: validationResult.data.slug });
    if (existingPortfolio) {
      return formatErrorResponse("A portfolio with this slug already exists", 400);
    }

    const portfolio = await Portfolio.create(validationResult.data);

    return formatSuccessResponse(portfolio, "Portfolio created successfully", null, 201);
  } catch (error) {
    return formatErrorResponse(error, 500, "Failed to create portfolio");
  }
}
