import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateAuthDto) {
    return this.authService.signIn(signInDto);
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

  @Post('validate-token')
  validateToken(@Body() { token }: { token: string }) {
    // Lógica para validar el token aquí, por ejemplo, utilizando el servicio de autenticación
    const isValid = this.authService.validateToken(token);

    if (isValid) {
      return { valid: true };
    } else {
      return { valid: false };
    }
  }
}
