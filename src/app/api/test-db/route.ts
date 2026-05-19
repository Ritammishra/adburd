import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function GET() {
  try {
    console.log("Testing MongoDB connection...");

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("MongoDB Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "MongoDB connection failed",
      },
      {
        status: 500,
      }
    );
  }
}