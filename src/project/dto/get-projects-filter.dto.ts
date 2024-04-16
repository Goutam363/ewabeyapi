import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStage } from '../project-stage.enum';
import { ProjectStatus } from '../project-status.enum';

export class GetProjectsFilterDto {
  @IsOptional()
  @IsEnum(ProjectStage)
  stage?: ProjectStage;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsString()
  search?: string;
}