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

import { Project } from '../../project/entities/project.entity';
import { StatusTask } from '../../status-task/entities/status-task.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @OneToMany(() => StatusTask, (statusTask) => statusTask.status, {nullable: true})
  @JoinTable()
  statusTask: StatusTask[];

  @ManyToOne(() => Project, (project) => project.statuses)
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
