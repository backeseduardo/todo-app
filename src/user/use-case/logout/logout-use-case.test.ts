import { MemoryUserRepository } from "../../repository/memory-user-repository";
import { MemoryAuthService } from "../../service/auth-service/memory-auth-service";
import { uuid } from "../../../shared/util/uuid";
import { LogoutUseCase } from "./logout-use-case";
import { User } from "../../domain/user";

const make = () => {
  const userRepository = new MemoryUserRepository();
  const authService = new MemoryAuthService(uuid);

  const logoutUseCase = new LogoutUseCase(userRepository, authService);

  return { logoutUseCase, userRepository, authService };
};

describe("LogoutUseCase", () => {
  it("should call authService logout method", async () => {
    const { logoutUseCase, userRepository, authService } = make();

    userRepository.users = {
      "user-1": {
        id: "user-1",
        name: "User One",
        email: "user.one@email.com",
      },
    };

    await authService.saveAuthenticatedUser({
      email: "user.one@email.com",
      refreshToken: "123",
      accessToken: "321",
    } as User);

    await logoutUseCase.execute({
      userId: "user-1",
    });

    const tokens = await authService.getTokens("user.one@email.com");

    expect(tokens[0]).toBeUndefined();
  });

  it("should throw error if user is not found", async () => {
    const { logoutUseCase } = make();

    await expect(
      logoutUseCase.execute({
        userId: "user-1",
      })
    ).rejects.toThrowError("User not found");
  });
});
