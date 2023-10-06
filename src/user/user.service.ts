import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}


  async findOne(email: string) {
    return await this.userModel.findOne( {email});
  }

  async createUser(newUser: CreateUserDto) {
    const createdCat = await this.userModel.create(newUser);
    return createdCat;
  }

  async forgotPassword(email: string, newPassword: string) {
    return await this.userModel.findOneAndUpdate({email},{newPassword})
  }

}