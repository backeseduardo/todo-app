import { userRepository } from "../../../user/repository";
import { taskRepository } from "../../repository";
import { CreateTaskUseCase } from "./create-task-use-case";
import { CreateTaskController } from "./create-task-controller";
import { uuid } from "../../../shared/util/uuid";

const createTask = new CreateTaskUseCase(taskRepository, uuid, userRepository);
const createTaskController = new CreateTaskController(createTask);

export { createTaskController };
