import { taskRepository } from "../../repository";
import { MoveTaskUseCase } from "./move-task-use-case";
import { MoveTaskController } from "./move-task-controller";

const moveTask = new MoveTaskUseCase(taskRepository);
const moveTaskController = new MoveTaskController(moveTask);

export { moveTaskController };
