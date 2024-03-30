import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  name: string;

  @Column()
  password: string;

  @ManyToMany(() => Workspace, (workspace) => workspace.users)
  @JoinTable()
  workspaces: Workspace[];

  @ManyToMany(() => Task, task => task.assignee, {nullable: true})
  assignedTasks: Task[]

  @OneToMany(() => Task, task => task.reporter, {nullable: true})
  reportedTask: Task[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
