import { IPassword } from "../../../shared/util/password/password";
import { IUserRepository } from "../../repository/user-repository";
import { IAuthService } from "../../service/auth-service";
import { LoginDTO, LoginResponse } from "./login-dto";

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly password: IPassword,
    private readonly authService: IAuthService
  ) {}

  async execute(dto: LoginDTO): Promise<LoginResponse> {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await this.password.compare(password, user.password!);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = this.authService.signJWT({
      id: user.id,
      email,
    });

    const refreshToken = this.authService.createRefreshToken();

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();

    await this.authService.saveAuthenticatedUser(user);
    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
