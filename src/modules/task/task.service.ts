import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Workspace } from '../workspace/entities/workspace.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  AssignTaskToAnotherProjectDto,
  UpdateTaskDto,
  UpdateTaskOrderDto,
} from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { WorkspaceColumn } from '../column/entities/column.entity';
import { StatusTask } from '../status-task/entities/status-task.entity';
import { Status } from '../status/entities/status.entity';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    //@InjectRepository(Workspace)
    //private readonly workspaceRepository: Repository<Workspace>,

    //@InjectRepository(WorkspaceColumn)
    //private readonly columnRepository: Repository<WorkspaceColumn>,

    @InjectRepository(StatusTask)
    private readonly statusTaskRepository: Repository<StatusTask>,

    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,

    //private userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    let statusTaskCount;

    const project = await this.projectRepository.findOne({
      where: {
        id: createTaskDto.projectId,
      },
    });

    const newTask: any = {
      reporter: {
        id: userId,
      },
      name: 'New Task',
      projects: [project],
    };

    const task = await this.tasksRepository.save(newTask);
    const status = await this.statusRepository.findOne({
      where: {
        id: createTaskDto.statusId,
      },
    });
    const newStatusTask: any = {
      task,
      status,
      projects: [project],
    };

    statusTaskCount = await this.statusTaskRepository.count({
      where: {
        status: {
          id: createTaskDto.statusId,
        },
      },
    });

    newStatusTask.position = statusTaskCount > 0 ? statusTaskCount : 0;
    const statusTask = await this.statusTaskRepository.save(newStatusTask);
    return statusTask;
  }

  async findAll(id: number) {
    //return await this.tasksRepository.find({
    //  where: {
    //    workspace: {
    //      id,
    //    },
    //  },
    //  select: {
    //    column: {
    //      id: true,
    //    },
    //  },
    //  relations: {
    //    column: true,
    //  },
    //  order: { position: 'ASC' },
    //});
  }

  async findByProjectId(id: number) {
    //console.log(id)
    return await this.statusTaskRepository.find({
      where: {
        projects: {
          id,
        },
      },
      relations: {
        task: true,
        status: true,
      },
      order: { position: 'ASC' },
    });
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
      relations: {
        statusTask: {
          status: true,
          projects: true,
        },
        reporter: true,
      },
    });
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    if (!updateTaskDto.columnId) {
      return this.tasksRepository.update(id, updateTaskDto);
    }
  }

  async assignTaskToAnotherProject(
    updateTaskDto: AssignTaskToAnotherProjectDto,
  ) {
    let statusTaskCount;
    const project = await this.projectRepository.findOne({
      where: {
        id: updateTaskDto.projectId,
      },
      relations: {
        statuses: true,
      },
    });

    const task = await this.tasksRepository.findOne({
      where: {
        id: updateTaskDto.taskId,
      },
    });

    const newStatusTask: any = {
      task,
      status: project.statuses[0],
      projects: [project],
    };

    statusTaskCount = await this.statusTaskRepository.count({
      where: {
        status: {
          id: project.statuses[0].id,
        },
      },
    });


    newStatusTask.position = statusTaskCount > 0 ? statusTaskCount : 0;

    const statusTask = await this.statusTaskRepository.save(newStatusTask);
    return statusTask;
  }
}
