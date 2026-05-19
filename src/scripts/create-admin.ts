import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
throw new Error("MONGODB_URI is missing in .env.local");
}

const UserSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
},

email: {
  type: String,
  required: true,
  unique: true,
},

password: {
  type: String,
  required: true,
},

role: {
  type: String,
  default: "super_admin",
},


  },
  {
    timestamps: true,
  }
);

const User =
mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdmin() {
try {
console.log("Connecting to MongoDB...");

await mongoose.connect(MONGODB_URI!);

console.log("MongoDB connected successfully");

const existingUser = await User.findOne({
  email: "admin@adburd.com",
});

if (existingUser) {
  console.log("Admin already exists");
  process.exit(0);
}

const hashedPassword = await bcrypt.hash("Admin@123", 10);

const admin = await User.create({
  name: "Adburd Admin",
  email: "admin@adburd.com",
  password: hashedPassword,
  role: "super_admin",
});

console.log("Admin created successfully");
console.log(admin);

process.exit(0);

} catch (error) {
console.error("Error creating admin:");
console.error(error);

process.exit(1);

}
}

createAdmin();
