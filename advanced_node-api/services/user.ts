import { injectable } from "inversify";
import User, { IUser, IUserDocument } from "@/models/user";

@injectable()
export class UserService {
  public async getUsers(): Promise<IUserDocument[]> {
    return User.find();
  }

  public async createUser(userData: Partial<IUser>): Promise<IUserDocument> {
    return User.create(userData);
  }

  public async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true });
  }

  public async deleteUser(id: string): Promise<IUserDocument | null> {
    return User.findByIdAndDelete(id);
  }
}
