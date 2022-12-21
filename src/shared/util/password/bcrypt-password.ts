import bcrypt from "bcrypt";
import { IPassword } from "./password";

export class BCryptPassword implements IPassword {
  hash(password: string, saltOrRounds: number): Promise<string> {
    return bcrypt.hash(password, saltOrRounds);
  }

  compare(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }
}
