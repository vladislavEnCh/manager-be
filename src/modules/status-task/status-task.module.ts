import { Module } from '@nestjs/common';
import { StatusTaskService } from './status-task.service';
import { StatusTaskController } from './status-task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusTask } from './entities/status-task.entity';
import { Status } from '../status/entities/status.entity';
import { Task } from '../task/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Task, StatusTask])],
  controllers: [StatusTaskController],
  providers: [StatusTaskService],
  exports: [StatusTaskService]
})
export class StatusTaskModule {}
