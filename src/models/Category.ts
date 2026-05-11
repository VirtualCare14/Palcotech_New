import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
} from "mongoose";
import { slugify } from "@/lib/slug";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

CategorySchema.pre("validate", function () {
  if (!this.slug && this.name) this.slug = slugify(this.name);
});

export type Category = InferSchemaType<typeof CategorySchema>;

export const CategoryModel: Model<Category> =
  (models.Category as Model<Category>) || model<Category>("Category", CategorySchema);
