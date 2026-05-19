import mongoose, { Schema } from "mongoose";

const PortfolioSchema = new Schema(
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

    featuredImage: {
      type: String,
    },

    gallery: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      enum: [
        "Website Development",
        "SEO",
        "PPC",
        "Branding",
        "Social Media",
      ],
    },

    industry: {
      type: String,
    },

    clientName: {
      type: String,
    },

    projectUrl: {
      type: String,
    },

    technologies: [
      {
        type: String,
      },
    ],

    results: [
      {
        label: String,
        value: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

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

export default mongoose.models.Portfolio ||
  mongoose.model("Portfolio", PortfolioSchema);