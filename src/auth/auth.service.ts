import { BadRequestException, Injectable, UnauthorizedException  } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { randomCaracter } from 'src/config/randomCaracter';
import { transporter } from 'src/config/mailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {};

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if(user?.password !== pass){
      const errorMessage = "Contraseña incorrecta"
      throw new BadRequestException(errorMessage, { cause: new Error(), description: 'Some error description' })
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
    if(await this.userService.findOne(email) === undefined){
      throw new UnauthorizedException();
    }
    const userName = await this.userService.forgotPassword(email,newPassword);

    await transporter.sendMail({
      from: '"Soporte" <soporte.erpan@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Recuperacion de contraseña", // Subject line
      text: "Hello world?", // plain text body
      html: `
        <h1>Restablecer contraseña</h1>
        <div>
            <h3>Hola ${userName}</h3>
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
