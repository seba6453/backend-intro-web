import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDTO: CreateUserDto) {
    return this.authService.register(registerDTO);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('recovery')
  recovery(@Body() json: Record<string, any>) {
    return this.authService.recoveryPassword(json.email);
  }
}
