import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema'
import { UserService } from './user/user.service';
import { linkMongo } from './auth/constants';

@Module({
  imports: [AuthModule, UserModule,
  MongooseModule.forRoot(linkMongo.secret),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AppController],
  providers: [AppService,UserService],
})
export class AppModule {}
