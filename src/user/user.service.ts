import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
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

  async findOne(username: string) {
    return this.users.find(user => user.userName === username);
  }

}