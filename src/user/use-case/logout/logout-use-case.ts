import { IUserRepository } from "../../repository/user-repository";
import { IAuthService } from "../../service/auth-service";
import { LogoutDTO } from "./logout-dto";

export class LogoutUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService
  ) {}

  async execute(dto: LogoutDTO): Promise<void> {
    const { userId } = dto;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    await this.authService.logout(user.email);
  }
}
