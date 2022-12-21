import { MemoryTaskRepository } from "../../repository/memory-task-repository";
import { MoveTaskUseCase } from "./move-task-use-case";

const make = () => {
  const taskRepository = new MemoryTaskRepository();
  const moveTaskUseCase = new MoveTaskUseCase(taskRepository);

  taskRepository.tasks = {
    "task-1": {
      id: "task-1",
      title: "Task One",
      description: "Description",
      status: "todo",
      viewers: new Set(),
      createdBy: {
        id: "user-1",
        name: "User",
        email: "userone@gmail.com",
      },
    },
  };

  return {
    taskRepository,
    moveTaskUseCase,
  };
};

describe("MoveTask", () => {
  it("should update status", async () => {
    const { taskRepository, moveTaskUseCase } = make();

    await moveTaskUseCase.execute({
      taskId: "task-1",
      newStatus: "in_progress",
      userId: "user-1",
    });

    expect(taskRepository.tasks["task-1"].status).toBe("in_progress");
  });

  it("should throw error if task does not exist", async () => {
    const { moveTaskUseCase } = make();

    await expect(
      moveTaskUseCase.execute({
        taskId: "task-2",
        newStatus: "in_progress",
        userId: "user-1",
      })
    ).rejects.toThrowError("Task not found");
  });

  it("should throw error if user does not created the task or is not in the viewers set", async () => {
    const { moveTaskUseCase } = make();

    await expect(
      moveTaskUseCase.execute({
        taskId: "task-1",
        newStatus: "in_progress",
        userId: "user-2",
      })
    ).rejects.toThrowError("User cannot move task");
  });
});
