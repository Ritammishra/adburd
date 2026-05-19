import mongoose, { Schema, Document } from "mongoose";

export interface ILeadNote extends Document {
  lead: mongoose.Types.ObjectId;
  content: string;
  author: string; // Could be an ObjectId ref, but string is easier for "System" or Admin name
  createdAt: Date;
  updatedAt: Date;
}

const LeadNoteSchema = new Schema<ILeadNote>(
  {
    lead: { type: Schema.Types.ObjectId, ref: "Lead", required: true, index: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const LeadNote = mongoose.models.LeadNote || mongoose.model<ILeadNote>("LeadNote", LeadNoteSchema);

export default LeadNote;
