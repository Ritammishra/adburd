import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import LeadNote from "@/models/LeadNote";
import LeadActivity from "@/models/LeadActivity";
import { leadNoteSchema } from "@/validators/lead";
import { z } from "zod";

export async function POST(
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

    const validatedData = leadNoteSchema.parse(body);

    const authorName = session.user?.name || "Admin";

    const note = await LeadNote.create({
      lead: id,
      content: validatedData.content,
      author: authorName,
    });

    await LeadActivity.create({
      lead: id,
      type: "note_added",
      description: `New note added by ${authorName}`,
    });

    return NextResponse.json(
      { success: true, data: note, message: "Note added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(`POST /api/admin/leads/[id]/notes error:`, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: (error as any).errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to add note" },
      { status: 500 }
    );
  }
}
