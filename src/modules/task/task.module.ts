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

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Workspace, WorkspaceColumn]), UserModule, ColumnModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
