import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  private users: User[] = [
    {
      userID: 1,
      userName: "kevin",
      password: "guess",
      email: "jane.smith@example.com"
    }
  ];

  async findOne(email: string) {
    return this.users.find(user => user.email === email);
  }

  async createUser(newUser: CreateUserDto) {
    const user = {
      userID: 2,
      userName: newUser.userName,
      password: newUser.password,
      email: newUser.email
    };

    this.users.push(user);

     return user;
  }

}