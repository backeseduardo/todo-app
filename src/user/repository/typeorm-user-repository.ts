import { Repository } from "typeorm";
import { TypeORMDataSource } from "../../shared/infra/database/typeorm/data-source";
import { UserEntity } from "../../shared/infra/database/typeorm/entity/user";
import { User } from "../domain/user";
import { IUserRepository } from "./user-repository";

export class TypeORMUserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = TypeORMDataSource.getRepository(UserEntity);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({
      email,
    });

    return user ?? undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOneBy({
      id,
    });

    return user ?? undefined;
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async save(user: User): Promise<User> {
    const savedUser = await this.repository.save(user);

    return savedUser;
  }
}
