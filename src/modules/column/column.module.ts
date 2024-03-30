import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { WorkspaceModule } from '../workspace/workspace.module';
import { Workspace } from '../workspace/entities/workspace.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceColumn } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, User, WorkspaceColumn])],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
