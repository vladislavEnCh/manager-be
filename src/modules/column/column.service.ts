import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceColumn } from './entities/column.entity';
import { Repository } from 'typeorm';
import { Workspace } from '../workspace/entities/workspace.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(WorkspaceColumn)
    private readonly workspaceColumnRepository: Repository<WorkspaceColumn>,
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    //@InjectRepository(User)
    //private readonly userRepository: Repository<User>,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: createColumnDto.workspace_id,
      },
    });

    if (!workspace) throw new BadRequestException('Workspace not found');

    const countOfColumns = await this.workspaceColumnRepository.count({
      where: {
        workspace: {
          id: createColumnDto.workspace_id,
        },
      },
    });

    const newWorkspaceColumn = {
      name: createColumnDto.name,
      workspace: workspace,
      position: countOfColumns > 0 ? countOfColumns : 0,
    };

    return await this.workspaceColumnRepository.save(newWorkspaceColumn);
  }

  async findAll(id: number) {
    const workspaceColumns = await this.workspaceColumnRepository.find({
      where: {
        workspace: {
          id,
        },
      },
      order: { position: 'ASC' },
    });
    return workspaceColumns;
  }

  async findOneByColumnId(id: number) {
    return await this.workspaceColumnRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateColumnDto: UpdateColumnDto) {
    return this.workspaceColumnRepository.update(id, {
      name: updateColumnDto.name,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }

  async createDefaultColumns(workspace_id: number) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id: workspace_id,
      },
    });
    if (!workspace) throw new BadRequestException('Workspace not found');

    const newWorkspaceColumn = [
      {
        name: 'TO DO',
        workspace: workspace,
        position: 0,
      },
      {
        name: 'IN PROGRESS',
        workspace: workspace,
        position: 1,
      },
      {
        name: 'DONE',
        workspace: workspace,
        position: 2,
      },
    ];

    return await this.workspaceColumnRepository.save(newWorkspaceColumn);
  }

  async updateOrder(updatedColumnsOrder: any[]) {
    for (const key in updatedColumnsOrder) {
      const column = updatedColumnsOrder[key];
      const columnById = await this.findOneByColumnId(column.id);
      await this.workspaceColumnRepository.save({
        ...columnById,
        position: Number(key),
      });
    }
  }
}
