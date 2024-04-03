import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../project/entities/project.entity';
import { StatusTask } from '../status-task/entities/status-task.entity';
import { Status } from './entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, StatusTask, Status])],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService]
})
export class StatusModule {}
