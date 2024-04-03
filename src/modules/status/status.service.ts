import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project/entities/project.entity';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto) {
    const project = await this.projectRepository.findOne({
      where: {
        id: createStatusDto.projectId,
      },
    });

    if (!project) throw new BadRequestException('project not found');

    const countOfStatus = await this.statusRepository.count({
      where: {
        project: {
          id: createStatusDto.projectId,
        },
      },
    });

    const newStatus = {
      name: createStatusDto.name,
      project: project,
      position: countOfStatus > 0 ? countOfStatus : 0,
    };

    return await this.statusRepository.save(newStatus);
  }

  findAll() {
    return `This action returns all status`;
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return this.statusRepository.update(id, {
      name: updateStatusDto.name,
    });
  }

  async findByProject(id: number) {
    return await this.statusRepository.find({
      where: {
        project: {
          id,
        },
      },
      relations: {
        project: true,
        statusTask: {
          task: true
        }
      },
      order: { position: 'ASC' },
    });
  }

  //update(id: number, updateStatusDto: UpdateStatusDto) {
  //  return `This action updates a #${id} status`;
  //}

  //remove(id: number) {
  //  return `This action removes a #${id} status`;
  //}

  async findOneByStatusId(id: number) {
    return await this.statusRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateOrder(updatedStatusOrder: any[]) {
    console.log(updatedStatusOrder)
    for (const key in updatedStatusOrder) {
      const status = updatedStatusOrder[key];
      const statusById = await this.findOneByStatusId(status.id);
      await this.statusRepository.save({
        ...statusById,
        position: Number(key),
      });
    }
  }

  async createDefaultStatuses(projectId: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id: projectId,
      },
    });
    if (!project) throw new BadRequestException('Project not found');

    const newStatuses = [
      {
        name: 'TO DO',
        project: project,
        position: 0,
      },
      {
        name: 'IN PROGRESS',
        project: project,
        position: 1,
      },
      {
        name: 'DONE',
        project: project,
        position: 2,
      },
    ];

    return await this.statusRepository.save(newStatuses);
  }
}
