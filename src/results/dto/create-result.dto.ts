import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateResultDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    link: string

    @IsNotEmpty()
    @IsString()
    subject: string

    @IsString()
    @IsOptional()
    class: string
}
