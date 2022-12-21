import { IPassword } from "../../../shared/util/password/password";
import { IUUID } from "../../../shared/util/uuid/uuid";
import { User, UserResponse } from "../../domain/user";
import { IUserRepository } from "../../repository/user-repository";
import { RegisterUserDTO } from "./register-user-dto";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly uuid: IUUID,
    private readonly password: IPassword
  ) {}

  async execute(dto: RegisterUserDTO): Promise<UserResponse> {
    const { name, email, password } = dto;

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const encryptedPassword = await this.password.hash(password, 10);

    const user: User = {
      id: this.uuid.generate(),
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
