import { IPassword } from "../../../shared/util/password/password";
import { IUUID } from "../../../shared/util/uuid/uuid";
import { MemoryUserRepository } from "../../repository/memory-user-repository";
import { RegisterUserUseCase } from "./register-user-use-case";

const mockPassword: IPassword = {
  hash: (password, _saltOrRounds) => {
    return Promise.resolve(password.split("").reverse().join(""));
  },

  compare: (_str, _hash) => {
    throw new Error("Function not implemented.");
  },
};

const mockUUID: IUUID = {
  generate: () => "user-1",
};

const make = () => {
  const userRepository = new MemoryUserRepository();

  const registerUserUseCase = new RegisterUserUseCase(
    userRepository,
    mockUUID,
    mockPassword
  );

  return { registerUserUseCase, userRepository };
};

describe("RegisterUserUseCase", () => {
  it("should register a new user", async () => {
    const { registerUserUseCase, userRepository } = make();

    await registerUserUseCase.execute({
      name: "User One",
      email: "userone@gmail.com",
      password: "123",
    });

    const user = userRepository.users["user-1"];

    expect(user.email).toBe("userone@gmail.com");
    expect(user.password).toBe("321");
  });

  it("should throw error if user exists", async () => {
    const { registerUserUseCase, userRepository } = make();
    userRepository.users["user-1"] = {
      id: "user-1",
      name: "user one",
      email: "userone@gmail.com",
    };

    await expect(
      registerUserUseCase.execute({
        name: "User One",
        email: "userone@gmail.com",
        password: "123",
      })
    ).rejects.toThrow("User already exists");
  });
});
