import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const AboutContentSchema = new Schema(
  {
    key: { type: String, default: "about", unique: true, index: true },
    banner: { type: Schema.Types.Mixed, default: null },
    intro: { type: Schema.Types.Mixed, default: null },
    missionVision: { type: Schema.Types.Mixed, default: null },
    body: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);

export type AboutContent = InferSchemaType<typeof AboutContentSchema>;

export const AboutContentModel: Model<AboutContent> =
  (models.AboutContent as Model<AboutContent>) ||
  model<AboutContent>("AboutContent", AboutContentSchema);

