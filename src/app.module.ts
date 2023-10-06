import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema'
import { UserService } from './user/user.service';
@Module({
  imports: [AuthModule, UserModule,
  MongooseModule.forRoot('mongodb+srv://seba6453:2nPLx75L0jS8ALJw@cluster0.iu5xhng.mongodb.net/?retryWrites=true&w=majority'),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AppController],
  providers: [AppService,UserService],
})
export class AppModule {}
