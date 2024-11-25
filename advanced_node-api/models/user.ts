import { Schema, Document, model } from "mongoose";

export enum Role {
  Admin = "admin",
  User = "user",
}

export interface IUser {
  name: string;
  email: string;
  role: Role;
}

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
      default: Role.User,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
