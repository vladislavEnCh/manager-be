import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Workspace } from '../workspace/entities/workspace.entity';
import { WorkspaceColumn } from '../column/entities/column.entity';
import { ColumnModule } from '../column/column.module';
import { StatusTask } from '../status-task/entities/status-task.entity';
import { Status } from '../status/entities/status.entity';
import { StatusModule } from '../status/status.module';
import { StatusTaskModule } from '../status-task/status-task.module';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      User,
      Workspace,
      WorkspaceColumn,
      StatusTask,
      Status,
      Project,
    ]),
    UserModule,
    ColumnModule,
    StatusModule,
    StatusTaskModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
