import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    userName: string
    
    @IsNotEmpty()
    @IsString()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}
