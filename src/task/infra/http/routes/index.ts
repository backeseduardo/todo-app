import express, { Request, Response } from "express";
import { middleware } from "../../../../shared/infra";
import { addViewerToTaskController } from "../../../use-case/add-viewer-to-task";
import { createTaskController } from "../../../use-case/create-task";
import { getTasksController } from "../../../use-case/get-tasks";
import { moveTaskController } from "../../../use-case/move-task";

const taskRouter = express.Router();

taskRouter.post(
  "/",
  middleware.ensureAuthenticated(),
  (req: Request, res: Response) => createTaskController.execute(req, res)
);

taskRouter.put(
  "/:taskId/status/:status",
  middleware.ensureAuthenticated(),
  (req: Request, res: Response) => moveTaskController.execute(req, res)
);

taskRouter.put(
  "/:taskId/add-viewer/:viewerId",
  middleware.ensureAuthenticated(),
  (req: Request, res: Response) => addViewerToTaskController.execute(req, res)
);

taskRouter.get(
  "/",
  middleware.ensureAuthenticated(),
  (req: Request, res: Response) => getTasksController.execute(req, res)
);

export { taskRouter };
