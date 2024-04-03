import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { WorkspaceModule } from '../workspace/workspace.module';
import { Workspace } from '../workspace/entities/workspace.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceColumn } from './entities/column.entity';
import { Status } from '../status/entities/status.entity';
import { StatusTask } from '../status-task/entities/status-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User, WorkspaceColumn, Status, StatusTask])],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
