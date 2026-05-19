import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";
import LeadActivity from "@/models/LeadActivity";
import { auditFormSchema } from "@/validators/lead";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const validatedData = auditFormSchema.parse(body);

    const lead = await Lead.create({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      website: validatedData.website,
      budget: validatedData.budget,
      source: "audit_form",
      status: "new",
      priority: "high", // Audit requests indicate high intent
    });

    await LeadActivity.create({
      lead: lead._id,
      type: "created",
      description: "Lead captured via Free Marketing Audit Form",
    });

    return NextResponse.json(
      { success: true, message: "Audit request sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/forms/audit error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: (error as any).errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to send audit request" },
      { status: 500 }
    );
  }
}
