import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStage } from './project-stage.enum';
import { ProjectStatus } from './project-status.enum';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/auth/user/user.entity';
import { UpdateProjectAdminDto } from './dto/update-project-admin.dto';
import { UpdateProjectStaffDto } from './dto/update-project-staff.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getProjects(filterDto: GetProjectsFilterDto, user: User): Promise<Project[]> {
    const { stage, status } = filterDto;
    const query = this.projectRepository.createQueryBuilder('project');
    query.where({ user })
    if (stage) {
      query.andWhere('project.project_stage = :stage', { stage });
    }
    if (status) {
      query.andWhere('project.project_status = :status', { status });
    }
    query.orderBy('project.start_date','DESC');
    const projects = await query.getMany();
    return projects;
  }

  async getProjectsSecure(filterDto: GetProjectsFilterDto): Promise<Project[]> {
    const { stage, status, search } = filterDto;
    const query = this.projectRepository.createQueryBuilder('project');
    if (stage) {
      query.where('project.project_stage = :stage', { stage });
    }
    if (status) {
      query.andWhere('project.project_status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(project.email) = LOWER(:search) OR LOWER(project.mobile) = LOWER(:search) OR (project.payment_ids) LIKE (:search) OR LOWER(project.project_name) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    query.orderBy('project.start_date','DESC');
    const projects = await query.getMany();
    return projects;
  }

  async getProjectById(id: string): Promise<Project> {
    const found = await this.projectRepository.findOne({ where: { id } });
    if(!found) {
        throw new NotFoundException(`Project with id ${id} not found`);
    }
    return found;
  }

  async verifyProjectById(id: string): Promise<boolean> {
    const found = await this.projectRepository.findOne({ where: { id } });
    if(found) {
        return true;
    } else {
      return false;
    }
  }

  async getProjectsByUsername(username: string): Promise<Project[]> {
    const query = this.projectRepository.createQueryBuilder('project');
    query.where('project.username = :username', { username });
    query.orderBy('project.start_date','DESC');
    const projects = await query.getMany();
    return projects;
  }

  async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
    const { username, project_name, email, mobile, address } = createProjectDto;
    const project = this.projectRepository.create({
        username,
        project_name,
        email,
        mobile,
        address,
        project_stage: ProjectStage.PLANNING,
        project_status: ProjectStatus.WAITING_FOR_APPROVE,
        user,
    })
    await this.projectRepository.save(project);
    return project;
  }

  async updateProject( id: string, updateProjectDto: UpdateProjectDto ): Promise<Project> {
    const { project_name, project_details, email, mobile, address } = updateProjectDto;
    const project = await this.getProjectById(id);
    project.project_name = project_name;
    project.project_details = project_details;
    project.email = email;
    project.mobile = mobile;
    project.address = address;
    await this.projectRepository.save(project);
    return project;
  }

  async updateProjectStaff( id: string, updateProjectStaffDto: UpdateProjectStaffDto ): Promise<Project> {
    const { project_details, payment_ids, stage, status } = updateProjectStaffDto;
    const project = await this.getProjectById(id);
    project.project_details = project_details;
    project.payment_ids = payment_ids;
    project.project_stage = stage;
    project.project_status = status;
    await this.projectRepository.save(project);
    return project;
  }

  async updateProjectSuper( id: string, updateProjectAdminDto: UpdateProjectAdminDto ): Promise<Project> {
    const { project_name, project_details, email, mobile, address, stage, status, project_value, paid_amount, refund_amount, payment_ids } = updateProjectAdminDto;
    const project = await this.getProjectById(id);
    project.project_name = project_name;
    project.project_details = project_details;
    project.email = email;
    project.mobile = mobile;
    project.address = address;
    project.project_stage = stage;
    project.project_status = status;
    project.project_value = project_value;
    project.paid_amount = paid_amount;
    project.refund_amount = refund_amount;
    project.payment_ids = payment_ids;
    await this.projectRepository.save(project);
    return project;
  }

  async updateProjectValue( id: string, project_value: string ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.project_value = project_value;
    await this.projectRepository.save(project);
    return project;
  }

  async concatPaidAmount( id: string, amount: string, payment_id: string ): Promise<Project> {
    const project = await this.getProjectById(id);
    if(project.payment_ids === ""){
        project.payment_ids = payment_id;
        project.paid_amount = amount;
    } else {
        project.payment_ids = project.payment_ids+"|"+payment_id;
        project.paid_amount = (parseInt(project.paid_amount) + parseInt(amount)).toString();
    }
    await this.projectRepository.save(project);
    return project;
  }

  async updateProjectStage( id: string, stage: ProjectStage ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.project_stage = stage;
    await this.projectRepository.save(project);
    return project;
  }

  async updateProjectStatus( id: string, status: ProjectStatus ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.project_status = status;
    await this.projectRepository.save(project);
    return project;
  }

  async updateProjectDetails( id: string, project_details: string ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.project_details = project_details;
    await this.projectRepository.save(project);
    return project;
  }

}
