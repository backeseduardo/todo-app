import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Task } from "../../../../../task/domain/task";
import { User } from "../../../../../user/domain/user";
import { UserEntity } from "./user";

@Entity({
  name: "task",
})
export class TaskEntity implements Partial<Task> {
  @PrimaryColumn()
  id!: string;

  @Column({
    length: 50,
  })
  title!: string;

  @Column("text")
  description!: string;

  @Column({
    length: 11,
  })
  status!: "todo" | "in_progress" | "done" | "archived";

  @ManyToOne(() => UserEntity)
  createdBy!: User;

  @Column({
    name: "viewers",
    type: "varchar",
    length: 36,
    array: true,
    nullable: true,
  })
  viewersArray!: string[];
}
