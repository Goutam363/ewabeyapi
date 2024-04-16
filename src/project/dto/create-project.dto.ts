import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    project_name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    address: string;
}