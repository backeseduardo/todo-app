import { User } from "../../../user/domain/user";
import { Task } from "../../domain/task";

export interface MoveTaskDTO {
  taskId: Task["id"];
  newStatus: Task["status"];
  userId: User["id"];
}
