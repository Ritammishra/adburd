import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";
import LeadNote from "@/models/LeadNote";
import LeadActivity from "@/models/LeadActivity";
import { leadSchema } from "@/validators/lead";
import { z } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const lead = await Lead.findById(id).lean();

    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    // Fetch notes and activities concurrently
    const [notes, activities] = await Promise.all([
      LeadNote.find({ lead: id }).sort({ createdAt: -1 }).lean(),
      LeadActivity.find({ lead: id }).sort({ createdAt: -1 }).lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...lead,
        notes,
        activities,
      },
      message: "Lead fetched successfully",
    });
  } catch (error) {
    console.error(`GET /api/admin/leads/[id] error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const body = await req.json();

    const validatedData = leadSchema.partial().parse(body);

    const oldLead = await Lead.findById(id);
    if (!oldLead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { new: true, runValidators: true }
    ).lean();

    // Log specific activities
    if (validatedData.status && validatedData.status !== oldLead.status) {
      await LeadActivity.create({
        lead: id,
        type: "status_changed",
        description: `Status changed from ${oldLead.status} to ${validatedData.status} by ${session.user?.name || "Admin"}`,
      });
    } else if (Object.keys(validatedData).length > 0) {
       await LeadActivity.create({
        lead: id,
        type: "updated",
        description: `Lead details updated by ${session.user?.name || "Admin"}`,
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedLead,
      message: "Lead updated successfully",
    });
  } catch (error) {
    console.error(`PUT /api/admin/leads/[id] error:`, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: (error as any).errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update lead" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    // Cleanup related documents
    await Promise.all([
      LeadNote.deleteMany({ lead: id }),
      LeadActivity.deleteMany({ lead: id }),
    ]);

    return NextResponse.json({
      success: true,
      data: null,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error(`DELETE /api/admin/leads/[id] error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
