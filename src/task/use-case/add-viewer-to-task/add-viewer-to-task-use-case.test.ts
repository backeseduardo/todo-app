import { MemoryTaskRepository } from "../../repository/memory-task-repository";
import { AddViewerToTaskUseCase } from "./add-viewer-to-task-use-case";

const make = () => {
  const taskRepository = new MemoryTaskRepository();
  const addViewerToTaskUseCase = new AddViewerToTaskUseCase(taskRepository);

  return {
    addViewerToTaskUseCase,
    taskRepository,
  };
};

describe("AddViewerToTaskUseCase", () => {
  it("should add the user to viewers set", async () => {
    const { addViewerToTaskUseCase, taskRepository } = make();

    taskRepository.tasks = {
      "task-1": {
        id: "task-1",
        title: "task one",
        description: "",
        status: "todo",
        createdBy: {
          id: "user-1",
          email: "",
          name: "",
        },
        viewers: new Set(),
      },
    };

    await addViewerToTaskUseCase.execute({
      taskId: "task-1",
      viewerId: "user-2",
      userId: "user-1",
    });

    const task = await taskRepository.findById("task-1");

    expect(task?.viewers?.has("user-2")).toBe(true);
  });

  it("should throw error if task is not found", async () => {
    const { addViewerToTaskUseCase, taskRepository } = make();

    await expect(
      addViewerToTaskUseCase.execute({
        taskId: "task-1",
        viewerId: "user-2",
        userId: "user-1",
      })
    ).rejects.toThrowError("task not found");
  });

  it("should throw error if user has not created the task", async () => {
    const { addViewerToTaskUseCase, taskRepository } = make();

    taskRepository.tasks = {
      "task-1": {
        id: "task-1",
        title: "task one",
        description: "",
        status: "todo",
        createdBy: {
          id: "user-2",
          email: "",
          name: "",
        },
        viewers: new Set(),
      },
    };

    await expect(
      addViewerToTaskUseCase.execute({
        taskId: "task-1",
        viewerId: "user-3",
        userId: "user-1",
      })
    ).rejects.toThrowError("cannot add viewer to this task");
  });
});
