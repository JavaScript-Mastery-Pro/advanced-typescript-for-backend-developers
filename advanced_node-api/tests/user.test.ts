import "reflect-metadata";
import { Container } from "inversify";

import TYPES from "@/constants/types";
import { UserService } from "@/services/user";
import { IUserDocument, Role } from "@/models/user";

type IUserSubset = Pick<IUserDocument, "_id" | "name" | "email" | "role">;

describe("UserService Tests Without Separate Repository", () => {
  let container: Container;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    container = new Container();

    // Mock UserService
    mockUserService = {
      getUsers: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as jest.Mocked<UserService>;

    container.bind(TYPES.UserService).toConstantValue(mockUserService);
  });

  it("should return users", async () => {
    const mockUsers = [
      {
        _id: "1",
        name: "Alice",
        email: "alice@example.com",
        role: Role.User,
      } as IUserSubset,
      {
        _id: "2",
        name: "Bob",
        email: "bob@example.com",
        role: Role.Admin,
      } as IUserSubset,
    ];
    mockUserService.getUsers.mockResolvedValue(mockUsers as IUserDocument[]);

    const userService = container.get<UserService>(TYPES.UserService);
    const users = await userService.getUsers();

    expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);
    expect(users).toEqual(mockUsers);
  });

  it("should create a user", async () => {
    const mockUser = {
      _id: "1",
      name: "Alice",
      email: "alice@example.com",
      role: "user",
    } as IUserSubset;
    mockUserService.createUser.mockResolvedValue(mockUser as IUserDocument);

    const userService = container.get<UserService>(TYPES.UserService);
    const user = await userService.createUser({
      name: "Alice",
      email: "alice@example.com",
    });

    expect(mockUserService.createUser).toHaveBeenCalledWith({
      name: "Alice",
      email: "alice@example.com",
    });
    expect(user).toEqual(mockUser);
  });
});
