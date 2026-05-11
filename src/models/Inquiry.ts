import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const InquirySchema = new Schema(
  {
    productLookingFor: { type: String, default: "" },
    name: { type: String, default: "" },
    mobile: { type: String, default: "" },
    meta: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);

export type Inquiry = InferSchemaType<typeof InquirySchema>;

export const InquiryModel: Model<Inquiry> =
  (models.Inquiry as Model<Inquiry>) || model<Inquiry>("Inquiry", InquirySchema);

