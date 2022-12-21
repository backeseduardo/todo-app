import { User } from "../../../user/domain/user";

export interface CreateTaskDTO {
  title: string;
  description: string;
  userId: User["id"];
}
