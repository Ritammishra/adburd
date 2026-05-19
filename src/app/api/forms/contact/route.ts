import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";
import LeadActivity from "@/models/LeadActivity";
import { contactFormSchema } from "@/validators/lead";
import { z } from "zod";

// Basic rate limiting could be added here in a production environment
// For now, we'll keep it simple

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const validatedData = contactFormSchema.parse(body);

    const lead = await Lead.create({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      message: validatedData.message,
      source: "contact_form",
      status: "new",
      priority: "medium", // Default
    });

    await LeadActivity.create({
      lead: lead._id,
      type: "created",
      description: "Lead captured via Contact Form",
    });

    // Here you would typically trigger an email notification to the team

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/forms/contact error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: (error as any).errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
