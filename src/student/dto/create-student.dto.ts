import { IsNotEmpty, IsOptional, IsString, MaxLength, min, MinLength } from "class-validator";

export class CreateStudentDto {
    
    @IsNotEmpty()
    @IsString({ message: 'Name must be a string' })
    @MinLength(5, { message: 'Name must be at least 5 characters long' })
    name: string

    @IsNotEmpty()
    @IsString({ message: 'Phone number must be a string' })
    @MinLength(7, { message: 'Phone number must be at least 7 characters long' })
    @MaxLength(11, { message: 'Phone number must be at most 11 characters long' })
    fPhone: string

    @IsString()
    @IsOptional()
    @MinLength(7, { message: 'Phone number must be at least 7 characters long' })
    @MaxLength(11, { message: 'Phone number must be at most 11 characters long' })
    sPhone: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    class: string

    @IsNotEmpty()
    @IsString()
    major: string
}
