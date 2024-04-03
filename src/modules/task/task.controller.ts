import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AssignTaskToAnotherProjectDto, UpdateTaskDto, UpdateTaskOrderDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, req.user.id);
  }


  @Get('/project/:id')
  findByProjectId(@Param('id') id: string) {
    return this.taskService.findByProjectId(+id);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.taskService.findAll(+id);
  }

  @Get('/task/:id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Post('/assign')
  assignTaskToAnotherProject(@Body() assignTaskDto: AssignTaskToAnotherProjectDto) {
    return this.taskService.assignTaskToAnotherProject(assignTaskDto);
  }


  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.taskService.remove(+id);
  //}
}
