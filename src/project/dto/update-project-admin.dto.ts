import { IsEnum, IsNotEmpty } from "class-validator";
import { ProjectStatus } from "../project-status.enum";
import { ProjectStage } from "../project-stage.enum";

export class UpdateProjectAdminDto {
    @IsNotEmpty()
    project_name: string;

    @IsNotEmpty()
    project_details: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    project_value: string;

    @IsNotEmpty()
    paid_amount: string;

    @IsNotEmpty()
    refund_amount: string;

    payment_ids: string;

    @IsEnum(ProjectStatus)
    status: ProjectStatus;

    @IsEnum(ProjectStage)
    stage: ProjectStage;
}