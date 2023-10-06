import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ auto: true })
  userID: number;
  
  @Prop({ unique: true, trim: true, required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true, trim: true, required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
