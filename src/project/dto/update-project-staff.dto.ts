import { IsEnum, IsNotEmpty } from "class-validator";
import { ProjectStatus } from "../project-status.enum";
import { ProjectStage } from "../project-stage.enum";

export class UpdateProjectStaffDto {
    project_details: string;

    payment_ids: string;

    @IsEnum(ProjectStatus)
    status: ProjectStatus;

    @IsEnum(ProjectStage)
    stage: ProjectStage;
}