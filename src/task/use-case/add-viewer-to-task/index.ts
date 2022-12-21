import { taskRepository } from "../../repository";
import { AddViewerToTaskUseCase } from "./add-viewer-to-task-use-case";
import { AddViewerToTaskController } from "./add-viewer-to-task-controller";

const addViewerToTaskUseCase = new AddViewerToTaskUseCase(taskRepository);
const addViewerToTaskController = new AddViewerToTaskController(
  addViewerToTaskUseCase
);

export { addViewerToTaskController };
