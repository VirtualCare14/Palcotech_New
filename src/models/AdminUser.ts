import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true },
);

export type AdminUser = InferSchemaType<typeof AdminUserSchema>;

export const AdminUserModel: Model<AdminUser> =
  (models.AdminUser as Model<AdminUser>) || model<AdminUser>("AdminUser", AdminUserSchema);

