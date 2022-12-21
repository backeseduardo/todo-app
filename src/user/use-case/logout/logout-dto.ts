import { User } from "../../domain/user";

export interface LogoutDTO {
  userId: User["id"];
}
