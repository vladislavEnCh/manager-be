import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../status/entities/status.entity';
import { Task } from '../../task/entities/task.entity';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class StatusTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

  @ManyToOne(() => Status, (status) => status.statusTask, {nullable: true})
  status: Status;
  
  @ManyToOne(() => Task, (task) => task.statusTask, {nullable: true})
  task: Task;

  @ManyToMany(() => Project, (project) => project.statusTasks)
  @JoinTable()
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
