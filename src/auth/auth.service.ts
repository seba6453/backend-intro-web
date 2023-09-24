import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {};

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if(user?.password !== pass){
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userID, username: user.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(newUser: CreateUserDto): Promise<any> {
    const user: User = await this.userService.createUser(newUser);

    const payload = { sub: user.userID, username: user.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
