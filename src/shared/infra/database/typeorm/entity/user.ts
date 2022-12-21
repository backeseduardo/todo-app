import { Column, Entity, PrimaryColumn } from "typeorm";
import { User } from "../../../../../user/domain/user";

@Entity({
  name: "user",
})
export class UserEntity implements User {
  @PrimaryColumn()
  id!: string;

  @Column({
    length: 50,
  })
  name!: string;

  @Column({
    length: 50,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  password?: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  lastLogin?: Date;
}
