import "reflect-metadata";
import mongoose from "mongoose";
import { Container } from "inversify";

import { env } from "@/env";
import TYPES from "@/constants/types";
import User, { Role } from "@/models/user";
import { UserService } from "@/services/user";

beforeAll(async () => {
  mongoose.connect(env.DATABASE_URL, {
    dbName: "advanced_node-test",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("UserService Integration Tests", () => {
  let container: Container;
  let userService: UserService;

  beforeEach(() => {
    container = new Container();
    container.bind<UserService>(TYPES.UserService).to(UserService);

    userService = container.get<UserService>(TYPES.UserService);
  });

  it("should create a user", async () => {
    const newUser = {
      name: "Kevin",
      email: "kevin@example.com",
      role: Role.User,
    };

    // Call the service to create a new user
    const user = await userService.createUser(newUser);

    expect(user).toHaveProperty("_id");
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
    expect(user.role).toBe(newUser.role);
  });

  it("should get users", async () => {
    // Add a test user directly using the service
    const user1 = await userService.createUser({
      name: "Kevin",
      email: "kevin@example.com",
      role: Role.User,
    });

    const user2 = await userService.createUser({
      name: "Bob",
      email: "bob@example.com",
      role: Role.Admin,
    });

    // Get all users using the service
    const users = await userService.getUsers();

    expect(users).toHaveLength(2);
    expect(users).toContainEqual(expect.objectContaining({ _id: user1._id }));
    expect(users).toContainEqual(expect.objectContaining({ _id: user2._id }));
  });

  it("should update a user", async () => {
    const user = await userService.createUser({
      name: "Kevin",
      email: "levin@example.com",
      role: Role.User,
    });

    const updatedUser = await userService.updateUser(user.id, {
      name: "Kevin Updated",
    });

    expect(updatedUser).toHaveProperty("_id", user._id);
    expect(updatedUser.name).toBe("Kevin Updated");
  });

  it("should delete a user", async () => {
    const user = await userService.createUser({
      name: "Kevin",
      email: "kevin@example.com",
      role: Role.User,
    });

    const deletedUser = await userService.deleteUser(user.id);

    expect(deletedUser).toHaveProperty("_id", user._id);

    // Try to find the user in the database
    const foundUser = await userService.getUsers();
    expect(foundUser).not.toContainEqual(
      expect.objectContaining({ _id: user._id })
    );
  });
});
