import mongoose, { Schema, Document } from "mongoose";

export interface ILeadActivity extends Document {
  lead: mongoose.Types.ObjectId;
  type: "created" | "status_changed" | "note_added" | "updated" | "assigned";
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadActivitySchema = new Schema<ILeadActivity>(
  {
    lead: { type: Schema.Types.ObjectId, ref: "Lead", required: true, index: true },
    type: { 
      type: String, 
      enum: ["created", "status_changed", "note_added", "updated", "assigned"], 
      required: true 
    },
    description: { type: String, required: true },
  },
  { timestamps: true } // Technically only needs createdAt, but timestamps gives both
);

const LeadActivity = mongoose.models.LeadActivity || mongoose.model<ILeadActivity>("LeadActivity", LeadActivitySchema);

export default LeadActivity;
