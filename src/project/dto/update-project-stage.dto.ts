import { IsEnum } from "class-validator";
import { ProjectStage } from "../project-stage.enum";

export class UpdateProjectStageDto {
    @IsEnum(ProjectStage)
    stage: ProjectStage;
}