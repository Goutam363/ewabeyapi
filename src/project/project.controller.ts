import { Controller, Get, Post, Query, Body, UseGuards, Param, Patch, Req, Ip } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { GetUser } from 'src/auth/user/get-user.decorator';
import { User } from 'src/auth/user/user.entity';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectStatusDto } from './dto/update-project-status.dto';
import { UpdateProjectStageDto } from './dto/update-project-stage.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateProjectAdminDto } from './dto/update-project-admin.dto';
import { UpdateProjectStaffDto } from './dto/update-project-staff.dto';

@Controller('api/project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
  ) {}

  @Get('/test')
  testing(): Promise<string> {
    return Promise.resolve("Testing Successful!");
  }

  @Get()
  @UseGuards(AuthGuard('user-jwt'))
  getProjects(
    @Query() filterDto: GetProjectsFilterDto,
    @GetUser() user: User,
  ): Promise<Project[]> {
    return this.projectService.getProjects(filterDto, user);
  }

  @Post()
  @UseGuards(AuthGuard('user-jwt'))
  createProject(@Body() createProjectDto: CreateProjectDto, @GetUser() user: User): Promise<Project> {
    return this.projectService.createProject(createProjectDto, user);
  }

  //Staff Section
  @Get('/secure/staff')
  @UseGuards(AuthGuard('staff-jwt'))
  getProjectsStaff(@Query() filterDto: GetProjectsFilterDto): Promise<Project[]> {
    return this.projectService.getProjectsSecure(filterDto);
  }

  @Get('/secure/staff/:id')
  @UseGuards(AuthGuard('staff-jwt'))
  getProjectByIdStaff(@Param('id') id: string ): Promise<Project> {
    return this.projectService.getProjectById(id);
  }

  @Patch('/secure/staff/:id/status')
  @UseGuards(AuthGuard('staff-jwt'))
  updateProjectStatusStaff(
    @Param('id') id: string,
    @Body() updateProjectStatusDto: UpdateProjectStatusDto,
  ): Promise<Project> {
    const { status } = updateProjectStatusDto;
    return this.projectService.updateProjectStatus(id, status);
  }

  @Patch('/secure/staff/:id/stage')
  @UseGuards(AuthGuard('staff-jwt'))
  updateProjectStageStaff(
    @Param('id') id: string,
    @Body() updateProjectStageDto: UpdateProjectStageDto,
  ): Promise<Project> {
    const { stage } = updateProjectStageDto;
    return this.projectService.updateProjectStage(id, stage);
  }

  @Patch('/secure/staff/:id')
  @UseGuards(AuthGuard('staff-jwt'))
  updateProjectStaff(
    @Param('id') id: string,
    @Body() updateProjectStaffDto: UpdateProjectStaffDto,
  ): Promise<Project> {
    return this.projectService.updateProjectStaff(id, updateProjectStaffDto);
  }

  //Admin Section
  @Get('/secure/admin')
  @UseGuards(AuthGuard('admin-jwt'))
  getProjetsAdmin(@Query() filterDto: GetProjectsFilterDto): Promise<Project[]> {
    return this.projectService.getProjectsSecure(filterDto);
  }

  @Get('/secure/admin/:id')
  @UseGuards(AuthGuard('admin-jwt'))
  getProjectByIdAdmin(@Param('id') id: string): Promise<Project> {
    return this.projectService.getProjectById(id);
  }

  @Get('/secure/admin/:id/verify')
  @UseGuards(AuthGuard('admin-jwt'))
  verifyProjectByIdAdmin(@Param('id') id: string): Promise<boolean> {
    return this.projectService.verifyProjectById(id);
  }

  @Patch('/secure/admin/:id/status')
  @UseGuards(AuthGuard('admin-jwt'))
  updateProjectStatusAdmin(
    @Param('id') id: string,
    @Body() updateProjectStatusDto: UpdateProjectStatusDto,
  ): Promise<Project> {
    const { status } = updateProjectStatusDto;
    return this.projectService.updateProjectStatus(id, status);
  }

  @Patch('/secure/admin/:id/stage')
  @UseGuards(AuthGuard('admin-jwt'))
  updateProjectStageAdmin(
    @Param('id') id: string,
    @Body() updateProjectStageDto: UpdateProjectStageDto,
  ): Promise<Project> {
    const { stage } = updateProjectStageDto;
    return this.projectService.updateProjectStage(id, stage);
  }

  @Patch('/secure/admin/:id/project-details')
  @UseGuards(AuthGuard('admin-jwt'))
  updateProjectAdmin(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Patch('/secure/admin/:id')
  @UseGuards(AuthGuard('admin-jwt'))
  updateProjectAdminSuper(
    @Param('id') id: string,
    @Body() updateProjectAdminDto: UpdateProjectAdminDto,
  ): Promise<Project> {
    return this.projectService.updateProjectSuper(id, updateProjectAdminDto);
  }

  @Patch('/secure/admin/:id/project-value')
  @UseGuards(AuthGuard('admin-jwt'))
  updateProjectValue(
    @Param('id') id: string,
    @Body() project_value: string,
  ): Promise<Project> {
    return this.projectService.updateProjectValue(id, project_value);
  }

  @Patch('/secure/admin/:id/paid-amount')
  @UseGuards(AuthGuard('admin-jwt'))
  addPaidAmount(
    @Param('id') id: string,
    @Body() project_value: string, payment_id: string,
  ): Promise<Project> {
    return this.projectService.concatPaidAmount(id, project_value, payment_id);
  }

}
