import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService, ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req) {
    return this.workspaceService.create(createWorkspaceDto, req.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.workspaceService.findAll(req.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOne(+id);
  }

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
  //  return this.workspaceService.update(+id, updateWorkspaceDto);
  //}

  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //  return this.workspaceService.remove(+id);
  //}
}
