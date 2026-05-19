import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    iconName: {
      type: String,
      default: "Star",
    },
    featuredImage: {
      type: String,
    },
    features: [
      {
        type: String,
      },
    ],
    seoTitle: String,
    metaDescription: String,
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
