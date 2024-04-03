import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  findByProject(@Param('id') id: string) {
    return this.statusService.findByProject(+id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @Patch()
  updateOrder(@Body() updatedColumns) {
    return this.statusService.updateOrder(updatedColumns);
  }

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
  //  return this.statusService.update(+id, updateStatusDto);
  //}

  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.statusService.remove(+id);
  //}
}
