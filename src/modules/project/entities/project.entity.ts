import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { Status } from '../../status/entities/status.entity';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { StatusTask } from '../../status-task/entities/status-task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @OneToMany(() => Status, (status) => status.project)
  @JoinColumn()
  statuses:Status[];

  @ManyToOne(() => Workspace, (workspace) => workspace.projects)
  workspace: Workspace;

  @ManyToMany(() => Task, (task) => task.projects, { nullable: true })
  tasks: Task[];

  @ManyToMany(() => StatusTask, (task) => task.projects, { nullable: true })
  statusTasks: StatusTask[];
}
