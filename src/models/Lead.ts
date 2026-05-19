import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  country?: string;
  businessType?: string;
  budget?: string;
  servicesInterested?: string[];
  message?: string;
  status: "new" | "contacted" | "qualified" | "proposal_sent" | "converted" | "lost";
  priority: "low" | "medium" | "high";
  source: "contact_form" | "audit_form" | "manual" | "other";
  assignedTo?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String },
    company: { type: String },
    website: { type: String },
    country: { type: String },
    businessType: { type: String },
    budget: { type: String },
    servicesInterested: [{ type: String }],
    message: { type: String },
    status: { 
      type: String, 
      enum: ["new", "contacted", "qualified", "proposal_sent", "converted", "lost"], 
      default: "new",
      index: true
    },
    priority: { 
      type: String, 
      enum: ["low", "medium", "high"], 
      default: "medium",
      index: true
    },
    source: { 
      type: String, 
      enum: ["contact_form", "audit_form", "manual", "other"], 
      default: "manual" 
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Prevent mongoose overwrite model error in dev mode
const Lead = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
