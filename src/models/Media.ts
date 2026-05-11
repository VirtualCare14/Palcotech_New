import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const MediaSchema = new Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    folder: { type: String, default: "" },
    alt: { type: String, default: "" },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    bytes: { type: Number, default: 0 },
    format: { type: String, default: "" },
  },
  { timestamps: true },
);

export type Media = InferSchemaType<typeof MediaSchema>;

export const MediaModel: Model<Media> =
  (models.Media as Model<Media>) || model<Media>("Media", MediaSchema);

