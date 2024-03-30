import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/entities/user.entity';
import { WorkspaceColumn } from '../../column/entities/column.entity';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, {cascade: true})
  users: User[];

  @OneToMany(() => Task, (task) => task.workspace, { cascade: true })
  @JoinTable()
  tasks: Task[];

  @OneToMany(() => Project, (project) => project.projectsTasks)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => WorkspaceColumn, (workspaceColumn) => workspaceColumn.workspace, { cascade: true })
  @JoinTable()
  columns: WorkspaceColumn[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
