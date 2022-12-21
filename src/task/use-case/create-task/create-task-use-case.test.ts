import { MemoryUserRepository } from "../../../user/repository/memory-user-repository";
import { IUUID } from "../../../shared/util/uuid/uuid";
import { MemoryTaskRepository } from "../../repository/memory-task-repository";
import { CreateTaskUseCase } from "./create-task-use-case";

const make = () => {
  const taskRepository = new MemoryTaskRepository();
  const userRepository = new MemoryUserRepository();
  userRepository.users = {
    "user-1": {
      id: "user-1",
      name: "user 1",
      email: "user@user.com",
    },
  };
  const mockUUID: IUUID = {
    generate: () => "task-1",
  };
  const createTaskUseCase = new CreateTaskUseCase(
    taskRepository,
    mockUUID,
    userRepository
  );

  return {
    createTaskUseCase,
    taskRepository,
    userRepository,
  };
};

describe("CreateTaskService", () => {
  it("should save a new task into task repository", async () => {
    const { createTaskUseCase, taskRepository } = make();

    await createTaskUseCase.execute({
      title: "My new task",
      description: "My beatiful description of my new task",
      userId: "user-1",
    });

    expect(taskRepository.tasks["task-1"].title).toBe("My new task");
    expect(taskRepository.tasks["task-1"].status).toBe("todo");
  });

  it("should throw error if user does not exist", async () => {
    const { createTaskUseCase } = make();

    await expect(
      createTaskUseCase.execute({
        title: "My new task",
        description: "My beatiful description of my new task",
        userId: "user-2",
      })
    ).rejects.toThrowError("User not found");
  });
});
