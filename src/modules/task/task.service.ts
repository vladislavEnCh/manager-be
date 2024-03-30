import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Workspace } from '../workspace/entities/workspace.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto, UpdateTaskOrderDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { WorkspaceColumn } from '../column/entities/column.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,

    @InjectRepository(WorkspaceColumn)
    private readonly columnRepository: Repository<WorkspaceColumn>,
    private userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    let taskCount;


    const newTask: any = {
      workspace: {
        id: createTaskDto.workspaceId,
      },
      reporter: {
        id: userId,
      },
      name: 'New Task',
    };

    if (createTaskDto.columnId) {
      newTask.column = {
        id: createTaskDto.columnId,
      };

      taskCount = await this.tasksRepository.count({
        where: {
          column: {
            id: createTaskDto.columnId,
          },
        },
      });
      newTask.position = taskCount > 0 ? taskCount : 0;
    }
    return await this.tasksRepository.save(newTask);
  }

  async findAll(id: number) {
    return await this.tasksRepository.find({
      where: {
        workspace: {
          id,
        },
      },
      select: {
        column: {
          id: true,
        },
      },
      relations: {
        column: true,
      },
      order: { position: 'ASC' },
    });
  }

  async findByColumnId(id: number) {
    return await this.tasksRepository.find({
      where: {
        column: {
          id,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne({
      where: {
        id,
      },
      select: {
        column: {
          id: true,
          name: true,
        },
      },
      relations: {
        column: true,
        reporter: true,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    if (!updateTaskDto.columnId) {
      return this.tasksRepository.update(id, updateTaskDto);
    }

    const task: any = await this.tasksRepository.findOne({
      where: {
        id,
      },
      relations: {
        column: true,
      },
    });


    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    const newColumn = await this.columnRepository.findOne({
      where: { id: updateTaskDto.columnId },
    });

    if (!newColumn) {
      throw new Error(`Column with ID ${updateTaskDto.columnId} not found`);
    }

    task.column = newColumn;
    return await this.tasksRepository.save(task);
  }


  async updateOrder(updatedTasksOrder: any) {
    await this.tasksRepository.save(updatedTasksOrder);

    for (const key in updatedTasksOrder) {
      const task = updatedTasksOrder[key];
      const taskById = await this.findOne(task.id);

      await this.tasksRepository.save({
        ...taskById,
        position: Number(key),
      });
    }
    //  await this.tasksRepository.save({
    //    ...taskById,
    //    position: Number(key),
    //  });
    //}
  }

  async remove(id: number) {
    await this.tasksRepository.delete(id);
    return true;
  }
}
