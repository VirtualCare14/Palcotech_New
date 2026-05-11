import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const SocialLinkSchema = new Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" },
    icon: { type: String, default: "" }, // e.g. "facebook", "instagram"
  },
  { _id: false },
);

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, default: "global", unique: true, index: true },

    companyName: { type: String, default: "Palcotech Engineering" },
    logoUrl: { type: String, default: "" },

    phones: { type: [String], default: [] },
    whatsappNumber: { type: String, default: "" },
    whatsappMessage: {
      type: String,
      default: "Hi, I have enquiry related to your product",
    },

    email: { type: String, default: "" },
    address: { type: String, default: "" },
    googleMapsEmbedUrl: { type: String, default: "" },
    gstNumber: { type: String, default: "07ADWPG3732C1ZM" },
    workingHours: { type: String, default: "" },

    socialLinks: { type: [SocialLinkSchema], default: [] },

    // Theme Variables
    primaryColor: { type: String, default: "#0f172a" },
    accentColor: { type: String, default: "#f59e0b" },
    heroOverlayColor: { type: String, default: "#000000" },
    heroOverlayOpacity: { type: Number, default: 0.5 },
  },
  { timestamps: true },
);

export type SiteSettings = InferSchemaType<typeof SiteSettingsSchema>;

export const SiteSettingsModel: Model<SiteSettings> =
  (models.SiteSettings as Model<SiteSettings>) ||
  model<SiteSettings>("SiteSettings", SiteSettingsSchema);
