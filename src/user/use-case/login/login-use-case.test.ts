import { IPassword } from "../../../shared/util/password/password";
import { MemoryUserRepository } from "../../repository/memory-user-repository";
import { MemoryAuthService } from "../../service/auth-service/memory-auth-service";
import { uuid } from "../../../shared/util/uuid";
import { LoginUseCase } from "./login-use-case";

const make = () => {
  const userRepository = new MemoryUserRepository();
  const mockPassword: IPassword = {
    hash(_password, _saltOrRounds) {
      return Promise.resolve("");
    },

    compare(data, encrypted) {
      return Promise.resolve(data === encrypted);
    },
  };

  const authService = new MemoryAuthService(uuid);

  userRepository.users["user-1"] = {
    id: "user-1",
    name: "User One",
    email: "userone@gmail.com",
    password: "123",
  };

  const loginUseCase = new LoginUseCase(
    userRepository,
    mockPassword,
    authService
  );

  return { loginUseCase, authService };
};

describe("LoginUseCase", () => {
  it("should throw error when user is not found", async () => {
    const { loginUseCase } = make();

    await expect(
      loginUseCase.execute({
        email: "unknown@gmail.com",
        password: "123",
      })
    ).rejects.toThrow("Invalid credentials");
  });

  it("should throw error when password is invalid", async () => {
    const { loginUseCase } = make();

    await expect(
      loginUseCase.execute({
        email: "userone@gmail.com",
        password: "invalid",
      })
    ).rejects.toThrow("Invalid credentials");
  });

  it("should save user authentication", async () => {
    const { loginUseCase, authService } = make();

    await loginUseCase.execute({
      email: "userone@gmail.com",
      password: "123",
    });

    const tokens = await authService.getTokens("userone@gmail.com");

    expect(tokens.length).toBe(1);
  });
});
