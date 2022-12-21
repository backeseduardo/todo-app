import { User } from "../domain/user";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: User["id"]): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
}
