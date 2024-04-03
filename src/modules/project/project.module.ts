import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from '../workspace/entities/workspace.entity';
import { StatusModule } from '../status/status.module';
import { Project } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Project]), StatusModule],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
