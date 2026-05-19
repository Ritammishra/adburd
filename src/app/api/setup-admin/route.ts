import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    await connectDB();

    // Check if any users already exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json({ message: "Admin user already exists. Setup cannot run twice." }, { status: 400 });
    }

    // Get email and password from query parameters, or use defaults
    const url = new URL(request.url);
    const email = url.searchParams.get("email") || "admin@adburd.com";
    const password = url.searchParams.get("password") || "password123";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create super_admin
    const newAdmin = await User.create({
      name: "Super Admin",
      email: email,
      password: hashedPassword,
      role: "super_admin",
    });

    return NextResponse.json({
      message: "Admin user successfully created!",
      email: newAdmin.email,
      password: "The password you provided (or 'password123')",
      next_steps: "Go to /admin/login and use these credentials to log in.",
    });
  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ error: "Failed to setup admin user" }, { status: 500 });
  }
}
