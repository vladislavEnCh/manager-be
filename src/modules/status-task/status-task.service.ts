import { Injectable } from '@nestjs/common';
import { CreateStatusTaskDto } from './dto/create-status-task.dto';
import { UpdateStatusTaskDto } from './dto/update-status-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusTask } from './entities/status-task.entity';
import { Repository } from 'typeorm';
import { Status } from '../status/entities/status.entity';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class StatusTaskService {
  constructor(
    @InjectRepository(StatusTask)
    private readonly statusTaskRepository: Repository<StatusTask>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,

    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  create(createStatusTaskDto: CreateStatusTaskDto) {
    const task = this.tasksRepository.findOne({
      where: {
        id: createStatusTaskDto.taskId,
      },
    });

    const newStatusTask = {};
  }

  async findOne(id: number) {
    return await this.statusTaskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateOrder(updatedTasksOrder: any) {
    await this.statusTaskRepository.save(updatedTasksOrder);
    for (const key in updatedTasksOrder) {
      const task = updatedTasksOrder[key];
      const taskById = await this.findOne(task.id);
      await this.statusTaskRepository.save({
        ...taskById,
        position: Number(key),
      });
    }
    //await this.statusTaskRepository.save({
    //  ...taskById,
    //  position: Number(key),
    //});
  }

  findAll() {
    return `This action returns all statusTask`;
  }

  async update(id: number, updateStatusTaskDto: UpdateStatusTaskDto) {
    const newStatus = await this.statusRepository.findOne({
      where: {
        id: updateStatusTaskDto.newStatusId,
      },
    });

    return await this.statusTaskRepository.update(id, {
      status: newStatus,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} statusTask`;
  }
}
