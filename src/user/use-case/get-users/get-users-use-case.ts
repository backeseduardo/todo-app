import { UserResponse } from "../../domain/user";
import { IUserRepository } from "../../repository/user-repository";

export class GetUsersUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(): Promise<UserResponse[]> {
    const users = await this.repository.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
}
