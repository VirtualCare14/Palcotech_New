import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const HomeContentSchema = new Schema(
  {
    key: { type: String, default: "home", unique: true, index: true },

    // Keep sections flexible: admin can save partial data; UI can fall back/hide.
    hero: { type: Schema.Types.Mixed, default: null },
    whyChooseUs: { type: Schema.Types.Mixed, default: null },
    stats: { type: Schema.Types.Mixed, default: null },
    hotProducts: { type: Schema.Types.Mixed, default: null },
    featuredProducts: { type: Schema.Types.Mixed, default: null },
    overview: { type: Schema.Types.Mixed, default: null },
    clientLogos: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);

export type HomeContent = InferSchemaType<typeof HomeContentSchema>;

export const HomeContentModel: Model<HomeContent> =
  (models.HomeContent as Model<HomeContent>) ||
  model<HomeContent>("HomeContent", HomeContentSchema);

