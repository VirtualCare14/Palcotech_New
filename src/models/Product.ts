import {
  Schema,
  model,
  models,
  type Model,
  type InferSchemaType,
  type Types,
} from "mongoose";
import { slugify } from "@/lib/slug";

const ProductImageSchema = new Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false },
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },

    images: { type: [ProductImageSchema], default: [] },
    shortDetails: { type: String, default: "" },

    // Optional spec fields (per requirements)
    weight: { type: String, default: "" },
    ratedPower: { type: String, default: "" },
    color: { type: String, default: "" },
    drivenType: { type: String, default: "" },
    warranty: { type: String, default: "" },
    businessType: { type: String, default: "" },
    type: { type: String, default: "" },
    certification: { type: String, default: "" },
    application: { type: String, default: "" },

    category: { type: Schema.Types.ObjectId, ref: "Category", default: null },

    // Rich text content (store both HTML and JSON to stay editor-agnostic)
    descriptionHtml: { type: String, default: "" },
    descriptionJson: { type: Schema.Types.Mixed, default: null },

    // Homepage selection helpers
    isHot: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

ProductSchema.pre("validate", function () {
  if (!this.slug && this.name) this.slug = slugify(this.name);
});

export type Product = InferSchemaType<typeof ProductSchema> & {
  category: Types.ObjectId | null;
};

export const ProductModel: Model<Product> =
  (models.Product as Model<Product>) || model<Product>("Product", ProductSchema);
