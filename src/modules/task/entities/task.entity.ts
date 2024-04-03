import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { ITypes, PriorityType } from '../dto/create-task.dto';
//import { WorkspaceColumn } from '../../column/entities/column.entity';
import { Project } from '../../project/entities/project.entity';
import { StatusTask } from '../../status-task/entities/status-task.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({ name: 'task_id' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.assignedTasks, { nullable: true })
  assignee: User[];

  @ManyToMany(() => Project, (project) => project.tasks)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => StatusTask, (statusTask) => statusTask.task, {nullable: true, cascade: true})
  statusTask: StatusTask[];

  //@ManyToMany(() => ProjectTask, (project) => project.tasks, {
  //  nullable: true,
  //})
  //projectsTasks: ProjectTask[];

  //@ManyToMany(() => Project, (project) => project.projectsTasks, {
  //  nullable: true,
  //})
  //projects: Project[];

  @Column({ type: 'enum', enum: PriorityType, default: PriorityType.HIGHT })
  priority: string;

  @CreateDateColumn({ nullable: true })
  finalDate: string;

  @Column({ type: 'enum', enum: ITypes, default: ITypes.NEW_FEATURE })
  type: string;

  @Column({ nullable: true })
  blockerId: number;

  @Column({ nullable: true })
  blockedById: number;

  @OneToMany(() => Task, (task) => task.id)
  childrenTasks: Task[];

  //@Column({ nullable: true })
  //position: number;

  @ManyToOne(() => User, (user) => user.reportedTask)
  reporter: User;

  //@ManyToOne(() => Workspace, (workspace) => workspace.id)
  //workspace: Workspace;

  //@ManyToOne(() => WorkspaceColumn, (workspaceColumn) => workspaceColumn.id)
  //@JoinColumn({ name: 'column_id' })
  //column: WorkspaceColumn;

  //column_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
