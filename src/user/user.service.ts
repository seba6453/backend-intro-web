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
    // Buscar al usuario por su dirección de correo electrónico
    const user = await this.userModel.findOne({ email });
  
    if (!user) {
      // Manejar el caso en el que el usuario no existe
      throw new Error('Usuario no encontrado');
    }
  
    // Actualizar la contraseña del usuario
    user.password = newPassword;
  
    // Guardar los cambios en la base de datos
    await user.save();
  
    // Retornar al usuario actualizado
    return user;
  }

}