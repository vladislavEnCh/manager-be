import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StatusTaskService } from './status-task.service';
import { CreateStatusTaskDto } from './dto/create-status-task.dto';
import {
  UpdateStatusTaskDto,
  UpdateStatusTaskOrderDto,
} from './dto/update-status-task.dto';

@Controller('status-task')
export class StatusTaskController {
  constructor(private readonly statusTaskService: StatusTaskService) {}

  @Post()
  create(@Body() createStatusTaskDto: CreateStatusTaskDto) {
    return this.statusTaskService.create(createStatusTaskDto);
  }

  @Get()
  findAll() {
    return this.statusTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusTaskService.findOne(+id);
  }

  @Patch()
  updateOrder(@Body() updatedTasks: UpdateStatusTaskOrderDto) {
    return this.statusTaskService.updateOrder(updatedTasks);
  }

  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updatedTasks: UpdateStatusTaskDto,
  ) {
    return this.statusTaskService.update(+id, updatedTasks);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusTaskService.remove(+id);
  }
}
