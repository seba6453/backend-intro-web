import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { randomCaracter } from 'src/config/randomCaracter';
import { transporter } from 'src/config/mailer';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {};

  async signIn(login: CreateAuthDto): Promise<any> {
    const user = await this.userService.findOne(login.email);

    if(user?.password !== login.password){
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.userID, username: user.userName };
    const userData = {
      username: user.userName,
      email: user.email
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      userData: userData
    };
  }

  async register(newUser: CreateUserDto): Promise<any> {
    const user: User = await this.userService.createUser(newUser);

    const payload = { sub: user.userID, username: user.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
      userName: user.userName,
      email: user.email
    };
  }
  validateToken(token: string): boolean {
    try {
      // Verificar el token utilizando el JwtService
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async recoveryPassword(email: string): Promise<any> {
    const newPassword = randomCaracter(9);
    let user: User;
    try {
      user = await this.userService.forgotPassword(email,newPassword);
    }catch{
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }

    await transporter.sendMail({
      from: '"Soporte" <soporte.erpan@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Recuperacion de contraseña", // Subject line
      text: "Hello world?", // plain text body
      html: `
        <h1>Restablecer contraseña</h1>
        <div>
            <h3>Hola ${user.userName}</h3>
            <p>Tu contraseña provisoria es:</p>
        </div>
        <h3>${newPassword}</h3>
        <div>
            <p>Luego de ingresar, realiza el cambio de tu contraseña</p>
        <div>
        <div>
            <h4>¿Tienes preguntas?</h4>
            <p>Contactarse a soporte.erpan@gmail.com</p>
        <div>
        `,
    });

    return {
      message:"contraseña enviada",
      statusCode: 201
    }

  }
}
