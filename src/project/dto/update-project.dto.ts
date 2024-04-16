import { IsNotEmpty } from "class-validator";

export class UpdateProjectDto {
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
}