import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}
