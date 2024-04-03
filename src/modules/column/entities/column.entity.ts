import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Task } from '../../task/entities/task.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';

@Entity()
export class WorkspaceColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //@OneToMany(() => Task, (task) => task.workspace, { cascade: true })
  //@JoinTable()
  //tasks: Task[];

  @Column()
  position: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.columns)
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
