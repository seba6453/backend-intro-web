import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/config/enctypt';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {}


  async findOne(email: string) {
    const user = await this.userModel.findOne({ email }, 'userName email');
    if (!user) {
      throw new HttpException('Usuario no existe en el sistema', HttpStatus.NOT_ACCEPTABLE);
    }
    return user;
  }
  
  async findOneLogin(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Usuario no existe en el sistema', HttpStatus.NOT_ACCEPTABLE);
    }
    return user;
  }

  async createUser(newUser: CreateUserDto) {
    newUser.password = await hashPassword(newUser.password);
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
    newPassword = await hashPassword(newPassword);
    user.password = newPassword;
  
    // Guardar los cambios en la base de datos
    await user.save();
  
    // Retornar al usuario actualizado
    return user;
  }

  async updateUser(token: string, updateUserDto: UpdateUserDto) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const {username, email} = decodedToken

    // Verificar si el usuario con el ID proporcionado existe en la base de datos
    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado.`);
    }

    // Aplicar las actualizaciones contenidas en updateUserDto al usuario existente
    if (updateUserDto.userName) {
      existingUser.userName = updateUserDto.userName;
    }

    if (updateUserDto.password) {
      const hashedPassword = await hashPassword(updateUserDto.password);
      existingUser.password = hashedPassword;
    }

    if (updateUserDto.email) {
      existingUser.email = updateUserDto.email;
    }

    // Guardar el usuario actualizado en la base de datos
    try {
      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error) {
      // Manejar errores de guardado aquí, como validaciones fallidas
      throw new Error('Error al actualizar el usuario.');
    }
  }
}