import { StatusTask } from '../entities/status-task.entity';

export class UpdateStatusTaskDto  {
	newStatusId: number
}


export class UpdateStatusTaskOrderDto {
	oldColumnId: number;
  
	newColumnId: number;
  
	newOrder: StatusTask[];
  }
  