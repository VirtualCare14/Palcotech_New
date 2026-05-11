import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const ClientLogoSchema = new Schema(
  {
    imageUrl: { type: String, default: "" },
    publicId: { type: String, default: "" },
    name: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ClientLogo = InferSchemaType<typeof ClientLogoSchema>;

export const ClientLogoModel: Model<ClientLogo> =
  (models.ClientLogo as Model<ClientLogo>) ||
  model<ClientLogo>("ClientLogo", ClientLogoSchema);

