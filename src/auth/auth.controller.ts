import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { ResponseAPI } from '../entities/response.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateAuthDto): Promise<Auth> {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDTO: CreateUserDto): Promise<Auth> {
    return this.authService.register(registerDTO);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('recovery')
  recovery(@Body() json: UpdateAuthDto): Promise<ResponseAPI> {
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
