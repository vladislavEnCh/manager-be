import { MinLength } from 'class-validator';
import { PriorityType } from './create-task.dto';
import { Task } from '../entities/task.entity';

export class UpdateTaskDto {
  @MinLength(4, { message: 'Name too short' })
  name: string;

  @MinLength(4, { message: 'Descriptions too short' })
  description?: string;

  workspaceId: number;

  columnId?: number;

  priority?: PriorityType;

  assigneeId?: string;

  finalDate?: string;
}

export class UpdateTaskOrderDto {
  oldColumnId: number;

  newColumnId: number;

  newOrder: Task[];
}
