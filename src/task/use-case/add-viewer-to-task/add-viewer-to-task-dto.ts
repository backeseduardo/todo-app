import { User } from "../../../user/domain/user";
import { Task } from "../../domain/task";

export interface AddViewerToTaskDTO {
  taskId: Task["id"];
  viewerId: User["id"];
  userId: User["id"];
}
