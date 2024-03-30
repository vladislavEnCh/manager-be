import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace } from './entities/workspace.entity';
import { ColumnService } from '../column/column.service';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private columnService: ColumnService,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto, id: number) {
    const isExist = await this.workspaceRepository.findBy({
      users: { id: id },
      name: createWorkspaceDto.name,
    });

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new BadRequestException('User not found');

    if (isExist.length)
      throw new BadRequestException('Workspace with this name already exist');

    const newWorkspace = {
      name: createWorkspaceDto.name,
      users: [user],
    };

    const createdWorkspace = await this.workspaceRepository.save(newWorkspace);
    await this.columnService.createDefaultColumns(createdWorkspace.id);
    return createdWorkspace;
  }

  async findAll(id: number) {
    const workSpaces = await this.workspaceRepository.find({
      where: {
        users: {
          id,
        },
      },
       relations: {
        columns: true,
      },
    });
    return workSpaces;
  }

async  findOne(id: number) {
   return await this.workspaceRepository.findOne({
      where: {
        id
      },
    });
  }

  //update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
  //  return `This action updates a #${id} workspace`;
  //}

  //remove(id: number) {
  //  return `This action removes a #${id} workspace`;
  //}
}
