import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Workspace } from '../workspace/entities/workspace.entity';
import { StatusService } from '../status/status.service';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,

    private statusService: StatusService,
  ) {}


  async create(createProjectDto: CreateProjectDto) {

    const isExist = await this.projectRepository.findBy({
      name: createProjectDto.name,
    });

    if (isExist.length)
      throw new BadRequestException('Workspace with this name already exist');

      const workspace = await this.workspaceRepository.findOne({
        where: {
          id: createProjectDto.workspaceId
        }
      });

    const newProject = {
      name: createProjectDto.name,
      workspace
    };

    const createdProject = await this.projectRepository.save(newProject);


    await this.statusService.createDefaultStatuses(createdProject.id)
    //return createdWorkspace;
    //const newProject: any = {
    //  workspace: {
    //    id: createProjectDto.workspaceId,
    //  },
    //  name: 'New Project',
    //};
    return createdProject.id;
  }

 async findAll() {
    return await this.projectRepository.find({
      relations: {
        statuses: true
      }
    });
  }

  async findByWorkspace(id: number) {
    return await this.projectRepository.find({
      where: {
        workspace:{
          id
        }
      }
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
