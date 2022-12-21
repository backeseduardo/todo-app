import { taskRepository } from "../../repository";
import { GetTasksController } from "./get-tasks-controller";
import { GetTasksUseCase } from "./get-tasks-use-case";

const getTasksUseCase = new GetTasksUseCase(taskRepository);
const getTasksController = new GetTasksController(getTasksUseCase);

export { getTasksController };
