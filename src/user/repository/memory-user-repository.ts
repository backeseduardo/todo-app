import { User } from "../domain/user";
import { IUserRepository } from "./user-repository";

export class MemoryUserRepository implements IUserRepository {
  public users: { [key: User["id"]]: User } = {};

  findByEmail(email: string): Promise<User | undefined> {
    const user = Object.values(this.users).find((user) => user.email === email);

    return Promise.resolve(user);
  }

  findById(id: User["id"]): Promise<User | undefined> {
    const user = Object.values(this.users).find((user) => user.id === id);

    return Promise.resolve(user);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(Object.values(this.users));
  }

  save(user: User): Promise<User> {
    this.users[user.id] = user;

    return Promise.resolve(this.users[user.id]);
  }
}
