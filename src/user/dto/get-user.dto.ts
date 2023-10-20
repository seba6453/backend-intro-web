import { IsEmail, IsNotEmpty } from 'class-validator';

export class getUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string
}
