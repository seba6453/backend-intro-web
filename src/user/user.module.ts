import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';


@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UserModule {}
